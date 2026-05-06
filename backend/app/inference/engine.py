"""
Motor de Inferencia - Sistema Experto para Optimización de Rutas
Implementa búsqueda de rutas, aplicación de reglas y generación de explicaciones
"""

import heapq
from typing import List, Dict, Tuple, Optional, Set
from collections import defaultdict
import uuid

from app.core.config import (
    PEAK_HOURS, PEAK_MULTIPLIER, OFF_PEAK_MULTIPLIER,
    TRANSFER_PENALTY_TIME, TRANSIT_TIME_BETWEEN_STATIONS,
    LINE_FREQUENCY, BASE_WAIT_TIME
)
from app.knowledge.graph import build_graph, lines
from app.knowledge.stations import stations


class ExpertInferenceEngine:
    """Motor de inferencia basado en reglas para optimización de rutas"""

    def __init__(self):
        """Inicializa el motor con el grafo y estaciones"""
        self.graph = build_graph(lines)
        self.stations = stations
        self.lines_dict = lines
        
        # Caché para rutas ya calculadas
        self.route_cache = {}

    def _is_peak_hour(self, hour: int) -> bool:
        """Determina si es hora pico"""
        for start, end in PEAK_HOURS.values():
            if start <= hour < end:
                return True
        return False

    def _get_time_multiplier(self, departure_time: Optional[str]) -> float:
        """Obtiene multiplicador de tiempo según hora del día"""
        if not departure_time:
            return 1.0
        
        try:
            hour = int(departure_time.split(":")[0])
            return PEAK_MULTIPLIER if self._is_peak_hour(hour) else OFF_PEAK_MULTIPLIER
        except:
            return 1.0

    def _get_wait_time(self, line: str, time_multiplier: float) -> int:
        """Calcula tiempo de espera por línea"""
        frequency = LINE_FREQUENCY.get(line, 5)
        base_wait = max(2, BASE_WAIT_TIME / (frequency / 5))
        return int(base_wait * time_multiplier)

    def find_all_paths(
        self,
        origin: str,
        destination: str,
        departure_time: Optional[str] = None,
        max_paths: int = 5
    ) -> List[Dict]:
        """
        Encuentra múltiples rutas de origen a destino
        Usa Dijkstra modificado para encontrar k-caminos más cortos
        """
        if origin not in self.graph or destination not in self.graph:
            return []

        time_multiplier = self._get_time_multiplier(departure_time)
        
        # Dijkstra para encontrar ruta más corta
        distances = defaultdict(lambda: float('inf'))
        distances[origin] = 0
        parent = {}
        visited = set()
        pq = [(0, origin)]

        while pq:
            current_dist, current = heapq.heappop(pq)

            if current in visited:
                continue
            visited.add(current)

            if current == destination:
                break

            if current not in self.graph:
                continue

            for neighbor, line, weight in self.graph[current]:
                # Costo: peso de la línea * tiempo de tránsito
                transit_cost = weight * TRANSIT_TIME_BETWEEN_STATIONS
                new_dist = current_dist + transit_cost

                if new_dist < distances[neighbor]:
                    distances[neighbor] = new_dist
                    parent[neighbor] = (current, line)
                    heapq.heappush(pq, (new_dist, neighbor))

        # Reconstruir ruta
        if destination not in parent and destination != origin:
            return []

        # Construir el camino
        path = []
        current = destination
        while current in parent:
            prev, line = parent[current]
            path.append((prev, current, line))
            current = prev

        if not path:
            if origin == destination:
                return []
            return []

        path.reverse()
        
        # Convertir a formato de ruta
        routes = []
        
        # Ruta principal
        main_route = self._build_route(
            origin, destination, path, departure_time, time_multiplier
        )
        if main_route:
            routes.append(main_route)

        # Intentar encontrar rutas alternativas (simple: variar líneas)
        alternative_routes = self._find_alternative_routes(
            origin, destination, path, departure_time, time_multiplier, max_paths - 1
        )
        routes.extend(alternative_routes)

        return routes[:max_paths]

    def _build_route(
        self,
        origin: str,
        destination: str,
        path: List[Tuple[str, str, str]],
        departure_time: Optional[str],
        time_multiplier: float
    ) -> Optional[Dict]:
        """Construye la estructura de datos de una ruta"""
        
        if not path:
            return None

        steps = []
        lines_used = set()
        total_transit_time = 0
        transfers = 0
        total_wait_time = 0

        # Primer paso: abordar en origen
        first_station = path[0][0]
        first_line = path[0][2]
        lines_used.add(first_line)
        
        origin_name = self._get_station_name(origin)
        wait_time = self._get_wait_time(first_line, time_multiplier)
        total_wait_time += wait_time

        steps.append({
            "station": origin_name,
            "station_id": origin,
            "line": first_line,
            "direction": self._get_line_direction(first_line, path[0][1]),
            "instruction": f"Aborda el Tren/Macrobús {first_line}",
            "duration": wait_time,
            "step_type": "board"
        })

        # Pasos intermedios
        current_line = first_line
        for i, (current, next_station, line) in enumerate(path):
            
            if line != current_line:
                # Transbordo
                transfers += 1
                current_line = line
                
                current_name = self._get_station_name(current)
                transfer_wait = self._get_wait_time(line, time_multiplier)
                total_wait_time += transfer_wait
                
                steps.append({
                    "station": current_name,
                    "station_id": current,
                    "line": line,
                    "direction": self._get_line_direction(line, next_station),
                    "instruction": f"Transbordo a Línea {line}",
                    "duration": transfer_wait,
                    "step_type": "transfer"
                })
                lines_used.add(line)
            
            next_name = self._get_station_name(next_station)
            total_transit_time += TRANSIT_TIME_BETWEEN_STATIONS
            
            if i == len(path) - 1:
                # Último paso
                steps.append({
                    "station": next_name,
                    "station_id": next_station,
                    "line": current_line,
                    "direction": self._get_line_direction(current_line, next_station),
                    "instruction": f"Has llegado a {next_name}",
                    "duration": None,
                    "step_type": "arrive"
                })

        destination_name = self._get_station_name(destination)
        total_time = total_transit_time + total_wait_time
        cost = self._calculate_cost(list(lines_used))

        # Generar explicación
        explanation = self._generate_explanation(
            origin, destination, total_time, transfers, departure_time, path, cost
        )

        route = {
            "id": str(uuid.uuid4()),
            "origin": origin,
            "destination": destination,
            "origin_name": origin_name,
            "destination_name": destination_name,
            "metrics": {
                "total_time": max(total_time, 5),
                "transfers": transfers,
                "cost": cost,
                "stations_count": len(path) + 1,
                "walking_time": 5,
                "wait_time": total_wait_time
            },
            "steps": steps,
            "lines": sorted(list(lines_used)),
            "explanation": explanation
        }

        return route

    def _find_alternative_routes(
        self,
        origin: str,
        destination: str,
        main_path: List,
        departure_time: Optional[str],
        time_multiplier: float,
        max_alternatives: int
    ) -> List[Dict]:
        """Encuentra rutas alternativas evitando la ruta principal"""
        alternatives = []
        
        excluded_edges = set((path[0], path[1]) for path in main_path)
        
        for attempt in range(max_alternatives):
            alt_path = self._find_path_avoiding_edges(
                origin, destination, excluded_edges, time_multiplier
            )
            
            if alt_path:
                alt_route = self._build_route(
                    origin, destination, alt_path, departure_time, time_multiplier
                )
                if alt_route:
                    alternatives.append(alt_route)
                    for edge in alt_path:
                        excluded_edges.add((edge[0], edge[1]))
            else:
                break

        return alternatives

    def _find_path_avoiding_edges(
        self,
        origin: str,
        destination: str,
        excluded_edges: Set[Tuple[str, str]],
        time_multiplier: float
    ) -> Optional[List]:
        """Encuentra ruta evitando ciertos arcos"""
        distances = defaultdict(lambda: float('inf'))
        distances[origin] = 0
        parent = {}
        visited = set()
        pq = [(0, origin)]

        while pq:
            current_dist, current = heapq.heappop(pq)

            if current in visited:
                continue
            visited.add(current)

            if current == destination:
                break

            if current not in self.graph:
                continue

            for neighbor, line, weight in self.graph[current]:
                if (current, neighbor) in excluded_edges:
                    continue

                transit_cost = weight * TRANSIT_TIME_BETWEEN_STATIONS
                new_dist = current_dist + transit_cost

                if new_dist < distances[neighbor]:
                    distances[neighbor] = new_dist
                    parent[neighbor] = (current, line)
                    heapq.heappush(pq, (new_dist, neighbor))

        if destination not in parent and destination != origin:
            return None

        path = []
        current = destination
        while current in parent:
            prev, line = parent[current]
            path.append((prev, current, line))
            current = prev

        path.reverse()
        return path if path else None

    def rank_routes(
        self,
        routes: List[Dict],
        preference: str
    ) -> List[Dict]:
        """Ordena rutas según la preferencia del usuario"""
        # Validar que hay al menos una ruta
        if not routes:
            return []
            
        if preference == "fastest":
            routes.sort(key=lambda r: r["metrics"]["total_time"])
        elif preference == "least_transfers":
            routes.sort(key=lambda r: (r["metrics"]["transfers"], r["metrics"]["total_time"]))
        elif preference == "cheapest":
            routes.sort(key=lambda r: r["metrics"]["cost"])
        else:  # balanced
            def score(route):
                metrics = route["metrics"]
                # Usar valores seguros para max con manejo de lista vacía
                times = [r["metrics"]["total_time"] for r in routes]
                transfers = [r["metrics"]["transfers"] for r in routes]
                costs = [r["metrics"]["cost"] for r in routes]
                
                max_time = max(times) if times else 1
                max_transfers = max(transfers) if transfers else 1
                max_cost = max(costs) if costs else 1
                
                return (
                    (metrics["total_time"] / max_time) * 0.6 +
                    (metrics["transfers"] / max_transfers) * 0.3 +
                    (metrics["cost"] / max_cost) * 0.1
                )
            routes.sort(key=score)

        return routes

    def _generate_explanation(
        self,
        origin: str,
        destination: str,
        total_time: int,
        transfers: int,
        departure_time: Optional[str],
        path: List,
        cost: float
    ) -> Dict:
        """Genera explicación en lenguaje natural del razonamiento"""
        
        origin_name = self._get_station_name(origin)
        destination_name = self._get_station_name(destination)
        
        lines_used = set(p[2] for p in path)
        
        reasoning = []
        
        reasoning.append(
            f"Se identificaron rutas viables desde {origin_name} a {destination_name}."
        )
        
        lines_str = ", ".join(sorted(lines_used))
        reasoning.append(
            f"La ruta óptima utiliza la(s) línea(s): {lines_str}."
        )
        
        if transfers == 0:
            reasoning.append("La ruta no requiere transbordos, lo que reduce tiempo de espera.")
        else:
            reasoning.append(
                f"La ruta incluye {transfers} transbordo(s) estratégicamente ubicados."
            )
        
        reasoning.append(
            f"El tiempo total estimado es de {total_time} minutos."
        )
        
        if departure_time:
            hour = int(departure_time.split(":")[0])
            if self._is_peak_hour(hour):
                reasoning.append("Se aplicaron factores de ajuste por hora pico.")
            else:
                reasoning.append("Se aplicaron factores de ajuste por hora valle.")
        
        factors = [
            "Tiempo total de viaje",
            "Número de transbordos",
            "Costo estimado",
            "Horario del día",
            "Frecuencia del servicio",
            "Disponibilidad de líneas"
        ]
        
        summary = (
            f"Esta ruta ha sido seleccionada como óptima. "
            f"Utilizando {lines_str}, "
            f"con {transfers} transbordo(s) y un tiempo total de {total_time} minutos, "
            f"esta es la mejor opción según tus criterios."
        )
        
        return {
            "summary": summary,
            "reasoning": reasoning,
            "factors": factors,
            "alternatives": [],
            "confidence": self._calculate_confidence(transfers, total_time, len(lines_used))
        }

    def _calculate_confidence(self, transfers: int, total_time: int, num_lines: int) -> int:
        """Calcula nivel de confianza del sistema en la recomendación"""
        confidence = 85
        
        if transfers > 0:
            confidence -= transfers * 5
        
        if total_time > 45:
            confidence -= 10
        elif total_time < 15:
            confidence += 5
        
        if num_lines > 2:
            confidence -= 5
        
        return max(60, min(95, confidence))

    def _get_station_name(self, station_id: str) -> str:
        """Obtiene el nombre amigable de una estación"""
        if station_id in self.stations:
            return self.stations[station_id].get("name", station_id)
        return station_id

    def _get_line_direction(self, line: str, next_station: str) -> str:
        """Obtiene la dirección de viaje de una línea (nombre de la estación terminal)"""
        if line in self.lines_dict:
            stations_in_line = self.lines_dict[line]
            if next_station in stations_in_line:
                idx = stations_in_line.index(next_station)
                if idx < len(stations_in_line) / 2:
                    return self._get_station_name(stations_in_line[0])
                else:
                    return self._get_station_name(stations_in_line[-1])
        return line

    def _calculate_cost(self, lines_used: List[str]) -> float:
        """Calcula costo total del viaje"""
        if not lines_used:
            return 0.0
        
        from app.core.config import LINE_PRICES
        max_cost = max(LINE_PRICES.get(line, 6.0) for line in lines_used)
        
        return max_cost

    def get_all_stations(self) -> List[Dict]:
        """Retorna todas las estaciones disponibles"""
        result = []
        for station_id, station_data in self.stations.items():
            result.append({
                "id": station_id,
                "name": station_data.get("name", station_id),
                "lines": station_data.get("lines", [])
            })
        return result


# Instancia global del motor de inferencia
inference_engine = ExpertInferenceEngine()

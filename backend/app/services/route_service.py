"""
Servicio de Lógica de Negocio para Rutas
"""

from typing import List, Optional
from app.inference.engine import inference_engine
from app.schemas.route_schema import (
    Route, RouteSearchRequest, RouteSearchResponse,
    ComparisonMetrics, CompareRoutesResponse,
    StationResponse, AllStationsResponse
)
import time


class RouteService:
    """Servicio para operaciones con rutas"""

    @staticmethod
    def search_routes(request: RouteSearchRequest) -> RouteSearchResponse:
        """
        Busca rutas óptimas entre origen y destino
        """
        start_time = time.time()

        # Buscar todas las rutas
        routes = inference_engine.find_all_paths(
            origin=request.origin,
            destination=request.destination,
            departure_time=request.departure_time,
            max_paths=5
        )

        # Si no hay rutas, retornar vacío (no rankear listas vacías)
        if not routes:
            search_time = (time.time() - start_time) * 1000
            return RouteSearchResponse(
                routes=[],
                total_routes=0,
                search_time=search_time
            )

        # Rankear según preferencia (solo si hay rutas)
        ranked_routes = inference_engine.rank_routes(routes, request.preference)

        # Convertir a formato de respuesta
        route_responses = []
        for route_data in ranked_routes:
            # Convertir pasos
            steps = [
                {
                    "station": step["station"],
                    "station_id": step["station_id"],
                    "line": step["line"],
                    "direction": step.get("direction", ""),
                    "instruction": step["instruction"],
                    "duration": step.get("duration"),
                    "step_type": step["step_type"]
                }
                for step in route_data["steps"]
            ]

            # Crear ruta
            route = Route(
                id=route_data["id"],
                origin=route_data["origin"],
                destination=route_data["destination"],
                origin_name=route_data["origin_name"],
                destination_name=route_data["destination_name"],
                metrics={
                    "total_time": route_data["metrics"]["total_time"],
                    "transfers": route_data["metrics"]["transfers"],
                    "cost": round(route_data["metrics"]["cost"], 2),
                    "stations_count": route_data["metrics"]["stations_count"],
                    "walking_time": route_data["metrics"]["walking_time"],
                    "wait_time": route_data["metrics"]["wait_time"]
                },
                steps=steps,
                lines=route_data["lines"],
                explanation={
                    "summary": route_data["explanation"]["summary"],
                    "reasoning": route_data["explanation"]["reasoning"],
                    "factors": route_data["explanation"]["factors"],
                    "alternatives": route_data["explanation"]["alternatives"],
                    "confidence": route_data["explanation"]["confidence"]
                }
            )
            route_responses.append(route)

        search_time = (time.time() - start_time) * 1000  # en milisegundos

        return RouteSearchResponse(
            routes=route_responses,
            total_routes=len(route_responses),
            search_time=search_time
        )

    @staticmethod
    def compare_routes(route_ids: List[str], all_routes: List[Route]) -> CompareRoutesResponse:
        """
        Compara múltiples rutas
        """
        comparison_routes = []

        for route in all_routes:
            if route.id in route_ids:
                comparison_routes.append(
                    ComparisonMetrics(
                        route_id=route.id,
                        time=route.metrics["total_time"],
                        transfers=route.metrics["transfers"],
                        cost=route.metrics["cost"],
                        lines=route.lines
                    )
                )

        # Generar recomendación
        if comparison_routes:
            best_route = min(comparison_routes, key=lambda r: r.time)
            recommendation = f"La ruta {best_route.route_id} es la más rápida con {best_route.time} minutos"
        else:
            recommendation = "No hay rutas para comparar"

        return CompareRoutesResponse(
            routes=comparison_routes,
            recommendation=recommendation
        )

    @staticmethod
    def get_all_stations() -> AllStationsResponse:
        """
        Obtiene todas las estaciones disponibles
        """
        stations_data = inference_engine.get_all_stations()

        station_responses = [
            StationResponse(
                id=station["id"],
                name=station["name"],
                lines=station["lines"]
            )
            for station in stations_data
        ]

        return AllStationsResponse(
            stations=station_responses,
            total=len(station_responses)
        )

    @staticmethod
    def validate_stations(origin: str, destination: str) -> tuple[bool, Optional[str]]:
        """
        Valida que las estaciones existan
        """
        all_stations = inference_engine.get_all_stations()
        station_ids = [s["id"] for s in all_stations]

        if origin not in station_ids:
            return False, f"Estación de origen '{origin}' no existe"
        
        if destination not in station_ids:
            return False, f"Estación de destino '{destination}' no existe"
        
        if origin == destination:
            return False, "El origen y destino no pueden ser iguales"

        return True, None


# Instancia global del servicio
route_service = RouteService()

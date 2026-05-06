"""
Script de debugging para verificar el grafo y los problemas de búsqueda
"""

import sys
sys.path.insert(0, 'backend')

from app.knowledge.graph import build_graph, lines
from app.knowledge.stations import stations
from app.inference.engine import ExpertInferenceEngine

# Inicializar
graph = build_graph(lines)
engine = ExpertInferenceEngine()

print("=" * 80)
print("DEBUGGING SISTEMA DE RUTAS")
print("=" * 80)

# 1. Ver estaciones disponibles
print("\n1. ESTACIONES DISPONIBLES:")
print(f"   Total de estaciones en graph: {len(graph)}")
print(f"   Total en stations dict: {len(stations)}")

# Verificar algunas estaciones clave
test_stations = ["Centro", "CUCEI", "Periferico_Norte", "Central_de_Autobuses"]
print("\n   Estaciones clave:")
for station in test_stations:
    exists_in_graph = station in graph
    exists_in_stations = station in stations
    print(f"   - {station}: en_graph={exists_in_graph}, en_stations={exists_in_stations}")

# 2. Ver líneas
print("\n2. LÍNEAS DISPONIBLES:")
for line_name, stations_list in lines.items():
    print(f"   {line_name}: {len(stations_list)} estaciones")
    print(f"      Primera: {stations_list[0]}")
    print(f"      Última: {stations_list[-1]}")

# 3. Probar búsqueda simple (misma línea)
print("\n3. PROBANDO BÚSQUEDA EN MISMA LÍNEA (L3):")
l3_stations = lines["L3"]
if len(l3_stations) >= 2:
    origin = l3_stations[0]
    destination = l3_stations[2]
    
    print(f"   Origen: {origin}")
    print(f"   Destino: {destination}")
    print(f"   Origen en graph: {origin in graph}")
    print(f"   Destino en graph: {destination in graph}")
    
    routes = engine.find_all_paths(origin, destination, "10:00")
    print(f"   Rutas encontradas: {len(routes)}")
    
    if routes:
        print(f"   Primera ruta:")
        route = routes[0]
        print(f"      Tiempo: {route['metrics']['total_time']} min")
        print(f"      Transbordos: {route['metrics']['transfers']}")
        print(f"      Líneas: {route['lines']}")
    else:
        print("   ❌ NO SE ENCONTRARON RUTAS")
        print(f"   Revisando grafo para {origin}...")
        if origin in graph:
            neighbors = graph[origin]
            print(f"   Vecinos de {origin}: {len(neighbors)}")
            for neighbor, line, weight in list(neighbors)[:3]:
                print(f"      - {neighbor} (línea {line})")

# 4. Probar todas las estaciones de una línea
print("\n4. VERIFICANDO CONECTIVIDAD L3:")
l3_stations_in_graph = [s for s in l3_stations if s in graph]
print(f"   Estaciones L3 en graph: {len(l3_stations_in_graph)}/{len(l3_stations)}")

missing = [s for s in l3_stations if s not in graph]
if missing:
    print(f"   Estaciones FALTANTES: {missing}")

# 5. Probar una búsqueda que debería funcionar
print("\n5. BÚSQUEDA DE PRUEBA (Centro → CUCEI):")
try:
    routes = engine.find_all_paths("Centro", "CUCEI", "10:00")
    print(f"   Rutas encontradas: {len(routes)}")
    if routes:
        for i, route in enumerate(routes):
            print(f"   Ruta {i+1}: {route['metrics']['total_time']} min, {route['metrics']['transfers']} transbordos")
except Exception as e:
    print(f"   ❌ Error: {e}")

print("\n" + "=" * 80)

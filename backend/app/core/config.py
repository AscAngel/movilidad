"""
Configuración de la aplicación
"""

# Tiempos base de espera y tránsito en minutos
BASE_WAIT_TIME = 5  # Tiempo de espera base entre trenes

# Factores de tiempo según hora del día
PEAK_HOURS = {
    "morning": (7, 9),      # 7 AM - 9 AM
    "midday": (12, 14),     # 12 PM - 2 PM
    "evening": (17, 19),    # 5 PM - 7 PM
}

PEAK_MULTIPLIER = 1.3      # Multiplicador de tiempo en horas pico
OFF_PEAK_MULTIPLIER = 0.8  # Multiplicador en horas valle

# Penalizaciones para transbordos
TRANSFER_PENALTY_TIME = 10  # Minutos de penalización por transbordo
TRANSFER_PENALTY_COMFORT = 15  # Penalización de comodidad

# Tiempo de tránsito entre estaciones (en minutos)
TRANSIT_TIME_BETWEEN_STATIONS = 2

# Precios por línea
LINE_PRICES = {
    "L1": 11.00,
    "L2": 11.00,
    "L3": 11.00,
    "L4": 11.00,
    "L6": 11.00,
    "L7": 11.00,
}

# Capacidad de servicio (trenes/minutos)
LINE_FREQUENCY = {
    "L1": 5,
    "L2": 6,
    "L3": 5,
    "L4": 10,  # Menos frecuente
    "L6": 4,
    "L7": 4,
}

# Distancia promedio (número de estaciones)
# Se carga dinámicamente del grafo

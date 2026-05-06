"""
Esquemas Pydantic para validación de datos
"""
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from enum import Enum


class PreferenceType(str, Enum):
    """Tipos de preferencias del usuario"""
    BALANCED = "balanced"
    FASTEST = "fastest"
    LEAST_TRANSFERS = "least_transfers"
    CHEAPEST = "cheapest"


class RouteSearchRequest(BaseModel):
    """Request para buscar rutas"""
    origin: str = Field(..., description="Código de estación de origen")
    destination: str = Field(..., description="Código de estación de destino")
    departure_time: Optional[str] = Field(None, description="Hora de salida (HH:MM)")
    preference: PreferenceType = Field(PreferenceType.BALANCED, description="Preferencia del usuario")

    class Config:
        schema_extra = {
            "example": {
                "origin": "Periferico_Norte",
                "destination": "Central_de_Autobuses",
                "departure_time": "14:30",
                "preference": "balanced"
            }
        }


class RouteStep(BaseModel):
    """Un paso individual en la ruta"""
    station: str = Field(..., description="Nombre de la estación")
    station_id: str = Field(..., description="ID de la estación")
    line: str = Field(..., description="Línea de transporte")
    direction: Optional[str] = Field(None, description="Dirección del tren")
    instruction: str = Field(..., description="Instrucción para el usuario")
    duration: Optional[int] = Field(None, description="Duración en minutos")
    step_type: str = Field(..., description="Tipo de paso: board, transfer, transit, arrive")


class RouteMetrics(BaseModel):
    """Métricas de la ruta"""
    total_time: int = Field(..., description="Tiempo total en minutos")
    transfers: int = Field(..., description="Número de transbordos")
    cost: float = Field(..., description="Costo total del viaje")
    stations_count: int = Field(..., description="Número total de estaciones")
    walking_time: int = Field(default=0, description="Tiempo caminando en minutos")
    wait_time: int = Field(default=0, description="Tiempo de espera en minutos")


class ExpertExplanation(BaseModel):
    """Explicación del sistema experto"""
    summary: str = Field(..., description="Resumen de la decisión")
    reasoning: List[str] = Field(..., description="Pasos de razonamiento")
    factors: List[str] = Field(..., description="Factores considerados")
    alternatives: List[Dict[str, Any]] = Field(default_factory=list, description="Rutas alternativas")
    confidence: int = Field(..., description="Nivel de confianza (0-100)")


class Route(BaseModel):
    """Información completa de una ruta"""
    id: str = Field(..., description="ID único de la ruta")
    origin: str = Field(..., description="Estación de origen")
    destination: str = Field(..., description="Estación de destino")
    origin_name: str = Field(..., description="Nombre de estación de origen")
    destination_name: str = Field(..., description="Nombre de estación de destino")
    metrics: RouteMetrics = Field(..., description="Métricas de la ruta")
    steps: List[RouteStep] = Field(..., description="Pasos de la ruta")
    lines: List[str] = Field(..., description="Líneas utilizadas")
    explanation: ExpertExplanation = Field(..., description="Explicación del sistema experto")


class RouteSearchResponse(BaseModel):
    """Response de búsqueda de rutas"""
    routes: List[Route] = Field(..., description="Rutas encontradas ordenadas por preferencia")
    total_routes: int = Field(..., description="Número total de rutas encontradas")
    search_time: float = Field(..., description="Tiempo de búsqueda en milisegundos")


class CompareRoutesRequest(BaseModel):
    """Request para comparar rutas"""
    route_ids: List[str] = Field(..., description="IDs de rutas a comparar")


class ComparisonMetrics(BaseModel):
    """Métricas para comparación"""
    route_id: str
    time: int
    transfers: int
    cost: float
    lines: List[str]


class CompareRoutesResponse(BaseModel):
    """Response de comparación de rutas"""
    routes: List[ComparisonMetrics] = Field(..., description="Rutas comparadas")
    recommendation: str = Field(..., description="Recomendación basada en análisis")


class StationResponse(BaseModel):
    """Información de una estación"""
    id: str = Field(..., description="ID de la estación")
    name: str = Field(..., description="Nombre de la estación")
    lines: List[str] = Field(..., description="Líneas que pasan por la estación")


class AllStationsResponse(BaseModel):
    """Response con todas las estaciones"""
    stations: List[StationResponse] = Field(..., description="Lista de estaciones")
    total: int = Field(..., description="Número total de estaciones")

from fastapi import APIRouter, HTTPException, Query
from typing import List
from app.schemas.route_schema import (
    RouteSearchRequest, RouteSearchResponse,
    CompareRoutesRequest, CompareRoutesResponse,
    AllStationsResponse
)
from app.services.route_service import route_service

router = APIRouter(prefix="/api/routes", tags=["routes"])


@router.post("/search", response_model=RouteSearchResponse)
async def search_routes(request: RouteSearchRequest):
    is_valid, error_msg = route_service.validate_stations(request.origin, request.destination)
    if not is_valid:
        raise HTTPException(status_code=400, detail=error_msg)
    
    try:
        response = route_service.search_routes(request)
        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/compare", response_model=CompareRoutesResponse)
async def compare_routes(request: CompareRoutesRequest):
    if not request.route_ids:
        raise HTTPException(status_code=400, detail="Debe proporcionar al menos una ruta")
    
    if len(request.route_ids) < 2:
        raise HTTPException(status_code=400, detail="Debe proporcionar al menos 2 rutas para comparar")
    
    try:
        response = CompareRoutesResponse(
            routes=[],
            recommendation="Comparación disponible después de realizar una búsqueda"
        )
        return response
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/stations", response_model=AllStationsResponse)
async def get_all_stations():
    try:
        return route_service.get_all_stations()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/stations/{station_id}")
async def get_station(station_id: str):
    try:
        all_stations = route_service.get_all_stations()
        
        for station in all_stations.stations:
            if station.id == station_id:
                return station
        
        raise HTTPException(status_code=404, detail=f"Estación '{station_id}' no encontrada")
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/health")
async def health_check():
    return {
        "status": "ok",
        "service": "Route Optimization Expert System",
        "version": "1.0.0"
    }

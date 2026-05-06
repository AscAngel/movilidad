"""
Aplicación Principal FastAPI
Sistema Experto para Optimización de Rutas del Transporte Público
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging

from app.api.routes.routes import router as routes_router

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Crear aplicación FastAPI
app = FastAPI(
    title="Sistema Experto de Optimización de Rutas",
    description="Sistema experto basado en reglas para optimizar rutas del transporte público en la Zona Metropolitana de Guadalajara",
    version="1.0.0",
    docs_url="/api/docs",
    openapi_url="/api/openapi.json"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:8000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Registrar routers
app.include_router(routes_router)


# Rutas globales
@app.get("/", tags=["root"])
async def root():
    """Endpoint raíz"""
    return {
        "message": "Sistema Experto de Optimización de Rutas",
        "version": "1.0.0",
        "docs": "/api/docs"
    }


@app.get("/api/health", tags=["health"])
async def health_check():
    """Verificar estado del servicio"""
    return {
        "status": "ok",
        "service": "Route Optimization Expert System",
        "version": "1.0.0"
    }


@app.get("/api/info", tags=["info"])
async def get_info():
    """Obtener información del sistema"""
    return {
        "name": "Sistema Experto de Optimización de Rutas",
        "description": "Sistema basado en reglas para recomendación de rutas óptimas",
        "features": [
            "Búsqueda de rutas múltiples",
            "Optimización según preferencias del usuario",
            "Generación de explicaciones del razonamiento",
            "Comparación de rutas",
            "Información de líneas de transporte"
        ],
        "lines": ["L1", "L2", "L3", "L4", "L6", "L7"],
        "version": "1.0.0"
    }


@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """Manejador global de excepciones"""
    logger.error(f"Error no controlado: {exc}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Error interno del servidor"}
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        log_level="info"
    )

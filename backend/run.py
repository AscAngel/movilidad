"""
Script para iniciar la aplicación FastAPI
"""

import sys
import os
import uvicorn

# Agregar el directorio actual al path
sys.path.insert(0, os.path.dirname(__file__))

if __name__ == "__main__":
    # Iniciar el servidor Uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )

# Sistema Experto de Optimización de Rutas - Backend

Sistema basado en reglas para recomendación de rutas óptimas del transporte público en la Zona Metropolitana de Guadalajara.

## Descripción

Este backend implementa un motor de inferencia experto que:

- **Búsqueda de Rutas**: Utiliza algoritmo Dijkstra para encontrar múltiples caminos entre estaciones
- **Optimización**: Aplica reglas inteligentes según preferencias del usuario (tiempo, transbordos, costo)
- **Explicaciones**: Genera explicaciones en lenguaje natural del razonamiento de cada recomendación
- **Comparación**: Permite comparar múltiples rutas alternativas

## Características

✅ Base de conocimientos con 7 líneas de transporte (L1, L2, L3, L4, L6, L7)
✅ 140+ estaciones mapeadas en la red
✅ Motor de inferencia basado en reglas
✅ Generación automática de explicaciones
✅ API REST con FastAPI
✅ Consideración de horas pico
✅ Cálculo de costos
✅ Análisis de transbordos

## Instalación

### Requisitos Previos

- Python 3.9+
- pip (gestor de paquetes de Python)

### Pasos de Instalación

1. Navega al directorio backend:
```bash
cd backend
```

2. Crea un entorno virtual (recomendado):
```bash
python -m venv venv
```

3. Activa el entorno virtual:
   - En Windows:
   ```bash
   venv\Scripts\activate
   ```
   - En macOS/Linux:
   ```bash
   source venv/bin/activate
   ```

4. Instala las dependencias:
```bash
pip install -r requirements.txt
```

## Ejecución

### Modo Desarrollo

Para ejecutar el servidor en modo desarrollo con recarga automática:

```bash
python run.py
```

El servidor estará disponible en `http://localhost:8000`

### Acceso a la Documentación API

- **Swagger UI**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc
- **OpenAPI JSON**: http://localhost:8000/api/openapi.json

## Estructura del Proyecto

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # Aplicación FastAPI principal
│   ├── api/
│   │   └── routes/
│   │       ├── __init__.py
│   │       └── routes.py       # Endpoints REST
│   ├── core/
│   │   ├── __init__.py
│   │   └── config.py           # Configuración de la aplicación
│   ├── inference/
│   │   ├── __init__.py
│   │   └── engine.py           # Motor de inferencia experto
│   ├── services/
│   │   ├── __init__.py
│   │   └── route_service.py    # Servicio de lógica de negocio
│   ├── schemas/
│   │   ├── __init__.py
│   │   └── route_schema.py     # Modelos Pydantic
│   ├── knowledge/
│   │   ├── __init__.py
│   │   ├── graph.py            # Grafo de transporte
│   │   └── stations.py         # Base de datos de estaciones
├── run.py                      # Script de inicio
└── requirements.txt            # Dependencias Python
```

## API Endpoints

### Búsqueda de Rutas

**POST** `/api/routes/search`

Busca rutas óptimas entre dos estaciones.

Request:
```json
{
  "origin": "Periferico_Norte",
  "destination": "Central_de_Autobuses",
  "departure_time": "14:30",
  "preference": "balanced"
}
```

Response:
```json
{
  "routes": [...],
  "total_routes": 5,
  "search_time": 125.5
}
```

### Obtener Estaciones

**GET** `/api/routes/stations`

Obtiene todas las estaciones disponibles.

### Comparar Rutas

**POST** `/api/routes/compare`

Compara múltiples rutas.

### Health Check

**GET** `/api/health`

Verifica el estado del servicio.

## Motor de Inferencia

El motor implementa:

1. **Búsqueda de Caminos**: Dijkstra modificado para encontrar múltiples rutas
2. **Evaluación de Reglas**: Aplicación de preferencias del usuario
3. **Ranking**: Ordenamiento según criterios especificados
4. **Generación de Explicaciones**: Razonamiento en lenguaje natural

### Preferencias Soportadas

- `balanced`: Equilibrio entre tiempo y transbordos
- `fastest`: Minimizar tiempo total
- `least_transfers`: Minimizar número de transbordos
- `cheapest`: Minimizar costo

## Configuración

Las variables de configuración se encuentran en `app/core/config.py`:

- Tiempo de espera base
- Multiplicadores para horas pico
- Penalizaciones por transbordo
- Precios por línea
- Frecuencias de servicio

## Integración con Frontend

El backend debe ejecutarse simultáneamente con el frontend. El frontend se comunica con el backend en:

- **URL Base**: `http://localhost:8000`
- **CORS**: Habilitado para `http://localhost:5173` y `http://localhost:3000`

## Desarrollo

### Agregar una Nueva Línea

1. Edita `app/knowledge/graph.py` para agregar las estaciones
2. Edita `app/knowledge/stations.py` para agregar la información de estaciones
3. Actualiza `app/core/config.py` con la configuración de la línea

### Modificar Reglas de Inferencia

Edita los métodos en `app/inference/engine.py`:
- `rank_routes()`: Modificar criterios de ordenamiento
- `_generate_explanation()`: Actualizar explanaciones

## Troubleshooting

### Error: "Address already in use"

El puerto 8000 ya está siendo utilizado. Cambia en `run.py`:
```python
uvicorn.run(..., port=8001, ...)
```

### Error: "No module named 'app'"

Asegúrate de ejecutar desde el directorio `backend`:
```bash
cd backend
python run.py
```

### CORS Error

Si obtienes errores de CORS desde el frontend, verifica que la URL del frontend esté en `app.add_middleware()` en `app/main.py`.

## Performance

- Búsqueda de rutas: ~100-200ms para consultas normales
- Cálculo de explicaciones: ~20-50ms
- Tiempo total de respuesta: <500ms

## Licencia

Proyecto académico - Sistemas Basados en Conocimiento, CUCEI

## Contacto

Para preguntas o problemas con el backend, revisa la documentación en `/api/docs`

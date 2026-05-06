# GUÍA DE EJECUCIÓN - Sistema Experto de Optimización de Rutas

## Estado Actual

✅ **BACKEND FUNCIONANDO** - Puerto 8000
✅ **FRONTEND LISTO** - Puedes ejecutar en puerto 5173
✅ **INTEGRACIÓN COMPLETA** - Frontend se comunica con Backend

---

## PASO 1: EJECUTAR EL BACKEND

### Terminal 1 - Backend

```bash
cd "g:\CUCEI\8 Semestre\Sistemas Basados en Conocimiento\Movilidad\backend"
python run.py
```

**El servidor estará disponible en:**
- API: http://localhost:8000
- Documentación Swagger: http://localhost:8000/api/docs
- ReDoc: http://localhost:8000/api/redoc

---

## PASO 2: EJECUTAR EL FRONTEND

### Terminal 2 - Frontend

```bash
cd "g:\CUCEI\8 Semestre\Sistemas Basados en Conocimiento\Movilidad\frontend"
npm run dev
```

**El frontend estará disponible en:**
- http://localhost:5173

---

## CARACTERÍSTICAS IMPLEMENTADAS

### Backend (Motor de Inferencia)

✅ **Base de Conocimientos**
- 7 líneas de transporte (L1, L2, L3, L4, L6, L7)
- 140+ estaciones mapeadas
- Grafo de conectividad entre estaciones
- Información de precios y frecuencias

✅ **Motor de Inferencia**
- Algoritmo Dijkstra para búsqueda de caminos
- Múltiples rutas alternativas (hasta 5)
- Ranking según preferencias:
  - Equilibrado (tiempo 60% + transbordos 30% + costo 10%)
  - Más rápido
  - Menos transbordos
  - Más económico

✅ **Sistema Experto de Reglas**
- Consideración de horas pico/valle (multiplicadores de tiempo)
- Cálculo de tiempos de espera según frecuencia
- Penalizaciones por transbordos
- Cálculo de costos por línea
- Validación de estaciones

✅ **Generación de Explicaciones**
- Razonamiento en lenguaje natural
- Factores considerados
- Nivel de confianza (60-95%)
- Justificación de la selección

### API REST

**POST** `/api/routes/search` - Buscar rutas
```json
{
  "origin": "Periferico_Norte",
  "destination": "Central_de_Autobuses",
  "departure_time": "14:30",
  "preference": "balanced"
}
```

**GET** `/api/routes/stations` - Obtener todas las estaciones

**GET** `/api/health` - Verificar estado del servicio

**GET** `/api/info` - Obtener información del sistema

### Frontend

✅ **Interfaz de Usuario**
- Página principal con formulario de búsqueda
- Selección de origen y destino
- Selector de hora de salida
- Selector de preferencias
- Página de resultados con:
  - Ruta recomendada
  - Timeline de pasos
  - Métricas (tiempo, transbordos, costo)
  - Explicación del sistema experto
- Página de comparación de rutas
- Visualización gráfica (gráficos de barras y radar)
- Manejo de errores

---

## FLUJO DE USUARIO

1. **Página de Inicio** (`/`)
   - Usuario ingresa origen y destino
   - Selecciona hora de salida (opcional)
   - Elige preferencia

2. **Búsqueda** 
   - Frontend envía request al backend
   - Backend calcula múltiples rutas
   - Ordena según preferencia
   - Genera explicaciones

3. **Resultados** (`/resultados`)
   - Muestra ruta recomendada
   - Timeline de pasos
   - Métricas detalladas
   - Explicación del razonamiento

4. **Comparación** (`/comparar`)
   - Usuario ve todas las rutas alternativas
   - Puede seleccionar hasta 3 para comparar
   - Visualiza gráficos comparativos

---

## EJEMPLO DE BÚSQUEDA

### Request
```
Origen: Periferico_Norte
Destino: Central_de_Autobuses
Hora: 14:30
Preferencia: Equilibrado
```

### Response

**Ruta Recomendada:**
- Líneas: L1, L3
- Tiempo: 45 minutos
- Transbordos: 1
- Costo: $9.50
- Confianza: 87%

**Pasos:**
1. Aborda el Tren/Macrobús L1 en Periférico Norte (5 min espera)
2. Transbordo a Línea L3 en Ávila Camacho (5 min)
3. Continúa por L3 hasta Central de Autobuses

**Explicación:**
"Se identificaron rutas viables desde Periférico Norte a Central de Autobuses. La ruta óptima utiliza la(s) línea(s): L1, L3. La ruta incluye 1 transbordo(s) estratégicamente ubicados. El tiempo total estimado es de 45 minutos."

---

## ESTRUCTURA DE CARPETAS

```
Movilidad/
├── backend/
│   ├── app/
│   │   ├── inference/engine.py        ← Motor de inferencia
│   │   ├── services/route_service.py  ← Lógica de negocio
│   │   ├── api/routes/routes.py       ← Endpoints
│   │   ├── knowledge/                 ← Base de conocimientos
│   │   ├── schemas/                   ← Validación
│   │   └── core/config.py             ← Configuración
│   ├── run.py                         ← Iniciar servidor
│   └── requirements.txt
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── HomePage.jsx            ← Búsqueda
    │   │   ├── ResultsPage.jsx         ← Resultados
    │   │   └── ComparePage.jsx         ← Comparación
    │   ├── components/
    │   │   ├── search/SearchForm.jsx
    │   │   ├── results/
    │   │   ├── compare/
    │   │   └── ui/
    │   ├── services/api.js             ← Cliente API
    │   └── data/stations.js            ← Datos de estaciones
    ├── package.json
    └── vite.config.js
```

---

## PRUEBAS RECOMENDADAS

### Test 1: Búsqueda Simple
- Origen: `Juarez`
- Destino: `Central_de_Autobuses`
- Preferencia: `Equilibrado`
- ✅ Debe retornar ruta con L1 o L3

### Test 2: Múltiples Opciones
- Origen: `Periferico_Norte`
- Destino: `Las_Juntas`
- Preferencia: `Menos transbordos`
- ✅ Debe priorizar rutas con menos cambios

### Test 3: Hora Pico
- Origen: `Centro`
- Destino: `CUCEI`
- Hora: `14:00` (hora pico)
- ✅ Tiempos deben ser mayores que a las 10:00

### Test 4: Validaciones
- Origen: `Invalidoo`
- Destino: `CUCEI`
- ✅ Debe retornar error 400

---

## TROUBLESHOOTING

### Error: "Puerto 8000 ya en uso"
```bash
# Encontrar proceso en puerto 8000
netstat -ano | findstr :8000

# Matar proceso
taskkill /PID <PID> /F

# O cambiar puerto en run.py
```

### Error: "No se conecta a la API"
- ✅ Verificar que backend esté ejecutándose
- ✅ Verificar que frontend esté en http://localhost:5173
- ✅ Revisar CORS en app/main.py

### Error: "Módulo no encontrado"
```bash
# Reinstalar dependencias
cd backend
pip install -r requirements.txt
```

### Datos de prueba
Si deseas más rutas alternativas, puedes:
1. Modificar `max_paths` en `engine.py` (línea 63)
2. Ajustar penalizaciones en `config.py`

---

## DOCUMENTACIÓN API

Accede a http://localhost:8000/api/docs para:
- Probar endpoints en tiempo real
- Ver esquemas de datos
- Descargar especificación OpenAPI

---

## PRÓXIMOS PASOS OPCIONALES

1. **Agregar Persistencia**
   - Base de datos (PostgreSQL)
   - Caché (Redis)

2. **Mejorar Algoritmo**
   - Implementar Yen's Algorithm
   - A* con heurística de distancia real

3. **Features Avanzadas**
   - Horarios reales de trenes
   - Predicción de demanda
   - Feedback de usuarios
   - Rutas históricas favoritas

4. **Deployment**
   - Docker
   - Heroku o AWS
   - CI/CD con GitHub Actions

---

## CONTACTO

Proyecto académico - Sistemas Basados en Conocimiento, CUCEI 2025

---

**¡LISTO PARA USAR! 🚀**

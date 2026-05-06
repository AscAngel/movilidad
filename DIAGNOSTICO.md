# 🔧 DIAGNÓSTICO - Problema de Rutas No Encontradas

## Problema
El frontend muestra "No se encontraron resultados de búsqueda" aunque el backend funciona correctamente en PowerShell.

---

## 📋 Pasos de Diagnóstico

### Paso 1: Verificar Conexión Backend
El backend debe estar corriendo en puerto 8000:
```bash
cd backend
python run.py
# Debe ver: "Application startup complete"
```

### Paso 2: Probar API Directamente (Sin Frontend)
Abre una nueva terminal PowerShell y prueba:

```powershell
$body = '{"origin":"Centro","destination":"CUCEI","departure_time":"10:00","preference":"balanced"}'
$response = Invoke-RestMethod -Uri "http://localhost:8000/api/routes/search" -Method POST -ContentType "application/json" -Body $body
$response | ConvertTo-Json -Depth 2
```

**Esperado:**
- Sin errores 500/400
- Retorna un objeto JSON con `routes` (puede estar vacío pero válido)

### Paso 3: Verificar Frontend (Herramienta de Test)

#### 3a. Abrir la herramienta de test
1. En el mismo navegador donde usas la app, abre:
   ```
   file:///g:/CUCEI/8%20Semestre/Sistemas%20Basados%20en%20Conocimiento/Movilidad/frontend/test-api.html
   ```

2. Presiona "Health Check"
   - **✅ OK:** Conexión al backend funciona
   - **❌ ERROR:** Backend no accesible desde frontend

3. Presiona "Cargar Estaciones"
   - **✅ OK:** Verás lista de estaciones
   - **❌ ERROR:** Problema de conexión o CORS

4. Intenta "Buscar Rutas" con:
   - Origen: `Centro`
   - Destino: `CUCEI`
   - Hora: `10:00`
   - Preferencia: `Equilibrado`
   
   Presiona "Buscar Rutas"
   - **✅ OK:** Deberías ver 1+ ruta encontrada
   - **❌ ERROR:** Ver qué error exacto retorna

### Paso 4: Abrir Consola del Navegador
Abre DevTools (F12) → Consola y observa:

```
🔍 Enviando búsqueda al API:
   URL: /api/routes/search
   Payload: {
     "origin": "Centro",
     "destination": "CUCEI",
     ...
   }
✅ Respuesta del API:
   Total rutas: 1
   Tiempo búsqueda: 145.32 ms
```

---

## 🆘 Solución de Problemas

### Problema: Health Check falla ❌
**Causa:** Backend no está accesible
**Solución:**
1. Verifica que backend esté running en puerto 8000
2. Verifica CORS en `backend/app/main.py` - debe incluir `http://localhost:5173`
3. Intenta abrir directamente en navegador: `http://localhost:8000/api/health`

### Problema: Estaciones carga pero búsqueda no ❌
**Causa:** Problema con parámetros de búsqueda
**Solución:**
1. Verifica que origen/destino sean IDs válidos con guiones bajos
2. Revisa la consola del navegador (F12) para ver qué se envía
3. Comprueba que ambas estaciones existan en el backend

### Problema: Búsqueda retorna error 400 ❌
**Causa:** Estaciones inválidas o no existen
**Solución:**
1. Usa "Cargar Estaciones" para ver IDs válidos
2. Copia exactamente: `Centro`, `CUCEI`, etc.
3. Usa guiones bajos: `Periferico_Norte`, no `Periferico Norte`

### Problema: Búsqueda retorna 500 ❌
**Causa:** Error en backend
**Solución:**
1. Revisa la terminal del backend para ver el error
2. Asegúrate que `graph.py` y `stations.py` estén correctamente cargados
3. Reinicia el backend: `CTRL+C` y `python run.py`

---

## 📊 Estados Esperados

| Paso | Estado | Significado |
|------|--------|-------------|
| Health Check | 200 OK | Backend accesible ✅ |
| Load Stations | 200 OK + lista | API funciona ✅ |
| Search Routes | 200 OK + rutas | Sistema completo OK ✅ |
| Search Routes | 200 OK + [] | Rutas vacías (búsqueda válida pero sin conexión) |
| Cualquiera | 400 Bad Request | Parámetros inválidos |
| Cualquiera | 500 Server Error | Problema en backend |
| Cualquiera | Network Error | Backend no accesible |

---

## 🔍 Qué Revisar en ResultsPage

Si todo funciona en test-api.html pero falla en la app:

1. **F12 → Consola** (mientras haces búsqueda en la app)
2. Deberías ver los logs de `searchRoutes`:
   ```
   🔍 Enviando búsqueda al API:
      URL: /api/routes/search
      Payload: {...}
   ```
3. Si NO ves estos logs = búsqueda no se ejecuta (problema en SearchForm)
4. Si ves ERROR = problema de conexión o CORS

---

## 🧪 Test Manual Rápido

```bash
# Terminal 1: Backend
cd backend
python run.py

# Terminal 2: Frontend
cd frontend
npm run dev

# Terminal 3: Test
curl -X POST http://localhost:8000/api/routes/search \
  -H "Content-Type: application/json" \
  -d '{"origin":"Centro","destination":"CUCEI","departure_time":"10:00","preference":"balanced"}'
```

**Esperado:** JSON con rutas

---

## 📝 Reporte de Errores

Si aún tienes problemas, recopila:
1. Salida de consola (F12) cuando intentas buscar
2. Salida del backend en la terminal
3. Resultado de test-api.html
4. URL exacta que ves en barra de navegador

---

**PRÓXIMO PASO:** Abre `test-api.html` en tu navegador y cuéntame qué ves en cada prueba.

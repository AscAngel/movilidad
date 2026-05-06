# ✅ Solución - Pasos para Probar la Búsqueda

He actualizado el código del frontend para ser más robusto y agregar mejor logging.

## 🎯 Lo que cambié

1. **ResultsPage.jsx**: Ahora intenta buscar directamente desde el API si no hay cache
2. **api.js**: Agregué logging detallado para ver exactamente qué se envía y recibe
3. **Creé test-api.html**: Una herramienta de diagnóstico simple

## 🚀 Pasos para Probar

### 1. Asegúrate de que Backend está corriendo
```bash
cd backend
python run.py
```

Deberías ver:
```
INFO:     Application startup complete
```

### 2. Asegúrate de que Frontend está corriendo
En otra terminal:
```bash
cd frontend
npm run dev
```

Deberías ver:
```
VITE v5.X.X  ready in XXX ms
➜  Local:   http://localhost:5173/
```

### 3. ⚠️ IMPORTANTE: Recarga el navegador con Ctrl+Shift+R (para limpiar caché)

### 4. Abre el archivo de test para diagnóstico
En tu navegador, abre:
```
file:///g:/CUCEI/8%20Semestre/Sistemas%20Basados%20en%20Conocimiento/Movilidad/frontend/test-api.html
```

Haz clic en estos botones EN ORDEN:

1. **"Health Check"** → Debe decir ✅ Éxito
2. **"Cargar Estaciones"** → Debe listar estaciones
3. En la sección "Test Búsqueda":
   - Origen: `Centro`
   - Destino: `CUCEI`
   - Hora: `10:00`
   - Preferencia: `Equilibrado`
   - Click en **"Buscar Rutas"** → Debe encontrar 1+ ruta

### 5. Si todo funciona, intenta en la app
1. Ve a http://localhost:5173
2. Llena el formulario:
   - Origen: Centro
   - Destino: CUCEI
   - Dejar tiempo vacío (usa "now")
   - Preferencia: Equilibrado
3. Click en "Buscar Rutas"

### 6. Abre la Consola del Navegador (F12)
Mientras haces la búsqueda, abre F12 y ve la pestaña "Consola".

Deberías ver logs como:
```
🔍 Enviando búsqueda al API:
   URL: /api/routes/search
   Payload: {
     "origin": "Centro",
     "destination": "CUCEI",
     "departure_time": "10:00",
     "preference": "balanced"
   }
✅ Respuesta del API:
   Total rutas: 1
   Tiempo búsqueda: 145.32 ms
```

---

## 🆘 Si algo falla

### Error: "Network Error" en test-api.html
- ❌ Backend no está corriendo
- ✅ Solución: `cd backend && python run.py`

### Error: "Respuesta inválida del servidor"
- ❌ API devolvió algo inesperado
- ✅ Abre PowerShell y prueba:
  ```powershell
  $body = '{"origin":"Centro","destination":"CUCEI","departure_time":"10:00","preference":"balanced"}'
  Invoke-RestMethod -Uri "http://localhost:8000/api/routes/search" -Method POST -ContentType "application/json" -Body $body | ConvertTo-Json
  ```

### Aún sin rutas en ResultsPage
- Verifica la consola (F12) durante la búsqueda
- Reporta: ¿Qué ves en los logs de consola?

---

## 📝 Ejemplo de Búsquedas Válidas

| Origen | Destino | Línea | Transbordos |
|--------|---------|-------|------------|
| Centro | CUCEI | L3 | 0 |
| Centro | Mercado_del_Mar | L3 | 0 |
| Periferico_Norte | Central_de_Autobuses | L1→L3 | 1 |
| Arcos_de_Zapopan | Lincoln | L4 | 0 |

---

**Cuéntame qué ves en cada paso y en los logs de consola.**

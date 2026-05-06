# 🧪 EJEMPLOS DE PRUEBA Y CASOS DE USO

## 📋 Estaciones Disponibles para Pruebas

### Estaciones Principales por Línea

**Línea L1 (Roja):**
- `Periferico_Norte` - Norte
- `Centro` - Centro
- `CUCEI` - Zona de educación
- `Mercado_Central` - Comercio

**Línea L2 (Azul):**
- `Las_Juntas` - Oeste
- `Puente_Municipal` - Centro-oeste  
- `Centro` - Centro
- `Hospital_Civil` - Sur

**Línea L3 (Verde):**
- `Central_de_Autobuses` - Sur
- `Avenida_Mexico` - Centro-sur
- `Centro` - Centro
- `El_Retiro` - Norte-este

**Línea L4 (Naranja):**
- `Aeropuerto` - Noroeste
- `Chapalita` - Noroeste
- `Centro` - Centro
- `CUCEI` - Zona educación

**Línea L6 (Morado):**
- `Tlajomulco` - Sur
- `Santa_Teca` - Sur
- `Periferico_Sur` - Sur
- `Centro` - Centro

**Línea L7 (Rosa):**
- `Tonala` - Este
- `Puente_Grande` - Este
- `Centro` - Centro
- `Zapopan` - Noroeste

---

## ✅ Casos de Prueba Recomendados

### Prueba 1: Ruta Básica Simple (SIN Transbordos)
```
Origin: Centro
Destination: CUCEI
Preference: balanced
Time: 10:00

Expected Result:
- 1 ruta directa (L1 o L4)
- 0 transbordos
- ~20-25 minutos
- 100% confianza
```

### Prueba 2: Ruta CON Transbordo (Hora Pico)
```
Origin: Periferico_Norte
Destination: Central_de_Autobuses
Preference: balanced
Time: 14:30

Expected Result:
- Múltiples opciones (2-5 rutas)
- Algunas con 1-2 transbordos
- Tiempo ajustado por hora pico (1.3x)
- 70-90% confianza
```

### Prueba 3: Preferencia - MÁS RÁPIDO
```
Origin: Aeropuerto
Destination: Centro
Preference: fastest

Expected Result:
- Ruta más rápida primero
- Posibles múltiples transbordos
- Minimiza tiempo total
```

### Prueba 4: Preferencia - MENOS TRANSBORDOS
```
Origin: Las_Juntas
Destination: Centro
Preference: least_transfers

Expected Result:
- Ordena por número de transbordos
- Línea directa si existe
- Acepta tiempo mayor si necesario
```

### Prueba 5: Preferencia - MÁS ECONÓMICO
```
Origin: Centro
Destination: Tonala
Preference: cheapest

Expected Result:
- Busca minimizar costo
- Evita líneas caras (L1-L4: €6-7)
- Prefiere L6-L7 (€3.50)
```

---

## 🚨 Casos de Error para Validación

### Error 1: Estación No Existe
```
Origin: "Guadalajara_Centro" (mal escrito)
Expected: 400 Bad Request - Station not found
```

### Error 2: Origen = Destino
```
Origin: "Centro"
Destination: "Centro"
Expected: 400 Bad Request - Must be different
```

### Error 3: Formato de Hora Inválido
```
Time: "25:70"
Expected: 400 Bad Request - Invalid time format
```

---

## 🎯 Validación Manual de Resultados

### Checklist para cada búsqueda:

- [ ] Rutas: Al menos 1 encontrada
- [ ] Métricas: tiempo > 0, transfers >= 0, costo > 0
- [ ] Pasos: Mínimo 3 (board, transit, arrive)
- [ ] Explicación: Summary y reasoning presentes
- [ ] Confianza: Entre 60-95%
- [ ] Líneas: Corresponden al recorrido

**¡LISTO PARA EMPEZAR! 🧪**

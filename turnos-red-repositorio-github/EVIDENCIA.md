# Documento de Evidencia – TurnosRed Actividad 2

## 1. Ejecución de la API
**Captura a insertar:** servidor iniciado con `npm run dev` y respuesta de `GET /health`.

## 2. CRUD de Turnos
**Capturas a insertar:**
- GET /turnos → 200
- POST /turnos → 201
- PUT /turnos/:id → 200
- DELETE /turnos/:id → 204

## 3. CRUD de Médicos
**Capturas a insertar:**
- GET /medicos → 200
- POST /medicos → 201
- PUT /medicos/:id → 200
- DELETE /medicos/:id → 204

## 4. Validación Zod
**Captura a insertar:** POST con datos inválidos mostrando HTTP 400 y:

```json
{
  "status": 400,
  "message": "Error de validación en los datos ingresados",
  "code": "VALIDATION_ERROR",
  "details": []
}
```

## 5. Query params
**Capturas a insertar:**
- `/turnos?especialidad=Pediatría&fecha=14/08/2026&medicoId=1`
- `/medicos?especialidad=Odontología&disponible=true`

## 6. Tests automáticos
**Captura a insertar:** pestaña Test Results de Postman con los casos en verde.

## 7. Mock Server
**Captura a insertar:** una petición ejecutada contra el Mock Server y su Saved Response.

> No se deben fabricar capturas. Ejecutar las peticiones en Postman y pegar las capturas reales en este documento.

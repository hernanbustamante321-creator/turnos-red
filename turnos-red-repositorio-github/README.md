# TurnosRed – Actividad 2

Backend RESTful desarrollado con Node.js, TypeScript, Express, Zod y Socket.IO.

## Requisitos

- Node.js LTS
- npm
- Git
- Postman
- Visual Studio Code (recomendado)

## Instalación

```bash
npm install
cp .env.example .env
npm run dev
```

Para compilar y ejecutar:

```bash
npm run build
npm start
```

API: `http://localhost:3000`

## Variables de entorno

| Variable | Ejemplo | Descripción |
|---|---|---|
| PORT | 3000 | Puerto HTTP |
| DATA_DIR | ./data | Carpeta de archivos JSON |

## Estructura

```text
src/
├── controllers/
├── events/
├── middlewares/
├── models/
├── routes/
├── schemas/
├── services/
└── utils/
data/
├── medicos.json
└── turnos.json
```

## Endpoints

### Turnos

| Método | Ruta | Estado esperado |
|---|---|---|
| GET | /turnos | 200 |
| GET | /turnos/:id | 200 / 404 |
| POST | /turnos | 201 / 400 |
| PUT | /turnos/:id | 200 / 400 / 404 |
| DELETE | /turnos/:id | 204 / 404 |

Filtros:
- `/turnos?especialidad=Pediatría`
- `/turnos?fecha=14/08/2026`
- `/turnos?medicoId=1`

### Médicos

| Método | Ruta | Estado esperado |
|---|---|---|
| GET | /medicos | 200 |
| GET | /medicos/:id | 200 / 404 |
| POST | /medicos | 201 / 400 |
| PUT | /medicos/:id | 200 / 400 / 404 |
| DELETE | /medicos/:id | 204 / 404 |

Filtros:
- `/medicos?especialidad=Odontología`
- `/medicos?disponible=true`
- `/medicos?especialidad=Odontología&disponible=true`

## Formato de errores

```json
{
  "status": 400,
  "message": "Error de validación en los datos ingresados",
  "code": "VALIDATION_ERROR",
  "details": [
    {
      "field": "especialidad",
      "message": "La especialidad debe estar en Title Case/PascalCase"
    }
  ]
}
```

## Validaciones Zod

`documento` se maneja como `string` para admitir formatos flexibles. Las especialidades se validan con inicial mayúscula y resto de palabras en minúsculas, admitiendo caracteres acentuados.

Ejemplos válidos:
- Clínica médica
- Pediatría
- Odontología
- Nutrición

## Eventos

Se utiliza `EventEmitter` para registrar:
- `turno:creado`
- `turno:actualizado`
- `turno:eliminado`

Socket.IO queda integrado en el servidor para comunicación en tiempo real.

## Postman

Importar `turnos-red.postman_collection.json`.

La colección contiene:
- variable `baseUrl`
- variable `turnoId`
- variable `medicoId`
- pruebas automáticas para 200, 201, 400 y 404
- validación básica de estructuras JSON
- escenarios Happy Path y Bad Request / Not Found
- ejemplos de respuestas para Mock Server

## Uso de Inteligencia Artificial

| Tarea | Herramienta | Prompt | Respuesta generada | Ajuste manual aplicado |
|---|---|---|---|---|
| Arquitectura REST | ChatGPT | Diseñar una API RESTful para TurnosRed con Express y TypeScript. | Propuesta de rutas, controladores y servicios. | Adaptación de nombres y estructura al proyecto. |
| Schema Zod | ChatGPT | Crear schemas Zod para Turno y Médico con validación de documento y especialidad. | Código de validación Zod. | Ajuste de regex para caracteres acentuados y Title Case. |
| Middleware de errores | ChatGPT | Crear middleware Express con respuesta JSON uniforme. | Middleware con status, message, code y details. | Adaptación a la estructura de errores solicitada. |
| Filtros | ChatGPT | Agregar filtros por query params para turnos y médicos. | Lógica de filtrado en servicios. | Integración con las rutas existentes. |
| Postman | ChatGPT | Crear colección con tests para 200, 201, 400 y 404. | Scripts de pruebas y variables. | Ajuste de IDs y datos de prueba. |

> La tabla registra el uso de IA y los ajustes manuales realizados sobre el código generado.

## Nota sobre la implementación

La consigna de Actividad 2 especifica el recurso Médico pero no detalla un modelo completo de sus campos. Para esta implementación se utilizaron `id`, `nombre`, `especialidad` y `disponible` como modelo mínimo coherente con los endpoints y filtros solicitados.

# Workflow: /spec

Refinamiento de historias de usuario en especificaciones técnicas para SeedCoin.
Invoca el skill `spec-refiner` con el protocolo de preguntas progresivas.

## Cuándo usarlo

- Cuando el usuario describe una funcionalidad de forma vaga o incompleta.
- Antes de iniciar `/feature` en tareas complejas.
- Cuando hay ambigüedad en los requisitos que podría causar retrabajo.

## Protocolo de Ejecución

### Paso 1 — Captura de la Historia de Usuario
El agente pide al usuario que describa la funcionalidad en formato libre:
> "¿Qué quieres que haga el sistema? Descríbelo con tus palabras."

### Paso 2 — Análisis de Asunciones (spec-refiner)
El agente identifica las asunciones implícitas y las valida con **máximo 3 preguntas**:

Las preguntas siguen este orden de prioridad:
1. **¿Para quién?** — ¿Qué tipo de usuario o cuenta involucra?
2. **¿Qué pasa cuando...?** — Casos edge o errores.
3. **¿Cómo se ve el éxito?** — Criterio de aceptación concreto.

> ⚠️ No hacer más de 3 preguntas por ronda. Si se necesitan más, hacer una segunda ronda.

### Paso 3 — Generación de Criterios Given/When/Then
Con las respuestas, el agente genera la especificación:

```
## Historia de Usuario
Como [usuario], quiero [funcionalidad] para [beneficio].

## Criterios de Aceptación

### Escenario 1 — Caso Feliz
- Given: [estado inicial]
- When: [acción del usuario]
- Then: [resultado esperado]

### Escenario 2 — Caso Edge
- Given: [estado inicial]
- When: [acción del usuario]
- Then: [resultado esperado]

### Escenario 3 — Error / Validación
- Given: [estado inicial]
- When: [acción inválida]
- Then: [comportamiento del sistema]
```

### Paso 4 — Confirmación
El agente presenta la spec al usuario para revisión:
> "¿Esta especificación captura lo que necesitas? ¿Algún ajuste?"

### Paso 5 — Transición
Una vez aprobada la spec, el agente sugiere:
> "Spec lista. ¿Procedemos con `/feature` para implementarla?"

## Skills Requeridos

- `spec-refiner` (protocolo de preguntas progresivas)
- `sdd-spec` (formato de especificación SDD)

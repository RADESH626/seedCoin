# Workflow: /feature

Flujo SDD completo para implementar una nueva funcionalidad en SeedCoin.
Orquesta las 9 fases del Desarrollo Guiado por Especificaciones en un solo comando.

## Cuándo usarlo

- Al iniciar una funcionalidad nueva de complejidad media o alta.
- Cuando la tarea requiere cambios en DB, UI y lógica de negocio.
- Cuando el usuario quiere asegurarse de seguir el flujo SDD completo.

## Protocolo de Ejecución

> Cada fase invoca su skill correspondiente. El agente anuncia qué fase está ejecutando.

### Fase 1 — `sdd-init` · Inicialización
- Cargar contexto del proyecto (estructura, módulos existentes, Engram).
- Identificar archivos relacionados con la funcionalidad.

### Fase 2 — `sdd-explore` · Exploración
- Analizar el código existente relacionado.
- Identificar riesgos: colisiones de DB, breaking changes en API, dependencias.
- Estimar complejidad: Simple / Media / Alta.

### Fase 3 — `spec-refiner` · Refinamiento de Spec
- Si la descripción es vaga, hacer **máximo 3 preguntas** estratégicas.
- Convertir la descripción en criterios Given/When/Then.

### Fase 4 — `sdd-design` · Diseño Técnico
- Proponer esquema de DB (si aplica): tabla, columnas, tipos INTEGER para montos.
- Definir contratos de servicios y hooks.
- Documentar en un ADR si es una decisión arquitectónica importante.

### Fase 5 — `sdd-tasks` · Desglose de Tareas
- Crear checklist atómico ordenado (dependencias primero).
- Estimar esfuerzo relativo por tarea.

### Fase 6 — `sdd-apply` · Implementación (TDD)
- Seguir el ciclo Red → Green → Refactor.
- Usar `clean-code`: máximo 3 args, SRP, nombres descriptivos.
- Usar `ui-development` si hay componentes nuevos.
- Usar `database-core` si hay cambios en SQLite.

### Fase 7 — `sdd-verify` · Verificación
- Ejecutar `check.ps1`:
  ```powershell
  .\.agents\scripts\check.ps1
  ```
- Confirmar que los criterios Given/When/Then se cumplen.

### Fase 8 — `sdd-archive` · Archivado
- Guardar decisiones relevantes en Engram.
- Actualizar documentación si es necesario (`doc-writer`).

### Fase 9 — `git-handshake` · Commit
- Proponer mensaje de commit convencional.
- Esperar confirmación del usuario antes de committear.

## Skills Requeridos

- `sdd-init`, `sdd-explore`, `sdd-design`, `sdd-tasks`, `sdd-apply`, `sdd-verify`, `sdd-archive`
- `spec-refiner`
- `clean-code`, `ui-development`, `database-core` (según aplique)
- `verify-build`
- `git-handshake`

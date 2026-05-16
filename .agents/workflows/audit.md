# Workflow: /audit

Auditoría completa del proyecto SeedCoin.
Orquesta `deep-audit` + scripts de validación automática + reporte.

## Cuándo usarlo

- Antes de un release importante.
- Cuando el usuario pide "revisar el proyecto" o "auditar el código".
- Periódicamente para mantener la salud del código.

## Protocolo de Ejecución

### Paso 1 — Validación Automática
Ejecutar el script de verificación completa:

```powershell
# Desde la raíz del repositorio
.\.agents\scripts\verify.ps1
```

Analizar y reportar el resultado (✅ / ⚠️ / ❌) antes de continuar.

> Si hay errores críticos (❌), detener la auditoría y resolverlos primero con `/debug`.

### Paso 2 — Auditoría de Código (deep-audit)
Invocar el skill `deep-audit` con el alcance completo del proyecto:
- Mapear e inventariar todos los archivos en `mobile/src/`.
- Revisar cada archivo contra la Matriz de Mejores Prácticas.
- Etiquetar hallazgos: 🔴 CRÍTICO / 🟡 MEJORA / 🟢 LIMPIO.

### Paso 3 — Reporte
Crear un reporte en `documentacion/auditorias/audit_[YYYYMMDD].md` con:
- **Resumen ejecutivo:** puntuación general y temas principales.
- **Resultado de scripts:** output de `verify.ps1`.
- **Hallazgos por archivo:** tabla con ruta → calificación → problema → solución.
- **Plan de acción:** tareas ordenadas por prioridad (🔴 primero).

### Paso 4 — Cierre
- Si hay hallazgos críticos → proponer issues o tareas inmediatas.
- Invocar `git-handshake` para committear el reporte de auditoría.

## Skills Requeridos

- `deep-audit` (revisión de código)
- `verify-build` (validación automática)
- `clean-code` (referencia de estándares)
- `database-core` (para revisar queries)
- `doc-writer` (para crear el reporte)
- `git-handshake` (al finalizar)

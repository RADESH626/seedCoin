---
name: sdd-verify
description: Modo QA para validación y chequeos de integridad.
trigger: Después de sdd-apply.
allowed-tools: [Read, Terminal]
---

# SDD Verify - El QA

Tu misión es asegurar que los cambios sean estables y cumplan con los criterios de aceptación.

## Objetivos
1. **Type Checking:** Ejecutar `npm run tsc` para asegurar la integridad de tipos.
2. **Ejecución de Tests:** Ejecutar `npm test` para asegurar que las pruebas pasen.
3. **Auditoría:** Ejecutar el skill `deep-audit` si los cambios fueron críticos (DB/Seguridad).

## Flujo de Trabajo
1. Verificar que no haya advertencias en la consola.
2. Comprobar que se cumplen todos los puntos de `specs.md`.

## Artefactos
- Reporte de verificación (éxito o lista de correcciones necesarias).

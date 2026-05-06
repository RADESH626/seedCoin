---
name: verify-build
description: >
  Verificación de la integridad del proyecto tras cambios de código.
  Enfocado principalmente en el chequeo de tipos de TypeScript (tsc).
trigger: Después de crear o modificar cualquier código.
allowed-tools: [Read, Command]
metadata:
  author: seedcoin
  version: "1.0"
  scope: [mobile]
  auto_invoke: "Tras crear o modificar código para asegurar que no se introducen errores críticos"
---

# Verify Build Skill

Este skill asegura que cada cambio de código mantenga la integridad estructural del proyecto mediante el chequeo de tipos.

## Directiva Central

**OBLIGATORIO:** Tras completar cualquier modificación de código (.ts, .tsx), el agente DEBE ejecutar un chequeo de tipos para asegurar que no se han introducido errores de regresión.

## Procedimiento de Verificación

1. Navegar al directorio raíz del proyecto afectado (usualmente `mobile`).
2. Ejecutar el chequeo de tipos silencioso:

```powershell
npx tsc --noEmit
```

3. **Análisis de resultados:**
   - Si no hay errores (Exit Code 0), la tarea se considera verificada.
   - Si hay errores, identificar si fueron introducidos por el cambio actual.
   - **Grep/Filtro:** Para aislar errores en archivos modificados (Windows/PowerShell):
     ```powershell
     npx tsc --noEmit | Select-String "FileName"
     ```

## Línea Base de Errores

Si el proyecto ya tiene errores preexistentes (ruido), el agente debe asegurar que sus cambios **no incrementen** el conteo de errores ni afecten a archivos que antes estaban limpios.

## Comandos Útiles

| Acción | Comando |
| :--- | :--- |
| Chequeo Completo | `npx tsc --noEmit` |
| Chequeo Filtrado (Win) | `npx tsc --noEmit \| Select-String "pattern"` |
| Modo Watch | `npx tsc --noEmit --watch` |

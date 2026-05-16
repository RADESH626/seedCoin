---
name: verify-build
description: >
  Verificación de la integridad del proyecto tras cambios de código.
  Incluye chequeo de tipos TypeScript, ESLint, tests y calidad de código.
trigger: Después de crear o modificar cualquier código.
allowed-tools: [Read, Command]
metadata:
  author: seedcoin
  version: "2.0"
  scope: [mobile]
  auto_invoke: "Tras crear o modificar código para asegurar que no se introducen errores críticos"
---

# Verify Build Skill

Este skill asegura que cada cambio de código mantenga la integridad estructural del proyecto.
Dispone de dos niveles de verificación: rápido (uso diario) y completo (pre-commit).

## Directiva Central

**OBLIGATORIO:** Tras completar cualquier modificación de código (.ts, .tsx), el agente DEBE
ejecutar al menos el chequeo rápido para asegurar que no se han introducido regresiones.

## Niveles de Verificación

| Nivel | Script | Cuándo usar | Duración |
| :--- | :--- | :--- | :--- |
| **Rápido** | `check.ps1` | Tras cualquier cambio de código | ~10-15 seg |
| **Completo** | `verify.ps1` | Antes de commits o releases | ~30-60 seg |

## Scripts Disponibles

```powershell
# Chequeo rápido (TypeScript + ESLint + Tests)
# Ejecutar desde la raíz del repositorio:
.\.agents\scripts\check.ps1

# Verificación completa (+ expo-doctor + console.log + any + TODOs)
.\.agents\scripts\verify.ps1
```

## Checks por Nivel

### Chequeo Rápido (`check.ps1`)
- ✅ TypeScript sin errores (`tsc --noEmit`)
- ✅ ESLint sin warnings críticos (`expo lint`)
- ✅ Tests unitarios pasan (`jest --passWithNoTests`)

### Verificación Completa (`verify.ps1`)
Incluye todo lo anterior más:
- ✅ Expo Doctor (salud de dependencias y configuración)
- ⚠️ Detección de `console.log` de debug en `src/` (usar `react-native-logs`)
- ⚠️ Detección de `: any` explícito en TypeScript (usar `unknown` + type guards)
- ⚠️ Detección de TODOs / FIXMEs / HACs sin resolver

## Procedimiento Manual (Alternativo)

Si los scripts no están disponibles, ejecutar manualmente desde `mobile/`:

```powershell
npx tsc --noEmit
```

**Grep/Filtro** para aislar errores en archivos específicos:
```powershell
npx tsc --noEmit | Select-String "NombreArchivo"
```

## Línea Base de Errores

Si el proyecto ya tiene errores preexistentes, el agente debe asegurar que sus cambios
**no incrementen** el conteo de errores ni afecten archivos que antes estaban limpios.

## Interpretación de Resultados

| Salida | Significado | Acción |
| :--- | :--- | :--- |
| `🟢 Todo limpio` | Sin errores ni warnings | Proceder con commit |
| `🟡 Warnings` | Problemas de calidad no bloqueantes | Revisar antes de commit |
| `🔴 Errores` | Fallos críticos | Resolver antes de cualquier commit |

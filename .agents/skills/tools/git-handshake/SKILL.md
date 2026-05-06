---
name: git-handshake
description: >
  Protocolo para sugerir proactivamente git commits después de cualquier modificación de código o finalización de tarea.
  Trigger: Después de completar una tarea, corregir un bug o modificar el código base.
metadata:
  author: seedcoin
  version: "1.0"
  scope: [root]
  auto_invoke: "Tras finalizar cualquier implementación o refactorización"
---

## Cuándo usarlo

- SIEMPRE después de terminar una tarea descrita en un `implementation_plan.md` o `task.md`.
- Después de corregir un bug y verificarlo.
- Después de un refactor exitoso.
- Cuando el usuario pregunta "¿qué sigue?" o dice "listo".

## Patrones Críticos

1. **OBLIGATORIO:** DEBES sugerir proactivamente un git commit. No esperes a que el usuario lo pida.
2. **Commits Atómicos:** DEBES separar los commits por concepto lógico. Nunca mezcles refactors con nuevas funcionalidades, ni documentación con cambios de código en el mismo commit.
3. **Protocolo Handshake (Apretón de manos):** 
   - Declarar claramente que la tarea ha finalizado.
   - Presentar un **Mensaje de Commit Propuesto** siguiendo los estándares de conventional-commit.
   - Listar los archivos que fueron modificados.
   - PEDIR confirmación explícita antes de ejecutar el comando de commit.

3. **Estándares del Mensaje de Commit:**
   - Formato: `<tipo>(scope): <descripción>`
   - Tipos: `feat`, `fix`, `docs`, `refactor`, `style`, `test`, `chore`.
   - Descripción: Concisa, en modo imperativo ("Add feature" en lugar de "Added feature").
   - Máximo 72 caracteres para la primera línea.

## Ejemplo de Handshake

> **AI**: "He completado la tarea. He verificado los cambios y todo funciona correctamente.
> 
> **Propuesta de Commit:**
> `feat(mobile): remove maestro e2e testing infrastructure`
> 
> **Archivos modificados:**
> - `mobile/.maestro/` (eliminado)
> - `mobile/e2e/` (eliminado)
> - `mobile/app/(tabs)/index.tsx`
> 
> ¿Deseas que proceda con el commit?"

## Comandos

> [!CAUTION]
> **Advertencia de PowerShell:** NO encadenar estos comandos con `&&`. Ejecutarlos secuencialmente como llamadas a herramientas separadas para evitar errores de parseo (`ParserError`).

```powershell
# Paso 1: Stage de cambios
git add .

# Paso 2: Commit (SOLO después de la confirmación)
git commit -m "feat(mobile): descripción"
```

## Recursos

- **Guías:** Ver `AGENTS.md` (Commit & Pull Request Guidelines).

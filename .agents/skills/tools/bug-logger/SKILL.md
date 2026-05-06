---
name: bug-logger
description: >
  Skill especializado para documentar errores (bugs) y asegurar la persistencia del conocimiento.
  Trigger: Después de corregir un error complejo, sutil o recurrente.
metadata:
  author: seedcoin
  version: "1.0"
  scope: [root]
  auto_invoke: "Documentar un error resuelto para referencia humana y de la IA"
---

## Cuándo usarlo

- Después de corregir un error que tomó más de 5 minutos diagnosticar.
- Al resolver errores causados por configuraciones de librerías o comportamientos "misteriosos".
- Cuando una corrección implica un cambio de lógica no obvio.
- Cuando el usuario pide explícitamente documentar un error.

## Patrones Críticos

1. **Documentación Unificada:**
   - El archivo `.md` en `documentacion/registro de errores/` debe estar en **Español**.
   - El contenido de `mem_save` para Engram también debe estar en **Español** para mantener la consistencia del nuevo modelo de lenguaje.
2. **Ubicación:**
   - Categorizar el error en la subcarpeta apropiada (ej., `Logica`, `UI`, `SQLite`, `Navegacion`).
3. **Contenido Requerido:**
   - **Contexto:** ¿Qué estaba pasando?
   - **Causa Raíz:** ¿Por qué falló? (ser técnico).
   - **Antes/Después:** Snippets de código que muestran el error y la solución.

## Comandos

```bash
# Ejemplo de guardado en Engram
sqlite3 .agents/sdd/memory/engram.db "INSERT INTO observations (type, summary, content, tags) VALUES ('bug_fix', '[Resumen en Español]', '[Lógica detallada de la solución en Español]', 'bug, fix, nombre_modulo');"
```

## Recursos

- **Plantilla:** [assets/template.md](assets/template.md)
- **Registro de Errores:** `documentacion/registro de errores/`
- **Sistema de Memoria:** `.agents/sdd/memory/engram.db`

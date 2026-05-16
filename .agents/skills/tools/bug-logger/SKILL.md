---
name: bug-logger
description: >
  Skill especializado para documentar errores (bugs) y asegurar la persistencia del conocimiento.
  Trigger: Después de corregir un error complejo, sutil o recurrente.
metadata:
  author: seedcoin
  version: "2.0"
  scope: [root]
  auto_invoke: "Documentar un error resuelto para referencia humana y de la IA"
---

## Cuándo usarlo

- Después de corregir un error que tomó más de 5 minutos diagnosticar.
- Al resolver errores causados por configuraciones de librerías o comportamientos "misteriosos".
- Cuando una corrección implica un cambio de lógica no obvio.
- Cuando el usuario pide explícitamente documentar un error.

## Flujo de Documentación

### Paso 1 — Verificar que la causa raíz está identificada
Si el bug fue diagnosticado con el workflow `/debug` o el skill `systematic-debugging`,
la causa raíz ya estará confirmada. Si no, confirmarla antes de documentar.

Las 3 hipótesis descartadas también son valiosas — documentarlas evita que la IA repita
el mismo proceso de descarte en el futuro.

### Paso 2 — Registrar en Engram (memoria persistente)

```powershell
sqlite3 ".agents\sdd\memory\engram.db" "INSERT INTO observations (type, summary, content, tags) VALUES ('bug_fix', '[Resumen en Español]', '[Lógica detallada: síntoma, hipótesis descartadas, causa raíz, fix]', 'bug, fix, nombre_modulo');"
```

### Paso 3 — Crear archivo en el registro de errores
Crear `documentacion/registro de errores/[Categoria]/[YYYYMMDD]_[descripcion].md`
usando la plantilla estándar.

## Estructura del Registro (Contenido Requerido)

```markdown
## Contexto
¿Qué estaba pasando? ¿Qué funcionalidad se estaba implementando o usando?

## Síntoma
Mensaje de error exacto o comportamiento incorrecto observado.

## Hipótesis Descartadas
- ~~Hipótesis 1: [por qué se descartó]~~
- ~~Hipótesis 2: [por qué se descartó]~~

## Causa Raíz
[Explicación técnica concreta de por qué ocurrió el error]

## Solución
### Antes
[código con el bug]

### Después
[código corregido]

## Prevención
[Test o patrón para evitar la regresión]
```

## Patrones Críticos

1. **Idioma:** Todo en **Español** (docs y Engram).
2. **Categorización:** Subcarpeta apropiada (`Logica`, `UI`, `SQLite`, `Navegacion`, `Tipos`).
3. **Hipótesis descartadas:** Documentarlas es tan valioso como la causa raíz.

## Recursos

- **Plantilla:** [assets/template.md](assets/template.md)
- **Registro de Errores:** `documentacion/registro de errores/`
- **Sistema de Memoria:** `.agents/sdd/memory/engram.db`
- **Skill relacionado:** `systematic-debugging` (protocolo de diagnóstico previo)

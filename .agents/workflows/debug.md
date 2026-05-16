# Workflow: /debug

Protocolo de debugging sistemático para SeedCoin.
Inspirado en el agente `@debugger` de `antigravity-kit`.

## Cuándo usarlo

- Hay un error inesperado o un comportamiento extraño.
- Un bug pasó a producción o bloquea el desarrollo.
- El error toma más de 5 minutos en diagnosticar.

## Protocolo de Ejecución

El agente sigue estos pasos **en orden**, sin saltarse ninguno:

### Paso 1 — Recolección de Síntomas
Antes de tocar el código, pedir al usuario:
1. **¿Cuál es el error exacto?** (stack trace, mensaje, screenshot)
2. **¿Cuándo ocurre?** (siempre, intermitente, al hacer X acción)
3. **¿Qué cambió recientemente?** (último commit, dependencia nueva, migración de DB)

### Paso 2 — Análisis del Stack Trace
- Identificar el **archivo y línea exacta** del error.
- Distinguir entre error de superficie vs. causa raíz real.
- Verificar si el error existe en Engram (`systematic-debugging` → búsqueda en engram.db).

### Paso 3 — Hipótesis (máximo 3)
Listar las 3 causas más probables en orden de probabilidad:

```
Hipótesis 1 (más probable): [descripción]
Hipótesis 2: [descripción]
Hipótesis 3: [descripción]
```

### Paso 4 — Verificación Sistemática
Para cada hipótesis:
- Leer el código relevante con `view_file`.
- Confirmar o descartar la hipótesis con evidencia del código.
- **No proponer fix hasta confirmar la causa raíz.**

### Paso 5 — Fix Preciso
- Proponer el cambio mínimo necesario (diff exacto, no reescrituras).
- Si aplica, usar `Big.js` para cualquier corrección financiera.
- Verificar que el fix no rompe otros módulos relacionados.

### Paso 6 — Prevención
- Sugerir un test de regresión (Given/When/Then).
- Si el bug fue complejo → invocar `bug-logger` para documentarlo.
- Invocar `git-handshake` para proponer el commit.

## Skills Requeridos

- `systematic-debugging` (protocolo de diagnóstico)
- `clean-code` (al escribir el fix)
- `verify-build` (después del fix)
- `bug-logger` (si el bug fue complejo o recurrente)
- `git-handshake` (al finalizar)

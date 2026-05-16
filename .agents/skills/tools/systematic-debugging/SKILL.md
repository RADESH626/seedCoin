---
name: systematic-debugging
description: >
  Protocolo estructurado de diagnóstico de errores para SeedCoin.
  Basado en el agente @debugger de antigravity-kit.
  Trigger: Al iniciar el workflow /debug o cuando se diagnostica un error complejo.
trigger: Al analizar un error, bug o comportamiento inesperado.
allowed-tools: [Read, Grep, Command]
metadata:
  author: seedcoin
  version: "1.0"
  scope: [mobile]
  auto_invoke: "Cuando se diagnostica un bug o comportamiento inesperado en el código"
---

# Systematic Debugging Skill

Protocolo de diagnóstico en 6 pasos para resolver bugs de forma estructurada y reproducible.

## Principio Central

> **Nunca proponer un fix antes de confirmar la causa raíz.**
> Un fix sin diagnóstico crea deuda técnica y puede enmascarar el problema real.

## Protocolo de 6 Pasos

### 1. Recolección de Síntomas
Antes de revisar el código, recopilar:
- ✅ Mensaje de error exacto o stack trace completo.
- ✅ Condición de reproducción: ¿siempre ocurre? ¿intermitente?
- ✅ Último cambio conocido: commit, migración, dependencia nueva.
- ✅ Entorno afectado: ¿solo desarrollo? ¿también en build?

### 2. Búsqueda en Memoria (Engram)
Antes de analizar el código, verificar si el error ya fue resuelto:

```powershell
sqlite3 ".agents\sdd\memory\engram.db" "SELECT summary, content FROM observations WHERE type='bug_fix' AND (summary LIKE '%<keyword>%' OR tags LIKE '%<keyword>%') LIMIT 5;"
```

Si existe un registro → compartirlo con el usuario y preguntar si el contexto coincide.

### 3. Las 3 Hipótesis
Listar las 3 causas más probables ordenadas por probabilidad:

```
🔍 Hipótesis 1 (más probable): [descripción técnica concreta]
   Evidencia: [qué en el código apoya esta hipótesis]
   
🔍 Hipótesis 2: [descripción]
   Evidencia: [...]
   
🔍 Hipótesis 3: [descripción]
   Evidencia: [...]
```

### 4. Verificación Sistemática
Para cada hipótesis, en orden:
1. Usar `view_file` en los archivos implicados.
2. Buscar la evidencia que confirme o descarte.
3. Marcar la hipótesis como ✅ Confirmada / ❌ Descartada.
4. **Detener al encontrar la causa raíz** — no seguir verificando.

### 5. Fix Mínimo y Preciso
Con la causa raíz confirmada:
- Proponer el cambio **más pequeño posible** que resuelva el problema.
- Si involucra cálculos financieros → usar `Big.js` o integers.
- Si involucra SQLite → verificar atomicidad de la transacción.
- Presentar el diff al usuario antes de aplicar.

### 6. Prevención
- Sugerir un test unitario Given/When/Then que hubiera capturado el bug.
- Si el bug fue complejo → invocar `bug-logger`.
- Invocar `git-handshake` con tipo `fix` en el mensaje de commit.

## Técnicas de Diagnóstico Avanzado

| Técnica | Cuándo usarla |
|---|---|
| **Bisección binaria** | Bug intermitente o introducido hace varios commits |
| **Aislamiento mínimo** | Reducir el caso a la reproducción más simple posible |
| **Rubber duck** | Explicar el flujo en voz alta paso a paso |
| **Grep de patron** | Buscar el mismo patrón en otros archivos similares |

## Preguntas Diagnóstico de SeedCoin

Para bugs de **SQLite / base de datos:**
- ¿Está la operación dentro de una transacción?
- ¿Hay FOREIGN KEY constraint activo (`PRAGMA foreign_keys = ON`)?
- ¿El monto está en INTEGER (centavos) o en REAL (flotante)?

Para bugs de **UI / NativeWind:**
- ¿El className usa aliases del design system o valores hardcodeados?
- ¿El componente re-renderiza innecesariamente?
- ¿Hay un `SafeAreaView` / `standard-screen-px` faltante?

Para bugs de **navegación / Expo Router:**
- ¿La ruta dinámica tiene el archivo correcto en `app/`?
- ¿Los params se pasan correctamente con `useLocalSearchParams`?

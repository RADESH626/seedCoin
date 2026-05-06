---
name: clean-code
description: >
  Úsalo al escribir, refactorizar o revisar cualquier código (funciones, variables, componentes, comentarios, tests) en TypeScript/React Native.
  Aplica todos los principios de Clean Code — máximo 3 argumentos, responsabilidad única (SRP), nombres descriptivos, sin metadatos en comentarios y pruebas F.I.R.S.T.
trigger: Escribir, refactorizar o revisar código
allowed-tools: [Read, Edit, Write]
metadata:
  author: seedcoin
  version: "2.0"
  scope: [root, mobile]
  auto_invoke: "Al escribir, refactorizar o revisar variables/funciones/componentes/tests"
---

# Clean Code (TypeScript / React Native)

Este skill consolida los principios de Robert C. Martin (Nombres Limpios, Funciones Limpias, Comentarios Limpios, Tests Limpios) adaptados al stack de SeedCoin.

## 1. Nombres Limpios (Clean Names)
- **Nombres Descriptivos:** Deben revelar la intención. `SECONDS_PER_DAY` en lugar de `d`.
- **Abstracción Correcta:** `getAccountDirectory()` en lugar de `getArrayOfAccountObjects()`.
- **Nomenclatura del Dominio:** Usar términos de SeedCoin (`calculateBalance`).
- **Sin Codificaciones:** Evitar notación húngara (`strName`) y prefijos en interfaces (`IAccount`).
- **Convenciones de SeedCoin:** `camelCase` para variables/funciones, `PascalCase` para Componentes/Interfaces/Tipos, `UPPER_SNAKE_CASE` para constantes, `useXxx` para hooks, `onXxx`/`handleXxx` para callbacks.

## 2. Funciones Limpias (Clean Functions)
- **Máximo 3 Argumentos:** Si se necesitan más, usa una `interface` para agruparlos. Los componentes de React con >3 props deben usar una interfaz tipada.
- **Sin Argumentos de Salida:** Retornar nuevos valores en lugar de mutar los argumentos.
- **Sin Argumentos de Bandera (Flags):** Los booleanos como argumentos indican que la función hace dos cosas. Divídela.
- **Sin Funciones Muertas:** Eliminar código no utilizado (Dead Code).
- **Un Hook = Una Responsabilidad:** Los hooks deben estar especializados (ej., `useAccounts()`).

## 3. Comentarios Limpios (Clean Comments)
- **Sin Información Inapropiada:** Los metadatos (autor, fechas, tickets) pertenecen a Git.
- **Eliminar Obsoletos:** Borrar comentarios que describan código que ha cambiado.
- **Sin Redundancia:** Comenta el *POR QUÉ*, no el *QUÉ*.
- **Sin Código Comentado:** Bórralo. Git recuerda.
- **Cuándo Comentar:** Decisiones de negocio, advertencias sobre consecuencias, TODOs con contexto, aclaración de regex/queries complejas.

## 4. Tests Limpios (Clean Tests - Jest / SQLite / Maestro)
- **Principios F.I.R.S.T.:** Rápidos (Fast <100ms), Independientes, Repetibles, Auto-validables (Self-Validating), Oportunos (Timely).
- **Probar Condiciones de Borde:** Crítico en finanzas (cero, negativos, precisión decimal).
- **Un Concepto por Test:** No pruebes múltiples cosas en un solo bloque.
- **Sin Salto de Tests Triviales:** No uses `skip` a menos que haya una razón clara documentada.
- **Usar Mock DB:** No uses bases de datos reales lentas para unit tests.

## Comandos
```bash
# Type check
cd mobile && npx tsc --noEmit

# Ejecutar tests
cd mobile && npx jest
```

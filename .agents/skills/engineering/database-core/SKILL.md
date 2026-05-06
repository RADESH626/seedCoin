---
name: database-core
description: >
  Interacción central con SQLite, estándares de esquema, optimización de consultas y precisión financiera para SeedCoin.
trigger: Agregar o modificar esquemas/consultas de base de datos.
allowed-tools: [Read, Edit, Write]
metadata:
  author: seedcoin
  version: "2.0"
  scope: [mobile]
  auto_invoke: "Al crear o modificar tablas SQL, consultas u optimizar la base de datos"
---

# Database Core (SQLite)

Este skill consolida los estándares de esquema, consulta y persistencia para la arquitectura offline-first de SeedCoin.

## 1. Reglas Arquitectónicas
- **Solo SQLite Local:** Usar `expo-sqlite`. No usar APIs externas ni gestores de estado global como Redux a menos que sea estrictamente necesario.
- **Triggers para Cascada:** Usar SQLite Triggers en `schema.ts` para estados derivados como `current_balance`. No calcular estos en la capa de UI.

## 2. Precisión Financiera
- **REGLA DE ORO:** NUNCA usar `REAL` (punto flotante) para dinero.
- **Almacenamiento:** Usar `INTEGER` para todos los montos. Guardar los valores en la unidad más pequeña (centavos). Multiplicar por 100 al escribir, dividir por 100 al leer.

## 3. Optimización de Consultas
- **NUNCA SELECT *:** Siempre proyectar explícitamente. Ej., `SELECT id, amount FROM TRANSACTIONS`.
- **Indexación ESR:** Seguir la regla de Igualdad, Ordenación, Rango (Equality, Sort, Range) para los índices.
- **Explain Query Plan:** Usar `EXPLAIN QUERY PLAN` para verificar el uso de índices si la consulta es lenta.

## 4. Seguridad y Robustez
- **Consultas Parametrizadas:** Siempre usar `?` o `$name` para prevenir Inyección SQL. NUNCA concatenar strings.
- **Inserts Explícitos:** Nombrar las columnas en las sentencias `INSERT`.
- **Migraciones:** Incrementar `DATABASE_VERSION` en `database/index.ts` y gestionar la lógica en `migrateDbIfNeeded`.

## 5. Flujo de Trabajo
1. Comprobar si un hook personalizado en `hooks.ts` ya proporciona los datos.
2. Si no, extender `queries.ts`.
3. Si se cambian las tablas, actualizar `schema.ts` y `documentacion/diagramas/modelo_er.md`.

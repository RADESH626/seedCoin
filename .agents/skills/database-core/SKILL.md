---
name: database-core
description: >
  Core SQLite interaction, schema standards, query optimization, and financial precision for SeedCoin.
trigger: Adding or modifying database schema/queries
allowed-tools: [Read, Edit, Write]
metadata:
  author: seedcoin
  version: "2.0"
  scope: [mobile]
  auto_invoke: "Creating or modifying SQL tables, queries, or optimizing DB"
---

# Database Core (SQLite)

This skill consolidates schema, query, and persistence standards for SeedCoin's offline-first architecture.

## 1. Architectural Rules
- **Local SQLite Only**: Use `expo-sqlite`. Do not use external APIs or global state managers like Redux unless strictly required.
- **Triggers for Cascading**: Use SQLite Triggers in `schema.ts` for derived state like `current_balance`. Do not calculate these in the UI layer.

## 2. Financial Precision
- **GOLDEN RULE**: NEVER use `REAL` (floating point) for money.
- **Storage**: Use `INTEGER` for all amounts. Store values in the smallest unit (cents/pennies). Multiply by 100 on write, divide by 100 on read.

## 3. Query Optimization
- **NO SELECT ***: Always project explicitly. E.g., `SELECT id, amount FROM TRANSACTIONS`.
- **ESR Indexing**: Follow Equality, Sort, Range for indexes.
- **Explain Query Plan**: Use `EXPLAIN QUERY PLAN` to verify index usage if slow.

## 4. Security & Robustness
- **Parameterized Queries**: Always use `?` or `$name` to prevent SQL Injection. NEVER concatenate strings.
- **Explicit Inserts**: Name columns in `INSERT` statements.
- **Migrations**: Increment `DATABASE_VERSION` in `database/index.ts` and handle logic in `migrateDbIfNeeded`.

## 5. Workflow
1. Check if a custom hook in `hooks.ts` already provides the data.
2. If not, extend `queries.ts`.
3. If changing tables, update `schema.ts` and `documentacion/diagramas/modelo_er.md`.

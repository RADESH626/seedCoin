---
name: database
description: Core SQLite interaction and persistence standards for SeedCoin.
trigger: Designing or optimizing SQLite
allowed-tools: [Read, Edit, Write, Command]
---

# Database & Storage Skill (SQLite)

Este skill alinea al Agente de IA para interactuar correctamente con la persistencia local de la bóveda usando la base local en SeedCoin.

## 1. Propósito
Asegurar que todas las consultas SQL, mutaciones y estructuras relacionales respeten la arquitectura en la que la App no depende de ninguna API y delega el esfuerzo pesado a sentencias atómicas.

## 2. Ubicación de Archivos Relevantes
- **Lógica de DB (Queries & Schemas):** `mobile/src/database/`
- **Hooks Interactivos:** `mobile/src/database/hooks.ts`

## 3. Reglas del Proyecto (Estrictas)
1. **Unicamente SQLite local:** Usa `expo-sqlite`. Evita sugerir librerías de estado global excesivas (como Redux) o APis remotas (Fetch, Axios) a menos de que un requerimiento estrictamente lo demande.
2. **Uso de Triggers:** Cuando debas actualizar el balance total u otros campos por efecto en cascada, asume que operaciones atómicas (como `current_balance` o `remaining_amount`) están siendo manejadas eficientemente por los Triggers de SQLite escritos en `schema.ts`. No calcules esto en la capa de UI.
3. **Seguridad y Parámetros:** NUNCA concatene cadenas literal para hacer sentencias SQL. Siempre utiliza consultas preparadas con el arreglo de parámetros dinámicos (`tx.executeSql(query, [params])`) previstos para evitar Local SQL Injection y errores sintácticos.

## 4. Flujo de Trabajo Estándar
1. Ver si la data que la UI necesita ya es suplida por un custom hook existente dentro de `hooks.ts`. (ej. `useAccounts()`, `useDashboard()`).
2. Si no, extiende `queries.ts` para proveer la orden requerida.
3. Actualiza el Schema/Triggers en `schema.ts` **y** actualiza obligatoriamente `documentacion/diagramas/modelo_er.md` si existieron reducciones estructurales en la bóveda relacional de dinero.

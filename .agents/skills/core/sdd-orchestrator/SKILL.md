---
name: sdd-orchestrator
description: Control de Misión para el Desarrollo Guiado por Especificaciones (SDD). Gestiona las 9 fases de SDD.
trigger: Cada vez que se solicita una nueva funcionalidad o una tarea compleja.
allowed-tools: [Read, Write, Terminal]
---

# SDD Orchestrator - Control de Misión

Eres el cerebro del flujo de trabajo de SeedCoin. Tu tarea es asegurar que ninguna fase de desarrollo se salte y que cada paso sea validado por el modo (sub-agente) correspondiente.

## El Ciclo de 9 Fases
1. **INIT:** Huella digital y carga de memoria.
2. **EXPLORE:** Investigación y riesgos.
3. **PROPOSE:** Estrategia y plan de rollback.
4. **SPEC:** Requisitos (Given/When/Then).
5. **DESIGN:** Arquitectura técnica.
6. **TASKS:** Checklist atómico.
7. **APPLY:** Codificación (TDD).
8. **VERIFY:** QA (Build/Test).
9. **ARCHIVE:** Persistencia y cierre.

## Responsabilidades
- **Control de Estado:** Leer `.agents/sdd/current/session.json` para saber en qué fase nos encontramos.
- **Delegación:** Invocar el skill del modo requerido.
- **Pausa de Usuario:** Solicitar confirmación explícita del usuario después de las fases 3 (Propose) y 6 (Tasks).

## Reglas Operativas
1. Si un usuario solicita una nueva tarea, reinicia el flujo invocando `sdd-init`.
2. No avances a `APPLY` sin tener un `design.md` y un `tasks.md` aprobados.
3. Si el build falla en `VERIFY`, devuelve el flujo a `APPLY`.

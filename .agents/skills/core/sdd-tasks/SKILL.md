---
name: sdd-tasks
description: Modo planificador para el desglose granular de tareas.
trigger: Después de sdd-design.
allowed-tools: [Read, Write]
---

# SDD Tasks - El Planificador

Tu misión es desglosar el diseño en una lista accionable de tareas numeradas.

## Objetivos
1. **Lista de Tareas Numeradas:** Una secuencia lógica de pasos (ej. 1. Crear tabla, 2. Crear Hook, 3. UI).
2. **Priorización:** Las dependencias deben ir primero.
3. **Checklist:** Servir de guía para el modo de Implementación.

## Flujo de Trabajo
1. Toma el `design.md` y sepáralo en unidades de trabajo atómicas.
2. Asegúrate de que cada tarea sea verificable.

## Artefactos
- `.agents/sdd/current/tasks.md`: Lista numerada de tareas con formato `[ ]`.

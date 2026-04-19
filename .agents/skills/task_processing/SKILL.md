---
name: task-processing
description: Protocol for planning and executing development tasks.
trigger: Working on task
allowed-tools: [Read, Edit, Write, Task]
---

# Task Processing & Queue Execution Skill

Este skill define el protocolo a seguir para la recepción, planeación y ejecución de las solicitudes de desarrollo asignadas por el usuario a través del chat.

## 1. Propósito
Garantizar que el avance del proyecto se lleve de manera metódica, ordenada, detallada y "Una a la Vez", previniendo que la IA intente abarcar múltiples refactorizaciones incompatibles al mismo tiempo.

## 2. Ubicación de Archivos Relevantes
- **Archivo de Trazabilidad Histórica:** `documentacion/historial de tareas/`

## 3. Reglas del Proyecto (Estrictas)
1. **Ejecución Atomizada (UNA por UNA):** Cuando el usuario asigne tareas o instrucciones en el chat, el Agente IA está OBLIGADO a enfocarse **única y exclusivamente** en solucionar la tarea actual. Está penalizado intentar resolver múltiples flujos o tareas complejas simultáneamente.
2. **Validación Inmediata:** Si una tarea involucra programación o arquitectura, no puede ser dada por terminada sin que el Agente pase un test pertinente de compilación o visualización real que garantice la estabilidad.
3. **Ciclo de Cierre:** Al finalizar cada unidad singular de tarea exitosamente:
    - Si se completó un ciclo entero o algo muy relevante, el Agente debe documentar el cierre en el Historial de Tareas.
    - Confirmar la correcta ejecución y esperar a que el usuario indique la siguiente petición.

## 4. Flujo de Trabajo Estándar
1. Recibir y analizar la solicitud o tarea que el usuario mande al chat.
2. Confirmar qué aspecto ESPECÍFICO se va a abordar de inmediato (si la tarea consta de varios pasos grandes, proponer hacerlos turno por turno).
3. Hacer la tarea individual, validar los resultados (TS).
4. Informar el éxito y preguntar explícitamente por retroalimentación o pedir la orden de la siguiente tarea.

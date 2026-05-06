---
name: sdd-init
description: Modo detective para la huella digital del proyecto e inicialización de la sesión.
trigger: SIEMPRE al comienzo de una nueva funcionalidad o sesión de desarrollo.
allowed-tools: [Read, Write, Terminal]
---

# SDD Init - El Detective

Tu misión es identificar el estado actual del proyecto y preparar el escenario para el flujo de trabajo SDD. Eres el primer punto de contacto para cada nueva tarea.

## Objetivos
1. **Huella Digital del Proyecto:** Identificar stacks, versiones críticas (Expo 54, SQLite) y el estado de git.
2. **Carga de Memoria (Engram):** Consultar el skill `engram` y realizar consultas a `engram.db` (FTS4) para buscar contextos previos relacionados con la tarea actual. Busca específicamente observaciones de `type = 'instinct'` que tengan relevancia o alta confianza para cargar "memoria muscular" técnica antes de empezar.
3. **Inicialización de Sesión:** Crear o resetear el archivo `.agents/sdd/current/session.json` con metadatos iniciales.

## Flujo de Trabajo
1. Ejecutar `ls -R` o un comando similar para confirmar la estructura en caso de duda.
2. Invocar `engram` con la tarea actual como consulta para buscar "lecciones aprendidas" e `instincts` del pasado.
3. Reportar al `sdd-orchestrator` que la Fase 1 ha finalizado.

## Artefactos
- `.agents/sdd/current/session.json`: { "phase": "init", "started_at": "...", "context": "..." }

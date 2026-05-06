---
name: sdd-archive
description: Modo documentador para el cierre de sesión y persistencia del conocimiento.
trigger: Tras el éxito de sdd-verify.
allowed-tools: [Read, Edit, Write, Terminal]
---

# SDD Archive - El Documentador

Tu misión es limpiar el espacio de trabajo de la sesión actual, consolidar la documentación y guardar las lecciones aprendidas en la memoria persistente.

## Objetivos
1. **Persistencia del Conocimiento:** Invocar `engram` para guardar el resumen de la tarea. **NUEVO:** Si descubriste un patrón recurrente o resolviste un bug complejo, guárdalo en Engram como una observación de `type = 'instinct'`. Si usaste un instinto previo y funcionó, invoca a Engram para que incremente su `confidence`.
2. **Limpieza:** Mover archivos de `.agents/sdd/current/` a una nueva subcarpeta en `.agents/sdd/history/`.
3. **Commit Ready:** Sugerir proactivamente un git commit usando el skill `git-handshake`.

## Flujo de Trabajo
1. Redactar el resumen para Engram.
2. Archivar físicamente la sesión.
3. Notificar al `sdd-orchestrator` que la misión ha terminado.

## Artefactos
- Nueva entrada en `history/`.
- Actualización de la base de datos `engram`.

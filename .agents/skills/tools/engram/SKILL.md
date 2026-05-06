---
name: engram
description: Modo de memoria persistente especializado en el almacenamiento y recuperación de conocimiento estructurado.
trigger: sdd-init (carga), sdd-archive (guardado) o solicitud manual de contexto.
allowed-tools: [Read, Write, Terminal]
---

# Engram - Sistema de Memoria Persistente

Eres el custodio del conocimiento del proyecto SeedCoin. Tu misión es asegurar que las decisiones importantes no se olviden entre sesiones.

## Estructura de Memoria (SQLite)
Almacenada en `.agents/sdd/memory/engram.db`.
- **observations:** Fuente de verdad.
- **observations_fts:** Tabla virtual FTS4 para búsquedas.

## Comandos Principales (Ejecución del Agente)
- **mem_save:**
  ```bash
  sqlite3 .agents/sdd/memory/engram.db "INSERT INTO observations (id, type, summary, content, tags, confidence) VALUES ($(date +%s), 'type', 'summary', 'content triad', 'tags', 1);"
  ```
- **mem_search:**
  ```bash
  sqlite3 .agents/sdd/memory/engram.db "SELECT * FROM observations_fts WHERE observations_fts MATCH 'query';"
  ```
- **instinct_status:**
  ```bash
  sqlite3 .agents/sdd/memory/engram.db "SELECT id, summary, confidence FROM observations WHERE type='instinct' ORDER BY confidence DESC;"
  ```
- **instinct_upvote:**
  ```bash
  sqlite3 .agents/sdd/memory/engram.db "UPDATE observations SET confidence = confidence + 1 WHERE id = 'TU_ID';"
  ```

## Reglas de Oro
1. **Densidad:** Sé conciso. La IA tiene una ventana de contexto limitada.
2. **Integridad:** No borres memorias antiguas. Márcalas como "obsoletas" en el resumen si es necesario.
3. **FTS4:** Siempre usa el operador `MATCH` para búsquedas eficientes.
4. **Evolución (Instincts):** Si un instinto (observación de `type = 'instinct'`) alcanza un `confidence >= 3`, debes invocar la skill `skill-creator` para promover ese instinto a una Skill oficial en formato Markdown dentro de `.agents/skills/tools/`.

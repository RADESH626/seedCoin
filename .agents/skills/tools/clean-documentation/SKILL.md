---
name: clean-documentation
description: Estándares para la documentación del proyecto y reglas de idioma para las skills de IA.
trigger: Cada vez que creas o modificas documentación, skills o comentarios.
allowed-tools: [Read, Write]
---

# Clean Documentation (Modelo Unificado)

El proyecto SeedCoin sigue un modelo lingüístico unificado para servir eficientemente tanto a desarrolladores humanos como a agentes de IA.

## 1. División Lingüística (Basada en Directorio)
| Directorio Destino | Idioma | Descripción |
|------------------|----------|-------------|
| `documentacion/` | **Español** | Guías de usuario, diagramas de arquitectura y manuales legibles por humanos. |
| `.agents/`       | **Español** | Skills de IA, artefactos SDD, `AGENTS.md` y protocolos del sistema. |
| `mobile/src/`    | **Inglés**  | Lógica de código, nomenclatura e interfaces técnicas. |
| `mobile/src/`    | **Español** | Comentarios en el código (el "Por qué" del negocio). |

## 2. Estándares de Skills de IA (Regla Técnica)
**TODAS las Skills de IA (`.agents/skills/tools/*/SKILL.md`) DEBEN estar escritas en Español.**
- Por qué: Para permitir una auditoría directa por parte del usuario y mantener la consistencia con la documentación del proyecto.
- Excepción: Los términos técnicos estándar (ej. *Hooks, Commit, Redux, SQLite*) se mantienen en Inglés.

## 3. Documentación en el Código
Mientras que la **lógica** y la **nomenclatura** están en Inglés, los **comentarios** que describen el "Por qué" (lógica de negocio) o flujos complejos deben estar en **Español**.

```typescript
// ✅ Correcto
/**
 * Calcula el saldo total considerando el redondeo de transacciones pendientes.
 */
function calculateBalance() { /* ... */ }
```

## 4. Limpieza de Documentación
- **Sin documentos obsoletos:** Si una funcionalidad cambia, actualiza los archivos correspondientes en `documentacion/` inmediatamente.
- **Sin metadatos:** Los metadatos pertenecen a Git (Autor, Fecha, Versión).
- **Concisión:** La documentación debe ser de alta densidad y sin relleno (zero-boilerplate).

## 5. Regla de Persistencia
Si te encuentras explicando una regla más de una vez, añádela al sistema de memoria `engram`.

## 6. Estándar de Documentación de Errores
Cada error o bug encontrado debe documentarse en `documentacion/registro de errores/` con:
1.  **Causa:** La causa raíz del error.
2.  **Solución:** Solución técnica detallada.
3.  **Código (Antes/Después):** Snippets del código que causó el error y el código que lo corrigió.

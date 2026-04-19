---
name: clean-documentation
description: Standards for bilingual project documentation and AI skill language rules.
trigger: Every time you create or modify documentation, skills, or comments.
allowed-tools: [Read, Write]
---

# Clean Documentation (Bilingual Project Model)

The SeedCoin project follows a strict bilingual model to serve both human developers and AI agents efficiently.

## 1. The Bilingual Split (Directory-Based)
| Target Directory | Language | Description |
|------------------|----------|-------------|
| `documentacion/` | **Spanish** | User guides, architecture diagrams, and human-readable manuals. |
| `.agents/` | **English** | AI Skills, SDD artifacts, `AGENTS.md`, and system protocols. |
| `mobile/src/` | **English** | Code logic, naming, and technical interfaces. |
| `mobile/src/` | **Spanish** | Inline comments (Business "Why"). |

## 2. AI Skill Standards (Technical Rule)
**ALL AI Skills (`.agents/skills/*/SKILL.md`) MUST be written in English.**
- Why: Most LLMs perform more reliably on technical instructions in English.
- Exception: If the skill specifically describes how to handle Spanish text/formatting.

## 3. Inline Code Documentation
While the **logic** and **naming** are in English, the **comments** describing "Why" (business logic) or complex flows should be in **Spanish**.

```typescript
// ✅ Correct
/**
 * Calcula el saldo total considerando el redondeo de transacciones pendientes.
 */
function calculateBalance() { /* ... */ }

// ❌ Incorrect (AI Skill in Spanish)
// # Skill de base de datos
// Este skill sirve para...
```

## 4. Documentation Cleanup
- **No stale docs**: If a feature changes, update the corresponding `documentacion/` files immediately.
- **No metadata**: Metadata belongs in Git (Author, Date, Version).
- **Conciseness**: Documentation should be high-density and zero-boilerplate.

## 5. Persistence Rule
If you find yourself explaining a rule more than once, add it to the `engram` memory system.

## 6. Error Documentation Standard
Every error or bug encountered must be documented in `documentacion/registro de errores/` with:
1.  **Cause**: The root cause of the error.
2.  **Solution**: Detailed technical solution.
3.  **Code (Before/After)**: Snippets of the code that caused the error and the code that fixed it (if applicable).

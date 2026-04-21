---
name: bug-logger
description: >
  Specialized skill for documenting bugs and ensuring knowledge persistence.
  Trigger: After fixing a complex, subtle, or recurring bug.
metadata:
  author: seedcoin
  version: "1.0"
  scope: [root]
  auto_invoke: "Documenting a resolved bug for human and AI reference"
---

## When to Use

- After fixing a bug that took more than 5 minutes to diagnose.
- When resolving errors caused by library configurations or "misterious" behaviors.
- When a fix involves a non-obvious change in logic.
- When the user explicitly asks to document a bug.

## Critical Patterns

1. **Bilingual Documentation**:
   - The `.md` file in `documentacion/registro de errores/` MUST be in **Spanish** for human developers.
   - The `mem_save` content for the Engram MUST be in **English** for AI retrieval.
2. **Location**:
   - Categorize the bug in the appropriate subfolder (e.g., `Logica`, `UI`, `SQLite`, `Navegacion`).
3. **Required Content**:
   - **Context**: What was happening?
   - **Root Cause**: Why did it fail? (be technical).
   - **Before/After**: Code snippets showing the bug and the fix.

## Commands

```bash
# Example of Engram save (Engram Content in English)
sqlite3 .agents/sdd/memory/engram.db "INSERT INTO observations (type, summary, content, tags) VALUES ('bug_fix', '[Summary in English]', '[Detailed logic fix in English]', 'bug, fix, module_name');"
```

## Resources

- **Template**: [assets/template.md](assets/template.md)
- **Error Logs Log**: `documentacion/registro de errores/`
- **Memory System**: `.agents/sdd/memory/engram.db`

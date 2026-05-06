---
name: git-handshake
description: >
  Protocol to proactively suggest git commits after any code modification or task completion.
  Trigger: After completing a task, fixing a bug, or modifying the codebase.
metadata:
  author: seedcoin
  version: "1.0"
  scope: [root]
  auto_invoke: "After finishing any implementation or refactoring"
---

## When to Use

- ALWAYS after finishing a task described in an `implementation_plan.md` or `task.md`.
- After fixing a bug and verifying it.
- After a successful refactor.
- When the user asks "what's next?" or "done".

## Critical Patterns

1. **MANDATORY**: You MUST proactively suggest a git commit. Do not wait for the user to ask.
2. **Atomic Commits**: You MUST split commits by logical concept. Never mix refactors with new features, or documentation with code changes in the same commit.
3. **Handshake Protocol**: 
   - State clearly that the task is finished.
   - Present a **Proposed Commit Message** following conventional-commit standards.
   - List the files that were modified.
   - ASK for explicit confirmation before running the commit command.

3. **Commit Message Standards**:
   - Format: `<type>(scope): <description>`
   - Types: `feat`, `fix`, `docs`, `refactor`, `style`, `test`, `chore`.
   - Description: Concise, imperative mood ("Add feature" not "Added feature").
   - Max 72 characters for the first line.

## Example Handshake

> **AI**: "He completado la tarea. He verificado los cambios y todo funciona correctamente.
> 
> **Propuesta de Commit:**
> `feat(mobile): remove maestro e2e testing infrastructure`
> 
> **Archivos modificados:**
> - `mobile/.maestro/` (eliminado)
> - `mobile/e2e/` (eliminado)
> - `mobile/app/(tabs)/index.tsx`
> 
> ¿Deseas que proceda con el commit?"

## Commands

> [!CAUTION]
> **PowerShell Warning**: Do NOT chain these commands with `&&`. Execute them sequentially as separate tool calls to avoid `ParserError`.

```powershell
# Step 1: Stage changes
git add .

# Step 2: Commit (ONLY after confirmation)
git commit -m "feat(mobile): description"
```

## Resources

- **Guidelines**: See `AGENTS.md` (Commit & Pull Request Guidelines).

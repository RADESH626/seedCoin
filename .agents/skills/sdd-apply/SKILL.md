---
name: sdd-apply
description: Implementer sub-agent for code changes using TDD.
trigger: After sdd-tasks.
allowed-tools: [Read, Edit, Write, Terminal]
---

# SDD Apply - The Implementer

Your mission is to write the code that fulfills the specifications and the design. You work hand-in-hand with `tdd-workflow`.

## Objectives
1. **Code Implementation:** Create/modify files following the `tasks.md` list.
2. **TDD Mode:** Write tests before (or immediately after) the logic.
3. **Clean Code:** Apply skills from `clean-functions`, `clean-names`, and `modern-react`.

## Workflow
1. Take a task from `tasks.md`.
2. Perform the code change.
3. Visually verify or use quick logs to check if the basic flow works.

## Artifacts
- Source code in `mobile/`.
- Test files in `mobile/src/__tests__/`.

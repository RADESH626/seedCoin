---
name: verify-build
description: >
  Project integrity verification after code changes.
  Focused primarily on TypeScript type checking (tsc).
trigger: After creating or modifying any code
allowed-tools: [Read, Command]
metadata:
  author: seedcoin
  version: "1.0"
  scope: [mobile]
  auto_invoke: "After creating or modifying any code to ensure no breaking errors are introduced"
---

# Verify Build Skill

This skill ensures that every code change maintains the structural integrity of the project through type checking.

## Core Directive

**MANDATORY**: After completing any code modification (.ts, .tsx), the agent MUST run a type check to ensure no regression errors have been introduced.

## Verification Procedure

1. Navigate to the root directory of the affected project (usually `mobile`).
2. Run the silent type check:

```powershell
npx tsc --noEmit
```

3. **Analysis of results**:
   - If there are no errors (Exit Code 0), the task is considered verified.
   - If there are errors, identify if they were introduced by the current change.
   - **Grep/Filter**: To isolate errors in modified files (Windows/PowerShell):
     ```powershell
     npx tsc --noEmit | Select-String "FileName"
     ```

## Error Baseline

If the project already has pre-existing errors (noise), the agent must ensure that its changes **do not increase** the error count or affect files that were previously clean.

## Useful Commands

| Action | Command |
| :--- | :--- |
| Full Check | `npx tsc --noEmit` |
| Filtered Check (Win) | `npx tsc --noEmit \| Select-String "pattern"` |
| Watch Mode | `npx tsc --noEmit --watch` |

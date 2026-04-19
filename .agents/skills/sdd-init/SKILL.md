---
name: sdd-init
description: Detective sub-agent for project fingerprint and session initialization.
trigger: ALWAYS at the beginning of a new feature or development session.
allowed-tools: [Read, Write, Terminal]
---

# SDD Init - The Detective

Your mission is to identify the current project state and set the stage for the SDD workflow. You are the first point of contact for every new task.

## Objectives
1. **Project Fingerprint:** Identify stacks, critical versions (Expo 54, SQLite), and git state.
2. **Memory Load (Engram):** Consult the `engram` skill and query the `engram.db` (FTS4) to search for previous contexts related to the current task.
3. **Session Initialization:** Create or reset the `.agents/sdd/current/session.json` file with initial metadata.

## Workflow
1. Run `ls -R` or similar command to confirm the structure if in doubt.
2. Invoke `engram` with the current task as a query to check for "lessons learned" from the past.
3. Report to the `sdd-orchestrator` that Phase 1 is complete.

## Artifacts
- `.agents/sdd/current/session.json`: { "phase": "init", "started_at": "...", "context": "..." }

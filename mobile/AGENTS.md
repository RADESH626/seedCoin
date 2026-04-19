# AGENTS.md - Context and Guidelines for AI Agents

This file defines the context, skills, and development standards for AI agents working in the **Mobile** directory of the SeedCoin project.

## How to Use This Guide
- Start here for folder-specific norms regarding mobile app development.
- The code uses **English** for code, variables, logic, and AI systems, and **Spanish** for user-facing text and documentation.
- App stack: React Native, Expo SDK 54, NativeWind, SQLite.
- ALWAYS consult the **Auto-invoke Skills** table before performing any action.

## Auto-invoke Skills
When performing these actions, ALWAYS invoke the corresponding skill FIRST:

| Action | Skill |
|--------|-------|
| After code changes or testing | `verify-build` |
| Refactoring or fixing UI logic/styles | `frontend-development` |
| Writing React 19 / Expo / NativeWind code | `modern-react` |
| Implementing features or bug fixes | `tdd-workflow` |
| Naming hooks, functions, or variables | `clean-names` |
| Auditing mobile project | `deep-audit` |

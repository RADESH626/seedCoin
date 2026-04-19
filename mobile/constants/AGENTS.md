# AGENTS.md - Context and Guidelines for AI Agents

This file defines the context, skills, and development standards for AI agents working in the **mobile/constants** directory of the SeedCoin project.

## How to Use This Guide
- This directory is used for global configuration, tokens, constants, and colors.
- Use explicit types and strict `const` objects where possible.
- ALWAYS consult the **Auto-invoke Skills** table before performing any action.

## Auto-invoke Skills
When performing these actions, ALWAYS invoke the corresponding skill FIRST:

| Action | Skill |
|--------|-------|
| Adding strict TS enum alternatives or constants | `strict-typescript` |
| Auditing constant usages | `boy-scout` |
| Updating color palettes/theme | `styling` |

# AGENTS.md - Context and Guidelines for AI Agents

This file defines the context, skills, and development standards for AI agents working in the **mobile/src** directory of the SeedCoin project. This folder contains database management, hooks, services, and helpers.

## How to Use This Guide
- This directory is for data layers, business logic, and custom application hooks.
- Code should be strictly typed using TypeScript.
- ALWAYS consult the **Auto-invoke Skills** table before performing any action.

## Auto-invoke Skills
When performing these actions, ALWAYS invoke the corresponding skill FIRST:

| Action | Skill |
|--------|-------|
| Creating or modifying SQLite interactions | `clean-database` |
| Working with database adapters/providers | `database` |
| Abstracting business logic into hooks | `clean-functions` |
| Modifying data types and strict TS | `strict-typescript` |
| Naming services and variables | `clean-names` |
| Testing logic and database queries | `clean-tests` |

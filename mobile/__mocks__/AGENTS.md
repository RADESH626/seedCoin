# AGENTS.md - Context and Guidelines for AI Agents

This file defines the context, skills, and development standards for AI agents working in the **mobile/__mocks__** directory of the SeedCoin project.

## How to Use This Guide
- This folder keeps Jest and external library mocks to support isolated unit testing.
- ALWAYS consult the **Auto-invoke Skills** table before performing any action.

## Auto-invoke Skills
When performing these actions, ALWAYS invoke the corresponding skill FIRST:

| Action | Skill |
|--------|-------|
| Modifying or creating mock instances | `clean-tests` |
| Adapting existing TS structures to mocks | `strict-typescript` |

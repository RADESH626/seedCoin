# AGENTS.md - Context and Guidelines for AI Agents

This file defines the context, skills, and development standards for AI agents working in the **mobile/test** directory of the SeedCoin project.

## How to Use This Guide
- This repository follows TDD. The file contains the test suite and testing utils.
- Use F.I.R.S.T principals when creating tests.
- ALWAYS consult the **Auto-invoke Skills** table before performing any action.

## Auto-invoke Skills
When performing these actions, ALWAYS invoke the corresponding skill FIRST:

| Action | Skill |
|--------|-------|
| Writing unit or integration tests | `clean-tests` |
| TDD workflows | `tdd-workflow` |
| Checking testing integrity | `verify-build` |

# AGENTS.md - Context and Guidelines for AI Agents

This file defines the context, skills, and development standards for AI agents working in the **mobile/app** directory of the SeedCoin project. This folder contains the Expo Router navigation files and screens.

## How to Use This Guide
- This directory is specifically for screen components and navigation routing.
- Keep UI components atomized in the `mobile/components` folder instead of leaving complex markup inside `app/` files.
- ALWAYS consult the **Auto-invoke Skills** table before performing any action.

## Auto-invoke Skills
When performing these actions, ALWAYS invoke the corresponding skill FIRST:

| Action | Skill |
|--------|-------|
| Adding or modifying routes/screens | `routing` |
| Writing React 19 / Expo components | `modern-react` |
| Implementing screens or UI logic | `frontend-development` |
| Naming files or routes | `clean-names` |
| Creating tests for navigation | `clean-tests` |
| Verifying changes | `verify-build` |

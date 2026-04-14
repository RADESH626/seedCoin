# AGENTS.md - Context and Guidelines for AI Agents

This file defines the context, skills, and development standards for AI agents working on the **SeedCoin** project.

## 1. Repository Guidelines

*   **Language Standard (Bilingual Model):** 
    *   **Spanish (Human-First):** Used for codebase comments, general documentation (`documentacion/`), and root files (`README.md`, `run.bat`).
    *   **English (AI-First):** Used for all system-level files within `.agents/` (Skills, Knowledge, Metadata) to ensure AI precision. Variable and function names must be in English (camelCase).
*   **Clean Code:** Maintain SOLID, DRY, and KISS principles.
*   **Standardization:** Follow Java (Google Style) and TypeScript (Standard/Prettier) style conventions.
*   **Documentation:** Update `README.md` and internal documentation when making significant changes.

## 2. Available Skills

### Generic Skills
General technical skills required for the SeedCoin mobile technology stack.

| Skill | Description | URL |
| :--- | :--- | :--- |
| `react-native` | Mobile Framework | [React Native Docs](https://reactnative.dev/docs/getting-started) (v0.81.5) |
| `expo` | App Router & Build | [Expo Docs](https://docs.expo.dev/) (SDK 54) |
| `expo-router` | Enrutamiento | [Expo Router](https://docs.expo.dev/router/introduction/) (v6) |
| `react` | UI Library | [React Docs](https://react.dev/) (v19) |
| `typescript` | Frontend Language | [TypeScript Docs](https://www.typescriptlang.org/) (v5.9) |
| `nativewind` | CSS/NativeWind | [NativeWind Docs](https://www.nativewind.dev/) (v4.2 con Tailwind 3.4) |
| `sqlite` | Local Database | [Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/) (v16) |

### SeedCoin-Specific Skills
Project-specific domain knowledge.

| Skill | Description | Location Details |
| :--- | :--- | :--- |
| `ui-components` | Reusable component library (Buttons, Inputs, Modals). | `mobile/components` |

### Auto-invoke Skills
Mapping of developer intents to specific Agent Skills.

| User Intent / Action | Skill to Invoke | Location |
| :--- | :--- | :--- |
| At the start of every task or session | **AI Knowledge Base** | `.agents/KNOWLEDGE.md` |
| Create interfaces, fix Frontend styles or logic | **Frontend Development Skill** | `.agents/skills/frontend_development/SKILL.md` |
| Create a new skill for the agent | **Skill Creator** | `.agents/skills/skill-creator/SKILL.md` |
| Writing, fixing, or refactoring functions/hooks | **Clean Functions** | `.agents/skills/clean-functions/SKILL.md` |
| Naming, renaming, or reviewing variables/functions/components | **Clean Names** | `.agents/skills/clean-names/SKILL.md` |
| Writing, fixing, or reviewing tests (Jest/SQLite/Maestro) | **Clean Tests** | `.agents/skills/clean-tests/SKILL.md` |
| Fixing, editing, debugging, or working with any TS/RN code | **Boy Scout** | `.agents/skills/boy-scout/SKILL.md` |
| Writing, fixing, or reviewing comments and inline documentation | **Clean Comments** | `.agents/skills/clean-comments/SKILL.md` |
| Writing or reviewing TypeScript types, interfaces, or generics | **Strict TypeScript** | `.agents/skills/strict-typescript/SKILL.md` |
| Implementing feature, fixing bug, or refactoring with TDD | **TDD Workflow** | `.agents/skills/tdd-workflow/SKILL.md` |
| Writing React 19 / React Native / Expo Router components | **Modern React** | `.agents/skills/modern-react/SKILL.md` |
| Creating git commits or preparing code for commit | **Clean Commits** | `.agents/skills/clean-commits/SKILL.md` |
| Creating or modifying a skill, syncing AGENTS.md | **Skill Sync** | `.agents/skills/skill-sync/SKILL.md` |
| Writing or refactoring React components/performance | **React Best Practices** | `.agents/skills/vercel-react-best-practices/SKILL.md` |
| Writing or reviewing TypeScript code Patterns | **TS Best Practices** | `.agents/skills/typescript-best-practices/SKILL.md` |
| Designing or optimizing SQLite databases | **SQLite Expert** | `.agents/skills/sqlite-database-expert/SKILL.md` |
| Optimizing SQL queries and schema design | **SQL/Postgres Best Practices** | `.agents/skills/supabase-postgres-best-practices/SKILL.md` |
| Writing or refactoring SQL, schema, or indexes | **Clean Database** | `.agents/skills/clean-database/SKILL.md` |
| Deep project review or best practice audit | **Deep Audit** | `.agents/skills/deep-audit/SKILL.md` |

## 3. Project Overview

**SeedCoin** is a personal platform for secure and efficient financial management, allowing users to control income, expenses, and visualize their financial health.

### Main Components

| Component | Path | Description |
| :--- | :--- | :--- |
| **Mobile App** | `mobile/` | **React Native / Expo** application. Maneja la interfaz de usuario, estado global, y base de datos local SQLite. |
| **Documentation** | `documentacion/` | User manuals, diagrams, and additional technical guides. |

## 4. Development

### Setup & Run
Essential commands to set up the development environment.

**Mobile (Expo):**
```bash
cd mobile
npm install
npm start
# Úsalo via Expo Go o en la web.
```

### Quick Script (Windows)
Run `run.bat` in the root to start both services simultaneously.

### Code Quality
*   **Backend:** Run `./mvnw test` for unit tests.
*   **Frontend:** Run `npm run lint` for static analysis.

## 5. Commit & Pull Request Guidelines

### Conventional Commits
Follow the format: `<type>[optional scope]: <description>`

*   `feat`: New functionality (e.g., `feat(auth): login endpoint`).
*   `fix`: Bug corrections (e.g., `fix(ui): responsive navbar`).
*   `docs`: Documentation changes.
*   `refactor`: Code change that neither adds features nor fixes bugs.
*   `test`: Add or correct tests.
*   `chore`: Maintenance, dependencies, configuration.

### Pull Requests
*   Descriptive title following Conventional Commits.
*   Clear description of changes made.
*   Ensure tests pass before requesting review.

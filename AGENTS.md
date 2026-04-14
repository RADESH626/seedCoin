# AGENTS.md - Context and Guidelines for AI Agents

This file defines the context, skills, and development standards for AI agents working on the **SeedCoin** project.

## 1. Repository Guidelines

*   **Language:** Code and documentation should be predominantly in **Spanish**, although variable and function names in code can be in English (camelCase for Java/JS).
*   **Clean Code:** Maintain SOLID, DRY, and KISS principles.
*   **Standardization:** Follow Java (Google Style) and TypeScript (Standard/Prettier) style conventions.
*   **Documentation:** Update `README.md` and internal documentation when making significant changes.

## 2. Available Skills

### Generic Skills
General technical skills required for the SeedCoin technology stack.

| Skill | Description | URL |
| :--- | :--- | :--- |
| `java-17` | Main Backend language | [Java 17 Docs](https://docs.oracle.com/en/java/javase/17/) |
| `spring-boot-3` | Backend Framework | [Spring Boot Docs](https://spring.io/projects/spring-boot) |
| `mysql` | Relational Database | [MySQL Docs](https://dev.mysql.com/doc/) |
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
| `financial-logic` | Business logic for accounts, transactions, and budgets. | `seedCoin/src/main/java/com/seedcoin` |
| `jwt-auth` | Security implementation with Spring Security and JWT. | `seedCoin/src/main/java/com/seedcoin/security` |
| `api-endpoints` | API REST structure and contracts. | `seedCoin/src/main/java/com/seedcoin/controller` |
| `ui-components` | Reusable component library (Buttons, Inputs, Modals). | `frontend/components` |

### Auto-invoke Skills
Mapping of developer intents to specific Agent Skills.

| User Intent / Action | Skill to Invoke | Location |
| :--- | :--- | :--- |
| Modify, refactor, or create Backend endpoints | **Backend Development Skill** | `.agent/skills/backend_development/SKILL.md` |
| Create interfaces, fix Frontend styles or logic | **Frontend Development Skill** | `.agent/skills/frontend_development/SKILL.md` |
| Create integration tests, E2E, or validate flows | **E2E Testing Skill** | `.agent/skills/e2e_testing/SKILL.md` |
| Map code styles to Pencil components | **Pencil Component Properties** | `.agent/skills/pencil/component-properties/SKILL.md` |
| Adapt code using Pencil properties | **Pencil-to-Code** | `.agent/skills/pencil/pencil-to-code/SKILL.md` |
| Create a new skill for the agent | **Skill Creator** | `.agent/skills/skill-creator/SKILL.md` |
| Writing, fixing, or refactoring functions/hooks | **Funciones Limpias** | `.agent/skills/funciones-limpias/SKILL.md` |
| Naming, renaming, or reviewing variables/functions/components | **Nombres Limpios** | `.agent/skills/nombres-limpios/SKILL.md` |
| Writing, fixing, or reviewing tests (Jest/SQLite/Maestro) | **Tests Limpios** | `.agent/skills/tests-limpios/SKILL.md` |
| Fixing, editing, debugging, or working with any TS/RN code | **Boy Scout** | `.agent/skills/boy-scout/SKILL.md` |
| Writing, fixing, or reviewing comments and inline documentation | **Comentarios Limpios** | `.agent/skills/comentarios-limpios/SKILL.md` |
| Writing or reviewing TypeScript types, interfaces, or generics | **TypeScript Estricto** | `.agent/skills/typescript-estricto/SKILL.md` |
| Implementing feature, fixing bug, or refactoring with TDD | **TDD Workflow** | `.agent/skills/tdd-workflow/SKILL.md` |
| Writing React 19 / React Native / Expo Router components | **React Moderno** | `.agent/skills/react-moderno/SKILL.md` |
| Creating git commits or preparing code for commit | **Commits Limpios** | `.agent/skills/commits-limpios/SKILL.md` |
| Creating or modifying a skill, syncing AGENTS.md | **Skill Sync** | `.agent/skills/skill-sync/SKILL.md` |

## 3. Project Overview

**SeedCoin** is a personal platform for secure and efficient financial management, allowing users to control income, expenses, and visualize their financial health.

### Main Components

| Component | Path | Description |
| :--- | :--- | :--- |
| **Backend API** | `seedCoin/` | **Spring Boot** application exposing the REST API. Contains business logic, data access (JPA), and security. |
| **Mobile App** | `mobile/` | **React Native / Expo** application. Maneja la interfaz de usuario, estado global, y base de datos local SQLite. |
| **Documentation** | `documentacion/` | User manuals, diagrams, and additional technical guides. |

## 4. Development

### Setup & Run
Essential commands to set up the development environment.

**Backend (Java):**
```bash
cd seedCoin
./mvnw spring-boot:run
# Server runs on: http://localhost:8080
```

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

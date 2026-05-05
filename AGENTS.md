# AGENTS.md - Context and Guidelines for AI Agents

This file defines the context, skills, and development standards for AI agents working on the **SeedCoin** project.

## How to Use This Guide
- Start here for project-wide norms and AI behaviors.
- The repository follows a bilingual model: **Spanish** for humans (docs, comments), **English** for AI/System (skills, code, logic).
- Local skills in `.agents/skills/` provide detailed patterns on-demand.
- ALWAYS consult the **Auto-invoke Skills** table before performing any action.

## Constitutional Principles (`/speckit.constitution`)
This section acts as the project's **Constitution**, governing all AI decisions:
1. **Code Quality**: Enforce Clean Code principles (SRP, DRY). Leave code cleaner than you found it (Boy Scout rule).
2. **Testing Standards**: Follow Test-Driven Development (TDD). Tests must be Fast, Isolated, Repeatable, Self-Validating, and Timely (F.I.R.S.T.).
3. **UX & UI Consistency**: Follow the Dark-First design system. UI must be atomic, reusable, and strictly use NativeWind aliases (`text-h1`, `bg-dark-900`) instead of hardcoded values.
4. **Financial Integrity**: All numeric calculations must use `Big.js` or integer cents to avoid floating-point errors. No exceptions.
5. **Architectural Purity**: Offline-first using SQLite. Logic must be separated from UI hooks.
6. **Doc-Driven Development**: Documentation precedes code. Specs and ADRs must be written in `documentacion/` (Diátaxis format) before implementation.
7. **Strict TypeScript**: NEVER use `any`. Use `unknown` + type guards. Use `as const` for enums. Prefer flat interfaces. Model coupled optionals as discriminated unions.
8. **AI-Human Handshake Protocol**: NEVER execute destructive tools (Git commits, large refactors) without presenting a Mini-Plan first. Wait for explicit confirmation unless the user specifies "--force". Prioritize precise diffs over full-file replacements.

## Available Skills

### Generic Skills (Any Project)
| Skill | Description | URL |
|-------|-------------|-----|
| `typescript` | Const types, flat interfaces, utility types | [TypeScript Docs](https://www.typescriptlang.org/) |
| `react-19` | Modern React 19 patterns (no useMemo/useCallback by default) | [React Docs](https://react.dev/) |
| `react-native` | Mobile Framework conventions | [React Native Docs](https://reactnative.dev/docs/getting-started) |
| `expo-54` | App Router, SDK 54, SQLite, and Build | [Expo Docs](https://docs.expo.dev/) |
| `nativewind-4` | Tailwind 3.4 for Native, className patterns | [NativeWind Docs](https://www.nativewind.dev/) |
| `tdd` | Test-Driven Development workflow | [TDD Workflow](.agents/skills/tdd-workflow/SKILL.md) |

### SeedCoin-Specific Skills
| Skill | Description | URL |
|-------|-------------|-----|
| `clean-code` | Max 3 args, SRP, Clean Names, F.I.R.S.T Tests, No unused code | [.agents/skills/clean-code/SKILL.md](.agents/skills/clean-code/SKILL.md) |
| `ui-development` | React 19, UI Atomization, NativeWind styling (Dark First) | [.agents/skills/ui-development/SKILL.md](.agents/skills/ui-development/SKILL.md) |
| `database-core` | SQLite Schema, Queries, Indexes, Financial Precision | [.agents/skills/database-core/SKILL.md](.agents/skills/database-core/SKILL.md) |
| `deep-audit` | Exhaustive codebase review framework | [.agents/skills/deep-audit/SKILL.md](.agents/skills/deep-audit/SKILL.md) |
| `clean-documentation`| Bilingual standards and documentation cleanup | [.agents/skills/clean-documentation/SKILL.md](.agents/skills/clean-documentation/SKILL.md) |
| `clean-terminal` | Standards and protocols when executing terminal commands | [.agents/skills/clean-terminal/SKILL.md](.agents/skills/clean-terminal/SKILL.md) |
| `skill-creator` | Create or update AI agent specialized skills | [.agents/skills/skill-creator/SKILL.md](.agents/skills/skill-creator/SKILL.md) |
| `skill-sync` | Synchronize AGENTS.md with local skills | [.agents/skills/skill-sync/SKILL.md](.agents/skills/skill-sync/SKILL.md) |
| `bug-logger` | Specialized bug documentation and Engram persistence | [.agents/skills/bug-logger/SKILL.md](.agents/skills/bug-logger/SKILL.md) |
| `verify-build` | TypeScript and Build integrity checks | [.agents/skills/verify-build/SKILL.md](.agents/skills/verify-build/SKILL.md) |
| `doc-writer` | Diátaxis, ADRs, and Docs-as-Code synchronization | [.agents/skills/doc-writer/SKILL.md](.agents/skills/doc-writer/SKILL.md) |
| `graphify` | Codebase architecture mapping and navigation | [.agents/skills/graphify/SKILL.md](.agents/skills/graphify/SKILL.md) |
| `spec-refiner` | Interactive protocol for refining user stories into specs | [.agents/skills/spec-refiner/SKILL.md](.agents/skills/spec-refiner/SKILL.md) |

## Sub-Agent Mission Control (SDD Flow)
SeedCoin operates under a **Spec-Driven Development (SDD)** model consisting of 9 phases. The orchestrator directs the flow and delegates work to specialized sub-agents.

| Phase | Sub-Agent | Primary Action |
|------|------------|------------------|
| 1 | `sdd-init` | Project fingerprint and memory load (`engram`). |
| 2 | `sdd-explore` | Code investigation and risk analysis. |
| 3 | `sdd-propose` | Solution strategy and rollback plan. |
| 4 | `sdd-spec` | Change specifications and criteria (Given/When/Then). |
| 5 | `sdd-design` | Technical architecture, schemas, and contracts. |
| 6 | `sdd-tasks` | Atomic task breakdown as a checklist. |
| 7 | `sdd-apply` | Code implementation (TDD). |
| 8 | `sdd-verify` | Type validation, testing, and quality check. |
| 9 | `sdd-archive` | Session closure, cleanup, and persistence (`engram`). |

## Auto-invoke Rules
ALWAYS invoke the corresponding skill FIRST when starting an action:

| Action | Mandatory Skill |
|--------|-------------------|
| New feature / Complex task | `sdd-orchestrator` |
| Save/Load persistent knowledge | `engram` |
| Modify Database schema or queries | `database-core` |
| Verify integrity after changes | `verify-build` |
| Creating interfaces or UI styling | `ui-development` |
| Writing or refactoring any code | `clean-code` |
| Security or performance Audit | `deep-audit` |
| Code synchronization or Diátaxis/ADR creation | `doc-writer` |
| Documentation or Comments (Bilingual) | `clean-documentation` |
| Documenting a complex bug fix | `bug-logger` |
| Working with architecture diagrams | `excalidraw` |
| Codebase mapping or architecture navigation | `graphify` |
| Executing commands in the terminal | `clean-terminal` |
| Refining user story specs and validating assumptions | `spec-refiner` |

## Project Overview
SeedCoin is a personal financial management platform for secure and efficient offline-first tracking.

### Architecture Components
| Component | Location | Tech Stack |
|-----------|----------|------------|
| Mobile App | `mobile/` | React Native, Expo SDK 54, NativeWind, SQLite |
| Documentation | `documentacion/` | Markdown, User Guides, Diagrams |
| AI Protocols | `.agents/` | Agent Skills, Knowledge Base, Metadata |

### Directory Structure
```text
seedCoin/
├── .agents/          # AI Agent protocols, skills, and knowledge base
├── documentacion/    # Project documentation, architecture diagrams, and user guides
├── inconos/          # Image assets and application icons
├── mobile/           # React Native / Expo source code for the app
│   ├── app/          # Navigation and screens (Expo Router)
│   ├── assets/       # Fonts, images, and other static assets
│   ├── components/   # Reusable UI React components
│   └── src/          # Core domain logic, tests, models, and SQLite database
├── tareas/           # Task tracking and sprint management logs
├── AGENTS.md         # Main entry point for AI instructions and context
└── README.md         # Project overview and getting started guide
```

## Development

### Setup & Run
```bash
# Mobile (Expo)
cd mobile
npm install
npm start
```

### Code Quality
- **Static Analysis**: `npm run lint` (in `mobile/`).
- **Build Verification**: Run `verify-build` skill after changes.
- **Testing**: `npm test` for unit and integration tests.

## Design System Standards
SeedCoin uses a **Dark-First** design system powered by **NativeWind v4**.
- **Official Margin**: Use `standard-screen-px` for all screen containers.
- **Typography Aliases**: Use `text-h1`, `text-h2`, `text-body-lg`, `text-body-sm`, `text-caption` instead of raw font classes.
- **Color Palette**: Stick to `bg-dark-900` (background), `bg-dark-800` (cards), and `seed-xxx` (accent).

## Commit & Pull Request Guidelines
Follow conventional-commit style: `<type>[scope]: <description>`

**Types:** `feat`, `fix`, `docs`, `chore`, `perf`, `refactor`, `test`, `style`
**Scopes:** `mobile`, `backend`, `db`, `skills`, `docs`, `ci`

**Critical Rules**:
- ALWAYS keep the first line under 72 characters. No implementation details in title.
- NEVER use specific counts (e.g., "6 files").
- ALWAYS present a proposed commit message to the user BEFORE committing. Wait for confirmation.

### Before creating a PR:
1. Ensure all tests pass (`clean-code`).
2. Run `verify-build` to check TypeScript integrity.
3. Update relevant documentation in `documentacion/` if feature changes.
4. Ensure code follows "Financial Integrity" rules (see Constitutional Principles).
5. Link screenshots/recordings for UI changes.

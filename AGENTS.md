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
| `boy-scout` | General refactoring and clean code orchestration | [.agents/skills/boy-scout/SKILL.md](.agents/skills/boy-scout/SKILL.md) |
| `clean-database` | Standards for Schema, Queries, and Indexes | [.agents/skills/clean-database/SKILL.md](.agents/skills/clean-database/SKILL.md) |
| `clean-functions` | SRP, max 3 arguments, hook modularity | [.agents/skills/clean-functions/SKILL.md](.agents/skills/clean-functions/SKILL.md) |
| `clean-names` | CamelCase, descriptive naming, domain clarity | [.agents/skills/clean-names/SKILL.md](.agents/skills/clean-names/SKILL.md) |
| `clean-tests` | F.I.R.S.T. principle, Jest, SQLite testing | [.agents/skills/clean-tests/SKILL.md](.agents/skills/clean-tests/SKILL.md) |
| `clean-comments` | Metadata-free comments, bilingual documentation | [.agents/skills/clean-comments/SKILL.md](.agents/skills/clean-comments/SKILL.md) |
| `clean-commits` | Professional commits (conventional-commits) | [.agents/skills/clean-commits/SKILL.md](.agents/skills/clean-commits/SKILL.md) |
| `deep-audit` | Exhaustive codebase review framework | [.agents/skills/deep-audit/SKILL.md](.agents/skills/deep-audit/SKILL.md) |
| `frontend-development`| UI Atomization and Component extraction | [.agents/skills/frontend_development/SKILL.md](.agents/skills/frontend_development/SKILL.md) |
| `modern-react` | Atomicity, refs as props, React 19 features | [.agents/skills/modern-react/SKILL.md](.agents/skills/modern-react/SKILL.md) |
| `strict-typescript` | Type-first development, removing 'any' | [.agents/skills/strict-typescript/SKILL.md](.agents/skills/strict-typescript/SKILL.md) |
| `skill-creator` | Create new AI agent specialized skills | [.agents/skills/skill-creator/SKILL.md](.agents/skills/skill-creator/SKILL.md) |
| `skill-sync` | Synchronize AGENTS.md with local skills | [.agents/skills/skill-sync/SKILL.md](.agents/skills/skill-sync/SKILL.md) |
| `skill-updater` | Protocol to follow when editing or updating existing agent skills | [.agents/skills/skill-updater/SKILL.md](.agents/skills/skill-updater/SKILL.md) |
| `clean-documentation`| Bilingual standards and documentation cleanup | [.agents/skills/clean-documentation/SKILL.md](.agents/skills/clean-documentation/SKILL.md) |
| `bug-logger` | Specialized bug documentation and Engram persistence | [.agents/skills/bug-logger/SKILL.md](.agents/skills/bug-logger/SKILL.md) |
| `verify-build` | TypeScript and Build integrity checks | [.agents/skills/verify-build/SKILL.md](.agents/skills/verify-build/SKILL.md) |
| `doc-writer` | Diátaxis, ADRs, and Docs-as-Code synchronization | [.agents/skills/doc-writer/SKILL.md](.agents/skills/doc-writer/SKILL.md) |
| `graphify` | Codebase architecture mapping and navigation | [.agents/skills/graphify/SKILL.md](.agents/skills/graphify/SKILL.md) |

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
| Modify Database schema or queries | `clean-database` |
| Verify integrity after changes | `verify-build` |
| Create or extract UI components | `frontend-development` |
| Naming or Refactoring | `clean-names` |
| Security or performance Audit | `deep-audit` |
| Code synchronization or Diátaxis/ADR creation | `doc-writer` |
| Documentation or Comments (Bilingual) | `clean-documentation` |
| Documenting a complex bug fix | `bug-logger` |
| Working with Tailwind / Design | `styling` |
| Working with architecture diagrams | `excalidraw` |
| Codebase mapping or architecture navigation | `graphify` |
| Commit changes | `clean-commits` |
| Executing commands in the terminal | `clean-terminal` |

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

### Before creating a PR:
1. Ensure all tests pass (`clean-tests`).
2. Run `verify-build` to check TypeScript integrity.
3. Update relevant documentation in `documentacion/` if feature changes.
4. Ensure code follows "Financial Integrity" rules (see `.agents/skills/README.md`).
5. Link screenshots/recordings for UI changes.

# AGENTS.md - Context and Guidelines for AI Agents

This file defines the context, skills, and development standards for AI agents working on the **SeedCoin** project.

## How to Use This Guide
- Start here for project-wide norms and AI behaviors.
- The repository follows a bilingual model: **Spanish** for humans (docs, comments), **English** for AI/System (skills, code, logic).
- Local skills in `.agents/skills/` provide detailed patterns on-demand.
- ALWAYS consult the **Auto-invoke Skills** table before performing any action.

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
| `verify-build` | TypeScript and Build integrity checks | [.agents/skills/verify-build/SKILL.md](.agents/skills/verify-build/SKILL.md) |

## Auto-invoke Skills
When performing these actions, ALWAYS invoke the corresponding skill FIRST:

| Action | Skill |
|--------|-------|
| Adding or modifying database schema/queries | `clean-database` |
| After creating or modifying any code | `verify-build` |
| At the start of every task or session | `AI Knowledge Base (.agents/KNOWLEDGE.md)` |
| Committing changes | `clean-commits` |
| Creating / extract UI components | `frontend-development` |
| Creating new skills | `skill-creator` |
| Dealing with comments or documentation | `clean-comments` |
| Debugging build or TSC errors | `verify-build` |
| Designing or optimizing SQLite | `clean-database` |
| Fixing, editing, or refactoring code | `boy-scout` |
| Implementing feature or fixing bug | `tdd-workflow` |
| Naming, renaming, or reviewing variables/functions | `clean-names` |
| Performing a deep code audit | `deep-audit` |
| Refactoring React components/performance | `modern-react` |
| Regenerate AGENTS.md auto-invoke tables | `skill-sync` |
| Writing or reviewing tests (Jest/Maestro) | `clean-tests` |
| Writing or reviewing TypeScript types/interfaces | `strict-typescript` |
| Writing React 19 / Expo / NativeWind code | `modern-react` |

## Project Overview
SeedCoin is a personal financial management platform for secure and efficient offline-first tracking.

| Component | Location | Tech Stack |
|-----------|----------|------------|
| Mobile App | `mobile/` | React Native, Expo SDK 54, NativeWind, SQLite |
| Documentation | `documentacion/` | Markdown, User Guides, Diagrams |
| AI Protocols | `.agents/` | Agent Skills, Knowledge Base, Metadata |

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

## Commit & Pull Request Guidelines
Follow conventional-commit style: `<type>[scope]: <description>`

**Types:** `feat`, `fix`, `docs`, `chore`, `perf`, `refactor`, `test`, `style`

### Before creating a PR:
1. Ensure all tests pass (`clean-tests`).
2. Run `verify-build` to check TypeScript integrity.
3. Update relevant documentation in `documentacion/` if feature changes.
4. Ensure code follows "Financial Integrity" rules (KNOWLEDGE.md).
5. Link screenshots/recordings for UI changes.

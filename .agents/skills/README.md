# SeedCoin Agent Skills & Knowledge Base

This directory contains **Agent Skills** following the [Agent Skills open standard](https://agentskills.io) and serves as the core documentation entrypoint for SeedCoin AI agents.

---

## 🏗️ Core Architecture & Domain
- **Project Structure**: Pure Mobile Offline-First environment.
- **Mobile**: React Native (v0.81) via Expo SDK 54.
- **Data Persistence**: Local **SQLite** (via `expo-sqlite`).
- **Styling**: NativeWind v4 (Tailwind 3.4 implementation).
- **Domain Focus**: A financial manager tracking Accounts, Transactions, Budgets, and Debts.

> **AI Mandatory Rule**: Always verify the physical existence of files and directories before documenting them or assuming their presence based on meta-documentation. Prioritize **Financial Precision** and **Code Cleanliness** over implementation speed.

---

## 📜 Technical Standards

### 1. Financial Integrity (The Golden Rule)
- **Currency Storage**: NEVER use `REAL` or `FLOAT` for money. Use `INTEGER` (cents/unit minimums).
- **Calculations**: All financial calculations must be handled using integer arithmetic to prevent precision loss.

### 2. Semantic UI Atomization
- **No Monoliths**: Screens (`app/`) act as orchestrators (fetching data and hooks). Logical UI components must be extracted to `components/`.
- **Naming**: Components must follow semantic roles (e.g., `ProfileIdentityCard`).

### 3. Database Excellence
- **Explicit Projection**: Always list columns in `SELECT` statements (avoid `*`).
- **Indexing**: Use the ESR (Equality, Sort, Range) rule for all query optimizations.

---

## 🐛 Known Quirks & Gotchas
- **NativeWind v4 + Expo Router Crash**: NEVER leave unparsed multiline interpolations or raw line breaks inside the `className` prop. NativeWind's stringify scanner will crash the React Navigation context because of how React 18/19 exposes its getter. Keep string literals clean in a single line:
  - **Correct:** `` className={`w-14 h-14 ${isSelected ? 'bg-blue' : 'bg-red'}`} ``

---

## What Are Skills?
Skills teach AI assistants how to perform specific tasks. When an AI loads a skill, it gains context about critical rules, code patterns, workflows (like TDD), and references.

### How to Use Skills
Skills are typically discovered by the AI agent via `AGENTS.md` instructions. To manually load a skill during a session:
```
Read .agents/skills/{skill-name}/SKILL.md
```

### Integrated Agent Skills
| Skill | Description |
|-------|-------------|
| `clean-database` | Standards for Schema, Queries, and Indexes. |
| `clean-functions` | SRP, max 3 arguments, hook modularity. |
| `clean-tests` | Testing standards following the FIRST principle. |
| `clean-commits` | Professional commits following conventional standard. |
| `modern-react` | React 19 / Expo Router / Atomic UI patterns. |
| `strict-typescript` | Type-first development and discriminated unions. |
| `sqlite-expert` | Specialized SQLite optimization and security. |
| `deep-audit` | Systematic framework for exhaustive codebase review. |
| `boy-scout` | General code cleaning and refactoring orchestration. |
| `tdd-workflow` | Test-Driven Development workflow. |
| `frontend-development`| UI Atomization and Component extraction. |
| `verify-build` | TypeScript and Build integrity checks. |
| `skill-creator` | Create new AI agent specialized skills. |
| `skill-sync` | Synchronize AGENTS.md with local skills. |

## Why Auto-invoke Sections?
**Problem**: AI assistants don't always reliably auto-invoke skills.
**Solution**: The `AGENTS.md` files explicitly command the AI: "When performing X action, ALWAYS invoke Y skill FIRST." Use `skill-sync` to automate updating these tables.

## Directory Structure & Creating Skills
```
skills/
├── {skill-name}/
│   ├── SKILL.md              # Required - main instruction and metadata
│   ├── scripts/              # Optional - executable code
│   └── references/           # Optional - links to local docs
└── README.md                 # This file
```
To create new skills, use the `skill-creator` skill for guidance. Maintain progressive disclosure and concise rules.

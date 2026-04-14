# SeedCoin AI Knowledge Base

Welcome to the **SeedCoin** Technical Wiki for AI Agents. This document serves as the single source of truth for architectural standards, technical patterns, and expert guidelines.

---

## 🏗️ Core Architecture

### Technology Stack
- **Project Structure**: Pure Mobile Offline-First environment.
- **Mobile**: React Native (v0.81) via Expo SDK 54.
- **Data Persistence**: Local **SQLite** (via `expo-sqlite`).
- **Styling**: NativeWind v4 (Tailwind 3.4 implementation).

> [!IMPORTANT]
> **AI Mandatory Rule**: Always verify the physical existence of files and directories using `ls` or `dir` before documenting them or assuming their presence based on meta-documentation (`AGENTS.md`, etc.).

### Domain Model
SeedCoin is a financial manager focused on:
- **Accounts**: Tracking cash, bank, and savings.
- **Transactions**: Categorized income and expenses.
- **Budgets**: Category-based spending limits with monthly periods.
- **Debts**: Creditor tracking and payment schedules.

---

## 📜 Technical Standards

### 1. Financial Integrity (The Golden Rule)
- **Currency Storage**: NEVER use `REAL` or `FLOAT` for money. Use `INTEGER` (cents/unit minimums).
- **Rounding**: All financial calculations must be handled using integer arithmetic to prevent precision loss.

### 2. Semantic UI Atomization
- Monolithic screen files are forbidden. 
- **Pattern**: Screens (`app/`) act as orchestrators (fetching data and hooks). Logical UI components must be extracted to `components/`.
- **Naming**: Components must follow semantic roles (e.g., `ProfileIdentityCard`, `HistoryFilters`).

### 3. Database Excellence
- **Explicit Projection**: Always list columns in `SELECT` statements (avoid `*`).
- **Indexing**: Use the ESR (Equality, Sort, Range) rule for all query optimizations.
- **Migrations**: Incremental versioning in `database/index.ts`.

---

## 🛠️ Integrated Agent Skills

Index of custom skills currently available in `.agents/skills/`:

| Skill | Purpose |
|-------|---------|
| `clean-database` | Standards for Schema, Queries, and Indexes. |
| `clean-functions` | SRP, max 3 arguments, hook modularity. |
| `modern-react` | React 19 / Expo Router / Atomic UI patterns. |
| `strict-typescript` | Type-first development and discriminated unions. |
| `sqlite-expert` | Specialized SQLite optimization and security. |
| `deep-audit` | Systematic framework for exhaustive codebase review. |
| `boy-scout` | General code cleaning and refactoring orchestration. |

---

## 🚀 Vision
SeedCoin aims to provide a premium, secure, and extremely performant offline-first financial experience.

> [!IMPORTANT]
> When performing any task, the Agent MUST prioritize **Financial Precision** and **Code Cleanliness** over implementation speed.

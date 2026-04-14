---
name: deep-audit
description: >
  Systematic framework for exhaustive, file-by-file project reviews and audits.
  Trigger: When the user asks for a "review", "audit", or "checking best practices".
metadata:
  author: seedcoin
  version: "1.0"
  scope: [mobile, documentation]
  auto_invoke:
    - "Review if best practices are applied"
    - "Perform an audit of the project"
    - "Check code quality in all files"
---

# Deep Audit Framework

This skill provides a structured process for auditing the SeedCoin codebase, ensuring that every file adheres to the project's expert standards.

## 1. Audit Workflow

When triggered, the Agent must follow these steps:

### Step 1: Mapping
- List all unique files in the requested scope (or the whole project if not specified).
- Ignore boilerplate and generated files (e.g., `node_modules`, `.expo`, `build/`).

### Step 2: Categorization & Skill Matching
Assign an audit persona to each file:
- **Database (`*.ts/sql` in `database/`)**: Use `clean-database` + `sqlite-database-expert`.
- **UI Components (`*.tsx` in `components/`)**: Use `modern-react` + `vercel-react-best-practices`.
- **Business Logic/Hooks (`*.ts` in `hooks/` or `services/`)**: Use `clean-functions` + `strict-typescript`.
- **Configuration (`*.json`, `*.js` in root)**: Check for version consistency and security.

### Step 3: Sequential Review
Read each file and check against the specific "Best Practice Matrix":
- **Financial Precision**: Are amounts `INTEGER`? Are divisions handled properly in UI?
- **Modularity**: Is the file following SRP? Are components atomized?
- **Performance**: No `SELECT *`, efficient re-renders, correct memoization.
- **Safety**: No SQL injection, proper type guards, no `any`.

### Step 4: Finding Tagging
Categorize each finding:
- 🔴 **CRITICAL**: Functional bugs, security risks, or financial precision loss.
- 🟡 **IMPROVEMENT**: Clean code violations, optimization opportunities.
- 🟢 **CLEAN**: Adheres perfectly to standards.

## 2. Reporting Standard

The results must be summarized in a new file under `documentacion/auditorias/audit_[YYYYMMDD].md`.

Report Format:
- **Summary**: Overall score and main themes.
- **Detailed Findings by File**: 
  - `File Path` -> `Rating` -> `Issue Description` -> `Suggested Fix`.
- **Conclusion**: Next steps for refactoring.

## 3. Best Practice Matrix (Expert Cross-Reference)

| Skill Source | Main Checkpoint |
|--------------|-----------------|
| `clean-database` | No `SELECT *`, INTEGER currency, ESR Indexes. |
| `modern-react` | Functional components, Hooks logic separation, Atomic UI. |
| `clean-functions` | SRP, Max 3 arguments, Descriptive naming. |
| `strict-typescript` | Explicit types, no `any`, interface-first design. |

---

## Usage Note
Always perform the audit **sequentially** and do not try to process thousands of lines at once. Use `view_file` piece by piece if necessary.

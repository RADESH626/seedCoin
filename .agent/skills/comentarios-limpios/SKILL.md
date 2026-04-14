---
name: comentarios-limpios
description: >
  Use when writing, fixing, editing, or reviewing comments and inline documentation in TypeScript/React Native.
  Applies Clean Code principles — no metadata, no redundancy, no commented-out code. Allows removing obsolete comments.
metadata:
  author: seedcoin
  version: "1.1"
  scope: [root, mobile]
  auto_invoke: "Writing, fixing, or reviewing comments and inline documentation"
---

# Clean Comments (TypeScript / React Native)

Based on Robert C. Martin's principles, adapted to the SeedCoin stack.

## C1: No Inappropriate Information

Comments should not contain metadata. Use Git for author names, change history, ticket numbers, and dates. Comments are only for technical notes about the code.

```typescript
// ❌ Bad — metadata belongs in Git
// Author: Emanuel
// Modified: 2026-01-15
// Ticket: SEED-123
function calculateBalance() { /* ... */ }

// ✅ Good — no metadata, Git tracks history
function calculateBalance() { /* ... */ }
```

## C2: Remove Obsolete Comments

If a comment describes code that no longer exists or works differently, delete it. Obsolete comments become "floating islands of irrelevance and misinformation."

```typescript
// ❌ Bad — obsolete comment that misleads
// Returns the list of accounts from the REST server
function getAccounts(): Account[] {
  // Actually now reads from local SQLite...
  return db.getAllSync('SELECT * FROM accounts');
}

// ✅ Good — remove the obsolete comment
function getAccounts(): Account[] {
  return db.getAllSync('SELECT * FROM accounts');
}
```

## C3: No Redundant Comments

Don't repeat what the code already says clearly.

```typescript
// ❌ Bad — the code already says this
const count = 0; // initialize count to zero
accounts.push(newAccount); // add new account to array

// ✅ Good — explains WHY, not WHAT
const count = 0; // Reset on each render to prevent accumulation
```

## C4: Write Comments Well

If a comment is worth writing, write it well:
- Choose words carefully
- Use correct grammar
- Don't ramble or state the obvious
- Be brief

```typescript
// ❌ Bad — vague and lengthy
// This function does something with transactions, basically filters them
// and returns only those that meet certain criteria that we defined
// at some point, probably the current month's ones

// ✅ Good — precise and concise
// Filters current month transactions for the dashboard summary
```

## C5: Never Commit Commented-Out Code

```typescript
// ❌ DELETE THIS — it's an atrocity
// function calculateOldTax(income: number): number {
//   return income * 0.15;
// }

// Who knows how old this is? If it's relevant?
// Delete it. Git remembers everything.
```

## C-R: When TO Comment

There are cases where comments **do** add value:

```typescript
// ✅ Explain business decisions
// Balance is recalculated via SQLite triggers, not in the UI layer,
// to guarantee atomic consistency in concurrent transactions.

// ✅ Warnings about consequences
// ⚠️ Deleting this table cascades to all associated transactions

// ✅ TODO with clear context
// TODO(SEED-45): Migrate to expo-sqlite/next when async API stabilizes

// ✅ Clarification of regex or complex queries
// Pattern: captures amounts formatted as "$1,234.56" or "1234.56"
const AMOUNT_REGEX = /\$?([\d,]+\.?\d{0,2})/;
```

## The Goal

The best comment is the code itself. If you need a comment to explain what the code does, refactor first, comment later.

```typescript
// ❌ Needs a comment to understand
// Check if account has sufficient funds
if (account.balance - amount >= 0 && account.status === 'active') { /* ... */ }

// ✅ Code explains itself
if (account.hasSufficientFunds(amount) && account.isActive) { /* ... */ }
```

## Quick Reference

| Rule | Principle | Action |
|------|-----------|--------|
| C1 | No metadata | Use Git for author, date, ticket |
| C2 | Remove obsolete | Delete if it describes changed code |
| C3 | No redundancy | Comment the WHY, not the WHAT |
| C4 | Write well | Brief, precise, correct grammar |
| C5 | No commented-out code | Delete, Git remembers |
| C-R | When TO comment | Business decisions, warnings, TODOs |

## Commands

```bash
# Find commented-out code
grep -rn "^\s*//.*function\|^\s*//.*const\|^\s*//.*return" mobile/src/ --include="*.ts" --include="*.tsx"

# Find TODOs without context
grep -rn "// TODO[^(]" mobile/src/ --include="*.ts" --include="*.tsx"
```

## Resources

- **Source code**: `mobile/src/`
- **Components**: `mobile/components/`

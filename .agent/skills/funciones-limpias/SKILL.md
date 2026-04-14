---
name: funciones-limpias
description: >
  Use when writing, fixing, editing, or refactoring functions, hooks, and components in TypeScript/React Native.
  Applies Clean Code principles — max 3 arguments, single responsibility, no flag parameters.
metadata:
  author: seedcoin
  version: "1.1"
  scope: [root, mobile]
  auto_invoke: "Writing, fixing, or refactoring functions/hooks"
---

# Clean Functions (TypeScript / React Native)

Based on Robert C. Martin's principles, adapted to the SeedCoin stack.

## F1: Maximum 3 Arguments

More than 3 parameters indicates the function does too much or needs a data structure.

```typescript
// ❌ Bad — too many parameters
function createTransaction(
  accountId: number, amount: number, description: string,
  categoryId: number, type: string, date: string
): void { /* ... */ }

// ✅ Good — use interface
interface TransactionInput {
  accountId: number;
  amount: number;
  description: string;
  categoryId: number;
  type: TransactionType;
  date: string;
}

function createTransaction(data: TransactionInput): void { /* ... */ }
```

### F1-R: React Component Props

If a component receives more than 3 props, group them in a typed interface.

```tsx
// ❌ Bad
function AccountCard({ name, balance, type, icon, onPress, isActive }: {
  name: string; balance: number; type: string;
  icon: string; onPress: () => void; isActive: boolean;
}) { /* ... */ }

// ✅ Good
interface AccountCardProps {
  name: string;
  balance: number;
  type: AccountType;
  icon: string;
  onPress: () => void;
  isActive: boolean;
}

function AccountCard(props: AccountCardProps) { /* ... */ }
```

## F2: No Output Arguments

Don't modify arguments as side effects. Return new values.

```typescript
// ❌ Bad — mutates received array
function addTransaction(transactions: Transaction[], newItem: Transaction): void {
  transactions.push(newItem);
}

// ✅ Good — returns new array
function addTransaction(transactions: Transaction[], newItem: Transaction): Transaction[] {
  return [...transactions, newItem];
}
```

## F3: No Flag Arguments (Boolean)

A boolean argument means your function does at least two things.

```typescript
// ❌ Bad — function does two different things
function renderAmount(value: number, isExpense: boolean): string {
  if (isExpense) {
    return `-$${value.toFixed(2)}`;
  }
  return `+$${value.toFixed(2)}`;
}

// ✅ Good — split into two functions
function formatExpense(value: number): string {
  return `-$${value.toFixed(2)}`;
}

function formatIncome(value: number): string {
  return `+$${value.toFixed(2)}`;
}
```

## F4: Remove Dead Functions

If it's not called, delete it. Don't keep code "just in case". Git preserves history.

## F5: One Hook = One Responsibility

Each custom hook should have a single clear responsibility.

```typescript
// ❌ Bad — hook does too many things
function useDashboard() {
  // Loads accounts, transactions, budgets, calculates totals,
  // handles filters, date controls...
}

// ✅ Good — specialized hooks
function useAccounts() { /* Only loads and manages accounts */ }
function useRecentTransactions(limit: number) { /* Only recent transactions */ }
function useBudgetSummary() { /* Only budget summary */ }
```

## Quick Reference

| Rule | Principle | Example |
|------|-----------|---------|
| F1 | Max 3 arguments | Use `interface` to group |
| F1-R | Typed React props | `interface XxxProps {}` |
| F2 | No argument mutation | Return new value with spread |
| F3 | No boolean flags | Split into separate functions |
| F4 | No dead functions | Delete, Git remembers |
| F5 | One hook, one responsibility | `useAccounts()`, `useBudgets()` |

## Commands

```bash
# Type check
cd mobile && npx tsc --noEmit

# Find functions with many parameters
grep -rn "function.*,.*,.*,.*)" mobile/src/ --include="*.ts" --include="*.tsx"
```

## Resources

- **Project hooks**: `mobile/src/database/hooks.ts`
- **Types**: `mobile/src/database/types.ts`
- **Complement**: `.agent/skills/typescript-estricto/SKILL.md` (typing)

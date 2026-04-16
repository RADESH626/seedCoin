---
name: clean-names
description: >
  Use when naming, renaming, or reviewing names of variables, functions, hooks, components, interfaces, or modules in TypeScript/React Native.
  Applies Clean Code principles — descriptive names, appropriate length, ecosystem conventions.
trigger: Naming, renaming, or reviewing variables/functions
allowed-tools: [Read, Edit, Write, Grep]
metadata:
  author: seedcoin
  version: "1.1"
  scope: [root, mobile]
  auto_invoke: "Naming, renaming, or reviewing variables/functions/components"
---

# Clean Names (TypeScript / React Native)

Based on Robert C. Martin's principles, adapted to the SeedCoin stack.

## N1: Choose Descriptive Names

Names should reveal intent. If a name needs a comment, it doesn't reveal its purpose.

```typescript
// ❌ Bad — what is d?
const d = 86400;

// ✅ Good — obvious meaning
const SECONDS_PER_DAY = 86400;

// ❌ Bad — what does this function do?
function proc(lst: number[]): number[] {
  return lst.filter(x => x > 0);
}

// ✅ Good — clear intent
function filterPositiveAmounts(amounts: number[]): number[] {
  return amounts.filter(amount => amount > 0);
}
```

## N2: Names at the Right Abstraction Level

Don't choose names that communicate implementation; choose names that reflect purpose.

```typescript
// ❌ Bad — exposes implementation
function getArrayOfAccountObjects(): Account[] { /* ... */ }

// ✅ Good — abstracts the structure
function getAccountDirectory(): Account[] { /* ... */ }
```

## N3: Use Standard Domain Nomenclature

Use terms from the financial domain, design patterns, or well-known conventions.

```typescript
// ✅ Good — uses SeedCoin domain terms
function calculateBalance(accountId: number): number { /* ... */ }
function getAmortizationSchedule(loanId: number): Schedule[] { /* ... */ }

// ✅ Good — uses pattern name
class TransactionFactory { /* ... */ }
```

## N4: Unambiguous Names

Names should make behavior clear and unequivocal.

```typescript
// ❌ Bad — ambiguous
function update(item: any, data: any): void { /* ... */ }

// ✅ Good — clear what gets updated
function updateAccountBalance(accountId: number, newBalance: number): void { /* ... */ }
```

## N5: Length Proportional to Scope

Short names for small scopes. Wide scopes need more descriptive names.

```typescript
// ✅ Good — short name for tiny scope
const total = accounts.reduce((sum, a) => sum + a.balance, 0);

// ✅ Good — long name for module constants
const MAX_TRANSACTION_RETRY_ATTEMPTS = 3;
const DEFAULT_CURRENCY_DECIMAL_PLACES = 2;

// ❌ Bad — short name at module level
const MAX = 3;
```

## N6: No Encodings

Don't encode type or scope information in names. Modern editors make it unnecessary.

```typescript
// ❌ Bad — Hungarian notation
const strName = "SeedCoin";
const arrAccounts: Account[] = [];
const numCount = 0;

// ✅ Good — clean names
const name = "SeedCoin";
const accounts: Account[] = [];
const count = 0;

// ❌ Bad — interface prefix
interface IAccountRepository { /* ... */ }

// ✅ Good — no prefix
interface AccountRepository { /* ... */ }
```

## N7: Names Should Describe Side Effects

If a function does something beyond what its name suggests, the name is misleading.

```typescript
// ❌ Bad — name doesn't mention DB creation
function getOrCreateUser(name: string): User {
  const user = db.findUser(name);
  if (!user) {
    return db.createUser(name); // hidden side effect!
  }
  return user;
}

// ✅ Good — name reveals full behavior
function findOrCreateUser(name: string): User { /* ... */ }
```

## N-R: SeedCoin Conventions

### Naming by Type

| Element | Convention | Example |
|---------|-----------|---------|
| Variables and functions | `camelCase` | `accountBalance`, `getTransactions()` |
| React Components | `PascalCase` | `AccountCard`, `DashboardScreen` |
| Interfaces and Types | `PascalCase` | `TransactionInput`, `AccountType` |
| Constants | `UPPER_SNAKE_CASE` | `MAX_ACCOUNTS`, `DEFAULT_CURRENCY` |
| Hooks | `use` + `PascalCase` | `useAccounts()`, `useDashboard()` |
| Handlers | `handle` + `Action` | `handlePress()`, `handleDelete()` |
| Callbacks (props) | `on` + `Action` | `onPress`, `onDelete`, `onChange` |
| Screen files | `kebab-case.tsx` | `account-detail.tsx` |
| Component files | `PascalCase.tsx` | `AccountCard.tsx` |

### Hooks: Names That Reveal the Data

```typescript
// ❌ Bad — what does it return?
function useData() { /* ... */ }

// ✅ Good — clear what it returns
function useAccounts(): Account[] { /* ... */ }
function useTransactionsByAccount(accountId: number): Transaction[] { /* ... */ }
```

## Quick Reference

| Rule | Principle | Example |
|------|-----------|---------|
| N1 | Descriptive names | `SECONDS_PER_DAY` not `d` |
| N2 | Right abstraction level | `getAccountDirectory()` |
| N3 | Domain nomenclature | `calculateBalance`, `TransactionFactory` |
| N4 | Unambiguous | `updateAccountBalance(id, balance)` |
| N5 | Length ∝ scope | Short in loops, long in globals |
| N6 | No encodings | `accounts` not `arrAccounts` |
| N7 | Describe side effects | `findOrCreateUser()` |
| N-R | SeedCoin conventions | `camelCase`, `PascalCase`, `useXxx` |

## Commands

```bash
# Find short or generic names
grep -rn "const d \|const x \|const tmp" mobile/src/ --include="*.ts" --include="*.tsx"

# Find Hungarian notation
grep -rn "str[A-Z]\|arr[A-Z]\|num[A-Z]\|bool[A-Z]" mobile/src/ --include="*.ts" --include="*.tsx"
```

## Resources

- **Project types**: `mobile/src/database/types.ts`
- **Components**: `mobile/components/`
- **Screens**: `mobile/app/`

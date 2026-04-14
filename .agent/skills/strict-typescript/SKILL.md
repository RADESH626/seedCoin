---
name: strict-typescript
description: >
  Strict TypeScript patterns and typing best practices.
  Trigger: When implementing or refactoring TypeScript in .ts/.tsx (types, interfaces, generics, const maps, type guards, removing any, tightening unknown).
metadata:
  author: seedcoin
  version: "1.0"
  scope: [root, mobile]
  auto_invoke: "Writing or reviewing TypeScript types/interfaces"
---

# Strict TypeScript

## Const Types Pattern (REQUIRED)

```typescript
// ✅ ALWAYS: Create const object first, then extract type
const TRANSACTION_TYPE = {
  INCOME: "income",
  EXPENSE: "expense",
  TRANSFER: "transfer",
} as const;

type TransactionType = (typeof TRANSACTION_TYPE)[keyof typeof TRANSACTION_TYPE];

// ❌ NEVER: Direct union types
type TransactionType = "income" | "expense" | "transfer";
```

**Why?** Single source of truth, runtime values, autocomplete, safe refactoring.

```typescript
// ✅ More SeedCoin examples
const ACCOUNT_TYPE = {
  SAVINGS: "savings",
  CHECKING: "checking",
  CASH: "cash",
  INVESTMENT: "investment",
} as const;

type AccountType = (typeof ACCOUNT_TYPE)[keyof typeof ACCOUNT_TYPE];
```

## Flat Interfaces (REQUIRED)

```typescript
// ✅ ALWAYS: One level depth, nested objects → dedicated interface
interface TransactionAmount {
  value: number;
  currency: string;
}

interface Transaction {
  id: number;
  accountId: number;
  amount: TransactionAmount;  // Reference, not inline
  type: TransactionType;
  description: string;
}

// ❌ NEVER: Inline nested objects
interface Transaction {
  amount: { value: number; currency: string };  // NO!
}
```

## Never Use `any`

```typescript
// ✅ Use unknown for truly unknown types
function parseQueryResult(row: unknown): Transaction {
  if (isTransaction(row)) return row;
  throw new Error("Invalid query result");
}

// ✅ Use generics for flexible types
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

// ❌ NEVER
function parseQueryResult(row: any): any { }
```

## Type Guards

```typescript
function isTransaction(value: unknown): value is Transaction {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "amount" in value &&
    "type" in value
  );
}
```

## Coupled Optional Props (REQUIRED)

Don't model semantically coupled props as independent optionals:

```typescript
// ❌ BEFORE: Independent optionals — allows invalid states
interface TransactionFilterProps {
  onDateChange?: (date: Date) => void;
  startDate?: Date;
  endDate?: Date;
}

// ✅ AFTER: Discriminated union — all or nothing
type FilteredTransactionProps = {
  filtered: true;
  startDate: Date;
  endDate: Date;
  onDateChange: (date: Date) => void;
};

type UnfilteredTransactionProps = {
  filtered: false;
  startDate?: never;
  endDate?: never;
  onDateChange?: never;
};

type TransactionFilterProps = FilteredTransactionProps | UnfilteredTransactionProps;
```

## Utility Types

```typescript
Pick<Transaction, "id" | "amount">     // Select fields
Omit<Transaction, "id">                // Exclude fields
Partial<Transaction>                   // All optional
Required<Transaction>                  // All required
Readonly<Transaction>                  // All readonly
Record<string, Transaction>            // Object type
NonNullable<T | null>                  // Remove null/undefined
ReturnType<typeof fn>                  // Function return type
Parameters<typeof fn>                  // Function params tuple
```

## Import Types

```typescript
// ✅ Separate type imports
import type { Transaction, Account } from "../database/types";
import { createTransaction, type Config } from "../database/queries";
```

## Expo Router Typing

```typescript
import { useLocalSearchParams } from "expo-router";

// ✅ Type route params
type AccountParams = {
  accountId: string;
};

function AccountDetail() {
  const { accountId } = useLocalSearchParams<AccountParams>();
  const id = Number(accountId);
}
```

## SQLite Typing

```typescript
import type { SQLiteDatabase } from "expo-sqlite";

// ✅ Type query results
interface AccountRow {
  id: number;
  name: string;
  current_balance: number;
  type: string;
}

async function getAccounts(db: SQLiteDatabase): Promise<AccountRow[]> {
  return db.getAllAsync<AccountRow>("SELECT * FROM accounts");
}
```

## Quick Reference

| Pattern | Rule |
|---------|------|
| Enums | Use `as const` + type extraction |
| Interfaces | One level, no inline objects |
| `any` | FORBIDDEN → use `unknown` + type guards |
| Coupled props | Discriminated unions |
| Imports | Separate `import type` |
| Queries | Type with `XxxRow` interfaces |

## Commands

```bash
# Type check without emitting
cd mobile && npx tsc --noEmit

# Find uses of 'any'
grep -rn ": any" mobile/src/ --include="*.ts" --include="*.tsx"
```

## Resources

- **Project types**: `mobile/src/database/types.ts`
- **TS config**: `mobile/tsconfig.json`

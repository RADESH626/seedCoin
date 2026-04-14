---
name: clean-tests
description: >
  Use when writing, fixing, editing, or refactoring tests in TypeScript.
  Applies Clean Code principles for testing — fast tests, boundary coverage, F.I.R.S.T., one concept per test.
  Configured for Jest, SQLite, and Maestro.
metadata:
  author: seedcoin
  version: "1.1"
  scope: [root, mobile]
  auto_invoke: "Writing, fixing, or reviewing tests (Jest/SQLite/Maestro)"
---

# Clean Tests (Jest / SQLite / Maestro)

Based on Robert C. Martin's principles, adapted to the SeedCoin testing stack.

## T1: Insufficient Tests

Test everything that could fail. Use coverage tools as a guide, not a goal.

```typescript
// ❌ Bad — only tests happy path
test('divides correctly', () => {
  expect(divide(10, 2)).toBe(5);
});

// ✅ Good — tests edge cases too
describe('divide', () => {
  test('divides positive values correctly', () => {
    expect(divide(10, 2)).toBe(5);
  });

  test('throws error on divide by zero', () => {
    expect(() => divide(10, 0)).toThrow('Division by zero');
  });

  test('handles negative values', () => {
    expect(divide(-10, 2)).toBe(-5);
  });
});
```

## T2: Use Coverage Tools

Coverage tools report gaps in your testing strategy.

```bash
# Run with coverage
npx jest --coverage --coverageReporters=text-summary

# Aim for meaningful coverage, not 100%
```

## T3: Don't Skip Trivial Tests

Trivial tests document behavior and catch regressions. They're worth more than they cost.

```typescript
// ✅ Worth having — documents expected behavior
test('new account has zero balance', () => {
  const account = createAccount({ name: 'Savings', type: 'savings' });
  expect(account.currentBalance).toBe(0);
});
```

## T4: Skipped Test = Question About Ambiguity

Don't use `skip` to hide problems. Fix the test or delete it.

```typescript
// ❌ Bad — hiding a problem
test.skip('async operation works', () => { /* ... */ });

// ✅ Good — at least documents why
test.skip('cache invalidation - requires Redis setup, see CONTRIBUTING.md', () => { /* ... */ });
```

## T5: Test Boundary Conditions

Bugs congregate at boundaries. Test them explicitly.

```typescript
// ✅ Especially critical for SeedCoin financial logic
describe('calculateBalance', () => {
  test('handles zero balance', () => {
    expect(calculateBalance([])).toBe(0);
  });

  test('handles single income', () => {
    expect(calculateBalance([{ amount: 1000, type: 'income' }])).toBe(1000);
  });

  test('handles single expense', () => {
    expect(calculateBalance([{ amount: 500, type: 'expense' }])).toBe(-500);
  });

  test('handles decimal precision (cents)', () => {
    const transactions = [
      { amount: 10.10, type: 'income' },
      { amount: 3.30, type: 'expense' },
    ];
    expect(calculateBalance(transactions)).toBeCloseTo(6.80, 2);
  });

  test('handles empty list', () => {
    expect(calculateBalance([])).toBe(0);
  });

  test('handles unexpected negative amounts', () => {
    expect(() => calculateBalance([{ amount: -5, type: 'income' }]))
      .toThrow('Amount cannot be negative');
  });
});
```

## T6: Test Exhaustively Near Bugs

When you find a bug, write tests for all similar cases. Bugs cluster.

```typescript
// Found bug: off-by-one error in transaction pagination
// Now test ALL pagination boundaries
describe('paginateTransactions', () => {
  const items = Array.from({ length: 25 }, (_, i) => createTransaction(i));

  test('first page', () => { /* ... */ });
  test('last full page', () => { /* ... */ });
  test('last partial page', () => { /* ... */ });
  test('page beyond total', () => { /* ... */ });
  test('page zero (invalid)', () => { /* ... */ });
  test('empty list', () => { /* ... */ });
});
```

## T7: Failure Patterns Are Revealing

When tests fail, look for patterns. They often point to deeper problems.

## T8: Coverage Patterns Are Revealing

Observe which code paths are untested. They often reveal design problems.
If you can't easily test a function, it probably does too much. Refactor.

## T9: Fast Tests

Slow tests don't get run. Keep unit tests under 100ms each.

```typescript
// ❌ Bad — accesses real database and slow
test('create user', async () => {
  const db = await openDatabase();  // Slow!
  const user = await db.createUser('Alice');
  expect(user.name).toBe('Alice');
});

// ✅ Good — uses mock or in-memory
test('create user', () => {
  const db = createMockDatabase();
  const user = db.createUser('Alice');
  expect(user.name).toBe('Alice');
});
```

## F.I.R.S.T. Principles

| Principle | Description |
|-----------|-------------|
| **Fast** | Tests should run quickly |
| **Independent** | Tests should not depend on each other |
| **Repeatable** | Same result every time, any environment |
| **Self-Validating** | Pass or fail, no manual inspection |
| **Timely** | Written before or with the code, not after |

## One Concept Per Test

```typescript
// ❌ Bad — tests multiple things
test('account', () => {
  const account = createAccount({ name: 'Savings', type: 'savings' });
  expect(account.name).toBe('Savings');
  expect(account.type).toBe('savings');
  expect(account.currentBalance).toBe(0);
  account.deposit(100);
  expect(account.currentBalance).toBe(100);
});

// ✅ Good — one concept each
test('account stores name correctly', () => {
  const account = createAccount({ name: 'Savings', type: 'savings' });
  expect(account.name).toBe('Savings');
});

test('new account starts with zero balance', () => {
  const account = createAccount({ name: 'Savings', type: 'savings' });
  expect(account.currentBalance).toBe(0);
});

test('deposit increases balance', () => {
  const account = createAccount({ name: 'Savings', type: 'savings' });
  account.deposit(100);
  expect(account.currentBalance).toBe(100);
});
```

## T-SQL: SQLite Logic Tests

Specific rules for testing SeedCoin queries and triggers.

```typescript
// ✅ Test that SQLite triggers update balances correctly
describe('trigger: update balance after transaction', () => {
  test('income increments account current_balance', async () => {
    const db = await setupTestDatabase();
    await db.runAsync('INSERT INTO accounts (name, type) VALUES (?, ?)', ['Test', 'savings']);
    await db.runAsync(
      'INSERT INTO transactions (account_id, amount, type) VALUES (?, ?, ?)',
      [1, 500, 'income']
    );
    const account = await db.getFirstAsync('SELECT current_balance FROM accounts WHERE id = 1');
    expect(account.current_balance).toBe(500);
  });
});
```

## Quick Reference

| Rule | Principle |
|------|-----------|
| T1 | Test everything that could fail |
| T2 | Use coverage tools |
| T3 | Don't skip trivial tests |
| T4 | Skipped test = question to resolve |
| T5 | Test boundary conditions (critical in finance!) |
| T6 | Test exhaustively near bugs |
| T7 | Look for failure patterns |
| T8 | Review coverage when debugging |
| T9 | Fast tests (< 100ms) |
| T-SQL | Test triggers and SQLite queries |

> **Note:** This skill defines test **quality**. For the **workflow** of when and how to write tests (Red→Green→Refactor), see `.agent/skills/tdd-workflow/SKILL.md`.

## Commands

```bash
# Run all tests
cd mobile && npx jest --passWithNoTests

# With coverage
cd mobile && npx jest --coverage --coverageReporters=text-summary

# Watch mode
cd mobile && npx jest --watch

# Filter by name
cd mobile && npx jest --testPathPattern="calculateBalance"
```

## Resources

- **Existing tests**: `mobile/src/**/*.test.ts`
- **Jest config**: `mobile/jest.config.js`
- **TDD Workflow**: `.agent/skills/tdd-workflow/SKILL.md`

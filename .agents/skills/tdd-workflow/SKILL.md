---
name: tdd-workflow
description: >
  Test-Driven Development workflow for SeedCoin.
  Trigger: ALWAYS when implementing features, fixing bugs, or refactoring — regardless of component.
  This is a MANDATORY workflow, not optional.
metadata:
  author: seedcoin
  version: "1.0"
  scope: [root, mobile]
  auto_invoke:
    - "Implementing a new feature"
    - "Fixing a bug"
    - "Refactoring code"
---

# TDD Workflow

## TDD Cycle (MANDATORY)

```
+-----------------------------------------+
|  RED -> GREEN -> REFACTOR               |
|     ^                        |          |
|     +------------------------+          |
+-----------------------------------------+
```

**The question is NOT "should I write tests?" but "what tests do I need?"**

---

## The Three Laws of TDD

1. **No production code** until you have a failing test
2. **No more test** than necessary to fail
3. **No more code** than necessary to pass

---

## Phase 0: Assessment (ALWAYS FIRST)

Before writing ANY code:

```bash
# 1. Find existing tests
find mobile/src -name "*.test.ts" -o -name "*.test.tsx"

# 2. Check coverage
cd mobile && npx jest --coverage --coverageReporters=text-summary

# 3. Read the existing tests
```

### Decision Tree

```
+------------------------------------------+
|     Does a test file exist for this code?|
+----------+-----------------------+-------+
           | NO                    | YES
           v                       v
+------------------+    +------------------+
| CREATE test file |    | Check coverage   |
| → Phase 1: RED   |    | for your change  |
+------------------+    +--------+---------+
                                 |
                        +--------+--------+
                        | Missing cases?  |
                        +---+---------+---+
                            | YES     | NO
                            v         v
                    +-----------+ +-----------+
                    | ADD tests | | Proceed   |
                    | Phase 1   | | Phase 2   |
                    +-----------+ +-----------+
```

---

## Phase 1: RED — Write a Failing Test

### For NEW Functionality

```typescript
describe("calculateBalance", () => {
  it("should return 0 for empty list", () => {
    // Given
    const transactions: Transaction[] = [];

    // When
    const result = calculateBalance(transactions);

    // Then
    expect(result).toBe(0);
  });
});
```

**Run → MUST fail.** The test references code that doesn't exist yet.

### For BUG FIXES

Write a test that **reproduces the bug** first:

```typescript
it("should not throw on null amount", () => {
  // This test reproduces the reported bug
  expect(() => formatAmount(null as any)).not.toThrow();
});
```

**Run → Should FAIL (reproducing the bug)**

### For REFACTORING

Capture ALL current behavior BEFORE refactoring:

```bash
# Run ALL existing tests — they should PASS
cd mobile && npx jest --passWithNoTests
```

**Run → All should PASS (baseline)**

---

## Phase 2: GREEN — Minimum Code

Write the MINIMUM code to make the test pass. Hardcoding is valid for the first test.

```typescript
// Test expects calculateBalance([]) === 0
function calculateBalance(): number {
  return 0; // FAKE IT — hardcoded is valid for the first test
}
```

**This passes. But we're not done...**

---

## Phase 3: Triangulation (CRITICAL)

**One test allows faking. Multiple tests FORCE real logic.**

Add tests with different inputs that break the hardcoded value:

| Scenario | Required? |
|----------|-----------|
| Happy path | YES |
| Zero/empty values | YES |
| Boundary values | YES |
| Different valid inputs | YES (breaks fake) |
| Error conditions | YES |

```typescript
// ADD — breaks the fake:
it("should sum income", () => {
  const txns = [{ amount: 1000, type: "income" }];
  expect(calculateBalance(txns)).toBe(1000);
});

it("should subtract expenses", () => {
  const txns = [{ amount: 500, type: "expense" }];
  expect(calculateBalance(txns)).toBe(-500);
});

it("should handle decimal precision", () => {
  const txns = [
    { amount: 10.10, type: "income" },
    { amount: 3.30, type: "expense" },
  ];
  expect(calculateBalance(txns)).toBeCloseTo(6.80, 2);
});
```

**Now the fake BREAKS → Real implementation required.**

---

## Phase 4: REFACTOR

Tests GREEN → Improve code quality WITHOUT changing behavior.

- Extract functions/methods
- Improve names → invoke `clean-names`
- Add types → invoke `strict-typescript`
- Reduce duplication

**Run tests after EACH change → Must stay GREEN**

---

## Quick Reference

```
+------------------------------------------------+
|              TDD WORKFLOW                       |
+------------------------------------------------+
| 0. ASSESS: What tests exist? What's missing?   |
|                                                |
| 1. RED: Write ONE failing test                 |
|    +-- Run → Must fail with clear error        |
|                                                |
| 2. GREEN: Write MINIMUM code to pass           |
|    +-- Fake It is valid for first test         |
|                                                |
| 3. TRIANGULATE: Add tests that break the fake  |
|    +-- Different inputs, edge cases            |
|                                                |
| 4. REFACTOR: Improve with confidence           |
|    +-- Tests stay green throughout             |
|                                                |
| 5. REPEAT: Next behavior/requirement           |
+------------------------------------------------+
```

---

## Anti-Patterns (NEVER DO)

```typescript
// 1. Code first, tests after
function newFeature() { ... }  // Tests after = USELESS

// 2. Skip triangulation
// Single test allows faking forever

// 3. Test implementation details
expect(component.state.isLoading).toBe(true);   // BAD — test behavior
expect(mockService.callCount).toBe(3);           // BAD — brittle coupling

// 4. All tests at once before any code
// Write ONE test, make it pass, THEN write the next

// 5. Giant test methods
// Each test should verify ONE behavior
```

## Commands

```bash
# Watch mode (development)
cd mobile && npx jest --watch

# Single run
cd mobile && npx jest --passWithNoTests

# With coverage
cd mobile && npx jest --coverage

# Filter by name
cd mobile && npx jest --testPathPattern="calculateBalance"

# Only changed files
cd mobile && npx jest --onlyChanged
```

## Resources

- **Existing tests**: `mobile/src/**/*.test.ts`
- **Jest config**: `mobile/jest.config.js`
- **Complement**: `.agent/skills/clean-tests/SKILL.md` (test quality)

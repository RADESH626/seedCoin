---
name: clean-code
description: >
  Use when writing, refactoring, or reviewing any code (functions, variables, components, comments, tests) in TypeScript/React Native.
  Applies all Clean Code principles — max 3 arguments, single responsibility, descriptive names, no metadata in comments, and F.I.R.S.T. testing.
trigger: Writing, refactoring, or reviewing code
allowed-tools: [Read, Edit, Write]
metadata:
  author: seedcoin
  version: "2.0"
  scope: [root, mobile]
  auto_invoke: "Writing, refactoring, or reviewing variables/functions/components/tests"
---

# Clean Code (TypeScript / React Native)

This skill consolidates Robert C. Martin's principles (Clean Names, Clean Functions, Clean Comments, Clean Tests) adapted to the SeedCoin stack.

## 1. Clean Names
- **Descriptive Names**: Reveal intent. `SECONDS_PER_DAY` not `d`.
- **Right Abstraction**: `getAccountDirectory()` not `getArrayOfAccountObjects()`.
- **Domain Nomenclature**: Use SeedCoin terms (`calculateBalance`).
- **No Encodings**: Avoid Hungarian notation (`strName`) and interface prefixes (`IAccount`).
- **SeedCoin Conventions**: `camelCase` for vars/functions, `PascalCase` for Components/Interfaces/Types, `UPPER_SNAKE_CASE` for constants, `useXxx` for hooks, `onXxx`/`handleXxx` for callbacks.

## 2. Clean Functions
- **Max 3 Arguments**: If more are needed, use an `interface` to group them. React components with >3 props must use a typed interface.
- **No Output Arguments**: Return new values instead of mutating arguments.
- **No Flag Arguments**: Boolean flags mean the function does two things. Split it.
- **No Dead Functions**: Delete unused code.
- **One Hook = One Responsibility**: Hooks should be specialized (e.g., `useAccounts()`).

## 3. Clean Comments
- **No Inappropriate Info**: Metadata (author, dates, tickets) belongs in Git.
- **Remove Obsolete**: Delete comments that describe changed code.
- **No Redundancy**: Comment the *WHY*, not the *WHAT*.
- **No Commented-Out Code**: Delete it. Git remembers.
- **When to Comment**: Business decisions, warnings of consequences, TODOs with context, clarification of complex regex/queries.

## 4. Clean Tests (Jest / SQLite / Maestro)
- **F.I.R.S.T. Principles**: Fast (<100ms), Independent, Repeatable, Self-Validating, Timely.
- **Test Boundary Conditions**: Critical in finance (zero, negative, decimal precision).
- **One Concept Per Test**: Don't test multiple things in one block.
- **No Trivial test Skipping**: Don't skip unless there's a clear documented reason.
- **Use Mock DB**: Do not use real slow DBs for unit tests.

## Commands
```bash
# Type check
cd mobile && npx tsc --noEmit

# Run tests
cd mobile && npx jest
```

---
name: boy-scout
description: >
  Use when fixing, editing, changing, debugging, or working with any TypeScript/React Native code.
  Applies the Boy Scout Rule — always leave code cleaner than you found it.
  Orchestrates other clean code skills and applies general principles (DRY, SRP, Law of Demeter).
metadata:
  author: seedcoin
  version: "1.1"
  scope: [root, mobile]
  auto_invoke: "Fixing, editing, debugging, or working with any TS/RN code"
---

# The Boy Scout Rule

> "Always leave the campground cleaner than you found it."
> — Robert Baden-Powell

> "Always check a module in cleaner than when you checked it out."
> — Robert C. Martin, *Clean Code*

## The Philosophy

You don't have to make every module perfect. It just needs to be **a little better** than you found it.

If everyone follows this rule:
- Systems would gradually improve as they evolve
- Teams would care for the system as a whole
- The relentless deterioration of software would end

## When Working with Code

Every time you touch code, look for **at least one small improvement**:

### Quick Wins (Do Immediately)
- Rename a poorly named variable → activate `clean-names`
- Remove a redundant comment → activate `comentarios-limpios`
- Remove dead code or unused imports
- Replace a magic number with a named constant
- Extract a deeply nested block into a well-named function

### Deep Improvements (When Time Allows)
- Split a function that does multiple things → activate `clean-functions`
- Remove duplication (DRY) → see G5 below
- Add missing boundary checks
- Improve test coverage → activate `clean-tests`

---

## Integrated General Principles

These principles apply **always** when the agent works with SeedCoin code.

### G5: DRY (Don't Repeat Yourself)

Every piece of knowledge has a single authoritative representation.

```typescript
// ❌ Bad — duplication
const taxColombiaRate = 0.19;
const totalBogota = subtotal * 1.19;
const totalMedellin = subtotal * 1.19;

// ✅ Good — single source of truth
const TAX_RATES = { CO: 0.19, US: 0.07 } as const;

function calculateTotal(subtotal: number, country: keyof typeof TAX_RATES): number {
  return subtotal * (1 + TAX_RATES[country]);
}
```

### G16: No Obscured Intent

Don't be clever. Be clear.

```typescript
// ❌ Bad — what does this do?
return (x & 0x0F) << 4 | (y & 0x0F);

// ✅ Good — obvious intent
return packCoordinates(x, y);
```

### G23: Prefer Composition Over Chained Conditionals

In React Native, use composition and mapping instead of long if/else blocks.

```typescript
// ❌ Bad — will grow forever
function getAccountIcon(type: string): string {
  if (type === 'savings') return '🏦';
  else if (type === 'checking') return '💳';
  else if (type === 'cash') return '💵';
  else if (type === 'investment') return '📈';
  else return '❓';
}

// ✅ Good — declarative mapping
const ACCOUNT_ICONS: Record<AccountType, string> = {
  savings: '🏦',
  checking: '💳',
  cash: '💵',
  investment: '📈',
};

function getAccountIcon(type: AccountType): string {
  return ACCOUNT_ICONS[type] ?? '❓';
}
```

### G25: Replace Magic Numbers with Constants

```typescript
// ❌ Bad
if (elapsedTime > 86400) { /* ... */ }

// ✅ Good
const SECONDS_PER_DAY = 86400;
if (elapsedTime > SECONDS_PER_DAY) { /* ... */ }
```

### G30: Functions Do One Thing

If you can extract another function, your function does more than one thing.

### G36: Law of Demeter (Avoid Trains)

```typescript
// ❌ Bad — traversing multiple objects
const outputDir = context.options.scratchDir.absolutePath;

// ✅ Good — one dot
const outputDir = context.getScratchDir();
```

### G3: Handle Boundary Conditions

Especially critical in financial logic. Always consider: zero, negative, null/undefined, empty list, decimal precision.

### G9: Remove Dead Code

If it's not used, delete it. Git remembers.

---

## Skill Orchestration

This skill coordinates specialized skills based on context:

| Task | Skill to Activate |
|------|-------------------|
| Name variables, functions, components | `clean-names` |
| Write or edit comments | `comentarios-limpios` |
| Create or refactor functions/hooks | `clean-functions` |
| Write or review tests | `clean-tests` |
| TDD flow (Red→Green→Refactor) | `tdd-workflow` |
| Write types, interfaces, generics | `strict-typescript` |
| Create React/React Native components | `modern-react` |
| Prepare a commit | `commits-limpios` |
| Interact with SQLite | `database` |
| Create/modify routes | `routing` |
| Style components | `styling` |
| Resolve persistent errors | `bug_fixing` |
| Create a new skill | `skill-creator` / `skill-sync` |

---

## The Mindset

**Don't:**
- Leave code worse than you found it
- Say "that's not my code"
- Wait for a dedicated refactoring sprint
- Make massive unrelated changes

**Do:**
- Make one small improvement with each commit
- Fix what you see, even if you didn't break it
- Keep changes proportional to your task
- Leave a trail of quality improvements

## Agent Behavior

When working with code:
1. Complete the requested task first
2. Identify at least one cleanup opportunity
3. Apply the corresponding specialized skill
4. Note the improvement made (e.g., "Also improved: renamed `x` to `results` for clarity — N1")

When reviewing code:
1. Check for violations by rule number
2. Suggest incremental improvements, not complete rewrites

## Verification Checklist

When reviewing AI-generated code, verify:
- [ ] No duplication (G5)
- [ ] Clear intent, no magic numbers (G16, G25)
- [ ] Composition over chained conditionals (G23)
- [ ] Functions do one thing (G30)
- [ ] No Law of Demeter violations (G36)
- [ ] Boundary conditions handled (G3)
- [ ] Dead code removed (G9)

---

## The Boy Scout Promise

Every piece of code you touch ends up a little better. Not perfect — just better.

Over time, *better* compounds into *excellent*.

## Commands

```bash
# Find dead code (unused imports)
cd mobile && npx tsc --noEmit 2>&1 | grep "declared but"

# Find magic numbers
grep -rn "[^a-zA-Z_][0-9]\{2,\}[^0-9]" mobile/src/ --include="*.ts" --include="*.tsx" | head -20
```

## Resources

- **Specialized skills**: `.agent/skills/`
- **Agent config**: `AGENTS.md`
- **Components**: `mobile/components/`
- **Hooks**: `mobile/src/database/hooks.ts`

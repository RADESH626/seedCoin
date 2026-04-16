---
name: clean-commits
description: >
  Create professional git commits following conventional-commits format.
  Trigger: When creating commits, after completing code changes, when user asks to commit.
trigger: Committing changes
allowed-tools: [Read, Edit, Write, Command]
metadata:
  author: seedcoin
  version: "1.0"
  scope: [root]
  auto_invoke:
    - "Creating a git commit"
    - "Committing changes"
---

# Clean Commits

## Critical Rules

- ALWAYS use conventional-commits format: `type(scope): description`
- ALWAYS keep the first line under 72 characters
- ALWAYS commit changes separate by logical functionality
- ALWAYS ask for user confirmation before committing
- NEVER be overly specific (avoid counts like "6 files", "3 tests")
- NEVER include implementation details in the title
- NEVER use `git push --force` or `git push -f`
- NEVER proactively offer to commit — wait for user to explicitly request it

---

## Format

```
type(scope): concise description

- Key change 1
- Key change 2
- Key change 3
```

### Types

| Type | When to Use |
|------|-------------|
| `feat` | New feature or functionality |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `chore` | Maintenance, dependencies, configs |
| `refactor` | Code change without feature/fix |
| `test` | Adding or updating tests |
| `perf` | Performance improvement |
| `style` | Formatting, no code change |

### SeedCoin Scopes

| Scope | When |
|-------|------|
| `mobile` | Changes in `mobile/` |
| `backend` | Changes in `seedCoin/` |
| `db` | Changes in database/SQLite/schema |
| `skills` | Changes in `.agent/skills/` |
| `docs` | Changes in `documentacion/` |
| `ci` | Changes in `.github/` |
| *omit* | Multiple scopes or root level |

---

## Good vs Bad Examples

### Title

```
# ✅ GOOD — Concise and clear
feat(mobile): add account detail screen
fix(db): correct balance trigger after transfer
chore(skills): add strict TypeScript skill
docs: update installation guide

# ❌ BAD — Too specific or verbose
feat(mobile): add account detail screen with 3 tabs and pie chart using Victory
chore(skills): add comprehensive documentation for 5 skills covering 8 topics
fix(db): fix the bug in trigger on line 45 of schema.ts
```

### Body (Bullet Points)

```
# ✅ GOOD — High-level changes
- Add retry mechanism for failed connections
- Document task composition patterns
- Expand configuration reference

# ❌ BAD — Too detailed
- Add retry with maxRetries=3, backoff=true, jitter=true
- Add 6 subsections covering chain, group, chord
- Update lines 45-67 in dashboard.tsx
```

---

## Decision Tree

```
Single file changed?
├─ Yes → May omit body, title only
└─ No → Include body with key changes

Multiple scopes affected?
├─ Yes → Omit scope: `feat: description`
└─ No → Include scope: `feat(mobile): description`

Fixing a bug?
├─ User-facing → fix(scope): description
└─ Internal/dev → chore(scope): fix description

Adding documentation?
├─ Code docs (JSDoc) → Part of feat/fix
└─ Standalone docs → docs: or docs(scope):
```

---

## Workflow

1. **Analyze changes**
   ```bash
   git status
   git diff --stat HEAD
   git log -3 --oneline  # Check recent commit style
   ```

2. **Draft commit message**
   - Choose appropriate type and scope
   - Write concise title (< 72 chars)
   - Add 2-5 bullet points for significant changes

3. **Present to user for confirmation**
   - Show files to be committed
   - Show proposed message
   - Wait for explicit confirmation

4. **Execute commit**
   ```bash
   git add <files>
   git commit -m "type(scope): description"
   ```

## Commands

```bash
# Check current state
git status
git diff --stat HEAD

# Standard commit
git add <files>
git commit -m "type(scope): description"

# Amend last commit (same message)
git commit --amend --no-edit

# Amend with new message
git commit --amend -m "new message"
```

## Resources

- **Conventions**: Section 5 of `AGENTS.md`
- **Recent commits**: `git log -10 --oneline`

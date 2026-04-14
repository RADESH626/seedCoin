---
name: skill-sync
description: >
  Syncs skill metadata with the Auto-invoke table in AGENTS.md.
  Trigger: After creating or modifying a skill, regenerating Auto-invoke tables, or verifying that no skills are missing from AGENTS.md.
metadata:
  author: seedcoin
  version: "1.0"
  scope: [root]
  auto_invoke:
    - "After creating/modifying a skill"
    - "Regenerate AGENTS.md Auto-invoke table"
    - "Troubleshoot why a skill is missing from AGENTS.md"
---

# Skill Sync

## Purpose

Keep the **Auto-invoke Skills** section in `AGENTS.md` in sync with each skill's metadata in `.agent/skills/`. When you create or modify a skill, you must update AGENTS.md so the agent invokes it automatically.

---

## Required Skill Metadata

Each skill that should appear in Auto-invoke needs these frontmatter fields:

```yaml
metadata:
  author: seedcoin
  version: "1.0"
  scope: [root]              # Where it applies: root, mobile, backend
  auto_invoke: "Action X"    # When it triggers
```

`auto_invoke` can be a string or a list:

```yaml
# Option A: single action
auto_invoke: "Creating React components"

# Option B: multiple actions
auto_invoke:
  - "Creating React components"
  - "Refactoring components"
```

### Scope Values

| Scope | Applies to | AGENTS.md |
|-------|-----------|-----------|
| `root` | Entire project | `AGENTS.md` (root) |
| `mobile` | React Native frontend | Applies to `mobile/` |
| `backend` | Spring Boot backend | Applies to `seedCoin/` |

---

## Sync Workflow

When creating or modifying a skill, follow these steps:

```
1. Verify frontmatter
   ├── Has name?
   ├── Has description with Trigger?
   ├── Has metadata.scope?
   └── Has metadata.auto_invoke?

2. Read current table in AGENTS.md
   └── Section "Auto-invoke Skills"

3. Update table
   ├── Add row if skill is new
   ├── Modify row if auto_invoke changed
   └── Remove row if skill was deleted

4. Verify consistency
   ├── Every skill in .agent/skills/ has a row in AGENTS.md
   └── Every row in AGENTS.md points to an existing skill
```

---

## Table Format in AGENTS.md

```markdown
| User Intent / Action | Skill to Invoke | Location |
| :--- | :--- | :--- |
| {auto_invoke text} | **{Readable Name}** | `.agent/skills/{name}/SKILL.md` |
```

### Example

Given this skill:

```yaml
# .agent/skills/modern-react/SKILL.md
name: modern-react
metadata:
  auto_invoke: "Writing React/React Native components"
```

Generates in AGENTS.md:

```markdown
| Writing React/React Native components | **React Moderno** | `.agent/skills/modern-react/SKILL.md` |
```

---

## Post-Modification Checklist

- [ ] Complete frontmatter in the new/modified skill
- [ ] `metadata.auto_invoke` defined with clear action
- [ ] Auto-invoke table in AGENTS.md updated
- [ ] No orphan skills (in AGENTS.md but no file)
- [ ] No missing skills (in `.agent/skills/` but no row in AGENTS.md)

## Commands

```bash
# List all skills with frontmatter
for d in .agent/skills/*/; do echo "=== $d ==="; head -10 "$d/SKILL.md"; done

# Count skills registered in AGENTS.md
grep -c "\.agent/skills/" AGENTS.md
```

## Resources

- **Skills**: `.agent/skills/`
- **Config**: `AGENTS.md`
- **Skill creator**: `.agent/skills/skill-creator/SKILL.md`

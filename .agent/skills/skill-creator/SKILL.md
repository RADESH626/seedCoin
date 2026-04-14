---
name: skill-creator
description: >
  Creates new AI agent skills following project standards.
  Trigger: When the user asks to create a new skill, add agent instructions, or document recurring patterns.
metadata:
  author: seedcoin
  version: "2.0"
  scope: [root]
  auto_invoke: "Creating a new skill for the agent"
---

# Skill Creator

## When to Create a Skill

Create a skill when:
- A pattern is used repeatedly and the AI needs guidance
- Project conventions differ from generic best practices
- A complex workflow needs step-by-step instructions
- A decision tree helps the AI choose the right approach

**Don't create a skill when:**
- Documentation already exists (create a reference instead)
- The pattern is trivial or self-explanatory
- It's a one-off task

---

## Directory Structure

```
.agent/skills/{skill-name}/
├── SKILL.md              # Required — main skill file
├── assets/               # Optional — templates, schemas, examples
│   ├── template.ts
│   └── schema.json
└── references/           # Optional — links to local docs
    └── docs.md
```

---

## SKILL.md Template

```markdown
---
name: {skill-name}
description: >
  {One-line description}.
  Trigger: {When the AI should load this skill}.
metadata:
  author: seedcoin
  version: "1.0"
  scope: [root]
  auto_invoke: "{Action that triggers it}"
---

## When to Use

{Bullet points of when to use this skill}

## Critical Patterns

{The most important rules — what the AI MUST know}

## Examples

{Minimal, focused examples}

## Commands

```bash
{Common commands}
```

## Resources

- **Key files**: `mobile/src/...`, `seedCoin/src/...`
- **Documentation**: See [references/](references/) for local docs
```

---

## Naming Conventions

| Type | Pattern | Examples |
|------|---------|----------|
| Generic skill | `{technology}` | `typescript-estricto`, `react-moderno` |
| Domain skill | `{domain}-{aspect}` | `funciones-limpias`, `tests-limpios` |
| Workflow skill | `{action}` | `commits-limpios`, `tdd-workflow` |
| Meta skill | `skill-{action}` | `skill-creator`, `skill-sync` |

> **Rule:** Names in Spanish with kebab-case. Max 2-3 words.

---

## Decision: assets/ vs references/

```
Need code templates?        → assets/
Need JSON schemas?          → assets/
Need example configs?       → assets/
Link to existing docs?      → references/
Link to project files?      → references/ (with local path)
```

---

## Checklist Before Creating

- [ ] Skill doesn't already exist (check `.agent/skills/`)
- [ ] Pattern is reusable (not a one-off task)
- [ ] Name follows conventions
- [ ] Frontmatter has `name`, `description`, `metadata`
- [ ] `metadata.auto_invoke` is defined
- [ ] Critical patterns are clear
- [ ] Examples are minimal and use SeedCoin context
- [ ] Has `## Commands` and `## Resources` sections
- [ ] Registered in AGENTS.md → invoke `skill-sync`

---

## Design Principles

- **Concise**: Only include what the AI doesn't know by default
- **Progressive disclosure**: Point to detailed docs, don't duplicate
- **Critical rules first**: Start with ALWAYS/NEVER patterns
- **Minimal examples**: Show patterns, not tutorials
- **Under 300 lines**: If it exceeds, split into separate skills

## Commands

```bash
# List existing skills
ls .agent/skills/

# Check skill frontmatter
head -20 .agent/skills/{name}/SKILL.md
```

## Resources

- **Existing skills**: `.agent/skills/`
- **Agent config**: `AGENTS.md`
- **Reference**: [Agent Skills Standard](https://agentskills.io)

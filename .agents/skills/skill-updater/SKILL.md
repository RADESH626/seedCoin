---
name: skill-updater
description: >
  Protocol to follow when editing or updating existing agent skills.
  Trigger: Whenever the agent is asked to update, modify, or extend an existing skill.
metadata:
  author: seedcoin
  version: "1.0"
  scope: [root]
  auto_invoke: "Updating or modifying an existing skill file"
---

# Skill Updater Protocol

## When to Use

Use this skill whenever you need to modify, extend, or update an existing `.md` skill file within the `.agents/skills/` directory.

## Critical Patterns & Rules

1. **Language Validation (CRITICAL):**
   - BEFORE making any updates to a skill file, you MUST validate the language the skill is written in.
   - The SeedCoin project rule is: **English for AI/System (skills, code, logic) and Spanish for humans (docs, comments).**
   - If the skill content (excluding metadata/frontmatter) is in **Spanish**, you must:
     1. **Translate** the entire skill content to **English**.
     2. Apply the requested updates or modifications to the newly translated English text.
   - If the skill is already in English, simply apply the requested updates.

2. **Preserve Frontmatter:**
   - Keep the YAML frontmatter intact. Do not remove `name`, `description`, or `metadata`.
   - Update the `version` in metadata if making a significant structural change.

3. **Follow the Standard Structure:**
   - Ensure the updated skill still adheres to standard `.agents` formatting (check `skill-creator` for reference).
   - Maintain clear sections like `## When to Use`, `## Critical Patterns`, and `## Examples`.

4. **Sync After Update:**
   - After updating any skill, you MUST invoke the `skill-sync` process to ensure the `AGENTS.md` file remains synchronized with any changes.

## Examples

*Scenario: User asks "Add a rule to the 'clean-names' skill to force camelCase instead of snake_case."*
1. **Agent reads `clean-names/SKILL.md`.**
2. **Agent detects the skill is currently written in Spanish.**
3. **Agent Action:** Rewrites the file completely in English, simultaneously adding the new camelCase rule.
4. **Agent Action:** Modifies the file using exact replacements.
5. **Agent Action:** Checks if `skill-sync` is needed.

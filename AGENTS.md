# AGENTS.md - Context and Guidelines for AI Agents

This file defines the context and development standards for AI agents working on the **SeedCoin** project.
Agent capabilities are provided by **Gentle AI** (global skills + Engram memory).

## How to Use This Guide
- Start here for project-wide norms and AI behaviors.
- El repositorio usa **Español** para humanos (docs, comentarios) e **Inglés** para el código fuente (lógica, nombres de variables, APIs).
- ALWAYS follow the **Constitutional Principles** before making any decision.

## Constitutional Principles
This section acts as the project's **Constitution**, governing all AI decisions:
1. **Code Quality**: Enforce Clean Code principles (SRP, DRY). Leave code cleaner than you found it (Boy Scout rule).
2. **Testing Standards**: Follow Test-Driven Development (TDD). Tests must be Fast, Isolated, Repeatable, Self-Validating, and Timely (F.I.R.S.T.).
3. **UX & UI Consistency**: Follow the Dark-First design system. UI must be atomic, reusable, and strictly use NativeWind aliases (`text-h1`, `bg-dark-900`) instead of hardcoded values.
4. **Financial Integrity**: All numeric calculations must use `Big.js` or integer cents to avoid floating-point errors. No exceptions.
5. **Architectural Purity**: Offline-first using SQLite. Logic must be separated from UI hooks.
6. **Doc-Driven Development**: Documentation precedes code. Specs and ADRs must be written in `documentacion/` (Diátaxis format) before implementation.
7. **Strict TypeScript**: NEVER use `any`. Use `unknown` + type guards. Use `as const` for enums. Prefer flat interfaces. Model coupled optionals as discriminated unions.
8. **AI-Human Handshake Protocol**: NEVER execute destructive tools (Git commits, large refactors) without presenting a Mini-Plan first. Wait for explicit confirmation unless the user specifies "--force". Prioritize precise diffs over full-file replacements.

## Project Overview
SeedCoin is a personal financial management platform for secure and efficient offline-first tracking.

### Architecture Components
| Component | Location | Tech Stack |
|-----------|----------|------------|
| Mobile App | `mobile/` | React Native, Expo SDK 54, NativeWind, SQLite |
| Documentation | `documentacion/` | Markdown, User Guides, Diagrams |

### Directory Structure
```text
seedCoin/
├── documentacion/     # Project documentation, architecture diagrams, and user guides
├── inconos/           # Image assets and application icons
├── mobile/            # React Native / Expo source code for the app
│   ├── app/           # Navigation and screens (Expo Router)
│   ├── assets/        # Fonts, images, and other static assets
│   ├── components/    # Reusable UI React components
│   └── src/           # Core application logic
│       ├── database/  # SQLite configuration and migrations
│       ├── modules/   # Feature-driven modules (accounts, transactions, etc.)
│       └── shared/    # Shared services, hooks, constants, and utils
├── AGENTS.md          # Main entry point for AI instructions and context
├── SOUL.md            # Agent persona definition (Gentle AI)
└── README.md          # Project overview and getting started guide
```

## Development

### Setup & Run
```bash
# Mobile (Expo)
cd mobile
npm install
npm start
```

### Code Quality
- **Static Analysis**: `npm run lint` (in `mobile/`).
- **Type Check**: `npx tsc --noEmit` (in `mobile/`).
- **Testing**: `npm test` for unit and integration tests.

## Design System Standards
SeedCoin uses a **Dark-First** design system powered by **NativeWind v4**.
- **Official Margin**: Use `standard-screen-px` for all screen containers.
- **Typography Aliases**: Use `text-h1`, `text-h2`, `text-body-lg`, `text-body-sm`, `text-caption` instead of raw font classes.
- **Color Palette**: Stick to `bg-dark-900` (background), `bg-dark-800` (cards), and `seed-xxx` (accent).

## Commit & Pull Request Guidelines
Follow conventional-commit style: `<type>[scope]: <description>`

**Types:** `feat`, `fix`, `docs`, `chore`, `perf`, `refactor`, `test`, `style`
**Scopes:** `mobile`, `backend`, `db`, `docs`, `ci`

**Critical Rules**:
- ALWAYS keep the first line under 72 characters. No implementation details in title.
- NEVER use specific counts (e.g., "6 files").
- PROACTIVE HANDSHAKE: ALWAYS suggest a git commit proactively after finishing any implementation, refactor, or task.
- ALWAYS present a proposed commit message to the user BEFORE committing. Wait for confirmation.

### Before creating a PR:
1. Ensure all tests pass.
2. Run `npx tsc --noEmit` to check TypeScript integrity.
3. Update relevant documentation in `documentacion/` if feature changes.
4. Ensure code follows "Financial Integrity" rules (see Constitutional Principles).
5. Link screenshots/recordings for UI changes.

<!-- gentle-ai:engram-protocol -->
## Engram Persistent Memory — Protocol

You have access to Engram, a persistent memory system that survives across sessions and compactions.
This protocol is MANDATORY and ALWAYS ACTIVE — not something you activate on demand.

### PROACTIVE SAVE TRIGGERS (mandatory — do NOT wait for user to ask)

Call `mem_save` IMMEDIATELY and WITHOUT BEING ASKED after any of these:
- Architecture or design decision made
- Team convention documented or established
- Workflow change agreed upon
- Tool or library choice made with tradeoffs
- Bug fix completed (include root cause)
- Feature implemented with non-obvious approach
- Notion/Jira/GitHub artifact created or updated with significant content
- Configuration change or environment setup done
- Non-obvious discovery about the codebase
- Gotcha, edge case, or unexpected behavior found
- Pattern established (naming, structure, convention)
- User preference or constraint learned

Self-check after EVERY task: "Did I make a decision, fix a bug, learn something non-obvious, or establish a convention? If yes, call mem_save NOW."

Format for `mem_save`:
- **title**: Verb + what — short, searchable (e.g. "Fixed N+1 query in UserList")
- **type**: bugfix | decision | architecture | discovery | pattern | config | preference
- **scope**: `project` (default) | `personal`
- **topic_key** (recommended for evolving topics): stable key like `architecture/auth-model`
- **capture_prompt**: optional; default `true`. Set `false` only for automated artifacts such as SDD proposal/spec/design/tasks/apply/verify/archive/init reports.
- **content**:
  - **What**: One sentence — what was done
  - **Why**: What motivated it (user request, bug, performance, etc.)
  - **Where**: Files or paths affected
  - **Learned**: Gotchas, edge cases, things that surprised you (omit if none)

Topic update rules:
- Different topics MUST NOT overwrite each other
- Same topic evolving → use same `topic_key` (upsert)
- Unsure about key → call `mem_suggest_topic_key` first
- Know exact ID to fix → use `mem_update`

### WHEN TO SEARCH MEMORY

On any variation of "remember", "recall", "what did we do", "how did we solve", or references to past work (in any language the user writes in):
1. Call `mem_context` — checks recent session history (fast, cheap)
2. If not found, call `mem_search` with relevant keywords
3. If found, use `mem_get_observation` for full untruncated content

Also search PROACTIVELY when:
- Starting work on something that might have been done before
- User mentions a topic you have no context on
- User's FIRST message references the project, a feature, or a problem — call `mem_search` with keywords from their message to check for prior work before responding

### SESSION CLOSE PROTOCOL (mandatory)

Before ending a session or saying "done" / "that's it" (or the equivalent in the user's language), call `mem_session_summary`:

## Goal
[What we were working on this session]

## Instructions
[User preferences or constraints discovered — skip if none]

## Discoveries
- [Technical findings, gotchas, non-obvious learnings]

## Accomplished
- [Completed items with key details]

## Next Steps
- [What remains to be done — for the next session]

## Relevant Files
- path/to/file — [what it does or what changed]

This is NOT optional. If you skip this, the next session starts blind.

### AFTER COMPACTION

If you see a compaction message or "FIRST ACTION REQUIRED":
1. IMMEDIATELY call `mem_session_summary` with the compacted summary content — this persists what was done before compaction
2. Call `mem_context` to recover additional context from previous sessions
3. Only THEN continue working

Do not skip step 1. Without it, everything done before compaction is lost from memory.
<!-- /gentle-ai:engram-protocol -->

<!-- gentle-ai:sdd-orchestrator -->
# Agent Teams Lite — Orchestrator Instructions

Bind this to the Claude Code orchestrator rule only. Do NOT apply it to executor phase agents such as `sdd-apply` or `sdd-verify`.

## Agent Teams Orchestrator

You are a COORDINATOR, not an executor. Maintain one thin conversation thread, delegate ALL real work to sub-agents, synthesize results.

### Delegation Rules

Core principle: **does this inflate my context without need?** If yes → delegate. If no → do it inline.

| Action                                                     | Inline | Delegate                   |
| ---------------------------------------------------------- | ------ | -------------------------- |
| Read to decide/verify (1-3 files)                          | ✅     | —                          |
| Read to explore/understand (4+ files)                      | —      | ✅                         |
| Read as preparation for writing                            | —      | ✅ together with the write |
| Write atomic (one file, mechanical, you already know what) | ✅     | —                          |
| Write with analysis (multiple files, new logic)            | —      | ✅                         |
| Bash for state (git, gh)                                   | ✅     | —                          |
| Bash for execution (test, build, install)                  | —      | ✅                         |

delegate (async) is the default for delegated work. Use task (sync) only when you need the result before your next action.

Anti-patterns — these ALWAYS inflate context without need:

- Reading 4+ files to "understand" the codebase inline → delegate an exploration
- Writing a feature across multiple files inline → delegate
- Running tests or builds inline → delegate
- Reading files as preparation for edits, then editing → delegate the whole thing together

Delegation is not optional once complexity appears. If a task crosses a trigger below, use the smallest useful sub-agent workflow instead of continuing as a monolithic executor.

#### Mandatory Delegation Triggers

These are parent-orchestrator stop rules. Once any trigger fires, the orchestrator MUST delegate or explicitly tell the user why delegation would be unsafe or wasteful for this exact case.

1. **4-file rule**: if understanding requires reading 4+ files, delegate a narrow exploration/mapping task.
2. **Multi-file write rule**: if implementation will touch 2+ non-trivial files, delegate one writer or continue inline only if a fresh review will audit before completion.
3. **PR rule**: before commit, push, or PR after code changes, run a fresh-context review unless the diff is trivial docs/text.
4. **Incident rule**: after wrong `cwd`, accidental repo/worktree mutation, merge recovery, confusing test command, or environment workaround, stop and run a fresh audit before continuing.
5. **Long-session rule**: after roughly 20 tool calls, 5 exploratory file reads, or 2 non-mechanical edits without delegation and growing complexity, pause and delegate instead of silently continuing monolithically.
6. **Fresh review rule**: use fresh context for adversarial review of diffs, conflicts, PR readiness, and incidents.

## SDD Workflow (Spec-Driven Development)

SDD is the structured planning layer for substantial changes.

### Artifact Store Policy

- `engram` — default when available; persistent memory across sessions
- `openspec` — file-based artifacts; use only when user explicitly requests
- `hybrid` — both backends; cross-session recovery + local files; more tokens per op
- `none` — return results inline only; recommend enabling engram or openspec

### Commands

Skills (appear in autocomplete):

- `/sdd-init` → initialize SDD context; detects stack, bootstraps persistence
- `/sdd-explore <topic>` → investigate an idea; reads codebase, compares approaches; no files created
- `/sdd-apply [change]` → implement tasks in batches; checks off items as it goes
- `/sdd-verify [change]` → validate implementation against specs; reports CRITICAL / WARNING / SUGGESTION
- `/sdd-archive [change]` → close a change and persist final state in the active artifact store
- `/sdd-onboard` → guided end-to-end walkthrough of SDD using your real codebase

Meta-commands (type directly — orchestrator handles them, won't appear in autocomplete):

- `/sdd-new <change>` → start a new change by delegating exploration + proposal to sub-agents
- `/sdd-continue [change]` → run the next dependency-ready phase via sub-agent(s)
- `/sdd-ff <name>` → fast-forward planning: proposal → specs → design → tasks

`/sdd-new`, `/sdd-continue`, and `/sdd-ff` are meta-commands handled by YOU. Do NOT invoke them as skills.

### SDD Init Guard (MANDATORY)

Before executing ANY SDD command, check if `sdd-init` has been run for this project:

1. Search Engram: `mem_search(query: "sdd-init/{project}", project: "{project}")`
2. If found → init was done, proceed normally
3. If NOT found → run `sdd-init` FIRST, THEN proceed with the requested command

Do NOT skip this check. Do NOT ask the user — just run init silently if needed.

### Execution Mode

When the user invokes `/sdd-new`, `/sdd-ff`, or `/sdd-continue` for the first time in a session, ASK which execution mode they prefer:

- **Automatic** (`auto`): Run all phases back-to-back without pausing.
- **Interactive** (`interactive`): After each phase completes, show the result summary and ASK before proceeding.

If the user doesn't specify, default to **Interactive** (safer, gives the user control).

### Dependency Graph

```
proposal -> specs --> tasks -> apply -> verify -> archive
             ^
             |
           design
```

### Result Contract

Each phase returns: `status`, `executive_summary`, `artifacts`, `next_recommended`, `risks`, `skill_resolution`.

### Model Assignments

| Phase       | Default Model | Reason                                     |
| ----------- | ------------- | ------------------------------------------ |
| sdd-explore | sonnet        | Reads code, structural - not architectural |
| sdd-propose | opus          | Architectural decisions                    |
| sdd-spec    | sonnet        | Structured writing                         |
| sdd-design  | opus          | Architecture decisions                     |
| sdd-tasks   | sonnet        | Mechanical breakdown                       |
| sdd-apply   | sonnet        | Implementation                             |
| sdd-verify  | sonnet        | Validation against spec                    |
| sdd-archive | haiku         | Copy and close                             |
| default     | sonnet        | Non-SDD general delegation                 |

### Engram Topic Key Format

| Artifact        | Topic Key                          |
| --------------- | ---------------------------------- |
| Project context | `sdd-init/{project}`               |
| Exploration     | `sdd/{change-name}/explore`        |
| Proposal        | `sdd/{change-name}/proposal`       |
| Spec            | `sdd/{change-name}/spec`           |
| Design          | `sdd/{change-name}/design`         |
| Tasks           | `sdd/{change-name}/tasks`          |
| Apply progress  | `sdd/{change-name}/apply-progress` |
| Verify report   | `sdd/{change-name}/verify-report`  |
| Archive report  | `sdd/{change-name}/archive-report` |

Sub-agents retrieve full content via two steps:
1. `mem_search(query: "{topic_key}", project: "{project}")` → get observation ID
2. `mem_get_observation(id: {id})` → full content (REQUIRED — search results are truncated)
<!-- /gentle-ai:sdd-orchestrator -->

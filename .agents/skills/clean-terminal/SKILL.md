---
name: clean-terminal
description: >
  Standards and protocols for the AI agent when executing terminal commands.
  Trigger: Before executing ANY shell or terminal command.
trigger: Before executing commands
allowed-tools: [Read, Write, Glob, Command]
metadata:
  author: seedcoin
  version: "1.0"
  scope: [root]
  auto_invoke: "Executing commands in the terminal"
---

# Clean Terminal Protocol

## When to Use

This skill is MANDATORY and must be applied BEFORE attempting to run any command via the `run_command` tool.

## Critical Patterns

1. **Specific Tools Over Generic Commands (Golden Rule)**
   - NEVER use `cat`, `grep`, `ls`, `mkdir`, `echo`, or `sed` via the terminal.
   - ALWAYS use specific agent tools instead: `view_file`, `grep_search`, `list_dir`, `write_to_file`, `replace_file_content`.

2. **OS Awareness (Windows/PowerShell)**
   - Assume the environment is **Windows with PowerShell**.
   - Do NOT use Unix-specific commands like `rm`, `cp`, `mv`, `ls`.
   - Prefer Node.js scripts (via `npm run ...`) or explicit PowerShell cmdlets (e.g., `Remove-Item`) when file manipulation in the terminal is strictly necessary.

3. **Verify Context First**
   - NEVER execute a command that relies on a specific path without first using `list_dir` or `view_file` to confirm the path or file exists. No guessing.

4. **Step-by-Step Execution**
   - Do NOT use one-liners with `&&` or `|` for complex operations.
   - Execute one command, wait for the result/status, verify success, then execute the next step.

5. **NPM Scripts Over Raw Commands**
   - Prefer executing defined scripts in `package.json` over constructing raw commands.
   - E.g., `npm run test` instead of `npx jest ...`.

## Examples

**BAD:**
```bash
# Agent tries to read a file
cat mobile/src/App.tsx

# Agent tries to find a string
grep -r "Text" .

# Agent chains commands without verification
mkdir new_folder && cd new_folder && npm init -y
```

**GOOD:**
- Agent uses `view_file` tool for `App.tsx`.
- Agent uses `grep_search` tool to find "Text".
- Agent uses `run_command` to execute `npm run lint` and checks `command_status`.

## Resources
- **Project Context**: `AGENTS.md`
- **Related Skill**: `clean-commits`

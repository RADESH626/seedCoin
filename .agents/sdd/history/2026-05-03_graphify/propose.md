# Proposal - Graphify Integration

## Strategy
We will integrate `graphify` as a native skill for the SeedCoin project agents. This will allow any AI agent working on this repo to have a global view of the architecture and connections.

### Steps:
1. **Verify Python:** Ask the user to ensure Python 3.10+ is installed and available in the PATH.
2. **Install Tool:** Run `pip install graphifyy` and `graphify antigravity install`.
3. **Register Skill:** Create `.agents/skills/graphify/SKILL.md` to document how to use `/graphify` within the project.
4. **Project Setup:**
    - Update `.gitignore` to exclude `graphify-out/`.
    - Register the new skill in `AGENTS.md`.
    - Run the first `/graphify .` to generate the initial graph.

## Affected Files
- [NEW] `.agents/skills/graphify/SKILL.md`
- [MODIFY] `.gitignore`
- [MODIFY] `AGENTS.md`

## Rollback Plan
- Delete the folder `.agents/skills/graphify/`.
- `git checkout .gitignore AGENTS.md` to revert project changes.
- `pip uninstall graphifyy` to remove the global tool.

## Accepted Risks
- **External Dependency:** We depend on the `graphifyy` PyPI package.
- **Python Requirement:** Implementation is on hold until Python is confirmed.

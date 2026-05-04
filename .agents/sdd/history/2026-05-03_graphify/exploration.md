# Exploration - Graphify Integration

## Impact Mapping
- [MODIFY] [.gitignore](file:///d:/Familia/Documents/emanuel/proyectos%20personales/seedCoin/.gitignore): Add `graphify-out/` to ignore list and clean up duplicates.
- [NEW] [.agents/skills/graphify/SKILL.md](file:///d:/Familia/Documents/emanuel/proyectos%20personales/seedCoin/.agents/skills/graphify/SKILL.md): Create a new skill to manage graphify commands and integration.
- [MODIFY] [AGENTS.md](file:///d:/Familia/Documents/emanuel/proyectos%20personales/seedCoin/AGENTS.md): Register the new skill in the "SeedCoin-Specific Skills" and "Auto-invoke Rules" tables.

## Detected Risks
- **Python Missing:** `python --version` failed. `graphify` requires Python 3.10+. Implementation is blocked until Python is available.
- **Windows Environment:** CLI commands and installation might require specific flags (e.g. `--platform windows`).
- **Project Size:** While not huge, mapping everything (including docs and images) might be slow initially.

## Boy Scout Refactoring
- [ ] Clean up `.gitignore` (remove duplicate `*.log` and organize sections).
- [ ] Sync `AGENTS.md` using `skill-sync` after adding the new skill.

## Research Notes
- `graphify` PyPI package: `graphifyy` (double y).
- Command to install for Antigravity: `graphify antigravity install`.
- Default output directory: `graphify-out/`.

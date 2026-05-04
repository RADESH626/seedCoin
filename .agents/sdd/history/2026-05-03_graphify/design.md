# Design - Graphify Integration

## Tech Stack & Architecture
- **Language:** Python 3.12 (Local User Installation).
- **Core Tool:** `graphifyy` (PyPI package).
- **Integration Layer:** SeedCoin Local Skill System (`.agents/skills/`).
- **Storage:** Local file system (`graphify-out/`).

## Implementation Details

### 1. Python Path Mapping
Since `python` is not in the global PATH, we will use the following variables in our internal logic:
- `PYTHON_EXE`: `C:\Users\FamiliaGalviz\AppData\Local\Programs\Python\Python312\python.exe`
- `PIP_EXE`: `C:\Users\FamiliaGalviz\AppData\Local\Programs\Python\Python312\Scripts\pip.exe`
- `GRAPHIFY_EXE`: `C:\Users\FamiliaGalviz\AppData\Local\Programs\Python\Python312\Scripts\graphify.exe`

### 2. New Skill: `graphify`
The skill will be located at `.agents/skills/graphify/SKILL.md`.
- **Trigger:** When requested to "update the graph", "show connections", or "visualize architecture".
- **Commands:**
    - `update`: Runs `graphify .`
    - `install`: Runs `pip install graphifyy && graphify antigravity install`

### 3. Gitignore Cleanup
- Remove duplicate `*.log` entries.
- Add `graphify-out/` under the `# Misc` or `# Logs` section.

## Impacted Files
- [NEW] [.agents/skills/graphify/SKILL.md](file:///d:/Familia/Documents/emanuel/proyectos%20personales/seedCoin/.agents/skills/graphify/SKILL.md)
- [MODIFY] [.gitignore](file:///d:/Familia/Documents/emanuel/proyectos%20personales/seedCoin/.gitignore)
- [MODIFY] [AGENTS.md](file:///d:/Familia/Documents/emanuel/proyectos%20personales/seedCoin/AGENTS.md)

## Verification Plan
1. Run `$PIP_EXE install graphifyy`.
2. Run `$GRAPHIFY_EXE antigravity install`.
3. Run `$GRAPHIFY_EXE .`.
4. Verify `graphify-out/` exists and contains files.
5. Run `skill-sync` to update `AGENTS.md`.

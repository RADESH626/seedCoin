---
name: graphify
description: "Turn the SeedCoin codebase into a navigable knowledge graph. Use when you need to understand cross-module dependencies, architecture, or to update the project's visual map."
trigger: /graphify
metadata:
  author: seedcoin
  version: "1.0"
  scope: [root]
  auto_invoke: "Codebase mapping or architecture navigation"
---

# /graphify

This skill manages the project's knowledge graph using the `graphifyy` tool. It helps AI agents navigate the "Local-First" architecture by understanding connections between SQLite schemas, React Native components, and documentation.

## Usage

### 1. Update/Generate Graph
Run this to refresh the knowledge graph after significant changes to the codebase or documentation.
```bash
& "C:\Users\FamiliaGalviz\AppData\Local\Programs\Python\Python312\Scripts\graphify.exe" .
```

### 2. Query the Graph
Ask specific questions about the architecture or "why" something is connected.
```bash
& "C:\Users\FamiliaGalviz\AppData\Local\Programs\Python\Python312\Scripts\graphify.exe" query "How are triggers connected to the useAccounts hook?"
```

### 3. Analyze Connections
Identify "God nodes" (critical components) or surprising connections.
```bash
& "C:\Users\FamiliaGalviz\AppData\Local\Programs\Python\Python312\Scripts\graphify.exe" explain "DatabaseTriggers"
```

## Outputs
- **graphify-out/graph.html**: Interactive visual map (open in browser).
- **graphify-out/GRAPH_REPORT.md**: Plain-language report with architectural highlights.
- **graphify-out/graph.json**: Raw graph data for agent navigation.

## Maintenance
- Keep `graphify-out/` in `.gitignore`.
- Run `/graphify .` after major refactors to keep the AI's "mental map" updated.

---
name: excalidraw
description: >
  Protocol for creating and maintaining architecture diagrams using Excalidraw instead of Mermaid.
  Trigger: When creating, modifying, or refactoring visual documentation or architecture diagrams.
metadata:
  author: seedcoin
  version: "1.0"
  scope: [root]
  auto_invoke: "Working with architecture diagrams or visual documentation"
---

# Excalidraw Diagrams

## When to Use

- When the user requests a new architecture diagram (ER models, component maps, flows).
- When migrating legacy Mermaid (`.md` embedded) diagrams to a more visual format.
- When generating visual documentation.

## Critical Patterns

1. **Excalidraw over Mermaid:** By default, SeedCoin uses Excalidraw for all visual diagrams to ensure high visual quality and editability. Do not use Mermaid unless explicitly requested.
2. **File Format:** Save diagrams as `.excalidraw` files (which are JSON structures) in the appropriate `documentacion/.../diagramas/` folder.
3. **Markdown Integration:** When a markdown file needs a diagram, add a link to the `.excalidraw` file instead of embedding Mermaid code blocks.
4. **AI Generation:** If you have access to Excalidraw MCP tools, use them to programmatically generate or manipulate the diagram elements. If not, generate the raw JSON structure of an Excalidraw file.
5. **Aesthetics:** Use a dark theme (matching SeedCoin's Dark-First UI) and clean alignment for components.

## Examples

### Linking a Diagram in Markdown

```markdown
# Mapa de Componentes

[Ver Mapa de Componentes Interactivo](./mapa_componentes.excalidraw)
```

## Resources

- **Diagrams Directory:** `documentacion/diataxis/referencia/diagramas/`
- **Excalidraw Format:** JSON structure compatible with [excalidraw.com](https://excalidraw.com) or the VS Code Excalidraw extension.

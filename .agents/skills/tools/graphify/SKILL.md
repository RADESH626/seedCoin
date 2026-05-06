---
name: graphify
description: "Convierte el código de SeedCoin en un grafo de conocimiento navegable. Úsalo para entender dependencias entre módulos, arquitectura o para actualizar el mapa visual del proyecto."
trigger: /graphify
metadata:
  author: seedcoin
  version: "1.0"
  scope: [root]
  auto_invoke: "Mapeo del código o navegación por la arquitectura"
---

# /graphify

Este skill gestiona el grafo de conocimiento del proyecto usando la herramienta `graphify`. Ayuda a los agentes de IA a navegar por la arquitectura "Local-First" comprendiendo las conexiones entre los esquemas de SQLite, los componentes de React Native y la documentación.

## Uso

### 1. Actualizar/Generar Grafo
Ejecuta esto para refrescar el grafo de conocimiento después de cambios significativos en el código o la documentación.
```bash
& "C:\Users\FamiliaGalviz\AppData\Local\Programs\Python\Python312\Scripts\graphify.exe" update .
```

### 2. Consultar el Grafo
Haz preguntas específicas sobre la arquitectura o el "por qué" algo está conectado.
```bash
& "C:\Users\FamiliaGalviz\AppData\Local\Programs\Python\Python312\Scripts\graphify.exe" query "¿Cómo están conectados los triggers con el hook useAccounts?"
```

### 3. Analizar Conexiones
Identificar "nodos Dios" (componentes críticos) o conexiones sorprendentes.
```bash
& "C:\Users\FamiliaGalviz\AppData\Local\Programs\Python\Python312\Scripts\graphify.exe" explain "DatabaseTriggers"
```

## Salidas (Outputs)
- **graphify-out/graph.html:** Mapa visual interactivo (abrir en navegador).
- **graphify-out/GRAPH_REPORT.md:** Reporte en lenguaje natural con aspectos destacados de la arquitectura.
- **graphify-out/graph.json:** Datos brutos del grafo para la navegación del agente.

## Mantenimiento
- Mantener `graphify-out/` en el `.gitignore`.
- Ejecutar `/graphify .` después de refactorizaciones mayores para mantener actualizado el "mapa mental" de la IA.

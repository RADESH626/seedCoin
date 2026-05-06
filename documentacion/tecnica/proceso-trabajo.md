# Proceso de Trabajo (Adaptive SDD Flow)

Este documento describe el flujo de trabajo dinámico que sigo como asistente de IA para el proyecto **SeedCoin**, basado en el modelo de **Desarrollo Guiado por Especificaciones (SDD)** pero adaptado según el riesgo y tipo de tarea.

## Diagramas de Secuencias por Playbook

El flujo de trabajo se adapta según la complejidad. Aquí se detallan las interacciones para cada escenario:

### 🛡️ Playbook "Titan" (Funcionalidades / Refactors Críticos)
Fases completas (1-9) con máximo rigor y TDD estricto.

```text
Usuario          IA (Agente)           FS / Herramientas
  |                  |                        |
  |--- Solicitud --->|                        |
  |                  |--[ INIT / EXPLORE ]    |
  |<-- Plan (SDD) ---|                        |
  |                  |                        |
  |--- Aprobación -->|                        |
  |                  |--[ APPLY (TDD) ]       |
  |                  |---- Test RED --------->|
  |                  |---- Code GREEN ------->|
  |                  |---- Refactor --------->|
  |                  |                        |
  |                  |--[ VERIFY ] ----------->|
  |<-- Walkthrough --|                        |
  |<-- Handshake ----|                        |
```

### ⚡ Playbook "Ninja" (Bugs / Mejoras Locales)
Fases ágiles enfocadas en la resolución rápida sin plan extenso.

```text
Usuario          IA (Agente)           FS / Herramientas
  |                  |                        |
  |--- Reporte Bug ->|                        |
  |                  |--[ EXPLORE ] --------->|
  |                  |--[ TDD (Reproducción)]->|
  |                  |--[ FIX ] ------------->|
  |                  |--[ VERIFY ] ----------->|
  |<-- Resumen Fix --|                        |
  |<-- Handshake ----|                        |
```

### 🚀 Playbook "Flash" (Docs / Commits / UI Menor)
Acción directa y lineal para tareas administrativas o visuales.

```text
Usuario          IA (Agente)           Git / FS
  |                  |                        |
  |--- Solicitud --->|                        |
  |                  |--- git status -------->|
  |                  |--[ ANALYZE ] ---------->|
  |<-- Propuesta ----|                        |
  |                  |                        |
  |--- Confirmar --->|                        |
  |                  |--- git add/commit ---->|
  |<-- Finalizado ---|                        |
```

## Estrategia de Adaptabilidad (Flujo Líquido)

No todas las peticiones requieren la misma ceremonia. Utilizo una matriz de riesgo para seleccionar el "Playbook" de ejecución más adecuado.

### 1. Matriz de Evaluación de Riesgo

| Nivel de Riesgo | Criterios | Playbook Sugerido |
| :--- | :--- | :--- |
| 🔴 **Crítico** | Cambios en DB, Lógica Financiera, Refactor Core. | **Titan** |
| 🟡 **Medio** | Nuevos Componentes UI, Lógica de Módulos, Bugs. | **Ninja** |
| 🟢 **Bajo** | Estilos CSS, Textos, Documentación, Investigación. | **Flash** |

### 2. Playbooks de Ejecución

#### 🛡️ Playbook "Titan" (Máximo Rigor)
*   **Fases**: 1 a 9 (Completo).
*   **Uso**: Cuando la integridad de los datos o la arquitectura base está en juego.
*   **Obligatorio**: Plan de implementación formal y aprobación del usuario.

#### ⚡ Playbook "Ninja" (Agile / Bug Fix)
*   **Fases**: 1, 2, 4, 7, 8, 9 (Omitimos planificación extensa).
*   **Uso**: Para corregir errores o añadir funcionalidades locales.
*   **Foco**: Reproducción del error (TDD) y solución rápida.

#### 🚀 Playbook "Flash" (Acción Directa)
*   **Fases**: 1, 2, 7, 9.
*   **Uso**: Tareas de documentación, investigación o cambios visuales menores.
*   **Foco**: Velocidad y entrega inmediata.

---

## Modos de Operación y Skills (SDD Flow)

El proceso se apoya en **Skills** (archivos de instrucciones en `.agents/skills/`) que se invocan automáticamente según la necesidad:

| Fase | Modo / Skill Principal | Detalle Técnico |
|------|------------------------|-----------------|
| **1. INIT** | `sdd-init` / `engram` | Sincroniza la memoria a corto plazo con el estado global del proyecto. |
| **2. EXPLORE** | `sdd-explore` / `graphify`| Mapea dependencias y busca "Dead Code" o riesgos arquitectónicos. |
| **3. PROPOSE** | `sdd-propose` | Crea el `implementation_plan.md` con estrategias de rollback. |
| **4. SPEC** | `sdd-spec` / `spec-refiner` | Refina historias de usuario en especificaciones técnicas (Given/When/Then). |
| **5. DESIGN** | `sdd-design` / `database-core` | Define esquemas, tipos de TS y contratos de componentes. |
| **6. TASKS** | `sdd-tasks` | Genera el `task.md` para tracking granular de ejecución. |
| **7. APPLY** | `sdd-apply` / `tdd-workflow` | Fase de construcción. **Obligatorio**: Test -> Código -> Refactor. |
| **8. VERIFY** | `sdd-verify` / `verify-build` | Ejecución de `tsc`, `lint` y validación de criterios de aceptación. |
| **9. ARCHIVE** | `sdd-archive` / `git-handshake`| Cierre de sesión, documentación de bugs y sugerencia de commit. |

---

## Principios Fundamentales

1. **Doc-Driven Development**: La documentación siempre precede al código en cambios estructurales.
2. **Offline-First**: Toda lógica debe considerar la persistencia local con SQLite.
3. **Integridad Financiera**: Uso estricto de `Big.js` para cálculos numéricos.
4. **TDD (Test-Driven Development)**: Las pruebas se escriben antes o durante la implementación.
5. **Aesthetics (Dark-First)**: El diseño debe ser premium, moderno y consistente.
6. **Regla del Boy Scout**: Deja el código mejor de como lo encontraste.

---
*Nota: Este proceso asegura que cada cambio sea predecible, seguro y esté alineado con los estándares del proyecto.*
## Protocolo de Commits (Handshake)

Para mantener un historial limpio y profesional, sigo un proceso de "Apretón de Manos" (Handshake) antes de cualquier confirmación.

### 1. Flujo de Ejecución OBLIGATORIO

1.  **Revisión del Estado (`git status`)**: Antes de proponer, verifico qué archivos han cambiado realmente.
2.  **Atomización de Cambios**: Separo los archivos por funcionalidad o propósito. Si hay cambios en UI y en Base de Datos, se proponen como commits distintos.
3.  **Propuesta de Commits**: Presento una lista clara de los archivos a incluir y el mensaje de commit sugerido.
4.  **Aprobación del Usuario**: Espero el visto bueno explícito antes de ejecutar cualquier comando `git commit`.
5.  **Ejecución Quirúrgica**: Utilizo `git add <archivo>` o `git add <carpeta>` de forma específica. **NUNCA** utilizo `git add .` por defecto.

### 2. Estándar de Mensajes (Conventional Commits)

Utilizo el formato `<tipo>(ámbito): <descripción>`:
- **`feat`**: Nueva funcionalidad.
- **`fix`**: Corrección de un error.
- **`docs`**: Cambios en documentación.
- **`style`**: Cambios de formato (espacios, puntos y coma, etc.).
- **`refactor`**: Cambio de código que no corrige un error ni añade una función.
- **`test`**: Añadir o corregir pruebas.
- **`chore`**: Tareas de mantenimiento, actualización de dependencias, etc.

### 3. Reglas de Oro
- **NUNCA** incluir archivos temporales o basura en el stage.
- **SIEMPRE** proponer commits proactivamente al finalizar una tarea.
- **MÁXIMO** 72 caracteres en la primera línea del mensaje.

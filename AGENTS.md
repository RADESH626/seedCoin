# AGENTS.md - Context and Guidelines for AI Agents

This file defines the context, skills, and development standards for AI agents working on the **SeedCoin** project.

## How to Use This Guide
- Start here for project-wide norms and AI behaviors.
- El repositorio sigue un modelo unificado: **Español** para humanos (docs, comentarios) y para la IA (instrucciones de Skills). El **Inglés** se reserva para el código fuente (lógica, nombres de variables, APIs estándar).
- Local skills in `.agents/skills/` provide detailed patterns on-demand.
- ALWAYS consult the **Auto-invoke Skills** table before performing any action.

## Constitutional Principles (`/speckit.constitution`)
This section acts as the project's **Constitution**, governing all AI decisions:
1. **Code Quality**: Enforce Clean Code principles (SRP, DRY). Leave code cleaner than you found it (Boy Scout rule).
2. **Testing Standards**: Follow Test-Driven Development (TDD). Tests must be Fast, Isolated, Repeatable, Self-Validating, and Timely (F.I.R.S.T.).
3. **UX & UI Consistency**: Follow the Dark-First design system. UI must be atomic, reusable, and strictly use NativeWind aliases (`text-h1`, `bg-dark-900`) instead of hardcoded values.
4. **Financial Integrity**: All numeric calculations must use `Big.js` or integer cents to avoid floating-point errors. No exceptions.
5. **Architectural Purity**: Offline-first using SQLite. Logic must be separated from UI hooks.
6. **Doc-Driven Development**: Documentation precedes code. Specs and ADRs must be written in `documentacion/` (Diátaxis format) before implementation.
7. **Strict TypeScript**: NEVER use `any`. Use `unknown` + type guards. Use `as const` for enums. Prefer flat interfaces. Model coupled optionals as discriminated unions.
8. **AI-Human Handshake Protocol**: NEVER execute destructive tools (Git commits, large refactors) without presenting a Mini-Plan first. Wait for explicit confirmation unless the user specifies "--force". Prioritize precise diffs over full-file replacements.

## Available Skills

### Skills Genéricos (Cualquier Proyecto)
| Skill | Descripción | URL |
|-------|-------------|-----|
| `typescript` | Tipos constantes, interfaces planas, tipos de utilidad | [TypeScript Docs](https://www.typescriptlang.org/) |
| `react-19` | Patrones modernos de React 19 (sin useMemo/useCallback por defecto) | [React Docs](https://react.dev/) |
| `react-native` | Convenciones del framework móvil | [React Native Docs](https://reactnative.dev/docs/getting-started) |
| `expo-54` | App Router, SDK 54, SQLite y Build | [Expo Docs](https://docs.expo.dev/) |
| `nativewind-4` | Tailwind 3.4 para Native, patrones de className | [NativeWind Docs](https://www.nativewind.dev/) |
| `tdd` | Flujo de trabajo de Desarrollo Guiado por Pruebas | [TDD Workflow](.agents/skills/engineering/tdd-workflow/SKILL.md) |

### Skills Específicos de SeedCoin
| Skill | Descripción | URL |
|-------|-------------|-----|
| `clean-code` | Máximo 3 argumentos, SRP, Nombres Limpios, Tests F.I.R.S.T., Sin código muerto | [.agents/skills/engineering/clean-code/SKILL.md](.agents/skills/engineering/clean-code/SKILL.md) |
| `ui-development` | React 19, Atomización de UI, Estilizado con NativeWind (Dark First) | [.agents/skills/engineering/ui-development/SKILL.md](.agents/skills/engineering/ui-development/SKILL.md) |
| `database-core` | Esquema SQLite, Consultas, Índices, Precisión Financiera | [.agents/skills/engineering/database-core/SKILL.md](.agents/skills/engineering/database-core/SKILL.md) |
| `deep-audit` | Framework de revisión exhaustiva de la base de código | [.agents/skills/tools/deep-audit/SKILL.md](.agents/skills/tools/deep-audit/SKILL.md) |
| `clean-documentation`| Estándares unificados y limpieza de documentación | [.agents/skills/tools/clean-documentation/SKILL.md](.agents/skills/tools/clean-documentation/SKILL.md) |
| `clean-terminal` | Estándares y protocolos al ejecutar comandos de terminal | [.agents/skills/tools/clean-terminal/SKILL.md](.agents/skills/tools/clean-terminal/SKILL.md) |
| `skill-creator` | Crear o actualizar skills especializadas para el agente | [.agents/skills/tools/skill-creator/SKILL.md](.agents/skills/tools/skill-creator/SKILL.md) |
| `skill-sync` | Sincronizar AGENTS.md con los skills locales | [.agents/skills/tools/skill-sync/SKILL.md](.agents/skills/tools/skill-sync/SKILL.md) |
| `bug-logger` | Documentación especializada de errores y persistencia en Engram | [.agents/skills/tools/bug-logger/SKILL.md](.agents/skills/tools/bug-logger/SKILL.md) |
| `verify-build` | Chequeos de integridad de tipos TypeScript y Build | [.agents/skills/engineering/verify-build/SKILL.md](.agents/skills/engineering/verify-build/SKILL.md) |
| `doc-writer` | Sincronización de Diátaxis, ADRs y Docs-as-Code | [.agents/skills/tools/doc-writer/SKILL.md](.agents/skills/tools/doc-writer/SKILL.md) |
| `graphify` | Mapeo de arquitectura y navegación por el código | [.agents/skills/tools/graphify/SKILL.md](.agents/skills/tools/graphify/SKILL.md) |
| `spec-refiner` | Protocolo interactivo para refinar historias de usuario en specs | [.agents/skills/tools/spec-refiner/SKILL.md](.agents/skills/tools/spec-refiner/SKILL.md) |
| `git-handshake` | Protocolo proactivo para sugerir commits tras tareas | [.agents/skills/tools/git-handshake/SKILL.md](.agents/skills/git-handshake/SKILL.md) |
| `systematic-debugging` | Protocolo estructurado de diagnóstico: síntoma → hipótesis → fix → test | [.agents/skills/tools/systematic-debugging/SKILL.md](.agents/skills/tools/systematic-debugging/SKILL.md) |

## Sub-Agent Mission Control (Adaptive SDD Flow)
SeedCoin opera bajo un modelo de **Desarrollo Guiado por Especificaciones (SDD)** adaptativo. El orquestador selecciona un **Playbook** de ejecución según el nivel de riesgo detectado.

> [!IMPORTANT]
> El flujo no es estático. Consulta la **Matriz de Decisión y Playbooks (Titan, Ninja, Flash)** en: [Proceso de Trabajo (SDD Flow)](file:///d:/Familia/Documents/emanuel/proyectos%20personales/seedCoin/documentacion/tecnica/proceso-trabajo.md)

| Fase | Sub-Agente | Acción Principal |
|------|------------|------------------|
| 1 | `sdd-init` | Huella digital del proyecto y carga de memoria (`engram`). |
| 2 | `sdd-explore` | Investigación del código y análisis de riesgos. |
| 3 | `sdd-propose` | Estrategia de solución y plan de rollback. |
| 4 | `sdd-spec` | Especificaciones de cambio y criterios (Given/When/Then). |
| 5 | `sdd-design` | Arquitectura técnica, esquemas y contratos. |
| 6 | `sdd-tasks` | Desglose de tareas atómicas como checklist. |
| 7 | `sdd-apply` | Implementación de código (TDD). |
| 8 | `sdd-verify` | Validación de tipos, pruebas y control de calidad. |
| 9 | `sdd-archive` | Cierre de sesión, limpieza y persistencia (`engram`). |

## Auto-invoke Rules
ALWAYS invoke the corresponding skill FIRST when starting an action:

| Acción | Skill / Workflow Obligatorio |
|--------|------------------------------|
| Nueva funcionalidad / Tarea compleja | `sdd-orchestrator` · `/feature` |
| Guardar/Cargar conocimiento persistente | `engram` |
| Modificar esquemas o consultas de base de datos | `database-core` |
| Verificar integridad después de los cambios | `verify-build` · `/audit` |
| Crear interfaces o estilizado de UI | `ui-development` |
| Escribir o refactorizar cualquier código | `clean-code` |
| Auditoría de seguridad o rendimiento | `deep-audit` · `/audit` |
| Sincronización de código o creación de Diátaxis/ADR | `doc-writer` |
| Documentación o Comentarios | `clean-documentation` |
| Diagnosticar un error o comportamiento inesperado | `systematic-debugging` · `/debug` |
| Documentar una corrección de error compleja | `bug-logger` |
| Trabajar con diagramas de arquitectura | `excalidraw` |
| Mapeo de código o navegación por la arquitectura | `graphify` |
| Ejecutar comandos en la terminal | `clean-terminal` |
| Refinar specs de historias de usuario y validar asunciones | `spec-refiner` · `/spec` |
| Finalizar una tarea o modificación (Sugerencia de commit) | `git-handshake` · `/commit` |

## Project Overview
SeedCoin is a personal financial management platform for secure and efficient offline-first tracking.

### Architecture Components
| Component | Location | Tech Stack |
|-----------|----------|------------|
| Mobile App | `mobile/` | React Native, Expo SDK 54, NativeWind, SQLite |
| Documentation | `documentacion/` | Markdown, User Guides, Diagrams |
| AI Protocols | `.agents/` | Agent Skills, Knowledge Base, Metadata |

### Directory Structure
```text
seedCoin/
├── .agents/           # AI Agent protocols, skills (categorized), and knowledge base
│   ├── scripts/       # Scripts de validación automática (check.ps1, verify.ps1)
│   ├── skills/        # Categorized Skills (core/, engineering/, tools/, legacy/)
│   └── workflows/     # Slash command workflows (/debug, /audit, /feature, /spec, /commit, /graphify)
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
- **Build Verification**: Run `verify-build` skill after changes.
- **Testing**: `npm test` for unit and integration tests.

### Validation Scripts (desde la raíz del repo)
```powershell
# Chequeo rápido — TypeScript + ESLint + Tests (~15 seg)
.agents\scripts\check.ps1

# Verificación completa — todo lo anterior + expo-doctor + calidad (~60 seg)
.agents\scripts\verify.ps1
```

### Workflows Disponibles
| Slash Command | Propósito |
|---|---|
| `/graphify` | Mapear arquitectura del proyecto |
| `/debug` | Debugging sistemático con protocolo de hipótesis |
| `/audit` | Auditoría completa de código + reporte |
| `/feature` | Flujo SDD completo para nueva funcionalidad |
| `/spec` | Refinamiento de spec con preguntas progresivas |
| `/commit` | Protocolo de commit con verificación previa |

## Design System Standards
SeedCoin uses a **Dark-First** design system powered by **NativeWind v4**.
- **Official Margin**: Use `standard-screen-px` for all screen containers.
- **Typography Aliases**: Use `text-h1`, `text-h2`, `text-body-lg`, `text-body-sm`, `text-caption` instead of raw font classes.
- **Color Palette**: Stick to `bg-dark-900` (background), `bg-dark-800` (cards), and `seed-xxx` (accent).

## Commit & Pull Request Guidelines
Follow conventional-commit style: `<type>[scope]: <description>`

**Types:** `feat`, `fix`, `docs`, `chore`, `perf`, `refactor`, `test`, `style`
**Scopes:** `mobile`, `backend`, `db`, `skills`, `docs`, `ci`

**Critical Rules**:
- ALWAYS keep the first line under 72 characters. No implementation details in title.
- NEVER use specific counts (e.g., "6 files").
- PROACTIVE HANDSHAKE: ALWAYS suggest a git commit proactively after finishing any implementation, refactor, or task. Use the `git-handshake` skill.
- ALWAYS present a proposed commit message to the user BEFORE committing. Wait for confirmation.

### Before creating a PR:
1. Ensure all tests pass (`clean-code`).
2. Run `verify-build` to check TypeScript integrity.
3. Update relevant documentation in `documentacion/` if feature changes.
4. Ensure code follows "Financial Integrity" rules (see Constitutional Principles).
5. Link screenshots/recordings for UI changes.

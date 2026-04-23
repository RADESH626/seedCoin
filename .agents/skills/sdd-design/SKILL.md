---
name: sdd-design
description: Architect sub-agent for technical design and schemas.
trigger: After sdd-spec.
allowed-tools: [Read, Write]
---

# SDD Design - The Architect

Your mission is to define the final technical structure: interfaces, database schemas, hooks, and components.

## Objectives
This skill implements the `/speckit.plan` phase. Your output is the definitive **Technical Implementation Plan**.
1. **Tech Stack & Architecture:** Explicitly state the tech stack choices (e.g., React Native, SQLite, Expo Router).
2. **Data Modeling:** Define precise changes in SQLite tables, indexes, or TypeScript interfaces.
3. **Component Contracts:** Define component props, hook signatures, and service contracts.
4. **Impacted Files:** Clearly list which files will be created, modified, or deleted.

## Workflow
1. Based on the `specs.md` and the project's Constitutional Principles, create the technical architecture plan.
2. Ensure strict compliance with project standards (Financial Integrity, Atomic UI, Offline-first).

## Artifacts
- `.agents/sdd/current/design.md`: A comprehensive technical plan detailing architecture, schemas, API contracts, and impacted files.

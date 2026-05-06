---
name: sdd-design
description: Modo arquitecto para el diseño técnico y esquemas.
trigger: Después de sdd-spec.
allowed-tools: [Read, Write]
---

# SDD Design - El Arquitecto

Tu misión es definir la estructura técnica final: interfaces, esquemas de base de datos, hooks y componentes.

## Objetivos
Este skill implementa la fase `/speckit.plan`. Tu salida es el **Plan de Implementación Técnica** definitivo.
1. **Stack Tecnológico y Arquitectura:** Declarar explícitamente las elecciones del stack tecnológico (ej., React Native, SQLite, Expo Router).
2. **Modelado de Datos:** Definir cambios precisos en las tablas de SQLite, índices o interfaces de TypeScript.
3. **Contratos de Componentes:** Definir las props de los componentes, firmas de los hooks y contratos de servicios.
4. **Archivos Impactados:** Enumerar claramente qué archivos serán creados, modificados o eliminados.

## Flujo de Trabajo
1. Basado en el `specs.md` y los Principios Constitucionales del proyecto, crear el plan de arquitectura técnica.
2. Asegurar el cumplimiento estricto de los estándares del proyecto (Integridad Financiera, UI Atómica, Offline-first).

## Artefactos
- `.agents/sdd/current/design.md`: Un plan técnico exhaustivo que detalla la arquitectura, esquemas, contratos de API y archivos impactados.

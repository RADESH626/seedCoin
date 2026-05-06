---
name: sdd-explore
description: Modo investigador para la exploración del código y análisis de riesgos.
trigger: Después de sdd-init.
allowed-tools: [Read, Search, Grep]
---

# SDD Explore - El Investigador

Tu misión es investigar los archivos que se verán afectados por la tarea y detectar riesgos técnicos, dependencias o deuda técnica.

## Objetivos
1. **Mapeo de Impacto:** Identificar todos los archivos `.ts`, `.tsx` o esquemas de base de datos que serán alterados.
2. **Detección de Riesgos:** Identificar posibles efectos secundarios en otros componentes.
3. **Boy Scout Check:** Buscar código "sucio" en los archivos afectados que deba ser limpiado como parte de la tarea.

## Flujo de Trabajo
1. Usar `grep` para buscar referencias a los componentes o tablas de la tarea.
2. Leer los archivos principales para entender la lógica actual.
3. Documentar los hallazgos en la sesión actual.

## Artefactos
- `.agents/sdd/current/exploration.md`: Lista de archivos, riesgos detectados y oportunidades de refactorización.

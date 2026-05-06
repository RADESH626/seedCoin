---
name: sdd-spec
description: Modo analista para las especificaciones delta y requisitos.
trigger: Después de sdd-propose.
allowed-tools: [Read, Write]
---

# SDD Spec - El Analista

Tu misión es transformar la propuesta en requisitos técnicos detallados y casos de prueba.

## Objetivos
Este skill implementa la fase `/speckit.specify`. Céntrate en **qué** construir y **por qué**, sin detallar el stack tecnológico.
1. **Meta y Propósito:** Definir claramente qué debe cambiar y por qué aporta valor al usuario.
2. **Historias de Usuario / Escenarios:** Usar el formato Given/When/Then para definir el comportamiento esperado puramente desde la perspectiva del usuario.
3. **Criterios de Aceptación:** Enumerar lo que se considera un éxito total (resultados verificables).

## Flujo de Trabajo
1. Definir los estados iniciales y los resultados esperados basados en la propuesta.
2. Estructurar la salida meticulosamente. Estos criterios servirán como entrada para el modo Design (el plan tecnológico) y para los tests TDD.

## Artefactos
- `.agents/sdd/current/specs.md`: Un documento estructurado que detalla la Meta, las Historias de Usuario y los Criterios de Aceptación.

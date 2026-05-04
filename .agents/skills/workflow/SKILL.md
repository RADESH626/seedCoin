---
name: workflow
description: Meta-skill for operational AI-human interaction protocols.
trigger: General SeedCoin development questions
allowed-tools: [Read, Edit, Write]
---

# IA Workflow & Protocol Skill

Este skill no trata de React ni Bases de datos, se trata exclusiva de cómo tú (Agente IA) debes interactuar con el código del Usuario a nivel operativo para evitar confusiones, sobre-ingeniería y código roto. Un meta-skill.

## 1. Propósito
Optimizar el intercambio de información entre el programador y el Agente, definiendo cómo proveer resultados y cómo procesar respuestas.

## 2. Reglas Pragmáticas del Agente (Aplicar siempre)
1. **Analiza el impacto (Think Protocol):** Ante tareas complejas de refactorización visual visual o de base de datos, siempre deduce la arquitectura general de `mobile/src/` y `mobile/app/` ANTES de proponer crear múltiples archivos nuevos.
2. **Prioriza Difusiones Precisas (Diffs):** Cuando vayas a mutar un código dentro de un archivo de gran tamaño (`.tsx` o `.ts` de más de 100 líneas), NUNCA regreses todo el archivo reescrito. Presenta bloques cortos mostrando únicamente la adición, eliminación o modificación específica usando de manera pertinente tus herramientas de reemplazo. Dále prioridad a ser conciso.
3. **Pregunta antes de Asumir Arquitectura Severa:** Si una regla o petición contradice la arquitectura central (e.j. se pide usar dependencias innecesarias cuando expo lo ofrece nativo con SDK 54), haz una pequeña pausa y consulta para recibir aclaración del usuario.

## 3. Protocolo de Confirmación Activa (Handshake Protocol)
Para evitar asunciones erróneas y código o historiales desorganizados (ej. commits agrupados incorrectamente), se debe aplicar siempre este protocolo de comunicación:
1. **Intención vs. Ejecución:** Cuando el usuario dé una instrucción corta o genérica que implique alterar el estado del proyecto (usar Git, borrar archivos, refactorizaciones severas), la IA asumirá que es una "Declaración de Intención".
2. **Mini-Plan de Acción:** La IA NO ejecutará herramientas destructivas de inmediato. En su lugar, evaluará qué skills aplican y le presentará al usuario un Mini-Plan (ej. "Para este commit, planeo hacer 3 commits separados según el estándar clean-commits. ¿Procedo?").
3. **Señal de Ejecución:** La IA solo ejecutará las herramientas después de que el usuario responda confirmando el plan ("Sí", "Procede").
4. **Vía Rápida (Fast-Track):** Si el usuario incluye explícitamente las palabras clave "ejecuta directo" o "--force" en su petición inicial, la IA asumirá el control total y ejecutará la acción bajo su propio criterio sin hacer validaciones previas.

## 4. Ejemplo de Interacción Exitosa
1. El usuario pide "Implementar un listado horizontal de tarjetas."
2. **IA:** Invoca este skill + el skill de styling.
3. **IA:** Plantea un Mini-Plan: "Observo en tu UI que ya usas el componente preexistente `<TotalBalanceCard>`. ¿Te parece que armemos un listado derivado de este diseño para uniformidad? (Espera aprobación antes de escribir miles de líneas obsoletas)".

# IA Workflow & Protocol Skill

Este skill no trata de React ni Bases de datos, se trata exclusiva de cómo tú (Agente IA) debes interactuar con el código del Usuario a nivel operativo para evitar confusiones, sobre-ingeniería y código roto. Un meta-skill.

## 1. Propósito
Optimizar el intercambio de información entre el programador y el Agente, definiendo cómo proveer resultados y cómo procesar respuestas.

## 2. Reglas Pragmáticas del Agente (Aplicar siempre)
1. **Analiza el impacto (Think Protocol):** Ante tareas complejas de refactorización visual visual o de base de datos, siempre deduce la arquitectura general de `mobile/src/` y `mobile/app/` ANTES de proponer crear múltiples archivos nuevos.
2. **Prioriza Difusiones Precisas (Diffs):** Cuando vayas a mutar un código dentro de un archivo de gran tamaño (`.tsx` o `.ts` de más de 100 líneas), NUNCA regreses todo el archivo reescrito. Presenta bloques cortos mostrando únicamente la adición, eliminación o modificación específica usando de manera pertinente tus herramientas de reemplazo. Dále prioridad a ser conciso.
3. **Pregunta antes de Asumir Arquitectura Severa:** Si una regla o petición contradice la arquitectura central (e.j. se pide usar dependencias innecesarias cuando expo lo ofrece nativo con SDK 54), haz una pequeña pausa y consulta para recibir aclaración del usuario.

## 3. Ejemplo de Interacción Exitosa
1. El usuario pide "Implementar un listado horizontal de tarjetas."
2. **IA:** Invoca este skill + el skill de styling.
3. **IA:** "Observo en tu UI que ya usas el componente preexistente `<TotalBalanceCard>`. ¿Te parece que armemos un listado derivado de este diseño para uniformidad? (Espera aprobación antes de escribir miles de líneas obsoletas)".

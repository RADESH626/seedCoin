---
name: spec-refiner
description: >
  Interactive protocol for refining user stories into technical specifications through assumption validation and progressive questioning.
  Trigger: When the user asks to define a spec from a user story, or wants to refine a specification by validating assumptions.
metadata:
  author: seedcoin
  version: "1.0"
  scope: [root]
  auto_invoke: "Refining user story specifications and validating assumptions"
---

# Spec Refiner Protocol

## When to Use

- When the user provides a user story and asks to define a specification.
- When you need to extract and validate non-technical/functional assumptions from a high-level requirement.
- When triggered by the prompt: "Vamos a definir una spec..."

## Critical Patterns (The Workflow)

When this protocol is invoked, you MUST strictly follow this interactive workflow step-by-step. Do not skip steps.

### Step 1: Initial Assumption Extraction
1. Receive the user story from the user.
2. Analyze the story and fill in the blanks mentally or explicitly.
3. Present to the user a **numbered list** of all the non-technical and non-functional assumptions you made to complete the user story.
4. Stop and wait for the user to provide the numbers of the assumptions they did not like.

### Step 2: Progressive Questioning
Once the user provides the list of rejected assumption numbers, you must ask questions **one by one**. For each rejected assumption:

1. **Progress Bar**: Show a progress indicator indicating the current question and the total number of questions (e.g., `[Progreso: Pregunta 1 de 3]`).
2. **The Question**: Ask the user to clarify or define the new direction for that specific assumption.
3. **Options**: You MUST provide exactly 5 options for the user to choose from:
   - Option 1: [A new proposed assumption]
   - Option 2: [A different proposed assumption]
   - Option 3: [A third proposed assumption]
   - Option 4: [A fourth proposed assumption]
   - Option 5: "Otra" (Other) - allowing the user to specify their own answer.
4. Stop and wait for the user's response to this specific question before moving to the next one.

### Step 3: Completion
After all the rejected assumptions have been addressed one by one:
1. Conclude the process by stating EXACTLY: "Ya me encuentro listo para crear la especificación." (I am now ready to create the specification).
2. Wait for the user's prompt to proceed with generating the final specification.

## Examples

### Initial Output Example
```markdown
He analizado la historia de usuario. Aquí están las asunciones no técnicas/funcionales que he realizado:

1. El usuario debe verificar su correo antes de poder acceder al panel.
2. El límite de transacciones diarias será de 5.
3. El color principal del botón de guardado será el acento definido en el tema oscuro.

Dime los números de las asunciones que no te gustan.
```

### Question Output Example
```markdown
[Progreso: Pregunta 1 de 2]

Para la asunción rechazada #1 (Verificación de correo): ¿Cómo prefieres que se maneje el acceso inicial?

1. Acceso inmediato, pero se restringen las transferencias hasta verificar el correo.
2. Acceso inmediato sin restricciones durante 7 días, luego se bloquea.
3. Verificación obligatoria mediante SMS en lugar de correo.
4. Acceso de solo lectura hasta que se complete la verificación del correo.
5. Otra (por favor especifica).
```

## Resources

- **Project Specs**: `documentacion/`
- **Agent Config**: `AGENTS.md`

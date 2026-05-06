---
name: spec-refiner
description: >
  Protocolo interactivo para refinar historias de usuario en especificaciones técnicas mediante la validación de asunciones y preguntas progresivas.
  Trigger: Cuando el usuario pide definir una spec de una historia de usuario, o quiere refinar una especificación validando asunciones.
metadata:
  author: seedcoin
  version: "1.0"
  scope: [root]
  auto_invoke: "Refinamiento de especificaciones de historias de usuario y validación de asunciones"
---

# Protocolo Spec Refiner

## Cuándo usarlo

- Cuando el usuario proporciona una historia de usuario y pide definir una especificación.
- Cuando necesitas extraer y validar asunciones no técnicas/funcionales de un requisito de alto nivel.
- Cuando se activa con el comando: "Vamos a definir una spec..."

## Patrones Críticos (El Flujo de Trabajo)

Cuando se invoca este protocolo, DEBES seguir estrictamente este flujo interactivo paso a paso. No te saltes pasos.

### Paso 1: Extracción Inicial de Asunciones
1. Recibir la historia de usuario.
2. Analizar la historia y completar los espacios en blanco mental o explícitamente.
3. Presentar al usuario una **lista numerada** de todas las asunciones no técnicas y no funcionales que realizaste para completar la historia de usuario.
4. Detenerse y esperar a que el usuario indique los números de las asunciones que no le gustaron.

### Paso 2: Preguntas Progresivas
Una vez que el usuario proporciona la lista de números de asunciones rechazadas, debes hacer las preguntas **una por una**. Para cada asunción rechazada:

1. **Barra de Progreso:** Mostrar un indicador de progreso indicando la pregunta actual y el número total de preguntas (ej., `[Progreso: Pregunta 1 de 3]`).
2. **La Pregunta:** Pedir al usuario que aclare o defina la nueva dirección para esa asunción específica.
3. **Opciones:** DEBES proporcionar exactamente 5 opciones para que el usuario elija:
   - Opción 1: [Una nueva asunción propuesta]
   - Opción 2: [Una asunción propuesta diferente]
   - Opción 3: [Una tercera asunción propuesta]
   - Opción 4: [Una cuarta asunción propuesta]
   - Opción 5: "Otra" (Permitiendo que el usuario especifique su propia respuesta).
4. Detenerse y esperar la respuesta del usuario a esta pregunta específica antes de pasar a la siguiente.

### Paso 3: Finalización
Después de que todas las asunciones rechazadas hayan sido abordadas una por una:
1. Concluir el proceso diciendo EXACTAMENTE: "Ya me encuentro listo para crear la especificación."
2. Esperar el comando del usuario para proceder con la generación de la especificación final.

## Ejemplos

### Ejemplo de Salida Inicial
```markdown
He analizado la historia de usuario. Aquí están las asunciones no técnicas/funcionales que he realizado:

1. El usuario debe verificar su correo antes de poder acceder al panel.
2. El límite de transacciones diarias será de 5.
3. El color principal del botón de guardado será el acento definido en el tema oscuro.

Dime los números de las asunciones que no te gustan.
```

### Ejemplo de Salida de Pregunta
```markdown
[Progreso: Pregunta 1 de 2]

Para la asunción rechazada #1 (Verificación de correo): ¿Cómo prefieres que se maneje el acceso inicial?

1. Acceso inmediato, pero se restringen las transferencias hasta verificar el correo.
2. Acceso inmediato sin restricciones durante 7 días, luego se bloquea.
3. Verificación obligatoria mediante SMS en lugar de correo.
4. Acceso de solo lectura hasta que se complete la verificación del correo.
5. Otra (por favor especifica).
```

## Recursos

- **Specs del Proyecto:** `documentacion/`
- **Configuración del Agente:** `AGENTS.md`

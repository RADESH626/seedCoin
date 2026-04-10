# Agent Skill Template

Este directorio `.agent/skills/` se utiliza para administrar "Skills" específicas que el IA debe consultar y usar para ejecutar tareas particulares en el repositorio. Un Skill es básicamente un flujo de trabajo documentado.

## ¿Qué es un Skill?
Es un archivo (usualmente llamado `SKILL.md` o con un nombre descriptivo `.md`) que le instruye al Agente IA cómo realizar tareas comunes para un sub-dominio del código.

## Estructura
```md
1. **Propósito**: ¿Para qué sirve esta habilidad?
2. **Ubicación de Archivos Relevantes**: ¿Qué carpetas manejan esta funcionalidad?
3. **Flujo de Trabajo Estándar**: Pasos a seguir.
4. **Reglas del Proyecto**: Puntos cruciales a no obviar (ej. usar `Text` de react-native en lugar de `<p>`).
```

## Ejemplo de Invocación
En tu prompt puedes pedir: "@agent, aplica el skill de frontend_development para arreglar la vista de login".

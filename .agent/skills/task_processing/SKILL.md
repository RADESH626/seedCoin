# Task Processing & Queue Execution Skill

Este skill define el protocolo a seguir para la lectura, planeación y ejecución de las solicitudes de desarrollo contenidas en la bandeja de entrada (el archivo TODO).

## 1. Propósito
Garantizar que el avance del proyecto se lleve de manera metódica, ordenada, detallada y "Una a la Vez", previniendo que la IA intente abarcar docenas de refactorizaciones incompatibles al mismo tiempo.

## 2. Ubicación de Archivos Relevantes
- **Archivo Principal de Pila (Cola):** `tareas/todo.txt`
- **Archivo de Trazabilidad Histórica:** `documentacion/historial de tareas/`

## 3. Reglas del Proyecto (Estrictas)
1. **Ejecución Atomizada (UNA por UNA):** Cuando el usuario diga "revisa el archivo de tareas" o haya más de 1 tarea en `todo.txt`, el Agente IA está OBLIGADO a elegir la primera tarea pendiente, y enfocarse **única y exclusivamente** en solucionar esa. Está penalizado intentar resolver 2 tareas distintas simultáneamente salvo que sean trivialidades idénticas (como crear dos carpetas de documentación).
2. **Validación Inmediata:** Si una tarea involucra programación o arquitectura, no puede ser dada por terminada sin que el Agente pase un test pertinente de compilación o visualización real que garantice la estabilidad.  
3. **Ciclo de Cierre:** Al finalizar cada unidad singular de tarea exitosamente:
    - Se debe marcar la lista final del `todo.txt` con un explícito `[X]`.
    - Si se completó un ciclo entero o algo muy relevante, el Agente debe documentar el cierre en el Historial de Tareas y preguntar al usuario si desea continuar con la siguiente asignación en la cola.

## 4. Flujo de Trabajo Estándar
1. Leer `tareas/todo.txt` localizando el primer guion (`-`) que no contenga un `[X]`.
2. Presentarse al usuario informándole qué tarea ESPECÍFICA se va a abarcar de inmediato.
3. Hacer la tarea individual, validar los resultados (TS).
4. Preguntar explícitamente autorización o retroalimentación sobre seguir con el próximo `item` de la lista.

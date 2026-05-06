---
name: deep-audit
description: >
  Framework sistemático para revisiones y auditorías exhaustivas del proyecto archivo por archivo.
  Trigger: Cuando el usuario solicita una "revisión", "auditoría" o "verificar mejores prácticas".
trigger: Realizando una auditoría profunda de código
allowed-tools: [Read, Glob, Grep, Task]
metadata:
  author: seedcoin
  version: "1.0"
  scope: [mobile, documentation]
  auto_invoke:
    - "Revisar si se aplican las mejores prácticas"
    - "Realizar una auditoría del proyecto"
    - "Verificar la calidad del código en todos los archivos"
---

# Deep Audit Framework

Este skill proporciona un proceso estructurado para auditar la base de código de SeedCoin, asegurando que cada archivo cumpla con los estándares expertos del proyecto.

## 1. Flujo de Trabajo de Auditoría

Al activarse, el Agente debe seguir estos pasos:

### Paso 1: Mapeo e Inventario
- Listar todos los archivos únicos en el alcance solicitado (ignorando `node_modules`, `.expo`, etc.).
- **OBLIGATORIO:** Crear un archivo de seguimiento (ej., `PROYECTO_INVENTARIO.md`) con un checklist de todos los archivos para asegurar una cobertura del 100% y transparencia en el progreso.

### Paso 2: Categorización y Selección de Skills
Asignar una "persona de auditoría" a cada archivo:
- **Base de Datos (`*.ts/sql` en `database/`):** Usar `clean-code` + `database-core`.
- **Componentes de UI (`*.tsx` en `components/`):** Usar `modern-react` + `ui-development`.
- **Lógica de Negocio/Hooks (`*.ts` en `hooks/` o `services/`):** Usar `clean-code` + `strict-typescript`.
- **Configuración (`*.json`, `*.js` en raíz):** Revisar consistencia de versiones y seguridad.

### Paso 3: Revisión Secuencial
Leer cada archivo y contrastarlo con la "Matriz de Mejores Prácticas":
- **Precisión Financiera:** ¿Los montos son `INTEGER`? ¿Se gestionan bien las divisiones en la UI?
- **Modularidad:** ¿El archivo sigue el principio SRP? ¿Los componentes están atomizados?
- **Rendimiento:** Nada de `SELECT *`, re-renders eficientes, uso correcto del compilador de React.
- **Seguridad:** Sin inyección SQL, type guards apropiados, nada de `any`.

### Paso 4: Etiquetado de Hallazgos
Categorizar cada hallazgo:
- 🔴 **CRÍTICO:** Bugs funcionales, riesgos de seguridad o pérdida de precisión financiera.
- 🟡 **MEJORA:** Violaciones de Clean Code, oportunidades de optimización.
- 🟢 **LIMPIO:** Cumple perfectamente con los estándares.

## 2. Estándar de Reporte

Los resultados deben resumirse en un nuevo archivo bajo `documentacion/auditorias/audit_[AAAAMMDD].md`.

Formato del Reporte:
- **Resumen:** Puntuación general y temas principales.
- **Hallazgos Detallados por Archivo:** 
  - `Ruta del Archivo` -> `Calificación` -> `Descripción del Problema` -> `Solución Sugerida`.
- **Conclusión:** Siguientes pasos para la refactorización.

## 3. Matriz de Mejores Prácticas (Referencia Cruzada)

| Fuente de Skill | Punto de Control Principal |
|-----------------|---------------------------|
| `database-core` | Sin `SELECT *`, moneda en INTEGER, índices ESR. |
| `ui-development`| Componentes funcionales, lógica separada en hooks, UI Atómica. |
| `clean-code`    | SRP, máximo 3 argumentos, nombres descriptivos. |
| `typescript`    | Tipos explícitos, sin `any`, diseño basado en interfaces. |

---

## Nota de Uso
Realiza siempre la auditoría de forma **secuencial** y no intentes procesar miles de líneas a la vez. Usa `view_file` pieza por pieza si es necesario.

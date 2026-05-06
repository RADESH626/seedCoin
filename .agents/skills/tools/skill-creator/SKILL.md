---
name: skill-creator
description: >
  Crea nuevos skills para el agente de IA siguiendo los estándares del proyecto.
  Trigger: Cuando el usuario pide crear un nuevo skill, añadir instrucciones para el agente o documentar patrones recurrentes.
trigger: Creación de nuevos skills
allowed-tools: [Read, Edit, Write, Glob]
metadata:
  author: seedcoin
  version: "2.0"
  scope: [root]
  auto_invoke: "Creando un nuevo skill para el agente"
---

# Skill Creator

## Cuándo crear un Skill

Crear un skill cuando:
- Un patrón se usa repetidamente y la IA necesita guía específica.
- Las convenciones del proyecto difieren de las mejores prácticas genéricas.
- Un flujo de trabajo complejo requiere instrucciones paso a paso.
- Un árbol de decisión ayuda a la IA a elegir el enfoque correcto.

**No crear un skill cuando:**
- Ya existe documentación (crear una referencia en su lugar).
- El patrón es trivial o se explica por sí mismo.
- Es una tarea única.

---

## Estructura de Directorios

```
.agents/skills/tools/{nombre-del-skill}/
├── SKILL.md              # Requerido — archivo principal del skill
├── assets/               # Opcional — plantillas, esquemas, ejemplos
│   ├── template.ts
│   └── schema.json
└── references/           # Opcional — enlaces a docs locales
    └── docs.md
```

---

## Plantilla SKILL.md

```markdown
---
name: {nombre-del-skill}
description: >
  {Descripción de una línea}.
  Trigger: {Cuándo la IA debe cargar este skill}.
metadata:
  author: seedcoin
  version: "1.0"
  scope: [root]
  auto_invoke: "{Acción que lo activa}"
---

## Cuándo usarlo

{Puntos clave de cuándo usar este skill}

## Patrones Críticos

{Las reglas más importantes — lo que la IA DEBE saber}

## Ejemplos

{Ejemplos mínimos y enfocados}

## Comandos

```bash
{Comandos comunes}
```

## Recursos

- **Archivos clave:** `mobile/src/...`
- **Documentación:** Ver [references/](references/) para docs locales
```

---

## Convenciones de Nomenclatura

| Tipo | Patrón | Ejemplos |
|------|---------|----------|
| Skill Genérico | `{tecnología}` | `strict-typescript`, `modern-react` |
| Skill de Dominio | `{dominio}-{aspecto}` | `clean-functions`, `clean-tests` |
| Skill de Flujo | `{acción}` | `clean-commits`, `tdd-workflow` |
| Meta Skill | `skill-{acción}` | `skill-creator`, `skill-sync` |

> **Regla:** Nombres en Inglés con kebab-case. Máximo 2-3 palabras. Ejemplo: `clean-code`.

---

## Decisión: assets/ vs references/

```
¿Necesitas plantillas de código?  → assets/
¿Necesitas esquemas JSON?         → assets/
¿Necesitas configs de ejemplo?    → assets/
¿Enlazar a docs existentes?       → references/
¿Enlazar a archivos del proyecto? → references/ (con ruta local)
```

---

## Checklist antes de crear

- [ ] El skill no existe (revisar `.agents/skills/tools/`).
- [ ] El patrón es reutilizable (no es una tarea única).
- [ ] El nombre sigue las convenciones.
- [ ] El Frontmatter tiene `name`, `description`, `metadata`.
- [ ] `metadata.auto_invoke` está definido.
- [ ] Los patrones críticos son claros.
- [ ] Los ejemplos son mínimos y usan el contexto de SeedCoin.
- [ ] Tiene secciones de `## Comandos` y `## Recursos`.
- [ ] Registrado en AGENTS.md → invocar `skill-sync`.

---

## Principios de Diseño

- **Conciso:** Solo incluir lo que la IA no sabe por defecto.
- **Divulgación Progresiva:** Apuntar a docs detallados, no duplicar.
- **Reglas Críticas Primero:** Empezar con patrones SIEMPRE/NUNCA.
- **Ejemplos Mínimos:** Mostrar patrones, no tutoriales.
- **Menos de 300 líneas:** Si excede, dividir en skills separados.

## Actualización de Skills Existentes

Cuando se pida actualizar, modificar o extender un archivo de skill `.md` existente:
1. **Validación de Idioma (CRÍTICO):**
   - La regla del proyecto SeedCoin es: **Español para Humanos e IA (skills, docs, comentarios).**
   - El **Inglés** se reserva para el código fuente.
2. **Preservar Frontmatter:** Mantener intacto el YAML frontmatter. Actualizar la `version` si se realiza un cambio estructural significativo.
3. **Sincronizar tras Actualizar:** Después de actualizar cualquier skill, DEBES invocar el proceso `skill-sync` para asegurar que `AGENTS.md` se mantenga sincronizado.

## Comandos

```bash
# Listar skills existentes
ls .agents/skills/

# Revisar frontmatter de un skill
head -20 .agents/skills/tools/{nombre}/SKILL.md
```

## Recursos

- **Skills existentes:** `.agents/skills/tools/`
- **Configuración del agente:** `AGENTS.md`

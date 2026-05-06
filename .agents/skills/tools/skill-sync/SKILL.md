---
name: skill-sync
description: >
  Sincroniza los metadatos de los skills con la tabla de Auto-invocación en AGENTS.md.
  Trigger: Después de crear o modificar un skill, regenerar tablas de Auto-invocación o verificar que no falten skills en AGENTS.md.
trigger: Regenerar tablas de auto-invocación en AGENTS.md.
allowed-tools: [Read, Edit, Write, Command]
metadata:
  author: seedcoin
  version: "1.0"
  scope: [root]
  auto_invoke:
    - "Después de crear/modificar un skill"
    - "Regenerar la tabla de Auto-invocación de AGENTS.md"
    - "Solucionar por qué falta un skill en AGENTS.md"
---

# Skill Sync

## Propósito

Mantener la sección de **Auto-invoke Skills** en `AGENTS.md` sincronizada con los metadatos de cada skill en `.agents/skills/tools/`. Cuando creas o modificas un skill, debes actualizar AGENTS.md para que el agente lo invoque automáticamente.

---

## Metadatos de Skill Requeridos

Cada skill que deba aparecer en Auto-invocación necesita estos campos en su frontmatter:

```yaml
metadata:
  author: seedcoin
  version: "1.0"
  scope: [root]              # Dónde aplica: root, mobile, backend
  auto_invoke: "Acción X"    # Cuándo se activa
```

`auto_invoke` puede ser un string o una lista:

```yaml
# Opción A: acción única
auto_invoke: "Creando componentes de React"

# Opción B: múltiples acciones
auto_invoke:
  - "Creando componentes de React"
  - "Refactorizando componentes"
```

### Valores de Scope

| Scope | Aplica a | AGENTS.md |
|-------|-----------|-----------|
| `root` | Todo el proyecto | `AGENTS.md` (raíz) |
| `mobile` | Frontend React Native | Aplica a `mobile/` |
| `backend` | Backend Spring Boot | Aplica a `seedCoin/` |

---

## Flujo de Trabajo de Sincronización

Al crear o modificar un skill, sigue estos pasos:

```
1. Verificar frontmatter
   ├── ¿Tiene nombre?
   ├── ¿Tiene descripción con Trigger?
   ├── ¿Tiene metadata.scope?
   └── ¿Tiene metadata.auto_invoke?

2. Leer tabla actual en AGENTS.md
   └── Sección "Auto-invoke Skills"

3. Actualizar tabla
   ├── Añadir fila si el skill es nuevo
   ├── Modificar fila si auto_invoke cambió
   └── Eliminar fila si el skill fue borrado

4. Verificar consistencia
   ├── Cada skill en .agents/skills/tools/ tiene una fila en AGENTS.md
   └── Cada fila en AGENTS.md apunta a un skill existente
```

---

## Formato de Tabla en AGENTS.md

```markdown
| Intención / Acción del Usuario | Skill a Invocar | Ubicación |
| :--- | :--- | :--- |
| {texto de auto_invoke} | **{Nombre Legible}** | `.agents/skills/tools/{name}/SKILL.md` |
```

### Ejemplo

Dado este skill:

```yaml
# .agents/skills/tools/modern-react/SKILL.md
name: modern-react
metadata:
  auto_invoke: "Escribiendo componentes de React/React Native"
```

Genera en AGENTS.md:

```markdown
| Escribiendo componentes de React/React Native | **React Moderno** | `.agents/skills/tools/modern-react/SKILL.md` |
```

---

## Checklist Post-Modificación

- [ ] Frontmatter completo en el skill nuevo/modificado.
- [ ] `metadata.auto_invoke` definido con una acción clara.
- [ ] Tabla de Auto-invocación en AGENTS.md actualizada.
- [ ] Sin skills huérfanos (en AGENTS.md pero sin archivo).
- [ ] Sin skills faltantes (en `.agents/skills/tools/` pero sin fila en AGENTS.md).

## Comandos

```bash
# Listar todos los skills con frontmatter
for d in .agents/skills/tools/*/; do echo "=== $d ==="; head -10 "$d/SKILL.md"; done

# Contar skills registrados en AGENTS.md
grep -c "\.agents/skills/tools/" AGENTS.md
```

## Recursos

- **Skills:** `.agents/skills/tools/`
- **Configuración:** `AGENTS.md`
- **Skill creator:** `.agents/skills/tools/skill-creator/SKILL.md`

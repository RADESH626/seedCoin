# Workflow: /commit

Protocolo proactivo de commit para SeedCoin.
Formaliza el `git-handshake` en un flujo estandarizado.

## Cuándo usarlo

- Al terminar cualquier tarea, bug fix o refactorización.
- Cuando el usuario quiere hacer commit de los cambios actuales.
- Como último paso de `/feature`, `/debug` o `/audit`.

## Protocolo de Ejecución

### Paso 1 — Verificación Previa
Ejecutar el chequeo rápido antes de cualquier commit:

```powershell
.\.agents\scripts\check.ps1
```

> ❌ Si falla algún check → detener y resolver el problema primero.
> ⚠️ Si solo hay warnings → informar al usuario y pedir confirmación para continuar.

### Paso 2 — Revisión de Cambios
```powershell
git -C "d:\Familia\Documents\emanuel\proyectos personales\seedCoin" diff --stat
git -C "d:\Familia\Documents\emanuel\proyectos personales\seedCoin" status
```

El agente lista los archivos modificados de forma clara.

### Paso 3 — Propuesta de Mensaje de Commit
El agente propone un mensaje siguiendo el estándar **Conventional Commits**:

```
<type>[scope]: <descripción corta en español>
```

**Tipos válidos:** `feat`, `fix`, `docs`, `chore`, `perf`, `refactor`, `test`, `style`
**Scopes válidos:** `mobile`, `backend`, `db`, `skills`, `docs`, `ci`

**Reglas críticas:**
- Primera línea: máximo 72 caracteres.
- Sin detalles de implementación en el título.
- NUNCA mencionar conteos específicos de archivos (ej. "6 archivos").

Ejemplo:
```
feat(mobile): agregar selector de frecuencia en presupuestos
```

### Paso 4 — Esperar Confirmación
> ⚠️ **NUNCA hacer el commit sin confirmación explícita del usuario.**

Presentar la propuesta y esperar:
> "¿Apruebas este mensaje de commit? ¿Quieres modificar algo?"

### Paso 5 — Ejecutar Commit
Solo al recibir aprobación:

```powershell
git -C "d:\Familia\Documents\emanuel\proyectos personales\seedCoin" add .
git -C "d:\Familia\Documents\emanuel\proyectos personales\seedCoin" commit -m "<mensaje aprobado>"
```

### Paso 6 — Confirmación Final
Reportar el resultado del commit al usuario con el hash del commit.

## Skills Requeridos

- `git-handshake` (protocolo de commit)
- `verify-build` (validación previa)
- `clean-terminal` (ejecución de comandos)

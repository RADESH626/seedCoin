---
name: clean-terminal
description: >
  Estándares y protocolos para el agente de IA al ejecutar comandos en la terminal.
  Trigger: Antes de ejecutar CUALQUIER comando de consola o terminal.
trigger: Antes de ejecutar comandos
allowed-tools: [Read, Write, Glob, Command]
metadata:
  author: seedcoin
  version: "1.0"
  scope: [root]
  auto_invoke: "Al ejecutar comandos en la terminal"
---

# Protocolo Clean Terminal

## Cuándo usarlo

Este skill es OBLIGATORIO y debe aplicarse ANTES de intentar ejecutar cualquier comando mediante la herramienta `run_command`.

## Patrones Críticos

1. **Herramientas Específicas sobre Comandos Genéricos (Regla de Oro):**
   - NUNCA usar `cat`, `grep`, `ls`, `mkdir`, `echo` o `sed` a través de la terminal.
   - SIEMPRE usar las herramientas específicas del agente: `view_file`, `grep_search`, `list_dir`, `write_to_file`, `replace_file_content`.

2. **Conciencia del SO (Windows/PowerShell):**
   - Asumir que el entorno es **Windows con PowerShell**.
   - NO usar comandos específicos de Unix como `rm`, `cp`, `mv`, `ls`.
   - Preferir scripts de Node.js (vía `npm run ...`) o cmdlets explícitos de PowerShell (ej., `Remove-Item`) cuando la manipulación de archivos en terminal sea estrictamente necesaria.

3. **Verificar Contexto Primero:**
   - NUNCA ejecutar un comando que dependa de una ruta específica sin usar antes `list_dir` o `view_file` para confirmar que la ruta o el archivo existen. No adivines.

4. **Ejecución Paso a Paso (OBLIGATORIO):**
   - **NADA DE ONE-LINERS:** NO usar `&&` o `|` para encadenar comandos.
   - **Compatibilidad PowerShell:** El entorno actual falla con `&&`. Encadenar resulta en un `ParserError`.
   - Ejecuta un comando, espera el resultado/status, verifica el éxito y luego ejecuta el siguiente paso.

5. **Scripts de NPM sobre Comandos Crudos:**
   - Preferir ejecutar los scripts definidos en `package.json` en lugar de construir comandos crudos.
   - Ej., `npm run test` en lugar de `npx jest ...`.

## Ejemplos

**MAL:**
```bash
# El agente intenta leer un archivo
cat mobile/src/App.tsx

# El agente intenta buscar un string
grep -r "Texto" .

# El agente encadena comandos sin verificación
mkdir nueva_carpeta && cd nueva_carpeta && npm init -y
```

**BIEN:**
- El agente usa la herramienta `view_file` para `App.tsx`.
- El agente usa la herramienta `grep_search` para buscar "Texto".
- El agente usa `run_command` para ejecutar `npm run lint` y revisa `command_status`.

## Recursos
- **Contexto del Proyecto:** `AGENTS.md`
- **Skill Relacionado:** `git-handshake`

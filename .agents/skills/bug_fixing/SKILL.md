---
name: bug-fixing
description: Protocol for error resolution and persistent bug fixing.
trigger: Protocol for error resolution and persistent bug fixing
allowed-tools: [Read, Edit, Write, Grep, Command, Web]
---

# Bug Fixing & Error Resolution Skill

Este skill define el protocolo a seguir cuando el IA se enfrenta a un error persistente, fallo de compilación, o comportamiento inesperado reportado por el usuario en SeedCoin.

## 1. Propósito
Garantizar que no se pierda tiempo intentando solucionar bugs comunes "a ciegas", y asegurar que las nuevas soluciones se inmortalicen para referencia futura.

## 2. Ubicación de Archivos Relevantes
- **Registro de Búsqueda:** `documentacion/registro de errores/`

## 3. Reglas del Proyecto (Estrictas)
1. **Consulta Histórica Obligatoria:** ANTES de proponer refactorizaciones extremas a la arquitectura, debes verificar el directorio `documentacion/registro de errores/`. Busca si alguien en el pasado ya documentó la firma o el comportamiento de este error y lee su solución.
2. **Pensamiento Secuencial:** No cambies código al azar esperando que pase el error. Determina la falla raíz vía traza de la consola o herramientas equivalentes (Ej. verificando tipos en `tsc --noEmit`).
3. **Reporte Obligatorio Post-Bugs:** Si logras arreglar un bug complejo, misterioso, o una mala configuración de librerías, ES OBLIGATORIO que crees un registro breve de cómo se solucionó usando la plantilla base.
4. **Categorización Estricta en Carpetas:** Los archivos de soluciones de error NO deben quedar sueltos en el directorio raíz de `registro de errores/`. Debes agruparlos en sub-carpetas nombradas según el origen o tipo tecnológico del error (Ejemplos: `registro de errores/SQLite/`, `registro de errores/Navegacion/`, `registro de errores/UI/`).
5. **Comparativa Visual de Código:** La solución documentada debe anexar obligatoriamente dos bloques de código delimitados (`tsx` o `ts`): el bloque del "Antes" mostrando exactamente qué estaba averiado, y el bloque del "Después" ilustrando el parche aplicado.

## 4. Flujo de Trabajo Estándar
1. Leer el mensaje de error del usuario.
2. Hacer un barrido pasivo de posibles coincidencias en `documentacion/registro de errores/`.
3. Elaborar y ejecutar la corrección en local.
4. Documentar el parche en la subcarpeta correspondiente (ej. `registro de errores/SQLite/`) para la prosperidad del equipo.

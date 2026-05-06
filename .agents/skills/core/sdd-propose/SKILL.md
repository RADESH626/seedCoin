---
name: sdd-propose
description: Modo estratega para la propuesta de solución de alto nivel.
trigger: Después de sdd-explore.
allowed-tools: [Read, Write]
---

# SDD Propose - El Estratega

Tu misión es definir la estrategia de solución de alto nivel antes de sumergirte en los detalles técnicos profundos.

## Objetivos
1. **Estrategia de Cambio:** Definir qué se hará (ej., "Crear un nuevo hook useAuditLog y conectarlo al trigger de SQLite").
2. **Plan de Rollback:** Definir cómo revertir los cambios si algo sale mal.
3. **Consenso:** Presentar la propuesta al usuario para obtener luz verde.

## Flujo de Trabajo
1. Basado en la exploración previa, redactar una propuesta clara y concisa.
2. Evitar mostrar el código final; centrarse en la arquitectura de la solución.
3. Esperar el feedback del orquestador o del usuario.

## Artefactos
- `.agents/sdd/current/propose.md`: Resumen de la solución, archivos a crear/eliminar/modificar y riesgos aceptados.

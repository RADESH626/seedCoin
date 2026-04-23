# Registro Histórico de Errores y Bugs 🐛

Esta carpeta de la documentación está destinada al registro continuo de excepciones críticas, configuraciones fallidas o bugs misteriosos que surgen a lo largo del desarrollo de SeedCoin. 

Documentar el error junto a la solución previene la pérdida de conocimiento técnico y acelera la reestructuración si este evento regresa en el futuro.

***

## 📋 Formato Estandarizado para Reportar Error
Cuando agregues un archivo `.md` a esta carpeta, idealmente trata de seguir esta ficha:

1. **Fecha del incidente:** (Ej: 10/04/2026)
2. **Componente o Capa afectada:** (Ej: `expo-sqlite` / `NativeWind` / `Onboarding`)
3. **Descripción del Bug:** (Mensaje de la terminal o conducta extraña en pantalla)
4. **Causa Raíz:** (Por qué ocurrió, si se sabe)
5. **Solución Implementada:** (Qué comando o re-escritura en código arregló definitivamente el problema, o link al PR de arreglo).

***

> **Nota para el AI Agente:** Antes de proponer arreglos que reestructuren drásticamente código, siempre eres libre de revisar localmente esta carpeta en busca de bugs previos que posean la misma firma de error para reutilizar la misma solución.

# Mapa de Componentes UI

Este diagrama representa la taxonomía y organización de los componentes de React Native dentro de la carpeta `mobile/components/`. SeedCoin sigue un enfoque basado en **UI Atómica y Separación por Dominios**.

[Ver Mapa de Componentes Interactivo](./mapa_componentes.excalidraw)

### Principios de Diseño
1.  **UI Atómica (`/ui`):** Los componentes en esta carpeta son "tontos" (dumb components). No conocen sobre la base de datos ni sobre la lógica del negocio. Solo reciben `props` (título, color, onPress) y se renderizan usando NativeWind.
2.  **Por Dominio (`/dashboard`, `/profile`):** Los componentes de dominio son más "listos". Aunque idealmente reciben datos por props desde la pantalla principal, están construidos específicamente para un contexto, ensamblando varios componentes atómicos para crear bloques complejos (ej. `TotalBalanceCard`).
3.  **Consistencia Visual:** Todos los componentes heredan el sistema de diseño oscuro (Dark-First) configurado en el archivo Tailwind principal.

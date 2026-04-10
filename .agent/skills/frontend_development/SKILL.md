# Frontend Development Skill (React Native & UI)

Este skill define las reglas de oro para cualquier modificación, creación o refactorización de componentes visuales en SeedCoin.

## 1. Propósito
Garantizar la coherencia arquitectónica y consistencia visual en todas las pantallas y componentes de la aplicación móvil (React Native).

## 2. Ubicación de Archivos Relevantes
- **Componentes Reutilizables:** `mobile/components/`
- **Pantallas / Rutas:** `mobile/app/`

## 3. Reglas del Proyecto (Estrictas)
1. **Functional Components:** **NUNCA** utilices componentes de clase (`class Component extends React.Component`). Utiliza exclusivamente Componentes Funcionales de React (elementos que retornen JSX) combinados con Hooks.
2. **Nomenclatura:** 
   - Archivos: `PascalCase` para componentes (`UserProfile.tsx`).
   - Hooks y funciones: `camelCase` (`useUserData`, `fetchData`).
3. **TypeScript:** Tipado fuerte obligatorio interactuando con las interfaces definidas en `mobile/src/database/types.ts`. Prohibir uso de `any`.
4. **Dispositivos Seguros:** Utiliza siempre el contexto seguro. Las pantallas primarias deben estar envueltas en componentes de márgenes seguros para evitar sobrelapamiento con el 'notch' o la barra de sistema (`react-native-safe-area-context`).
5. **Atomización de Interfaces (Modulariad):** Prohibido tener archivos de pantalla (`app/`) con más de 150-200 líneas de código JSX inline. Si un bloque de UI (ej: un formulario complejo, una lista decorada o un selector) posee su propia lógica visual o supera las 30 líneas, debe ser extraído a un componente independiente en `components/`. Esto facilita la lectura, el testing y la reutilización.

## 4. Flujo de Trabajo Estándar
1. Analizar el diseño / mockup requerido.
2. Identificar si existe un componente base (`Button`, `Card`) dentro de `components/` que se pueda reutilizar antes de crear uno desde cero.
3. Asegurar de exportarlo por defecto (`export default`) si será consumido por Expo Router en `app/`, o hacer exportación nombrada (`export function`) si pertenece a `components/`.

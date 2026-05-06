---
name: ui-development
description: >
  Reglas de oro para crear, modificar o refactorizar componentes de React Native, usando React 19 moderno, Expo Router y estilos con NativeWind.
trigger: Creación o estilizado de componentes de UI.
allowed-tools: [Read, Edit, Write]
metadata:
  author: seedcoin
  version: "2.0"
  scope: [root, mobile]
  auto_invoke: "Al crear interfaces, corregir estilos de Frontend o lógica de React"
---

# Desarrollo de UI (React 19 + NativeWind + React Native)

Este skill consolida el Desarrollo Frontend, React Moderno y las reglas de Estilizado para SeedCoin.

## 1. React 19 Moderno
- **Sin Memoización Manual:** El Compilador de React gestiona la optimización. NUNCA usar `useMemo` o `useCallback` manualmente.
- **ref como Prop:** `ref` es una prop normal en React 19. NO usar `forwardRef`.
- **Imports:** Siempre usar imports con nombre (ej., `import { useState }`). NO usar `import React from "react"`.

## 2. Patrones de React Native
- **Solo Componentes Funcionales:** NUNCA usar componentes de clase.
- **FlatList vs ScrollView:** Usar `FlatList` para listas dinámicas. `ScrollView` solo para contenido estático/corto.
- **Botones:** Preferir `Pressable` sobre `TouchableOpacity`.
- **Safe Area:** Las pantallas principales deben estar envueltas en componentes de área segura.

## 3. Arquitectura de Componentes
- **Atomización Semántica de UI (Estricta):** Los archivos de pantalla (`app/`) NO deben ser monolíticos. Extraer bloques semánticos (Identidad, Estadísticas, Menú) a la carpeta `components/`. Los estados vacíos (Empty States) y botones flotantes (FABs) deben ser componentes abstractos. Mantener los archivos de pantalla < 150 líneas.
- **Orden del Archivo de Componente:** Hooks -> Valores derivados -> Handlers -> Early returns -> JSX.
- **Expo Router:** Usar `useRouter`, `useLocalSearchParams` y `Link` para la navegación.

## 4. NativeWind y Estilizado (Dark-First)
- **className sobre StyleSheet:** Usar `className` con utilidades de Tailwind. Evitar `StyleSheet.create`.
- **Alias de Tipografía:** Usar los alias definidos (`text-h1`, `text-h2`, `text-body-lg`, `text-body-sm`, `text-caption`) en lugar de clases de fuente crudas en el JSX.
- **Layout:** Usar `standard-screen-px` para el padding horizontal. Usar `gap-x`/`gap-y` en Flexbox sobre márgenes individuales.
- **Paleta Oficial:** 
  - Fondo: `bg-dark-900`
  - Tarjetas: `bg-dark-800`
  - Bordes: `border-dark-700`
  - Acento: `text-seed-400`, `bg-seed-500`

## Comandos
```bash
# Iniciar servidor de desarrollo
cd mobile && npm start
```

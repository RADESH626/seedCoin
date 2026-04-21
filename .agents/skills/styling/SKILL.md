---
name: styling
description: NativeWind and Tailwind CSS implementation for React Native.
trigger: Working with Tailwind classes
allowed-tools: [Read, Edit, Write]
---

# Styling Protocol Skill (NativeWind / Tailwind)

Este skill domina la manera preferencial de hacer "pintura" e implementación de paletas de software estético y responsivo dentro de React Native.

## 1. Propósito
Prohibir confusiones en la estilización y asegurar el diseño vanguardista bajo las regulaciones de NativeWind.

## 2. Ubicación de Archivos Relevantes
- **Casi todos los componentes (`.tsx`):** `mobile/components/` y `mobile/app/`
- **Configuraciones UI / Color:** `mobile/tailwind.config.js` y `mobile/constants/Colors.ts`

## 3. Reglas del Proyecto (Estrictas)

1. **NativeWind v4 por encima de Stylesheets:** Utiliza la propiedad `className=""` pasando las propiedades utilitarias de Tailwind. Evita `StyleSheet.create({})`.
2. **Jerarquía Tipográfica (Alias):** NUNCA definas estilos de texto complejos en el JSX. Utiliza los siguientes alias definidos en `global.css`:
   - `text-h1`: Títulos principales de pantalla.
   - `text-h2`: Títulos de secciones o encabezados secundarios.
   - `text-body-lg`: Texto de cuerpo destacado o etiquetas grandes.
   - `text-body-sm`: Texto de cuerpo estándar o secundario.
   - `text-caption`: Micro-copy, fechas o estados.
3. **Márgenes y Layout:**
   - Usa `standard-screen-px` para el padding horizontal de las pantallas base (equivale a `px-standard` / 24px).
   - Prefiere `gap-x` en contenedores Flexbox en lugar de márgenes individuales entre hermanos.
4. **Paleta de Colores oficial:**
   - **Fondo:** `bg-dark-900`.
   - **Tarjetas/Contenedores:** `bg-dark-800`.
   - **Bordes/Separadores:** `border-dark-700`.
   - **Acento:** `text-seed-400`, `bg-seed-500`, etc.
5. **Transparencias y Profundidad:** Utiliza el modificador de opacidad de Tailwind (ej. `bg-seed-600/20`) para efectos de glassmorphism y capas sutiles.

## 4. Flujo de Trabajo Estándar

1. Si un componente UI se repite más de 2 veces, extráelo a `components/ui/`.
2. Usa `standard-screen-px` para asegurar que el contenido esté alineado en toda la app.
3. Define la lógica de colores dinámicos (ej. rojo para gastos) usando variables condicionales en el `className`.

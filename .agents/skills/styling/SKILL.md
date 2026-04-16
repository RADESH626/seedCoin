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
1. **NativeWind por encima de Stylesheets:** Evita el uso de `StyleSheet.create({})` a menos que sean animaciones o propágos calculadas dinámicamente extremadamente raras. Utiliza la propiedad `className=""` pasando las propiedades utilitarias de Tailwind.
2. **Paleta de Colores oficial:**
   - La paleta principal oscura va usualmente atada a los prefijos `bg-dark-xxx` (`bg-dark-900` para fondo base, `bg-dark-800` para componentes top-level).
   - El color acento vibrante está envuelto en el prefijo `text-seed-xxx`, `bg-seed-xxx`. (Revisar los tokens definidos).
   - NUNCA inventes clases como `text-blue-500` usa `text-seed-400` u otros mapeados para mantener la cohesión de marca.
3. **Flexbox:** Estructura primordialmente con utilidades de `flex-row`, `justify-center`, `gap-4`. 

## 4. Flujo de Trabajo Estándar
1. Definir la UI con tailwind puro en JSX.
2. Extraer a `Colors.ts` de la carpeta Constants si un objeto estático necesita recibir un fill SVG y no puede leer `className`.

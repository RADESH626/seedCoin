# Bug: Crasheo de Navigation Context desencadenado por NativeWind

1. **Fecha del incidente:** 15 de Abril de 2026
2. **Componente o Capa afectada:** `NativeWind v4` / `expo-router` / `@react-navigation/core`
3. **Descripción del Bug:** Al cargar la pantalla `AddTransactionScreen`, renderizar la grilla de categorías (`CategoryGrid`) provocaba un crasheo bloqueante y cierre de la interfaz con el mensaje: `[Error: Couldn't find a navigation context. Have you wrapped your app with 'NavigationContainer'?]`. Esto ocurría a pesar de que la aplicación sí provee globalmente dicho contenedor de navegación mediante Expo Router (`ExpoRoot`).
4. **Causa Raíz:** Fue un "falso positivo" de navegación que expone un bug conjunto entre NativeWind y React Router. En NativeWind v4, utilizar sufijos de opacidad en sombras (`shadow-seed-600/40`) o ciertas utilidades de transform (`scale-105`) a veces es interpretado parcialmente como código legacy, por lo cual el parser interno dispara `printUpgradeWarning()` para advertir al desarrollador. El sistema de advertencias, para mostrar qué componente falló, hace un `JSON.stringify()` sobre todo el Árbol de Elementos de React. Al escanear recursivamente los props, toca el `NavigationContext` inyectado por Expo, el cual cuenta con una protección ("getter") en React 18+ que, al ser accedido fuera de su contenedor lógico, dispara un Error fatal y crashea todo el sistema.
5. **Solución Implementada:** Se debe garantizar la pureza en la declaración del string de `className` en componentes interceptados por NativeWind. Al retirar los saltos de línea (`\n`) dentro del string template literal, se elude el sistema de advertencias (`printUpgradeWarning`) de NativeWind dándole fin a la reacción en cadena mortífera y solucionando por completo el bug de estado de navegación.

**Antes:**
```tsx
  <View 
    className={`w-14 h-14 rounded-2xl items-center justify-center border-2 mb-2 
      ${isSelected ? 'bg-seed-600 border-seed-400 scale-105 shadow-lg shadow-seed-600/40' : 'bg-dark-800 border-dark-700'}
    `}
  >
```

**Después:**
```tsx
  <View 
    className={`w-14 h-14 rounded-2xl items-center justify-center border-2 mb-2 ${isSelected ? 'bg-seed-600 border-seed-400 scale-105 shadow-lg shadow-seed-600/40' : 'bg-dark-800 border-dark-700'}`}
  >
```

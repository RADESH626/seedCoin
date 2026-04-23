# Arquitectura y Stack Tecnológico

SeedCoin está diseñada bajo una arquitectura **Mobile-First y Offline-First**. Toda la información y lógica de negocio se procesa de manera nativa y local.

- **Frontend / Framework**: `React Native` (v0.81.5) bajo el ecosistema de `Expo` (SDK 54).
- **Lenguaje Principal**: `TypeScript` (v5.9).
- **Enrutamiento y Rutas**: `Expo Router` (v6) que provee navegación estructural basada en sistema de archivos.
- **Interfaz y Reactividad**: `React` (v19) y ganchos nativos.
- **Estilización**: `NativeWind` (v4.2) que permite utilizar las convenciones de Tailwind CSS integradas en React Native.
- **Iconografía**: `Lucide React Native` (v1.7)
- **Base de Datos Local**: `Expo SQLite` (v16). Toda la data persiste únicamente dentro del celular del usuario sin depender de conexiones a la nube o APIs externas.

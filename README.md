# SeedCoin 🌱 - Cultiva tu Libertad Financiera

**SeedCoin** es una aplicación móvil de gestión financiera personal diseñada para ofrecer seguridad, simplicidad y control total sobre tu economía. Construida con una arquitectura de alta fidelidad, SeedCoin permite a los usuarios rastrear ingresos, gastos y salud financiera sin depender de una conexión constante, utilizando una base de datos local robusta.

## ✨ Características Principales

*   **Dashboard de Alta Fidelidad**: Visualización inmediata del balance total y resumen mensual de ingresos/gastos.
*   **Arquitectura Hardened (Cero Tolerancia)**: Sistema de capas estrictamente separadas (UI Orchestrators → Hooks → Services → Database).
*   **Gestión de Cuentas Atómica**: Soporte para múltiples cuentas (Efectivo, Bancos, Ahorros, Crédito) con iconos dinámicos.
*   **Historial Inteligente**: Agrupación automática de movimientos por fechas y filtrado avanzado por tipo de flujo.
*   **Privacidad Total**: Todos tus datos financieros se almacenan localmente en tu dispositivo mediante SQLite.
*   **Onboarding Fluido**: Proceso de configuración inicial para personalizar la experiencia desde el primer segundo.

## 🛠️ Stack Tecnológico (Mobile-First)

*   **Framework**: [Expo SDK 54](https://docs.expo.dev/) (React Native).
*   **Base de Datos**: [Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/) con migraciones atómicas.
*   **Estilos**: [NativeWind v4](https://www.nativewind.dev/) (Tailwind CSS 3.4).
*   **Iconografía**: [Lucide React Native](https://lucide.dev/).
*   **Arquitectura**: Atomic Design System & Domain-Driven Layering.
*   **Tipado**: TypeScript 5.9 (Strict Mode).

## 📂 Estructura del Proyecto (Versión Hardened)

```text
mobile/
├── app/                  # Orquestadores de rutas (Expo Router)
├── components/           # UI Atoms & Complex UI Sections
│   ├── ui/               # Átomos reutilizables (Botones, Headers, Overlays)
│   └── [feature]/        # Componentes específicos por funcionalidad
├── src/
│   ├── services/         # Lógica de negocio y acceso a datos (Single Source of Truth)
│   ├── hooks/            # Puentes de orquestación entre UI y Servicios
│   ├── helpers/          # Utilidades puras (Moneda, Fecha, Base de Datos)
│   └── database/         # Esquemas, triggers y configuración de SQLite
└── constants/            # Tokens de diseño y constantes de dominio
```

## 🚀 Instalación y Ejecución

1.  **Clonar y Acceder**:
    ```bash
    git clone https://github.com/RADESH626/seedCoin.git
    cd seedCoin/mobile
    ```

2.  **Instalar Dependencias**:
    ```bash
    npm install
    ```

3.  **Iniciar Desarrollo**:
    ```bash
    npx expo start
    ```
    *Usa la aplicación Expo Go en tu dispositivo móvil o un emulador de iOS/Android.*

## 🤖 AI-Agent Guidelines (Bilingual Model)

Este proyecto utiliza el estándar **SeedCoin AI-Agent**. Consulta el archivo [AGENTS.md](AGENTS.md) para entender las guías de desarrollo, convenciones de nombres y el uso de habilidades (Skills) automatizadas.

*   **Spanish (Human-First)**: Comentarios, documentación y visión del producto.
*   **English (AI-First)**: Metadata del sistema, nombres de variables (camelCase) y lógica de bajo nivel.

---
Desarrollado con ❤️ para empoderar tu futuro financiero.
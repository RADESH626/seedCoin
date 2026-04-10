# Futura Implementación: Estrategia de Entornos (Dev, Test, Prod)

Este documento preserva la investigación realizada sobre cómo escalar SeedCoin hacia un flujo de despliegue profesional.

## Hallazgos Clave

### 1. La Trilogía de Entornos Sugerida
*   **Development:** Trabajo local con Metro y DB de pruebas.
*   **Preview / Testing:** Versiones internas generadas vía EAS Build.
*   **Production:** Binario final optimizado para tiendas.

### 2. Implementación Técnica Propuesta
*   **EAS Build & `eas.json`:** Manejo de perfiles de compilación.
*   **`app.config.js`:** Migrar hacia configuraciones dinámicas para cambiar el nombre e ID de la app (ej. `com.seedcoin.dev` vs `com.seedcoin`).
*   **Variables de Entorno:** Uso de prefijos `EXPO_PUBLIC_` en archivos `.env`.

## Hoja de Ruta Sugerida
1.  Migración a `app.config.js`.
2.  Configuración de perfiles en `eas.json`.
3.  Instauración de secretos y variables de entorno. 

*(Este documento se mantendrá aquí hasta que se decida iniciar la implementación técnica).* 

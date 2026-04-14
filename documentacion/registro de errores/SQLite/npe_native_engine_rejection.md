# Bug: java.lang.NullPointerException en NativeDatabase (Rechazo del Motor Nativo)

1. **Fecha del incidente:** 14 de Abril de 2026
2. **Componente o Capa afectada:** `expo-sqlite` (Capa Nativa Android / Servicios de Datos)
3. **Descripción del Bug:** 
   La aplicación falla intermitentemente al iniciar, lanzando el siguiente error en la consola:
   `Call to function 'NativeDatabase.execAsync' has been rejected.`
   `→ Caused by: java.lang.NullPointerException: java.lang.NullPointerException`
   
   Este error bloquea la carga del Dashboard, Preferencias y Cuentas, ya que el motor nativo rechaza las promesas de ejecución SQL.

4. **Causa Raíz:** 
   Se trata de una **condición de carrera (race condition)** en el puente nativo de Expo SQLite para Android. 
   Cuando la aplicación arranca, múltiples hooks (`useDashboard`, `useAccounts`, `usePreferences`) disparan llamadas paralelas a sus respectivos servicios. Cada servicio llama a `getDBConnection()`. 
   
   Aunque `openDatabaseAsync` cachea la conexión, el "handle" nativo puede no estar completamente listo o ser invalidado momentáneamente si se reciben ráfagas de comandos (como `PRAGMA foreign_keys = ON`) antes de que la inicialización interna del motor haya concluido. Esto provoca que el puntero al objeto `NativeDatabase` en Java sea `null` al momento de ejecutar el comando.

5. **Solución Implementada:** 
   Se aplicó una estrategia de **Resiliencia y Reducción de Concurrencia**:

   - **Ampliación del Type Guard de Errores Nativos:** En `mobile/src/database/types.ts`, se actualizó `isNativeDatabaseError` para incluir ráfagas de rechazo de `execAsync`, `getAllAsync`, `prepareAsync` y explícitamente el string `NullPointerException`.
   - **Patrón de Reintento (Native Retry Pattern):** Se aumentó la resiliencia en `mobile/src/helpers/database.ts` a **3 reintentos** automáticos con un delay de **500ms**. Esto da tiempo al sistema operativo/motor nativo para estabilizar el handle de la base de datos.
    - **Singleton en Configuración de Conexión (Final):** En `mobile/src/database/connection.ts`, se implementó un **Singleton con Promesa Única**. 
      Ahora, `getDBConnection` no solo usa un flag, sino que almacena la **Promesa de inicialización**. 
      Esto garantiza la serialización estricta: si llegan 10 llamadas paralelas al arrancar, las 10 se quedan esperando a la misma promesa inicial. 
      Solo cuando la apertura (`openDatabaseAsync`) y la configuración (`PRAGMA`) terminan exitosamente, la promesa se resuelve para todos.

> [!NOTE]
> Si el error persiste en entornos de muy baja potencia, se recomienda migrar `getDBConnection` a un esquema de **Singleton con Promesa Única** para forzar la serialización estricta de la apertura de la base de datos.

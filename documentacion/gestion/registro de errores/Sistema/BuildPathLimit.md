# Error: Límite de 260 caracteres en Rutas de Windows (MAX_PATH) 🐛

1. **Fecha del incidente:** 18/04/2026
2. **Componente o Capa afectada:** Sistema de Construcción (Android / CMake / Ninja)
3. **Descripción del Bug:**
   La compilación de Android fallaba con el mensaje: `ninja: error: Stat(...): Filename longer than 260 characters`. Esto ocurría específicamente al compilar los componentes C++ de `react-native-safe-area-context` bajo la Nueva Arquitectura de React Native.
4. **Causa Raíz:**
   Windows impone históricamente un límite de 260 caracteres para las rutas de archivos. La estructura de carpetas de React Native (especialmente en `node_modules`) y la generación de archivos de construcción en `.cxx` excedían este límite.
5. **Soluciones Implementadas:**

### A. Solución a Nivel de Código (Walkaround)
Se redirigieron las carpetas de construcción nativa y cache a rutas más cortas en la raíz del disco para "ganar espacio" en la cadena de caracteres de la ruta.

**Cambio en `mobile/android/app/build.gradle`:**
```gradle
android {
    ...
    externalNativeBuild {
        cmake {
            buildStagingDirectory = file("D:/b/sc/n")
        }
    }
}
```

**Cambio en `mobile/android/local.properties`:**
```ini
android.buildCacheDir=D\:\\b\\sc\\c
```

### B. Solución a Nivel de Sistema (Definitiva)
Se instruyó al usuario para habilitar el soporte de rutas largas en el registro de Windows mediante PowerShell (requiere privilegios de Administrador):
```powershell
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
```
*Nota: Requiere reiniciar el equipo para que surta efecto en todas las herramientas de desarrollo.*

***

## Otros Errores Corregidos durante la Verificación
Durante la fase de limpieza (Boy Scout Rule), se detectaron y corrigieron:
- **TransactionService.ts:** Error de tipado en `transactionDate` que podía ser `undefined` al pasar a SQLite.
- **transactions.test.ts:** Mocks de transacciones desactualizados (faltaban `account_name` y `description`, sobraba `is_active`).
- **BackgroundAtmosphere.tsx:** Atributo `aria-hidden` pasado como string `"true"` en lugar de booleano `{true}`.

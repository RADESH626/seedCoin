# E2E Tests con Maestro

Maestro nos permite probar automatizadamente flujos visuales completos. A diferencia de Jest, usamos YAMLs que funcionan idénticamente en tu propio celular o emulador como si un humano los manipulara.

## Requisitos Previos (Windows)
En Windows necesitas un emulador de Android (de Android Studio) corriendo, y tener Maestro CLI instalado. Si prefieres no instalar cosas, puedes obviar los E2E localmente y conectarlos en GitHub Actions para el futuro.

Si deseas ejecutarlos localmente:
1. `npm install -g @maestro/cli` (O mediante WSl: `curl -Ls "https://get.maestro.mobile.dev" | bash`)
2. Enciende tu Emulador de Android o conecta tu celular por USB (Depuración USB habilitada).

## Ejecución
Debido a que somos un proyecto de Expo y (actualmente) no tenemos compilado un binario de producción (`app.json` no tiene 'package' ni 'bundleIdentifier'), testeamos directamente usando la aplicación **Expo Go**.

Arrancamos el App localmente:
```bash
npm start # Arrancar en el emulador
```

Y luego en otra terminal inyectamos los tests usando la variable de entorno correspondiente a Expo Go:
```bash
# Para correr todos los tests visuales uno por uno:
APP_ID=host.exp.exponent maestro test e2e/
```

### Tips de Maestro
* Escribe la prop `testID="my-id"` en tus componentes React Native e invócalos usando `tapOn: id: "my-id"`.
* Aprovecha el comando comando interactivo construyendo tus YAMLs en vivo: `maestro studio`.

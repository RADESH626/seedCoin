# Posible Implementación: UpdateNameModal

## Problema Detectado
Si un usuario desinstala la aplicación o interrumpe abruptamente el Onboarding inicial, pero gracias al ciclo de vida la base de datos ya fue creada con cuentas (ej. a través del seed o pruebas de migración locales), la condición del sistema actual saltará la ventana de *Onboarding*. 

El resultado es que el usuario logra entrar y usar el Dashboard, pero su preferencia `user_name` permanece vacía (nula).

## Solución Propuesta (UpdateNameModal)
Implementar un componente `<UpdateNameModal />` en el nivel superior de `<DashboardHeader />` o `index.tsx`. 

### Lógica de Validación
1. Al cargar el Dashboard, ejecutar el Custom Hook `getPreference('user_name')`.
2. Si el valor es falsy, encender una variable de estado booleana `isMissingName`.
3. El Modal atiende esta variable y se despliega con el prop `visible={isMissingName}` asumiendo un fondo borroso absolute o modal nativo de React Native.
4. El Modal impide cerrar la vista u oprimir por fuera (interfaz restrictiva). Sólo tiene un `TextInput` y un botón para Guardar.
5. Una vez guardado el `user_name` exitosamente vía `expo-sqlite`, el modal cambia la variable de estado o fuerza un re-render cerrándolo para siempre sin romper la Data guardada que pudiera haber existido. 

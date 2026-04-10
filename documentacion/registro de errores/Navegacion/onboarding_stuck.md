# Bug: Onboarding bloqueado tras crear cuenta

1. **Fecha del incidente:** 10 de Abril de 2026
2. **Componente o Capa afectada:** `expo-router` / `OnboardingScreen`
3. **Descripción del Bug:** El usuario completaba el flujo de nombre y creaba su primera cuenta en el modal `add-account`, pero al cerrarse el modal, la aplicación se quedaba estática en la pantalla de bienvenida ("Perfecto, [Nombre]") en lugar de saltar al Dashboard.
4. **Causa Raíz:** La pantalla `index.tsx` (Dashboard) es la que tiene la lógica de redirección hacia el Onboarding, pero el componente `OnboardingScreen` no tenía una lógica inversa que monitoreara el almacén de datos para detectar cuándo dejar de mostrarse. Como el modal devolvía al usuario al Onboarding, este se quedaba en un bucle visual infinito.
5. **Solución Implementada:** Se integró el hook `useAccounts` dentro de `onboarding.tsx` y se añadió un efecto de respuesta inmediata que, al detectar que la lista de cuentas es mayor a cero, dispara un `router.replace('/(tabs)')`.

**Antes:**
```tsx
// Solo manejaba el nombre, no sabía nada de las cuentas
useFocusEffect(useCallback(() => {
  getPreference('user_name').then(val => {
    setUserName(val);
  });
}, []));
```

**Después:**
```tsx
const { accounts, fetchAccounts } = useAccounts();

useEffect(() => {
  if (accounts.length > 0) {
    router.replace('/(tabs)');
  }
}, [accounts]);

useFocusEffect(useCallback(() => {
  fetchAccounts();
  getPreference('user_name').then(val => {
    setUserName(val);
  });
}, [fetchAccounts]));
```

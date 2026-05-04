# Reporte de Error: Bucle de Redirección en Onboarding y Contraste de Input 🐛

- **Fecha:** 03/05/2026
- **Componente:** OnboardingScreen / Dashboard / useAccountLogic
- **Estado:** ✅ Solucionado

## 📝 Descripción del Problema
Al completar el onboarding (ingresar nombre) y crear la primera cuenta, la aplicación entraba en un bucle infinito entre la pantalla de Onboarding y el Dashboard. Además, el texto del campo de nombre en el onboarding no era visible (color incorrecto) sobre el fondo oscuro.

## 🔍 Causa Raíz
1. **Carrera de Estados (Race Condition)**: `useAccounts` es un hook que genera un estado local. Al crear una cuenta en `useAccountLogic`, el hook redireccionaba al Dashboard basándose en un `accounts.length` obsoleto (0).
2. **Redirección Prematura**: El Dashboard (`useDashboardLogic`) detectaba 0 cuentas porque la carga inicial de SQLite no había terminado, y como no esperaba al estado de carga (`isLoading`), redirigía de vuelta al Onboarding.
3. **Estilo Implícito**: El `FormField` dependía de estilos de NativeWind que no se aplicaban correctamente en el contexto del Onboarding, dejando el texto con el color por defecto (oscuro) sobre fondo oscuro.

## 🛠️ Solución Implementada
1. **Espera de Carga**: Se actualizó `useDashboardLogic` para que `shouldRedirectToOnboarding` dependa de `!isLoading`, incluyendo el estado `isInitialLoad` de las cuentas.
2. **Captura de Estado Pre-Save**: En `useAccountLogic`, se captura si la lista de cuentas estaba vacía *antes* de la operación de guardado para decidir la redirección correctamente.
3. **Feedback Visual**: Se añadió un `LoadingOverlay` en la pantalla de creación para evitar acciones duplicadas y dar feedback al usuario.
4. **Estilo Explícito**: Se añadió `text-white` directamente en el componente de Onboarding.

### Bloque de Código (Antes - useDashboardLogic)
```tsx
const shouldRedirectToOnboarding = !isLoading && accounts.length === 0;
```

### Bloque de Código (Después - useDashboardLogic)
```tsx
const isLoading = isDashboardLoading || isAccountsLoading || isInitialLoad;
const shouldRedirectToOnboarding = !isLoading && accounts.length === 0;
```

## 🧠 Lección Aprendida
Siempre se debe considerar el estado de carga inicial (`isInitialLoad`) antes de realizar redirecciones automáticas basadas en la ausencia de datos. Además, los hooks que manejan estado compartido (como cuentas) deberían idealmente usar una fuente de verdad única o, al menos, asegurar que las lecturas post-escritura esperen a la actualización del servicio.

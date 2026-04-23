# Guía Técnica: Patrón de Botones Seguros (Prevención de Double Tap)

## Problema
En aplicaciones móviles (React Native), es común que un usuario presione un botón de navegación o de acción varias veces rápidamente. Si no se controla, esto puede provocar:
1. Apertura de múltiples instancias de la misma pantalla (duplicidad de stacks).
2. Múltiples registros en la base de datos (p. ej., crear dos cuentas idénticas).
3. Inestabilidad visual y errores de "missing navigation context".

## Solución: El hook `useSingleAction`

Para centralizar la lógica de protección, utilizamos el hook personalizado `useSingleAction`. Este hook asegura que una función solo se ejecute una vez a la vez y añade un tiempo de "enfriamiento" (cooldown) tras el éxito.

### Ubicación
`mobile/src/hooks/useSingleAction.ts`

### Uso Básico

```tsx
import { useSingleAction } from '@/src/hooks/useSingleAction';

export function MiComponente() {
  // Envolvemos la acción de navegación
  const { execute: handlePress, isProcessing } = useSingleAction(() => {
    router.push('/mi-pantalla');
  });

  return (
    <Pressable 
      onPress={handlePress} 
      disabled={isProcessing} // Opcional: Deshabilitar visualmente
    >
      <Text>Ir a pantalla</Text>
    </Pressable>
  );
}
```

### Parámetros
- `action`: La función que queremos ejecutar (paso de parámetros soportado).
- `cooldown` (opcional): Tiempo en milisegundos para bloquear ejecuciones posteriores (Default: `500ms`).

### Ventajas
1. **Tipado Estricto**: Mantiene el tipado de los argumentos de la función原.
2. **Seguridad de Montaje**: No intenta actualizar el estado si el componente se desmonta durante la acción.
3. **Versatilidad**: Funciona tanto para navegación (síncrona/inmediata) como para procesos asíncronos (Firebase, SQLite, API).

## Cuándo usarlo
- **SIEMPRE** en botones que realicen `router.push` o `router.replace`.
- **SIEMPRE** en botones de "Guardar", "Confirmar" o "Eliminar".
- **OPCIONAL** en botones de toggle o cambios cosméticos locales.

## Ejemplo con Parámetros

```tsx
const { execute: handleEdit } = useSingleAction((id: number) => {
  router.push(`/edit?id=${id}`);
});

// Uso
onPress={() => handleEdit(item.id)}
```

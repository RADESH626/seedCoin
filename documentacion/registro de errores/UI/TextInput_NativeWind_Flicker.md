# Bug: TextInput Flicker and Cursor Jump (Android + NativeWind)

## Contexto
**Componente:** `FormField` (UI) / `OnboardingSections`
**Plataforma:** Android (Expo Go / APK)
**Descripción del problema:** 
Al escribir en el campo de texto del Onboarding, el cursor se comportaba de manera errática (se alineaba incorrectamente con el placeholder) y cada vez que se escribía un carácter, el componente sufría un "parpadeo" (flicker) visual en el que se duplicaban letras o el cursor saltaba al inicio de la caja por una fracción de segundo.

## Análisis y Causa Raíz
El problema era una combinación de tres factores técnicos en React Native (Android) interactuando entre sí:

1. **Alineación Dinámica (`textAlign: center`)**: En Android, centrar el texto en un `TextInput` controlado (`value={state}`) con un placeholder activo provoca que el sistema calcule mal el centro matemático del cursor, ubicándolo a menudo al final del placeholder en lugar de en el centro del espacio vacío.
2. **Re-renderizado en Cascada**: El estado `nameInput` estaba en la pantalla principal (`OnboardingScreen`), lo que provocaba que toda la pantalla y sus sub-componentes se redibujaran en cada ciclo de tipeo (`onChangeText`).
3. **Intercepción de NativeWind (`css-interop`)**: Este fue el culpable principal del parpadeo. Al usar clases de Tailwind (`className="..."`) directamente sobre el `TextInput` nativo, la librería NativeWind recalculaba e inyectaba un nuevo objeto de estilos en cada re-renderizado. Alterar el objeto `style` de un `TextInput` nativo en Android durante una composición de texto fuerza un reseteo visual de milisegundos, causando el temido parpadeo.

## Solución Aplicada

Se abordó la solución a nivel arquitectónico y de rendimiento:

1. **Aislamiento de Estado**: Se encapsuló el estado de entrada (`localName`) directamente en `NameSelection`, evitando que toda la pantalla padre se redibuje.
2. **Alineación a la Izquierda (`text-left`)**: Se eliminó el `text-center` en favor de `text-left`, alineando el texto de forma natural al inicio del componente, lo que resuelve el error matemático de cálculo del cursor en Android frente al *placeholder*.
3. **Input Incontrolado (Bypass de NativeWind)**:
   - Se eliminó la propiedad `value` para que la escritura sea gestionada 100% de forma nativa por Android (uncontrolled component).
   - Se eliminó la propiedad `className` del componente `<TextInput>` interno en `FormField.tsx`. Las clases de NativeWind (`flex-1`, `text-white`, `font-medium`, `p-4`) se tradujeron a un objeto `style` estático nativo. Esto blinda a la caja de texto contra la intercepción dinámica de `css-interop`, permitiendo escribir con total fluidez.
   - Se protegió el `FormField` envolviéndolo en `React.memo`.

## Código Antes / Después

### Antes (Causante de Flicker)
```tsx
// En FormField.tsx
<TextInput
  className={`flex-1 text-white font-medium text-base ${hasIcons ? 'py-4' : 'p-4'} ${props.className || ''}`}
  value={props.value}
  onChangeText={props.onChangeText}
/>
```

### Después (Fluidez Nativa)
```tsx
// En FormField.tsx
export const FormField = React.memo(function FormField(props) {
  // ...
  <TextInput
    style={[
      { flex: 1, color: 'white', fontSize: 16, fontWeight: '500' },
      hasIcons ? { paddingVertical: 16 } : { padding: 16 },
      props.style
    ]}
    // Se elimina className para evitar css-interop
    // props.value se omite cuando es llamado para mantenerlo "uncontrolled"
    onChangeText={props.onChangeText}
  />
});
```

## Prevención
Siempre que un `TextInput` sufra de "flicker" en Android usando NativeWind:
1. Extraer los estilos del `TextInput` hacia propiedades estáticas `style={{...}}`.
2. Evitar usar `value` si no es estrictamente necesario, prefiriendo estados no controlados.
3. Evitar `textAlign: center` si se combina con placeholders largos en Android.

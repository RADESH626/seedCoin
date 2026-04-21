# Reporte de Error: Bucle de Parpadeo en Frecuencia Mensual 🐛

- **Fecha:** 18/04/2026
- **Componente:** `AddTransactionScreen` (app/add-transaction.tsx)
- **Estado:** ✅ Solucionado

## 📝 Descripción del Problema
Al intentar seleccionar la opción "No repetir" en una transacción que venía pre-configurada como "Mensual" (viniendo desde la pantalla de Programadas), la interfaz parpadeaba y forzaba el valor de nuevo a "Mensual", impidiendo la deselección.

## 🔍 Causa Raíz
Un conflicto entre el estado inicial y un `useEffect` reactivo. El `useEffect` detectaba que la frecuencia era `null` y, al estar en modo `scheduled`, la seteaba automáticamente a `MONTHLY`. Como el propio `useEffect` dependía de `recurrenceFrequency`, esto creaba un bucle infinito de actualizaciones: `MONTHLY` -> `null` (por el usuario) -> `MONTHLY` (por el efecto).

## 🛠️ Solución Implementada
1. Se movió la lógica de valor por defecto directamente a la inicialización del `useState` utilizando el parámetro `type` de la URL.
2. Se eliminó el bloque condicional del `useEffect` que forzaba el valor, permitiendo que el estado sea `null` si el usuario lo decide.

### Bloque de Código (Antes)
```tsx
const [recurrenceFrequency, setRecurrenceFrequency] = useState<RecurrenceFrequency | null>(null);

useEffect(() => {
  // ...
  if (!isEditing && type === 'scheduled' && recurrenceFrequency === null) {
    setRecurrenceFrequency('MONTHLY');
  }
}, [accounts, selectedAccountId, isEditing, type, recurrenceFrequency]);
```

### Bloque de Código (Después)
```tsx
const [recurrenceFrequency, setRecurrenceFrequency] = useState<RecurrenceFrequency | null>(
  !isEditing && type === 'scheduled' ? 'MONTHLY' : null
);

useEffect(() => {
  if (!isEditing && accounts.length > 0 && selectedAccountId === null) {
    setSelectedAccountId(accounts[0].account_id);
  }
}, [accounts, selectedAccountId, isEditing]);
```

## 🧠 Lección Aprendida
Evitar usar `useEffect` para establecer valores por defecto basados en condiciones que pueden cambiar por acción del usuario. Es preferible inicializar el estado correctamente o usar una referencia para asegurar que la lógica de "valor por defecto" solo se ejecute una vez.

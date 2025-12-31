# Flujo de Gestión de Transacciones (Transactions)

Este documento detalla el proceso para registrar ingresos y gastos desde el Dashboard.

## 1. Crear Transacción (`/dashboard`)

**Objetivo:** Registrar un movimiento financiero que afecta el saldo de una cuenta.

**Componentes del Dashboard:**

| Elemento | Tipo | Etiqueta/Text | Nota |
| :--- | :--- | :--- | :--- |
| **Botón Abrir**| `button` | "Agregar Transacción" | Botón grande o flotante. Abre el modal. |

**Componentes del Modal (TransactionModal):**

| Elemento | Tipo | Etiqueta Exacta | Comportamiento Esperado |
| :--- | :--- | :--- | :--- |
| **Título** | `<h2>` | "Nueva Transacción" | Visible al abrir. |
| **Tipo** | `button` | "Ingreso" / "Gasto" | Toggle para definir la naturaleza. Cambia el color (Verde/Rojo). |
| **Monto** | `input` | Placeholder: "0.00" | Solo números positivos. |
| **Descripción**| `input` | Placeholder: "Ej. Mercado, Salario..." | Texto descriptivo. |
| **Cuenta** | `select` | "Cuenta" (Label visual) | Selecciona la cuenta origen/destino. |
| **Categoría** | `select` | "Categoría" (Label visual)| Opciones dinámicas según Tipo (Ej: "🍔 Alimentación" vs "💰 Salario"). |
| **Botón** | `button` | "Guardar Transacción"| Guarda el movimiento. Actualiza saldo. Cierra modal. |

**Flujo Happy Path (Gasto):**
1. Clic en "Agregar Transacción".
2. Seleccionar Tipo "Gasto" (Por defecto).
3. Ingresar Monto (Ej: 20000).
4. Ingresar Descripción.
5. Seleccionar Categoría (Ej: "Alimentación").
6. Clic en "Guardar Transacción".
7. Aparece en "Últimos Gastos" y el saldo de la cuenta disminuye.

**Flujo Happy Path (Ingreso):**
1. Clic en "Agregar Transacción".
2. Seleccionar Tipo "Ingreso".
3. Ingresar Monto.
4. Seleccionar Categoría (Ej: "Salario").
5. Guardar.
6. El saldo de la cuenta aumenta.

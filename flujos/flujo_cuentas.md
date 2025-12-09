# Flujo de Gestión de Cuentas (Accounts)

Este documento detalla el proceso para crear y gestionar cuentas financieras desde el Dashboard.

## 1. Crear Cuenta (`/dashboard`)

**Objetivo:** Agregar una nueva fuente de dinero (Efectivo, Banco, etc.).

**Componentes del Dashboard:**

| Elemento | Tipo | Etiqueta/Text | Nota |
| :--- | :--- | :--- | :--- |
| **Botón Abrir**| `button` | "Agregar Cuenta" | Ubicado en la tarjeta de "Mis Cuentas". Abre el modal. |

**Componentes del Modal (AccountModal):**

| Elemento | Tipo | Etiqueta Exacta | Comportamiento Esperado |
| :--- | :--- | :--- | :--- |
| **Título** | `<h2>` | "Nueva Cuenta" | Visible al abrir. |
| **Selector Tipo**| `button` | Incluye Icono + Nombre | Ej: "💵 Efectivo", "🏦 Cuenta Bancaria". Se debe seleccionar uno. |
| **Nombre** | `input` | "Nombre de la Cuenta" | Placeholder: "Ej. Ahorros Principal". |
| **Saldo** | `input` | "Saldo Inicial" | Placeholder: "0.00". |
| **Botón** | `button` | "Crear Cuenta" | Guarda la cuenta. Cierra el modal. Muestra Toast de éxito. |

**Flujo:**
1. Clic en "Agregar Cuenta".
2. Seleccionar Tipo (Obligatorio).
3. Ingresar Nombre (Ej: "Billetera").
4. Ingresar Saldo Inicial.
5. Clic en "Crear Cuenta".
6. La nueva cuenta aparece inmediatamente en el Dashboard.

## 2. Validación (Unhappy Path)

- **Campos Vacíos:** Si se intenta crear sin llenar nombre, tipo o saldo, el sistema muestra un Toast de error: "Por favor completa todos los campos".

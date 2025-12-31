# Flujo de Autenticación (Authentication)

Este documento describe el comportamiento esperado y los identificadores exactos de los componentes utilizados en el proceso de registro e inicio de sesión.

## 1. Registro de Usuario (`/registro`)

**Objetivo:** Crear un nuevo usuario en la plataforma.

**Componentes:**

| Elemento | Tipo | Etiqueta Exacta (Label/Text) | Comportamiento Esperado |
| :--- | :--- | :--- | :--- |
| **Encabezado** | `<h1>` | "Crear Cuenta" | Título visible de la página. |
| **Nombre** | `input` | "Nombre" | Campo de texto obligatorio. |
| **Apellido** | `input` | "Apellido" | Campo de texto obligatorio. |
| **Email** | `input` | "Correo Electrónico" | Validación de formato email requerida. |
| **Contraseña** | `input` | "Contraseña" | Campo tipo password. |
| **Confirmación**| `input` | "Confirmar" | Debe coincidir exactamente con Contraseña. Si no, muestra error en Toast. |
| **Botón** | `button` | "Registrarse" | Envía formulario. Muestra "¡Registro exitoso!" y redirige a `/iniciar-sesion`. |

**Flujo:**
1. Usuario ingresa a `/registro`.
2. Completa todos los campos.
3. Clic en "Registrarse".
4. Verificación de éxito (Toast + Redirección).

---

## 2. Inicio de Sesión (`/iniciar-sesion`)

**Objetivo:** Autenticar a un usuario existente.

**Componentes:**

| Elemento | Tipo | Etiqueta Exacta (Label/Text) | Comportamiento Esperado |
| :--- | :--- | :--- | :--- |
| **Encabezado** | `<h1>` | "Iniciar Sesión" | Título visible. |
| **Email** | `input` | "Correo Electrónico" | Campo obligatorio. |
| **Contraseña** | `input` | "Contraseña" | Campo obligatorio. |
| **Botón** | `button` | "Iniciar Sesión" | Envía credenciales. Redirige a `/dashboard`. |

**Flujo:**
1. Usuario ingresa a `/iniciar-sesion`.
2. Completa credenciales.
3. Clic en "Iniciar Sesión".
4. Redirige a `/dashboard`.

# Historia de Usuario: Personalización de Nombre en Onboarding

**Como** usuario
**Quiero** poder asignar un nombre a mi perfil dentro de la app
**Para** personalizar mi experiencia de usuario.

---

### 📋 Reglas de Negocio y Restricciones
1. **Obligatoriedad:** El campo es estrictamente obligatorio para completar el paso del onboarding.
2. **Longitud Máxima:** 20 caracteres (para mantener la consistencia en el diseño de la UI).
3. **Caracteres Permitidos:** Alfanuméricos, espacios y emojis soportados.
4. **Persistencia:** Almacenamiento local (offline-first). No requiere ser único.
5. **Edición Previa:** El nombre puede ser modificado, borrado y reescrito libremente en el campo de texto antes de presionar el botón "Continuar".

---

### ✅ Criterios de Aceptación (BDD)

**Escenario 1: Ingreso y edición exitosa de nombre en onboarding**
* **Dado** que el usuario se encuentra en la pantalla de ingreso de nombre (Onboarding)
* **Cuando** ingresa un nombre válido de hasta 20 caracteres
* **Y** edita o corrige el texto ingresado en caso de error
* **Entonces** el campo de texto debe actualizarse inmediatamente con los cambios
* **Y** el botón de "Continuar" permanece habilitado
* **Y** al presionarlo, el sistema guarda el nombre final localmente y avanza al siguiente paso.

**Escenario 2: Intento de avanzar sin ingresar un nombre**
* **Dado** que el usuario se encuentra en la pantalla de ingreso de nombre
* **Cuando** el campo de texto está vacío (0 caracteres) o si el usuario borra todo el texto que había escrito
* **Entonces** el botón de "Continuar" debe permanecer (o volver a estar) en estado deshabilitado
* **Y** el usuario no puede avanzar al siguiente paso.

**Escenario 3: Restricción de longitud máxima**
* **Dado** que el usuario está escribiendo o editando su nombre
* **Cuando** el texto alcanza el límite de 20 caracteres
* **Entonces** el campo de texto no permite ingresar más caracteres
* **Y** se muestra un indicador visual o retroalimentación informando al usuario sobre este límite.

# Casos de Prueba Manuales - SeedCoin

Este documento contiene una lista de pruebas manuales sugeridas para asegurar la calidad y el correcto funcionamiento de las características principales de SeedCoin antes de cada lanzamiento.

## 1. Gestión de Cuentas

### CP-1.1: Creación de Nueva Cuenta
- **Acción:** Navegar a la sección de cuentas y crear una nueva cuenta (Ej: "Ahorros Banco"). Seleccionar un tipo de cuenta válido y asignar un saldo inicial de $1,000.
- **Resultado Esperado:** La cuenta debe aparecer en la lista de cuentas. El saldo inicial debe reflejarse exactamente como $1,000 y el balance general debe sumar estos $1,000.

### CP-1.2: Visualización Individual
- **Acción:** Ingresar a los detalles de una cuenta específica creada recientemente.
- **Resultado Esperado:** Debe mostrar su nombre, tipo y el saldo disponible sin mezclar información con otras cuentas.

## 2. Registro de Transacciones (Ingresos y Gastos)

### CP-2.1: Registro de Ingreso Exitoso
- **Acción:** Desde el botón rápido, registrar un ingreso de $500, categoría "Salario", asociado a la cuenta "Ahorros Banco", con la fecha actual.
- **Resultado Esperado:** El saldo de "Ahorros Banco" debe subir a $1,500. El ingreso debe aparecer de inmediato en el Historial reciente.

### CP-2.2: Registro de Gasto Exitoso
- **Acción:** Registrar un gasto de $200, categoría "Alimentación", asociado a "Ahorros Banco".
- **Resultado Esperado:** El saldo de la cuenta debe disminuir a $1,300. El gasto debe aparecer en el Historial con un indicador visual claro (generalmente color rojo o un signo negativo).

### CP-2.3: Validación de Fondos Insuficientes
- **Acción:** Intentar registrar un gasto en una cuenta que supera el saldo actual (Ej: Gasto de $2,000 si sólo se tiene $1,300).
- **Resultado Esperado:** La interfaz debe mostrar una advertencia clara (ej: "Fondos insuficientes") y prevenir el registro del gasto (o advertirle al usuario, según la lógica de negocio final).

### CP-2.4: Selector de Fechas (Transacción Pasada)
- **Acción:** Registrar un gasto de $50, seleccionando una fecha de 5 días atrás en el selector de calendario.
- **Resultado Esperado:** La transacción se guarda correctamente. En el Historial, la transacción debe ordenarse cronológicamente junto con los registros de esa fecha antigua, no como la más reciente de hoy.

## 3. Historial (Feed)

### CP-3.1: Visualización y Orden del Feed
- **Acción:** Navegar a la pantalla principal del Historial de transacciones.
- **Resultado Esperado:** Las transacciones más recientes deben aparecer en la parte superior. Cada elemento debe mostrar claramente: Monto, Categoría, Tipo (Ingreso/Gasto) y Fecha.

### CP-3.2: Edición de un Movimiento
- **Acción:** Seleccionar un gasto de $50 registrado previamente. Editar su monto a $100.
- **Resultado Esperado:** El saldo de la cuenta asociada debe recalcularse correctamente (descontando $50 más). El historial debe reflejar de inmediato el nuevo valor de $100.

### CP-3.3: Eliminación de un Movimiento
- **Acción:** Seleccionar una transacción existente y presionar "Eliminar".
- **Resultado Esperado:** La transacción desaparece permanentemente del historial. El saldo de la cuenta asociada revierte el impacto de ese movimiento de forma inmediata.

## 4. Dashboard y Análisis

### CP-4.1: Saldo Consolidado Correcto
- **Acción:** Configurar dos cuentas: "Ahorros" con $1,000 y "Efectivo" con $200. Revisar la pantalla principal del Dashboard.
- **Resultado Esperado:** El componente de "Saldo Total Consolidado" debe sumar con precisión el total de ambas cuentas: $1,200.

### CP-4.2: Resumen Mensual (Ingresos vs Gastos)
- **Acción:** En un mes en curso, tener registrados totales formales de $1,000 ingresados y $300 en gastos.
- **Resultado Esperado:** La sección del mes en curso debe graficar/mostrar las sumas correctas ("Ingresos: $1,000", "Gastos: $300") y presentar el balance sano del mes en $700.

## 5. Pruebas de Frontera y Estabilidad (Edge Cases)

### CP-5.1: Prevención de Datos Nulos (Manejo de Errores)
- **Acción:** Intentar realizar una transacción dejando el campo monto vacío o el selector de cuenta en blanco.
- **Resultado Esperado:** La aplicación no crashea; interrumpe el flujo y resalta con alertas preventivas los campos que son obligatorios antes de permitir guardar en SQLite.

### CP-5.2: Fluidez de Navegación del Router
- **Acción:** Durante las pruebas en Expo Go o la apk instalada, cambiar repetida y rápidamente entre el Dashboard, el Historial, y la pantalla de Agregar Transacción.
- **Resultado Esperado:** La aplicación es capaz de navegar a profundidad con Expo Router sin botar errores nativos de "Navigation context not found", manteniendo el estado persistido por Expo SQLite y visualizando la UI correctamente conformada.

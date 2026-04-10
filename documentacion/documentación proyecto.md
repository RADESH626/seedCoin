# Documentación Proyecto SeedCoin

## Arquitectura y Stack Tecnológico
SeedCoin está diseñada bajo una arquitectura **Mobile-First y Offline-First**. Toda la información y lógica de negocio se procesa de manera nativa y local.

- **Frontend / Framework**: `React Native` (v0.81.5) bajo el ecosistema de `Expo` (SDK 54).
- **Lenguaje Principal**: `TypeScript` (v5.9).
- **Enrutamiento y Rutas**: `Expo Router` (v6) que provee navegación estructural basada en sistema de archivos.
- **Interfaz y Reactividad**: `React` (v19) y ganchos nativos.
- **Estilización**: `NativeWind` (v4.2) que permite utilizar las convenciones de Tailwind CSS integradas en React Native.
- **Iconografía**: `Lucide React Native` (v1.7)
- **Base de Datos Local**: `Expo SQLite` (v16). Toda la data persiste únicamente dentro del celular del usuario sin depender de conexiones a la nube o APIs externas.

# Funcionalidades Clave (MVP): 

## GESTIÓN DE CUENTAS:

- ###  **creación de cuentas :** el usuario debe poder definir donde tiene su dinero 

- ### **categorias:** cuenta bancaria, efectivo, tarjeta

- ### **definición de saldo inicial:** el usuario debe poder establecer el monto inicial de las cuentas que tenga 

- ### **visualización de datos individuales:** el usuario debe poder ver el saldo de cada cuenta que tenga de forma separada

## REGISTRO DE GASTOS E INGRESOS

- ### **registro rápido de gastos :** el usuarios debe poder registrar los gastos de una forma rápida 

- ### **registro rápido de ingresos:** el usuario debe poder registrar los ingresos de una forma rápida

- ### **selector de fechas:** el usuario debe poder agregar los gastos o ingresos de fechas anteriores  de ser necesario

## CATEGORÍAS DE TRANSACCIONES (MVP)

Para mantener la simplicidad del MVP, se manejarán como texto simple (strings) seleccionables desde una lista predefinida:

### **Ingresos:**
* Salario
* Negocio / Ventas
* Regalos
* Otros Ingresos

### **Gastos:**
* Alimentación (Mercado, Restaurantes)
* Vivienda (Arriendo, Hipoteca)
* Transporte (Gasolina, Transporte Público)
* Servicios (Agua, Luz, Internet, Telefonía)
* Entretenimiento y Ocio
* Salud y Cuidado Personal
* Educación
* Pago de Deudas (Utilizado para conectar transacciones con la tabla DEBT)
* Otros Gastos

## HISTORIAL

- ### **feed cronológico:** el usuario debe poder ver una lista de los gastos y ingresos que ha hecho organizada de más reciente a más antigua

- ### **edición de movimiento:** el usuario debe poder editar los gastos o ingresos de el historial que tiene 

- ### **eliminación de movimientos:** el usuario debe poder eliminar los movimientos del historial que tiene 

## DASHBOARD Y ANÁLISIS

- ### **saldo total consolidado:** el usuario debe poder ver el dinero total que tienen sumando el dinero de todas las cuentas

- ### **resumen mensual:** el usuario debe poder ver un resumen de los ingresos totales que tuvo en el mes y los gastos que tuvo en el mes, además de el balance de ambos

## PRESUPUESTOS

* ### **creación de presupuestos**: el usuario debe poder definir límites de gasto para diferentes categorías o períodos siendo estos un porcentaje de los ingresos o gastos mensuales.

* ### **seguimiento de presupuestos**: el usuario debe poder ver el progreso de sus gastos en relación con el límite establecido.

* ### **alertas de presupuesto**: el usuario debe recibir notificaciones cuando se acerque o exceda un límite de presupuesto.

* ### **presupuestos recurrentes**: el usuario debe poder establecer presupuestos que se renueven automáticamente (mensual, semanal, etc.).

## 

## 

## 

## DEUDAS

* ### **Registro de deudas**: El usuario debe poder registrar una deuda incluyendo el monto principal, el acreedor, la tasa de interés (si aplica) y la fecha de vencimiento.

* ### **Registro de pagos**: El usuario debe poder registrar los pagos parciales realizados a la deuda para llevar un seguimiento del monto restante.

* ### **Saldo pendiente**: El sistema debe mostrar el saldo actual y pendiente de cada deuda después de registrar los pagos.

* ### **Recordatorios de pago**: El usuario debe recibir notificaciones de las deudas que están próximas a vencer.

* ### **Visualización consolidada**: El usuario debe poder ver un resumen del monto total de sus deudas y los próximos pagos a realizar.

### 

	

## PALETA DE COLORES PREFERIDA

\#0d1259  
\#172598  
\#101ec3  
\#1f2cf4  
\#192aff  
\#3b5bff  
\#5f87ff  
\#8cb4ff  
\#b7d3ff  
\#d7e7ff  
\#e9f2ff

implementacion con taildwind

\--color-blue-50: \#e9f2ff;  
\--color-blue-100: \#d7e7ff;  
\--color-blue-200: \#b7d3ff;  
\--color-blue-300: \#8cb4ff;  
\--color-blue-400: \#5f87ff;  
\--color-blue-500: \#3b5bff;  
\--color-blue-600: \#192aff;  
\--color-blue-700: \#1f2cf4;  
\--color-blue-800: \#101ec3;  
\--color-blue-900: \#172598;  
\--color-blue-950: \#0d1259;

## 

## 


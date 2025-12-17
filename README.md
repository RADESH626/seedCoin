# SeedCoin 🌱

**SeedCoin** es tu plataforma personal para la gestión financiera segura y eficiente. Diseñada para ayudarte a "cultivar tu libertad financiera", SeedCoin te permite controlar tus ingresos, gastos, programar pagos y visualizar tu salud financiera a través de un dashboard intuitivo.

## 🚀 Características Principales

*   **Dashboard Interactivo**: Resumen financiero con balance total, gráficos de gastos vs. ingresos y transacciones recientes.
*   **Gestión de Cuentas**: Administra múltiples tipos de cuentas (Efectivo, Bancos, Tarjetas) con seguimiento de saldos.
*   **Registro de Transacciones**: Agrega ingresos y gastos con categorías personalizadas.
*   **Transacciones Comunes (Presets)**: Crea plantillas para tus gastos frecuentes y regístralos con un solo clic.
*   **Programación de Pagos**: Automatiza tus gastos e ingresos recurrentes (alquiler, suscripciones, nómina).
*   **Historial Detallado**: Búsqueda avanzada y filtrado de movimientos pasados.
*   **Seguridad**: Autenticación de usuarios segura.

## 🛠️ Tecnologías Utilizadas

### Backend ☕
*   **Lenguaje**: Java 17
*   **Framework**: Spring Boot 3.2.0
*   **Base de Datos**: MySQL
*   **Seguridad**: Spring Security
*   **Herramientas**: Maven, Lombok

### Frontend ⚛️
*   **Framework**: Next.js 16
*   **Lenguaje**: TypeScript
*   **Estilos**: Tailwind CSS 4
*   **Iconos**: Lucide React
*   **Gráficos**: Recharts

## 📋 Pre-requisitos

Antes de comenzar, asegúrate de tener instalado:
*   [Java JDK 17](https://www.oracle.com/java/technologies/downloads/#java17)
*   [Node.js](https://nodejs.org/) (versión LTS recomendada)
*   [MySQL Server](https://dev.mysql.com/downloads/installer/)

## ⚙️ Instalación y Configuración

1.  **Clonar el repositorio**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd seedCoin
    ```

2.  **Configurar Base de Datos**
    *   Crea una base de datos en MySQL llamada `seed_coin` (o el nombre que prefieras).
    *   Abre el archivo `seedCoin/src/main/resources/application.properties` y actualiza las credenciales de tu base de datos si es necesario:
        ```properties
        spring.datasource.url=jdbc:mysql://localhost:3306/seed_coin
        spring.datasource.username=tu_usuario
        spring.datasource.password=tu_contraseña
        ```

3.  **Instalar Dependencias Frontend**
    ```bash
    cd frontend
    npm install
    ```

## ▶️ Ejecución

### Método Rápido (Windows)
Ejecuta el script `run.bat` en la raíz del proyecto. Esto iniciará tanto el backend como el frontend en nuevas ventanas y guardará los logs.

### Método Manual

**1. Backend (Spring Boot)**
```bash
cd seedCoin
./mvnw spring-boot:run
```
El servidor iniciará en `http://localhost:8080`.

**2. Frontend (Next.js)**
En una nueva terminal:
```bash
cd frontend
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`.

## 📚 Documentación Adicional
Para una guía detallada sobre cómo usar la aplicación, consulta el [Manual de Usuario](documentacion/manual_de_usuario.md).

---
Desarrollado con ❤️ por el equipo de SeedCoin.
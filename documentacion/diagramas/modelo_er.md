# Modelo Entidad-Relación (SeedCoin Offline)

```mermaid
erDiagram
    ACCOUNT ||--o{ TRANSACTION : "registra"
    DEBT ||--o{ TRANSACTION : "se paga con"
    CATEGORY ||--o{ TRANSACTION : "clasifica"
    CATEGORY ||--o{ BUDGET : "asigna límite a"
    TRANSACTION ||--o| TRANSACTION : "transferencia_emparejada"

    ACCOUNT {
        int account_id PK
        string name "Ej: Bancolombia, Efectivo"
        string account_type "Cuenta Bancaria, Efectivo, Tarjeta"
        decimal initial_balance
        decimal current_balance
        boolean is_active
    }

    TRANSACTION {
        int transaction_id PK
        int account_id FK
        int debt_id FK "Opcional. NULL si es gasto común"
        int transfer_transaction_id FK "Para emparejar salidas y entradas"
        boolean is_income "true si es ingreso, false si es gasto"
        decimal amount
        int category_id FK "Define si es comida, transporte, etc."
        string description
        datetime transaction_date
        string status "Ej: COMPLETED, PENDING"
        string recurrence_frequency "NULL, Mensual, Semanal, etc."
        boolean is_active
    }


    CATEGORY {
        int category_id PK
        string name "Ej: Transporte, Alimentación"
        boolean is_income "true si es ingreso, false si es gasto"
        string icon "Icono referencial"
        string color "Color hex (#ff0000)"
        boolean is_default "Si es original del sistema o creada por el usuario"
    }

    BUDGET {
        int budget_id PK
        int category_id FK "Categoría a limitar"
        string period "Mensual, Semanal"
        decimal limit_amount "Monto o porcentaje límite"
        boolean alerts_enabled
    }

    DEBT {
        int debt_id PK
        string creditor "Acreedor"
        decimal principal_amount
        decimal interest_rate "Porcentaje (opcional)"
        decimal remaining_amount
        datetime due_date "Fecha de vencimiento"
    }
```

### Notas Arquitectónicas (SQLite Offline)

*   **Transferencias Emparejadas:** Usando `transfer_transaction_id`, una transferencia entre cuentas genera dos registros en `TRANSACTION` (uno de salida en la Cuenta A, y uno de entrada en la Cuenta B) enlazados entre sí. Editar o borrar uno, debe afectar a su contraparte.
*   **Actualización de Saldos (Patrón Libro Mayor):** Para garantizar que `current_balance` (en `ACCOUNT`) y `remaining_amount` (en `DEBT`) nunca se descuadren por un bug en el código de la app, **se utilizarán Triggers de SQLite**. Esto significa que al insertar, editar o borrar una `TRANSACTION`, la base de datos se encargará automáticamente por debajo de sumar o restar el monto a las cuentas y deudas asociadas de manera atómica.

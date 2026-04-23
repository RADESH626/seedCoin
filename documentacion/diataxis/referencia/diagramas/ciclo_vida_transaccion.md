# Ciclo de Vida de una Transacción

Este diagrama de secuencia ilustra cómo interactúa la arquitectura **Offline-First** (React + Hooks + SQLite) al momento de crear una nueva transacción. Muestra el flujo desde que el usuario presiona "Guardar" hasta que los totales de la cuenta se actualizan automáticamente mediante Triggers.

```mermaid
sequenceDiagram
    actor Usuario
    participant UI as add-transaction.tsx
    participant Hook as useTransactionLogic
    participant DB as Expo SQLite
    participant Trigger as SQLite Triggers

    Usuario->>UI: Ingresa monto, cuenta y categoría
    Usuario->>UI: Presiona "Guardar"
    UI->>Hook: handleSaveTransaction(data)
    
    Hook->>Hook: Validar datos y formatear (Big.js)
    
    Hook->>DB: INSERT INTO TRANSACTION (...)
    activate DB
    
    DB->>Trigger: Se activa Trigger AFTER INSERT
    activate Trigger
    note right of Trigger: El motor SQLite actualiza <br> el current_balance de la cuenta atómicamente.
    Trigger-->>DB: ACCOUNT.current_balance actualizado
    deactivate Trigger
    
    DB-->>Hook: Retorna Éxito (ID Transacción)
    deactivate DB
    
    Hook-->>UI: Confirmación de guardado exitoso
    UI->>Usuario: Redirige al Dashboard (/index)
    
    note over UI,Hook: El Dashboard se re-renderiza porque<br>el hook useDashboard detecta cambios en la DB.
```

### Características Clave
1.  **Sin Servidor Externo:** Todo el procesamiento ocurre en milisegundos de forma local.
2.  **Integridad de Datos:** Al utilizar SQLite Triggers para actualizar el balance de la cuenta, se evita el riesgo de que la UI (JavaScript) calcule mal o falle a mitad del proceso, protegiendo así la consistencia contable ("Financial Integrity").
3.  **Reactividad:** Los Custom Hooks escuchan los cambios en la base de datos y notifican a las pantallas correspondientes para que se actualicen al instante sin necesidad de un botón de recarga.

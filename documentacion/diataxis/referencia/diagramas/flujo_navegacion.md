# Flujo de Navegación (User Flow)

Este diagrama representa la estructura de pantallas y la navegación principal de la aplicación SeedCoin, construida sobre **Expo Router v6**.

```mermaid
graph TD
    classDef root fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#fff;
    classDef tab fill:#1e293b,stroke:#10b981,stroke-width:2px,color:#e2e8f0;
    classDef modal fill:#334155,stroke:#8b5cf6,stroke-width:2px,color:#fff;

    Start((Inicio de App)) --> CheckOnboarding{¿Onboarding\nCompletado?}
    
    CheckOnboarding -- No --> Onboarding["/onboarding\n(Configuración Inicial)"]:::root
    Onboarding --> Tabs
    
    CheckOnboarding -- Sí --> Tabs["/(tabs) - Navegación Principal"]:::root

    subgraph "Navegación de Pestañas (Tabs)"
        Tabs --> TabIndex["/index\n(Dashboard/Inicio)"]:::tab
        Tabs --> TabHistory["/history\n(Historial)"]:::tab
        Tabs --> TabLimits["/limits\n(Presupuestos)"]:::tab
        Tabs --> TabProfile["/profile\n(Perfil/Ajustes)"]:::tab
    end

    TabIndex --> AddTrans["/add-transaction\n(Nueva Transacción)"]:::modal
    TabIndex --> ManageAcc["/manage-accounts\n(Cuentas)"]:::modal
    ManageAcc --> AddAcc["/add-account\n(Añadir Cuenta)"]:::modal
    
    TabProfile --> SchedTrans["/scheduled-transactions\n(Transacciones Programadas)"]:::modal
```

### Descripción de Rutas
*   **Pantallas Principales (`/tabs`):** Representan el ciclo diario del usuario (ver resumen, ver historial, revisar límites y ajustes).
*   **Modales/Acciones Directas:** Pantallas como `/add-transaction` o `/add-account` que se sobreponen para completar una tarea específica rápida y devolver al usuario a su flujo anterior.

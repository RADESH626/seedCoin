# Bug: DeleteDatabaseAsync Rechazado (Database currently open)

1. **Fecha del incidente:** 10 de Abril de 2026
2. **Componente o Capa afectada:** `expo-sqlite` (Capa de Persistencia / DashboardHeader)
3. **Descripción del Bug:** Al intentar ejecutar el Soft Reset ejecutando `SQLite.deleteDatabaseAsync(DB_NAME)`, la consola arrojó:
   `[Error: Call to function 'ExpoSQLite.deleteDatabaseAsync' has been rejected. Caused by: Unable to delete database... that is currently open. Close it prior to deletion.]`
4. **Causa Raíz:** Expo SQLite V16 y superiores implementan SQLite con WAL y persistencia estricta. Ya que en el React Lifecycle distintos custom hooks (`useAccounts`, `useDashboard`) tienen "abierta" la conexión subyacente para mostrar los datos en pantalla continuamente, el sistema de ficheros del celular bloquea (lock) la eliminación del archivo `.db`.
5. **Solución Implementada:** Dado que Expo cachea los punteros y los hooks mantienen observadores activos, abrir y cerrar el pool no basta para engañar al File System del OS. La solución definitiva fue abandonar `deleteDatabaseAsync` y optar por un reseteo *Lógico* desde adentro, vaciando el esquema interno con sentencias PRAGMA destructivas sobre `sqlite_master`, lo cual no requiere borrar el archivo físico.

**Antes:**
```tsx
try {
  const db = await SQLite.openDatabaseAsync(DB_NAME);
  await db.closeAsync();
  await SQLite.deleteDatabaseAsync(DB_NAME);
} catch(e) { /* Error de lock */ }
```

**Después:**
```tsx
try {
  // Workaround definitivo: En lugar de borrar el archivo de disco, lo vaciamos internamente.
  const db = await SQLite.openDatabaseAsync(DB_NAME);
  await db.execAsync(`
    PRAGMA writable_schema = 1;
    DELETE FROM sqlite_master;
    PRAGMA user_version = 0;
    PRAGMA writable_schema = 0;
  `);
  Alert.alert("Realizado", "Base de datos reseteada internamente. ¡Por favor recarga la aplicación ahora (tecla 'r')!");
} catch(e) {
  console.error(e);
}
```

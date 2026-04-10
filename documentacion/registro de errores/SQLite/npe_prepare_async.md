# Bug: java.lang.NullPointerException en NativeDatabase.prepareAsync

1. **Fecha del incidente:** 10 de Abril de 2026
2. **Componente o Capa afectada:** `expo-sqlite` (Capa Nativa / Android / DashboardHeader)
3. **Descripción del Bug:** La aplicación lanzaba un `NullPointerException` en el lado nativo de Android al intentar realizar cualquier operación de lectura (`getPreference`) o escritura tras un reseteo de base de datos.
4. **Causa Raíz:** Se intentó un reseteo "sucio" manipulando directamente la tabla sistémica interna de SQLite (`sqlite_master`) mediante `DELETE FROM sqlite_master` con `PRAGMA writable_schema = 1`.  
   Esta operación es destructiva para los punteros de memoria del motor C++/Java de Expo, dejando la conexión nativa huérfana o inconsistente, lo que provoca que al intentar "preparar" una nueva sentencia SQL, el objeto nativo sea nulo.

5. **Solución Implementada:** Se migró hacia un protocolo de reseteo **Seguro y Basado en Esquemas**. En lugar de mutilar el catálogo maestro, se desactivan las llaves foráneas y se eliminan las tablas una a una con `DROP TABLE`, finalizando con el reinicio del `user_version` para disparar el ciclo de migración normal.

**Antes (Sucio/Peligroso):**
```sql
PRAGMA writable_schema = 1;
DELETE FROM sqlite_master;
PRAGMA user_version = 0;
PRAGMA writable_schema = 0;
```

**Después (Seguro/Estándar):**
```sql
PRAGMA foreign_keys = OFF;
DROP TABLE IF EXISTS ACCOUNT;
DROP TABLE IF EXISTS CATEGORY;
-- ... más tablas ...
PRAGMA user_version = 0;
PRAGMA foreign_keys = ON;
```

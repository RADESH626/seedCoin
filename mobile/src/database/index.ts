import { SQLiteDatabase } from 'expo-sqlite';
import { CREATE_TABLES, CREATE_TRIGGERS, CREATE_PREFERENCES_TABLE, CREATE_INDEXES } from './schema';
import { INITIAL_CATEGORIES, SEED_CATEGORIES_QUERY } from './seed';
import { log } from '@/src/services/logger';

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 3;

  const result = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  let currentDbVersion = result?.user_version ?? 0;
  log.info(`migrateDbIfNeeded: Versión actual de la DB: ${currentDbVersion}`);

  if (currentDbVersion >= DATABASE_VERSION) {
    log.info(`migrateDbIfNeeded: Base de datos SQLite cargada y lista (v${currentDbVersion})`);
    return;
  }

  if (currentDbVersion === 0) {
    log.info('migrateDbIfNeeded: Inicializando esquema y tablas SQLite por primera vez...');
    try {
      // Usamos execAsync para crear el esquema base (Tablas, Triggers, Índices)
      await db.execAsync(CREATE_TABLES);
      await db.execAsync(CREATE_TRIGGERS);
      await db.execAsync(CREATE_INDEXES);
      await db.execAsync(CREATE_PREFERENCES_TABLE);
      log.info('migrateDbIfNeeded: Esquema base creado correctamente.');

      // Poblar (seed) las categorías de forma atómica
      let insertedCount = 0;
      const statement = await db.prepareAsync(SEED_CATEGORIES_QUERY);
      try {
        for (const category of INITIAL_CATEGORIES) {
          await statement.executeAsync([
            category.name,
            category.is_income,
            category.icon,
            category.color,
            category.is_default
          ]);
          insertedCount++;
        }
      } finally {
        await statement.finalizeAsync();
      }
      log.info(`migrateDbIfNeeded: Categorías iniciales inyectadas: ${insertedCount} registros.`);

      // Solo después de TODO el éxito inicial, subimos a v2 (v1 + preferences)
      currentDbVersion = 2;
      await db.execAsync(`PRAGMA user_version = ${currentDbVersion}`);
      log.info('migrateDbIfNeeded: Inicialización (v2) completada exitosamente.');
    } catch (err) {
      log.error('migrateDbIfNeeded: Error crítico durante la inicialización de la DB', err);
      throw err; // Re-lanzamos para que la App sepa que no puede continuar
    }
  }

  // MIGRACIÓN A V2
  if (currentDbVersion === 1) {
    log.info('migrateDbIfNeeded: Migrando base de datos de v1 a v2...');
    await db.execAsync(CREATE_PREFERENCES_TABLE);
    currentDbVersion = 2;
    await db.execAsync(`PRAGMA user_version = ${currentDbVersion}`);
    log.info('migrateDbIfNeeded: Migración a v2 (Tabla Preferences) completada.');
  }

  // MIGRACIÓN A V3 (Índices)
  if (currentDbVersion === 2) {
    log.info('migrateDbIfNeeded: Migrando base de datos de v2 a v3 (Índices)...');
    try {
      await db.execAsync(CREATE_INDEXES);
      currentDbVersion = 3;
      await db.execAsync(`PRAGMA user_version = ${currentDbVersion}`);
      log.info('migrateDbIfNeeded: Migración a v3 (Índices) completada exitosamente.');
    } catch (err) {
      log.error('migrateDbIfNeeded: Error en migración v3', err);
    }
  }
}

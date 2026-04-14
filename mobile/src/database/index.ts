import { SQLiteDatabase } from 'expo-sqlite';
import { CREATE_TABLES, CREATE_TRIGGERS, CREATE_PREFERENCES_TABLE } from './schema';
import { INITIAL_CATEGORIES, SEED_CATEGORIES_QUERY } from './seed';
import { log } from '@/src/services/logger';

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 2;

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
      await db.execAsync(CREATE_TABLES);
      log.info('migrateDbIfNeeded: Tablas creadas correctamente.');
      await db.execAsync(CREATE_TRIGGERS);
      log.info('migrateDbIfNeeded: Triggers configurados correctamente.');
    } catch (err) {
      log.error('migrateDbIfNeeded: Error crítico creando esquema base', err);
      throw err;
    }

    log.info('migrateDbIfNeeded: Tablas y Triggers creados. Inyectando categorías iniciales...');

    // Poblar (seed) las categorías la primera vez
    let insertedCount = 0;
    try {
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
      log.info(`migrateDbIfNeeded: Categorías insertadas: ${insertedCount} registros.`);
    } catch (err) {
      log.error('migrateDbIfNeeded: Error insertando categorías iniciales', err);
    }
    
    currentDbVersion = 1;
    await db.execAsync(`PRAGMA user_version = ${currentDbVersion}`);
    log.info('migrateDbIfNeeded: Inicialización completada exitosamente.');
  }

  // MIGRACIÓN A V2
  if (currentDbVersion === 1) {
    log.info('migrateDbIfNeeded: Migrando base de datos de v1 a v2...');
    await db.execAsync(CREATE_PREFERENCES_TABLE);
    currentDbVersion = 2;
    await db.execAsync(`PRAGMA user_version = ${currentDbVersion}`);
    log.info('migrateDbIfNeeded: Migración a v2 (Tabla Preferences) completada.');
  }
}

import { SQLiteDatabase } from 'expo-sqlite';
import { CREATE_TABLES, CREATE_TRIGGERS, CREATE_PREFERENCES_TABLE, CREATE_INDEXES } from './schema';
import { log } from '@/src/shared/services/logger';
import { MIGRATIONS } from './migrations';

/**
 * Versión actual de la base de datos.
 * Debe coincidir con la última llave en el objeto MIGRATIONS.
 */
const DATABASE_VERSION = 11;

/**
 * Orquestador de inicialización y migración de la base de datos.
 */
export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const result = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  let currentDbVersion = result?.user_version ?? 0;
  
  log.info(`migrateDbIfNeeded: Versión actual de la DB: ${currentDbVersion}`);

  // 1. Caso base: Base de datos ya actualizada
  if (currentDbVersion >= DATABASE_VERSION) {
    log.info(`migrateDbIfNeeded: Base de datos SQLite cargada y lista (v${currentDbVersion})`);
    return;
  }

  // 2. Caso inicial: Base de datos nueva
  if (currentDbVersion === 0) {
    log.info('migrateDbIfNeeded: Inicializando esquema por primera vez...');
    try {
      await Promise.all([
        db.execAsync(CREATE_TABLES),
        db.execAsync(CREATE_TRIGGERS),
        db.execAsync(CREATE_INDEXES),
        db.execAsync(CREATE_PREFERENCES_TABLE),
      ]);
      
      // Saltamos directamente a la versión más reciente
      await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
      log.info(`migrateDbIfNeeded: Inicialización (v${DATABASE_VERSION}) completada exitosamente.`);
      return;
    } catch (err) {
      log.error('migrateDbIfNeeded: Error crítico durante la inicialización', err);
      throw err;
    }
  }

  // 3. Caso de migración: Base de datos existente pero antigua
  log.info(`migrateDbIfNeeded: Iniciando secuencia de migración de v${currentDbVersion} a v${DATABASE_VERSION}...`);
  
  try {
    for (let v = currentDbVersion + 1; v <= DATABASE_VERSION; v++) {
      const migration = MIGRATIONS[v];
      if (migration) {
        log.info(`migrateDbIfNeeded: Ejecutando migración a v${v}...`);
        await migration(db);
      }
      
      // Actualizamos la versión en cada paso para asegurar persistencia si falla el siguiente
      await db.execAsync(`PRAGMA user_version = ${v}`);
    }
    log.info('migrateDbIfNeeded: Todas las migraciones se completaron exitosamente.');
  } catch (err) {
    log.error(`migrateDbIfNeeded: Fallo en la migración secuencial`, err);
    throw err;
  }
}

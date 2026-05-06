import { SQLiteDatabase } from 'expo-sqlite';
import { CREATE_TABLES, CREATE_TRIGGERS, CREATE_PREFERENCES_TABLE, CREATE_INDEXES } from './schema';
import { log } from '@/src/shared/services/logger';

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 6;

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

  // MIGRACIÓN A V4 (Triggers de edición)
  if (currentDbVersion === 3) {
    log.info('migrateDbIfNeeded: Migrando base de datos de v3 a v4 (Disparadores de edición)...');
    try {
      await db.execAsync(CREATE_TRIGGERS);
      currentDbVersion = 4;
      await db.execAsync(`PRAGMA user_version = ${currentDbVersion}`);
      log.info('migrateDbIfNeeded: Migración a v4 (Disparadores) completada exitosamente.');
    } catch (err) {
      log.error('migrateDbIfNeeded: Error en migración v4', err);
    }
  }

  // MIGRACIÓN A V5 (Columnas de transacciones programadas)
  if (currentDbVersion === 4) {
    log.info('migrateDbIfNeeded: Migrando base de datos de v4 a v5 (Columnas de programación)...');
    
    // Intentamos añadir cada columna de forma independiente
    try {
      await db.execAsync('ALTER TABLE TRANSACTIONS ADD COLUMN recurrence_frequency TEXT;');
      log.info('migrateDbIfNeeded: Columna recurrence_frequency añadida.');
    } catch (e) {
      log.info('migrateDbIfNeeded: Columna recurrence_frequency ya existía o hubo un error manejado.');
    }

    try {
      await db.execAsync('ALTER TABLE TRANSACTIONS ADD COLUMN is_automatic BOOLEAN NOT NULL DEFAULT 1;');
      log.info('migrateDbIfNeeded: Columna is_automatic añadida.');
    } catch (e) {
      log.info('migrateDbIfNeeded: Columna is_automatic ya existía o hubo un error manejado.');
    }

    currentDbVersion = 5;
    await db.execAsync(`PRAGMA user_version = ${currentDbVersion}`);
    log.info('migrateDbIfNeeded: Migración a v5 completada exitosamente.');
  }

  // MIGRACIÓN A V6 (Fuerza la adición de columnas si v5 falló)
  if (currentDbVersion === 5) {
    log.info('migrateDbIfNeeded: Migrando base de datos de v5 a v6 (Asegurando columnas)...');
    
    try {
      await db.execAsync('ALTER TABLE TRANSACTIONS ADD COLUMN recurrence_frequency TEXT;');
      log.info('migrateDbIfNeeded: Columna recurrence_frequency añadida.');
    } catch (e) {
      log.info('migrateDbIfNeeded: Columna recurrence_frequency ya existía.');
    }

    try {
      await db.execAsync('ALTER TABLE TRANSACTIONS ADD COLUMN is_automatic BOOLEAN NOT NULL DEFAULT 1;');
      log.info('migrateDbIfNeeded: Columna is_automatic añadida.');
    } catch (e) {
      log.info('migrateDbIfNeeded: Columna is_automatic ya existía.');
    }

    currentDbVersion = 6;
    await db.execAsync(`PRAGMA user_version = ${currentDbVersion}`);
    log.info('migrateDbIfNeeded: Migración a v6 completada exitosamente.');
  }
}


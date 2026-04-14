import * as SQLite from 'expo-sqlite';
import { DB_NAME } from './connection';
import { log } from '../services/logger';

/**
 * Elimina todas las tablas y reinicia la versión de la base de datos.
 * Uso: reset total para desarrollo o desde la pantalla de perfil.
 */
export async function resetDatabase(): Promise<void> {
  const db = await SQLite.openDatabaseAsync(DB_NAME);
  await db.execAsync(`
    PRAGMA foreign_keys = OFF;
    DROP TABLE IF EXISTS ACCOUNT;
    DROP TABLE IF EXISTS CATEGORY;
    DROP TABLE IF EXISTS DEBT;
    DROP TABLE IF EXISTS TRANSACTIONS;
    DROP TABLE IF EXISTS BUDGET;
    DROP TABLE IF EXISTS PREFERENCES;
    PRAGMA user_version = 0;
    PRAGMA foreign_keys = ON;
  `);
  log.info('resetDatabase: Base de datos limpiada con éxito.');
}

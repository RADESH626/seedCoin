import * as SQLite from 'expo-sqlite';

// Definimos el nombre maestro de la base de datos de SeedCoin
export const DB_NAME = 'seedcoin.db';

/**
 * Retorna la instancia asíncrona de la base de datos de SQLite.
 * Expo internamente reutiliza (cachea) las conexiones abiertas,
 * por lo que es óptimo llamar a esta función en todos los servicios.
 */
export const getDBConnection = async (): Promise<SQLite.SQLiteDatabase> => {
  const db = await SQLite.openDatabaseAsync(DB_NAME);
  // Habilitar claves foraneas explícitamente para integridad referencial
  await db.execAsync('PRAGMA foreign_keys = ON;');
  return db;
};

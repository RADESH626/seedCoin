import * as SQLite from 'expo-sqlite';

// Definimos el nombre maestro de la base de datos de SeedCoin
export const DB_NAME = 'seedcoin.db';

/**
 * Retorna la instancia asíncrona de la base de datos de SQLite.
 * Expo internamente reutiliza (cachea) las conexiones abiertas,
 * por lo que es óptimo llamar a esta función en todos los servicios.
 */
export const getDBConnection = async (): Promise<SQLite.SQLiteDatabase> => {
  return await SQLite.openDatabaseAsync(DB_NAME);
};

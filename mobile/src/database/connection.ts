import * as SQLite from 'expo-sqlite';
import { migrateDbIfNeeded } from './index';

// Definimos el nombre maestro de la base de datos de SeedCoin
export const DB_NAME = 'seedcoin.db';

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

/**
 * Retorna la instancia asíncrona de la base de datos de SeedCoin.
 * Implementa un Singleton con Promesa Única para asegurar la serialización estricta 
 * de la apertura y configuración inicial (evitando NPE nativos en el arranque).
 */
export const getDBConnection = async (): Promise<SQLite.SQLiteDatabase> => {
  if (dbPromise) return dbPromise;

  dbPromise = (async () => {
    try {
      const db = await SQLite.openDatabaseAsync(DB_NAME);
      // Habilitar claves foraneas exactamente una vez por ciclo de vida de la promesa
      await db.execAsync('PRAGMA foreign_keys = ON;');
      
      // Ejecutar migraciones si es necesario
      await migrateDbIfNeeded(db);
      
      return db;
    } catch (err) {
      // Si la inicialización falla críticamente, limpiamos la promesa para permitir reintentos posteriores
      dbPromise = null;
      console.error('getDBConnection: Error fatal inicializando la base de datos.', err);
      throw err;
    }
  })();

  return dbPromise;
};

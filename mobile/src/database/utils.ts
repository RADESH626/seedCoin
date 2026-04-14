import * as SQLite from 'expo-sqlite';
import { DB_NAME } from './connection';
import { log } from '../services/logger';

/**
 * Elimina todas las tablas de usuario y reinicia la versión de la base de datos.
 * Uso: reset total para desarrollo o desde la pantalla de perfil.
 * Implementación robusta: Busca todas las tablas dinámicamente.
 */
export async function resetDatabase(): Promise<void> {
  const db = await SQLite.openDatabaseAsync(DB_NAME);
  
  try {
    // 1. Obtener lista de todas las tablas excepto las de sistema de SQLite
    const tables = await db.getAllAsync<{ name: string }>(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
    );

    await db.execAsync('PRAGMA foreign_keys = OFF;');
    
    // 2. Ejecutar DROP para cada tabla encontrada
    for (const table of tables) {
      log.info(`resetDatabase: Eliminando tabla ${table.name}...`);
      await db.execAsync(`DROP TABLE IF EXISTS ${table.name}`);
    }

    // 3. Resetear la versión para forzar re-inicialización
    await db.execAsync('PRAGMA user_version = 0;');
    await db.execAsync('PRAGMA foreign_keys = ON;');
    
    log.info('resetDatabase: Base de datos purgada completamente.');
  } catch (error) {
    log.error('resetDatabase: Error durante el purgado total', error);
    throw error;
  }
}

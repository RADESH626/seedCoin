import * as SQLite from 'expo-sqlite';
import { migrateDbIfNeeded } from './index';

/**
 * Creates an isolated SQLite database instance for testing.
 * Triggers full schema initialization and returns the db connection.
 */
export const setupTestDatabase = async (dbName: string = `test_seedcoin_${Date.now()}.db`): Promise<SQLite.SQLiteDatabase> => {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    
    // Configs
    await db.execAsync('PRAGMA foreign_keys = ON;');
    
    // We wipe existing tables if we reuse the same name
    await db.execAsync(`
      DROP TABLE IF EXISTS transactions;
      DROP TABLE IF EXISTS accounts;
      DROP TABLE IF EXISTS categories;
      DROP TABLE IF EXISTS preferences;
    `);
    
    // Re-run the migration to create everything
    await db.execAsync('PRAGMA user_version = 0;');
    await migrateDbIfNeeded(db);
    
    return db;
  } catch (error) {
    console.error('setupTestDatabase: Failed to initialize test DB.', error);
    throw error;
  }
};

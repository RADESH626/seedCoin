import { SQLiteDatabase } from 'expo-sqlite';
import { CREATE_TRIGGERS, CREATE_PREFERENCES_TABLE, CREATE_INDEXES } from './schema';
import { log } from '@/src/shared/services/logger';

/**
 * Mapa de migraciones secuenciales.
 * Cada llave representa la versión a la que se migra DESDE la versión anterior.
 * Ejemplo: la llave '2' contiene la lógica para pasar de v1 a v2.
 */
export const MIGRATIONS: Record<number, (db: SQLiteDatabase) => Promise<void>> = {
  2: async (db) => {
    log.info('Migrando a v2: Tabla Preferences');
    await db.execAsync(CREATE_PREFERENCES_TABLE);
  },
  3: async (db) => {
    log.info('Migrando a v3: Índices');
    await db.execAsync(CREATE_INDEXES);
  },
  4: async (db) => {
    log.info('Migrando a v4: Disparadores de edición');
    await db.execAsync(CREATE_TRIGGERS);
  },
  5: async (db) => {
    log.info('Migrando a v5: Columnas de programación');
    try {
      await db.execAsync('ALTER TABLE TRANSACTIONS ADD COLUMN recurrence_frequency TEXT;');
    } catch (e) { /* ignore */ }
    try {
      await db.execAsync('ALTER TABLE TRANSACTIONS ADD COLUMN is_automatic BOOLEAN NOT NULL DEFAULT 1;');
    } catch (e) { /* ignore */ }
  },
  6: async (db) => {
    log.info('Migrando a v6: Asegurando columnas');
    try {
      await db.execAsync('ALTER TABLE TRANSACTIONS ADD COLUMN recurrence_frequency TEXT;');
    } catch (e) { /* ignore */ }
    try {
      await db.execAsync('ALTER TABLE TRANSACTIONS ADD COLUMN is_automatic BOOLEAN NOT NULL DEFAULT 1;');
    } catch (e) { /* ignore */ }
  },
  7: async (db) => {
    log.info('Migrando a v7: Tabla BUDGET');
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS BUDGET (
          budget_id INTEGER PRIMARY KEY AUTOINCREMENT,
          category_id TEXT NOT NULL,
          period TEXT NOT NULL,
          limit_amount INTEGER NOT NULL,
          alerts_enabled BOOLEAN NOT NULL DEFAULT 1
      );
    `);
  },
  8: async (db) => {
    log.info('Migrando a v8: Yield en ACCOUNT');
    await db.execAsync('ALTER TABLE ACCOUNT ADD COLUMN yield_rate REAL DEFAULT 0;');
    await db.execAsync('ALTER TABLE ACCOUNT ADD COLUMN payment_day INTEGER DEFAULT 1;');
  },
  9: async (db) => {
    log.info('Migrando a v9: Saneamiento de TRANSACTIONS');
    await db.withTransactionAsync(async () => {
      await db.execAsync(`
        CREATE TABLE TRANSACTIONS_NEW (
          transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
          account_id INTEGER NOT NULL,
          debt_id INTEGER,
          transfer_transaction_id INTEGER,
          is_income BOOLEAN NOT NULL,
          amount INTEGER NOT NULL,
          category_id TEXT NOT NULL,
          description TEXT,
          transaction_date TEXT NOT NULL,
          status TEXT NOT NULL,
          recurrence_frequency TEXT,
          is_automatic BOOLEAN NOT NULL DEFAULT 1,
          is_active BOOLEAN NOT NULL DEFAULT 1,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (account_id) REFERENCES ACCOUNT(account_id),
          FOREIGN KEY (debt_id) REFERENCES DEBT(debt_id),
          FOREIGN KEY (transfer_transaction_id) REFERENCES TRANSACTIONS_NEW(transaction_id)
        );
      `);

      await db.execAsync(`
        INSERT INTO TRANSACTIONS_NEW (
          transaction_id, account_id, debt_id, transfer_transaction_id, 
          is_income, amount, category_id, description, 
          transaction_date, status, recurrence_frequency, 
          is_automatic, is_active, created_at
        )
        SELECT 
          transaction_id, account_id, debt_id, transfer_transaction_id, 
          is_income, amount, category_id, description, 
          transaction_date, status, recurrence_frequency, 
          is_automatic, is_active, created_at
        FROM TRANSACTIONS;
      `);

      await db.execAsync('DROP TABLE TRANSACTIONS;');
      await db.execAsync('ALTER TABLE TRANSACTIONS_NEW RENAME TO TRANSACTIONS;');
      await db.execAsync('DROP TABLE IF EXISTS CATEGORY;');
    });
  }
};

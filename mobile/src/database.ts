import * as SQLite from 'expo-sqlite';

export const initDatabase = async () => {
  try {
    const db = await SQLite.openDatabaseAsync('seedcoin.db');

    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      PRAGMA foreign_keys = ON;

      -- TABLA: Cuentas
      CREATE TABLE IF NOT EXISTS accounts (
          account_id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          account_type TEXT NOT NULL,
          initial_balance INTEGER DEFAULT 0,
          current_balance INTEGER DEFAULT 0,
          is_active INTEGER DEFAULT 1
      );

      -- TABLA: Transacciones (Gastos e Ingresos)
      CREATE TABLE IF NOT EXISTS transactions (
          transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
          account_id INTEGER NOT NULL,
          type TEXT NOT NULL,
          amount INTEGER NOT NULL,
          category TEXT NOT NULL,
          description TEXT,
          transaction_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (account_id) REFERENCES accounts (account_id) ON DELETE CASCADE
      );

      -- TABLA: Transacciones Comunes (Presets)
      CREATE TABLE IF NOT EXISTS common_transactions (
          preset_id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          type TEXT NOT NULL,
          amount INTEGER NOT NULL,
          category TEXT NOT NULL
      );

      -- TABLA: Transacciones Programadas
      CREATE TABLE IF NOT EXISTS scheduled_transactions (
          scheduled_id INTEGER PRIMARY KEY AUTOINCREMENT,
          account_id INTEGER NOT NULL,
          type TEXT NOT NULL,
          amount INTEGER NOT NULL,
          category TEXT NOT NULL,
          description TEXT,
          frequency TEXT NOT NULL,
          start_date DATETIME NOT NULL,
          next_execution DATETIME NOT NULL,
          FOREIGN KEY (account_id) REFERENCES accounts (account_id) ON DELETE CASCADE
      );

      -- TABLA: Presupuestos
      CREATE TABLE IF NOT EXISTS budgets (
          budget_id INTEGER PRIMARY KEY AUTOINCREMENT,
          category TEXT NOT NULL,
          period TEXT NOT NULL,
          limit_amount INTEGER NOT NULL,
          alerts_enabled INTEGER DEFAULT 1
      );

      -- TABLA: Deudas
      CREATE TABLE IF NOT EXISTS debts (
          debt_id INTEGER PRIMARY KEY AUTOINCREMENT,
          creditor TEXT NOT NULL,
          principal_amount INTEGER NOT NULL,
          interest_rate REAL DEFAULT 0,
          remaining_amount INTEGER NOT NULL,
          due_date DATETIME NOT NULL
      );

      -- TABLA: Pagos de Deudas
      CREATE TABLE IF NOT EXISTS debt_payments (
          payment_id INTEGER PRIMARY KEY AUTOINCREMENT,
          debt_id INTEGER NOT NULL,
          account_id INTEGER NOT NULL,
          amount INTEGER NOT NULL,
          payment_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (debt_id) REFERENCES debts (debt_id) ON DELETE CASCADE,
          FOREIGN KEY (account_id) REFERENCES accounts (account_id) ON DELETE CASCADE
      );
    `);

    console.log('✅ Base de datos inicializada correctamente.');
    return true;
  } catch (error) {
    console.error('❌ Error al inicializar la base de datos:', error);
    return false;
  }
};

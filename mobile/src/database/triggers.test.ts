import { setupTestDatabase } from '@/src/database/test-utils';
import { SQLiteDatabase } from 'expo-sqlite';

describe('SQLite Database Triggers and Relations', () => {
  let db: SQLiteDatabase;

  beforeEach(async () => {
    // We isolate each test to an entirely fresh setup
    db = await setupTestDatabase(`test_seedcoin_${Date.now()}.db`);
  });

  describe('update_account_balance_after_insert trigger', () => {
    it('should increment account current_balance when completed income transaction is added', async () => {
      // Create account
      const result = await db.runAsync(
        'INSERT INTO ACCOUNT (name, account_type, initial_balance, current_balance) VALUES (?, ?, ?, ?)', 
        ['Savings', 'savings', 0, 0]
      );
      const accountId = result.lastInsertRowId;

      // Create a COMPLETED income transaction (is_income = 1)
      // category_id is now a string (e.g., 'salary')
      await db.runAsync(
        'INSERT INTO TRANSACTIONS (account_id, is_income, amount, category_id, transaction_date, status, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [accountId, 1, 500, 'salary', new Date().toISOString(), 'COMPLETED', 1]
      );

      // Verify balance was updated by the trigger
      const updatedAccount = await db.getFirstAsync<{ current_balance: number }>('SELECT current_balance FROM ACCOUNT WHERE account_id = ?', [accountId]);
      expect(updatedAccount?.current_balance).toBe(500);
    });

    it('should decrement account current_balance when completed expense transaction is added', async () => {
      // Create account
      const result = await db.runAsync(
        'INSERT INTO ACCOUNT (name, account_type, initial_balance, current_balance) VALUES (?, ?, ?, ?)', 
        ['Savings', 'savings', 1000, 1000]
      );
      const accountId = result.lastInsertRowId;

      // Create a COMPLETED expense transaction (is_income = 0)
      await db.runAsync(
        'INSERT INTO TRANSACTIONS (account_id, is_income, amount, category_id, transaction_date, status, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [accountId, 0, 200, 'food', new Date().toISOString(), 'COMPLETED', 1]
      );

      // Verify balance was decreased
      const updatedAccount = await db.getFirstAsync<{ current_balance: number }>('SELECT current_balance FROM ACCOUNT WHERE account_id = ?', [accountId]);
      expect(updatedAccount?.current_balance).toBe(800);
    });
    
    it('should NOT update balance if transaction status is not COMPLETED', async () => {
      const result = await db.runAsync(
        'INSERT INTO ACCOUNT (name, account_type, initial_balance, current_balance) VALUES (?, ?, ?, ?)', 
        ['Savings', 'savings', 1000, 1000]
      );
      const accountId = result.lastInsertRowId;

      // Create a PENDING expense transaction
      await db.runAsync(
        'INSERT INTO TRANSACTIONS (account_id, is_income, amount, category_id, transaction_date, status, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [accountId, 0, 200, 'food', new Date().toISOString(), 'PENDING', 1]
      );

      // Verify balance was NOT decreased
      const updatedAccount = await db.getFirstAsync<{ current_balance: number }>('SELECT current_balance FROM ACCOUNT WHERE account_id = ?', [accountId]);
      expect(updatedAccount?.current_balance).toBe(1000);
    });
  });
});

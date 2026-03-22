import * as SQLite from 'expo-sqlite';

export interface Transaction {
  transaction_id: number;
  account_id: number;
  type: 'INGRESO' | 'GASTO';
  amount: number;
  category: string;
  description: string;
  transaction_date: string;
}

const DB_NAME = 'seedcoin.db';

export const getTransactionsByAccount = async (accountId: number): Promise<Transaction[]> => {
  const db = await SQLite.openDatabaseAsync(DB_NAME);
  const statement = await db.prepareAsync(
    'SELECT * FROM transactions WHERE account_id = $accountId ORDER BY transaction_date DESC'
  );
  try {
    const result = await statement.executeForRawResultAsync({ $accountId: accountId });
    const allRows = await result.getAllAsync();
    return allRows as unknown as Transaction[];
  } finally {
    await statement.finalizeAsync();
  }
};

export const getRecentTransactions = async (limit: number = 10): Promise<Transaction[]> => {
    const db = await SQLite.openDatabaseAsync(DB_NAME);
    const result = await db.getAllAsync<Transaction>(
        'SELECT * FROM transactions ORDER BY transaction_date DESC LIMIT ?', limit
    );
    return result;
}

export const createTransaction = async (
  account_id: number,
  type: 'INGRESO' | 'GASTO',
  amount: number,
  category: string,
  description: string = ''
) => {
  const db = await SQLite.openDatabaseAsync(DB_NAME);
  
  // Usar transacción para asegurar atomicidad (actualizar la transacción y el balance de la cuenta al mismo tiempo)
  await db.withTransactionAsync(async () => {
    const stmt = await db.prepareAsync(
      `INSERT INTO transactions (account_id, type, amount, category, description) 
       VALUES ($account_id, $type, $amount, $category, $description)`
    );
    
    try {
      await stmt.executeAsync({
        $account_id: account_id,
        $type: type,
        $amount: amount,
        $category: category,
        $description: description
      });

      // Actualizar el saldo de la cuenta
      if (type === 'INGRESO') {
        await db.runAsync('UPDATE accounts SET current_balance = current_balance + ? WHERE account_id = ?', amount, account_id);
      } else {
        await db.runAsync('UPDATE accounts SET current_balance = current_balance - ? WHERE account_id = ?', amount, account_id);
      }
    } finally {
      await stmt.finalizeAsync();
    }
  });

  return true;
};

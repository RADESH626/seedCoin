import * as SQLite from 'expo-sqlite';
import { QUERIES_TRANSACTION } from '../database/queries';
import { Transaction } from '../database/types';
import { getDBConnection } from '../database/connection';

export const getTransactionsByAccount = async (accountId: number): Promise<Transaction[]> => {
  const db = await getDBConnection();
  return await db.getAllAsync<Transaction>(QUERIES_TRANSACTION.GET_BY_ACCOUNT, [accountId]);
};

export const getRecentTransactions = async (limit: number = 10): Promise<Transaction[]> => {
    const db = await getDBConnection();
    return await db.getAllAsync<Transaction>(QUERIES_TRANSACTION.GET_RECENT, [limit]);
}

export const createTransaction = async (
  account_id: number,
  is_income: boolean,
  amount: number,
  category_id: number,
  description: string = '',
  status: string = 'COMPLETED',
  transaction_date: string = new Date().toISOString()
) => {
  const db = await getDBConnection();
  
  // Note: En tu schema.ts, ya existe un Trigger 'update_account_balance_after_insert'
  // que automáticamente suma/resta el current_balance de la cuenta cuando insertas. 
  // Por ende, ya no necesitamos hacerlo manualmente con "db.runAsync UPDATE ACCOUNT" como estaba antes!
  // El trigger de SQLite hace el trabajo automáticamente.
  
  const statement = await db.prepareAsync(QUERIES_TRANSACTION.INSERT_NAMED);
  
  try {
    const isIncomeInt = is_income ? 1 : 0;
    await statement.executeAsync({
      $account_id: account_id,
      $is_income: isIncomeInt,
      $amount: amount,
      $category_id: category_id,
      $description: description,
      $transaction_date: transaction_date,
      $status: status
    });
    return true;
  } finally {
    await statement.finalizeAsync();
  }
};

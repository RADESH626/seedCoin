import { QUERIES_TRANSACTION } from '../database/queries';
import type { Transaction, CreateTransactionInput } from '../database/types';
import { getDBConnection } from '../database/connection';

export const getTransactionsByAccount = async (accountId: number): Promise<Transaction[]> => {
  const db = await getDBConnection();
  return await db.getAllAsync<Transaction>(QUERIES_TRANSACTION.GET_BY_ACCOUNT, [accountId]);
};

export const getRecentTransactions = async (limit: number = 10): Promise<Transaction[]> => {
  const db = await getDBConnection();
  return await db.getAllAsync<Transaction>(QUERIES_TRANSACTION.GET_RECENT, [limit]);
};

export const createTransaction = async (data: CreateTransactionInput) => {
  const {
    accountId,
    isIncome,
    amount,
    categoryId,
    description = '',
    status = 'COMPLETED',
    transactionDate = new Date().toISOString(),
  } = data;

  const db = await getDBConnection();

  const statement = await db.prepareAsync(QUERIES_TRANSACTION.INSERT_NAMED);

  try {
    const isIncomeInt = isIncome ? 1 : 0;
    await statement.executeAsync({
      $account_id: accountId,
      $is_income: isIncomeInt,
      $amount: amount,
      $category_id: categoryId,
      $description: description,
      $transaction_date: transactionDate,
      $status: status,
    });
    return true;
  } finally {
    await statement.finalizeAsync();
  }
};

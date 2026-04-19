import { QUERIES_TRANSACTION } from '../database/queries';
import type { Transaction, CreateTransactionInput, UpdateTransactionInput, MonthlyStats, DetailedTransaction, RecentTransaction } from '../database/types';
import { getDBConnection } from '../database/connection';
import { fromCents, toCents } from '../helpers/currency';
import { withNativeRetry } from '../helpers/database';

export const getTransactionsByAccount = async (accountId: number): Promise<Transaction[]> => {
  return await withNativeRetry(async () => {
    const db = await getDBConnection();
    const result = await db.getAllAsync<Transaction>(QUERIES_TRANSACTION.GET_BY_ACCOUNT, [accountId]);
    return result.map(tx => ({ ...tx, amount: fromCents(tx.amount) }));
  }, 'TransactionService.getTransactionsByAccount');
};

export const getRecentTransactions = async (limit: number = 10): Promise<Transaction[]> => {
  return await withNativeRetry(async () => {
    const db = await getDBConnection();
    const result = await db.getAllAsync<Transaction>(QUERIES_TRANSACTION.GET_RECENT, [limit]);
    return result.map(tx => ({ ...tx, amount: fromCents(tx.amount) }));
  }, 'TransactionService.getRecentTransactions');
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

  const amountInCents = toCents(amount);

  return await withNativeRetry(async () => {
    const db = await getDBConnection();
    const statement = await db.prepareAsync(QUERIES_TRANSACTION.INSERT_NAMED);
    try {
      const isIncomeInt = isIncome ? 1 : 0;
      await statement.executeAsync({
        $account_id: accountId,
        $is_income: isIncomeInt,
        $amount: amountInCents,
        $category_id: categoryId,
        $description: description,
        $transaction_date: transactionDate,
        $status: status,
        $recurrence_frequency: data.recurrenceFrequency || null,
        $is_automatic: data.isAutomatic !== undefined ? (data.isAutomatic ? 1 : 0) : 1,
      });
      return true;
    } finally {
      await statement.finalizeAsync();
    }
  }, 'TransactionService.createTransaction');
};

export const getMonthlyStats = async (): Promise<MonthlyStats> => {
  return await withNativeRetry(async () => {
    const db = await getDBConnection();
    const result = await db.getFirstAsync<MonthlyStats>(QUERIES_TRANSACTION.GET_MONTHLY_STATS);
    return {
      total_income: fromCents(result?.total_income ?? 0),
      total_expense: fromCents(result?.total_expense ?? 0),
    };
  }, 'TransactionService.getMonthlyStats');
};

export const getAllDetailedTransactions = async (): Promise<DetailedTransaction[]> => {
  return await withNativeRetry(async () => {
    const db = await getDBConnection();
    const result = await db.getAllAsync<DetailedTransaction>(QUERIES_TRANSACTION.GET_ALL_DETAILED);
    return (result ?? []).map(tx => ({
      ...tx,
      amount: fromCents(tx.amount)
    }));
  }, 'TransactionService.getAllDetailed');
};

export const getRecentTransactionsWithCategory = async (): Promise<RecentTransaction[]> => {
  return await withNativeRetry(async () => {
    const db = await getDBConnection();
    const result = await db.getAllAsync<RecentTransaction>(QUERIES_TRANSACTION.GET_RECENT_WITH_CATEGORY);
    return (result ?? []).map(tx => ({
      ...tx,
      amount: fromCents(tx.amount)
    }));
  }, 'TransactionService.getRecentWithCategory');
};
export async function getTransactionById(id: number): Promise<Transaction | null> {
  return await withNativeRetry(async () => {
    const db = await getDBConnection();
    const result = await db.getFirstAsync<Transaction>(QUERIES_TRANSACTION.GET_BY_ID, [id]);
    if (!result) return null;
    return { ...result, amount: fromCents(result.amount) };
  }, 'TransactionService.getTransactionById');
}

export async function updateTransaction(data: UpdateTransactionInput) {
  const {
    transactionId,
    accountId,
    isIncome,
    amount,
    categoryId,
    description = '',
    status = 'COMPLETED',
    transactionDate = new Date().toISOString(),
  } = data;

  const amountInCents = toCents(amount);

  return await withNativeRetry(async () => {
    const db = await getDBConnection();
    const statement = await db.prepareAsync(QUERIES_TRANSACTION.UPDATE_NAMED);
    try {
      await statement.executeAsync({
        $transaction_id: transactionId,
        $account_id: accountId,
        $is_income: isIncome ? 1 : 0,
        $amount: amountInCents,
        $category_id: categoryId,
        $description: description,
        $transaction_date: transactionDate,
        $status: status,
        $recurrence_frequency: data.recurrenceFrequency || null,
        $is_automatic: data.isAutomatic !== undefined ? (data.isAutomatic ? 1 : 0) : 1,
      });
      return true;
    } finally {
      await statement.finalizeAsync();
    }
  }, 'TransactionService.updateTransaction');
}

export async function deleteTransaction(id: number) {
  return await withNativeRetry(async () => {
    const db = await getDBConnection();
    await db.runAsync(QUERIES_TRANSACTION.SOFT_DELETE_TRANSACTION, { $id: id });
    return true;
  }, 'TransactionService.deleteTransaction');
}export async function getAllScheduledDetailedTransactions(): Promise<DetailedTransaction[]> {
  return await withNativeRetry(async () => {
    const db = await getDBConnection();
    const result = await db.getAllAsync<DetailedTransaction>(QUERIES_TRANSACTION.GET_ALL_SCHEDULED_DETAILED);
    return (result ?? []).map(tx => ({
      ...tx,
      amount: fromCents(tx.amount)
    }));
  }, 'TransactionService.getAllScheduled');
}

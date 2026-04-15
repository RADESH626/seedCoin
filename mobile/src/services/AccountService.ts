import { QUERIES_ACCOUNT, QUERIES_TRANSACTION } from '../database/queries';
import type { Account, TotalBalanceRow } from '../database/types';
import { getDBConnection } from '../database/connection';
import { fromCents, toCents } from '../helpers/currency';
import { withNativeRetry } from '../helpers/database';

export const getAccounts = async (): Promise<Account[]> => {
  return await withNativeRetry(async () => {
    const db = await getDBConnection();
    const result = await db.getAllAsync<Account>(QUERIES_ACCOUNT.GET_ALL_ACTIVE_ORDERED);
    
    return result.map(acc => ({
      ...acc,
      initial_balance: fromCents(acc.initial_balance),
      current_balance: fromCents(acc.current_balance)
    }));
  }, 'AccountService.getAccounts');
};

export const getAccountById = async (account_id: number): Promise<Account | null> => {
  return await withNativeRetry(async () => {
    const db = await getDBConnection();
    const result = await db.getFirstAsync<Account>(QUERIES_ACCOUNT.GET_BY_ID, { $id: account_id });
    
    if (!result) return null;

    return {
      ...result,
      initial_balance: fromCents(result.initial_balance),
      current_balance: fromCents(result.current_balance)
    };
  }, 'AccountService.getAccountById');
};

export const createAccount = async (name: string, account_type: string, initial_balance: number = 0) => {
  const balanceInCents = toCents(initial_balance);
  
  return await withNativeRetry(async () => {
    const db = await getDBConnection();
    const statement = await db.prepareAsync(QUERIES_ACCOUNT.INSERT_NAMED);
    try {
      const result = await statement.executeAsync({
        $name: name,
        $type: account_type,
        $initial: balanceInCents,
        $current: balanceInCents
      });
      return result.lastInsertRowId;
    } finally {
      await statement.finalizeAsync();
    }
  }, 'AccountService.createAccount');
};

export const updateAccount = async (account_id: number, name: string, account_type: string, initial_balance: number) => {
  const balanceInCents = toCents(initial_balance);
  
  return await withNativeRetry(async () => {
    const db = await getDBConnection();
    const statement = await db.prepareAsync(QUERIES_ACCOUNT.UPDATE_NAMED);
    try {
      const result = await statement.executeAsync({
        $id: account_id,
        $name: name,
        $type: account_type,
        $initial: balanceInCents
      });
      return result.changes > 0;
    } finally {
      await statement.finalizeAsync();
    }
  }, 'AccountService.updateAccount');
};

export const deleteAccount = async (account_id: number) => {
  return await withNativeRetry(async () => {
    const db = await getDBConnection();
    const statement = await db.prepareAsync(QUERIES_ACCOUNT.SOFT_DELETE);
    try {
      const result = await statement.executeAsync({ $id: account_id });
      return result.changes > 0;
    } finally {
      await statement.finalizeAsync();
    }
  }, 'AccountService.deleteAccount');
};

export const hasTransactions = async (account_id: number): Promise<boolean> => {
  return await withNativeRetry(async () => {
    const db = await getDBConnection();
    const result = await db.getFirstAsync<{ total: number }>(QUERIES_TRANSACTION.COUNT_BY_ACCOUNT, { $id: account_id });
    return (result?.total ?? 0) > 0;
  }, 'AccountService.hasTransactions');
};

export const getTotalBalance = async (): Promise<number> => {
  return await withNativeRetry(async () => {
    const db = await getDBConnection();
    const result = await db.getFirstAsync<TotalBalanceRow>(QUERIES_ACCOUNT.GET_TOTAL_BALANCE);
    return fromCents(result?.total ?? 0);
  }, 'AccountService.getTotalBalance');
};

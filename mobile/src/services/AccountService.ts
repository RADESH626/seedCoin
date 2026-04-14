import { QUERIES_ACCOUNT } from '../database/queries';
import type { Account } from '../database/types';
import { getDBConnection } from '../database/connection';

export const getAccounts = async (): Promise<Account[]> => {
  const db = await getDBConnection();
  return await db.getAllAsync<Account>(QUERIES_ACCOUNT.GET_ALL_ACTIVE_ORDERED);
};

export const createAccount = async (name: string, account_type: string, initial_balance: number = 0) => {
  const db = await getDBConnection();
  const statement = await db.prepareAsync(QUERIES_ACCOUNT.INSERT_NAMED);
  try {
    const result = await statement.executeAsync({
      $name: name,
      $type: account_type,
      $initial: initial_balance,
      $current: initial_balance
    });
    return result.lastInsertRowId;
  } finally {
    await statement.finalizeAsync();
  }
};

export const deleteAccount = async (account_id: number) => {
  const db = await getDBConnection();
  const statement = await db.prepareAsync(QUERIES_ACCOUNT.SOFT_DELETE);
  try {
    const result = await statement.executeAsync({ $id: account_id });
    return result.changes > 0;
  } finally {
    await statement.finalizeAsync();
  }
};

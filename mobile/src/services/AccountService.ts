import * as SQLite from 'expo-sqlite';

export interface Account {
  account_id: number;
  name: string;
  account_type: string;
  initial_balance: number;
  current_balance: number;
  is_active: number;
}

const DB_NAME = 'seedcoin.db';

export const getAccounts = async (): Promise<Account[]> => {
  const db = await SQLite.openDatabaseAsync(DB_NAME);
  const result = await db.getAllAsync<Account>('SELECT * FROM accounts WHERE is_active = 1 ORDER BY account_id DESC;');
  return result;
};

export const createAccount = async (name: string, account_type: string, initial_balance: number = 0) => {
  const db = await SQLite.openDatabaseAsync(DB_NAME);
  const statement = await db.prepareAsync(
    'INSERT INTO accounts (name, account_type, initial_balance, current_balance) VALUES ($name, $type, $initial, $current)'
  );
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
  const db = await SQLite.openDatabaseAsync(DB_NAME);
  const statement = await db.prepareAsync('UPDATE accounts SET is_active = 0 WHERE account_id = $id');
  try {
    const result = await statement.executeAsync({ $id: account_id });
    return result.changes > 0;
  } finally {
    await statement.finalizeAsync();
  }
};

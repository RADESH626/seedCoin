import { useCallback, useState } from 'react';
import { getAccounts, createAccount } from '../services/AccountService';
import { log } from '../services/logger';
import type { Account } from '../database/types';

export function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const fetchAccounts = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getAccounts();
      setAccounts(result);
    } catch (error: unknown) {
      log.error('useAccounts: Error fetching accounts', error);
    } finally {
      setLoading(false);
      setIsInitialLoad(false);
    }
  }, []);

  const addAccount = useCallback(async (name: string, accountType: string, initialBalance: number) => {
    try {
      await createAccount(name, accountType, initialBalance);
      await fetchAccounts();
    } catch (error: unknown) {
      log.error('useAccounts: Error adding account', error);
    }
  }, [fetchAccounts]);

  return {
    accounts,
    loading,
    isInitialLoad,
    fetchAccounts,
    addAccount,
  };
}

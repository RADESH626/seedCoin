import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { getAccountById } from '@/src/modules/accounts/services/AccountService';
import { getTransactionsByAccount } from '@/src/modules/transactions/api/transaction.api';
import { log } from '@/src/shared/services/logger';
import type { Account, Transaction } from '@/src/database/types';

interface AccountDetailState {
  account: Account | null;
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook de lógica para la pantalla de detalle de cuenta.
 * Combina datos de la cuenta y su historial de transacciones.
 */
export function useAccountDetail(accountId: number) {
  const [state, setState] = useState<AccountDetailState>({
    account: null,
    transactions: [],
    isLoading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const [account, transactions] = await Promise.all([
        getAccountById(accountId),
        getTransactionsByAccount(accountId),
      ]);

      if (!account) {
        setState({ account: null, transactions: [], isLoading: false, error: 'Cuenta no encontrada.' });
        return;
      }

      // Ordenar por fecha más reciente primero
      const sorted = [...transactions].sort(
        (a, b) => new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime()
      );

      setState({ account, transactions: sorted, isLoading: false, error: null });
    } catch (err: unknown) {
      log.error('useAccountDetail: Error cargando datos de cuenta', err);
      setState(prev => ({ ...prev, isLoading: false, error: 'Error al cargar los datos.' }));
    }
  }, [accountId]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  return { state, refresh: fetchData };
}

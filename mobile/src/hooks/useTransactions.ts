import { useCallback, useState } from 'react';
import { log } from '../services/logger';
import { getAllDetailedTransactions, deleteTransaction, getTransactionById } from '../services/TransactionService';
import type { DetailedTransaction, Transaction } from '../database/types';

/**
 * Hook para gestionar el historial y visualización de movimientos.
 */
export function useTransactions() {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<DetailedTransaction[]>([]);

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getAllDetailedTransactions();
      setHistory(result);
    } catch (error: unknown) {
      log.error('useTransactions: Error al obtener historial', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const removeTransaction = useCallback(async (id: number) => {
    try {
      setLoading(true);
      await deleteTransaction(id);
      await fetchHistory();
    } catch (error: unknown) {
      log.error('useTransactions: Error al eliminar transacción', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [fetchHistory]);

  const getById = useCallback(async (id: number): Promise<Transaction | null> => {
    try {
      return await getTransactionById(id);
    } catch (error: unknown) {
      log.error('useTransactions: Error al obtener transacción por ID', error);
      return null;
    }
  }, []);

  return {
    loading,
    history,
    fetchHistory,
    removeTransaction,
    getById,
  };
}

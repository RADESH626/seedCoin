import { useCallback, useState } from 'react';
import { log } from '../services/logger';
import { getAllDetailedTransactions } from '../services/TransactionService';
import type { DetailedTransaction } from '../database/types';

/**
 * Hook para gestionar el historial y visualización de movimientos.
 * Renombrado de useTransactionsHistory para mayor consistencia.
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

  return {
    loading,
    history,
    fetchHistory,
  };
}

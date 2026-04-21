import { useQuery } from '@tanstack/react-query';
import * as TransactionAPI from '../api/transaction.api';
import { DetailedTransaction, RecentTransaction, MonthlyStats } from '../types';

/**
 * Hooks de consulta (Read) para Transacciones usando TanStack Query.
 */

export const useDetailedTransactions = () => {
  return useQuery<DetailedTransaction[]>({
    queryKey: ['transactions', 'detailed'],
    queryFn: TransactionAPI.getAllDetailedTransactions,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};

export const useScheduledTransactions = () => {
  return useQuery<DetailedTransaction[]>({
    queryKey: ['transactions', 'scheduled'],
    queryFn: TransactionAPI.getAllScheduledDetailedTransactions,
    staleTime: 1000 * 60 * 1, // 1 minuto para programadas
  });
};


export const useRecentTransactionsWithCategory = () => {
  return useQuery<RecentTransaction[]>({
    queryKey: ['transactions', 'recent'],
    queryFn: TransactionAPI.getRecentTransactionsWithCategory,
  });
};

export const useMonthlyStats = () => {
  return useQuery<MonthlyStats>({
    queryKey: ['transactions', 'stats', 'monthly'],
    queryFn: TransactionAPI.getMonthlyStats,
  });
};


export const useTransactionById = (id: number | null) => {
  return useQuery<DetailedTransaction | null>({
    queryKey: ['transactions', 'detail', id],
    queryFn: () => (id ? TransactionAPI.getTransactionById(id) : null) as Promise<DetailedTransaction | null>,
    enabled: !!id,
  });
};


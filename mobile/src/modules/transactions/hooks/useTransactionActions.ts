import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as TransactionAPI from '../api/transaction.api';
import type { CreateTransactionInput, UpdateTransactionInput } from '../types';

/**
 * Hooks de acción (Write) para Transacciones.
 * Manejan la invalidación de la caché para mantener la UI sincronizada.
 */

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTransactionInput) => TransactionAPI.createTransaction(data),
    onSuccess: () => {
      // Invalidar todas las consultas relacionadas
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      // También las estadísticas del dashboard
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });
};

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateTransactionInput) => TransactionAPI.updateTransaction(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['transactions', 'detail', variables.transactionId] });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });
};

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => TransactionAPI.deleteTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });
};

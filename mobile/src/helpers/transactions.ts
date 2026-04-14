import { getDateLabel } from '../helpers/date';
import type { DetailedTransaction } from '../database/types';

/**
 * Agrupa una lista plana de transacciones por su etiqueta de fecha (Hoy, Ayer, Fecha).
 * Esta lógica de transformación se extrae de la UI para mantener los componentes limpios.
 */
export function groupTransactionsByDate(transactions: DetailedTransaction[]): Record<string, DetailedTransaction[]> {
  const groups: Record<string, DetailedTransaction[]> = {};

  transactions.forEach(tx => {
    const dateLabel = getDateLabel(tx.transaction_date);
    if (!groups[dateLabel]) {
      groups[dateLabel] = [];
    }
    groups[dateLabel].push(tx);
  });

  return groups;
}

import { createTransaction } from '../api/transaction.api';
import { log } from '@/src/shared/services/logger';

export const createTransfer = async (
  fromAccountId: number,
  toAccountId: number,
  amount: number,
  description: string = 'Transferencia entre cuentas'
) => {
  try {
    log.info(`TransferService: Iniciando transferencia de ${amount} de ${fromAccountId} a ${toAccountId}`);

    // 1. Crear transacción de salida (Gasto)
    const expenseTxId = await createTransaction({
      accountId: fromAccountId,
      isIncome: false,
      amount: amount,
      categoryId: 'expense_other', // O una categoría específica de transferencia si existiera
      description: description,
      status: 'COMPLETED'
    });

    if (!expenseTxId) throw new Error('No se pudo crear la transacción de salida');

    // 2. Crear transacción de entrada (Ingreso) vinculada
    const incomeTxId = await createTransaction({
      accountId: toAccountId,
      isIncome: true,
      amount: amount,
      categoryId: 'income_other',
      description: description,
      status: 'COMPLETED',
      transferTransactionId: expenseTxId as number
    });

    log.info(`TransferService: Transferencia completada. TXs: ${expenseTxId}, ${incomeTxId}`);
    return true;
  } catch (error) {
    log.error('TransferService: Error al realizar transferencia', error);
    throw error;
  }
};

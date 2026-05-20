import { createTransaction } from '../api/transaction.api';
import { getDBConnection } from '@/src/database/connection';
import { log } from '@/src/shared/services/logger';

export const createTransfer = async (
  fromAccountId: number,
  toAccountId: number,
  amount: number,
  description: string = 'Transferencia entre cuentas',
  date: string = new Date().toISOString()
) => {
  const db = await getDBConnection();

  try {
    log.info(`TransferService: Iniciando transferencia atómica de ${amount} de ${fromAccountId} a ${toAccountId}`);

    await db.withTransactionAsync(async () => {
      // 1. Crear transacción de salida (Gasto)
      const expenseTxId = await createTransaction({
        accountId: fromAccountId,
        isIncome: false,
        amount: amount,
        categoryId: 'expense_other',
        description: description,
        status: 'COMPLETED',
        transactionDate: date
      }, db);

      if (!expenseTxId) throw new Error('No se pudo crear la transacción de salida');

      // 2. Crear transacción de entrada (Ingreso) vinculada
      const incomeTxId = await createTransaction({
        accountId: toAccountId,
        isIncome: true,
        amount: amount,
        categoryId: 'income_other',
        description: description,
        status: 'COMPLETED',
        transactionDate: date,
        transferTransactionId: expenseTxId
      }, db);

      log.info(`TransferService: Transferencia completada atómicamente. TXs: ${expenseTxId}, ${incomeTxId}`);
    });
    return true;
  } catch (error) {
    log.error('TransferService: Error al realizar transferencia', error);
    throw error;
  }
};

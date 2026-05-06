import { NotificationService } from './NotificationService';
import { getDBConnection } from '@/src/database/connection';
import { QUERIES_TRANSACTION } from '@/src/database/queries';
import { Transaction, RecurrenceFrequency } from '@/src/database/types';
import { withNativeRetry } from '@/src/shared/utils/database';
import { log } from './logger';
import { fromCents } from '@/src/shared/utils/currency';

/**
 * Servicio encargado de la lógica de programación y recurrencia de transacciones.
 */
export const SchedulerService = {
  /**
   * Calcula la próxima fecha de ocurrencia basado en la fecha base y la frecuencia.
   * Retorna un string ISO (YYYY-MM-DDTHH:mm:ss.sssZ).
   */
  calculateNextOccurrence(baseDateStr: string, frequency: RecurrenceFrequency): string {
    const date = new Date(baseDateStr);
    const currentDate = new Date(baseDateStr);
    
    switch (frequency) {
      case 'DAILY':
        date.setDate(date.getDate() + 1);
        break;
      case 'WEEKLY':
        date.setDate(date.getDate() + 7);
        break;
      case 'BIWEEKLY':
        date.setDate(date.getDate() + 14);
        break;
      case 'MONTHLY':
        const currentMonth = date.getMonth();
        date.setMonth(currentMonth + 1);
        // Manejo de fin de mes (ej: de 31 de enero a 28/29 de febrero)
        if (date.getMonth() !== (currentMonth + 1) % 12) {
          date.setDate(0); 
        }
        break;
      case 'YEARLY':
        date.setFullYear(date.getFullYear() + 1);
        break;
    }
    
    return date.toISOString();
  },

  /**
   * Procesa todas las transacciones programadas vencidas.
   */
  async processDueTransactions(): Promise<void> {
    return await withNativeRetry(async () => {
      const db = await getDBConnection();
      const now = new Date().toISOString();
      
      // 1. Obtener todas las transacciones programadas cuya fecha sea <= ahora
      // Nota: Usamos una query directa aprovechando que ya conocemos la estructura
      const scheduled = await db.getAllAsync<Transaction>(
        `SELECT * FROM TRANSACTIONS WHERE status = 'SCHEDULED' AND transaction_date <= ? AND is_active = 1`,
        [now]
      );

      if (scheduled.length === 0) return;

      log.info(`SchedulerService: Procesando ${scheduled.length} transacciones programadas.`);

      for (const template of scheduled) {
        await this.triggerSchedule(template);
      }
    }, 'SchedulerService.processDueTransactions');
  },

  /**
   * Ejecuta una ocurrencia de una programación.
   */
  async triggerSchedule(template: Transaction): Promise<void> {
    const db = await getDBConnection();
    const nextDate = this.calculateNextOccurrence(
      template.transaction_date, 
      template.recurrence_frequency!
    );

    await db.withTransactionAsync(async () => {
      // 1. Crear la instancia de la transacción (COMPLETED o DUE)
      const targetStatus = template.is_automatic ? 'COMPLETED' : 'DUE';
      
      await db.runAsync(QUERIES_TRANSACTION.INSERT_NAMED, {
        $account_id: template.account_id,
        $is_income: template.is_income,
        $amount: template.amount, // En centavos
        $category_id: template.category_id,
        $description: template.description || '',
        $transaction_date: template.transaction_date,
        $status: targetStatus,
        $recurrence_frequency: null, // La instancia no es recurrente
        $is_automatic: template.is_automatic
      });

      // 2. Actualizar la fecha de la plantilla al siguiente ciclo
      await db.runAsync(
        `UPDATE TRANSACTIONS SET transaction_date = ? WHERE transaction_id = ?`,
        [nextDate, template.transaction_id]
      );

      log.info(`SchedulerService: Generada transacción ${targetStatus} para ${template.description}. Siguiente: ${nextDate}`);
      
      // 3. Notificación si es automática
      if (template.is_automatic) {
        await NotificationService.scheduleNotification(
          'Transacción Procesada',
          `Se ha registrado automáticamente: ${template.description} por $${fromCents(template.amount)}`,
          { transaction_id: template.transaction_id }
        );
      }
    });
  }
};


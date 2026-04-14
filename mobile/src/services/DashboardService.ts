import { getTotalBalance } from './AccountService';
import { getMonthlyStats, getRecentTransactionsWithCategory } from './TransactionService';
import type { RecentTransaction, MonthlyStats } from '../database/types';

export interface DashboardData {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpense: number;
  recentTransactions: RecentTransaction[];
  balanceGrowthPct: number;
}

/**
 * Servicio encargado de la agregación de datos para el Dashboard.
 * Optimiza la recuperación paralela de múltiples métricas financieras.
 */
export const DashboardService = {
  /**
   * Obtiene todos los indicadores necesarios para la vista principal.
   * Ejecuta peticiones en paralelo para optimizar el rendimiento.
   */
  async getDashboardSummary(): Promise<DashboardData> {
    const [balance, stats, transactions] = await Promise.all([
      getTotalBalance(),
      getMonthlyStats(),
      getRecentTransactionsWithCategory()
    ]);

    // TODO: Implementar cálculo real de crecimiento mensual comparativo
    const balanceGrowthPct = 0; 

    return {
      totalBalance: balance,
      monthlyIncome: stats.total_income,
      monthlyExpense: stats.total_expense,
      recentTransactions: transactions,
      balanceGrowthPct
    };
  }
};

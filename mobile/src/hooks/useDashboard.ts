import { useCallback, useState } from 'react';
import { log } from '../services/logger';
import { DashboardService } from '../services/DashboardService';
import type { RecentTransaction } from '../database/types';

/**
 * Hook para la gestión de datos agregados del Dashboard.
 * Orquesta la recuperación de balances, estadísticas y transacciones recientes.
 */
export function useDashboard() {
  const [loading, setLoading] = useState(true);
  const [totalBalance, setTotalBalance] = useState(0);
  const [balanceGrowthPct, setBalanceGrowthPct] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpense, setMonthlyExpense] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState<RecentTransaction[]>([]);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await DashboardService.getDashboardSummary();
      
      setTotalBalance(data.totalBalance);
      setMonthlyIncome(data.monthlyIncome);
      setMonthlyExpense(data.monthlyExpense);
      setRecentTransactions(data.recentTransactions);
      setBalanceGrowthPct(data.balanceGrowthPct);

    } catch (error: unknown) {
      log.error('useDashboard: Error fetching dashboard data', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    totalBalance,
    balanceGrowthPct,
    monthlyIncome,
    monthlyExpense,
    recentTransactions,
    fetchDashboardData,
  };
}

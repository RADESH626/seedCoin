import { useCallback, useState } from 'react';
import { log } from '../services/logger';
import { getTotalBalance } from '../services/AccountService';
import { 
  getMonthlyStats, 
  getRecentTransactionsWithCategory 
} from '../services/TransactionService';
import type { RecentTransaction } from '../database/types';

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
      
      const balance = await getTotalBalance();
      setTotalBalance(balance);

      const stats = await getMonthlyStats();
      setMonthlyIncome(stats.total_income);
      setMonthlyExpense(stats.total_expense);

      const txs = await getRecentTransactionsWithCategory();
      setRecentTransactions(txs);

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

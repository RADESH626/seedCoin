import { useQuery } from '@tanstack/react-query';
import { getDashboardSummary } from '../api/dashboard.api';
import type { RecentTransaction } from '@/src/modules/transactions/types';

export interface DashboardSummary {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpense: number;
  recentTransactions: RecentTransaction[];
  balanceGrowthPct: number;
}

export const useDashboardData = () => {
  return useQuery<DashboardSummary>({
    queryKey: ['dashboard', 'summary'],
    queryFn: getDashboardSummary,
    staleTime: 1000 * 60 * 2, // 2 minutos
  });
};


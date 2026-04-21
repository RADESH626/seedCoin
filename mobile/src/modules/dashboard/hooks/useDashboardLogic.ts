import { useCallback, useEffect } from 'react';
import { useFocusEffect } from 'expo-router';
import { log } from '@/src/services/logger';
import { useDashboardData } from '@/src/modules/dashboard';
import { useAccounts } from '@/src/hooks/useAccounts';

export function useDashboardLogic() {
  const { data, isLoading, refetch: refetchDashboard } = useDashboardData();
  const { accounts, fetchAccounts } = useAccounts();

  useFocusEffect(
    useCallback(() => {
      log.info('useDashboardLogic: Enfocado. Cargando datos...');
      refetchDashboard();
      fetchAccounts();
    }, [refetchDashboard, fetchAccounts])
  );

  useEffect(() => {
    log.debug('useDashboardLogic: Estado actualizado', { isLoading, accountsCount: accounts.length });
  }, [isLoading, accounts]);

  const dashboardData = {
    totalBalance: data?.totalBalance ?? 0,
    balanceGrowthPct: data?.balanceGrowthPct ?? 0,
    monthlyIncome: data?.monthlyIncome ?? 0,
    monthlyExpense: data?.monthlyExpense ?? 0,
    recentTransactions: data?.recentTransactions ?? [],
  };

  const shouldRedirectToOnboarding = !isLoading && accounts.length === 0;

  return {
    state: {
      isLoading,
      accounts,
      dashboardData,
      shouldRedirectToOnboarding,
    },
    handlers: {
      refetchDashboard,
    }
  };
}

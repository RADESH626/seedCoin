import { useCallback, useEffect } from 'react';
import { useFocusEffect } from 'expo-router';
import { log } from '@/src/shared/services/logger';
import { useDashboardData } from './useDashboardQuery';
import { useAccounts } from '@/src/modules/accounts/hooks/useAccounts';

export function useDashboardLogic() {
  const { data, isLoading: isDashboardLoading, refetch: refetchDashboard } = useDashboardData();
  const { accounts, fetchAccounts, isInitialLoad, loading: isAccountsLoading } = useAccounts();

  useFocusEffect(
    useCallback(() => {
      log.info('useDashboardLogic: Enfocado. Cargando datos...');
      refetchDashboard();
      fetchAccounts();
    }, [refetchDashboard, fetchAccounts])
  );

  useEffect(() => {
    log.debug('useDashboardLogic: Estado actualizado', { 
      isDashboardLoading, 
      isAccountsLoading,
      isInitialLoad,
      accountsCount: accounts.length 
    });
  }, [isDashboardLoading, isAccountsLoading, isInitialLoad, accounts]);

  const dashboardData = {
    totalBalance: data?.totalBalance ?? 0,
    balanceGrowthPct: data?.balanceGrowthPct ?? 0,
    monthlyIncome: data?.monthlyIncome ?? 0,
    monthlyExpense: data?.monthlyExpense ?? 0,
    recentTransactions: data?.recentTransactions ?? [],
  };

  const isLoading = isDashboardLoading || isAccountsLoading || isInitialLoad;
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


import { useCallback, useEffect } from 'react';
import { log } from '@/src/services/logger';
import { View, ScrollView } from 'react-native';
import { useFocusEffect, Redirect } from 'expo-router';
import { useDashboard } from '@/src/hooks/useDashboard';
import { useAccounts } from '@/src/hooks/useAccounts';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { TotalBalanceCard } from '@/components/dashboard/TotalBalanceCard';
import { MonthlySummary } from '@/components/dashboard/MonthlySummary';
import { QuickAccounts } from '@/components/dashboard/QuickAccounts';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { BackgroundAtmosphere } from '@/components/ui/BackgroundAtmosphere';
import { LoadingOverlay } from '@/components/ui/LoadingOverlay';

export default function IndexRoute() {
  const { loading, totalBalance, balanceGrowthPct, monthlyIncome, monthlyExpense, recentTransactions, fetchDashboardData } = useDashboard();
  const { accounts, fetchAccounts } = useAccounts();

  useFocusEffect(
    useCallback(() => {
      log.info('IndexRoute: Enfocado. Cargando datos del dashboard...');
      fetchDashboardData();
      fetchAccounts();
    }, [fetchDashboardData, fetchAccounts])
  );

  useEffect(() => {
    log.debug('IndexRoute: Cambio de estado detectado', { loading, accountsCount: accounts.length });
  }, [loading, accounts]);

  // Redirigir a estado Cero (Onboarding)
  if (!loading && accounts.length === 0) {
    return <Redirect href={"/onboarding" as any} />;
  }

  return (
    <View className="flex-1 bg-dark-900">
      <BackgroundAtmosphere />

      <DashboardHeader />

      {loading ? (
        <LoadingOverlay message="Actualizando balance..." />
      ) : (
        <ScrollView
          contentContainerClassName="px-6 pt-4 pb-32 gap-6"
          showsVerticalScrollIndicator={false}
        >
          <TotalBalanceCard totalBalance={totalBalance} balanceGrowthPct={balanceGrowthPct} />
          <MonthlySummary monthlyIncome={monthlyIncome} monthlyExpense={monthlyExpense} />
          <QuickAccounts accounts={accounts} />
          <RecentTransactions recentTransactions={recentTransactions} />
        </ScrollView>
      )}
    </View>
  );
}

import { View, ScrollView } from 'react-native';
import { Redirect } from 'expo-router';

import { useDashboardLogic } from '@/src/modules/dashboard/hooks/useDashboardLogic';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { TotalBalanceCard } from '@/src/modules/dashboard/components/TotalBalanceCard';
import { MonthlySummary } from '@/src/modules/dashboard/components/MonthlySummary';
import { QuickAccounts } from '@/src/modules/dashboard/components/QuickAccounts';
import { RecentTransactions } from '@/src/modules/dashboard/components/RecentTransactions';
import { BackgroundAtmosphere } from '@/components/ui/BackgroundAtmosphere';
import { LoadingOverlay } from '@/components/ui/LoadingOverlay';

export default function IndexRoute() {
  const { state } = useDashboardLogic();
  const { dashboardData, accounts, isLoading, shouldRedirectToOnboarding } = state;

  if (shouldRedirectToOnboarding) {
    return <Redirect href={"/onboarding" as any} />;
  }

  return (
    <View className="flex-1 bg-dark-900">
      <BackgroundAtmosphere />

      <DashboardHeader />

      {isLoading ? (
        <LoadingOverlay message="Actualizando balance..." />
      ) : (
        <ScrollView
          contentContainerClassName="standard-screen-px pt-4 pb-32 gap-6"
          showsVerticalScrollIndicator={false}
        >
          <TotalBalanceCard 
            totalBalance={dashboardData.totalBalance} 
            balanceGrowthPct={dashboardData.balanceGrowthPct} 
          />
          <MonthlySummary 
            monthlyIncome={dashboardData.monthlyIncome} 
            monthlyExpense={dashboardData.monthlyExpense} 
          />
          <QuickAccounts accounts={accounts} />
          <RecentTransactions recentTransactions={dashboardData.recentTransactions} />
        </ScrollView>
      )}
    </View>
  );
}

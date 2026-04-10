import React, { useCallback, useEffect } from 'react';
import { log } from '@/src/services/logger';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { useFocusEffect, Redirect, router } from 'expo-router';
import Colors from '@/constants/Colors';
import { useDashboard, useAccounts } from '@/src/database/hooks';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { TotalBalanceCard } from '@/components/dashboard/TotalBalanceCard';
import { MonthlySummary } from '@/components/dashboard/MonthlySummary';
import { QuickAccounts } from '@/components/dashboard/QuickAccounts';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';

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
      <View className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] rounded-full bg-seed-600/15 scale-150 pointer-events-none" />

      <DashboardHeader />

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={Colors.seed[500]} />
        </View>
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

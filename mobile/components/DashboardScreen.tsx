import React, { useCallback } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { useFocusEffect } from 'expo-router';
import Colors from '@/constants/Colors';
import { useDashboard, useAccounts } from '@/src/database/hooks';
import { OnboardingView } from '@/components/OnboardingView';
import { DashboardHeader } from '@/components/DashboardHeader';
import { TotalBalanceCard } from '@/components/TotalBalanceCard';
import { MonthlySummary } from '@/components/MonthlySummary';
import { QuickAccounts } from '@/components/QuickAccounts';
import { RecentTransactions } from '@/components/RecentTransactions';

export function DashboardScreen() {
  // Custom Hooks conectados a SQLite
  const { loading, totalBalance, balanceGrowthPct, monthlyIncome, monthlyExpense, recentTransactions, fetchDashboardData } = useDashboard();
  const { accounts, fetchAccounts } = useAccounts();

  useFocusEffect(
    useCallback(() => {
      fetchDashboardData();
      fetchAccounts();
    }, [fetchDashboardData, fetchAccounts])
  );

  // Estado Cero (Onboarding)
  if (!loading && accounts.length === 0) {
    return <OnboardingView />;
  }

  return (
    <View className="flex-1 bg-dark-900">
      <View className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] rounded-full bg-seed-600/15 scale-150 pointer-events-none" />

      {/* Header Extraído */}
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
          {/* Tarjeta Saldo Total Dinámica */}
          <TotalBalanceCard totalBalance={totalBalance} balanceGrowthPct={balanceGrowthPct} />

          {/* Ingresos y Gastos de Este Mes (Dinámicos) */}
          <MonthlySummary monthlyIncome={monthlyIncome} monthlyExpense={monthlyExpense} />

          {/* Cuentas Rápidas Dinámicas */}
          <QuickAccounts accounts={accounts} />

          {/* Transacciones Recientes Dinámicas */}
          <RecentTransactions recentTransactions={recentTransactions} />

        </ScrollView>
      )}
    </View>
  );
}

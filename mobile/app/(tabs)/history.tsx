import { useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTransactions } from '@/src/hooks/useTransactions';
import { log } from '@/src/services/logger';
import { groupTransactionsByDate } from '@/src/helpers/transactions';
import type { FilterType } from '@/src/database/types';

import { HistoryFilters } from '@/components/transactions/HistoryFilters';
import { TransactionGroup } from '@/components/transactions/TransactionGroup';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { LoadingOverlay } from '@/components/ui/LoadingOverlay';

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();
  const { history, fetchHistory, loading } = useTransactions();
  const [activeFilter, setActiveFilter] = useState<FilterType>('ALL');

  useFocusEffect(
    useCallback(() => {
      log.info('HistoryScreen: Enfocado. Recargando historial...');
      fetchHistory();
    }, [fetchHistory])
  );

  // Filtrado de datos
  const filteredHistory = useMemo(() => {
    if (activeFilter === 'ALL') return history;
    const isIncomeTarget = activeFilter === 'INCOME' ? 1 : 0;
    return history.filter(tx => tx.is_income === isIncomeTarget);
  }, [history, activeFilter]);

  // Agrupación por fechas (Etiqueta -> Transacciones) - Delegada al Helper
  const groupedHistory = useMemo(() => {
    return groupTransactionsByDate(filteredHistory);
  }, [filteredHistory]);

  const groupKeys = Object.keys(groupedHistory);

  return (
    <View className="flex-1 bg-dark-900">
      <View
        className="px-6"
        style={{ paddingTop: Math.max(insets.top, 24) }}
      >
        <ScreenHeader title="Historial" subtitle="Tus movimientos financieros">
          <HistoryFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </ScreenHeader>
      </View>

      <ScrollView
        className="flex-1 px-6 pb-32"
        showsVerticalScrollIndicator={false}
      >
        {loading && history.length === 0 ? (
          <LoadingOverlay message="Cargando movimientos..." />
        ) : groupKeys.length === 0 ? (
          <View className="py-20 items-center opacity-50">
            <Text className="text-gray-400 text-sm">No se encontraron movimientos</Text>
          </View>
        ) : (
          groupKeys.map((date) => (
            <TransactionGroup
              key={date}
              dateLabel={date}
              transactions={groupedHistory[date]}
            />
          ))
        )}
        <View className="h-32" />
      </ScrollView>
    </View>
  );
}

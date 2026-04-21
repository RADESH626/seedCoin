import { useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useDetailedTransactions } from '@/src/modules/transactions';
import { log } from '@/src/services/logger';
import { groupTransactionsByDate } from '@/src/helpers/transactions';
import type { FilterType } from '@/src/database/types';

import { HistoryFilters } from '@/src/modules/transactions/components/HistoryFilters';
import { TransactionGroup } from '@/src/modules/transactions/components/TransactionGroup';

import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { LoadingOverlay } from '@/components/ui/LoadingOverlay';

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();
  const { data: history = [], isPending, refetch } = useDetailedTransactions();
  const [activeFilter, setActiveFilter] = useState<FilterType>('ALL');

  useFocusEffect(
    useCallback(() => {
      log.info('HistoryScreen: Enfocado. Recargando historial...');
      refetch();
    }, [refetch])
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
        className="standard-screen-px"
        style={{ paddingTop: Math.max(insets.top, 24) }}
      >
        <ScreenHeader title="Historial" subtitle="Tus movimientos financieros" />
        <HistoryFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

      </View>

      <ScrollView
        className="flex-1 standard-screen-px pb-32"
        showsVerticalScrollIndicator={false}
      >
        {isPending && history.length === 0 ? (

          <LoadingOverlay message="Cargando movimientos..." />
        ) : groupKeys.length === 0 ? (
          <View className="py-20 items-center opacity-50">
            <Text className="text-body-sm">No se encontraron movimientos</Text>
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

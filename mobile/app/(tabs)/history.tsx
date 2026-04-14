import { useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTransactions } from '@/src/hooks/useTransactions';
import { log } from '@/src/services/logger';
import Colors from '@/constants/Colors';
import { getDateLabel } from '@/src/helpers/date';
import type { DetailedTransaction, FilterType } from '@/src/database/types';

import { HistoryFilters } from '@/components/transactions/HistoryFilters';
import { TransactionGroup } from '@/components/transactions/TransactionGroup';

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

  // Agrupación por fechas (Etiqueta -> Transacciones)
  const groupedHistory = useMemo(() => {
    const groups: Record<string, DetailedTransaction[]> = {};

    filteredHistory.forEach(tx => {
      const dateLabel = getDateLabel(tx.transaction_date);
      if (!groups[dateLabel]) groups[dateLabel] = [];
      groups[dateLabel].push(tx);
    });

    return groups;
  }, [filteredHistory]);

  const groupKeys = Object.keys(groupedHistory);

  return (
    <View className="flex-1 bg-dark-900">
      <View
        className="px-6"
        style={{ paddingTop: Math.max(insets.top, 24) }}
      >
        <Text className="text-white text-2xl font-bold mb-6">Historial</Text>

        <HistoryFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </View>

      <ScrollView
        className="flex-1 px-6 pb-32"
        showsVerticalScrollIndicator={false}
      >
        {loading && history.length === 0 ? (
          <View className="py-20 items-center">
            <ActivityIndicator color={Colors.seed[400]} />
            <Text className="text-gray-500 text-xs mt-4">Cargando movimientos...</Text>
          </View>
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

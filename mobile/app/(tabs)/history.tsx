import { useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Filter, ArrowUpCircle, ArrowDownCircle, ListFilter } from 'lucide-react-native';

import { useTransactionsHistory } from '@/src/database/hooks';
import { TransactionItem } from '@/components/transactions/TransactionItem';
import { log } from '@/src/services/logger';
import Colors from '@/constants/Colors';
import type { DetailedTransaction } from '@/src/database/types';

type FilterType = 'ALL' | 'INCOME' | 'EXPENSE';

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();
  const { history, fetchHistory, loading } = useTransactionsHistory();
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
    if (activeFilter === 'INCOME') return history.filter(tx => tx.is_income === 1);
    if (activeFilter === 'EXPENSE') return history.filter(tx => tx.is_income === 0);
    return history;
  }, [history, activeFilter]);

  // Agrupación por fechas
  const groupedHistory = useMemo(() => {
    const groups: Record<string, DetailedTransaction[]> = {};
    
    filteredHistory.forEach(tx => {
      const dateObj = new Date(tx.transaction_date);
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);

      let dateLabel = dateObj.toLocaleDateString('es-CO', { 
        day: 'numeric', month: 'long', year: 'numeric' 
      });

      if (dateObj.toDateString() === today.toDateString()) {
        dateLabel = 'Hoy';
      } else if (dateObj.toDateString() === yesterday.toDateString()) {
        dateLabel = 'Ayer';
      }

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

        {/* Selectores de Filtro */}
        <View className="flex-row gap-2 mb-6">
          <Pressable 
            onPress={() => setActiveFilter('ALL')}
            className={`flex-row items-center gap-2 px-4 py-2 rounded-full border ${activeFilter === 'ALL' ? 'bg-seed-600 border-seed-400' : 'bg-dark-800 border-dark-700'}`}
          >
            <ListFilter size={14} color={activeFilter === 'ALL' ? '#fff' : '#9ca3af'} />
            <Text className={`text-xs font-bold ${activeFilter === 'ALL' ? 'text-white' : 'text-gray-400'}`}>Todos</Text>
          </Pressable>
          <Pressable 
            onPress={() => setActiveFilter('INCOME')}
            className={`flex-row items-center gap-2 px-4 py-2 rounded-full border ${activeFilter === 'INCOME' ? 'bg-green-600/20 border-green-500/50' : 'bg-dark-800 border-dark-700'}`}
          >
            <ArrowUpCircle size={14} color={activeFilter === 'INCOME' ? '#4ade80' : '#9ca3af'} />
            <Text className={`text-xs font-bold ${activeFilter === 'INCOME' ? 'text-green-400' : 'text-gray-400'}`}>Ingresos</Text>
          </Pressable>
          <Pressable 
            onPress={() => setActiveFilter('EXPENSE')}
            className={`flex-row items-center gap-2 px-4 py-2 rounded-full border ${activeFilter === 'EXPENSE' ? 'bg-red-600/20 border-red-500/50' : 'bg-dark-800 border-dark-700'}`}
          >
            <ArrowDownCircle size={14} color={activeFilter === 'EXPENSE' ? '#f87171' : '#9ca3af'} />
            <Text className={`text-xs font-bold ${activeFilter === 'EXPENSE' ? 'text-red-400' : 'text-gray-400'}`}>Gastos</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 pb-32" showsVerticalScrollIndicator={false}>
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
            <View key={date} className="mb-6">
              <Text className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3 ml-1">
                {date}
              </Text>
              <View className="bg-dark-800 border border-dark-700 rounded-3xl overflow-hidden">
                {groupedHistory[date].map((tx, index) => (
                  <View key={tx.transaction_id}>
                    <TransactionItem transaction={tx} showAccountName={true} />
                    {index < groupedHistory[date].length - 1 && (
                      <View className="h-[0.5px] bg-dark-700 mx-4" />
                    )}
                  </View>
                ))}
              </View>
            </View>
          ))
        )}
        <View className="h-32" />
      </ScrollView>
    </View>
  );
}

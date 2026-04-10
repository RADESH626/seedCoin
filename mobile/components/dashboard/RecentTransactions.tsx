import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { formatMoney } from '@/src/helpers/ui';
import { TransactionItem } from '../transactions/TransactionItem';

interface Props {
  recentTransactions: any[];
}

export function RecentTransactions({ recentTransactions }: Props) {
  return (
    <View className="gap-3">
      <View className="flex-row justify-between items-center">
        <Text className="text-xs font-bold text-gray-300 uppercase tracking-widest">Actividad Reciente</Text>
        <Pressable>
          <Text className="text-xs font-bold text-seed-400">Ver todo</Text>
        </Pressable>
      </View>

      <View className="bg-dark-800 border border-dark-700 rounded-2xl p-2">

        {recentTransactions.length === 0 ? (
          <View className="p-4 items-center justify-center opacity-50">
            <Text className="text-xs text-gray-400">No hay actividad reciente</Text>
          </View>
        ) : (
          recentTransactions.map((tx, index) => {
            const isLast = index === recentTransactions.length - 1;
            const isIncome = tx.is_income === 1;
            // Usar rgba para el fondo del ícono con opacidad (usamos hex + 33 que es ~20%)
            const iconBgStyle = { backgroundColor: `${tx.category_color}33` };
            const txDate = new Date(tx.transaction_date).toLocaleDateString();

            return (
              <React.Fragment key={tx.transaction_id}>
                <TransactionItem transaction={tx} />
                {!isLast && <View className="h-px bg-dark-700 mx-3" />}
              </React.Fragment>
            );
          })
        )}

      </View>
    </View>
  );
}

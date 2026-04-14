import { Fragment } from 'react';
import { View, Text, Pressable } from 'react-native';
import { formatMoney } from '@/src/helpers/currency';
import { TransactionItem } from '../transactions/TransactionItem';
import type { RecentTransaction } from '@/src/database/types';

interface Props {
  recentTransactions: RecentTransaction[];
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
            
            return (
              <Fragment key={tx.transaction_id}>
                <TransactionItem transaction={tx} />
                {!isLast && <View className="h-px bg-dark-700 mx-3" />}
              </Fragment>
            );
          })
        )}

      </View>
    </View>
  );
}

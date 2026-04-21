import { Fragment } from 'react';
import { View, Text } from 'react-native';
import { TransactionItem } from '@/src/modules/transactions/components/TransactionItem';

import { SectionHeader } from '../ui/SectionHeader';
import { router } from 'expo-router';
import type { RecentTransaction } from '@/src/database/types';

interface Props {
  recentTransactions: RecentTransaction[];
}

/**
 * Componente del Dashboard para visualizar los últimos movimientos.
 * Utiliza SectionHeader para mantener la consistencia visual.
 */
export function RecentTransactions({ recentTransactions }: Props) {
  return (
    <View className="gap-3">
      <SectionHeader 
        title="Actividad Reciente" 
        actionLabel="Ver todo" 
        onActionPress={() => router.push('/history')}
      />

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

import { View, Text } from 'react-native';
import { TransactionItem } from './TransactionItem';
import type { DetailedTransaction } from '@/src/database/types';

interface TransactionGroupProps {
  dateLabel: string;
  transactions: DetailedTransaction[];
}

export function TransactionGroup({ dateLabel, transactions }: TransactionGroupProps) {
  return (
    <View className="mb-6">
      <Text className="text-[11px] font-black text-zinc-500 uppercase tracking-widest mb-3 ml-1">
        {dateLabel}
      </Text>
      <View className="bg-dark-800 border border-dark-700 rounded-3xl overflow-hidden">
        {transactions.map((tx, index) => (
          <View key={tx.transaction_id}>
            <TransactionItem transaction={tx} showAccountName={true} />
            {index < transactions.length - 1 && (
              <View className="h-[0.5px] bg-dark-700 mx-4" />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

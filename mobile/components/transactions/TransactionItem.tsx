import React from 'react';
import { View, Text } from 'react-native';
import { getCategoryIcon, formatMoney } from '@/src/helpers/ui';

interface Props {
  transaction: {
    transaction_id: number;
    amount: number;
    is_income: number;
    transaction_date: string;
    description: string;
    category_name: string;
    category_icon: string;
    category_color: string;
    account_name?: string;
  };
  showAccountName?: boolean;
}

export function TransactionItem({ transaction: tx, showAccountName = false }: Props) {
  const isIncome = tx.is_income === 1;
  const iconBgStyle = { backgroundColor: `${tx.category_color}33` };
  const txDate = new Date(tx.transaction_date);

  return (
    <View className="flex-row justify-between items-center p-3">
      <View className="flex-row items-center gap-3">
        <View className="w-10 h-10 rounded-full items-center justify-center" style={iconBgStyle}>
          {getCategoryIcon(tx.category_icon, tx.category_color, 20)}
        </View>
        <View>
          <Text className="font-bold text-sm text-white">{tx.category_name}</Text>
          <Text className="text-[11px] text-gray-400 mt-0.5" numberOfLines={1}>
            {tx.description ? `${tx.description} • ` : ''}
            {showAccountName && tx.account_name ? `${tx.account_name} • ` : ''}
            {txDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>
      <View className="items-end">
        <Text className={`font-bold text-sm ${isIncome ? 'text-green-400' : 'text-white'}`}>
          {isIncome ? '+' : '-'}{formatMoney(tx.amount, 'COP')}
        </Text>
      </View>
    </View>
  );
}

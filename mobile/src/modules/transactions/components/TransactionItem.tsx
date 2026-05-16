import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { getCategoryIcon } from '@/src/shared/utils/ui';
import { formatMoney } from '@/src/shared/utils/currency';
import { getTimeLabel } from '@/src/shared/utils/date';
import type { RecentTransaction } from '@/src/database/types';

interface Props {
  transaction: RecentTransaction;
  showAccountName?: boolean;
}

/**
 * Atomo para representar un movimiento individual en listas.
 * Utiliza tipado estricto del dominio y delegación de formateo.
 */
export function TransactionItem({ transaction: tx, showAccountName = false }: Props) {
  const isIncome = tx.is_income === 1;
  const safeColor = tx.category_color || '#9ca3af'; // Gris por defecto si no hay color
  const iconBgStyle = { backgroundColor: `${safeColor}33` };

  const handlePress = () => {
    router.push({
      pathname: '/add-transaction',
      params: { id: tx.transaction_id.toString() }
    });
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
      className="flex-row justify-between items-center p-3"
    >
      <View className="flex-row items-center gap-3 flex-1">
        <View className="size-10 rounded-full items-center justify-center" style={iconBgStyle}>
          {getCategoryIcon(tx.category_icon || 'default', safeColor, 20)}
        </View>
        <View className="flex-1">
          <Text className="font-bold text-sm text-white" numberOfLines={1}>
            {tx.description || tx.category_name}
          </Text>
          <Text className="text-[11px] text-zinc-400 mt-0.5" numberOfLines={1}>
            {tx.description ? `${tx.category_name} • ` : ''}
            {showAccountName && tx.account_name ? `${tx.account_name} • ` : ''}
            {getTimeLabel(tx.transaction_date)}
          </Text>
        </View>
      </View>
      <View className="items-end ml-2">
        <Text className={`font-bold text-sm ${isIncome ? 'text-green-400' : 'text-white'}`}>
          {isIncome ? '+' : '-'}{formatMoney(tx.amount, 'COP')}
        </Text>
      </View>
    </Pressable>
  );
}


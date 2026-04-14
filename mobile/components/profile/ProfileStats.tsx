import { View, Text } from 'react-native';
import { formatMoney } from '@/src/helpers/currency';

interface ProfileStatsProps {
  totalCapital: number;
  accountsCount: number;
}

export function ProfileStats({ totalCapital, accountsCount }: ProfileStatsProps) {
  return (
    <View className="flex-row gap-4 mb-8">
      <View className="flex-1 bg-dark-800 border border-dark-700 rounded-3xl p-4">
        <Text className="text-gray-500 text-[10px] font-bold uppercase mb-1">Capital Total</Text>
        <Text className="text-white font-bold text-lg">{formatMoney(totalCapital, 'COP')}</Text>
      </View>
      <View className="flex-1 bg-dark-800 border border-dark-700 rounded-3xl p-4">
        <Text className="text-gray-500 text-[10px] font-bold uppercase mb-1">Cuentas</Text>
        <Text className="text-white font-bold text-lg">{accountsCount}</Text>
      </View>
    </View>
  );
}

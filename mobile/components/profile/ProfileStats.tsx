import { View, Text } from 'react-native';
import { formatMoney } from '@/src/helpers/currency';
import { Card } from '@/components/ui/Card';

interface ProfileStatsProps {
  totalCapital: number;
  accountsCount: number;
}

export function ProfileStats({ totalCapital, accountsCount }: ProfileStatsProps) {
  return (
    <View className="flex-row gap-4 mb-8">
      <Card padding="md" rounded="3xl" className="flex-1">
        <Text className="text-gray-500 text-[10px] font-bold uppercase mb-1">Capital Total</Text>
        <Text className="text-white font-bold text-lg">{formatMoney(totalCapital, 'COP')}</Text>
      </Card>
      <Card padding="md" rounded="3xl" className="flex-1">
        <Text className="text-gray-500 text-[10px] font-bold uppercase mb-1">Cuentas</Text>
        <Text className="text-white font-bold text-lg">{accountsCount}</Text>
      </Card>
    </View>
  );
}

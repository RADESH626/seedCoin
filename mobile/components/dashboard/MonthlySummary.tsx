import { View, Text } from 'react-native';
import { ArrowDown, ArrowUp } from 'lucide-react-native';
import { formatMoney } from '@/src/helpers/currency';

interface Props {
  monthlyIncome: number;
  monthlyExpense: number;
}

export function MonthlySummary({ monthlyIncome, monthlyExpense }: Props) {
  return (
    <View className="flex-row gap-4">
      <View className="flex-1 bg-dark-800 border border-dark-700 rounded-2xl p-4 flex-row items-center gap-3">
        <View className="w-10 h-10 rounded-full bg-green-500/20 items-center justify-center">
          <ArrowDown color="#4ade80" size={20} />
        </View>
        <View>
          <Text className="text-[10px] text-gray-400 font-medium">Ingresos Mes</Text>
          <Text className="font-bold text-white text-sm mt-0.5">{formatMoney(monthlyIncome, 'COP')}</Text>
        </View>
      </View>
      <View className="flex-1 bg-dark-800 border border-dark-700 rounded-2xl p-4 flex-row items-center gap-3">
        <View className="w-10 h-10 rounded-full bg-red-500/20 items-center justify-center">
          <ArrowUp color="#f87171" size={20} />
        </View>
        <View>
          <Text className="text-[10px] text-gray-400 font-medium">Gastos Mes</Text>
          <Text className="font-bold text-white text-sm mt-0.5">{formatMoney(monthlyExpense, 'COP')}</Text>
        </View>
      </View>
    </View>
  );
}

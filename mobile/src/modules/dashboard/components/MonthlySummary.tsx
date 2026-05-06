import { View, Text } from 'react-native';
import { ArrowDown, ArrowUp } from 'lucide-react-native';
import { formatMoney } from '@/src/shared/utils/currency';
import { Card } from '@/components/ui/Card';
import { IconBadge } from '@/components/ui/IconBadge';

interface Props {
  monthlyIncome: number;
  monthlyExpense: number;
}

export function MonthlySummary({ monthlyIncome, monthlyExpense }: Props) {
  return (
    <View className="flex-row gap-4">
      <Card padding="md" rounded="2xl" className="flex-1 flex-row items-center gap-3">
        <IconBadge color="green">
          <ArrowDown color="#4ade80" size={20} />
        </IconBadge>
        <View>
          <Text className="text-[10px] text-gray-400 font-medium">Ingresos Mes</Text>
          <Text className="font-bold text-white text-sm mt-0.5">{formatMoney(monthlyIncome, 'COP')}</Text>
        </View>
      </Card>
      <Card padding="md" rounded="2xl" className="flex-1 flex-row items-center gap-3">
        <IconBadge color="red">
          <ArrowUp color="#f87171" size={20} />
        </IconBadge>
        <View>
          <Text className="text-[10px] text-gray-400 font-medium">Gastos Mes</Text>
          <Text className="font-bold text-white text-sm mt-0.5">{formatMoney(monthlyExpense, 'COP')}</Text>
        </View>
      </Card>
    </View>
  );
}


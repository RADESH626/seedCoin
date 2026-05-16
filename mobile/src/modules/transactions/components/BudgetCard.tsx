import { View, Text } from 'react-native';
import { getCategoryIcon } from '@/src/shared/utils/ui';
import { formatMoney } from '@/src/shared/utils/currency';
import type { BudgetWithProgress } from '@/src/database/types';
import { Card } from '@/components/ui/Card';
import { IconBadge } from '@/components/ui/IconBadge';


interface Props {
  budget: BudgetWithProgress;
  onEdit?: (budget: BudgetWithProgress) => void;
}

export function BudgetCard({ budget, onEdit }: Props) {

  const percentage = Math.min((budget.total_spent / budget.limit_amount) * 100, 100);
  const remaining = Math.max(budget.limit_amount - budget.total_spent, 0);
  
  // Color del semáforo
  let progressColor = '#10b981'; // Verde (Default)
  if (percentage >= 90) {
    progressColor = '#ef4444'; // Rojo (>90%)
  } else if (percentage >= 70) {
    progressColor = '#f59e0b'; // Naranja (>70%)
  }

  return (
    <Card 
      onPress={() => onEdit?.(budget)}
      rounded="extra"
      padding="lg"
      className="mb-4"
    >
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-center gap-3">
          <IconBadge 
            color="custom"
            className="rounded-2xl" 
            style={{ backgroundColor: `${budget.category_color}22` }}
          >
            {getCategoryIcon(budget.category_icon, budget.category_color, 20)}
          </IconBadge>
          <View>
            <Text className="text-white font-bold text-sm">{budget.category_name}</Text>
            <Text className="text-zinc-500 text-[10px] uppercase font-black tracking-widest">Mensual</Text>
          </View>
        </View>
        <View className="items-end mr-1">
          <Text className="text-white font-black text-sm">{formatMoney(budget.limit_amount, 'COP')}</Text>
          <Text className="text-zinc-500 text-[10px]">Límite</Text>
        </View>
      </View>


      {/* Barra de Progreso */}
      <View className="h-2 w-full bg-dark-700 rounded-full overflow-hidden mb-3">
        <View 
          className="h-full rounded-full" 
          style={{ width: `${percentage}%`, backgroundColor: progressColor }}
        />
      </View>

      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-zinc-400 text-[11px]">Consumido: <Text className="text-white font-bold">{formatMoney(budget.total_spent, 'COP')}</Text></Text>
        </View>
        <View className="bg-dark-900 px-3 py-1 rounded-full border border-dark-700">
          <Text className="text-[10px] font-bold" style={{ color: progressColor }}>
            {percentage >= 100 ? 'Límite alcanzado' : `Resta: ${formatMoney(remaining, 'COP')}`}
          </Text>
        </View>
      </View>
    </Card>
  );

}


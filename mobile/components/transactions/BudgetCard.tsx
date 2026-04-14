import { View, Text } from 'react-native';
import { getCategoryIcon, formatMoney } from '@/src/helpers/ui';

interface Props {
  budget: {
    budget_id: number;
    limit_amount: number;
    total_spent: number;
    category_name: string;
    category_icon: string;
    category_color: string;
  };
}

export function BudgetCard({ budget }: Props) {
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
    <View className="bg-dark-800 border border-dark-700 rounded-[32px] p-5 mb-4">
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-center gap-3">
          <View 
            className="w-10 h-10 rounded-2xl items-center justify-center" 
            style={{ backgroundColor: `${budget.category_color}22` }}
          >
            {getCategoryIcon(budget.category_icon, budget.category_color, 20)}
          </View>
          <View>
            <Text className="text-white font-bold text-sm">{budget.category_name}</Text>
            <Text className="text-gray-500 text-[10px] uppercase font-black tracking-widest">Mensual</Text>
          </View>
        </View>
        <View className="items-end">
          <Text className="text-white font-black text-sm">{formatMoney(budget.limit_amount, 'COP')}</Text>
          <Text className="text-gray-500 text-[10px]">Límite</Text>
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
          <Text className="text-gray-400 text-[11px]">Consumido: <Text className="text-white font-bold">{formatMoney(budget.total_spent, 'COP')}</Text></Text>
        </View>
        <View className="bg-dark-900 px-3 py-1 rounded-full border border-dark-700">
          <Text className="text-[10px] font-bold" style={{ color: progressColor }}>
            {percentage >= 100 ? 'Límite alcanzado' : `Resta: ${formatMoney(remaining, 'COP')}`}
          </Text>
        </View>
      </View>
    </View>
  );
}

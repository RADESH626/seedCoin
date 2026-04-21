import { View, Text, Pressable, ScrollView } from 'react-native';
import { ListFilter, ArrowUpCircle, ArrowDownCircle } from 'lucide-react-native';
import type { FilterType } from '@/src/database/types';

interface HistoryFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function HistoryFilters({ activeFilter, onFilterChange }: HistoryFiltersProps) {
  return (
    <View className="mb-6">
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8 }}
      >
        <Pressable 
          onPress={() => onFilterChange('ALL')}
          className={`flex-row items-center gap-2 px-4 py-2 rounded-full border ${activeFilter === 'ALL' ? 'bg-seed-600 border-seed-400' : 'bg-dark-800 border-dark-700'}`}
        >
          <ListFilter size={14} color={activeFilter === 'ALL' ? '#fff' : '#9ca3af'} />
          <Text className={`text-xs font-bold ${activeFilter === 'ALL' ? 'text-white' : 'text-gray-400'}`}>Todos</Text>
        </Pressable>
        
        <Pressable 
          onPress={() => onFilterChange('INCOME')}
          className={`flex-row items-center gap-2 px-4 py-2 rounded-full border ${activeFilter === 'INCOME' ? 'bg-green-600/20 border-green-500/50' : 'bg-dark-800 border-dark-700'}`}
        >
          <ArrowUpCircle size={14} color={activeFilter === 'INCOME' ? '#4ade80' : '#9ca3af'} />
          <Text className={`text-xs font-bold ${activeFilter === 'INCOME' ? 'text-green-400' : 'text-gray-400'}`}>Ingresos</Text>
        </Pressable>
        
        <Pressable 
          onPress={() => onFilterChange('EXPENSE')}
          className={`flex-row items-center gap-2 px-4 py-2 rounded-full border ${activeFilter === 'EXPENSE' ? 'bg-red-600/20 border-red-500/50' : 'bg-dark-800 border-dark-700'}`}
        >
          <ArrowDownCircle size={14} color={activeFilter === 'EXPENSE' ? '#f87171' : '#9ca3af'} />
          <Text className={`text-xs font-bold ${activeFilter === 'EXPENSE' ? 'text-red-400' : 'text-gray-400'}`}>Gastos</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}


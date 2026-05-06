import { View, Text, Pressable } from 'react-native';
import { ArrowUpCircle, ArrowDownCircle, ArrowRightLeft } from 'lucide-react-native';
import Colors from '@/src/shared/constants/Colors';

export type TransactionMode = 'INCOME' | 'EXPENSE' | 'TRANSFER';

interface Props {
  mode: TransactionMode;
  onModeChange: (mode: TransactionMode) => void;
}

export function TransactionTypeSelector({ mode, onModeChange }: Props) {
  return (
    <View className="flex-row bg-dark-800 p-1 rounded-2xl mb-8 border border-dark-700">
      <Pressable 
        onPress={() => onModeChange('EXPENSE')}
        className={`flex-1 flex-row items-center justify-center py-3 rounded-xl gap-2 ${mode === 'EXPENSE' ? 'bg-red-500/20 border border-red-500/50' : ''}`}
      >
        <ArrowDownCircle size={18} color={mode === 'EXPENSE' ? '#ef4444' : '#9ca3af'} />
        <Text className={`font-bold ${mode === 'EXPENSE' ? 'text-red-400' : 'text-gray-400'}`}>Gasto</Text>
      </Pressable>

      <Pressable 
        onPress={() => onModeChange('INCOME')}
        className={`flex-1 flex-row items-center justify-center py-3 rounded-xl gap-2 ${mode === 'INCOME' ? 'bg-seed-500/20 border border-seed-500/50' : ''}`}
      >
        <ArrowUpCircle size={18} color={mode === 'INCOME' ? Colors.seed[400] : '#9ca3af'} />
        <Text className={`font-bold ${mode === 'INCOME' ? 'text-seed-400' : 'text-gray-400'}`}>Ingreso</Text>
      </Pressable>

      <Pressable 
        onPress={() => onModeChange('TRANSFER')}
        className={`flex-1 flex-row items-center justify-center py-3 rounded-xl gap-2 ${mode === 'TRANSFER' ? 'bg-blue-500/20 border border-blue-500/50' : ''}`}
      >
        <ArrowRightLeft size={18} color={mode === 'TRANSFER' ? '#3b82f6' : '#9ca3af'} />
        <Text className={`font-bold ${mode === 'TRANSFER' ? 'text-blue-400' : 'text-gray-400'}`}>Traspaso</Text>
      </Pressable>
    </View>
  );
}


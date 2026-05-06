import { View, Text, Pressable } from 'react-native';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react-native';
import Colors from '@/src/shared/constants/Colors';

interface Props {
  isIncome: boolean;
  onTypeChange: (isIncome: boolean) => void;
}

export function TransactionTypeSelector({ isIncome, onTypeChange }: Props) {
  return (
    <View className="flex-row bg-dark-800 p-1 rounded-2xl mb-8 border border-dark-700">
      <Pressable 
        onPress={() => onTypeChange(false)}
        className={`flex-1 flex-row items-center justify-center py-3 rounded-xl gap-2 ${!isIncome ? 'bg-red-500/20 border border-red-500/50' : ''}`}
      >
        <ArrowDownCircle size={18} color={!isIncome ? '#ef4444' : '#9ca3af'} />
        <Text className={`font-bold ${!isIncome ? 'text-red-400' : 'text-gray-400'}`}>Gasto</Text>
      </Pressable>
      <Pressable 
        onPress={() => onTypeChange(true)}
        className={`flex-1 flex-row items-center justify-center py-3 rounded-xl gap-2 ${isIncome ? 'bg-seed-500/20 border border-seed-500/50' : ''}`}
      >
        <ArrowUpCircle size={18} color={isIncome ? Colors.seed[400] : '#9ca3af'} />
        <Text className={`font-bold ${isIncome ? 'text-seed-400' : 'text-gray-400'}`}>Ingreso</Text>
      </Pressable>
    </View>
  );
}


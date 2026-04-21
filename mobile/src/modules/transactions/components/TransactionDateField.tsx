import { View, Text, TextInput } from 'react-native';
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { Card } from '@/components/ui/Card';

interface Props {
  date: Date;
  description: string;
  onDatePress: () => void;
  onDescriptionChange: (text: string) => void;
}

export function TransactionDateField({ date, description, onDatePress, onDescriptionChange }: Props) {
  return (
    <View className="flex-row gap-4 mb-8">
      <View className="flex-1">
        <Text className="text-gray-400 text-sm font-medium mb-3 ml-1">Fecha</Text>
        <Card 
          onPress={onDatePress}
          rounded="2xl"
          padding="md"
          className="flex-row items-center justify-between"
        >
          <View className="flex-row items-center gap-2">
            <CalendarIcon size={18} color={Colors.seed[400]} />
            <Text className="text-white font-medium">
              {date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
            </Text>
          </View>
          <ChevronDown size={16} color="#4b5563" />
        </Card>
      </View>
      
      <View className="flex-[1.5]">
        <Text className="text-gray-400 text-sm font-medium mb-3 ml-1">Descripción</Text>
        <TextInput
          className="bg-dark-800 border border-dark-700 rounded-2xl p-4 text-white font-medium"
          placeholder="Ej. Mercado mensual"
          placeholderTextColor="#4b5563"
          value={description}
          onChangeText={onDescriptionChange}
        />
      </View>
    </View>
  );
}

import { View, Text } from 'react-native';
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react-native';
import Colors from '@/src/shared/constants/Colors';
import { Card } from '@/components/ui/Card';

interface Props {
  date: Date;
  onDatePress: () => void;
}

export function TransactionDateField({ date, onDatePress }: Props) {
  return (
    <View className="mb-8">
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
  );
}

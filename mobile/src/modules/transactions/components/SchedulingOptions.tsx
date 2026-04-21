import { View, Text, Switch, Alert } from 'react-native';
import { ChevronDown, Zap, Clock } from 'lucide-react-native';
import { RecurrenceFrequency } from '@/src/database/types';
import Colors from '@/constants/Colors';
import { Card } from '@/components/ui/Card';
import { IconBadge } from '@/components/ui/IconBadge';

interface Props {
  frequency: RecurrenceFrequency | null;
  onFrequencyChange: (freq: RecurrenceFrequency | null) => void;
  isAutomatic: boolean;
  onAutomaticChange: (val: boolean) => void;
}

const FREQUENCIES: { label: string; value: RecurrenceFrequency | null }[] = [
  { label: 'No repetir', value: null },
  { label: 'Semanal', value: 'WEEKLY' },
  { label: 'Quincenal', value: 'BIWEEKLY' },
  { label: 'Mensual', value: 'MONTHLY' },
  { label: 'Anual', value: 'YEARLY' },
];

export function SchedulingOptions({ 
  frequency, 
  onFrequencyChange, 
  isAutomatic, 
  onAutomaticChange 
}: Props) {
  
  const showPicker = () => {
    Alert.alert(
      "Repetir movimiento",
      "Selecciona la frecuencia de recurrencia",
      [
        ...FREQUENCIES.map(f => ({
          text: f.label,
          onPress: () => onFrequencyChange(f.value),
          style: f.value === null ? 'destructive' : 'default' as any
        })),
        { text: "Cancelar", style: "cancel" }
      ]
    );
  };

  const selectedLabel = FREQUENCIES.find(f => f.value === frequency)?.label || 'No repetir';

  return (
    <View className="mb-8">
      <Text className="text-body-sm mb-3 ml-1">Repetir movimiento</Text>
      
      <Card
        onPress={showPicker}
        rounded="2xl"
        padding="md"
        className="flex-row items-center justify-between mb-4"
      >
        <View className="flex-row items-center gap-3">
          <Clock size={18} color={frequency ? Colors.seed[400] : '#64748b'} />
          <Text className={`font-medium ${frequency ? 'text-white' : 'text-gray-400'}`}>
            {selectedLabel}
          </Text>
        </View>
        <ChevronDown size={18} color="#64748b" />
      </Card>

      {frequency && (
        <Card rounded="2xl" padding="md" className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1 pr-4">
            <IconBadge color="blue" className="rounded-xl mr-3">
              <Zap size={18} color="#3b82f6" />
            </IconBadge>
            <View className="flex-1">
              <Text className="text-white font-medium">Auto-procesar</Text>
              <Text className="text-caption">
                {isAutomatic 
                  ? 'Se registrará automáticamente en la fecha.' 
                  : 'Requiere tu aprobación manual en cada fecha.'}
              </Text>
            </View>
          </View>
          <Switch
            value={isAutomatic}
            onValueChange={onAutomaticChange}
            trackColor={{ false: '#1e293b', true: '#3b82f6' }}
            thumbColor={isAutomatic ? '#fff' : '#94a3b8'}
          />
        </Card>
      )}
    </View>
  );
}

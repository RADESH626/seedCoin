import { View, Text, Switch } from 'react-native';
import { useState } from 'react';
import { ChevronDown, Zap, Clock } from 'lucide-react-native';
import { FrequencyPickerModal } from './FrequencyPickerModal';
import { RecurrenceFrequency } from '@/src/database/types';
import Colors from '@/src/shared/constants/Colors';
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
  
  const [modalVisible, setModalVisible] = useState(false);
  
  const showPicker = () => {
    setModalVisible(true);
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

      <FrequencyPickerModal 
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={onFrequencyChange}
        currentValue={frequency}
      />
    </View>
  );
}


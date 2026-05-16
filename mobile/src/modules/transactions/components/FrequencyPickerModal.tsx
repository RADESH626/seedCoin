import { View, Text, Modal, Pressable, FlatList } from 'react-native';
import { RecurrenceFrequency } from '@/src/database/types';
import { ModalHeader } from '@/components/ui/ModalHeader';
import { Clock } from 'lucide-react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (freq: RecurrenceFrequency | null) => void;
  currentValue: RecurrenceFrequency | null;
}

const FREQUENCIES: { label: string; value: RecurrenceFrequency | null }[] = [
  { label: 'No repetir', value: null },
  { label: 'Semanal', value: 'WEEKLY' },
  { label: 'Quincenal', value: 'BIWEEKLY' },
  { label: 'Mensual', value: 'MONTHLY' },
  { label: 'Anual', value: 'YEARLY' },
];

export function FrequencyPickerModal({ visible, onClose, onSelect, currentValue }: Props) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 justify-end bg-black/70">
        <View className="bg-dark-900 border-t border-dark-700 rounded-t-[40px] px-6 pt-2 pb-12">
          <View className="items-center mb-4">
            <View className="w-12 h-1 bg-dark-600 rounded-full" />
          </View>

          <ModalHeader 
            title="Repetir movimiento" 
            Icon={Clock} 
            onClose={onClose} 
          />

          <FlatList
            className="mt-4"
            data={FREQUENCIES}
            keyExtractor={(item) => item.label}
            renderItem={({ item: f }) => (
              <Pressable
                onPress={() => {
                  onSelect(f.value);
                  onClose();
                }}
                className={`p-4 mb-2 rounded-2xl border ${
                  currentValue === f.value 
                    ? 'bg-seed-600/20 border-seed-500' 
                    : 'bg-dark-800 border-dark-700'
                }`}
              >
                <Text className={`font-bold ${currentValue === f.value ? 'text-white' : 'text-zinc-400'}`}>
                  {f.label}
                </Text>
              </Pressable>
            )}
          />
        </View>
      </View>
    </Modal>
  );
}

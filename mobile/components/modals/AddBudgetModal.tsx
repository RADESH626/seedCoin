import { useState, useEffect } from 'react';
import { View, Text, Modal, Pressable, TextInput, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Target } from 'lucide-react-native';
import { useCategories } from '@/src/hooks/useCategories';
import { getCategoryIcon } from '@/src/helpers/ui';
import { log } from '@/src/services/logger';

// Componentes Atómicos
import { ModalHeader } from '../ui/ModalHeader';
import { PrimaryButton } from '../ui/PrimaryButton';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (categoryId: number, limit: number) => Promise<void>;
}

/**
 * Modal para la creación de un nuevo límite de presupuesto.
 * Implementa el patrón de diseño "Sheet" y utiliza átomos del sistema.
 */
export function AddBudgetModal({ visible, onClose, onSave }: Props) {
  const { categories, fetchExpensesCategories, loading } = useCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [limitAmount, setLimitAmount] = useState('');

  useEffect(() => {
    if (visible) {
      fetchExpensesCategories();
      setSelectedCategoryId(null);
      setLimitAmount('');
    }
  }, [visible, fetchExpensesCategories]);

  const handleSave = async () => {
    const amount = parseFloat(limitAmount) || 0;
    
    if (!selectedCategoryId) {
      Alert.alert('Incompleto', 'Por favor, selecciona una categoría para el límite.');
      return;
    }
    
    if (amount <= 0) {
      Alert.alert('Invalido', 'El monto del límite debe ser mayor a cero.');
      return;
    }

    try {
      await onSave(selectedCategoryId, amount);
      onClose();
    } catch (e) {
      log.error('AddBudgetModal: Error al guardar presupuesto', e);
      Alert.alert('Error', 'No se pudo activar el presupuesto seleccionado.');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView 
        className="flex-1" 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View className="flex-1 justify-end bg-black/70">
          <View className="bg-dark-900 border-t border-dark-700 rounded-t-[40px] px-6 pt-2 pb-12 max-h-[85%]">
            
            {/* Indicador de arrastre visual */}
            <View className="items-center mb-4">
              <View className="w-12 h-1 bg-dark-600 rounded-full" />
            </View>

            <ModalHeader 
              title="Añadir Límite" 
              Icon={Target} 
              onClose={onClose} 
            />

            <ScrollView showsVerticalScrollIndicator={false} className="mt-4">
              <Text className="text-gray-500 text-[10px] font-bold uppercase mb-4 tracking-[2px]">
                1. Seleccionar Categoría
              </Text>
              
              <View className="flex-row flex-wrap gap-2 mb-8">
                {categories.map((cat) => (
                  <Pressable
                    key={cat.category_id}
                    onPress={() => setSelectedCategoryId(cat.category_id)}
                    className={`flex-row items-center gap-2 px-5 py-3 rounded-2xl border ${
                      selectedCategoryId === cat.category_id 
                        ? 'bg-seed-600/20 border-seed-500' 
                        : 'bg-dark-800 border-dark-700'
                    }`}
                  >
                    {getCategoryIcon(cat.icon, selectedCategoryId === cat.category_id ? '#fff' : cat.color, 16)}
                    <Text className={`text-xs font-bold ${selectedCategoryId === cat.category_id ? 'text-white' : 'text-gray-400'}`}>
                      {cat.name}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <Text className="text-gray-500 text-[10px] font-bold uppercase mb-4 tracking-[2px]">
                2. Monto Límite Mensual
              </Text>
              
              <View className="flex-row items-center bg-dark-800 border border-dark-700 rounded-[28px] p-6 mb-10">
                <Text className="text-seed-400 text-3xl font-black mr-2">$</Text>
                <TextInput
                  className="flex-1 text-white text-3xl font-black"
                  placeholder="0"
                  placeholderTextColor="#334155"
                  keyboardType="numeric"
                  value={limitAmount}
                  onChangeText={setLimitAmount}
                  selectionColor="#3b82f6"
                />
              </View>

              <PrimaryButton 
                label="Activar Límite"
                onPress={handleSave}
                disabled={!selectedCategoryId || !limitAmount}
              />
            </ScrollView>

          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

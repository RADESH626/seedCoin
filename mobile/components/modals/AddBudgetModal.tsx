import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Pressable, TextInput, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { X, Save, Target } from 'lucide-react-native';
import { useCategories } from '@/src/database/hooks';
import { getCategoryIcon } from '@/src/helpers/ui';
import { log } from '@/src/services/logger';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (categoryId: number, limit: number) => Promise<void>;
}

export function AddBudgetModal({ visible, onClose, onSave }: Props) {
  const { categories, fetchExpensesCategories } = useCategories();
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
      Alert.alert('Error', 'Selecciona una categoría');
      return;
    }
    if (amount <= 0) {
      Alert.alert('Error', 'Ingresa un monto válido mayor a 0');
      return;
    }

    try {
      await onSave(selectedCategoryId, amount);
      onClose();
    } catch (e) {
      log.error('AddBudgetModal: Error al guardar', e);
      Alert.alert('Error', 'No se pudo crear el presupuesto');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView 
        className="flex-1" 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View className="flex-1 justify-end bg-black/60">
          <View className="bg-dark-900 border-t border-dark-700 rounded-t-[40px] px-6 pt-6 pb-12 max-h-[90%]">
            
            <View className="flex-row justify-between items-center mb-8">
              <View className="flex-row items-center gap-2">
                <Target size={20} color="#fff" />
                <Text className="text-white text-xl font-bold">Nuevo Límite</Text>
              </View>
              <Pressable onPress={onClose} className="bg-dark-800 p-2 rounded-full">
                <X color="#9ca3af" size={20} />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text className="text-gray-400 text-xs font-bold uppercase mb-4 tracking-widest">1. Seleccionar Categoría</Text>
              <View className="flex-row flex-wrap gap-2 mb-8">
                {categories.map((cat) => (
                  <Pressable
                    key={cat.category_id}
                    onPress={() => setSelectedCategoryId(cat.category_id)}
                    className={`flex-row items-center gap-2 px-4 py-2 rounded-full border ${selectedCategoryId === cat.category_id ? 'bg-seed-600 border-seed-400' : 'bg-dark-800 border-dark-700'}`}
                  >
                    {getCategoryIcon(cat.icon, selectedCategoryId === cat.category_id ? '#fff' : cat.color, 16)}
                    <Text className={`text-xs font-bold ${selectedCategoryId === cat.category_id ? 'text-white' : 'text-gray-400'}`}>
                      {cat.name}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <Text className="text-gray-400 text-xs font-bold uppercase mb-4 tracking-widest">2. Monto Límite Mensual</Text>
              <View className="flex-row items-center bg-dark-800 border border-dark-700 rounded-3xl p-6 mb-8">
                <Text className="text-seed-400 text-3xl font-black mr-2">$</Text>
                <TextInput
                  className="flex-1 text-white text-3xl font-black"
                  placeholder="0"
                  placeholderTextColor="#334155"
                  keyboardType="numeric"
                  value={limitAmount}
                  onChangeText={setLimitAmount}
                  autoFocus
                />
              </View>

              <Pressable 
                onPress={handleSave}
                className="bg-seed-600 py-5 rounded-3xl items-center justify-center shadow-xl shadow-seed-600/30"
              >
                <View className="flex-row items-center gap-2">
                  <Save color="#fff" size={20} />
                  <Text className="text-white font-black text-lg tracking-widest uppercase">Activar Límite</Text>
                </View>
              </Pressable>
            </ScrollView>

          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

import { useState, useEffect } from 'react';
import { View, Text, Modal, Pressable, TextInput, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Target, Trash2 } from 'lucide-react-native';
import { CATEGORIES } from '@/src/modules/categories/constants/categories';
import { getCategoryIcon } from '@/src/shared/utils/ui';
import { log } from '@/src/shared/services/logger';

// Componentes Atómicos
import { ModalHeader } from '@/components/ui/ModalHeader';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

import type { BudgetWithProgress } from '@/src/database/types';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (categoryId: string, limit: number) => Promise<void>;
  onUpdate?: (budgetId: number, limit: number) => Promise<void>;
  onDelete?: (budgetId: number) => Promise<void>;
  initialBudget?: BudgetWithProgress | null;
}

/**
 * Modal para la creación de un nuevo límite de presupuesto.
 * Implementa el patrón de diseño "Sheet" y utiliza átomos del sistema.
 */
export function AddBudgetModal({ visible, onClose, onSave, onUpdate, onDelete, initialBudget }: Props) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [limitAmount, setLimitAmount] = useState('');

  const expenseCategories = CATEGORIES.filter(c => c.is_income === 0);

  useEffect(() => {
    if (visible) {
      if (initialBudget) {
        setSelectedCategoryId(initialBudget.category_id);
        setLimitAmount(initialBudget.limit_amount.toString());
      } else {
        setSelectedCategoryId(null);
        setLimitAmount('');
      }
    }
  }, [visible, initialBudget]);

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
      if (initialBudget && onUpdate) {
        await onUpdate(initialBudget.budget_id, amount);
      } else {
        await onSave(selectedCategoryId, amount);
      }
      onClose();
    } catch (e) {
      log.error('AddBudgetModal: Error al guardar presupuesto', e);
      Alert.alert('Error', 'No se pudo activar el presupuesto seleccionado.');
    }
  };

  const handleDelete = () => {
    if (!initialBudget || !onDelete) return;

    Alert.alert(
      'Eliminar Presupuesto',
      '¿Estás seguro de que quieres eliminar este presupuesto? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: async () => {
            try {
              await onDelete(initialBudget.budget_id);
              onClose();
            } catch (e) {
              log.error('AddBudgetModal: Error al eliminar presupuesto', e);
              Alert.alert('Error', 'No se pudo eliminar el presupuesto.');
            }
          }
        }
      ]
    );
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
              title={initialBudget ? "Editar Presupuesto" : "Añadir Presupuesto"}
              Icon={Target}
              onClose={onClose}
            />

            <ScrollView showsVerticalScrollIndicator={false} className="mt-4">
              <Text className="text-zinc-500 text-[10px] font-bold uppercase mb-4 tracking-[2px]">
                1. Monto Presupuestado Mensual
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
                  autoFocus={!initialBudget}
                />
              </View>

              <Text className="text-zinc-500 text-[10px] font-bold uppercase mb-4 tracking-[2px]">
                2. Seleccionar Categoría
              </Text>

              <View className="flex-row flex-wrap gap-2 mb-8">
                {expenseCategories.map((cat) => {
                  const isSelected = selectedCategoryId === cat.category_id;
                  const isDisabled = !!initialBudget && !isSelected;

                  return (
                    <Pressable
                      key={cat.category_id}
                      onPress={() => !isDisabled && setSelectedCategoryId(cat.category_id)}
                      disabled={isDisabled}
                      className={`flex-row items-center gap-2 px-5 py-3 rounded-2xl border ${isSelected
                          ? 'bg-seed-600/20 border-seed-500'
                          : 'bg-dark-800 border-dark-700'
                        } ${isDisabled ? 'opacity-30' : 'opacity-100'}`}
                    >
                      {getCategoryIcon(cat.icon, isSelected ? '#fff' : cat.color, 16)}
                      <Text className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-zinc-400'}`}>
                        {cat.name}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              <PrimaryButton
                label={initialBudget ? "Actualizar Presupuesto" : "Activar Presupuesto"}
                onPress={handleSave}
                disabled={!selectedCategoryId || !limitAmount}
              />

              {initialBudget && (
                <Pressable 
                  onPress={handleDelete}
                  className="mt-6 flex-row items-center justify-center gap-2 p-4 rounded-3xl border border-red-500/30 bg-red-500/5"
                >
                  <Trash2 size={16} color="#ef4444" />
                  <Text className="text-red-500 font-bold text-sm">Eliminar Presupuesto</Text>
                </Pressable>
              )}
            </ScrollView>

          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}


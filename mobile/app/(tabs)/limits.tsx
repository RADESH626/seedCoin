import { useState, useCallback } from 'react';
import { View, Text, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Target, Plus, ShieldCheck } from 'lucide-react-native';

import { useBudgets } from '@/src/modules/budgets/hooks/useBudgets';
import { BudgetCard } from '@/src/modules/transactions/components/BudgetCard';

import { AddBudgetModal } from '@/src/modules/budgets/components/AddBudgetModal';
import { Card } from '@/components/ui/Card';
import { IconBadge } from '@/components/ui/IconBadge';
import { log } from '@/src/shared/services/logger';
import Colors from '@/src/shared/constants/Colors';
import type { BudgetWithProgress } from '@/src/database/types';

export default function LimitsScreen() {
  const insets = useSafeAreaInsets();
  const { budgets, fetchBudgets, addBudget, updateExistingBudget, removeBudget, loading } = useBudgets();

  const [modalVisible, setModalVisible] = useState(false);
  const [editingBudget, setEditingBudget] = useState<BudgetWithProgress | null>(null);

  useFocusEffect(
    useCallback(() => {
      log.info('LimitsScreen: Enfocado. Recargando presupuestos...');
      fetchBudgets();
    }, [fetchBudgets])
  );

  const handleCreateNew = () => {
    setEditingBudget(null);
    setModalVisible(true);
  };

  const handleEdit = (budget: BudgetWithProgress) => {
    setEditingBudget(budget);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setEditingBudget(null);
  };

  return (
    <View className="flex-1 bg-dark-900">
      <View 
        className="standard-screen-px"
        style={{ paddingTop: Math.max(insets.top, 24) }}
      >
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-h2">Límites</Text>
            <Text className="text-caption">Control de gastos mensuales</Text>
          </View>
          <Pressable 
            onPress={handleCreateNew}
            className="w-12 h-12 bg-seed-600 rounded-2xl items-center justify-center shadow-lg shadow-seed-600/30"
          >
            <Plus color="#fff" size={24} />
          </Pressable>
        </View>

        {/* Info Box */}
        <Card padding="md" rounded="3xl" className="flex-row items-center gap-3 mb-8">
          <IconBadge color="blue">
            <ShieldCheck size={20} color="#3b82f6" />
          </IconBadge>
          <View className="flex-1">
            <Text className="text-white text-[11px] font-bold">Salud Financiera</Text>
            <Text className="text-body-sm text-[10px]">Tus límites te ayudan a no gastar más de lo que ganas el mes.</Text>
          </View>
        </Card>
      </View>

      <ScrollView className="flex-1 standard-screen-px pb-32" showsVerticalScrollIndicator={false}>
        {loading && budgets.length === 0 ? (
          <View className="py-20 items-center">
            <ActivityIndicator color={Colors.seed[400]} />
            <Text className="text-gray-500 text-xs mt-4">Calculando consumo...</Text>
          </View>
        ) : budgets.length === 0 ? (
          <View className="py-20 items-center opacity-50">
            <IconBadge size="xl" color="dark" showBorder className="mb-4">
              <Target size={32} color="#475569" />
            </IconBadge>
            <Text className="text-white font-bold text-base mb-1">Sin presupuestos</Text>
            <Text className="text-gray-500 text-xs text-center px-10">Crea tu primer límite de gasto para empezar a ahorrar hoy mismo.</Text>
            
            <Pressable 
              onPress={handleCreateNew}
              className="mt-6 btn-secondary px-6 py-2"
            >
              <Text className="text-seed-400 font-bold text-sm">Crear Presupuesto</Text>
            </Pressable>
          </View>
        ) : (
          budgets.map((budget) => (
            <BudgetCard 
              key={budget.budget_id} 
              budget={budget} 
              onEdit={handleEdit}
            />
          ))
        )}
        <View className="h-32" />
      </ScrollView>

      <AddBudgetModal 
        visible={modalVisible} 
        onClose={handleCloseModal} 
        onSave={addBudget} 
        onUpdate={updateExistingBudget}
        onDelete={removeBudget}
        initialBudget={editingBudget}
      />

    </View>
  );
}



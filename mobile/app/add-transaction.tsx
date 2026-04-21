import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTransactionLogic } from '@/src/modules/transactions/hooks/useTransactionLogic';
import { TransactionForm } from '@/src/modules/transactions/components/TransactionForm';
import { ModalHeader } from '@/components/ui/ModalHeader';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

export default function AddTransactionScreen() {
  const insets = useSafeAreaInsets();
  const { id, type } = useLocalSearchParams<{ id: string; type?: string }>();
  
  const { state, handlers } = useTransactionLogic(id, type);

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-dark-900"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View 
        className="flex-1 standard-screen-px" 
        style={{ paddingTop: Math.max(insets.top, 16) }}
      >
        <ModalHeader
          title={state.isEditing ? 'Editar Movimiento' : 'Nuevo Movimiento'}
          onClose={() => router.back()}
        />

        <TransactionForm
          isIncome={state.isIncome}
          onTypeChange={(val) => { handlers.setIsIncome(val); handlers.setSelectedCategoryId(null); }}
          amount={state.amount}
          onAmountChange={handlers.setAmount}
          accounts={state.accounts}
          selectedAccountId={state.selectedAccountId}
          onSelectAccount={handlers.setSelectedAccountId}
          categories={state.categories}
          selectedCategoryId={state.selectedCategoryId}
          onSelectCategory={handlers.setSelectedCategoryId}
          date={state.date}
          onDatePress={() => handlers.setShowDatePicker(true)}
          description={state.description}
          onDescriptionChange={handlers.setDescription}
          frequency={state.recurrenceFrequency}
          onFrequencyChange={handlers.setRecurrenceFrequency}
          isAutomatic={state.isAutomatic}
          onAutomaticChange={handlers.setIsAutomatic}
          isEditing={state.isEditing}
          onDelete={handlers.handleDelete}
          showDatePicker={state.showDatePicker}
          onDateChange={handlers.handleDateChange}
        />

        <View className="pb-4">
          <PrimaryButton
            label={state.isEditing ? 'Actualizar' : `Guardar ${state.isIncome ? 'Ingreso' : 'Gasto'}`}
            onPress={handlers.handleSave}
            disabled={!state.amount}
            loading={state.loading}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

import { useState, useEffect } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { log } from '@/src/services/logger';
import { useAccounts } from '@/src/hooks/useAccounts';
import { useCategories } from '@/src/hooks/useCategories';
import { createTransaction } from '@/src/services/TransactionService';

// Importación de componentes atómicos extraídos
import { TransactionTypeSelector } from '@/components/transactions/TransactionTypeSelector';
import { AmountInput } from '@/components/transactions/AmountInput';
import { AccountSelector } from '@/components/transactions/AccountSelector';
import { CategoryGrid } from '@/components/transactions/CategoryGrid';
import { TransactionDateField } from '@/components/transactions/TransactionDateField';
import { ModalHeader } from '@/components/ui/ModalHeader';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

export default function AddTransactionScreen() {
  const insets = useSafeAreaInsets();
  const { accounts, fetchAccounts } = useAccounts();
  const { categories, fetchCategories } = useCategories();

  // Estados del Formulario
  const [isIncome, setIsIncome] = useState(false);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  // Cargar datos iniciales
  useEffect(() => {
    fetchAccounts();
    fetchCategories();
  }, [fetchAccounts, fetchCategories]);

  // Autoseleccionar primera cuenta si existe
  useEffect(() => {
    if (accounts.length > 0 && selectedAccountId === null) {
      setSelectedAccountId(accounts[0].account_id);
    }
  }, [accounts, selectedAccountId]);

  const handleDateChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const handleSave = async () => {
    const numericAmount = parseFloat(amount.replace(/[^0-9]/g, '')) || 0;

    if (numericAmount <= 0) {
      Alert.alert('Monto inválido', 'Por favor ingresa un monto mayor a 0');
      return;
    }
    if (!selectedAccountId) {
      Alert.alert('Falta cuenta', 'Debes seleccionar una cuenta de origen/destino');
      return;
    }
    if (!selectedCategoryId) {
      Alert.alert('Falta categoría', 'Por favor selecciona una categoría');
      return;
    }

    try {
      setLoading(true);
      log.info('AddTransaction: Guardando transacción...', { amount: numericAmount, isIncome });
      await createTransaction({
        accountId: selectedAccountId,
        isIncome,
        amount: numericAmount,
        categoryId: selectedCategoryId,
        description: description.trim(),
        status: 'COMPLETED',
        transactionDate: date.toISOString(),
      });
      router.back();
    } catch (e) {
      log.error('AddTransaction: Error al guardar', e);
      Alert.alert('Error', 'No se pudo guardar la transacción.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-dark-900" 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View className="flex-1 px-6" style={{ paddingTop: Math.max(insets.top, 16) }}>
        
        <ModalHeader title="Nuevo Movimiento" onClose={() => router.back()} />

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          
          <TransactionTypeSelector 
            isIncome={isIncome} 
            onTypeChange={(val) => { setIsIncome(val); setSelectedCategoryId(null); }} 
          />

          <AmountInput 
            amount={amount} 
            onAmountChange={setAmount} 
            isIncome={isIncome} 
          />

          <AccountSelector 
            accounts={accounts} 
            selectedAccountId={selectedAccountId} 
            onSelectAccount={setSelectedAccountId} 
          />

          <CategoryGrid 
            categories={categories} 
            selectedCategoryId={selectedCategoryId} 
            onSelectCategory={setSelectedCategoryId} 
            isIncome={isIncome} 
          />

          <TransactionDateField 
            date={date} 
            description={description} 
            onDatePress={() => setShowDatePicker(true)} 
            onDescriptionChange={setDescription} 
          />

        </ScrollView>

        {showDatePicker && (
          <DateTimePicker value={date} mode="date" is24Hour={true} onChange={handleDateChange} />
        )}

        <View className="pb-10">
          <PrimaryButton 
            label={`Guardar ${isIncome ? 'Ingreso' : 'Gasto'}`}
            onPress={handleSave}
            disabled={!amount}
            loading={loading}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

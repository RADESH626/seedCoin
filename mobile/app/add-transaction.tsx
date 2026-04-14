import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { X } from 'lucide-react-native';
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
    }
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-dark-900" 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View className="flex-1 px-6" style={{ paddingTop: Math.max(insets.top, 16) }}>
        
        {/* Header simplificado */}
        <View className="flex-row justify-between items-center py-4">
          <Text className="text-white text-2xl font-bold">Nuevo Movimiento</Text>
          <Pressable 
            onPress={() => router.back()} 
            className="w-10 h-10 bg-dark-800 rounded-full items-center justify-center border border-dark-700"
          >
            <X color="#9ca3af" size={20} />
          </Pressable>
        </View>

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

        {/* Botón de Acción Principal */}
        <View className="absolute bottom-10 left-6 right-6">
          <Pressable 
            onPress={handleSave}
            disabled={!amount}
            className={`w-full py-5 rounded-3xl items-center justify-center shadow-2xl ${!amount ? 'bg-dark-800 opacity-50' : 'bg-seed-600 active:bg-seed-700'}`}
          >
            <Text className="text-white font-black text-lg tracking-widest uppercase">
              Guardar {isIncome ? 'Ingreso' : 'Gasto'}
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

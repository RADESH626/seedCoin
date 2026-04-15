import { useState, useEffect, useCallback } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Trash2 } from 'lucide-react-native';

import { log } from '@/src/services/logger';
import { useAccounts } from '@/src/hooks/useAccounts';
import { useCategories } from '@/src/hooks/useCategories';
import { useTransactions } from '@/src/hooks/useTransactions';
import { createTransaction, updateTransaction } from '@/src/services/TransactionService';

// Importación de componentes atómicos
import { TransactionTypeSelector } from '@/components/transactions/TransactionTypeSelector';
import { AmountInput } from '@/components/transactions/AmountInput';
import { AccountSelector } from '@/components/transactions/AccountSelector';
import { CategoryGrid } from '@/components/transactions/CategoryGrid';
import { TransactionDateField } from '@/components/transactions/TransactionDateField';
import { ModalHeader } from '@/components/ui/ModalHeader';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

export default function AddTransactionScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const isEditing = !!id;

  const { accounts, fetchAccounts } = useAccounts();
  const { categories, fetchCategories } = useCategories();
  const { getById, removeTransaction } = useTransactions();

  // Estados del Formulario
  const [isIncome, setIsIncome] = useState(false);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false);

  // Cargar datos iniciales (Cuentas y Categorías)
  useEffect(() => {
    fetchAccounts();
    fetchCategories();
  }, [fetchAccounts, fetchCategories]);

  // Si estamos editando, cargar la transacción específica
  useEffect(() => {
    if (isEditing && !isInitialDataLoaded) {
      const loadTransaction = async () => {
        try {
          const tx = await getById(parseInt(id));
          if (tx) {
            setIsIncome(tx.is_income === 1);
            setAmount(tx.amount.toString());
            setDescription(tx.description || '');
            setSelectedAccountId(tx.account_id);
            setSelectedCategoryId(tx.category_id);
            setDate(new Date(tx.transaction_date));
            setIsInitialDataLoaded(true);
          }
        } catch (error) {
          log.error('AddTransaction: Error cargando transacción para editar', error);
          Alert.alert('Error', 'No se pudo cargar la información del movimiento.');
          router.back();
        }
      };
      loadTransaction();
    }
  }, [isEditing, id, getById, isInitialDataLoaded]);

  // Autoseleccionar primera cuenta si es nueva transacción
  useEffect(() => {
    if (!isEditing && accounts.length > 0 && selectedAccountId === null) {
      setSelectedAccountId(accounts[0].account_id);
    }
  }, [accounts, selectedAccountId, isEditing]);

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
      Alert.alert('Falta cuenta', 'Debes seleccionar una cuenta');
      return;
    }
    if (!selectedCategoryId) {
      Alert.alert('Falta categoría', 'Por favor selecciona una categoría');
      return;
    }

    try {
      setLoading(true);
      const transactionData = {
        accountId: selectedAccountId,
        isIncome,
        amount: numericAmount,
        categoryId: selectedCategoryId,
        description: description.trim(),
        status: 'COMPLETED' as const,
        transactionDate: date.toISOString(),
      };

      if (isEditing) {
        log.info('AddTransaction: Actualizando transacción...', { id, amount: numericAmount });
        await updateTransaction({
          ...transactionData,
          transactionId: parseInt(id),
        });
      } else {
        log.info('AddTransaction: Creando transacción...', { amount: numericAmount });
        await createTransaction(transactionData);
      }
      
      router.back();
    } catch (e) {
      log.error('AddTransaction: Error al guardar', e);
      Alert.alert('Error', 'No se pudo guardar el movimiento.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = useCallback(() => {
    if (!id) return;

    Alert.alert(
      'Eliminar Movimiento',
      '¿Estás seguro de que deseas eliminar este movimiento? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              await removeTransaction(parseInt(id));
              router.back();
            } catch (error) {
              log.error('AddTransaction: Error eliminando', error);
              Alert.alert('Error', 'No se pudo eliminar el movimiento.');
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  }, [id, removeTransaction]);

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-dark-900" 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View className="flex-1 px-6" style={{ paddingTop: Math.max(insets.top, 16) }}>
        
        <ModalHeader 
          title={isEditing ? 'Editar Movimiento' : 'Nuevo Movimiento'} 
          onClose={() => router.back()} 
        />

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

          {isEditing && (
            <TouchableOpacity 
              onPress={handleDelete}
              className="mt-8 mb-4 py-4 flex-row items-center justify-center bg-red-500/10 border border-red-500/20 rounded-2xl"
            >
              <Trash2 size={20} color="#f87171" className="mr-2" />
              <Text className="text-red-400 font-bold ml-2">Eliminar Movimiento</Text>
            </TouchableOpacity>
          )}

          <View className="h-10" />
        </ScrollView>

        {showDatePicker && (
          <DateTimePicker value={date} mode="date" is24Hour={true} onChange={handleDateChange} />
        )}

        <View className="pb-10">
          <PrimaryButton 
            label={isEditing ? 'Actualizar' : `Guardar ${isIncome ? 'Ingreso' : 'Gasto'}`}
            onPress={handleSave}
            disabled={!amount}
            loading={loading}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

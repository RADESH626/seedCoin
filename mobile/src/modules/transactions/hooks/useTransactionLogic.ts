import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { log } from '@/src/shared/services/logger';
import { useAccounts } from '@/src/modules/accounts/hooks/useAccounts';
import { RecurrenceFrequency } from '@/src/database/types';
import { useTransactionById } from './useTransactionsQuery';
import { 
  useCreateTransaction, 
  useUpdateTransaction, 
  useDeleteTransaction 
} from './useTransactionActions';
import { SchedulerService } from '@/src/shared/services/SchedulerService';
import { NotificationService } from '@/src/shared/services/NotificationService';
import { createTransfer } from '../services/TransferService';
import { TransactionMode } from '../components/TransactionTypeSelector';

export function useTransactionLogic(id?: string, type?: string) {
  const isEditing = !!id;
  
  const { accounts, fetchAccounts } = useAccounts();
  
  const createMutation = useCreateTransaction();
  const updateMutation = useUpdateTransaction();
  const deleteMutation = useDeleteTransaction();
  const { data: initialTx, isLoading: isLoadingDetail } = useTransactionById(isEditing ? parseInt(id!) : null);

  // States
  const [mode, setMode] = useState<TransactionMode>('EXPENSE');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(null);
  const [selectedToAccountId, setSelectedToAccountId] = useState<number | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false);

  // Scheduling States
  const [recurrenceFrequency, setRecurrenceFrequency] = useState<RecurrenceFrequency | null>(
    !isEditing && type === 'scheduled' ? 'MONTHLY' : null
  );
  const [isAutomatic, setIsAutomatic] = useState(true);

  // Load initial data
  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  // Load existing transaction data
  useEffect(() => {
    if (isEditing && initialTx && !isInitialDataLoaded) {
      setMode(initialTx.transfer_transaction_id ? 'TRANSFER' : (initialTx.is_income === 1 ? 'INCOME' : 'EXPENSE'));
      setAmount(initialTx.amount.toString());
      setDescription(initialTx.description || '');
      setSelectedAccountId(initialTx.account_id);
      setSelectedCategoryId(initialTx.category_id);
      setDate(new Date(initialTx.transaction_date));
      setIsInitialDataLoaded(true);
    }
  }, [isEditing, initialTx, isInitialDataLoaded]);

  // Auto-select first account
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
    // Limpiar el monto permitiendo punto o coma decimal
    const sanitizedAmount = amount.replace(/,/g, '.').replace(/[^0-9.]/g, '');
    const numericAmount = parseFloat(sanitizedAmount) || 0;

    if (numericAmount <= 0) {
      Alert.alert('Monto inválido', 'Por favor ingresa un monto mayor a 0');
      return;
    }
    if (!selectedAccountId) {
      Alert.alert('Falta cuenta', 'Debes seleccionar una cuenta');
      return;
    }
    if (mode === 'TRANSFER' && !selectedToAccountId) {
      Alert.alert('Falta cuenta destino', 'Debes seleccionar la cuenta a la que enviarás el dinero');
      return;
    }
    if (mode !== 'TRANSFER' && !selectedCategoryId) {
      Alert.alert('Falta categoría', 'Por favor selecciona una categoría');
      return;
    }

    try {
      setLoading(true);
      const transactionData = {
        accountId: selectedAccountId,
        isIncome: mode === 'INCOME',
        amount: numericAmount,
        categoryId: selectedCategoryId || 'expense_other',
        description: description.trim(),
        status: (recurrenceFrequency ? 'SCHEDULED' : 'COMPLETED') as any,
        transactionDate: date.toISOString(),
        recurrenceFrequency: recurrenceFrequency || undefined,
        isAutomatic: isAutomatic,
      };

      if (isEditing && id) {
        log.info('useTransactionLogic: Actualizando transacción...', { id, amount: numericAmount });
        await updateMutation.mutateAsync({
          ...transactionData,
          isIncome: mode === 'INCOME',
          categoryId: selectedCategoryId || 'expense_other',
          transactionId: parseInt(id),
        });
      } else if (mode === 'TRANSFER') {
        log.info('useTransactionLogic: Creando transferencia...', { amount: numericAmount });
        await createTransfer(selectedAccountId, selectedToAccountId!, numericAmount, description.trim());
      } else {
        log.info('useTransactionLogic: Creando transacción...', { amount: numericAmount });
        await createMutation.mutateAsync({
          ...transactionData,
          isIncome: mode === 'INCOME',
          categoryId: selectedCategoryId!,
        });
      }
        
        // Si es programada, procesar inmediatamente por si la fecha es hoy y enviar notificación
        if (recurrenceFrequency) {
          await SchedulerService.processDueTransactions();
          await NotificationService.scheduleNotification(
            'Programación Exitosa',
            `Se ha programado: ${description.trim() || 'Movimiento'} (${recurrenceFrequency})`
          );
        }
      
      router.back();
    } catch (e) {
      log.error('useTransactionLogic: Error al guardar', e);
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
              await deleteMutation.mutateAsync(parseInt(id));
              router.back();
            } catch (error) {
              log.error('useTransactionLogic: Error eliminando', error);
              Alert.alert('Error', 'No se pudo eliminar el movimiento.');
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  }, [id, deleteMutation]);

  return {
    state: {
      mode,
      isIncome: mode === 'INCOME',
      amount,
      description,
      selectedAccountId,
      selectedToAccountId,
      selectedCategoryId,
      date,
      showDatePicker,
      loading,
      recurrenceFrequency,
      isAutomatic,
      isEditing,
      accounts,
    },
    handlers: {
      setMode,
      setIsIncome: (val: boolean) => setMode(val ? 'INCOME' : 'EXPENSE'),
      setAmount,
      setDescription,
      setSelectedAccountId,
      setSelectedToAccountId,
      setSelectedCategoryId,
      setShowDatePicker,
      handleDateChange,
      handleSave,
      handleDelete,
      setRecurrenceFrequency,
      setIsAutomatic,
    }
  };
}


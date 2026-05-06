import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { useAccounts } from '@/src/modules/accounts/hooks/useAccounts';
import { createAccount, getAccountById, updateAccount } from '@/src/modules/accounts/services/AccountService';
import { ACCOUNT_TYPES } from '@/src/database/types';

export function useAccountLogic(id?: string) {
  const isEditing = !!id;
  const { accounts, fetchAccounts } = useAccounts();
  
  const [name, setName] = useState('');
  const [accountType, setAccountType] = useState<string>(ACCOUNT_TYPES.CASH.id);
  const [balance, setBalance] = useState('');
  const [yieldRate, setYieldRate] = useState('');
  const [paymentDay, setPaymentDay] = useState('1');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && id) {
      getAccountById(parseInt(id)).then(acc => {
        if (acc) {
          setName(acc.name);
          setAccountType(acc.account_type);
          setBalance(acc.initial_balance.toString());
          setYieldRate(acc.yield_rate?.toString() || '');
          setPaymentDay(acc.payment_day?.toString() || '1');
        }
      });
    }
  }, [id, isEditing]);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Faltan datos', 'Ponle un nombre a tu cuenta (Ej: Cartera, Banco X)');
      return;
    }

    const initialBalance = parseFloat(balance) || 0;
    const rate = parseFloat(yieldRate) || 0;
    const day = parseInt(paymentDay) || 1;
    const isFirstAccount = accounts.length === 0;

    try {
      setLoading(true);
      if (isEditing && id) {
        await updateAccount(parseInt(id), name.trim(), accountType, initialBalance, rate, day);
      } else {
        await createAccount(name.trim(), accountType, initialBalance, rate, day);
      }
      
      const updatedAccounts = await fetchAccounts();

      if (!isEditing && isFirstAccount) {
        router.replace('/(tabs)');
      } else {
        router.back();
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Error', `No se pudo ${isEditing ? 'actualizar' : 'crear'} la cuenta localmente.`);
    } finally {
      setLoading(false);
    }
  };

  return {
    state: {
      name,
      accountType,
      balance,
      yieldRate,
      paymentDay,
      loading,
      isEditing,
    },
    handlers: {
      setName,
      setAccountType,
      setBalance,
      setYieldRate,
      setPaymentDay,
      handleSave,
    }
  };
}

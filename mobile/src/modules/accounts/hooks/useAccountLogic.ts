import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { useAccounts } from '@/src/hooks/useAccounts';
import { createAccount, getAccountById, updateAccount } from '@/src/services/AccountService';
import { ACCOUNT_TYPES } from '@/src/database/types';

export function useAccountLogic(id?: string) {
  const isEditing = !!id;
  const { accounts, fetchAccounts } = useAccounts();
  
  const [name, setName] = useState('');
  const [accountType, setAccountType] = useState<string>(ACCOUNT_TYPES.CASH.id);
  const [balance, setBalance] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && id) {
      getAccountById(parseInt(id)).then(acc => {
        if (acc) {
          setName(acc.name);
          setAccountType(acc.account_type);
          setBalance(acc.initial_balance.toString());
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

    try {
      setLoading(true);
      if (isEditing && id) {
        await updateAccount(parseInt(id), name.trim(), accountType, initialBalance);
      } else {
        await createAccount(name.trim(), accountType, initialBalance);
      }
      
      await fetchAccounts();

      if (!isEditing && accounts.length === 0) {
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
      loading,
      isEditing,
    },
    handlers: {
      setName,
      setAccountType,
      setBalance,
      handleSave,
    }
  };
}

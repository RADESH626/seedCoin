import { useCallback } from 'react';
import { Alert } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { useAccounts } from '@/src/hooks/useAccounts';
import { deleteAccount, hasTransactions } from '@/src/services/AccountService';
import { useSingleAction } from '@/src/hooks/useSingleAction';

export function useManageAccountsLogic() {
  const { accounts, fetchAccounts, loading } = useAccounts();

  const { execute: handleEditAccount } = useSingleAction((id: number) => 
    router.push(`/add-account?id=${id}`)
  );

  const { execute: handleNewAccount } = useSingleAction(() => 
    router.push('/add-account')
  );

  useFocusEffect(
    useCallback(() => {
      fetchAccounts();
    }, [fetchAccounts])
  );

  const handleDelete = async (accountId: number, accountName: string) => {
    try {
      const hasTx = await hasTransactions(accountId);
      
      const message = hasTx 
        ? `Esta cuenta ("${accountName}") tiene transacciones registradas. Si la eliminas, se ocultará pero sus registros se mantendrán para no afectar el historial global.\n\n¿Deseas continuar?`
        : `¿Estás seguro de que deseas eliminar la cuenta "${accountName}"?`;

      Alert.alert(
        hasTx ? "Cuenta con Movimientos" : "Eliminar Cuenta",
        message,
        [
          { text: "Cancelar", style: "cancel" },
          { 
            text: "Eliminar", 
            style: "destructive",
            onPress: async () => {
              const success = await deleteAccount(accountId);
              if (success) {
                fetchAccounts();
              } else {
                Alert.alert("Error", "No se pudo eliminar la cuenta.");
              }
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error al verificar transacciones:', error);
      Alert.alert("Error", "Ocurrió un problema al procesar la solicitud.");
    }
  };

  return {
    state: {
      accounts,
      loading,
    },
    handlers: {
      handleEditAccount,
      handleNewAccount,
      handleDelete,
    }
  };
}

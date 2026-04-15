import { useState, useCallback } from 'react';
import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Trash2, Landmark, Plus, ChevronRight } from 'lucide-react-native';

import { useAccounts } from '@/src/hooks/useAccounts';
import { deleteAccount, hasTransactions } from '@/src/services/AccountService';
import { formatMoney } from '@/src/helpers/currency';
import { ModalHeader } from '@/components/ui/ModalHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { FloatingActionButton } from '@/components/ui/FloatingActionButton';
import Colors from '@/constants/Colors';

/**
 * Pantalla de gestión de cuentas.
 * Permite visualizar el listado completo, navegar a edición y eliminar cuentas.
 * Implementa una validación especial para cuentas con transacciones.
 */
export default function ManageAccountsScreen() {
  const insets = useSafeAreaInsets();
  const { accounts, fetchAccounts, loading } = useAccounts();

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

  return (
    <View className="flex-1 bg-dark-900" style={{ paddingTop: Math.max(insets.top, 16) }}>
      <View className="px-6 flex-1">
        <ModalHeader title="Gestionar Cuentas" onClose={() => router.back()} />

        <ScrollView 
          className="flex-1 mt-4" 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          <View className="gap-4">
            {accounts.map(acc => (
              <View 
                key={acc.account_id}
                className="bg-dark-800 border border-dark-700 rounded-3xl overflow-hidden"
              >
                <Pressable 
                  className="p-5 flex-row items-center justify-between active:bg-dark-700/50"
                  onPress={() => router.push(`/add-account?id=${acc.account_id}`)}
                >
                  <View className="flex-row items-center gap-4 flex-1">
                    <View className="w-12 h-12 rounded-2xl bg-seed-500/10 items-center justify-center">
                      <Landmark size={24} color={Colors.seed[400]} />
                    </View>
                    <View className="flex-1">
                      <Text className="text-white font-bold text-base">{acc.name}</Text>
                      <Text className="text-gray-400 text-xs mt-0.5 uppercase tracking-wider">{acc.account_type}</Text>
                    </View>
                    <View className="items-end mr-2">
                       <Text className="text-white font-bold text-base">{formatMoney(acc.current_balance, 'COP')}</Text>
                    </View>
                  </View>
                  <ChevronRight size={18} color="#475569" />
                </Pressable>
                
                <View className="border-t border-dark-700/50 flex-row">
                   <Pressable 
                    onPress={() => handleDelete(acc.account_id, acc.name)}
                    className="flex-1 flex-row items-center justify-center p-4 gap-2 active:bg-red-500/10"
                   >
                     <Trash2 size={16} color="#ef4444" />
                     <Text className="text-red-500 text-xs font-bold uppercase tracking-wider">Eliminar Cuenta</Text>
                   </Pressable>
                </View>
              </View>
            ))}

            {/* Empty State */}
            {accounts.length === 0 && !loading && (
              <EmptyState 
                icon={Landmark}
                title="No tienes cuentas activas"
                description="Agrega una cuenta para comenzar a registrar tus movimientos."
              />
            )}
          </View>
        </ScrollView>
      </View>

      {/* Floating Action Button for New Account */}
      <View 
        className="absolute bottom-10 left-6 right-6"
        pointerEvents="box-none"
      >
        <FloatingActionButton 
          label="Nueva Cuenta"
          icon={Plus}
          onPress={() => router.push('/add-account')}
        />
      </View>
    </View>
  );
}

import { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, Alert, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAccounts } from '@/src/hooks/useAccounts';
import { createAccount } from '@/src/services/AccountService';
import { ModalHeader } from '@/components/ui/ModalHeader';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { AccountTypeSelector } from '@/components/accounts/AccountTypeSelector';
import { ACCOUNT_TYPES } from '@/src/database/types';

export default function AddAccountScreen() {
  const insets = useSafeAreaInsets();
  const { accounts } = useAccounts();
  const [name, setName] = useState('');
  const [accountType, setAccountType] = useState<string>(ACCOUNT_TYPES.CASH.id);
  const [balance, setBalance] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Faltan datos', 'Ponle un nombre a tu cuenta (Ej: Cartera, Banco X)');
      return;
    }

    const initialBalance = parseFloat(balance) || 0;

    try {
      setLoading(true);
      await createAccount(name.trim(), accountType, initialBalance);
      
      // Si era la primera cuenta (onboarding), vamos directo al dashboard usando REPLACE
      // para que no haya flashback del onboarding
      if (accounts.length === 0) {
        // Aprovechamos para refrescar la lista global si fuera necesario, 
        // aunque el dashboard lo hará al entrar.
        router.replace('/(tabs)');
      } else {
        router.back();
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'No se pudo crear la cuenta localmente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-dark-900" 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View 
        className="flex-1 px-6"
        style={{ paddingTop: Math.max(insets.top, 16) }}
      >
        <ModalHeader title="Nueva Cuenta" onClose={() => router.back()} />

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Input Nombre */}
          <View className="mb-6">
            <Text className="text-gray-400 text-sm font-medium mb-2 ml-1">Nombre de la cuenta</Text>
            <TextInput
              placeholder="Ej: Billetera Diaria"
              placeholderTextColor="#4b5563"
              className="w-full bg-dark-800 text-white p-4 rounded-2xl border border-dark-700 font-medium text-base focus:border-seed-500"
              value={name}
              onChangeText={setName}
            />
          </View>

          <AccountTypeSelector 
            selectedType={accountType} 
            onSelect={setAccountType} 
          />

          {/* Saldo Inicial COP */}
          <View className="mb-8">
            <Text className="text-gray-400 text-sm font-medium mb-2 ml-1">Capital Inicial (COP)</Text>
            <View className="flex-row items-center w-full bg-dark-800 px-4 rounded-2xl border border-dark-700 focus:border-seed-500 focus-within:border-seed-500 overflow-hidden">
              <Text className="text-gray-400 text-lg font-bold pr-2">$</Text>
              <TextInput
                placeholder="0"
                placeholderTextColor="#4b5563"
                keyboardType="numeric"
                className="flex-1 text-white py-4 font-bold text-lg"
                value={balance}
                onChangeText={setBalance}
              />
              <Text className="text-gray-500 text-sm font-bold pl-2">COP</Text>
            </View>
          </View>
        </ScrollView>

        <View className="pb-8 pt-4">
          <PrimaryButton 
            label="Guardar Cuenta"
            onPress={handleSave}
            disabled={!name.trim()}
            loading={loading}
          />
        </View>

      </View>
    </KeyboardAvoidingView>
  );
}

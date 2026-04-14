import { useState } from 'react';
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, Alert, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { X, Landmark, Wallet, CreditCard, PiggyBank } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Colors from '@/constants/Colors';
import { createAccount } from '@/src/services/AccountService';

const ACCOUNT_TYPES = [
  { id: 'Efectivo', icon: Wallet },
  { id: 'Banco', icon: Landmark },
  { id: 'Ahorros', icon: PiggyBank },
  { id: 'Tarjeta', icon: CreditCard },
];

export default function AddAccountScreen() {
  const insets = useSafeAreaInsets();
  
  const [name, setName] = useState('');
  const [accountType, setAccountType] = useState('Efectivo');
  const [balance, setBalance] = useState(''); // Manejaremos string para el input y convertiremos en cop

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Faltan datos', 'Ponle un nombre a tu cuenta (Ej: Cartera, Banco X)');
      return;
    }

    const initialBalance = parseFloat(balance) || 0;

    try {
      await createAccount(name.trim(), accountType, initialBalance);
      // Al cerrar el modal, volverá al index y el hook useFocus repintará los números instantáneamente
      router.back();
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'No se pudo crear la cuenta localmente.');
    }
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-dark-900" 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View 
        className="flex-1 px-6 pt-4"
        style={{ paddingTop: Math.max(insets.top, 16) }}
      >
        {/* Header del Modal */}
        <View className="flex-row justify-between items-center pb-6">
          <Text className="text-white text-2xl font-bold">Nueva Cuenta</Text>
          <Pressable 
            onPress={() => router.back()} 
            className="w-10 h-10 bg-dark-800 rounded-full items-center justify-center"
          >
            <X color="#9ca3af" size={20} />
          </Pressable>
        </View>

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

          {/* Selector de Tipos Visual */}
          <View className="mb-6">
            <Text className="text-gray-400 text-sm font-medium mb-3 ml-1">Tipo de fondo</Text>
            <View className="flex-row flex-wrap justify-between gap-y-3">
              {ACCOUNT_TYPES.map((type) => {
                const IconComponent = type.icon;
                const isSelected = accountType === type.id;
                
                return (
                  <Pressable
                    key={type.id}
                    onPress={() => setAccountType(type.id)}
                    className={`w-[48%] py-3 px-2 rounded-2xl flex-row items-center justify-center gap-2 border 
                      ${isSelected ? 'bg-seed-900 border-seed-500' : 'bg-dark-800 border-dark-700'}
                    `}
                  >
                    <IconComponent color={isSelected ? Colors.seed[400] : '#9ca3af'} size={18} />
                    <Text className={`font-semibold ${isSelected ? 'text-seed-400' : 'text-gray-400'}`}>
                      {type.id}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

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

        {/* Action Button Siempre Abajo */}
        <View className="pb-8 pt-4">
          <Pressable 
            disabled={!name.trim()}
            onPress={handleSave}
            className={`w-full py-4 rounded-2xl items-center justify-center shadow-lg shadow-seed-600/20
              ${!name.trim() ? 'bg-seed-950 opacity-60' : 'bg-seed-600 active:bg-seed-700'}
            `}
          >
            <Text className={`font-bold text-lg ${!name.trim() ? 'text-seed-400' : 'text-white'}`}>
              Guardar Cuenta
            </Text>
          </Pressable>
        </View>

      </View>
    </KeyboardAvoidingView>
  );
}

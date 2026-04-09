import React, { useState, useCallback } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { Landmark, PlusCircle } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { usePreferences } from '@/src/database/hooks';

export function OnboardingView() {
  const { getPreference, setPreference } = usePreferences();
  const [userName, setUserName] = useState<string | null>(null);
  const [nameInput, setNameInput] = useState('');
  const [checked, setChecked] = useState(false);

  useFocusEffect(useCallback(() => {
    getPreference('user_name').then(val => {
      setUserName(val);
      setChecked(true);
    });
  }, [getPreference]));

  const handleSaveName = async () => {
    if (nameInput.trim().length > 0) {
      await setPreference('user_name', nameInput.trim());
      setUserName(nameInput.trim());
    }
  };

  if (!checked) return null; // Previene parpadeo hasta leer la Base de Datos

  // PASO 1: Pedir el Nombre
  if (!userName) {
    return (
      <View className="flex-1 bg-dark-900 justify-center items-center px-6">
        <View className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-seed-600/10 pointer-events-none blur-3xl scale-150" />
        
        <View className="w-24 h-24 rounded-full bg-seed-600/20 items-center justify-center mb-8 border border-seed-500/30">
          <Landmark color={Colors.seed[400]} size={48} />
        </View>
        
        <Text className="text-white text-3xl font-extrabold text-center tracking-tight mb-2">
          ¡Hola! ¿Cómo te llamas?
        </Text>
        <Text className="text-gray-400 text-base text-center mb-8 leading-relaxed px-4">
          Personalicemos tu bóveda financiera.
        </Text>

        <TextInput
          className="w-full bg-dark-800 border border-dark-700 rounded-2xl p-4 text-white text-center text-lg mb-6 shadow-inner"
          placeholder="Tu nombre (Ej. Emanuel)"
          placeholderTextColor="#4b5563"
          value={nameInput}
          onChangeText={setNameInput}
          autoFocus={true}
        />
        
        <Pressable 
          onPress={handleSaveName}
          className={`w-full py-4 rounded-2xl flex-row justify-center items-center shadow-lg ${nameInput.trim() ? 'bg-seed-600 shadow-seed-600/30' : 'bg-dark-700 opacity-50'}`}
          disabled={!nameInput.trim()}
        >
          <Text className="text-white font-bold text-lg">Continuar</Text>
        </Pressable>
      </View>
    );
  }

  // PASO 2: Pedir la Cuenta (saludando)
  return (
    <View className="flex-1 bg-dark-900 justify-center items-center px-6">
      <View className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-seed-600/10 pointer-events-none blur-3xl scale-150" />
      
      <View className="w-24 h-24 rounded-full bg-seed-600/20 items-center justify-center mb-8 border border-seed-500/30">
        <Landmark color={Colors.seed[400]} size={48} />
      </View>
      
      <Text className="text-white text-3xl font-extrabold text-center tracking-tight mb-3">
        Perfecto, <Text className="text-seed-400">{userName}</Text>
      </Text>
      <Text className="text-gray-400 text-base text-center mb-10 leading-relaxed px-4">
        Ahora crea tu primera cuenta y comienza a rastrear tu dinero con estilo.
      </Text>
      
      <Pressable 
        onPress={() => router.push('/add-account' as any)}
        className="w-full bg-seed-600 active:bg-seed-700 py-4 rounded-2xl flex-row justify-center items-center gap-2 shadow-lg shadow-seed-600/30"
      >
        <PlusCircle color="#fff" size={20} />
        <Text className="text-white font-bold text-lg">Crea tu primera cuenta</Text>
      </Pressable>
    </View>
  );
}

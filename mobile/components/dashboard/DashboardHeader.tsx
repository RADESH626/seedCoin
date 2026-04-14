import { useState, useCallback } from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { RefreshCcw } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { log } from '@/src/services/logger';
import { usePreferences } from '@/src/hooks/usePreferences';
import { resetDatabase } from '@/src/database/utils';

export function DashboardHeader() {
  const insets = useSafeAreaInsets();
  const { getPreference } = usePreferences();
  const [userName, setUserName] = useState('Usuario');

  useFocusEffect(useCallback(() => {
    getPreference('user_name').then(val => {
      if (val) setUserName(val);
    });
  }, [getPreference]));

  // Extraer iniciales (Ej: "Maria Perez" -> "MP", "Camilo" -> "CA")
  const parts = userName.trim().split(' ').filter(p => p.length > 0);
  let initials = 'US';
  if (parts.length === 1) {
    initials = parts[0].substring(0, 2).toUpperCase();
  } else if (parts.length > 1) {
    initials = (parts[0][0] + parts[1][0]).toUpperCase();
  }

  const handleReset = () => {
    Alert.alert(
      "Soft Reset (Dev)",
      "Esto destruirá la base de datos local y te regresará al estado inicial. Deberás recargar la app manualmente para aplicar los cambios (pulsa 'r' en la consola de Expo o recarga la app en el emulador).",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Borrar y Reiniciar",
          style: "destructive",
          onPress: async () => {
            try {
              await resetDatabase();
              Alert.alert("Realizado", "La base de datos ha sido purgada. Por favor reinicia la app (tecla 'r') para volver a empezar.");
            } catch (e) {
              log.error('Soft Reset: Error al purgar la base de datos', e);
              Alert.alert("Error", "No se pudo limpiar la DB interna de forma segura.");
            }
          }
        }
      ]
    );
  };

  return (
    <View
      className="flex-row justify-between items-center px-6 pb-4 z-10"
      style={{ paddingTop: Math.max(insets.top, 24) }}
    >
      <View className="flex-row items-center gap-3">
        <View className="w-10 h-10 rounded-full bg-seed-600 items-center justify-center shadow-md shadow-seed-600/30">
          <Text className="text-white text-sm font-bold">{initials}</Text>
        </View>
        <View>
          <Text className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">Buenos días</Text>
          <Text className="text-lg font-bold text-white -mt-0.5">{userName} 👋</Text>
        </View>
      </View>

      <View className="flex-row items-center gap-2">
        <Pressable
          onPress={handleReset}
          className="w-10 h-10 rounded-full bg-dark-800 border border-dark-700 items-center justify-center"
        >
          <RefreshCcw color="#d1d5db" size={18} />
        </Pressable>
      </View>
    </View>
  );
}

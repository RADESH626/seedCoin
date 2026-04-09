import React, { useState, useCallback } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Bell } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { usePreferences } from '@/src/database/hooks';

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

      <Pressable className="w-10 h-10 rounded-full bg-dark-800 border border-dark-700 items-center justify-center relative">
        <Bell color="#d1d5db" size={20} />
        <View className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-dark-800" />
      </Pressable>
    </View>
  );
}

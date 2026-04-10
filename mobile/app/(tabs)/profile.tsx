import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { User, Settings, Database, Info, Save, RotateCcw, ChevronRight, Wallet } from 'lucide-react-native';
import * as SQLite from 'expo-sqlite';

import { usePreferences, useAccounts } from '@/src/database/hooks';
import { formatMoney } from '@/src/helpers/ui';
import { log } from '@/src/services/logger';
import { DB_NAME } from '@/src/database/connection';
import Colors from '@/constants/Colors';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { getPreference, setPreference } = usePreferences();
  const { accounts, fetchAccounts } = useAccounts();
  const [userName, setUserName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState('');

  useFocusEffect(
    useCallback(() => {
      getPreference('user_name').then(val => {
        setUserName(val || 'Usuario');
        setTempName(val || 'Usuario');
      });
      fetchAccounts();
    }, [getPreference, fetchAccounts])
  );

  const totalCapital = accounts.reduce((sum, acc) => sum + acc.current_balance, 0);

  const handleUpdateName = async () => {
    if (!tempName.trim()) {
      Alert.alert('Error', 'El nombre no puede estar vacío');
      return;
    }
    await setPreference('user_name', tempName.trim());
    setUserName(tempName.trim());
    setIsEditing(false);
    Alert.alert('Éxito', 'Nombre actualizado correctamente');
  };

  const handleReset = () => {
    Alert.alert(
      "Borrado Total (Seguro)",
      "¿Estás completamente seguro? Se eliminarán todas las cuentas, transacciones y ajustes de SeedCoin. Esta acción no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sí, Borrar Todo", 
          style: "destructive",
          onPress: async () => {
            try {
              const db = await SQLite.openDatabaseAsync(DB_NAME);
              await db.execAsync(`
                PRAGMA foreign_keys = OFF;
                DROP TABLE IF EXISTS ACCOUNT;
                DROP TABLE IF EXISTS CATEGORY;
                DROP TABLE IF EXISTS DEBT;
                DROP TABLE IF EXISTS TRANSACTIONS;
                DROP TABLE IF EXISTS BUDGET;
                DROP TABLE IF EXISTS PREFERENCES;
                PRAGMA user_version = 0;
                PRAGMA foreign_keys = ON;
              `);
              log.info('Profile: Base de datos reseteada con éxito.');
              Alert.alert("Realizado", "Base de datos purgada. Reinicia la app para configurarla de nuevo.");
            } catch(e) {
              log.error('Profile: Error en reset', e);
              Alert.alert("Error", "No se pudo limpiar la base de datos.");
            }
          }
        }
      ]
    );
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-dark-900" 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView 
        className="flex-1 px-6"
        style={{ paddingTop: Math.max(insets.top, 24) }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-white text-2xl font-bold mb-8">Perfil</Text>

        {/* Card de Identidad */}
        <View className="bg-dark-800 border border-dark-700 rounded-[32px] p-6 mb-8 items-center">
          <View className="w-20 h-20 rounded-full bg-seed-600 items-center justify-center mb-4 shadow-xl shadow-seed-600/30">
            <User color="#fff" size={40} />
          </View>
          
          {isEditing ? (
            <View className="w-full flex-row gap-2 items-center">
              <TextInput
                autoFocus
                value={tempName}
                onChangeText={setTempName}
                className="flex-1 bg-dark-900 border border-dark-700 rounded-xl px-4 py-2 text-white text-lg font-bold"
              />
              <Pressable 
                onPress={handleUpdateName}
                className="bg-seed-600 p-3 rounded-xl"
              >
                <Save color="#fff" size={20} />
              </Pressable>
            </View>
          ) : (
            <Pressable 
              onPress={() => setIsEditing(true)}
              className="items-center"
            >
              <Text className="text-white text-xl font-bold">{userName}</Text>
              <Text className="text-seed-400 text-xs mt-1 font-medium">Toca para editar nombre</Text>
            </Pressable>
          )}
        </View>

        {/* Sección de Estadísticas Rápidas */}
        <View className="flex-row gap-4 mb-8">
          <View className="flex-1 bg-dark-800 border border-dark-700 rounded-3xl p-4">
            <Text className="text-gray-500 text-[10px] font-bold uppercase mb-1">Capital Total</Text>
            <Text className="text-white font-bold text-lg">{formatMoney(totalCapital, 'COP')}</Text>
          </View>
          <View className="flex-1 bg-dark-800 border border-dark-700 rounded-3xl p-4">
            <Text className="text-gray-500 text-[10px] font-bold uppercase mb-1">Cuentas</Text>
            <Text className="text-white font-bold text-lg">{accounts.length}</Text>
          </View>
        </View>

        {/* Opciones de Menú */}
        <Text className="text-gray-500 text-[10px] font-bold uppercase mb-4 ml-2 tracking-widest">Ajustes Generales</Text>
        
        <View className="bg-dark-800 border border-dark-700 rounded-[32px] overflow-hidden mb-8">
          <Pressable className="flex-row items-center justify-between p-5 border-b border-dark-700 active:bg-dark-700/50">
            <View className="flex-row items-center gap-4">
              <View className="w-10 h-10 rounded-2xl bg-blue-500/10 items-center justify-center">
                <Wallet size={20} color="#3b82f6" />
              </View>
              <Text className="text-white font-medium">Gestionar Cuentas</Text>
            </View>
            <ChevronRight size={18} color="#475569" />
          </Pressable>

          <Pressable className="flex-row items-center justify-between p-5 border-b border-dark-700 active:bg-dark-700/50">
            <View className="flex-row items-center gap-4">
              <View className="w-10 h-10 rounded-2xl bg-orange-500/10 items-center justify-center">
                <Settings size={20} color="#f97316" />
              </View>
              <Text className="text-white font-medium">Preferencias UI</Text>
            </View>
            <ChevronRight size={18} color="#475569" />
          </Pressable>

          <Pressable 
            onPress={handleReset}
            className="flex-row items-center justify-between p-5 active:bg-dark-700/50"
          >
            <View className="flex-row items-center gap-4">
              <View className="w-10 h-10 rounded-2xl bg-red-500/10 items-center justify-center">
                <RotateCcw size={20} color="#ef4444" />
              </View>
              <Text className="text-red-400 font-medium">Reiniciar Base de Datos</Text>
            </View>
            <ChevronRight size={18} color="#475569" />
          </Pressable>
        </View>

        {/* Footer info */}
        <View className="items-center mb-20 opacity-40">
          <View className="flex-row items-center gap-2 mb-1">
            <Database size={12} color="#94a3b8" />
            <Text className="text-gray-400 text-[10px] font-bold">SQLite v3.x Local Storage</Text>
          </View>
          <Text className="text-gray-500 text-[10px]">SeedCoin v1.0.0 • 2026</Text>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

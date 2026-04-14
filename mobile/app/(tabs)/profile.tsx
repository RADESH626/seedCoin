import { useState, useCallback } from 'react';
import { Text, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { usePreferences } from '@/src/hooks/usePreferences';
import { useAccounts } from '@/src/hooks/useAccounts';
import { log } from '@/src/services/logger';
import { resetDatabase } from '@/src/database/utils';

// Componentes Atómicos
import { ProfileIdentityCard } from '@/components/profile/ProfileIdentityCard';
import { ProfileStats } from '@/components/profile/ProfileStats';
import { ProfileMenu } from '@/components/profile/ProfileMenu';
import { ProfileFooter } from '@/components/profile/ProfileFooter';

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
              await resetDatabase();
              Alert.alert("Realizado", "Base de datos purgada. Reinicia la app para configurarla de nuevo.");
            } catch (e) {
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

        <ProfileIdentityCard 
          userName={userName}
          tempName={tempName}
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onSave={handleUpdateName}
          onTempNameChange={setTempName}
        />

        <ProfileStats 
          totalCapital={totalCapital}
          accountsCount={accounts.length}
        />

        <ProfileMenu onResetDatabase={handleReset} />

        <ProfileFooter />

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

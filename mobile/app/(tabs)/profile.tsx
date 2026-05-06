import { useState, useCallback } from 'react';
import { ScrollView, Alert, KeyboardAvoidingView, Platform, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { usePreferences } from '@/src/modules/profile/hooks/usePreferences';
import { useAccounts } from '@/src/modules/accounts/hooks/useAccounts';
import { log } from '@/src/shared/services/logger';
import { ProfileService } from '@/src/modules/profile/services/ProfileService';
import { getTotalBalance } from '@/src/modules/accounts/services/AccountService';

// Componentes Atómicos
import { ProfileIdentityCard } from '@/src/modules/profile/components/ProfileIdentityCard';
import { ProfileStats } from '@/src/modules/profile/components/ProfileStats';
import { ProfileMenu } from '@/src/modules/profile/components/ProfileMenu';
import { ProfileFooter } from '@/src/modules/profile/components/ProfileFooter';
import { ScreenHeader } from '@/components/ui/ScreenHeader';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { getPreference, setPreference } = usePreferences();
  const { accounts, fetchAccounts } = useAccounts();
  const [userName, setUserName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState('');
  const [totalCapital, setTotalCapital] = useState(0);

  useFocusEffect(
    useCallback(() => {
      getPreference('user_name').then(val => {
        setUserName(val || 'Usuario');
        setTempName(val || 'Usuario');
      });
      fetchAccounts();
      
      // Obtenemos el balance total directamente del servicio para mayor precisión
      getTotalBalance().then(setTotalCapital);
    }, [getPreference, fetchAccounts])
  );

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
              await ProfileService.purgeAllData();
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
  
  const showDeveloperFeatures = process.env.EXPO_PUBLIC_APP_VARIANT === 'development';

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-dark-900" 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView 
        className="flex-1 standard-screen-px"
        style={{ paddingTop: Math.max(insets.top, 24) }}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader title="Perfil" subtitle="Gestiona tu cuenta y ajustes" />

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

        <ProfileMenu 
          onResetDatabase={handleReset} 
          showDeveloperFeatures={showDeveloperFeatures}
        />

        <ProfileFooter />

        <View className="h-20" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


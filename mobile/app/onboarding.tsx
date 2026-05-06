import { useState, useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { log } from '@/src/shared/services/logger';
import { usePreferences } from '@/src/modules/profile/hooks/usePreferences';
import { useAccounts } from '@/src/modules/accounts/hooks/useAccounts';
import { useSingleAction } from '@/src/shared/hooks/useSingleAction';
import { NameSelection, AccountStart } from '@/src/modules/onboarding/components/OnboardingSections';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const { getPreference, setPreference } = usePreferences();
  const { accounts, fetchAccounts, isInitialLoad } = useAccounts();
  const [userName, setUserName] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const { execute: handleCreateAccount } = useSingleAction(() => 
    router.push('/add-account' as any)
  );

  useEffect(() => {
    // Solo redirigir si ya terminamos la carga inicial y detectamos cuentas
    if (!isInitialLoad && accounts.length > 0) {
      log.info('OnboardingScreen: Cuentas detectadas, redirigiendo al Dashboard...');
      router.replace('/(tabs)');
    }
  }, [accounts, isInitialLoad]);

  useFocusEffect(useCallback(() => {
    let active = true;

    const init = async () => {
      log.info('OnboardingScreen: Enfocado. Estabilizando conexión...');
      // Un pequeño delay para que la animación de navegación respire
      await new Promise(resolve => setTimeout(resolve, 100));

      if (!active) return;

      try {
        const name = await getPreference('user_name');
        if (active) {
          setUserName(name || null);
          await fetchAccounts();
          setChecked(true);
        }
      } catch (e) {
        log.error('OnboardingScreen: Error en carga inicial', e);
        if (active) setChecked(true);
      }
    };

    init();
    return () => { active = false; };
  }, [getPreference, fetchAccounts]));

  const handleSaveName = async (name: string) => {
    if (name.trim().length > 0) {
      const sanitizedName = name.trim();
      log.info('OnboardingScreen: Guardando nombre de usuario', { name: sanitizedName });
      await setPreference('user_name', sanitizedName);
      setUserName(sanitizedName);
    }
  };

  if (!checked) return null;

  return (
    <View 
      className="flex-1 bg-dark-900"
      style={{ paddingTop: Math.max(insets.top, 20) }}
    >
      {!userName ? (
        <NameSelection 
          onContinue={handleSaveName}
        />
      ) : (
        <AccountStart 
          userName={userName}
          onCreateAccount={handleCreateAccount}
        />
      )}
    </View>
  );
}


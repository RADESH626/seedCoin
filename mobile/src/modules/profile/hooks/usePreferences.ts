import { useCallback } from 'react';
import { log } from '@/src/shared/services/logger';
import { PreferenceService } from '@/src/modules/profile/services/PreferenceService';

/**
 * Hook para la gestión de preferencias de usuario.
 * Actúa como orquestador del PreferenceService.
 */
export function usePreferences() {
  const getPreference = useCallback(async (key: string): Promise<string | null> => {
    try {
      return await PreferenceService.get(key);
    } catch (error: unknown) {
      log.error(`usePreferences: Error getting preference ${key}`, error);
      return null;
    }
  }, []);

  const setPreference = useCallback(async (key: string, value: string): Promise<void> => {
    try {
      await PreferenceService.set(key, value);
      log.info(`usePreferences: Preferencia ${key} actualizada con éxito.`);
    } catch (error: unknown) {
      log.error(`usePreferences: Error setting preference ${key}`, error);
    }
  }, []);

  return {
    getPreference,
    setPreference,
  };
}


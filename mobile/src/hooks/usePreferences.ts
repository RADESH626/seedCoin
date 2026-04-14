import { useCallback } from 'react';
import { getDBConnection } from '../database/connection';
import { QUERIES_PREFERENCES } from '../database/queries';
import { withNativeRetry } from '../helpers/database';
import { log } from '../services/logger';
import type { PreferenceRow } from '../database/types';

export function usePreferences() {
  const getPreference = useCallback(async (key: string): Promise<string | null> => {
    try {
      return await withNativeRetry(async () => {
        const db = await getDBConnection();
        const result = await db.getFirstAsync<PreferenceRow>(QUERIES_PREFERENCES.GET_BY_KEY, [key]);
        return result?.preference_value ?? null;
      }, `usePreferences.get(${key})`);
    } catch (error: unknown) {
      log.error(`usePreferences: Error getting preference ${key}`, error);
      return null;
    }
  }, []);

  const setPreference = useCallback(async (key: string, value: string): Promise<void> => {
    try {
      await withNativeRetry(async () => {
        const db = await getDBConnection();
        await db.runAsync(QUERIES_PREFERENCES.SET_KEY, [key, value]);
        log.info(`usePreferences: Preferencia ${key} actualizada con éxito.`);
      }, `usePreferences.set(${key})`);
    } catch (error: unknown) {
      log.error(`usePreferences: Error setting preference ${key}`, error);
    }
  }, []);

  return {
    getPreference,
    setPreference,
  };
}

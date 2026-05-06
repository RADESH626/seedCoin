import { getDBConnection } from '@/src/database/connection';
import { QUERIES_PREFERENCES } from '@/src/database/queries';
import { withNativeRetry } from '@/src/shared/utils/database';
import type { PreferenceRow } from '@/src/database/types';

/**
 * Servicio para la gestión de preferencias de usuario en la base de datos local.
 * Abstrae la persistencia y recuperación de configuraciones del sistema.
 */
export const PreferenceService = {
  /**
   * Obtiene el valor de una preferencia por su clave.
   */
  async get(key: string): Promise<string | null> {
    return await withNativeRetry(async () => {
      const db = await getDBConnection();
      const result = await db.getFirstAsync<PreferenceRow>(QUERIES_PREFERENCES.GET_BY_KEY, [key]);
      return result?.preference_value ?? null;
    }, `PreferenceService.get(${key})`);
  },

  /**
   * Guarda o actualiza una preferencia de usuario.
   */
  async set(key: string, value: string): Promise<void> {
    await withNativeRetry(async () => {
      const db = await getDBConnection();
      await db.runAsync(QUERIES_PREFERENCES.SET_KEY, [key, value]);
    }, `PreferenceService.set(${key})`);
  }
};


import { resetDatabase } from '../database/utils';

/**
 * Servicio para manejar operaciones globales del perfil del usuario.
 * Centraliza acciones administrativas como el borrado de datos.
 */
export const ProfileService = {
  /**
   * Ejecuta el borrado total de la base de datos local.
   * Encapsula la llamada a la utilidad de bajo nivel.
   */
  async purgeAllData(): Promise<void> {
    await resetDatabase();
  }
};

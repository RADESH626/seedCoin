import { getDBConnection } from '../database/connection';
import { QUERIES_CATEGORY } from '../database/queries';
import { withNativeRetry } from '../helpers/database';
import type { Category } from '../database/types';

/**
 * Servicio para la gestión de categorías (gastos e ingresos).
 * Centraliza las consultas al esquema de categorías de la base de datos.
 */
export const CategoryService = {
  /**
   * Obtiene todas las categorías activas.
   */
  async getAll(): Promise<Category[]> {
    return await withNativeRetry(async () => {
      const db = await getDBConnection();
      return await db.getAllAsync<Category>(QUERIES_CATEGORY.GET_ALL);
    }, 'CategoryService.getAll');
  },

  /**
   * Obtiene únicamente las categorías marcadas como egresos (is_income = 0).
   */
  async getAllExpenses(): Promise<Category[]> {
    return await withNativeRetry(async () => {
      const db = await getDBConnection();
      return await db.getAllAsync<Category>(QUERIES_CATEGORY.GET_ALL_EXPENSES);
    }, 'CategoryService.getAllExpenses');
  }
};

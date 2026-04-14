import { useCallback, useState } from 'react';
import { log } from '../services/logger';
import { CategoryService } from '../services/CategoryService';
import type { Category } from '../database/types';

/**
 * Hook para la gestión de categorías.
 * Orquesta la recuperación de categorías de gastos e ingresos.
 */
export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const result = await CategoryService.getAll();
      setCategories(result);
    } catch (error: unknown) {
      log.error('useCategories: Error fetching categories', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchExpensesCategories = useCallback(async () => {
    try {
      setLoading(true);
      const result = await CategoryService.getAllExpenses();
      setCategories(result);
    } catch (error: unknown) {
      log.error('useCategories: Error fetching expense categories', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { categories, fetchCategories, fetchExpensesCategories, loading };
}

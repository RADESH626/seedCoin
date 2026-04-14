import { useCallback, useState } from 'react';
import { getDBConnection } from '../database/connection';
import { QUERIES_CATEGORY } from '../database/queries';
import { withNativeRetry } from '../helpers/database';
import { log } from '../services/logger';
import type { Category } from '../database/types';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = useCallback(async () => {
    try {
      await withNativeRetry(async () => {
        const db = await getDBConnection();
        const result = await db.getAllAsync<Category>(QUERIES_CATEGORY.GET_ALL);
        setCategories(result);
      }, 'useCategories.fetchCategories');
    } catch (error: unknown) {
      log.error('useCategories: Error fetching categories', error);
    }
  }, []);

  const fetchExpensesCategories = useCallback(async () => {
    try {
      await withNativeRetry(async () => {
        const db = await getDBConnection();
        const result = await db.getAllAsync<Category>(QUERIES_CATEGORY.GET_ALL_EXPENSES);
        setCategories(result);
      }, 'useCategories.fetchExpenses');
    } catch (error: unknown) {
      log.error('useCategories: Error fetching expense categories', error);
    }
  }, []);

  return { categories, fetchCategories, fetchExpensesCategories };
}

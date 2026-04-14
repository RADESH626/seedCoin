import { useCallback, useState } from 'react';
import { log } from '../services/logger';
import { 
  getBudgetsWithProgress, 
  createBudget, 
  deleteBudget 
} from '../services/BudgetService';
import type { BudgetWithProgress } from '../database/types';

export function useBudgets() {
  const [loading, setLoading] = useState(false);
  const [budgets, setBudgets] = useState<BudgetWithProgress[]>([]);

  const fetchBudgets = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getBudgetsWithProgress();
      setBudgets(result);
    } catch (error: unknown) {
      log.error('useBudgets: Error al obtener presupuestos', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addBudget = useCallback(async (categoryId: number, limit: number) => {
    try {
      await createBudget(categoryId, limit);
      await fetchBudgets();
      log.info('useBudgets: Presupuesto creado con éxito');
    } catch (error: unknown) {
      log.error('useBudgets: Error al crear presupuesto', error);
    }
  }, [fetchBudgets]);

  const removeBudget = useCallback(async (budgetId: number) => {
    try {
      await deleteBudget(budgetId);
      await fetchBudgets();
    } catch (error: unknown) {
      log.error('useBudgets: Error al eliminar presupuesto', error);
    }
  }, [fetchBudgets]);

  return {
    loading,
    budgets,
    fetchBudgets,
    addBudget,
    removeBudget,
  };
}

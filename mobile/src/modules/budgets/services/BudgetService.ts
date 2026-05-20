import { QUERIES_BUDGET } from '@/src/database/queries';
import type { BudgetWithProgress } from '@/src/database/types';
import { getDBConnection } from '@/src/database/connection';
import { fromCents, toCents } from '@/src/shared/utils/currency';
import { withNativeRetry } from '@/src/shared/utils/database';
import { getCategoryById } from '@/src/modules/categories/constants/categories';

interface BudgetProgressDbRow {
  budget_id: number;
  limit_amount: number;
  period: string;
  category_id: string;
  total_spent: number;
}

export const getBudgetsWithProgress = async (): Promise<BudgetWithProgress[]> => {
  return await withNativeRetry(async () => {
    const db = await getDBConnection();
    const result = await db.getAllAsync<BudgetProgressDbRow>(QUERIES_BUDGET.GET_BUDGETS_WITH_PROGRESS);
    
    return (result ?? []).map(budget => {
      const category = getCategoryById(budget.category_id);
      return {
        ...budget,
        category_name: category?.name || 'Desconocido',
        category_icon: category?.icon || 'help-circle',
        category_color: category?.color || '#9ca3af',
        limit_amount: fromCents(budget.limit_amount),
        total_spent: fromCents(budget.total_spent)
      } as BudgetWithProgress;
    });
  }, 'BudgetService.getWithProgress');
};

export const createBudget = async (categoryId: string, limit: number) => {
  const limitInCents = toCents(limit);
  
  return await withNativeRetry(async () => {
    const db = await getDBConnection();
    await db.runAsync(QUERIES_BUDGET.INSERT_BUDGET, [categoryId, 'MONTHLY', limitInCents, 1]);
    return true;
  }, 'BudgetService.createBudget');
};

export const deleteBudget = async (budgetId: number) => {
  return await withNativeRetry(async () => {
    const db = await getDBConnection();
    await db.runAsync(QUERIES_BUDGET.DELETE_BUDGET, [budgetId]);
    return true;
  }, 'BudgetService.deleteBudget');
};

export const updateBudget = async (budgetId: number, limit: number) => {
  const limitInCents = toCents(limit);
  
  return await withNativeRetry(async () => {
    const db = await getDBConnection();
    await db.runAsync(QUERIES_BUDGET.UPDATE_BUDGET_AMOUNT, [limitInCents, budgetId]);
    return true;
  }, 'BudgetService.updateBudget');
};



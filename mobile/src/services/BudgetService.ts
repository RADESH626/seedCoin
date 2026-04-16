import { QUERIES_BUDGET } from '../database/queries';
import type { BudgetWithProgress } from '../database/types';
import { getDBConnection } from '../database/connection';
import { fromCents, toCents } from '../helpers/currency';
import { withNativeRetry } from '../helpers/database';

export const getBudgetsWithProgress = async (): Promise<BudgetWithProgress[]> => {
  return await withNativeRetry(async () => {
    const db = await getDBConnection();
    const result = await db.getAllAsync<BudgetWithProgress>(QUERIES_BUDGET.GET_BUDGETS_WITH_PROGRESS);
    
    return (result ?? []).map(budget => ({
      ...budget,
      limit_amount: fromCents(budget.limit_amount),
      total_spent: fromCents(budget.total_spent)
    }));
  }, 'BudgetService.getWithProgress');
};

export const createBudget = async (categoryId: number, limit: number) => {
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


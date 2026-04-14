import { useCallback, useState } from 'react';
import { QUERIES_ACCOUNT, QUERIES_CATEGORY, QUERIES_TRANSACTION, QUERIES_PREFERENCES, QUERIES_BUDGET } from './queries';
import { log } from '../services/logger';
import { getDBConnection } from './connection';
import type {
  Account,
  Category,
  RecentTransaction,
  DetailedTransaction,
  MonthlyStats,
  TotalBalanceRow,
  PreferenceRow,
  BudgetWithProgress,
  isNativeDatabaseError,
} from './types';
import { isNativeDatabaseError as checkNativeError } from './types';

// ====================
// HELPER: Retry para errores nativos de SQLite
// ====================

async function withNativeRetry<T>(
  fn: () => Promise<T>,
  label: string,
  maxRetries = 1,
  delayMs = 500
): Promise<T> {
  try {
    return await fn();
  } catch (error: unknown) {
    if (maxRetries > 0 && checkNativeError(error)) {
      log.warn(`${label}: NPE detectado en el motor nativo. Reintentando en ${delayMs}ms...`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
      return withNativeRetry(fn, label, maxRetries - 1, delayMs);
    }
    log.error(`${label}: Error`, error);
    throw error;
  }
}

// ====================
// Hook: Cuentas (ACCOUNT)
// ====================

export function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAccounts = useCallback(async () => {
    try {
      log.debug('useAccounts: Fetching accounts...');
      const db = await getDBConnection();
      const result = await db.getAllAsync<Account>(QUERIES_ACCOUNT.GET_ALL_ACTIVE_ORDERED);
      setAccounts(result);
      log.debug('useAccounts: Accounts recuperadas', { count: result.length });
    } catch (error: unknown) {
      if (checkNativeError(error)) {
        log.warn('useAccounts: NPE detectado. Reintentando en 500ms...');
        const db = await getDBConnection();
        const result = await db.getAllAsync<Account>(QUERIES_ACCOUNT.GET_ALL_ACTIVE_ORDERED);
        setAccounts(result);
      } else {
        log.error('useAccounts: Error fetching accounts', error);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const addAccount = useCallback(async (name: string, accountType: string, initialBalance: number) => {
    try {
      const db = await getDBConnection();
      await db.runAsync(
        QUERIES_ACCOUNT.INSERT_INDEXED,
        [name, accountType, initialBalance, initialBalance]
      );
      await fetchAccounts();
    } catch (error: unknown) {
      log.error('useAccounts: Error adding account', error);
    }
  }, [fetchAccounts]);

  return {
    accounts,
    fetchAccounts,
    addAccount,
  };
}

// ====================
// Hook: Categorías (CATEGORY)
// ====================

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = useCallback(async () => {
    try {
      const db = await getDBConnection();
      const result = await db.getAllAsync<Category>(QUERIES_CATEGORY.GET_ALL);
      setCategories(result);
    } catch (error: unknown) {
      log.error('useCategories: Error fetching categories', error);
    }
  }, []);

  const fetchExpensesCategories = useCallback(async () => {
    try {
      const db = await getDBConnection();
      const result = await db.getAllAsync<Category>(QUERIES_CATEGORY.GET_ALL_EXPENSES);
      setCategories(result);
    } catch (error: unknown) {
      log.error('useCategories: Error fetching expense categories', error);
    }
  }, []);

  return { categories, fetchCategories, fetchExpensesCategories };
}

// ====================
// Hook: Dashboard (Lógica analítica)
// ====================

export function useDashboard() {
  const [loading, setLoading] = useState(true);
  const [totalBalance, setTotalBalance] = useState(0);
  const [balanceGrowthPct, setBalanceGrowthPct] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpense, setMonthlyExpense] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState<RecentTransaction[]>([]);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const db = await getDBConnection();

      const balanceResult = await db.getFirstAsync<TotalBalanceRow>(QUERIES_ACCOUNT.GET_TOTAL_BALANCE);
      setTotalBalance(balanceResult?.total ?? 0);

      const statsResult = await db.getFirstAsync<MonthlyStats>(QUERIES_TRANSACTION.GET_MONTHLY_STATS);
      setMonthlyIncome(statsResult?.total_income ?? 0);
      setMonthlyExpense(statsResult?.total_expense ?? 0);

      const txsResult = await db.getAllAsync<RecentTransaction>(QUERIES_TRANSACTION.GET_RECENT_WITH_CATEGORY);
      setRecentTransactions(txsResult ?? []);
    } catch (error: unknown) {
      if (checkNativeError(error)) {
        log.warn('useDashboard: Reintentando carga tras posible colisión nativa...');
        await new Promise(resolve => setTimeout(resolve, 500));
        const db = await getDBConnection();
        const balanceResult = await db.getFirstAsync<TotalBalanceRow>(QUERIES_ACCOUNT.GET_TOTAL_BALANCE);
        setTotalBalance(balanceResult?.total ?? 0);
      } else {
        log.error('useDashboard: Error fetching dashboard data', error);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    totalBalance,
    balanceGrowthPct,
    monthlyIncome,
    monthlyExpense,
    recentTransactions,
    fetchDashboardData,
  };
}

// ====================
// Hook: Historial de transacciones
// ====================

export function useTransactionsHistory() {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<DetailedTransaction[]>([]);

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);

      await withNativeRetry(async () => {
        const db = await getDBConnection();
        const result = await db.getAllAsync<DetailedTransaction>(QUERIES_TRANSACTION.GET_ALL_DETAILED);
        setHistory(result ?? []);
      }, 'useTransactionsHistory');

    } catch (error: unknown) {
      log.error('useTransactionsHistory: Error al obtener historial', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    history,
    fetchHistory,
  };
}

// ====================
// Hook: Presupuestos y límites mensuales
// ====================

export function useBudgets() {
  const [loading, setLoading] = useState(false);
  const [budgets, setBudgets] = useState<BudgetWithProgress[]>([]);

  const fetchBudgets = useCallback(async () => {
    try {
      setLoading(true);

      await withNativeRetry(async () => {
        const db = await getDBConnection();
        const result = await db.getAllAsync<BudgetWithProgress>(QUERIES_BUDGET.GET_BUDGETS_WITH_PROGRESS);
        setBudgets(result ?? []);
      }, 'useBudgets');

    } catch (error: unknown) {
      log.error('useBudgets: Error al obtener presupuestos', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addBudget = useCallback(async (categoryId: number, limit: number) => {
    try {
      const db = await getDBConnection();
      await db.runAsync(QUERIES_BUDGET.INSERT_BUDGET, [categoryId, 'MONTHLY', limit, 1]);
      await fetchBudgets();
      log.info('useBudgets: Presupuesto creado con éxito');
    } catch (error: unknown) {
      log.error('useBudgets: Error al crear presupuesto', error);
    }
  }, [fetchBudgets]);

  const deleteBudget = useCallback(async (budgetId: number) => {
    try {
      const db = await getDBConnection();
      await db.runAsync(QUERIES_BUDGET.DELETE_BUDGET, [budgetId]);
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
    deleteBudget,
  };
}

// ====================
// Hook: Preferencias de usuario
// ====================

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

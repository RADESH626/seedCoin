import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react';
import { QUERIES_ACCOUNT, QUERIES_CATEGORY, QUERIES_TRANSACTION, QUERIES_PREFERENCES } from './queries';
import { log } from '../services/logger';
import { DB_NAME } from './connection';
import * as SQLite from 'expo-sqlite';

// Hook personalizado para operaciones de cuentas (ACCOUNT)
export function useAccounts() {
  const db = useSQLiteContext();
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAccounts = useCallback(async (retryCount = 0) => {
    try {
      log.debug('useAccounts: Fetching accounts...');
      const db = await SQLite.openDatabaseAsync(DB_NAME);
      const result = await db.getAllAsync<any>(QUERIES_ACCOUNT.GET_ALL_ACTIVE_ORDERED);
      setAccounts(result);
      log.debug('useAccounts: Accounts recuperadas', { count: result.length });
    } catch (e: any) {
      if (retryCount < 1 && e?.message?.includes('NativeDatabase.prepareAsync')) {
        log.warn('useAccounts: NPE detectado en el motor nativo. Reintentando en 500ms...');
        setTimeout(() => fetchAccounts(retryCount + 1), 500);
      } else {
        log.error('useAccounts: Error fetching accounts', e);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const addAccount = useCallback(async (name: string, account_type: string, initial_balance: number) => {
    try {
      await db.runAsync(
        QUERIES_ACCOUNT.INSERT_INDEXED,
        [name, account_type, initial_balance, initial_balance]
      );
      await fetchAccounts(); // Refrescar estado local después de insertar
    } catch (e) {
      console.error('Error adding account', e);
    }
  }, [db, fetchAccounts]);

  return {
    accounts,
    fetchAccounts,
    addAccount,
  };
}

// Hook personalizado para categorías (CATEGORY)
export function useCategories() {
  const db = useSQLiteContext();
  const [categories, setCategories] = useState<any[]>([]);

  const fetchCategories = useCallback(async () => {
    try {
      const result = await db.getAllAsync(QUERIES_CATEGORY.GET_ALL_ORDERED);
      setCategories(result);
    } catch (e) {
      console.error('Error fetching categories', e);
    }
  }, [db]);

  return {
    categories,
    fetchCategories,
  };
}

// Hook del Dashboard (Lógica analítica de la app)
export function useDashboard() {
  const db = useSQLiteContext();
  const [loading, setLoading] = useState(true);
  
  // Estados analíticos
  const [totalBalance, setTotalBalance] = useState(0);
  const [balanceGrowthPct, setBalanceGrowthPct] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpense, setMonthlyExpense] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);

  const fetchDashboardData = useCallback(async (retryCount = 0) => {
    try {
      setLoading(true);

      // 1. Balance Total Actual
      const balanceResult = await db.getFirstAsync<any>(QUERIES_ACCOUNT.GET_TOTAL_BALANCE);
      const currentTotal = balanceResult?.total || 0;
      setTotalBalance(currentTotal);

      // 2. Ingresos y Gastos de ESTE mes
      const statsResult = await db.getFirstAsync<any>(QUERIES_TRANSACTION.GET_MONTHLY_STATS);
      const income = statsResult?.total_income || 0;
      const expense = statsResult?.total_expense || 0;
      setMonthlyIncome(income);
      setMonthlyExpense(expense);

      // 3. Cálculo del % vs Mes Anterior
      // Balance Inicio de Mes = Balance Actual - (Ingresos Mes - Gastos Mes)
      const netThisMonth = income - expense;
      const txsResult = await db.getAllAsync<any>(QUERIES_TRANSACTION.GET_RECENT_WITH_CATEGORY);

      setTotalBalance(balanceResult?.total || 0);
      setMonthlyIncome(statsResult?.total_income || 0);
      setMonthlyExpense(statsResult?.total_expense || 0);
      setRecentTransactions(txsResult || []);
    } catch (e: any) {
      if (retryCount < 1 && e?.message?.includes('NativeDatabase.prepareAsync')) {
        log.warn('useDashboard: Reintentando carga tras posible colisión nativa...');
        setTimeout(() => fetchDashboardData(retryCount + 1), 500);
      } else {
        log.error('useDashboard: Error fetching dashboard data', e);
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
    fetchDashboardData
  };
}

/**
 * Hook para obtener y filtrar el historial completo de transacciones
 */
export function useTransactionsHistory() {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  const fetchHistory = useCallback(async (retryCount = 0) => {
    try {
      setLoading(true);
      const db = await SQLite.openDatabaseAsync(DB_NAME);
      const result = await db.getAllAsync<any>(QUERIES_TRANSACTION.GET_ALL_DETAILED);
      setHistory(result || []);
    } catch (e: any) {
      if (retryCount < 1 && e?.message?.includes('NativeDatabase.prepareAsync')) {
        log.warn('useTransactionsHistory: Reintentando carga del historial...');
        setTimeout(() => fetchHistory(retryCount + 1), 500);
      } else {
        log.error('useTransactionsHistory: Error al obtener historial', e);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    history,
    fetchHistory
  };
}

// Hook para gestionar preferencias de usuario (ej. nombre temporal/definitivo)
export function usePreferences() {
  const db = useSQLiteContext();
  
  const getPreference = useCallback(async (key: string, retryCount = 0): Promise<string | null> => {
    try {
      const db = await SQLite.openDatabaseAsync(DB_NAME);
      const result = await db.getFirstAsync<any>(QUERIES_PREFERENCES.GET_BY_KEY, [key]);
      return result?.preference_value || null;
    } catch (e: any) {
      if (retryCount < 1 && e?.message?.includes('NativeDatabase.prepareAsync')) {
        log.warn(`usePreferences: NPE en getPreference(${key}). Reintentando...`);
        await new Promise(resolve => setTimeout(resolve, 500));
        return getPreference(key, retryCount + 1);
      }
      log.error(`Error getting preference ${key}`, e);
      return null;
    }
  }, []);

  const setPreference = useCallback(async (key: string, value: string, retryCount = 0): Promise<void> => {
    try {
      const db = await SQLite.openDatabaseAsync(DB_NAME);
      await db.runAsync(QUERIES_PREFERENCES.SET_KEY, [key, value]);
      log.info(`usePreferences: Preferencia ${key} actualizada con éxito.`);
    } catch (e: any) {
      if (retryCount < 1 && e?.message?.includes('NativeDatabase.prepareAsync')) {
        log.warn(`usePreferences: NPE en setPreference(${key}). Reintentando...`);
        await new Promise(resolve => setTimeout(resolve, 500));
        return setPreference(key, value, retryCount + 1);
      }
      log.error(`Error setting preference ${key}`, e);
    }
  }, []);

  return {
    getPreference,
    setPreference
  };
}

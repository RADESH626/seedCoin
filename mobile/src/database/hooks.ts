import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react';
import { QUERIES_ACCOUNT, QUERIES_CATEGORY, QUERIES_TRANSACTION, QUERIES_PREFERENCES } from './queries';

// Hook personalizado para operaciones de cuentas (ACCOUNT)
export function useAccounts() {
  const db = useSQLiteContext();
  const [accounts, setAccounts] = useState<any[]>([]);

  const fetchAccounts = useCallback(async () => {
    try {
      const result = await db.getAllAsync(QUERIES_ACCOUNT.GET_ALL_ACTIVE);
      setAccounts(result);
    } catch (e) {
      console.error('Error fetching accounts', e);
    }
  }, [db]);

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

  const fetchDashboardData = useCallback(async () => {
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
      const balanceStartOfMonth = currentTotal - netThisMonth;
      
      let growth = 0;
      if (balanceStartOfMonth > 0) {
        growth = (netThisMonth / balanceStartOfMonth) * 100;
      } else if (balanceStartOfMonth === 0 && currentTotal > 0) {
        growth = 100; // De 0 a un numero positivo es 100% crecimiento nominal
      }
      setBalanceGrowthPct(growth);

      // 4. Transacciones Recientes (Join con Categoria para tener Color y nombre)
      const recentTx = await db.getAllAsync<any>(QUERIES_TRANSACTION.GET_RECENT_WITH_CATEGORY);
      setRecentTransactions(recentTx || []);

    } catch (e) {
      console.error('Error fetching dashboard data', e);
    } finally {
      setLoading(false);
    }
  }, [db]);

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

// Hook para gestionar preferencias de usuario (ej. nombre temporal/definitivo)
export function usePreferences() {
  const db = useSQLiteContext();
  
  const getPreference = useCallback(async (key: string) => {
    try {
      const result = await db.getFirstAsync<any>(QUERIES_PREFERENCES.GET_BY_KEY, [key]);
      return result?.preference_value || null;
    } catch (e) {
      console.error(`Error getting preference ${key}`, e);
      return null;
    }
  }, [db]);

  const setPreference = useCallback(async (key: string, value: string) => {
    try {
      await db.runAsync(QUERIES_PREFERENCES.SET_KEY, [key, value]);
    } catch (e) {
      console.error(`Error setting preference ${key}`, e);
    }
  }, [db]);

  return {
    getPreference,
    setPreference
  };
}

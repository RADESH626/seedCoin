import { SQLiteDatabase } from 'expo-sqlite';

/** Tipos de cuenta soportados (const + type pattern para seguridad y limpieza) */
export const ACCOUNT_TYPES = {
  CASH: { id: 'CASH', label: 'Efectivo', icon: 'wallet' },
  BANK: { id: 'BANK', label: 'Banco', icon: 'landmark' },
  SAVINGS: { id: 'SAVINGS', label: 'Ahorros', icon: 'piggy-bank' },
  CREDIT: { id: 'CREDIT', label: 'Tarjeta', icon: 'credit-card' },
  OTHER: { id: 'OTHER', label: 'Otro', icon: 'more-horizontal' },
} as const;

export type AccountType = keyof typeof ACCOUNT_TYPES;

/** Estados de una transacción */
export const TRANSACTION_STATUS = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  SCHEDULED: 'SCHEDULED', // Plantilla de recurrencia
  DUE: 'DUE',             // Pendiente de aprobación manual
} as const;

export type TransactionStatus = keyof typeof TRANSACTION_STATUS;

/** Frecuencias de recurrencia */
export type RecurrenceFrequency = 'DAILY' | 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY' | 'YEARLY';

/** Filtros de historial */
export type FilterType = 'ALL' | 'INCOME' | 'EXPENSE';

// ====================
// INTERFACES DE BASE DE DATOS
// ====================

export interface Account {
  account_id: number;
  name: string;
  account_type: AccountType;
  initial_balance: number;
  current_balance: number;
  is_active: number;
  yield_rate?: number; // Tasa de rendimiento (anual)
  payment_day?: number; // Día de pago del rendimiento (1-31)
  created_at: string;
}

export interface Transaction {
  transaction_id: number;
  account_id: number;
  category_id: string;
  amount: number;
  is_income: number;
  description: string;
  transaction_date: string;
  status: TransactionStatus;
  recurrence_frequency?: RecurrenceFrequency;
  is_automatic: number; // 0 o 1
  transfer_transaction_id?: number;
  debt_id?: number;
  is_active: number;
  created_at: string;
}

/** Resultado de query para transacciones con información de categoría */
export interface RecentTransaction extends Transaction {
  category_name: string;
  category_icon: string;
  category_color: string;
  account_name?: string;
}

/** Resultado detallado para el historial de transacciones */
export interface DetailedTransaction extends RecentTransaction {
  account_name: string;
}

/** Resultado de estadísticas mensuales */
export interface MonthlyStats {
  total_income: number;
  total_expense: number;
}

/** Resultado para balance total */
export interface TotalBalanceRow {
  total: number;
}

/** Resultado para preferencias */
export interface PreferenceRow {
  preference_key: string;
  preference_value: string;
}

/** Resultado para presupuestos con progreso calculado */
export interface BudgetWithProgress {
  budget_id: number;
  category_id: string;
  category_name: string;
  category_color: string;
  category_icon: string;
  limit_amount: number;
  total_spent: number;
  period: string;
}

// ====================
// SERVICE INPUTS
// ====================

/** Input para crear una transacción (skill clean-functions: máx 3 args) */
export interface CreateTransactionInput {
  accountId: number;
  isIncome: boolean;
  amount: number;
  categoryId: string;
  description?: string;
  status?: TransactionStatus;
  transactionDate?: string;
  recurrenceFrequency?: RecurrenceFrequency;
  isAutomatic?: boolean;
  transferTransactionId?: number;
  debtId?: number;
}

export interface UpdateTransactionInput extends CreateTransactionInput {
  transactionId: number;
}

// ====================
// TYPE GUARDS
// ====================

/** Detecta errores nativos de SQLite que requieren retry (NPE, reyecciones del engine, etc) */
export function isNativeDatabaseError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  
  const msg = error.message;
  return (
    msg.includes('NativeDatabase.prepareAsync') ||
    msg.includes('NativeDatabase.execAsync') ||
    msg.includes('NativeDatabase.getAllAsync') ||
    msg.includes('NativeDatabase.getFirstAsync') ||
    msg.includes('NullPointerException') ||
    msg.includes('database is closed') // Común en race conditions
  );
}
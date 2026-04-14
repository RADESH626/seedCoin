// ====================
// CONST + TYPE ENUMS
// ====================

export const ACCOUNT_TYPE = {
  CASH: 'Efectivo',
  BANK: 'Banco',
  SAVINGS: 'Ahorros',
  CARD: 'Tarjeta',
} as const;

export type AccountType = (typeof ACCOUNT_TYPE)[keyof typeof ACCOUNT_TYPE];

export const TRANSACTION_STATUS = {
  COMPLETED: 'COMPLETED',
  PENDING: 'PENDING',
} as const;

export type TransactionStatus = (typeof TRANSACTION_STATUS)[keyof typeof TRANSACTION_STATUS];

// ====================
// DATABASE ROW INTERFACES
// ====================

export interface Account {
  account_id: number;
  name: string;
  account_type: AccountType;
  initial_balance: number;
  current_balance: number;
  is_active: number;
}

export interface Category {
  category_id: number;
  name: string;
  is_income: number;
  icon: string;
  color: string;
  is_default: number;
}

export interface Transaction {
  transaction_id: number;
  account_id: number;
  debt_id?: number | null;
  transfer_transaction_id?: number | null;
  is_income: number;
  amount: number;
  category_id: number;
  description: string;
  transaction_date: string;
  status: TransactionStatus;
  recurrence_frequency?: string | null;
  is_active: number;
}

// ====================
// QUERY RESULT INTERFACES
// ====================

/** Resultado de GET_RECENT_WITH_CATEGORY (JOIN transacción + categoría) */
export interface RecentTransaction {
  transaction_id: number;
  amount: number;
  is_income: number;
  transaction_date: string;
  description: string;
  category_name: string;
  category_icon: string;
  category_color: string;
}

/** Resultado de GET_ALL_DETAILED (JOIN transacción + categoría + cuenta) */
export interface DetailedTransaction extends RecentTransaction {
  account_name: string;
}

/** Resultado de GET_MONTHLY_STATS */
export interface MonthlyStats {
  total_income: number;
  total_expense: number;
}

/** Resultado de GET_TOTAL_BALANCE */
export interface TotalBalanceRow {
  total: number;
}

/** Resultado de GET_BY_KEY en PREFERENCES */
export interface PreferenceRow {
  preference_value: string;
}

/** Resultado de GET_BUDGETS_WITH_PROGRESS (JOIN budget + categoría + gasto acumulado) */
export interface BudgetWithProgress {
  budget_id: number;
  limit_amount: number;
  period: string;
  category_id: number;
  category_name: string;
  category_icon: string;
  category_color: string;
  total_spent: number;
}

// ====================
// SERVICE INPUT INTERFACES
// ====================

/** Input para crear una transacción (skill clean-functions: máx 3 args) */
export interface CreateTransactionInput {
  accountId: number;
  isIncome: boolean;
  amount: number;
  categoryId: number;
  description?: string;
  status?: TransactionStatus;
  transactionDate?: string;
}

// ====================
// TYPE GUARDS
// ====================

/** Detecta errores nativos de SQLite que requieren retry */
export function isNativeDatabaseError(error: unknown): boolean {
  return (
    error instanceof Error &&
    error.message.includes('NativeDatabase.prepareAsync')
  );
}

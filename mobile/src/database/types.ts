// ====================
// DATABASE INTERFACES
// ====================

export interface Account {
  account_id: number;
  name: string;
  account_type: string;
  initial_balance: number;
  current_balance: number;
  is_active: number;
}

export interface Transaction {
  transaction_id: number;
  account_id: number;
  debt_id?: number | null;
  transfer_transaction_id?: number | null;
  is_income: number | boolean; // boolean es guardado como 0 o 1 en SQLite
  amount: number;
  category_id: number;
  description: string;
  transaction_date: string;
  status: string;
  recurrence_frequency?: string | null;
  is_active: number;
}

// Puedes añadir export interface Category {...} y Budget {...} si los necesitas a futuro

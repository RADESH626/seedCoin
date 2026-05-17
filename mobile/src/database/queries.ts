// ====================
// ACCOUNTS (CUENTAS)
// ====================

export const QUERIES_ACCOUNT = {
  GET_ALL_ACTIVE: `SELECT account_id, name, account_type, initial_balance, current_balance, yield_rate, payment_day, is_active FROM ACCOUNT WHERE is_active = 1;`,

  GET_ALL_ACTIVE_ORDERED: `SELECT account_id, name, account_type, initial_balance, current_balance, yield_rate, payment_day, is_active FROM ACCOUNT WHERE is_active = 1 ORDER BY account_id DESC;`,

  // Usado con parametros indexados (?)
  INSERT_INDEXED: `INSERT INTO ACCOUNT (name, account_type, initial_balance, current_balance) VALUES (?, ?, ?, ?);`,

  // Usado con parametros nombrados ($name)
  INSERT_NAMED: `INSERT INTO ACCOUNT (name, account_type, initial_balance, current_balance, yield_rate, payment_day) VALUES ($name, $type, $initial, $current, $yield_rate, $payment_day);`,

  SOFT_DELETE: `UPDATE ACCOUNT SET is_active = 0 WHERE account_id = $id;`,

  GET_BY_ID: `SELECT account_id, name, account_type, initial_balance, current_balance, yield_rate, payment_day, is_active FROM ACCOUNT WHERE account_id = $id;`,

  UPDATE_NAMED: `UPDATE ACCOUNT SET name = $name, account_type = $type, initial_balance = $initial, current_balance = current_balance + ($initial - initial_balance), yield_rate = $yield_rate, payment_day = $payment_day WHERE account_id = $id;`,

  GET_TOTAL_BALANCE: `SELECT SUM(current_balance) as total FROM ACCOUNT WHERE is_active = 1;`
};

// Categorías son ahora estáticas en src/constants/categories.ts

// ====================
// TRANSACTIONS (TRANSACCIONES)
// ====================

export const QUERIES_TRANSACTION = {
  GET_BY_ACCOUNT: `
    SELECT 
      transaction_id, account_id, debt_id, transfer_transaction_id, 
      is_income, amount, category_id, description, transaction_date, 
      status, recurrence_frequency, is_automatic, is_active 
    FROM TRANSACTIONS 
    WHERE account_id = ? AND is_active = 1 
    ORDER BY transaction_date DESC;
  `,

  GET_RECENT: `
    SELECT 
      transaction_id, account_id, debt_id, transfer_transaction_id, 
      is_income, amount, category_id, description, transaction_date, 
      status, recurrence_frequency, is_automatic, is_active 
    FROM TRANSACTIONS 
    WHERE is_active = 1 AND transaction_date <= datetime('now')
    ORDER BY transaction_date DESC 
    LIMIT ?;
  `,

  GET_RECENT_WITH_CATEGORY: `
    SELECT 
      T.transaction_id, T.amount, T.is_income, T.transaction_date, T.description, T.category_id
    FROM TRANSACTIONS T
    WHERE T.is_active = 1 AND T.transaction_date <= datetime('now')
    ORDER BY T.transaction_date DESC 
    LIMIT 5;
  `,

  GET_MONTHLY_STATS: `
    SELECT 
      SUM(CASE WHEN is_income = 1 THEN amount ELSE 0 END) as total_income,
      SUM(CASE WHEN is_income = 0 THEN amount ELSE 0 END) as total_expense
    FROM TRANSACTIONS 
    WHERE is_active = 1 
      AND status = 'COMPLETED'
      AND transaction_date >= datetime('now', 'start of month');
  `,

  INSERT_NAMED: `
    INSERT INTO TRANSACTIONS (account_id, is_income, amount, category_id, description, transaction_date, status, recurrence_frequency, is_automatic, transfer_transaction_id, debt_id) 
    VALUES ($account_id, $is_income, $amount, $category_id, $description, $transaction_date, $status, $recurrence_frequency, $is_automatic, $transfer_transaction_id, $debt_id);
  `,

  GET_ALL_DETAILED: `
    SELECT 
      T.transaction_id, T.amount, T.is_income, T.transaction_date, T.description,
      T.status, T.recurrence_frequency, T.is_automatic, T.category_id,
      A.name as account_name
    FROM TRANSACTIONS T
    LEFT JOIN ACCOUNT A ON T.account_id = A.account_id
    WHERE T.is_active = 1
    ORDER BY T.transaction_date DESC;
  `,

  GET_BY_ID: `
    SELECT 
      transaction_id, account_id, debt_id, transfer_transaction_id, 
      is_income, amount, category_id, description, transaction_date, 
      status, recurrence_frequency, is_automatic, is_active 
    FROM TRANSACTIONS 
    WHERE transaction_id = ? AND is_active = 1;
  `,

  UPDATE_NAMED: `
    UPDATE TRANSACTIONS SET
      account_id = $account_id,
      is_income = $is_income,
      amount = $amount,
      category_id = $category_id,
      description = $description,
      transaction_date = $transaction_date,
      status = $status,
      recurrence_frequency = $recurrence_frequency,
      is_automatic = $is_automatic
    WHERE transaction_id = $transaction_id;
  `,

  SOFT_DELETE_TRANSACTION: `
    UPDATE TRANSACTIONS SET is_active = 0 WHERE transaction_id = $id;
  `,

  COUNT_BY_ACCOUNT: `SELECT COUNT(*) as total FROM TRANSACTIONS WHERE account_id = $id AND is_active = 1;`,

  GET_ALL_SCHEDULED_DETAILED: `
    SELECT 
      T.transaction_id, T.amount, T.is_income, T.transaction_date, T.description,
      T.status, T.recurrence_frequency, T.is_automatic, T.account_id, T.category_id,
      A.name as account_name
    FROM TRANSACTIONS T
    LEFT JOIN ACCOUNT A ON T.account_id = A.account_id
    WHERE T.is_active = 1 AND (T.status = 'SCHEDULED' OR T.status = 'DUE')
    ORDER BY T.status DESC, T.transaction_date ASC;
  `,

  GET_DUE_SCHEDULED: `
    SELECT * FROM TRANSACTIONS WHERE status = 'SCHEDULED' AND transaction_date <= ? AND is_active = 1;
  `,

  UPDATE_SCHEDULE_DATE: `
    UPDATE TRANSACTIONS SET transaction_date = ? WHERE transaction_id = ?;
  `
};

export const QUERIES_BUDGET = {
  GET_BUDGETS_WITH_PROGRESS: `
    SELECT 
      B.budget_id, B.limit_amount, B.period, B.category_id,
      COALESCE((
        SELECT SUM(amount) 
        FROM TRANSACTIONS T 
        WHERE T.category_id = B.category_id 
          AND T.is_income = 0 
          AND T.is_active = 1 
          AND T.status = 'COMPLETED'
          AND T.transaction_date >= date('now', 'start of month')
      ), 0) as total_spent
    FROM BUDGET B;
  `,

  INSERT_BUDGET: `
    INSERT INTO BUDGET (category_id, period, limit_amount, alerts_enabled)
    VALUES (?, ?, ?, ?);
  `,

  DELETE_BUDGET: `
    DELETE FROM BUDGET WHERE budget_id = ?;
  `,

  UPDATE_BUDGET_AMOUNT: `
    UPDATE BUDGET SET limit_amount = ? WHERE budget_id = ?;
  `
};

// ====================
// PREFERENCES (PREFERENCIAS)
// ====================

export const QUERIES_PREFERENCES = {
  GET_BY_KEY: `SELECT preference_value FROM PREFERENCES WHERE preference_key = ?;`,
  SET_KEY: `INSERT OR REPLACE INTO PREFERENCES (preference_key, preference_value) VALUES (?, ?);`
};

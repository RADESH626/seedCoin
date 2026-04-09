// ====================
// ACCOUNTS (CUENTAS)
// ====================

export const QUERIES_ACCOUNT = {
  GET_ALL_ACTIVE: `SELECT * FROM ACCOUNT WHERE is_active = 1;`,
  
  GET_ALL_ACTIVE_ORDERED: `SELECT * FROM ACCOUNT WHERE is_active = 1 ORDER BY account_id DESC;`,
  
  // Usado con parametros indexados (?)
  INSERT_INDEXED: `INSERT INTO ACCOUNT (name, account_type, initial_balance, current_balance) VALUES (?, ?, ?, ?);`,
  
  // Usado con parametros nombrados ($name)
  INSERT_NAMED: `INSERT INTO ACCOUNT (name, account_type, initial_balance, current_balance) VALUES ($name, $type, $initial, $current);`,
  
  SOFT_DELETE: `UPDATE ACCOUNT SET is_active = 0 WHERE account_id = $id;`,
  
  GET_TOTAL_BALANCE: `SELECT SUM(current_balance) as total FROM ACCOUNT WHERE is_active = 1;`
};

// ====================
// CATEGORIES (CATEGORIAS)
// ====================

export const QUERIES_CATEGORY = {
  GET_ALL_ORDERED: `SELECT * FROM CATEGORY ORDER BY name ASC;`
};

// ====================
// TRANSACTIONS (TRANSACCIONES)
// ====================

export const QUERIES_TRANSACTION = {
  GET_BY_ACCOUNT: `
    SELECT * FROM TRANSACTIONS 
    WHERE account_id = ? AND is_active = 1 
    ORDER BY transaction_date DESC;
  `,
  
  GET_RECENT: `
    SELECT * FROM TRANSACTIONS 
    WHERE is_active = 1 
    ORDER BY transaction_date DESC 
    LIMIT ?;
  `,
  
  GET_RECENT_WITH_CATEGORY: `
    SELECT 
      T.transaction_id, T.amount, T.is_income, T.transaction_date, T.description,
      C.name as category_name, C.icon as category_icon, C.color as category_color
    FROM TRANSACTIONS T
    LEFT JOIN CATEGORY C ON T.category_id = C.category_id
    WHERE T.is_active = 1
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
    INSERT INTO TRANSACTIONS (account_id, is_income, amount, category_id, description, transaction_date, status) 
    VALUES ($account_id, $is_income, $amount, $category_id, $description, $transaction_date, $status);
  `
};

// ====================
// PREFERENCES (PREFERENCIAS)
// ====================

export const QUERIES_PREFERENCES = {
  GET_BY_KEY: `SELECT preference_value FROM PREFERENCES WHERE preference_key = ?;`,
  SET_KEY: `INSERT OR REPLACE INTO PREFERENCES (preference_key, preference_value) VALUES (?, ?);`
};

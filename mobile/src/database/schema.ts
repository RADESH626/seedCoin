export const CREATE_TABLES = `
    CREATE TABLE IF NOT EXISTS ACCOUNT (
        account_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        account_type TEXT NOT NULL,
        initial_balance INTEGER NOT NULL DEFAULT 0,
        current_balance INTEGER NOT NULL DEFAULT 0,
        is_active BOOLEAN NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS CATEGORY (
        category_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        is_income BOOLEAN NOT NULL,
        icon TEXT,
        color TEXT,
        is_default BOOLEAN NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS DEBT (
        debt_id INTEGER PRIMARY KEY AUTOINCREMENT,
        creditor TEXT NOT NULL,
        principal_amount INTEGER NOT NULL,
        interest_rate REAL,
        remaining_amount INTEGER NOT NULL,
        due_date TEXT
    );

    CREATE TABLE IF NOT EXISTS TRANSACTIONS (
        transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
        account_id INTEGER NOT NULL,
        debt_id INTEGER,
        transfer_transaction_id INTEGER,
        is_income BOOLEAN NOT NULL,
        amount INTEGER NOT NULL,
        category_id INTEGER NOT NULL,
        description TEXT,
        transaction_date TEXT NOT NULL,
        status TEXT NOT NULL,
        recurrence_frequency TEXT,
        is_active BOOLEAN NOT NULL DEFAULT 1,
        FOREIGN KEY (account_id) REFERENCES ACCOUNT(account_id),
        FOREIGN KEY (debt_id) REFERENCES DEBT(debt_id),
        FOREIGN KEY (transfer_transaction_id) REFERENCES TRANSACTIONS(transaction_id),
        FOREIGN KEY (category_id) REFERENCES CATEGORY(category_id)
    );

    CREATE TABLE IF NOT EXISTS BUDGET (
        budget_id INTEGER PRIMARY KEY AUTOINCREMENT,
        category_id INTEGER NOT NULL,
        period TEXT NOT NULL,
        limit_amount INTEGER NOT NULL,
        alerts_enabled BOOLEAN NOT NULL DEFAULT 1,
        FOREIGN KEY (category_id) REFERENCES CATEGORY(category_id)
    );
`;

export const CREATE_INDEXES = `
    -- Índices para mejorar el rendimiento de consultas y ordenación
    CREATE INDEX IF NOT EXISTS idx_transactions_date ON TRANSACTIONS(transaction_date);
    CREATE INDEX IF NOT EXISTS idx_transactions_account ON TRANSACTIONS(account_id);
    CREATE INDEX IF NOT EXISTS idx_transactions_category ON TRANSACTIONS(category_id);
    CREATE INDEX IF NOT EXISTS idx_budget_category ON BUDGET(category_id);
`;

export const CREATE_TRIGGERS = `
    -- Actualizar saldo de cuenta al momento de insertar una transacción completada
    CREATE TRIGGER IF NOT EXISTS update_account_balance_after_insert
    AFTER INSERT ON TRANSACTIONS
    WHEN NEW.status = 'COMPLETED' AND NEW.is_active = 1
    BEGIN
        UPDATE ACCOUNT
        SET current_balance = current_balance + CASE WHEN NEW.is_income THEN NEW.amount ELSE -NEW.amount END
        WHERE account_id = NEW.account_id;
    END;

    -- Actualizar deuda cuando se paga la misma
    CREATE TRIGGER IF NOT EXISTS update_debt_balance_after_insert
    AFTER INSERT ON TRANSACTIONS
    WHEN NEW.debt_id IS NOT NULL AND NEW.status = 'COMPLETED' AND NEW.is_income = 0 AND NEW.is_active = 1
    BEGIN
        UPDATE DEBT
        SET remaining_amount = remaining_amount - NEW.amount
        WHERE debt_id = NEW.debt_id;
    END;
`;

export const CREATE_PREFERENCES_TABLE = `
    CREATE TABLE IF NOT EXISTS PREFERENCES (
        preference_key TEXT PRIMARY KEY,
        preference_value TEXT NOT NULL
    );
`;

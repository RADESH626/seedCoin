export const CREATE_TABLES = `
    CREATE TABLE IF NOT EXISTS ACCOUNT (
        account_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        account_type TEXT NOT NULL,
        initial_balance INTEGER NOT NULL DEFAULT 0,
        current_balance INTEGER NOT NULL DEFAULT 0,
        is_active BOOLEAN NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS DEBT (
        debt_id INTEGER PRIMARY KEY AUTOINCREMENT,
        creditor TEXT NOT NULL,
        principal_amount INTEGER NOT NULL,
        interest_rate REAL,
        remaining_amount INTEGER NOT NULL,
        due_date TEXT,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS TRANSACTIONS (
        transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
        account_id INTEGER NOT NULL,
        debt_id INTEGER,
        transfer_transaction_id INTEGER,
        is_income BOOLEAN NOT NULL,
        amount INTEGER NOT NULL,
        category_id TEXT NOT NULL,
        description TEXT,
        transaction_date TEXT NOT NULL,
        status TEXT NOT NULL,
        recurrence_frequency TEXT,
        is_automatic BOOLEAN NOT NULL DEFAULT 1,
        is_active BOOLEAN NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (account_id) REFERENCES ACCOUNT(account_id),
        FOREIGN KEY (debt_id) REFERENCES DEBT(debt_id),
        FOREIGN KEY (transfer_transaction_id) REFERENCES TRANSACTIONS(transaction_id)
    );

    CREATE TABLE IF NOT EXISTS BUDGET (
        budget_id INTEGER PRIMARY KEY AUTOINCREMENT,
        category_id TEXT NOT NULL,
        period TEXT NOT NULL,
        limit_amount INTEGER NOT NULL,
        alerts_enabled BOOLEAN NOT NULL DEFAULT 1
    );
`;

export const CREATE_INDEXES = `
    -- Índices para mejorar el rendimiento de consultas y ordenación
    CREATE INDEX IF NOT EXISTS idx_transactions_date ON TRANSACTIONS(transaction_date);
    CREATE INDEX IF NOT EXISTS idx_transactions_account ON TRANSACTIONS(account_id);
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

    -- Actualizar saldo cuando se borra o inactiva una transacción
    CREATE TRIGGER IF NOT EXISTS update_account_balance_after_delete
    AFTER UPDATE OF is_active ON TRANSACTIONS
    WHEN OLD.is_active = 1 AND NEW.is_active = 0 AND NEW.status = 'COMPLETED'
    BEGIN
        UPDATE ACCOUNT
        SET current_balance = current_balance - CASE WHEN NEW.is_income THEN NEW.amount ELSE -NEW.amount END
        WHERE account_id = NEW.account_id;
    END;

    -- Actualizar saldo cuando se edita una transacción (monto, cuenta o tipo)
    CREATE TRIGGER IF NOT EXISTS update_account_balance_after_update
    AFTER UPDATE ON TRANSACTIONS
    WHEN OLD.is_active = 1 AND NEW.is_active = 1 AND (OLD.status = 'COMPLETED' OR NEW.status = 'COMPLETED')
    BEGIN
        -- Revertir impacto anterior en la cuenta original (solo si antes afectaba el saldo)
        UPDATE ACCOUNT
        SET current_balance = current_balance - CASE WHEN OLD.is_income THEN OLD.amount ELSE -OLD.amount END
        WHERE account_id = OLD.account_id AND OLD.status = 'COMPLETED';

        -- Aplicar nuevo impacto en la cuenta (puede ser la misma o una nueva, solo si ahora afecta el saldo)
        UPDATE ACCOUNT
        SET current_balance = current_balance + CASE WHEN NEW.is_income THEN NEW.amount ELSE -NEW.amount END
        WHERE account_id = NEW.account_id AND NEW.status = 'COMPLETED';
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

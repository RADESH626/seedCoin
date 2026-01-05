export const ACCOUNT_TYPES = {
    CASH: 'CASH',
    BANK_ACCOUNT: 'BANK_ACCOUNT',
    CREDIT_CARD: 'CREDIT_CARD',
    DEBIT_CARD: 'DEBIT_CARD',
    SAVINGS: 'SAVINGS',
    INVESTMENT: 'INVESTMENT',
    DIGITAL_WALLET: 'DIGITAL_WALLET',
} as const;

export type AccountType = keyof typeof ACCOUNT_TYPES;

export const ACCOUNT_TYPE_LABELS: Record<AccountType, string> = {
    CASH: 'Efectivo',
    BANK_ACCOUNT: 'Cuenta Bancaria',
    CREDIT_CARD: 'Tarjeta de Crédito',
    DEBIT_CARD: 'Tarjeta de Débito',
    SAVINGS: 'Ahorros',
    INVESTMENT: 'Inversión',
    DIGITAL_WALLET: 'Billetera Digital',
};

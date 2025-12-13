import { API_URL } from '@/config';

export interface CommonTransactionDTO {
    id: number;
    category: {
        id: number;
        name: string;
        icon: string;
        color: string;
        type: 'INCOME' | 'EXPENSE';
    };
    name: string;
    amount: number;
    type: 'INCOME' | 'EXPENSE';
}

export interface CreateCommonTransactionDTO {
    userId: number;
    categoryId: number;
    name: string;
    amount: number;
    type: 'INCOME' | 'EXPENSE';
}

export const getCommonTransactions = async (userId: number): Promise<CommonTransactionDTO[]> => {
    const response = await fetch(`${API_URL}/transactions/common-presets?userId=${userId}`);
    if (!response.ok) throw new Error('Failed to fetch common transactions');
    return response.json();
};

export const deleteCommonTransaction = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/transactions/common-presets/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete common transaction');
};

export const createCommonTransaction = async (data: CreateCommonTransactionDTO): Promise<CommonTransactionDTO> => {
    const response = await fetch(`${API_URL}/transactions/common-presets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create common transaction');
    return response.json();
};

export const updateCommonTransaction = async (id: number, data: CreateCommonTransactionDTO): Promise<CommonTransactionDTO> => {
    const response = await fetch(`${API_URL}/transactions/common-presets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update common transaction');
    return response.json();
};

export const createTransactionFromCommon = async (commonId: number, accountId: number, transactionDate: string): Promise<any> => {
    const response = await fetch(`${API_URL}/transactions/from-common`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commonId, accountId, transactionDate }),
    });
    if (!response.ok) throw new Error('Failed to create transaction from common preset');
    return response.json();
};

import { API_URL } from '@/config';

export interface ScheduledTransactionDTO {
    id?: number;
    userId: number;
    accountId: number;
    accountName?: string;
    categoryId: number;
    categoryName?: string;
    amount: number;
    description: string;
    nextExecutionDate: string;
    frequency: 'ONCE' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
    type: 'INCOME' | 'EXPENSE';
    isActive?: boolean;
}

export const getScheduledTransactions = async (userId: number): Promise<ScheduledTransactionDTO[]> => {
    const response = await fetch(`${API_URL}/scheduled-transactions/user/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch scheduled transactions');
    return response.json();
};

export const createScheduledTransaction = async (data: ScheduledTransactionDTO): Promise<ScheduledTransactionDTO> => {
    const response = await fetch(`${API_URL}/scheduled-transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create scheduled transaction');
    return response.json();
};

export const updateScheduledTransaction = async (id: number, data: ScheduledTransactionDTO): Promise<ScheduledTransactionDTO> => {
    const response = await fetch(`${API_URL}/scheduled-transactions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update scheduled transaction');
    return response.json();
};

export const deleteScheduledTransaction = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/scheduled-transactions/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete scheduled transaction');
};

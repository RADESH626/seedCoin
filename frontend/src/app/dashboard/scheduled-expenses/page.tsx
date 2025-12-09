"use client";

import { useEffect, useState } from 'react';
import Header from "@/components/Header";
import { useAuth } from '@/context/AuthContext';
import { ScheduledTransactionDTO, getScheduledTransactions } from '@/services/scheduledTransactionService';
import ScheduledTransactionModal from "@/components/dashboard/ScheduledTransactionModal";
import ScheduledTransactionsTable from "@/components/dashboard/ScheduledTransactionsTable";
import { Plus } from 'lucide-react';

export default function ScheduledExpensesPage() {
    const { user, isAuthenticated } = useAuth();
    const [transactions, setTransactions] = useState<ScheduledTransactionDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<ScheduledTransactionDTO | null>(null);

    useEffect(() => {
        if (isAuthenticated && user?.id) {
            loadTransactions();
        }
    }, [isAuthenticated, user]);

    const loadTransactions = async () => {
        try {
            setIsLoading(true);
            const data = await getScheduledTransactions(user!.id);
            setTransactions(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreate = () => {
        setSelectedTransaction(null);
        setIsModalOpen(true);
    };

    const handleEdit = (tx: ScheduledTransactionDTO) => {
        setSelectedTransaction(tx);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedTransaction(null), 200);
    };

    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 font-[family-name:var(--font-geist-sans)]">
            <Header />

            <main className="flex-1 w-full max-w-5xl mx-auto p-4 space-y-8 pb-20">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Transacciones Programadas</h1>
                        <p className="text-gray-500 dark:text-gray-400">Gestiona tus ingresos y gastos recurrentes.</p>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors shadow-sm"
                    >
                        <Plus className="w-5 h-5" />
                        Nuevo
                    </button>
                </div>

                {isLoading ? (
                    <div className="text-center py-10">Cargando...</div>
                ) : (
                    <ScheduledTransactionsTable
                        transactions={transactions}
                        onEdit={handleEdit}
                    />
                )}
            </main>

            <ScheduledTransactionModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSuccess={loadTransactions}
                transactionToEdit={selectedTransaction}
            />
        </div>
    );
}

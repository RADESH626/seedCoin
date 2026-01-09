"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { API_URL } from '@/config';
import TransactionModal from '@/components/Dashboard/TransactionModal';
import { ArrowDownLeft, ArrowUpRight, Pencil } from 'lucide-react';
import AddButton from '@/components/Dashboard/AddButton';

interface TransactionDTO {
    id: number;
    accountId: number;
    category: string;
    description: string;
    amount: number;
    type: 'INCOME' | 'EXPENSE';
    transactionDate: string;
}

export default function TransactionsPage() {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const [transactions, setTransactions] = useState<TransactionDTO[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<TransactionDTO | null>(null);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/iniciar-sesion');
        }
    }, [isAuthenticated, isLoading, router]);

    useEffect(() => {
        if (isAuthenticated && user?.id) {
            fetchTransactions();
        }
    }, [isAuthenticated, user]);

    const fetchTransactions = async () => {
        try {
            setIsLoadingData(true);
            const res = await fetch(`${API_URL}/transactions?userId=${user?.id}`);
            if (res.ok) {
                setTransactions(await res.json());
            }
        } catch (error) {
            console.error("Error fetching transactions:", error);
        } finally {
            setIsLoadingData(false);
        }
    };

    const handleEdit = (transaction: TransactionDTO) => {
        setSelectedTransaction(transaction);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedTransaction(null);
    };

    const handleModalSuccess = () => {
        fetchTransactions();
    };

    if (isLoading || isLoadingData) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-500">Cargando transacciones...</div>;
    }

    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 font-[family-name:var(--font-geist-sans)]">
            {/* Header removed */}

            <main className="flex-1 w-full max-w-5xl mx-auto p-4 pb-20">

                <div className="flex flex-col gap-4 mb-4 justify-center items-center">
                    <div className="flex flex-col justify-center gap-2">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">historial de Transacciones</h1>
                    </div>
                </div>

                <div className="flex flex-col gap-4 mb-4 justify-center items-center">
                    <AddButton label="Agregar Transacción" />
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                                <tr>
                                    <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400">Tipo</th>
                                    <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400">Categoría</th>
                                    <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400">Descripción</th>
                                    <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400">Fecha</th>
                                    <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400 text-right">Monto</th>
                                    <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {transactions.length > 0 ? (
                                    transactions.map((transaction) => (
                                        <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className={`p-2 rounded-full w-fit ${transaction.type === 'INCOME'
                                                    ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                                                    : 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                                                    }`}>
                                                    {transaction.type === 'INCOME'
                                                        ? <ArrowDownLeft className="w-4 h-4" />
                                                        : <ArrowUpRight className="w-4 h-4" />
                                                    }
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">
                                                {transaction.category}
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                                {transaction.description}
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                                {new Date(transaction.transactionDate).toLocaleDateString()}
                                            </td>
                                            <td className={`px-6 py-4 text-right font-medium ${transaction.type === 'INCOME' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                                                }`}>
                                                {transaction.type === 'INCOME' ? '+' : '-'}
                                                ${transaction.amount.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    onClick={() => handleEdit(transaction)}
                                                    className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                                    title="Editar transacción"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                            No se encontraron transacciones.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>


            </main>

            <TransactionModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSuccess={handleModalSuccess}
                transactionToEdit={selectedTransaction}
            />
        </div>
    );
}

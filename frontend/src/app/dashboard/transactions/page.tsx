"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Header from "@/components/Header";
import { ArrowUpRight, ArrowDownLeft, Search, Filter } from 'lucide-react';

interface TransactionDTO {
    id: number;
    categoryName: string;
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
    const [searchTerm, setSearchTerm] = useState('');

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
            const res = await fetch(`http://localhost:8080/api/transactions?userId=${user?.id}`);
            if (res.ok) {
                setTransactions(await res.json());
            }
        } catch (error) {
            console.error("Error fetching transactions:", error);
        } finally {
            setIsLoadingData(false);
        }
    };

    if (isLoading || isLoadingData) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-500">Cargando transacciones...</div>;
    }

    if (!isAuthenticated) return null;

    const filteredTransactions = transactions.filter(t =>
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 font-[family-name:var(--font-geist-sans)]">
            <Header />

            <main className="flex-1 w-full max-w-5xl mx-auto p-4 pb-20">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Transacciones</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Historial completo de tus movimientos</p>
                    </div>

                    <div className="relative w-full md:w-auto">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full md:w-64 pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
                        />
                    </div>
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
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {filteredTransactions.length > 0 ? (
                                    filteredTransactions.map((transaction) => (
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
                                                {transaction.categoryName}
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                                {transaction.description}
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                                {new Date(transaction.transactionDate).toLocaleDateString()}
                                            </td>
                                            <td className={`px-6 py-4 text-right font-medium ${transaction.type === 'INCOME' ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'
                                                }`}>
                                                {transaction.type === 'INCOME' ? '+' : '-'}
                                                ${transaction.amount.toLocaleString()}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                            No se encontraron transacciones.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

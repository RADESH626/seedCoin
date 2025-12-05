"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Header from "@/components/Header";
import AddButton from "@/components/Dashboard/AddButton";
import BalanceCard from "@/components/Dashboard/BalanceCard";
import ExpensesTable from "@/components/Dashboard/ExpensesTable";
import SummaryChart from "@/components/Dashboard/SummaryChart";
import MovementsList from "@/components/Dashboard/MovementsList";
import TransactionModal from "@/components/Dashboard/TransactionModal";

// Interfaces
interface AccountDTO {
    id: number;
    name: string;
    currentBalance: number;
    accountType: string;
}

interface TransactionDTO {
    id: number;
    categoryName: string;
    description: string;
    amount: number;
    type: 'INCOME' | 'EXPENSE';
    transactionDate: string;
}

interface DashboardDTO {
    totalBalance: number;
    monthlyIncome: number;
    monthlyExpense: number;
}

export default function Dashboard() {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    const [dashboardSummary, setDashboardSummary] = useState<DashboardDTO | null>(null);
    const [accounts, setAccounts] = useState<AccountDTO[]>([]);
    const [transactions, setTransactions] = useState<TransactionDTO[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/iniciar-sesion');
        }
    }, [isAuthenticated, isLoading, router]);

    useEffect(() => {
        if (isAuthenticated && user?.id) {
            fetchDashboardData();
        }
    }, [isAuthenticated, user]);

    const fetchDashboardData = async () => {
        try {
            setIsLoadingData(true);
            const userId = user!.id;

            // Fetch Summary
            const summaryRes = await fetch(`http://localhost:8080/api/dashboard/summary?userId=${userId}`);
            if (summaryRes.ok) setDashboardSummary(await summaryRes.json());

            // Fetch Accounts
            const accountsRes = await fetch(`http://localhost:8080/api/accounts?userId=${userId}`);
            if (accountsRes.ok) setAccounts(await accountsRes.json());

            // Fetch Transactions
            const transactionsRes = await fetch(`http://localhost:8080/api/transactions?userId=${userId}`);
            if (transactionsRes.ok) setTransactions(await transactionsRes.json());

        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setIsLoadingData(false);
        }
    };

    if (isLoading || isLoadingData) {
        return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
    }

    if (!isAuthenticated) {
        return null;
    }

    // Client-side Total Balance Calculation
    const calculatedTotalBalance = accounts.reduce((sum, acc) => sum + acc.currentBalance, 0);

    // Process Data for Components
    const recentExpenses = transactions
        .filter(t => t.type === 'EXPENSE')
        .slice(0, 5)
        .map(t => ({
            id: t.id.toString(),
            category: t.categoryName,
            name: t.description,
            cost: t.amount
        }));

    const recentMovements = transactions
        .slice(0, 5)
        .map(t => ({
            id: t.id.toString(),
            type: t.type === 'EXPENSE' ? 'expense' as const : 'income' as const,
            description: t.description,
            amount: t.amount,
            date: new Date(t.transactionDate).toLocaleDateString()
        }));

    // Calculate Chart Data (Expenses by Category)
    const expenseByCategory: Record<string, number> = {};
    transactions.filter(t => t.type === 'EXPENSE').forEach(t => {
        expenseByCategory[t.categoryName] = (expenseByCategory[t.categoryName] || 0) + t.amount;
    });

    const chartData = Object.keys(expenseByCategory).map((category, index) => ({
        name: category,
        value: expenseByCategory[category],
        color: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'][index % 5]
    }));

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 font-[family-name:var(--font-geist-sans)]">
            <Header />

            <main className="flex-1 w-full max-w-5xl mx-auto p-4 space-y-8 pb-20">
                {/* Add Button */}
                <section>
                    <AddButton onClick={() => setIsTransactionModalOpen(true)} />
                </section>

                {/* Total Balance */}
                <section>
                    <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Dinero Total</h2>
                    <BalanceCard
                        title="Balance General"
                        amount={calculatedTotalBalance}
                        isTotal
                    />
                </section>

                {/* Top Accounts */}
                <section>
                    <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">Cuentas Principales</h2>
                    {accounts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {accounts.slice(0, 3).map((account) => (
                                <BalanceCard key={account.id} title={account.name} amount={account.currentBalance} isDark />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm">No tienes cuentas registradas.</p>
                    )}
                </section>

                {/* Recent Expenses Table */}
                <section>
                    <ExpensesTable expenses={recentExpenses} />
                </section>

                {/* Charts & Movements */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SummaryChart data={chartData} />
                    <MovementsList movements={recentMovements} />
                </section>
            </main>

            {/* Transaction Modal */}
            <TransactionModal
                isOpen={isTransactionModalOpen}
                onClose={() => setIsTransactionModalOpen(false)}
                onSuccess={fetchDashboardData}
            />
        </div>
    );
}

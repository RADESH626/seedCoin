"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Header from "@/components/Header";
import AddButton from "@/components/Dashboard/AddButton";
import BalanceCard from "@/components/Dashboard/BalanceCard";
import ExpensesTable from "@/components/Dashboard/ExpensesTable";
import SummaryChart from "@/components/Dashboard/SummaryChart";
import MovementsList from "@/components/Dashboard/MovementsList";

// Mock Data
const totalBalance = 12500000;
const accounts = [
    { id: 1, name: "Bancolombia", balance: 5000000 },
    { id: 2, name: "Nequi", balance: 2500000 },
    { id: 3, name: "Efectivo", balance: 800000 },
];
const recentExpenses = [
    { id: "1", category: "Alimentación", name: "Mercado D1", cost: 150000 },
    { id: "2", category: "Transporte", name: "Uber", cost: 25000 },
    { id: "3", category: "Entretenimiento", name: "Cine Colombia", cost: 45000 },
    { id: "4", category: "Servicios", name: "Pago Internet", cost: 90000 },
    { id: "5", category: "Salud", name: "Farmacia", cost: 35000 },
];
const chartData = [
    { name: 'Alimentación', value: 400000, color: '#0088FE' },
    { name: 'Transporte', value: 300000, color: '#00C49F' },
    { name: 'Vivienda', value: 300000, color: '#FFBB28' },
    { name: 'Otros', value: 200000, color: '#FF8042' },
];
const recentMovements = [
    { id: "1", type: "expense" as const, description: "Mercado D1", amount: 150000, date: "Hoy, 10:30 AM" },
    { id: "2", type: "income" as const, description: "Nómina Quincenal", amount: 2500000, date: "Ayer, 5:00 PM" },
    { id: "3", type: "expense" as const, description: "Uber a casa", amount: 25000, date: "Ayer, 8:00 PM" },
    { id: "4", type: "expense" as const, description: "Pago Internet", amount: 90000, date: "25 Nov, 9:00 AM" },
    { id: "5", type: "income" as const, description: "Venta Garage", amount: 120000, date: "24 Nov, 2:00 PM" },
];

export default function Dashboard() {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/iniciar-sesion');
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 font-[family-name:var(--font-geist-sans)]">
            <Header />

            <main className="flex-1 w-full max-w-5xl mx-auto p-4 space-y-8 pb-20">
                {/* Add Button */}
                <section>
                    <AddButton />
                </section>

                {/* Total Balance */}
                <section>
                    <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Dinero Total</h2>
                    <BalanceCard title="Balance General" amount={totalBalance} isTotal />
                </section>

                {/* Top Accounts */}
                <section>
                    <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">Cuentas Principales</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {accounts.map((account) => (
                            <BalanceCard key={account.id} title={account.name} amount={account.balance} isDark />
                        ))}
                    </div>
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
        </div>
    );
}

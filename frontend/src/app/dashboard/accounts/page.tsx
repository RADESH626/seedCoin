"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Header from "@/components/Header";
import BalanceCard from "@/components/Dashboard/BalanceCard";
import AddButton from "@/components/Dashboard/AddButton";
import AccountModal from "@/components/Dashboard/AccountModal";
import { toast } from 'sonner';

interface Account {
    id: number;
    name: string;
    currentBalance: number;
    accountType: string;
}

export default function AccountsPage() {
    const { user, isAuthenticated, isLoading: authLoading } = useAuth();
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchAccounts = async () => {
        if (!user) return;

        try {
            const response = await fetch(`http://localhost:8080/api/accounts?userId=${user.id}`);
            if (response.ok) {
                const data = await response.json();
                setAccounts(data);
            }
        } catch (error) {
            console.error('Error fetching accounts:', error);
            toast.error('Error al cargar cuentas');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchAccounts();
        }
    }, [user]);

    if (authLoading || (!user && isLoading)) {
        return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 font-[family-name:var(--font-geist-sans)]">
            <Header />

            <main className="flex-1 w-full max-w-5xl mx-auto p-4 space-y-8 pb-20">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mis Cuentas</h1>
                        <p className="text-gray-500 dark:text-gray-400">Gestiona tus fuentes de dinero</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Add Account Card (using AddButton style but as a card) */}
                    <div className="md:col-span-3 lg:col-span-3">
                        <AddButton onClick={() => setIsModalOpen(true)} label="Nueva Cuenta" />
                    </div>

                    {accounts.map((account) => (
                        <BalanceCard
                            key={account.id}
                            title={account.name}
                            amount={account.currentBalance}
                            isDark
                        />
                    ))}

                    {accounts.length === 0 && !isLoading && (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            No tienes cuentas registradas. ¡Crea una para comenzar!
                        </div>
                    )}
                </div>
            </main>

            <AccountModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={fetchAccounts}
            />
        </div>
    );
}

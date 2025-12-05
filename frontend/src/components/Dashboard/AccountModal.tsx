"use client";

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

interface Category {
    id: number;
    name: string;
    icon: string;
}

interface AccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function AccountModal({ isOpen, onClose, onSuccess }: AccountModalProps) {
    const { user } = useAuth();
    const [name, setName] = useState('');
    const [initialBalance, setInitialBalance] = useState('');
    const [accountTypeId, setAccountTypeId] = useState<string>('');
    const [accountTypes, setAccountTypes] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchAccountTypes();
        }
    }, [isOpen]);

    const fetchAccountTypes = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/categories?group=ACCOUNT_TYPE');
            if (response.ok) {
                const data = await response.json();
                setAccountTypes(data);
            }
        } catch (error) {
            console.error('Error fetching account types:', error);
            toast.error('Error al cargar tipos de cuenta');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) return;
        if (!name || !initialBalance || !accountTypeId) {
            toast.error('Por favor completa todos los campos');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/accounts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id, // Using user.id from AuthContext
                    accountTypeId: parseInt(accountTypeId),
                    name,
                    initialBalance: parseFloat(initialBalance),
                }),
            });

            if (response.ok) {
                toast.success('Cuenta creada exitosamente');
                setName('');
                setInitialBalance('');
                setAccountTypeId('');
                onSuccess();
                onClose();
            } else {
                toast.error('Error al crear la cuenta');
            }
        } catch (error) {
            console.error('Error creating account:', error);
            toast.error('Error al conectar con el servidor');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Nueva Cuenta</h2>
                    <button onClick={onClose} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Tipo de Cuenta
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {accountTypes.map((type) => (
                                <button
                                    key={type.id}
                                    type="button"
                                    onClick={() => setAccountTypeId(type.id.toString())}
                                    className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${accountTypeId === type.id.toString()
                                        ? 'border-primary bg-primary/5 text-white'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                        }`}
                                >
                                    <span className="text-2xl">{type.icon}</span>
                                    <span className="text-xs font-medium text-white">{type.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Nombre de la Cuenta
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ej. Ahorros Principal"
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Saldo Inicial
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                            <input
                                type="number"
                                value={initialBalance}
                                onChange={(e) => setInitialBalance(e.target.value)}
                                placeholder="0.00"
                                className="w-full pl-8 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-white"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary text-white py-3 rounded-xl font-medium shadow-lg shadow-primary/25 hover:bg-primary-hover active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Creando...' : 'Crear Cuenta'}
                    </button>
                </form>
            </div>
        </div>
    );
}

"use client";

import { useState, useEffect } from 'react';
import { X, DollarSign, Calendar, AlignLeft, CreditCard, Tag, Trash2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { API_URL } from '@/config';

interface Account {
    id: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
    icon: string;
    type?: string;
}

interface TransactionDTO {
    id: number;
    accountId: number;
    category?: string;
    categoryId?: number;
    amount: number;
    type: string;
    description: string;
    transactionDate: string;
}

interface CommonTransactionDTO {
    id: number;
    name: string; // "name" from backend maps to "description" for us
    amount: number;
    type: string;
    category: {
        id: number;
        name: string;
        icon: string;
        change_type?: string;
    }
}

interface TransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    transactionToEdit?: TransactionDTO | null;
}

export default function TransactionModal({ isOpen, onClose, onSuccess, transactionToEdit }: TransactionModalProps) {
    const { user } = useAuth();
    const [type, setType] = useState<'INCOME' | 'EXPENSE'>('EXPENSE');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [accountId, setAccountId] = useState('');
    const [categoryId, setCategoryId] = useState('');

    const [accounts, setAccounts] = useState<Account[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [commonTransactions, setCommonTransactions] = useState<CommonTransactionDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // New state for interception flow
    const [pendingCommonTransaction, setPendingCommonTransaction] = useState<CommonTransactionDTO | null>(null);

    useEffect(() => {
        if (isOpen && user) {
            fetchAccounts();
            fetchCategories(type);

            if (transactionToEdit) {
                setType(transactionToEdit.type as 'INCOME' | 'EXPENSE');
                setAmount(transactionToEdit.amount.toString());
                setDescription(transactionToEdit.description);
                setDate(transactionToEdit.transactionDate);
                setAccountId(transactionToEdit.accountId.toString());
                if (transactionToEdit.categoryId) {
                    setCategoryId(transactionToEdit.categoryId.toString());
                }
                fetchCategories(transactionToEdit.type as 'INCOME' | 'EXPENSE');
            } else {
                setAmount('');
                setDescription('');
                setDate(new Date().toISOString().split('T')[0]);
                if (!transactionToEdit) {
                    fetchCommonTransactions();
                }
            }
        } else {
            // Return to clean state when closed
            setPendingCommonTransaction(null);
        }
    }, [isOpen, user, transactionToEdit]);

    const handleTypeChange = (newType: 'INCOME' | 'EXPENSE') => {
        setType(newType);
        fetchCategories(newType);
        setCategoryId('');

        if (!transactionToEdit) {
            fetchCommonTransactions(newType);
        } else {
            setCommonTransactions([]);
        }
    };

    const fetchAccounts = async () => {
        try {
            const res = await fetch(`${API_URL}/accounts?userId=${user?.id}`);
            if (res.ok) {
                const data = await res.json();
                setAccounts(data);
                if (data.length > 0 && !accountId && !transactionToEdit) {
                    setAccountId(data[0].id.toString());
                }
            }
        } catch (error) {
            console.error("Error fetching accounts:", error);
            toast.error("Error al cargar cuentas");
        }
    };

    const fetchCommonTransactions = async (currentType: string = type) => {
        try {
            const res = await fetch(`${API_URL}/transactions/common-presets?userId=${user?.id}`);
            if (res.ok) {
                const data: CommonTransactionDTO[] = await res.json();
                const filtered = data.filter(item => item.type === currentType);
                setCommonTransactions(filtered);
            }
        } catch (error) {
            console.error("Error fetching common transactions:", error);
        }
    };

    const fetchCategories = async (transactionType: string) => {
        try {
            const res = await fetch(`${API_URL}/categories?group=TRANSACTION`);
            if (res.ok) {
                const data: (Category & { type: string })[] = await res.json();
                const filtered = data.filter(c => c.type === transactionType);
                setCategories(filtered);

                if (!transactionToEdit && filtered.length > 0 && !categoryId) {
                    setCategoryId(filtered[0].id.toString());
                }
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            toast.error("Error al cargar categorías");
        }
    };

    const handleDelete = async () => {
        if (!transactionToEdit) return;
        if (!confirm('¿Estás seguro de que deseas eliminar esta transacción?')) return;

        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/transactions/${transactionToEdit.id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Transacción eliminada exitosamente');
                onSuccess();
                onClose();
            } else {
                toast.error('Error al eliminar la transacción');
            }
        } catch (error) {
            console.error('Error deleting transaction:', error);
            toast.error('Error al conectar con el servidor');
        } finally {
            setIsLoading(false);
        }
    };

    const executeTransactionSave = async (transactionData: any) => {
        if (!transactionData.amount || !transactionData.accountId || !transactionData.categoryId) {
            toast.error("Por favor completa todos los campos requeridos (Monto y Cuenta)");
            return;
        }

        setIsLoading(true);
        try {
            const url = transactionToEdit
                ? `${API_URL}/transactions/${transactionToEdit.id}`
                : `${API_URL}/transactions`;

            const method = transactionToEdit ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transactionData),
            });

            if (response.ok) {
                toast.success(transactionToEdit ? "Transacción actualizada" : "Transacción creada exitosamente");
                onSuccess();
                onClose();
                setAmount('');
                setDescription('');
            } else {
                let errorMessage = 'Ha ocurrido un error inesperado';
                try {
                    const errorText = await response.text();
                    try {
                        const errorJson = JSON.parse(errorText);
                        errorMessage = errorJson.message || errorJson.error || errorMessage;
                    } catch {
                        if (errorText && errorText.trim().length > 0) {
                            errorMessage = errorText;
                        }
                    }
                } catch (e) {
                    console.error("Error parsing error response:", e);
                }

                if (errorMessage.includes("Insufficient funds")) {
                    errorMessage = "No tienes fondos suficientes para este gasto 💸";
                } else if (errorMessage.includes("Amount must be positive")) {
                    errorMessage = "El monto debe ser mayor a cero";
                }

                toast.error(errorMessage);
            }
        } catch (error) {
            console.error("Error submitting transaction:", error);
            toast.error("Error al guardar la transacción");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            userId: user?.id,
            accountId: parseInt(accountId),
            categoryId: parseInt(categoryId),
            amount: parseFloat(amount),
            type,
            description,
            transactionDate: new Date(date).toISOString()
        };
        await executeTransactionSave(data);
    };

    const handleCommonTransactionClick = (ct: CommonTransactionDTO) => {
        setPendingCommonTransaction(ct);
    };

    const handleAccountSelectForCommon = (selectedAccount: Account) => {
        if (!pendingCommonTransaction || !user) return;

        const { category, name, amount: ctAmount } = pendingCommonTransaction;

        let finalAmount = ctAmount;
        if (!finalAmount && amount) {
            finalAmount = parseFloat(amount);
        }

        // If still no amount (e.g. preset was 0 and user didn't type anything before clicking), 
        // we could prompt or just save as 0 (backend might reject 0). 
        // For now let's assume if it is 0 it will fail validation in executeTransactionSave,
        // but we should probably ensure it's set.

        const data = {
            userId: user.id,
            accountId: selectedAccount.id,
            categoryId: category.id,
            amount: finalAmount,
            type,
            description: name,
            transactionDate: new Date(date).toISOString()
        };

        executeTransactionSave(data);
        setPendingCommonTransaction(null);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden relative">

                {/* Account Selection Overlay */}
                {pendingCommonTransaction && (
                    <div className="absolute inset-0 z-10 bg-white dark:bg-gray-900 flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-200">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-primary" />
                                ¿De qué cuenta?
                            </h3>
                            <button
                                onClick={() => setPendingCommonTransaction(null)}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-4 flex-1 overflow-y-auto">
                            <p className="text-sm text-gray-500 mb-4">
                                Selecciona la cuenta para pagar: <span className="font-semibold text-gray-800 dark:text-gray-200">{pendingCommonTransaction.name}</span>
                            </p>
                            <div className="space-y-2">
                                {accounts.map(acc => (
                                    <button
                                        key={acc.id}
                                        onClick={() => handleAccountSelectForCommon(acc)}
                                        className="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-primary/10 transition-all group"
                                    >
                                        <span className="font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors">{acc.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        {transactionToEdit ? 'Editar Transacción' : 'Nueva Transacción'}
                    </h2>
                    <div className="flex items-center gap-2">
                        {transactionToEdit && (
                            <button
                                onClick={handleDelete}
                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                                title="Eliminar transacción"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        )}
                        <button onClick={onClose} aria-label="Cerrar" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                        <button
                            type="button"
                            onClick={() => handleTypeChange('INCOME')}
                            className={`py-2 text-sm font-medium rounded-lg transition-all ${type === 'INCOME'
                                ? 'bg-green-500 text-white shadow-sm'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                }`}
                        >
                            Ingreso
                        </button>
                        <button
                            type="button"
                            onClick={() => handleTypeChange('EXPENSE')}
                            className={`py-2 text-sm font-medium rounded-lg transition-all ${type === 'EXPENSE'
                                ? 'bg-red-500 text-white shadow-sm'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                }`}
                        >
                            Gasto
                        </button>
                    </div>

                    {!transactionToEdit && commonTransactions.length > 0 && (
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Más comunes</label>
                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                                {commonTransactions.map((ct, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => handleCommonTransactionClick(ct)}
                                        className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg whitespace-nowrap hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
                                    >
                                        <span>{ct.category.icon}</span>
                                        <span className="text-gray-700 dark:text-gray-300">{ct.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Monto</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                autoFocus
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Descripción</label>
                        <div className="relative">
                            <AlignLeft className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Ej. Mercado, Salario..."
                                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Cuenta</label>
                        <div className="relative">
                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <select
                                value={accountId}
                                onChange={(e) => setAccountId(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none"
                            >
                                <option value="" disabled>Selecciona una cuenta</option>
                                {accounts.map(acc => (
                                    <option key={acc.id} value={acc.id}>{acc.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Categoría</label>
                        <div className="relative">
                            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <select
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none"
                            >
                                <option value="" disabled>Selecciona una categoría</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Fecha</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-primary text-white rounded-xl font-medium shadow-md hover:bg-primary-hover hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                    >
                        {isLoading ? 'Guardando...' : (transactionToEdit ? 'Guardar Cambios' : 'Guardar Transacción')}
                    </button>

                </form>
            </div>
        </div>
    );
}

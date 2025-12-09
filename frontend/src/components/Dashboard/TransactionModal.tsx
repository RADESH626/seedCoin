"use client";

import { useState, useEffect } from 'react';
import { X, DollarSign, Calendar, AlignLeft, CreditCard, Tag, Trash2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

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
    categoryId: number;
    amount: number;
    type: string;
    description: string;
    transactionDate: string;
}

interface CommonTransactionDTO {
    categoryId: number;
    categoryName: string;
    categoryIcon: string;
    description: string;
    usageCount: number;
    amount?: number;
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

    useEffect(() => {
        if (isOpen && user) {
            fetchAccounts();
            fetchCategories(type); // Fetch based on current type (initially EXPENSE or from edit)

            if (transactionToEdit) {
                // Populate form for editing
                setType(transactionToEdit.type as 'INCOME' | 'EXPENSE');
                setAmount(transactionToEdit.amount.toString());
                setDescription(transactionToEdit.description);
                setDate(transactionToEdit.transactionDate); // Assuming YYYY-MM-DD
                setAccountId(transactionToEdit.accountId.toString());
                setCategoryId(transactionToEdit.categoryId.toString());

                // We need to fetch categories for the transaction type immediately
                fetchCategories(transactionToEdit.type as 'INCOME' | 'EXPENSE');
            } else {
                // Reset for new transaction
                setAmount('');
                setDescription('');
                setDate(new Date().toISOString().split('T')[0]);
                // Keep accountId if already loaded? Maybe reset.
                // setAccountId(''); 
                // Don't reset Account too aggressively if user has only one.

                if (type === 'EXPENSE') {
                    fetchCommonTransactions();
                }
            }
        }
    }, [isOpen, user, transactionToEdit]); // Removed type dependency from main effect to avoid loops, explicit calls instead

    // Handle type change separately to refetch categories
    const handleTypeChange = (newType: 'INCOME' | 'EXPENSE') => {
        setType(newType);
        fetchCategories(newType);
        // Maybe clear categoryId as it might not be valid for new type
        setCategoryId('');

        if (newType === 'EXPENSE' && !transactionToEdit) {
            fetchCommonTransactions();
        } else {
            setCommonTransactions([]);
        }
    };

    const fetchAccounts = async () => {
        try {
            const res = await fetch(`http://localhost:8080/api/accounts?userId=${user?.id}`);
            if (res.ok) {
                const data = await res.json();
                setAccounts(data);
                // If not editing and we have accounts, default to first
                if (data.length > 0 && !accountId && !transactionToEdit) {
                    setAccountId(data[0].id.toString());
                }
            }
        } catch (error) {
            console.error("Error fetching accounts:", error);
            toast.error("Error al cargar cuentas");
        }
    };

    const fetchCommonTransactions = async () => {
        try {
            const res = await fetch(`http://localhost:8080/api/transactions/common?userId=${user?.id}&type=EXPENSE`);
            if (res.ok) {
                const data = await res.json();
                setCommonTransactions(data);
            }
        } catch (error) {
            console.error("Error fetching common transactions:", error);
        }
    };

    const fetchCategories = async (transactionType: string) => {
        try {
            // Fetch ALL and filter, or fetch by group if API supported param
            const res = await fetch(`http://localhost:8080/api/categories?group=TRANSACTION`);
            if (res.ok) {
                const data: (Category & { type: string })[] = await res.json();
                const filtered = data.filter(c => c.type === transactionType);
                setCategories(filtered);

                // If editing, categoryId is already set. If new, default to first?
                // Logic: IF we are editing, we setCategoryId above.
                // IF we are just switching type, we might want to default to first.
                if (!transactionToEdit && filtered.length > 0 && !categoryId) {
                    // Maybe don't auto-select to force user choice? Or auto-select first.
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
            const response = await fetch(`http://localhost:8080/api/transactions/${transactionToEdit.id}`, {
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
                ? `http://localhost:8080/api/transactions/${transactionToEdit.id}`
                : 'http://localhost:8080/api/transactions';

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
                // Reset form
                setAmount('');
                setDescription('');
            } else {
                let errorMessage = 'Ha ocurrido un error inesperado';
                try {
                    // Clone response to try reading as text if JSON fails, or just read text and parse
                    const errorText = await response.text();
                    try {
                        const errorJson = JSON.parse(errorText);
                        // Spring Boot default error structure usually has 'message' or 'error'
                        errorMessage = errorJson.message || errorJson.error || errorMessage;
                    } catch {
                        // Not JSON, use text if not empty
                        if (errorText && errorText.trim().length > 0) {
                            errorMessage = errorText;
                        }
                    }
                } catch (e) {
                    console.error("Error parsing error response:", e);
                }

                // Translate specific backend messages to Spanish if needed
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
        // Update state for UI feedback
        setCategoryId(ct.categoryId.toString());
        setDescription(ct.description);

        let finalAmount = amount ? parseFloat(amount) : 0;

        if (ct.amount) {
            setAmount(ct.amount.toString());
            finalAmount = ct.amount;
        }

        if (!finalAmount) {
            toast.info("Ingresa el monto para guardar automáticamente");
            // We focus the amount input if possible, but for now just setting state is enough
            // The user will have to click save manually or type amount and click again (which is weird)
            // But if they typed amount first, this works.
            return;
        }

        // Auto-save
        const data = {
            userId: user?.id,
            accountId: parseInt(accountId),
            categoryId: ct.categoryId,
            amount: finalAmount, // Use the calculated amount
            type,
            description: ct.description,
            transactionDate: new Date(date).toISOString()
        };
        executeTransactionSave(data);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">

                {/* Header */}
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

                    {/* Type Selector */}
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

                    {/* Suggestions */}
                    {type === 'EXPENSE' && !transactionToEdit && commonTransactions.length > 0 && (
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
                                        <span>{ct.categoryIcon}</span>
                                        <span className="text-gray-700 dark:text-gray-300">{ct.description}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Amount */}
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

                    {/* Description */}
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

                    {/* Account */}
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

                    {/* Category */}
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

                    {/* Date */}
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

                    {/* Submit Button */}
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

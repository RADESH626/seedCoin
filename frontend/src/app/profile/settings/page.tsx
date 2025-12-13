"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getCommonTransactions, CommonTransactionDTO, deleteCommonTransaction, createCommonTransaction, updateCommonTransaction, CreateCommonTransactionDTO } from '@/services/transactionService';
import { ArrowUpRight, ArrowDownLeft, Settings, Loader2, Trash2, Plus, X, Save, Edit2, ArrowLeft, LayoutDashboard, User } from 'lucide-react';
import { API_URL } from '@/config';
import Link from 'next/link';

export default function SettingsPage() {
    const { user, isAuthenticated } = useAuth();
    const [expenses, setExpenses] = useState<CommonTransactionDTO[]>([]);
    const [incomes, setIncomes] = useState<CommonTransactionDTO[]>([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState<CommonTransactionDTO | null>(null);
    const [categories, setCategories] = useState<any[]>([]);

    // Form State
    const [formType, setFormType] = useState<'INCOME' | 'EXPENSE'>('EXPENSE');
    const [formName, setFormName] = useState('');
    const [formAmount, setFormAmount] = useState('');
    const [formCategoryId, setFormCategoryId] = useState('');

    useEffect(() => {
        if (isAuthenticated && user) {
            fetchData();
            fetchCategories();
        }
    }, [isAuthenticated, user]);

    const fetchData = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const data = await getCommonTransactions(Number(user.id));
            setExpenses(data.filter(t => t.type === 'EXPENSE'));
            setIncomes(data.filter(t => t.type === 'INCOME'));
        } catch (error) {
            console.error('Error fetching common transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await fetch(`${API_URL}/categories?group=TRANSACTION`);
            if (res.ok) {
                const data = await res.json();
                setCategories(data);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('¿Estás seguro de eliminar este gasto común?')) return;
        try {
            await deleteCommonTransaction(id);
            // Optimistic update
            setExpenses(prev => prev.filter(t => t.id !== id));
            setIncomes(prev => prev.filter(t => t.id !== id));
        } catch (error) {
            console.error('Error deleting common transaction:', error);
            alert('Error al eliminar');
        }
    };

    const openModal = (type: 'INCOME' | 'EXPENSE', transaction?: CommonTransactionDTO) => {
        if (transaction) {
            setEditingTransaction(transaction);
            setFormType(transaction.type);
            setFormName(transaction.name);
            setFormAmount(transaction.amount.toString());
            setFormCategoryId(transaction.category.id.toString());
        } else {
            setEditingTransaction(null);
            setFormType(type);
            setFormName('');
            setFormAmount('');
            setFormCategoryId('');
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !formCategoryId) return;

        const dto: CreateCommonTransactionDTO = {
            userId: Number(user.id),
            categoryId: Number(formCategoryId),
            name: formName,
            amount: Number(formAmount),
            type: formType
        };

        try {
            if (editingTransaction) {
                await updateCommonTransaction(editingTransaction.id, dto);
            } else {
                await createCommonTransaction(dto);
            }
            setIsModalOpen(false);
            fetchData(); // Refresh list
        } catch (error) {
            console.error('Error saving common transaction:', error);
            alert('Error al guardar');
        }
    };

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 font-[family-name:var(--font-geist-sans)]">

            {/* Sidebar */}
            <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Settings className="w-6 h-6 text-gray-900 dark:text-white" />
                        Configuración
                    </h2>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-primary text-white shadow-sm rounded-xl transition-colors font-medium">
                        <Settings className="w-5 h-5" />
                        General
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors font-medium">
                        <User className="w-5 h-5" />
                        Perfil
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">

                {/* Custom Thin Header */}
                <header className="h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                        >
                            <div className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                <ArrowLeft className="w-5 h-5" />
                            </div>
                            <span className="font-medium text-sm">Atrás</span>
                        </Link>
                    </div>
                </header>

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-5xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Transacciones Comunes</h1>
                            <p className="text-gray-500 dark:text-gray-400">Gestiona tus plantillas de ingresos y gastos frecuentes.</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Gastos Comunes */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                                            <ArrowDownLeft className="w-5 h-5 text-red-600 dark:text-red-400" />
                                        </div>
                                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Gastos Comunes</h2>
                                    </div>
                                    <button
                                        onClick={() => openModal('EXPENSE')}
                                        className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                                    >
                                        <Plus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {expenses.length === 0 ? (
                                        <p className="text-sm text-gray-500 text-center py-4">No hay gastos comunes registrados</p>
                                    ) : (
                                        expenses.map((transaction) => (
                                            <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group">
                                                <div className="flex items-center gap-4">
                                                    <div className="text-2xl">{transaction.category.icon}</div>
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">{transaction.name}</p>
                                                        <p className="text-xs text-gray-500">{transaction.category.name}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-semibold text-gray-900 dark:text-white mr-2">
                                                        ${transaction.amount.toLocaleString()}
                                                    </p>
                                                    <button
                                                        onClick={() => openModal('EXPENSE', transaction)}
                                                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(transaction.id)}
                                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Ingresos Comunes */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                                            <ArrowUpRight className="w-5 h-5 text-green-600 dark:text-green-400" />
                                        </div>
                                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Ingresos Comunes</h2>
                                    </div>
                                    <button
                                        onClick={() => openModal('INCOME')}
                                        className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                                    >
                                        <Plus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {incomes.length === 0 ? (
                                        <p className="text-sm text-gray-500 text-center py-4">No hay ingresos comunes registrados</p>
                                    ) : (
                                        incomes.map((transaction) => (
                                            <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group">
                                                <div className="flex items-center gap-4">
                                                    <div className="text-2xl">{transaction.category.icon}</div>
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">{transaction.name}</p>
                                                        <p className="text-xs text-gray-500">{transaction.category.name}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-semibold text-gray-900 dark:text-white mr-2">
                                                        ${transaction.amount.toLocaleString()}
                                                    </p>
                                                    <button
                                                        onClick={() => openModal('INCOME', transaction)}
                                                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(transaction.id)}
                                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md shadow-2xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold dark:text-white">
                                {editingTransaction ? 'Editar ' : 'Nuevo '}{formType === 'EXPENSE' ? 'Gasto' : 'Ingreso'} Común
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
                                <input
                                    type="text"
                                    value={formName}
                                    onChange={(e) => setFormName(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder={formType === 'EXPENSE' ? "Ej. Netflix, Spotify" : "Ej. Sueldo, Freelance"}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Monto Default</label>
                                <input
                                    type="number"
                                    value={formAmount}
                                    onChange={(e) => setFormAmount(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="0.00"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Categoría</label>
                                <select
                                    value={formCategoryId}
                                    onChange={(e) => setFormCategoryId(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                    required
                                >
                                    <option value="">Seleccionar Categoría</option>
                                    {categories
                                        .filter(c => c.type === formType)
                                        .map(cat => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.icon} {cat.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover flex items-center gap-2"
                                >
                                    <Save className="w-4 h-4" />
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}


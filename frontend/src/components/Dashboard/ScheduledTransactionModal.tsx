"use client";

import { useState, useEffect } from 'react';
import { X, DollarSign, Calendar, AlignLeft, CreditCard, Tag, Trash2, Repeat } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { API_URL } from '@/config';
import { ScheduledTransactionDTO, createScheduledTransaction, updateScheduledTransaction, deleteScheduledTransaction } from '@/services/scheduledTransactionService';
import Modal from '@/components/ui/Modal';
import FormInput from '@/components/ui/FormInput';
import FormSelect from '@/components/ui/FormSelect';
import TypeSelector from '@/components/ui/TypeSelector';

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

interface ScheduledTransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    transactionToEdit?: ScheduledTransactionDTO | null;
}

export default function ScheduledTransactionModal({ isOpen, onClose, onSuccess, transactionToEdit }: ScheduledTransactionModalProps) {
    const { user } = useAuth();
    const [type, setType] = useState<'INCOME' | 'EXPENSE'>('EXPENSE');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [accountId, setAccountId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [frequency, setFrequency] = useState<'ONCE' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'>('MONTHLY');

    const [accounts, setAccounts] = useState<Account[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen && user) {
            fetchAccounts();
            fetchCategories(type);

            if (transactionToEdit) {
                setType(transactionToEdit.type as 'INCOME' | 'EXPENSE');
                setAmount(transactionToEdit.amount.toString());
                setDescription(transactionToEdit.description);
                setDate(transactionToEdit.nextExecutionDate.split('T')[0]);
                setAccountId(transactionToEdit.accountId.toString());
                setCategoryId(transactionToEdit.categoryId.toString());
                setFrequency(transactionToEdit.frequency);
                fetchCategories(transactionToEdit.type as 'INCOME' | 'EXPENSE');
            } else {
                setAmount('');
                setDescription('');
                setDate(new Date().toISOString().split('T')[0]);
                setFrequency('MONTHLY');
            }
        }
    }, [isOpen, user, transactionToEdit]);

    const handleTypeChange = (newType: 'INCOME' | 'EXPENSE') => {
        setType(newType);
        fetchCategories(newType);
        setCategoryId('');
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
        if (!transactionToEdit || !transactionToEdit.id) return;
        if (!confirm('¿Estás seguro de que deseas eliminar esta transacción programada?')) return;

        setIsLoading(true);
        try {
            await deleteScheduledTransaction(transactionToEdit.id);
            toast.success('Transacción programada eliminada exitosamente');
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Error deleting transaction:', error);
            toast.error('Error al conectar con el servidor');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!amount || !accountId || !categoryId) {
            toast.error("Por favor completa todos los campos requeridos");
            return;
        }

        setIsLoading(true);
        const data: ScheduledTransactionDTO = {
            id: transactionToEdit?.id,
            userId: user!.id,
            accountId: parseInt(accountId),
            categoryId: parseInt(categoryId),
            amount: parseFloat(amount),
            type,
            description,
            nextExecutionDate: new Date(date).toISOString(),
            frequency
        };

        try {
            if (transactionToEdit && transactionToEdit.id) {
                await updateScheduledTransaction(transactionToEdit.id, data);
                toast.success("Transacción programada actualizada");
            } else {
                await createScheduledTransaction(data);
                toast.success("Transacción programada creada exitosamente");
            }
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Error submitting:", error);
            toast.error("Error al guardar la transacción");
        } finally {
            setIsLoading(false);
        }
    };

    const modalActions = transactionToEdit ? (
        <button
            onClick={handleDelete}
            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
            title="Eliminar"
        >
            <Trash2 className="w-5 h-5" />
        </button>
    ) : null;

    if (!isOpen) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={transactionToEdit ? 'Editar Programación' : 'Nueva Programación'}
            actions={modalActions}
        >
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
                <TypeSelector type={type} onChange={handleTypeChange} />

                <FormInput
                    label="Monto"
                    icon={DollarSign}
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    autoFocus
                />

                <FormInput
                    label="Descripción"
                    icon={AlignLeft}
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Ej. Suscripción Netflix..."
                />

                <FormSelect
                    label="Cuenta"
                    icon={CreditCard}
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                    options={accounts.map(acc => ({ value: acc.id, label: acc.name }))}
                    placeholder="Selecciona una cuenta"
                />

                <FormSelect
                    label="Categoría"
                    icon={Tag}
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    options={categories.map(cat => ({ value: cat.id, label: <>{cat.icon} {cat.name}</> }))}
                    placeholder="Selecciona una categoría"
                />

                <FormSelect
                    label="Frecuencia"
                    icon={Repeat}
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value as any)}
                    options={[
                        { value: 'ONCE', label: 'Una vez' },
                        { value: 'WEEKLY', label: 'Semanal' },
                        { value: 'MONTHLY', label: 'Mensual' },
                        { value: 'YEARLY', label: 'Anual' }
                    ]}
                />

                <FormInput
                    label="Próxima Ejecución"
                    icon={Calendar}
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-primary text-white rounded-xl font-medium shadow-md hover:bg-primary-hover hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                    {isLoading ? 'Guardando...' : (transactionToEdit ? 'Guardar Cambios' : 'Crear Transacción Programada')}
                </button>
            </form>
        </Modal>
    );
}

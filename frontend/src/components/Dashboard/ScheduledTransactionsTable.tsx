import { Edit2 } from 'lucide-react';
import { ScheduledTransactionDTO } from '@/services/scheduledTransactionService';

interface ScheduledTransactionsTableProps {
    transactions: ScheduledTransactionDTO[];
    onEdit: (transaction: ScheduledTransactionDTO) => void;
}

const FREQUENCY_MAP: Record<string, string> = {
    'ONCE': 'Una vez',
    'WEEKLY': 'Semanal',
    'MONTHLY': 'Mensual',
    'YEARLY': 'Anual'
};

export default function ScheduledTransactionsTable({ transactions, onEdit }: ScheduledTransactionsTableProps) {
    if (transactions.length === 0) {
        return (
            <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">No tienes gastos programados.</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3">Descripción</th>
                            <th className="px-6 py-3">Categoría</th>
                            <th className="px-6 py-3">Frecuencia</th>
                            <th className="px-6 py-3">Próximo Pago</th>
                            <th className="px-6 py-3 text-right">Monto</th>
                            <th className="px-6 py-3 text-center">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((tx) => (
                            <tr key={tx.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 group">
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                    {tx.description}
                                </td>
                                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                    {tx.categoryName}
                                </td>
                                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                        {FREQUENCY_MAP[tx.frequency] || tx.frequency}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                    {new Date(tx.nextExecutionDate).toLocaleDateString()}
                                </td>
                                <td className={`px-6 py-4 text-right font-medium ${tx.type === 'INCOME' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                    {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(tx.amount)}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button
                                        onClick={() => onEdit(tx)}
                                        className="p-1 text-gray-400 hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
                                        title="Editar"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

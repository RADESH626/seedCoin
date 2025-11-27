import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface Movement {
    id: string;
    type: 'income' | 'expense';
    description: string;
    amount: number;
    date: string;
}

interface MovementsListProps {
    movements: Movement[];
}

export default function MovementsList({ movements }: MovementsListProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Últimos Movimientos</h3>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {movements.map((movement) => (
                    <div key={movement.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${movement.type === 'income' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}>
                                {movement.type === 'income' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                            </div>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">{movement.description}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{movement.date}</p>
                            </div>
                        </div>
                        <span className={`font-semibold ${movement.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            {movement.type === 'income' ? '+' : '-'}{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(movement.amount)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

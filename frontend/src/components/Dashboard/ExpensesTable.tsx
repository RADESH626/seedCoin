interface Expense {
    id: string;
    category: string;
    name: string;
    cost: number;
}

interface ExpensesTableProps {
    expenses: Expense[];
}

export default function ExpensesTable({ expenses }: ExpensesTableProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Últimos Gastos</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3">Categoría</th>
                            <th className="px-6 py-3">Nombre</th>
                            <th className="px-6 py-3 text-right">Costo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense) => (
                            <tr key={expense.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    {expense.category}
                                </td>
                                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                    {expense.name}
                                </td>
                                <td className="px-6 py-4 text-right font-medium text-red-600 dark:text-red-400">
                                    {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(expense.cost)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

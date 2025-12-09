"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface DataPoint {
    name: string;
    value: number;
    color: string;
    [key: string]: any;
}

interface SummaryChartProps {
    data: DataPoint[];
    income: number;
    expense: number;
    balance: number;
}

export default function SummaryChart({ data, income, expense, balance }: SummaryChartProps) {
    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Resumen del Mes</h3>
            <div className="h-[300px] w-full mb-6">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value: number) => formatCurrency(value)}
                            contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100 dark:border-gray-700">
                <div className="text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Ingresos</p>
                    <p className="font-semibold text-green-500 overflow-hidden text-ellipsis">{formatCurrency(income)}</p>
                </div>
                <div className="text-center border-l border-r border-gray-100 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Gastos</p>
                    <p className="font-semibold text-red-500 overflow-hidden text-ellipsis">{formatCurrency(expense)}</p>
                </div>
                <div className="text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Balance</p>
                    <p className={`font-semibold overflow-hidden text-ellipsis ${balance >= 0 ? 'text-blue-500 dark:text-blue-400' : 'text-red-500'}`}>
                        {formatCurrency(balance)}
                    </p>
                </div>
            </div>
        </div>
    );
}

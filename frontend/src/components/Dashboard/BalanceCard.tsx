"use client";

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface BalanceCardProps {
    title: string;
    amount: number;
    currency?: string;
    isTotal?: boolean;
    isDark?: boolean;
}

export default function BalanceCard({ title, amount, currency = "COP", isTotal = false, isDark = false }: BalanceCardProps) {
    const [isVisible, setIsVisible] = useState(false);

    const getBgColor = () => {
        if (isTotal) return 'bg-primary text-white border-primary';
        if (isDark) return 'bg-gray-900 text-white border-gray-800';
        return 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    };

    const getTextColor = () => {
        if (isTotal || isDark) return 'text-blue-100';
        return 'text-gray-500 dark:text-gray-400';
    };

    const getIconColor = () => {
        if (isTotal || isDark) return 'text-blue-100 hover:text-white';
        return 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300';
    };

    return (
        <div className={`p-6 rounded-xl shadow-sm border ${getBgColor()}`}>
            <div className="flex items-center justify-between mb-2">
                <h3 className={`font-medium ${getTextColor()}`}>{title}</h3>
                <button onClick={() => setIsVisible(!isVisible)} className="focus:outline-none">
                    {isVisible ? (
                        <EyeOff className={`w-5 h-5 ${getIconColor()}`} />
                    ) : (
                        <Eye className={`w-5 h-5 ${getIconColor()}`} />
                    )}
                </button>
            </div>
            <div className="text-2xl font-bold">
                {isVisible ? (
                    <span>{new Intl.NumberFormat('es-CO', { style: 'currency', currency }).format(amount)}</span>
                ) : (
                    <span className="tracking-widest">****</span>
                )}
            </div>
        </div>
    );
}

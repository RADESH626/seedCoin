import React from 'react';

interface TypeSelectorProps {
    type: 'INCOME' | 'EXPENSE';
    onChange: (type: 'INCOME' | 'EXPENSE') => void;
}

export default function TypeSelector({ type, onChange }: TypeSelectorProps) {
    return (
        <div className="grid grid-cols-2 gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            <button
                type="button"
                onClick={() => onChange('INCOME')}
                className={`py-2 text-sm font-medium rounded-lg transition-all ${type === 'INCOME'
                    ? 'bg-green-500 text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
            >
                Ingreso
            </button>
            <button
                type="button"
                onClick={() => onChange('EXPENSE')}
                className={`py-2 text-sm font-medium rounded-lg transition-all ${type === 'EXPENSE'
                    ? 'bg-red-500 text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
            >
                Gasto
            </button>
        </div>
    );
}

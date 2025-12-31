"use client";

import Link from 'next/link';
import { User, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';

interface UserMenuProps {
    user: any; // Using any for now to match context inference, ideally should be typed
    isAuthenticated: boolean;
    logout: () => void;
}

export default function UserMenu({ user, isAuthenticated, logout }: UserMenuProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
                <div className="relative">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center gap-3 focus:outline-none"
                    >
                        <span className="text-sm text-gray-300 hidden sm:block">Hola, {user.name}</span>
                        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700 text-white hover:bg-gray-700 transition-colors">
                            <User className="w-5 h-5" />
                        </div>
                    </button>

                    {/* Dropdown Menu */}
                    {isMenuOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-40"
                                onClick={() => setIsMenuOpen(false)}
                            ></div>
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                                <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 mb-1">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        logout();
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Cerrar Sesión
                                </button>
                                <Link
                                    href="/profile/settings"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors border-t border-gray-100 dark:border-gray-700"
                                >
                                    <Settings className="w-4 h-4" />
                                    Configuración
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <Link
                    href="/iniciar-sesion"
                    className="px-5 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-hover transition-colors shadow-md hover:shadow-lg"
                >
                    Iniciar Sesión
                </Link>
            )}
        </div>
    );
}

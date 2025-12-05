"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { User, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
    const { user, isAuthenticated, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="w-full py-4 px-6 flex items-center justify-between bg-black sticky top-0 z-50 border-b border-gray-800">
            {/* Left: App Icon */}
            <div className="flex items-center gap-2">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-700">
                    <Image
                        src="/logo 1.png"
                        alt="SeedCoin Logo"
                        fill
                        className="object-cover"
                    />
                </div>
                <span className="text-xl font-bold text-white">SeedCoin</span>
            </div>

            {/* Center: Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
                {isAuthenticated ? (
                    <>
                        <Link href="/dashboard" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                            Dashboard
                        </Link>
                        <Link href="/dashboard/accounts" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                            Cuentas
                        </Link>
                        <Link href="/dashboard/transactions" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                            Transacciones
                        </Link>
                    </>
                ) : (
                    <>
                        <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                            Inicio
                        </Link>
                        <Link href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                            Nosotros
                        </Link>
                        <Link href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                            Servicios
                        </Link>
                        <Link href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                            Contacto
                        </Link>
                    </>
                )}
            </nav>

            {/* Right: Login Button or User Icon */}
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
        </header>
    );
}

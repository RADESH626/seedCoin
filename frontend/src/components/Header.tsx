"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { User } from 'lucide-react';

export default function Header() {
    const { user, isAuthenticated } = useAuth();

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
            </nav>

            {/* Right: Login Button or User Icon */}
            <div className="flex items-center gap-4">
                {isAuthenticated && user ? (
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-300 hidden sm:block">Hola, {user.name}</span>
                        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700 text-white">
                            <User className="w-5 h-5" />
                        </div>
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

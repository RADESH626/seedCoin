'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';

import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <div className="min-h-screen flex bg-background">
            {/* Lado Izquierdo - Placeholder de Imagen */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-secondary relative overflow-hidden items-center justify-center">
                <div className="absolute inset-0 bg-black/20 z-10"></div>
                {/* Placeholder para la imagen izquierda */}
                <div className="relative z-20 text-white text-center p-12">
                    <h2 className="text-4xl font-bold mb-6">Bienvenido a SeedCoin</h2>
                    <p className="text-lg text-accent">Cultivando tu futuro financiero.</p>
                </div>
                {/* Círculos decorativos */}
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-success/20 rounded-full blur-3xl"></div>
            </div>

            {/* Lado Derecho - Formulario de Inicio de Sesión */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
                <div className="w-full max-w-md space-y-8">
                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary shadow-xl bg-white flex items-center justify-center">
                            <Image
                                src="/logo 1.png"
                                alt="Logo de SeedCoin"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-primary mb-2">
                            Iniciar Sesión
                        </h1>
                        <p className="text-gray-600">Accede al panel de tu cuenta</p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Correo Electrónico
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                                    placeholder="tu@ejemplo.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400 pr-10"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center text-gray-600 cursor-pointer">
                                <input type="checkbox" className="mr-2 rounded text-primary focus:ring-primary border-gray-300" />
                                Recordarme
                            </label>
                            <Link href="/recuperar-contrasena" className="text-primary hover:text-primary-hover font-medium transition-colors">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3.5 px-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg shadow-md transform transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            Iniciar Sesión
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        ¿No tienes una cuenta?{' '}
                        <Link href="/registro" className="text-primary hover:text-primary-hover font-bold transition-colors">
                            Regístrate
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

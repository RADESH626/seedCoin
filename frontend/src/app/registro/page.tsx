'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface IdentificationType {
    id: number;
    name: string;
}

export default function RegistroPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        identificationTypeId: '',
        identificationNumber: '',
    });
    const [identificationTypes, setIdentificationTypes] = useState<IdentificationType[]>([]);

    useEffect(() => {
        const fetchIdentificationTypes = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/identification-types');
                if (response.ok) {
                    const data = await response.json();
                    setIdentificationTypes(data);
                }
            } catch (error) {
                console.error('Error fetching identification types:', error);
            }
        };
        fetchIdentificationTypes();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    identificationTypeId: parseInt(formData.identificationTypeId),
                    identificationNumber: formData.identificationNumber,
                }),
            });

            if (response.ok) {
                toast.success('¡Registro exitoso! Redirigiendo...');
                setTimeout(() => {
                    router.push('/iniciar-sesion');
                }, 2000);
            } else {
                const errorData = await response.json().catch(() => ({}));
                toast.error(errorData.message || 'Error al registrar usuario');
            }
        } catch (error) {
            console.error('Error registering user:', error);
            toast.error('Error de conexión con el servidor');
        }
    };

    return (
        <div className="min-h-screen flex bg-background">
            {/* Lado Izquierdo - Placeholder de Imagen */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-secondary relative overflow-hidden items-center justify-center">
                <div className="absolute inset-0 bg-black/20 z-10"></div>
                <div className="relative z-20 text-white text-center p-12">
                    <h2 className="text-4xl font-bold mb-6">Únete a SeedCoin</h2>
                    <p className="text-lg text-accent">Empieza a cultivar tu éxito hoy.</p>
                </div>
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-success/20 rounded-full blur-3xl"></div>
            </div>

            {/* Lado Derecho - Formulario de Registro */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative overflow-y-auto">
                <div className="w-full max-w-md space-y-8">
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
                            Crear Cuenta
                        </h1>
                        <p className="text-gray-600">Regístrate para comenzar</p>
                    </div>



                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Nombre
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                                        placeholder="Juan"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Apellido
                                    </label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        required
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                                        placeholder="Pérez"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="identificationTypeId" className="block text-sm font-medium text-gray-700 mb-1">
                                    Tipo de Documento
                                </label>
                                <select
                                    id="identificationTypeId"
                                    required
                                    value={formData.identificationTypeId}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900"
                                >
                                    <option value="">Seleccione un tipo</option>
                                    {identificationTypes.map((type) => (
                                        <option key={type.id} value={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="identificationNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                    Número de Documento
                                </label>
                                <input
                                    id="identificationNumber"
                                    type="text"
                                    required
                                    value={formData.identificationNumber}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                                    placeholder="1234567890"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Correo Electrónico
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                                    placeholder="tu@ejemplo.com"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                        Contraseña
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                        Confirmar
                                    </label>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3.5 px-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg shadow-md transform transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            Registrarse
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        ¿Ya tienes una cuenta?{' '}
                        <Link href="/iniciar-sesion" className="text-secondary hover:text-teal-700 font-bold transition-colors">
                            Inicia Sesión
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

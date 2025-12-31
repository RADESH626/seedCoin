import Link from 'next/link';

interface NavLinksProps {
    isAuthenticated: boolean;
}

export default function NavLinks({ isAuthenticated }: NavLinksProps) {
    return (
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
                    <Link href="/dashboard/scheduled-expenses" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        Programación
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
    );
}

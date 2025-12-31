export default function Footer() {
    return (
        <footer className="py-12 px-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-black">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col items-center md:items-start gap-4">
                    <div className="text-2xl font-black text-primary">SeedCoin</div>
                    <p className="text-sm text-gray-500">Cultivando libertad desde 2025.</p>
                </div>

                <div className="flex gap-8 text-sm font-medium text-gray-600 dark:text-gray-400">
                    <a href="#" className="hover:text-primary transition-colors">Privacidad</a>
                    <a href="#" className="hover:text-primary transition-colors">Términos</a>
                    <a href="#" className="hover:text-primary transition-colors">Soporte</a>
                    <a href="#" className="hover:text-primary transition-colors">Seguridad</a>
                </div>

                <p className="text-sm text-gray-400">
                    © {new Date().getFullYear()} SeedCoin. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
}

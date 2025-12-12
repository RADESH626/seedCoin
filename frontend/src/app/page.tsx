export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
      {/* Header removed as it is now in layout */}

      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-background to-white dark:from-background dark:to-gray-900">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
              Seed Coin
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Transforma tus gastos diarios en decisiones inteligentes. Una plataforma segura para cultivar tu libertad financiera.
            </p>

            <div className="pt-8 flex gap-4 justify-center">
              <button className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-hover transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Comenzar Ahora
              </button>
              <button className="px-8 py-3 bg-black text-white border border-gray-800 rounded-full font-medium hover:bg-gray-900 transition-colors">
                Saber Más
              </button>
            </div>
          </div>
        </section>

        {/* Footer Placeholder */}
        <footer className="py-6 text-center text-sm text-gray-400 bg-black border-t border-gray-800">
          © {new Date().getFullYear()} SeedCoin. Todos los derechos reservados.
        </footer>
      </main>
    </div >
  );
}

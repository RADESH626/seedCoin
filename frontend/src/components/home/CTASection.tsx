export default function CTASection() {
    return (
        <section className="py-24 px-4">
            <div className="max-w-4xl mx-auto rounded-[3rem] bg-foreground text-background p-12 md:p-20 text-center space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -mr-32 -mt-32"></div>
                <h2 className="text-4xl md:text-6xl font-black leading-tight relative z-10">
                    ¿Listo para plantar tu primera semilla?
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto relative z-10">
                    Únete a miles de personas que ya están cultivando su bienestar financiero con SeedCoin.
                </p>
                <div className="pt-4 relative z-10">
                    <button className="px-10 py-5 bg-white text-black rounded-2xl font-bold text-xl hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95">
                        Empezar Gratis Ahora
                    </button>
                </div>
            </div>
        </section>
    );
}

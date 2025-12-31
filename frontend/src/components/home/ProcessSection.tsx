export default function ProcessSection() {
    return (
        <section className="py-24 px-4 bg-gray-50 dark:bg-gray-900/50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">El Proceso Semilla</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">Tres pasos simples para cultivar tu libertad financiera.</p>
                </div>

                <div className="relative">
                    {/* Connector Line (Desktop) */}
                    {/* <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2 z-0"></div> */}

                    <div className="grid md:grid-cols-3 gap-12 relative z-10">
                        {/* Step 1 */}
                        <div className="flex flex-col items-center text-center group">
                            <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-700 border-4 border-primary/10 flex items-center justify-center text-2xl font-bold text-primary mb-6 shadow-lg group-hover:scale-110 transition-transform bg-background">
                                1
                            </div>
                            <h3 className="text-xl font-bold mb-2">Siembra</h3>
                            <p className="text-gray-500 text-sm">Registra tus ingresos y gastos. Cada dato es una semilla de información vital.</p>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col items-center text-center group">
                            <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-700 border-4 border-secondary/10 flex items-center justify-center text-2xl font-bold text-primary mb-6 shadow-lg group-hover:scale-110 transition-transform bg-background">
                                2
                            </div>
                            <h3 className="text-xl font-bold mb-2">Cultiva</h3>
                            <p className="text-gray-500 text-sm">Analiza tus hábitos con nuestros gráficos. Riega las áreas que necesitan atención.</p>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col items-center text-center group">
                            <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-700 border-4 border-success/10 flex items-center justify-center text-2xl font-bold text-primary mb-6 shadow-lg group-hover:scale-110 transition-transform bg-background">
                                3
                            </div>
                            <h3 className="text-xl font-bold mb-2">Cosecha</h3>
                            <p className="text-gray-500 text-sm">Alcanza tus metas de ahorro. Disfruta los frutos de tu disciplina financiera.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

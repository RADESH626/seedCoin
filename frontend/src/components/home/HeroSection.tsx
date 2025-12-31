import { ArrowRight, Zap, ChevronRight } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-24 md:py-32 overflow-hidden">

            {/* Animated Background Elements */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-primary text-sm font-medium mb-4">
                    <Zap size={16} className="text-secondary" />
                    <span>Nueva versión 2.0 disponible</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground leading-tight">
                    Siembra hoy, <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient">cosecha libertad.</span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    Transforma tus gastos diarios en decisiones inteligentes. SeedCoin es el fertilizante que tu futuro financiero necesita.
                </p>

                <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button className="group px-8 py-4 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-primary-hover transition-all shadow-xl hover:shadow-primary/20 flex items-center gap-2 transform hover:-translate-y-1">
                        Comenzar Ahora
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="px-8 py-4 bg-white/50 dark:bg-black/50 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-2xl font-bold text-lg hover:bg-white dark:hover:bg-black transition-all flex items-center gap-2">
                        Ver Demo
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </section>
    );
}

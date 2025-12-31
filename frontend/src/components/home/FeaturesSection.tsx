import { Leaf, Shield, TrendingUp } from "lucide-react";

export default function FeaturesSection() {
    return (
        <section className="relative z-10 py-24 px-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-y border-gray-100 dark:border-gray-800">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground">Herramientas para tu crecimiento</h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto italic">Diseñadas para ser simples, potentes y humanas.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="p-8 rounded-3xl bg-background border border-accent/20 hover:border-secondary/50 transition-all hover:shadow-2xl hover:shadow-secondary/5 group">
                        <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                            <TrendingUp size={28} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Análisis Predictivo</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            Entiende hacia dónde va tu dinero antes de que desaparezca con nuestras proyecciones inteligentes.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="p-8 rounded-3xl bg-background border border-accent/20 hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/5 group">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                            <Shield size={28} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Seguridad Total</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            Tus datos están encriptados y protegidos con estándares bancarios. Tu privacidad es nuestra prioridad.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="p-8 rounded-3xl bg-background border border-accent/20 hover:border-success/50 transition-all hover:shadow-2xl hover:shadow-success/5 group">
                        <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center text-success mb-6 group-hover:scale-110 transition-transform">
                            <Leaf size={28} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Hábitos Saludables</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            Creamos un sistema de recompensas para motivarte a mantener tus finanzas en el camino correcto.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

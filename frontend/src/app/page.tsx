import Header from "@/components/Header";
import { ArrowRight, Leaf, Shield, TrendingUp, Zap, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)] overflow-x-hidden">
      <Header />

      <main className="flex-1 flex flex-col">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Hero Section */}
        <section className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-24 md:py-32 overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
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

        {/* Features Section */}
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

        {/* The Seed Process Section */}
        <section className="py-24 px-4 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">El Proceso Semilla</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Tres pasos simples para cultivar tu libertad financiera.</p>
            </div>

            <div className="relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2 z-0"></div>

              <div className="grid md:grid-cols-3 gap-12 relative z-10">
                {/* Step 1 */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-800 border-4 border-primary/10 flex items-center justify-center text-2xl font-bold text-primary mb-6 shadow-lg group-hover:scale-110 transition-transform bg-background">
                    1
                  </div>
                  <h3 className="text-xl font-bold mb-2">Siembra</h3>
                  <p className="text-gray-500 text-sm">Registra tus ingresos y gastos. Cada dato es una semilla de información vital.</p>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-800 border-4 border-secondary/10 flex items-center justify-center text-2xl font-bold text-secondary mb-6 shadow-lg group-hover:scale-110 transition-transform bg-background">
                    2
                  </div>
                  <h3 className="text-xl font-bold mb-2">Cultiva</h3>
                  <p className="text-gray-500 text-sm">Analiza tus hábitos con nuestros gráficos. Riega las áreas que necesitan atención.</p>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-800 border-4 border-success/10 flex items-center justify-center text-2xl font-bold text-success mb-6 shadow-lg group-hover:scale-110 transition-transform bg-background">
                    3
                  </div>
                  <h3 className="text-xl font-bold mb-2">Cosecha</h3>
                  <p className="text-gray-500 text-sm">Alcanza tus metas de ahorro. Disfruta los frutos de tu disciplina financiera.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
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

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-black">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="text-2xl font-black text-primary">SeedCoin</div>
              <p className="text-sm text-gray-500">Cultivando libertad desde 2024.</p>
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
      </main>
    </div>
  );
}

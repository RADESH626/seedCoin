import Header from "@/components/Header";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import ProcessSection from "@/components/home/ProcessSection";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)] overflow-x-hidden">
      <Header />

      <main className="flex-1 flex flex-col">
        <HeroSection />
        <FeaturesSection />
        <ProcessSection />
        <CTASection />
        <Footer />
      </main>
    </div>
  );
}

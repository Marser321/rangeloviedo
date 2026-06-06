import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import MarketThesis from "@/components/MarketThesis";
import StrategyServices from "@/components/StrategyServices";
import PropertiesGrid from "@/components/PropertiesGrid";
import ProcessGuide from "@/components/ProcessGuide";
import CulturalIdentity from "@/components/CulturalIdentity";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ClosingContact from "@/components/ClosingContact";

import MarketTicker from "@/components/MarketTicker";
import ROICalculator from "@/components/ROICalculator";
import NeighborhoodSpotlight from "@/components/NeighborhoodSpotlight";

// Página interna de librería de componentes: no debe indexarse.
export const metadata = {
  robots: { index: false, follow: false },
};

export default function ShowcasePage() {
  return (
    <main className="ro-bg-page min-h-screen">
      <MarketTicker fixed />
      <Navigation withTicker />
      
      {/* Introduction */}
      <div className="ro-bg-section pt-40 pb-20 px-8 text-center border-b border-ro-dark/5">
        <h1 className="text-4xl md:text-6xl font-display italic text-ro-dark mb-4">Librería de Componentes</h1>
        <p className="text-ro-dark/60 font-light italic max-w-2xl mx-auto">
          Esta página muestra todas las secciones disponibles para el proyecto Rangel Oviedo Group. 
          El cliente puede seleccionar cuáles integrar en su landing page final.
        </p>
      </div>

      <Hero />
      
      <div className="py-10 bg-ro-accent text-white text-center text-[10px] uppercase font-black tracking-[0.5em]">Sección: Ticker de Mercado (Nueva)</div>
      <MarketTicker />
      
      <div className="py-10 bg-ro-accent text-white text-center text-[10px] uppercase font-black tracking-[0.5em]">Sección: Tesis de Mercado</div>
      <MarketThesis />
      
      <div className="py-10 bg-ro-accent text-white text-center text-[10px] uppercase font-black tracking-[0.5em]">Sección: Neighborhood Spotlight (Nueva)</div>
      <NeighborhoodSpotlight />
      
      <div className="py-10 bg-ro-accent text-white text-center text-[10px] uppercase font-black tracking-[0.5em]">Sección: Estrategia y Servicios</div>
      <StrategyServices />
      
      <div className="py-10 bg-ro-accent text-white text-center text-[10px] uppercase font-black tracking-[0.5em]">Sección: Calculadora de ROI (Nueva)</div>
      <ROICalculator />
      
      <div className="py-10 bg-ro-accent text-white text-center text-[10px] uppercase font-black tracking-[0.5em]">Sección: Galería de Propiedades</div>
      <PropertiesGrid />
      
      <div className="py-10 bg-ro-accent text-white text-center text-[10px] uppercase font-black tracking-[0.5em]">Sección: Guía de Proceso</div>
      <ProcessGuide />
      
      <div className="py-10 bg-ro-accent text-white text-center text-[10px] uppercase font-black tracking-[0.5em]">Sección: Identidad Cultural</div>
      <CulturalIdentity />
      
      <div className="py-10 bg-ro-accent text-white text-center text-[10px] uppercase font-black tracking-[0.5em]">Sección: Testimonios</div>
      <Testimonials />
      
      <div className="py-10 bg-ro-accent text-white text-center text-[10px] uppercase font-black tracking-[0.5em]">Sección: FAQ</div>
      <FAQ />
      
      <div className="py-10 bg-ro-accent text-white text-center text-[10px] uppercase font-black tracking-[0.5em]">Sección: Contacto y Cierre</div>
      <ClosingContact />
    </main>
  );
}

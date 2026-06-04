'use client';

import React from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import MarketTicker from '@/components/MarketTicker';
import PropertiesGrid from '@/components/PropertiesGrid';
import ROICalculator from '@/components/ROICalculator';
import NeighborhoodSpotlight from '@/components/NeighborhoodSpotlight';
import Footer from '@/components/Footer';
import MlsDisclaimer from '@/components/MlsDisclaimer';
import { useLanguage } from '@/components/LanguageContext';
import { ArrowRight, Compass, Search } from 'lucide-react';

export default function PropertiesPage() {
  const { t } = useLanguage();

  return (
    <main id="main-content" className="min-h-screen bg-[var(--ro-paper)] text-[var(--ro-ink)]">
      <MarketTicker />
      <Navigation />

      {/* Header section */}
      <section className="relative pt-36 pb-12 md:pt-48 md:pb-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 md:px-8 text-center relative z-10">
          <span className="eyebrow justify-center">{t('Private Inventory', 'Inventario Privado')}</span>
          <h1 className="mt-6 font-display text-5xl md:text-8xl leading-none text-ro-dark font-extrabold tracking-tight max-w-4xl mx-auto">
            {t('Curated Texas', 'Activos Inmobiliarios')} <br />
            <span className="font-black italic text-ro-accent">{t('Real Estate Assets', 'Curados en Texas')}</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-[var(--ro-muted)] leading-relaxed max-w-2xl mx-auto font-light">
            {t(
              'A private, off-market portfolio of luxury executive estates, corporate relocation enclaves, and high-yield appreciation assets in Houston and Austin.',
              'Un portafolio privado fuera del mercado que reúne residencias ejecutivas de lujo, enclaves de relocalización corporativa y activos de alta plusvalía en Houston y Austin.'
            )}
          </p>
        </div>
      </section>

      {/* Properties Grid */}
      <PropertiesGrid />

      {/* ROI Calculator Section */}
      <div className="my-10">
        <ROICalculator />
      </div>

      {/* Neighborhood Spotlight */}
      <NeighborhoodSpotlight />

      {/* Call to Action */}
      <section className="relative px-5 py-20 md:px-8 md:py-28 z-10 overflow-hidden bg-white mx-2 md:mx-4 rounded-[2rem] md:rounded-[4rem] shadow-lg mb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(169,105,55,0.08),transparent_32%)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="eyebrow justify-center">{t('Advisory Access', 'Acceso a Asesoría')}</p>
          <h2 className="mt-4 font-display text-4xl leading-tight md:text-7xl">
            {t('Looking for off-market listings?', '¿Busca listados fuera del mercado?')}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-[var(--ro-muted)] font-light">
            {t(
              'Over 40% of our transactions occur silently without public MLS registry. Connect with us to share your investment thesis and view our private acquisition pipeline.',
              'Más del 40% de nuestras transacciones se realizan de forma silenciosa sin registro en el MLS público. Conéctese con nosotros para compartir su tesis de inversión y conocer nuestro portafolio de adquisiciones privadas.'
            )}
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link className="btn btn-copper" href="/#contacto">
              {t('Request Private Access', 'Solicitar Acceso Privado')}
              <Compass size={18} />
            </Link>
            <Link className="btn btn-ghost" href="/buscar">
              {t('Search the full MLS', 'Buscar todo el MLS')}
              <Search size={18} />
            </Link>
          </div>
        </div>
      </section>

      <MlsDisclaimer />

      <Footer />
    </main>
  );
}

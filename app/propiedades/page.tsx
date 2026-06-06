'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import MarketTicker from '@/components/MarketTicker';
import PropertiesGrid from '@/components/PropertiesGrid';
import TrackRecordBand from '@/components/TrackRecordBand';
import IdxSection from '@/components/IdxSection';
import ROICalculator from '@/components/ROICalculator';
import NeighborhoodSpotlight from '@/components/NeighborhoodSpotlight';
import Footer from '@/components/Footer';
import MlsDisclaimer from '@/components/MlsDisclaimer';
import LazyMount from '@/components/LazyMount';
import ScrollyPlaceholder from '@/components/ScrollyPlaceholder';
import { useLanguage } from '@/components/LanguageContext';
import { siteConfig } from '@/lib/site-config';
import { Compass, Search } from 'lucide-react';

const HouseScrollytelling = dynamic(() => import('@/components/HouseScrollytelling'), {
  ssr: false,
  loading: ScrollyPlaceholder,
});
const Panorama360 = dynamic(() => import('@/components/Panorama360'), {
  ssr: false,
  loading: ScrollyPlaceholder,
});

export default function PropertiesPage() {
  const { t } = useLanguage();

  return (
    <main id="main-content" className="ro-bg-page min-h-screen text-[var(--ro-ink)]">
      <MarketTicker fixed />
      <Navigation withTicker />

      {/* Header section */}
      <section className="relative pt-24 pb-8 md:pt-36 md:pb-12 overflow-hidden">
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

      {/* Track record / credibilidad (prueba social) */}
      <TrackRecordBand />

      {/* Properties Grid — destacadas a medida (diseño "Lujo Latino") */}
      <PropertiesGrid />

      {/* Catálogo completo auto-actualizado desde HAR ("View My Listings") */}
      <IdxSection
        eyebrow={t('Always up to date', 'Siempre actualizado')}
        title={t('Every active listing, live from HAR', 'Todos los listados activos, en vivo desde HAR')}
        description={t(
          "Rangel Oviedo's complete, always-current inventory — served directly from the Houston MLS, updated automatically.",
          'El inventario completo y siempre actualizado de Rangel Oviedo, servido directamente desde el MLS de Houston y al día de forma automática.',
        )}
        src={siteConfig.har.myListingsUrl}
        placeholderEyebrow={t('My listings', 'Mis propiedades')}
        placeholderTitle={t('My HAR listings connect here', 'Aquí se conectan mis propiedades de HAR')}
        placeholderDescription={t(
          'Generate the "View My Listings" widget from the HAR Platinum panel and paste its URL into NEXT_PUBLIC_HAR_MY_LISTINGS_URL.',
          'Genera el widget "View My Listings" desde el panel Platinum de HAR y pega su URL en NEXT_PUBLIC_HAR_MY_LISTINGS_URL.',
        )}
      />

      {/* Showcase de vendidas (View My Sold Listings) — trayectoria */}
      <IdxSection
        eyebrow={t('Track record', 'Trayectoria')}
        title={t('Properties Rangel has sold', 'Propiedades que Rangel ha vendido')}
        description={t(
          'A portfolio of closed transactions — real proof of results in the Houston market.',
          'Un portafolio de transacciones cerradas: prueba real de resultados en el mercado de Houston.',
        )}
        src={siteConfig.har.soldListingsUrl}
        placeholderEyebrow={t('Sold listings', 'Vendidas')}
        placeholderTitle={t('The sold-listings showcase connects here', 'Aquí se conecta el portafolio de vendidas')}
        placeholderDescription={t(
          'Generate the "View My Sold Listings" widget from the HAR Platinum panel and paste its URL into NEXT_PUBLIC_HAR_SOLD_LISTINGS_URL.',
          'Genera el widget "View My Sold Listings" desde el panel Platinum de HAR y pega su URL en NEXT_PUBLIC_HAR_SOLD_LISTINGS_URL.',
        )}
      />

      {/* Editorial: cómo leemos una casa (lazy, monta al acercarse) */}
      <LazyMount placeholder={<ScrollyPlaceholder />}>
        <HouseScrollytelling />
      </LazyMount>

      {/* ROI Calculator Section */}
      <div className="my-10">
        <ROICalculator />
      </div>

      {/* Neighborhood Spotlight */}
      <NeighborhoodSpotlight />

      {/* Tour 360 (lazy, monta al acercarse) */}
      <LazyMount placeholder={<ScrollyPlaceholder />}>
        <Panorama360 />
      </LazyMount>

      {/* Call to Action */}
      <section className="ro-bg-section relative px-5 py-16 md:px-8 md:py-20 z-10 overflow-hidden mx-2 md:mx-4 rounded-[2rem] md:rounded-[4rem] shadow-lg mb-12">
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

import type { Metadata } from 'next';
import MarketTicker from '@/components/MarketTicker';
import Navigation from '@/components/Navigation';
import BuscarClient from '@/components/BuscarClient';
import MlsDisclaimer from '@/components/MlsDisclaimer';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Buscar propiedades | Rangel Oviedo Group',
  description:
    'Busca en todo el MLS de Houston (HAR.com) con datos en vivo y siempre actualizados. Encuentra tu próxima propiedad en Texas.',
};

export default function BuscarPage() {
  return (
    <main id="main-content" className="ro-bg-page min-h-screen text-[var(--ro-ink)]">
      <MarketTicker fixed />
      <Navigation withTicker />
      <BuscarClient />
      <MlsDisclaimer />
      <Footer />
    </main>
  );
}

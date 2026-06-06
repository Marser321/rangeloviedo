import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MarketTicker from '@/components/MarketTicker';
import Navigation from '@/components/Navigation';
import PropertyDetail from '@/components/PropertyDetail';
import MlsDisclaimer from '@/components/MlsDisclaimer';
import Footer from '@/components/Footer';
import { properties } from '@/lib/properties/source';

export async function generateStaticParams() {
  const slugs = await properties.getSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = await properties.getBySlug(slug);
  if (!property) {
    return { title: 'Propiedad no encontrada | Rangel Oviedo Group' };
  }
  return {
    title: `${property.title.es} | Rangel Oviedo Group`,
    description: property.description.es,
    openGraph: { images: property.images.slice(0, 1) },
  };
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await properties.getBySlug(slug);
  if (!property) {
    notFound();
  }

  return (
    <main id="main-content" className="ro-bg-page min-h-screen text-[var(--ro-ink)]">
      <MarketTicker fixed />
      <Navigation withTicker />
      <PropertyDetail property={property} />
      <MlsDisclaimer />
      <Footer />
    </main>
  );
}

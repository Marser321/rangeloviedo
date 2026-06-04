'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import PropertyCard from './PropertyCard';
import { featuredProperties } from '@/lib/properties/data/featured-properties';
import type { Property } from '@/lib/properties/types';

/**
 * Rejilla de propiedades con el diseño "Lujo Latino" (sección oscura).
 * Consume datos vía prop (servidos por la capa `lib/properties`); por defecto
 * usa los destacados curados, de modo que los call sites existentes
 * (`<PropertiesGrid />`) siguen funcionando sin cambios.
 */
export default function PropertiesGrid({
  properties = featuredProperties,
  showSearchCta = false,
}: {
  properties?: Property[];
  showSearchCta?: boolean;
}) {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-32 bg-ro-dark text-ro-light px-5 md:px-8 rounded-[2.5rem] md:rounded-[5rem] mx-2 md:mx-4 relative z-40">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
          <div className="space-y-4">
            <h6 className="text-ro-accent font-black uppercase tracking-[0.4em] text-[10px]">
              {t('Curated Opportunities', 'Oportunidades Curadas')}
            </h6>
            <h2 className="text-4xl md:text-7xl font-display leading-tight">
              {t('Assets with', 'Activos con')} <br />
              <span className="italic font-normal">{t('high potential.', 'alto potencial.')}</span>
            </h2>
          </div>
          <div className="max-w-xs pb-2">
            <p className="text-stone-400 font-light italic text-base md:text-lg border-l border-ro-accent/30 pl-6">
              {t(
                '"Each property in our network has passed through a rigorous filter of capital appreciation and international demand."',
                '"Cada propiedad en nuestra red ha pasado por un filtro riguroso de plusvalía y demanda internacional."'
              )}
            </p>
          </div>
        </div>

        {properties.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8 md:gap-10">
            {properties.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>
        ) : (
          <p className="text-stone-400 italic text-lg">
            {t('New opportunities are being curated. Check back soon.', 'Estamos curando nuevas oportunidades. Vuelve pronto.')}
          </p>
        )}

        {showSearchCta && (
          <div className="mt-16 md:mt-24 flex justify-center">
            <Link href="/buscar" className="btn btn-copper">
              {t('Search the full MLS', 'Buscar todo el MLS')}
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  BedDouble,
  Bath,
  Maximize2,
  MapPin,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { siteConfig } from '@/lib/site-config';
import { whatsappPropertyLink } from '@/lib/whatsapp';
import { PROPERTY_STATUS_LABEL } from '@/lib/properties/display';
import type { Property } from '@/lib/properties/types';

/** Página de detalle de una propiedad: galería + datos + CTAs (contacto / HAR). */
export default function PropertyDetail({ property }: { property: Property }) {
  const { t } = useLanguage();
  const [active, setActive] = React.useState(0);

  const title = t(property.title.en, property.title.es);
  const status = PROPERTY_STATUS_LABEL[property.status];
  const hasWhatsApp = Boolean(siteConfig.whatsappNumber);
  const wa = whatsappPropertyLink({ title, ref: property.mlsNumber });

  const specs = [
    property.beds != null && { icon: BedDouble, value: property.beds, label: t('Beds', 'Recámaras') },
    property.baths != null && { icon: Bath, value: property.baths, label: t('Baths', 'Baños') },
    property.sqft != null && {
      icon: Maximize2,
      value: property.sqft.toLocaleString(),
      label: t('Sq Ft', 'Pies²'),
    },
  ].filter(Boolean) as { icon: typeof BedDouble; value: React.ReactNode; label: string }[];

  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 pt-32 md:px-8 md:pt-44">
      <Link
        href="/propiedades"
        className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--ro-muted)] transition-colors hover:text-ro-accent"
      >
        <ArrowLeft size={15} />
        {t('All properties', 'Todas las propiedades')}
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
        {/* Galería */}
        <div>
          <motion.div
            key={active}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl md:rounded-[2.5rem]"
          >
            <Image
              src={property.images[active]}
              alt={`${title} — ${active + 1}`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute left-6 top-6 rounded-full bg-ro-accent px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white shadow-xl">
              {t(status.en, status.es)}
            </div>
          </motion.div>

          {property.images.length > 1 && (
            <div className="mt-4 grid grid-cols-5 gap-3">
              {property.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={t(`Show image ${i + 1}`, `Mostrar imagen ${i + 1}`)}
                  className={`relative aspect-square overflow-hidden rounded-xl transition-all ${
                    i === active ? 'ring-2 ring-ro-accent ring-offset-2' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="20vw" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Panel de información (sticky en desktop) */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex items-center gap-2 italic text-ro-accent/80">
            <MapPin size={15} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">{property.city}</span>
          </div>
          <h1 className="mt-4 font-display text-4xl italic leading-tight md:text-5xl">{title}</h1>
          <p className="mt-5 font-display text-4xl text-ro-accent">{property.price}</p>

          {specs.length > 0 && (
            <div className="mt-8 grid grid-cols-3 gap-3">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="ro-bg-surface-soft rounded-2xl border border-[var(--ro-ink)]/10 px-3 py-4 text-center"
                >
                  <spec.icon size={18} className="mx-auto text-ro-accent" />
                  <div className="mt-2 font-display text-2xl">{spec.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--ro-muted)]">
                    {spec.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3">
            <Link href={siteConfig.contactHref} className="btn btn-copper">
              {t('Request information', 'Solicitar información')}
            </Link>
            {hasWhatsApp && (
              <a href={wa} target="_blank" rel="noreferrer" className="btn btn-ghost">
                {t('Ask on WhatsApp', 'Consultar por WhatsApp')}
                <MessageCircle size={17} />
              </a>
            )}
            <a href={property.harUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">
              {t('View official listing on HAR', 'Ver listado oficial en HAR')}
              <ExternalLink size={16} />
            </a>
          </div>

          {property.mlsNumber && property.mlsNumber !== '00000000' && (
            <p className="mt-5 text-[11px] uppercase tracking-[0.16em] text-[var(--ro-muted)]">
              MLS #{property.mlsNumber}
            </p>
          )}
        </div>
      </div>

      {/* Descripción */}
      <div className="mt-14 max-w-3xl border-t border-[var(--ro-ink)]/10 pt-10">
        <p className="eyebrow">{t('About this home', 'Sobre esta propiedad')}</p>
        <p className="mt-5 text-lg leading-8 text-[var(--ro-ink)]/85 md:text-xl">
          {t(property.description.en, property.description.es)}
        </p>
      </div>
    </section>
  );
}

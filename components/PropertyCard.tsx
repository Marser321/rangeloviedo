'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { MapPin, Maximize2, BedDouble, Bath } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { PROPERTY_STATUS_LABEL } from '@/lib/properties/display';
import type { Property } from '@/lib/properties/types';

/**
 * Tarjeta de propiedad con el diseño premium del sitio (pensada para fondo
 * oscuro, como la sección de `PropertiesGrid`). Enlaza al detalle.
 */
export default function PropertyCard({
  property,
  index = 0,
}: {
  property: Property;
  index?: number;
}) {
  const { t } = useLanguage();
  const title = t(property.title.en, property.title.es);
  const status = PROPERTY_STATUS_LABEL[property.status];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.08, 0.4) }}
    >
      <Link href={`/propiedades/${property.slug}`} className="group block cursor-pointer">
        <div className="relative aspect-[4/5] rounded-[2rem] md:rounded-[3rem] overflow-hidden mb-6 md:mb-8 shadow-2xl">
          <Image
            src={property.images[0]}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ro-dark/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
          <div className="absolute top-6 right-6 bg-ro-accent text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
            {t(status.en, status.es)}
          </div>
        </div>

        <div className="space-y-4 px-2 md:px-4">
          <div className="flex items-center gap-2 text-ro-accent/70 italic">
            <MapPin size={14} />
            <span className="text-[10px] uppercase font-bold tracking-[0.2em]">{property.city}</span>
          </div>
          <h3 className="text-xl md:text-2xl font-display italic tracking-tight group-hover:text-ro-accent transition-colors">
            {title}
          </h3>
          <div className="flex items-center justify-between border-t border-white/10 pt-4 md:pt-6 mt-4 md:mt-6">
            <div className="flex items-center gap-4 text-stone-400">
              {property.beds != null && (
                <span className="flex items-center gap-1.5 text-xs font-light">
                  <BedDouble size={15} /> {property.beds}
                </span>
              )}
              {property.baths != null && (
                <span className="flex items-center gap-1.5 text-xs font-light">
                  <Bath size={15} /> {property.baths}
                </span>
              )}
              {property.sqft != null && (
                <span className="flex items-center gap-1.5 text-xs font-light">
                  <Maximize2 size={14} /> {property.sqft.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-xl md:text-2xl font-display text-ro-accent">{property.price}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

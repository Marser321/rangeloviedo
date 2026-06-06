'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { siteConfig } from '@/lib/site-config';

/**
 * Embebe un widget IDX de HAR.com — búsqueda completa del MLS (Home Finder) o
 * el catálogo propio del agente ("View My Listings"). La URL del iframe se pasa
 * por `src`; si no se indica, usa `siteConfig.har.idxWidgetUrl`
 * (NEXT_PUBLIC_HAR_IDX_WIDGET_URL, el buscador). Si la URL está vacía, muestra
 * un placeholder on-brand con instrucciones.
 *
 * Nota: estos embeds heredan el color de tema configurado en el panel Platinum
 * de HAR (IDX Theme Color → seleccionar el tono oscuro → Submit). Su interior
 * no se puede reestilizar desde aquí; por eso las tarjetas "Lujo Latino" propias
 * conviven con este catálogo auto-actualizado.
 */
export default function HarIdxWidget({
  src,
  minHeight = 900,
  eyebrow,
  title,
  description,
}: {
  src?: string;
  minHeight?: number;
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  const { t } = useLanguage();
  const url = src ?? siteConfig.har.idxWidgetUrl;
  const frameTitle = title ?? t('HAR MLS property search', 'Búsqueda de propiedades del MLS de HAR');

  if (!url) {
    return (
      <div className="ro-bg-surface-soft rounded-[2rem] border border-dashed border-[var(--ro-ink)]/25 p-10 text-center md:p-16">
        <p className="eyebrow justify-center">{eyebrow ?? t('IDX search', 'Buscador IDX')}</p>
        <h3 className="mt-5 font-display text-3xl md:text-4xl">
          {title ?? t('The HAR MLS search connects here', 'Aquí se conecta el buscador del MLS de HAR')}
        </h3>
        <p className="mx-auto mt-5 max-w-xl leading-7 text-[var(--ro-muted)]">
          {description ??
            t(
              'Generate the IDX Home Finder widget from the HAR Platinum panel and paste its iframe URL into the NEXT_PUBLIC_HAR_IDX_WIDGET_URL environment variable.',
              'Genera el widget IDX (Home Finder) desde el panel Platinum de HAR y pega la URL de su iframe en la variable de entorno NEXT_PUBLIC_HAR_IDX_WIDGET_URL.'
            )}
        </p>
        <a
          href="https://cms.har.com/idxtools/"
          target="_blank"
          rel="noreferrer"
          className="btn btn-ghost mt-8 inline-flex"
        >
          {t('Open HAR IDX Tools', 'Abrir herramientas IDX de HAR')}
          <ExternalLink size={16} />
        </a>
      </div>
    );
  }

  return (
    <div
      className="rounded-[2.5rem] p-px shadow-[0_60px_150px_-50px_rgba(39,31,26,0.55)]"
      style={{
        backgroundImage:
          'linear-gradient(135deg, rgba(212,177,111,0.55) 0%, rgba(162,96,53,0.26) 38%, rgba(162,96,53,0) 72%)',
      }}
    >
      {/* Luminous near-white stage: matches the iframe's light interior so its
          edge dissolves instead of reading as an abrupt white box. */}
      <div
        className="overflow-hidden rounded-[2.45rem] p-1.5 md:p-2.5"
        style={{ backgroundColor: '#fffdf9' }}
      >
        <iframe
          src={url}
          title={frameTitle}
          className="block w-full rounded-[2rem]"
          style={{ minHeight, backgroundColor: '#ffffff' }}
          loading="lazy"
        />
      </div>
    </div>
  );
}

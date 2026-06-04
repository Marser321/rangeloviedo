'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { siteConfig } from '@/lib/site-config';

/**
 * Embebe el widget IDX (Home Finder) de HAR.com — la búsqueda completa del MLS.
 * Toma la URL del iframe desde `siteConfig.har.idxWidgetUrl`
 * (NEXT_PUBLIC_HAR_IDX_WIDGET_URL). Si no está configurada, muestra un
 * placeholder on-brand con instrucciones para conectar el widget.
 */
export default function HarIdxWidget({ minHeight = 900 }: { minHeight?: number }) {
  const { t } = useLanguage();
  const url = siteConfig.har.idxWidgetUrl;

  if (!url) {
    return (
      <div className="rounded-[2rem] border border-dashed border-[var(--ro-ink)]/25 bg-[var(--ro-sand)]/40 p-10 text-center md:p-16">
        <p className="eyebrow justify-center">{t('IDX search', 'Buscador IDX')}</p>
        <h3 className="mt-5 font-display text-3xl md:text-4xl">
          {t('The HAR MLS search connects here', 'Aquí se conecta el buscador del MLS de HAR')}
        </h3>
        <p className="mx-auto mt-5 max-w-xl leading-7 text-[var(--ro-muted)]">
          {t(
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
    <div className="overflow-hidden rounded-[2rem] border border-[var(--ro-ink)]/10 bg-white shadow-sm">
      <iframe
        src={url}
        title={t('HAR MLS property search', 'Búsqueda de propiedades del MLS de HAR')}
        className="w-full"
        style={{ minHeight }}
        loading="lazy"
      />
    </div>
  );
}

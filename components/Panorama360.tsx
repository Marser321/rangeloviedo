'use client';

import React, { useState } from 'react';
import { Compass, Loader2 } from 'lucide-react';
import { useLanguage } from './LanguageContext';

// Kuula 360 collection. Swap this URL to change the tour; params enable
// logo, info, fullscreen, mouse-wheel zoom, side-bar and thumbnails.
// Mobile gyroscope works via the iframe `allow` attribute below.
const KUULA_SRC =
  'https://kuula.co/share/collection/7HFB7?logo=1&info=1&fs=1&vr=0&zoom=1&sd=1&thumbs=1';

export default function Panorama360() {
  const { t } = useLanguage();
  const [loaded, setLoaded] = useState(false);

  return (
    <section
      id="tour-360"
      className="relative z-10 bg-[var(--ro-ink)] px-5 py-20 text-[var(--ro-paper)] md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div data-reveal className="mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-[#c9a864]">
              <Compass size={14} className="mr-2 inline" aria-hidden="true" />
              {t('Immersive 360° tour', 'Recorrido 360° inmersivo')}
            </p>
            <h2 className="mt-4 font-display text-4xl leading-[1.04] text-white md:text-6xl">
              {t('Step inside before you visit.', 'Entrá antes de visitar.')}
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-white/60 md:text-lg">
            {t(
              'Explore the key spaces in full 360°. Use the thumbnails to move between rooms.',
              'Explorá los espacios clave en 360°. Usá las miniaturas para moverte entre ambientes.',
            )}
          </p>
        </div>

        {/* Kuula tour — native lazy load keeps it out of the initial page load */}
        <div
          data-reveal
          className="relative h-[70vh] min-h-[440px] w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b0a08] shadow-[0_45px_130px_rgba(0,0,0,0.55)] md:h-[640px]"
        >
          <iframe
            src={KUULA_SRC}
            title={t('Rangel Oviedo Group — 360° virtual tour', 'Rangel Oviedo Group — tour virtual 360°')}
            className="absolute inset-0 h-full w-full"
            style={{ border: 0 }}
            loading="lazy"
            allow="fullscreen; accelerometer; gyroscope; magnetometer; xr-spatial-tracking"
            allowFullScreen
            onLoad={() => setLoaded(true)}
          />

          {!loaded && (
            <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#0b0a08] text-white/70">
              <Loader2 size={26} className="animate-spin text-[#c9a864]" aria-hidden="true" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
                {t('Loading 360° tour…', 'Cargando tour 360°…')}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

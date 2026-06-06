'use client';

import React from 'react';
import { useLanguage } from './LanguageContext';
import { siteConfig } from '@/lib/site-config';

/**
 * Banda de credibilidad / track record: la prueba social del agente (ventas,
 * rentas, reseñas, estatus Platinum). Es su verdadera fortaleza cuando el
 * inventario activo público es pequeño. Cifras editables en
 * `siteConfig.trackRecord` (actualizar a mano desde el perfil HAR de Rangel;
 * HAR no expone un feed para estos totales).
 */
export default function TrackRecordBand() {
  const { t } = useLanguage();
  const { sold, leased, reviews, rating } = siteConfig.trackRecord;

  const stats = [
    { value: String(sold), label: t('Properties sold', 'Propiedades vendidas') },
    { value: String(leased), label: t('Properties leased', 'Propiedades rentadas') },
    { value: `${rating}★`, label: t(`${reviews} Google reviews`, `${reviews} reseñas en Google`) },
    { value: t('Platinum', 'Platinum'), label: t('HAR.com agent', 'Agente HAR.com') },
  ];

  return (
    <section className="mx-auto max-w-7xl px-5 pt-16 md:px-8 md:pt-24">
      <div className="text-center">
        <span className="eyebrow justify-center">{t('Proven track record', 'Trayectoria comprobada')}</span>
        <h2 className="mt-4 font-display text-3xl leading-tight md:text-5xl">
          {t('A record that speaks for itself', 'Una trayectoria que habla por sí sola')}
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 md:mt-14 md:grid-cols-4 md:gap-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="ro-bg-surface rounded-[1.5rem] border border-[var(--ro-ink)]/10 p-6 text-center md:p-8"
          >
            <p className="font-display text-4xl leading-none text-ro-accent md:text-6xl">{s.value}</p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-[var(--ro-muted)] md:text-xs">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

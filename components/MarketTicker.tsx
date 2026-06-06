'use client';

import React from 'react';
import { TrendingUp, ArrowUpRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function MarketTicker({ fixed = false }: { fixed?: boolean }) {
  const { t } = useLanguage();

  const stats = [
    t('No state income tax in Texas', 'Texas · sin impuesto estatal sobre la renta'),
    t('Full Houston MLS access', 'Acceso completo al MLS de Houston'),
    t('86 properties sold', '86 propiedades vendidas'),
    t('55 properties leased', '55 propiedades rentadas'),
    t('45 Google reviews · 5.0★', '45 reseñas Google · 5.0★'),
    t('HAR Platinum agent', 'Agente HAR Platinum'),
    t('Bilingual advisory EN/ES', 'Asesoría bilingüe EN/ES'),
  ];

  return (
    <div
      className={`overflow-hidden bg-ro-accent ${
        fixed
          ? 'fixed left-0 top-0 z-[120] flex h-10 w-full items-center'
          : 'relative z-50 py-4'
      }`}
    >
      <div 
        className="trust-marquee flex whitespace-nowrap gap-20 items-center"
      >
        {[...stats, ...stats].map((stat, i) => (
          <div key={i} className="flex items-center gap-4 text-white font-bold uppercase text-[10px] tracking-[0.3em]">
            <TrendingUp size={14} className="opacity-60" />
            <span>{stat}</span>
            <ArrowUpRight size={14} className="text-white/40" />
          </div>
        ))}
      </div>
    </div>
  );
}

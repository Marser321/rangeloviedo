'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="ro-bg-page min-h-screen flex items-center justify-center px-6 text-center">
      <div className="space-y-8">
        <h1 className="text-9xl font-display italic text-ro-accent opacity-20">404</h1>
        <div className="space-y-4">
          <h2 className="text-4xl font-display text-ro-dark italic">
            {t('Page not found', 'Página no encontrada')}
          </h2>
          <p className="text-ro-dark/60 font-light max-w-md mx-auto italic">
            {t(
              '"In real estate, location is everything — and this page is off the map."',
              '"En el mercado inmobiliario, la ubicación lo es todo. Y esta página quedó fuera del mapa."',
            )}
          </p>
        </div>
        <Link
          href="/"
          className="inline-block bg-ro-dark text-ro-light px-10 py-4 rounded-2xl font-bold uppercase text-[10px] tracking-widest hover:bg-ro-accent transition-all"
        >
          {t('Back to home', 'Volver al inicio')}
        </Link>
      </div>
    </div>
  );
}

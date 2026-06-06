'use client';

import React from 'react';
import { useLanguage } from '@/components/LanguageContext';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLanguage();

  return (
    <div className="ro-bg-page min-h-screen flex items-center justify-center px-6 text-center">
      <div className="space-y-8">
        <h1 className="text-8xl font-display italic text-ro-accent opacity-20">Error</h1>
        <div className="space-y-4">
          <h2 className="text-4xl font-display text-ro-dark italic">
            {t('Something went off-plan', 'Algo no salió según el plan')}
          </h2>
          <p className="text-ro-dark/60 font-light max-w-md mx-auto italic">
            {t(
              '"Even the best investments hit a snag. We are working to restore the connection."',
              '"Incluso las mejores inversiones enfrentan contratiempos. Estamos trabajando para restaurar la conexión."',
            )}
          </p>
        </div>
        <button
          onClick={() => reset()}
          className="inline-block bg-ro-dark text-ro-light px-10 py-4 rounded-2xl font-bold uppercase text-[10px] tracking-widest hover:bg-ro-accent transition-all"
        >
          {t('Try again', 'Reintentar')}
        </button>
      </div>
    </div>
  );
}

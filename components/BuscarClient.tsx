'use client';

import React from 'react';
import { useLanguage } from './LanguageContext';
import HarIdxWidget from './HarIdxWidget';

/** Encabezado bilingüe + widget IDX de HAR para la página /buscar. */
export default function BuscarClient() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 pt-36 md:px-8 md:pt-48">
      <p className="eyebrow">{t('Full catalog', 'Catálogo completo')}</p>
      <h1 className="mt-5 font-display text-5xl leading-tight md:text-7xl">
        {t('Search every listing in the Houston MLS', 'Busca todos los listados del MLS de Houston')}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--ro-muted)] md:text-xl">
        {t(
          'Live data from HAR.com, always up to date. Found something you like? Request information and Rangel will arrange a private showing.',
          'Datos en vivo de HAR.com, siempre actualizados. ¿Viste algo que te gusta? Solicita información y Rangel coordina una visita privada.'
        )}
      </p>

      <div className="mt-12">
        <HarIdxWidget />
      </div>
    </section>
  );
}

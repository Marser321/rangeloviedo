'use client';

import React from 'react';
import { useLanguage } from './LanguageContext';
import IdxSection from './IdxSection';

/** Encabezado bilingüe + widget IDX de HAR para la página /buscar. */
export default function BuscarClient() {
  const { t } = useLanguage();

  return (
    <div className="pt-24 md:pt-32">
      <IdxSection
        titleAs="h1"
        eyebrow={t('Full catalog', 'Catálogo completo')}
        title={t('Search every listing in the Houston MLS', 'Busca todos los listados del MLS de Houston')}
        description={t(
          'Live data from HAR.com, always up to date. Found something you like? Request information and Rangel will arrange a private showing.',
          'Datos en vivo de HAR.com, siempre actualizados. ¿Viste algo que te gusta? Solicita información y Rangel coordina una visita privada.',
        )}
        placeholderTitle={t('The HAR MLS search connects here', 'Aquí se conecta el buscador del MLS de HAR')}
      />
    </div>
  );
}

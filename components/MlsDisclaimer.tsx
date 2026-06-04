'use client';

import React from 'react';
import { useLanguage } from './LanguageContext';
import { siteConfig } from '@/lib/site-config';

/**
 * Aviso de cumplimiento IDX/MLS: atribución a HAR + cláusula "deemed reliable
 * but not guaranteed". Requerido al mostrar datos del MLS de Houston.
 */
export default function MlsDisclaimer() {
  const { t } = useLanguage();
  const broker = siteConfig.har.brokerName;

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8 py-10">
      <p className="border-t border-[var(--ro-ink)]/10 pt-6 text-[11px] leading-relaxed text-[var(--ro-muted)]">
        {t(
          `Listing information is provided courtesy of the Houston Association of REALTORS® (HAR.com) Multiple Listing Service. Data is deemed reliable but is not guaranteed accurate by the MLS. Properties are presented by ${broker}. Buyers should independently verify all information and measurements.`,
          `La información de los listados se presenta por cortesía del Multiple Listing Service de la Houston Association of REALTORS® (HAR.com). Los datos se consideran confiables pero el MLS no garantiza su exactitud. Propiedades presentadas por ${broker}. Los compradores deben verificar de forma independiente toda la información y las medidas.`
        )}
      </p>
    </div>
  );
}

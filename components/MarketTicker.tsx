'use client';

import React from 'react';
import { TrendingUp, ArrowUpRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function MarketTicker() {
  const { t } = useLanguage();

  const stats = [
    t('Houston Median Price: +5.2% YoY', 'Precio Medio Houston: +5.2% Anual'),
    t('Austin Rental Demand: 94% Capacity', 'Demanda de Alquiler Austin: 94% de Capacidad'),
    t('Texas GDP Growth: 4th Globally (Equivalent)', 'Crecimiento PIB Texas: 4° Global (Equivalente)'),
    t('No State Income Tax Benefit', 'Beneficio de Cero Impuesto Estatal sobre la Renta'),
    t('Luxury Inventory Turn: 42 Days', 'Rotación de Inventario de Lujo: 42 Días'),
    t('Rangel Oviedo Exclusive ROI: 12% Avg', 'ROI Exclusivo Rangel Oviedo: 12% Promedio')
  ];

  return (
    <div className="bg-ro-accent py-4 overflow-hidden relative z-50">
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

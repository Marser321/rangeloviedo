'use client';

import React from 'react';
import { useLanguage } from './LanguageContext';

export default function MarketThesis() {
  const { t } = useLanguage();

  return (
    <section id="tesis" className="py-20 md:py-32 bg-ro-dark text-ro-light rounded-[2.5rem] md:rounded-[5rem] mx-2 md:mx-4 relative z-40 shadow-2xl">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-end">
          <div>
            <span className="text-ro-accent font-black uppercase tracking-[0.5em] text-[10px]">
              {t('Group Philosophy', 'Filosofía del Grupo')}
            </span>
            <h2 className="text-3xl md:text-6xl font-display italic mt-6 leading-tight">
              {t('Market intelligence is our compass,', 'La inteligencia de mercado es nuestra brújula,')} <br/>
              <span className="not-italic text-stone-500 underline decoration-ro-accent">
                {t('warmth is our DNA.', 'la calidez es nuestro ADN.')}
              </span>
            </h2>
          </div>
          <div className="space-y-10 border-l border-white/10 lg:pl-10 pl-0">
             <p className="text-lg md:text-xl text-stone-400 font-light leading-relaxed">
               {t(
                 '"It is not just about finding a house; it is about reading the demographic flow of Texas and understanding how its fundamentals — including no state income tax — support your family\'s long-term wealth."',
                 '"No se trata solo de encontrar una casa; se trata de leer el flujo demográfico de Texas y entender cómo sus fundamentos —incluido el cero impuesto estatal sobre la renta— sostienen el patrimonio de tu familia a largo plazo."'
               )}
             </p>
             <div className="grid grid-cols-2 gap-8">
                <div>
                   <h4 className="text-3xl md:text-4xl font-display mb-2">86</h4>
                   <p className="text-[10px] uppercase opacity-40 font-bold tracking-widest">
                     {t('Properties sold', 'Propiedades vendidas')}
                   </p>
                </div>
                <div>
                   <h4 className="text-4xl font-display mb-2">45★</h4>
                   <p className="text-[10px] uppercase opacity-40 font-bold tracking-widest">
                     {t('Google reviews · 5.0', 'Reseñas Google · 5.0')}
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function FAQ() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: t('Why is Texas such a strong market for international investors?', '¿Por qué Texas es un mercado tan sólido para inversores internacionales?'),
      answer: t(
        'Texas combines a competitive tax advantage (no state income tax), strong corporate in-migration, and constantly expanding infrastructure — fundamentals that have long supported sustained housing demand.',
        'Texas combina una ventaja fiscal competitiva (sin impuesto estatal sobre la renta), una fuerte migración corporativa y una infraestructura en constante expansión: fundamentos que han sostenido la demanda de vivienda durante años.'
      )
    },
    {
      question: t('Can I invest as a foreigner without having legal residency in the US?', '¿Puedo invertir como extranjero sin tener residencia legal en EE.UU.?'),
      answer: t(
        'Absolutely. There are legal structures (such as LLCs or corporations) and mortgage programs designed specifically for foreign investors that allow the acquisition of assets without the need for a residency visa.',
        'Absolutamente. Existen estructuras legales (como LLCs o corporaciones) y programas hipotecarios diseñados específicamente para inversores extranjeros que permiten adquirir activos sin necesidad de una visa de residencia.'
      )
    },
    {
      question: t('What post-acquisition management services do you offer?', '¿Qué servicios de gestión ofrecen post-adquisición?'),
      answer: t(
        'Our concierge handles tenant selection for corporate leases and preventive maintenance, and coordinates the tax and legal partners who keep your asset efficient — so it generates real, hands-off income.',
        'Nuestro concierge se encarga de la selección de inquilinos corporativos y el mantenimiento preventivo, y coordina a los socios fiscales y legales que mantienen tu activo eficiente, para que genere ingresos reales sin que tengas que gestionarlo.'
      )
    },
    {
      question: t('What is the average investment ticket for the luxury segment?', '¿Cuál es el ticket promedio de inversión para el segmento de lujo?'),
      answer: t(
        'Most of our clients invest between $800k and $5M. Our sharpest focus is the $1.5M–$5M range, where selection and negotiation make the biggest difference to long-term value.',
        'La mayoría de nuestros clientes invierte entre $800k y $5M. Nuestro foco principal está en el rango de $1.5M a $5M, donde la selección y la negociación marcan la mayor diferencia en el valor a largo plazo.'
      )
    }
  ];

  return (
    <section className="ro-bg-section-soft py-20 md:py-32 px-5 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 md:mb-20 space-y-4">
          <h6 className="text-ro-accent font-black uppercase tracking-[0.4em] text-[10px]">
            {t('Frequent questions', 'Preguntas frecuentes')}
          </h6>
          <h2 className="text-4xl md:text-6xl font-display text-ro-dark leading-tight">
            {t('The answers', 'Las respuestas')} <br />
            <span className="italic font-normal">{t('that matter.', 'que importan.')}</span>
          </h2>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div 
              key={i}
              className={`border-b border-ro-dark/5 transition-all duration-500 ${activeIndex === i ? 'pb-8 md:pb-10' : 'pb-6'}`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                className="w-full flex justify-between items-center text-left group gap-4"
              >
                <span className={`text-base md:text-2xl font-display italic transition-colors ${activeIndex === i ? 'text-ro-accent' : 'text-ro-dark group-hover:text-ro-accent'}`}>
                  {faq.question}
                </span>
                <ChevronDown 
                  size={20} 
                  className={`text-ro-accent transition-transform duration-500 shrink-0 ${activeIndex === i ? 'rotate-180' : ''}`} 
                />
              </button>
              
              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 md:mt-6 text-ro-dark/60 font-light leading-relaxed text-sm md:text-lg italic border-l-2 border-ro-accent/20 pl-4 md:pl-8">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

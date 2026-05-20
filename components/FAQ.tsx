'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: '¿Por qué Texas es el mercado más sólido para inversores internacionales en 2026?',
    answer: 'Texas combina una ventaja fiscal competitiva (sin impuesto estatal sobre la renta), un flujo migratorio corporativo masivo y una infraestructura en constante expansión, lo que garantiza una plusvalía sostenida por encima de la media nacional.'
  },
  {
    question: '¿Puedo invertir como extranjero sin tener residencia legal en EE.UU.?',
    answer: 'Absolutamente. Existen estructuras legales (como LLCs o corporaciones) y programas hipotecarios diseñados específicamente para inversores extranjeros que permiten adquirir activos sin necesidad de una visa de residencia.'
  },
  {
    question: '¿Qué servicios de gestión ofrecen post-adquisición?',
    answer: 'Nuestro concierge de inversión se encarga de la selección de inquilinos corporativos, el mantenimiento preventivo y la optimización fiscal continua, asegurando que su activo genere rendimiento pasivo real.'
  },
  {
    question: '¿Cuál es el ticket promedio de inversión para el segmento de lujo?',
    answer: 'En el segmento de "Lujo con Propósito", las inversiones suelen comenzar a partir de los $800k, aunque nuestro enfoque principal está en activos de entre $1.5M y $5M con alto potencial de revalorización.'
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-white px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-20 space-y-4">
          <h6 className="text-ro-accent font-black uppercase tracking-[0.4em] text-[10px]">Resolviendo Inquietudes</h6>
          <h2 className="text-5xl md:text-6xl font-display text-ro-dark leading-tight">
            Consultas de <br />
            <span className="italic font-normal">Alta Inteligencia.</span>
          </h2>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div 
              key={i}
              className={`border-b border-ro-dark/5 transition-all duration-500 ${activeIndex === i ? 'pb-10' : 'pb-6'}`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                className="w-full flex justify-between items-center text-left group"
              >
                <span className={`text-xl md:text-2xl font-display italic transition-colors ${activeIndex === i ? 'text-ro-accent' : 'text-ro-dark group-hover:text-ro-accent'}`}>
                  {faq.question}
                </span>
                <ChevronDown 
                  size={20} 
                  className={`text-ro-accent transition-transform duration-500 ${activeIndex === i ? 'rotate-180' : ''}`} 
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
                    <p className="mt-6 text-ro-dark/60 font-light leading-relaxed text-lg italic border-l-2 border-ro-accent/20 pl-8">
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

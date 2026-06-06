'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Search, ShieldCheck, Key, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from './LanguageContext';

export default function ProcessGuide() {
  const { t } = useLanguage();

  const steps = [
    {
      title: t('Profile Analysis & Intelligence', 'Análisis de Perfil e Inteligencia'),
      description: t(
        'We define your personal investment thesis, analyzing risk tolerance, time horizon, and capitalization goals in the Texas market.',
        'Definimos su tesis de inversión personal, analizando tolerancia al riesgo, horizonte temporal y objetivos de capitalización en el mercado tejano.'
      ),
      icon: <Search className="w-6 h-6" />
    },
    {
      title: t('Architecture & Negotiation', 'Arquitectura y Negociación'),
      description: t(
        'We use our private, off-market network and demographic data to secure assets with a competitive edge before they reach the public.',
        'Usamos nuestra red privada y off-market, más datos demográficos, para asegurar activos con ventaja competitiva antes de que salgan al mercado público.'
      ),
      icon: <ShieldCheck className="w-6 h-6" />
    },
    {
      title: t('Closing & Wealth Management', 'Cierre y Gestión Patrimonial'),
      description: t(
        'We accompany you through the entire legal and administrative process, ensuring your investment is protected and ready to generate value from day one.',
        'Acompañamos en todo el proceso legal y administrativo, asegurando que su inversión esté protegida y lista para generar valor desde el primer día.'
      ),
      icon: <Key className="w-6 h-6" />
    }
  ];

  return (
    <section className="ro-bg-section-soft py-20 md:py-32 px-5 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 md:mb-24 space-y-4">
          <h6 className="text-ro-accent font-black uppercase tracking-[0.4em] text-[10px]">
            {t('Success Methodology', 'Metodología de Éxito')}
          </h6>
          <h2 className="text-4xl md:text-7xl font-display text-ro-dark leading-tight">
            {t('Three steps to your', 'Tres pasos hacia su')} <br />
            <span className="italic font-normal">{t('wealth freedom.', 'libertad patrimonial.')}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-12 left-20 right-20 h-px bg-ro-accent/10 z-0" />
          
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="ro-bg-surface-soft w-24 h-24 rounded-[2.5rem] flex items-center justify-center text-ro-accent mb-8 md:mb-10 group-hover:bg-ro-accent group-hover:text-white transition-all duration-500 border border-ro-dark/5">
                {s.icon}
              </div>
              
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-black tracking-widest text-ro-accent opacity-40">
                  {t('Phase', 'Fase')} 0{i + 1}
                </span>
                <h3 className="text-xl md:text-2xl font-display italic text-ro-dark tracking-tight">{s.title}</h3>
                <p className="text-sm md:text-base text-ro-dark/60 font-light leading-relaxed italic">{s.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 md:mt-24 flex justify-center">
           <Link href="/#contacto" className="group flex items-center gap-4 text-ro-dark hover:text-ro-accent transition-colors font-bold uppercase text-[10px] tracking-[0.3em] text-center">
             {t('Start with a consultation', 'Empieza con una asesoría')}
             <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
           </Link>
        </div>
      </div>
    </section>
  );
}

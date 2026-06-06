'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from './LanguageContext';

export default function CulturalIdentity() {
  const { t } = useLanguage();

  return (
    <section id="insights" className="ro-bg-section py-20 md:py-32 px-5 md:px-8 overflow-hidden rounded-[2rem] md:rounded-[4rem] mx-2 md:mx-4 mb-20 md:mb-32 shadow-xl">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          <div className="lg:col-span-5 relative">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative z-10 rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-2xl aspect-[4/5] bg-stone-100"
            >
              <Image 
                src="/rog/rangel-desire-studio.jpg" 
                alt="Rangel y Desiré Oviedo - Liderazgo con Propósito"
                className="w-full object-cover"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </motion.div>
            
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-ro-accent/5 rounded-full blur-[80px] max-md:hidden" />
            <div className="absolute -bottom-8 -left-8 bg-ro-dark text-ro-light p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-2xl z-20 hidden md:block">
              <span className="font-display italic text-2xl md:text-3xl leading-none block">Texas Rooted, <br />Global Heart.</span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8 md:space-y-12">
            <div className="space-y-6">
              <h6 className="text-ro-accent font-black uppercase tracking-[0.4em] text-[10px] italic">
                {t('Our "Why"', 'Nuestro "Por Qué"')}
              </h6>
              <h2 className="text-4xl md:text-7xl font-display text-ro-dark leading-tight">
                {t('More than assets,', 'Más que activos,')} <br />
                <span className="italic font-normal">{t('we protect roots.', 'protegemos raíces.')}</span>
              </h2>
            </div>

            <div className="space-y-6 md:space-y-8 text-lg md:text-xl font-light leading-relaxed text-ro-dark/70 max-w-2xl">
              <p>
                {t('Rangel Oviedo Group was born from a clear conviction: in the luxury real estate industry, ', 'Rangel Oviedo Group nació de una convicción clara: en la industria de bienes raíces de lujo, ')}
                <span className="font-semibold text-ro-dark">
                  {t('efficiency does not have to be cold.', 'la eficiencia no tiene por qué ser fría.')}
                </span> 
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 md:gap-8 pt-4 md:pt-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-ro-accent">
                    <Sparkles size={20} />
                    <span className="text-xs uppercase font-black tracking-widest italic">
                      {t('Latin Magic', 'Magia Latina')}
                    </span>
                  </div>
                  <p className="text-sm md:text-base text-ro-dark/60">
                    {t('Our cultural intuition allows us to negotiate with a human touch that traditional firms ignore.', 'Nuestra intuición cultural nos permite negociar con un matiz humano que las firmas tradicionales ignoran.')}
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-ro-accent">
                    <Globe size={20} />
                    <span className="text-xs uppercase font-black tracking-widest italic">
                      {t('360° Vision', 'Visión 360°')}
                    </span>
                  </div>
                  <p className="text-sm md:text-base text-ro-dark/60">
                    {t('We understand the logistics of the international investor because we share their ambition for a solid future in the US.', 'Entendemos la logística del inversor internacional porque compartimos su ambición por un futuro sólido en EE.UU.')}
                  </p>
                </div>
              </div>

              <div className="ro-bg-surface-soft p-6 md:p-8 rounded-3xl border-l-4 border-ro-accent">
                 <p className="text-base md:text-lg italic font-display">
                   {t('"We are young, dynamic, and deeply grateful for Texas. Here, we unite our cultural roots with the strength of the most powerful real estate market in the world."', '"Somos jóvenes, dinámicos y profundamente agradecidos por Texas. Aquí, unimos nuestras raíces culturales con la solidez del mercado inmobiliario más potente del mundo."')}
                 </p>
                 <div className="mt-4 flex items-center gap-3">
                    <div className="h-px w-8 bg-ro-dark/20" />
                    <span className="text-xs uppercase font-black tracking-widest opacity-80 italic">Rangel & Desiré Oviedo</span>
                 </div>
              </div>
            </div>

            <div className="pt-4 md:pt-6">
              <Link href="/#contacto" className="inline-flex bg-ro-dark text-ro-light px-10 md:px-12 py-4 md:py-5 rounded-2xl items-center gap-4 hover:bg-ro-accent transition-all transform hover:-translate-y-1 shadow-lg font-bold uppercase text-[10px] tracking-widest">
                {t('Connect with Us', 'Conecta con Nosotros')}
                <Heart size={16} fill="currentColor" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-32 pt-10 md:pt-20 border-t border-ro-dark/5 flex flex-wrap justify-between items-center gap-6 md:gap-10 opacity-50 grayscale hover:grayscale-0 transition-all">
           <span className="text-xs font-black uppercase tracking-[0.5em] w-full text-center mb-4 md:mb-8">
             {t('Third Party Validation', 'Validación de Terceros')}
           </span>
             <div className="flex flex-col md:flex-row w-full justify-between items-center opacity-60 md:px-10 gap-6 text-center">
               <div className="font-display italic text-xl md:text-2xl font-bold tracking-tighter">TRUSTINDEX 5★</div>
               <div className="font-display italic text-xl md:text-2xl font-bold tracking-tighter">Zillow Elite</div>
               <div className="font-display italic text-xl md:text-2xl font-bold tracking-tighter">Google Reviewers</div>
               <div className="font-display italic text-xl md:text-2xl font-bold tracking-tighter">Texas Real Estate Board</div>
             </div>
          </div>
        </div>
    </section>
  );
}

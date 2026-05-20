'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { MessageCircle, Sparkles, Home, Eye, Maximize2, Compass, Layers } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_RANGEL_WHATSAPP ?? '';
const BASE_MESSAGE = 'Hola Rangel, recorrí la casa interactiva en tu web. Quiero conversar sobre propiedades con ese nivel de curaduría en Texas. Mi interés es:';

function whatsappLink(intent: string) {
  const text = encodeURIComponent(`${BASE_MESSAGE} ${intent}.`);
  return WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
    : `https://wa.me/?text=${text}`;
}

const scrollySteps = [
  {
    step: '01',
    labelEn: 'The Approach',
    labelEs: 'La Aproximación',
    titleEn: 'Architecture with Criterium',
    titleEs: 'Arquitectura con Criterio',
    textEn: 'We do not choose listings at random. We evaluate architectural heritage, solar orientation, and the integrity of local materials like Texas limestone from the first exterior glance.',
    textEs: 'No buscamos listados al azar. Evaluamos el valor patrimonial, la orientación solar y la integridad de materiales locales como la piedra caliza de Texas desde el primer vistazo exterior.',
    image: '/rog/scrolly_1_facade.png',
    intent: 'visitar fachadas y arquitectura en Texas',
    icon: Home,
  },
  {
    step: '02',
    labelEn: 'The Threshold',
    labelEs: 'El Umbral',
    titleEn: 'Private Access & Off-Market',
    titleEs: 'Acceso Privado & Off-Market',
    textEn: 'Unlocking private doors. Through deep-rooted partnerships across Austin and Houston, we gain access to exclusive off-market inventory long before it ever touches public listings.',
    textEs: 'Abrimos las puertas correctas. Gracias a relaciones consolidadas en Austin y Houston, accedemos a inventario exclusivo off-market mucho antes de que sea listado públicamente.',
    image: '/rog/scrolly_2_entrance.png',
    intent: 'conocer propiedades off-market',
    icon: Eye,
  },
  {
    step: '03',
    labelEn: 'The Living Room',
    labelEs: 'El Salón',
    titleEn: 'Reading Spatial Dynamics',
    titleEs: 'La Lectura del Espacio',
    textEn: 'We analyze natural light diffusion, acoustics, ceiling proportions, and how daily family flow interacts with the environment. We design your lifestyle before you commit.',
    textEs: 'Analizamos la difusión de luz natural, la acústica, las proporciones de techos y cómo interactúa el flujo familiar cotidiano con el espacio. Diseñamos tu día a día antes de comprar.',
    image: '/rog/scrolly_3_livingroom.png',
    intent: 'evaluar distribución y espacios amplios',
    icon: Maximize2,
  },
  {
    step: '04',
    labelEn: 'The Kitchen & Dining',
    labelEs: 'La Cocina & Comedor',
    titleEn: 'Uncompromising Quality',
    titleEs: 'Calidad Sin Concesiones',
    textEn: 'Inspecting custom joinery, premium marble, and professional-grade culinary appliances. We verify social areas designed to endure, appreciate, and entertain.',
    textEs: 'Inspeccionamos ebanistería a medida, mármoles premium y equipamiento culinario profesional. Áreas sociales diseñadas para perdurar, valorizarse y disfrutar.',
    image: '/rog/scrolly_4_kitchen.png',
    intent: 'propiedades con cocinas premium',
    icon: Layers,
  },
  {
    step: '05',
    labelEn: 'The Terrace',
    labelEs: 'La Terraza',
    titleEn: 'Outdoor Entertaining Flow',
    titleEs: 'La Vida en el Exterior',
    textEn: 'Real estate value extends beyond the walls. We evaluate native landscaping, entertainment capacity under the Texas sky, and the long-term investment liquidity.',
    textEs: 'El valor patrimonial se extiende afuera. Evaluamos el paisajismo nativo, la capacidad de entretenimiento bajo el cielo de Texas y la liquidez de salida de la inversión.',
    image: '/rog/scrolly_5_terrace.png',
    intent: 'terrazas y exteriores exclusivos',
    icon: Compass,
  },
];

export default function HouseScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { language, t } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.18) {
      setActiveIndex(0);
    } else if (latest < 0.38) {
      setActiveIndex(1);
    } else if (latest < 0.58) {
      setActiveIndex(2);
    } else if (latest < 0.78) {
      setActiveIndex(3);
    } else {
      setActiveIndex(4);
    }
  });

  const opacities = [
    useTransform(scrollYProgress, [0, 0.16, 0.20, 1], [1, 1, 0, 0]),
    useTransform(scrollYProgress, [0, 0.16, 0.20, 0.36, 0.40, 1], [0, 0, 1, 1, 0, 0]),
    useTransform(scrollYProgress, [0, 0.36, 0.40, 0.56, 0.60, 1], [0, 0, 1, 1, 0, 0]),
    useTransform(scrollYProgress, [0, 0.56, 0.60, 0.76, 0.80, 1], [0, 0, 1, 1, 0, 0]),
    useTransform(scrollYProgress, [0, 0.76, 0.80, 0.96, 1], [0, 0, 1, 1, 1]),
  ];

  const scales = [
    useTransform(scrollYProgress, [0, 0.20], [1, 1.08]),
    useTransform(scrollYProgress, [0.16, 0.20, 0.40], [0.96, 1, 1.08]),
    useTransform(scrollYProgress, [0.36, 0.40, 0.60], [0.96, 1, 1.08]),
    useTransform(scrollYProgress, [0.56, 0.60, 0.80], [0.96, 1, 1.08]),
    useTransform(scrollYProgress, [0.76, 0.80, 1], [0.96, 1, 1.05]),
  ];

  const textOpacities = [
    useTransform(scrollYProgress, [0, 0.14, 0.18, 1], [1, 1, 0, 0]),
    useTransform(scrollYProgress, [0, 0.18, 0.22, 0.34, 0.38, 1], [0, 0, 1, 1, 0, 0]),
    useTransform(scrollYProgress, [0, 0.38, 0.42, 0.54, 0.58, 1], [0, 0, 1, 1, 0, 0]),
    useTransform(scrollYProgress, [0, 0.58, 0.62, 0.74, 0.78, 1], [0, 0, 1, 1, 0, 0]),
    useTransform(scrollYProgress, [0, 0.78, 0.82, 0.98, 1], [0, 0, 1, 1, 1]),
  ];

  const textYs = [
    useTransform(scrollYProgress, [0, 0.18], [0, -30]),
    useTransform(scrollYProgress, [0.18, 0.22, 0.38], [30, 0, -30]),
    useTransform(scrollYProgress, [0.38, 0.42, 0.58], [30, 0, -30]),
    useTransform(scrollYProgress, [0.58, 0.62, 0.78], [30, 0, -30]),
    useTransform(scrollYProgress, [0.78, 0.82, 1], [30, 0, 0]),
  ];

  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={containerRef} className="relative h-[480vh] bg-ro-dark text-ro-light">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        
        {/* Scrollytelling Header */}
        <header className="relative z-20 w-full px-6 py-6 md:px-12 flex justify-between items-center border-b border-white/5 bg-gradient-to-b from-ro-dark/80 to-transparent backdrop-blur-sm">
          <div>
            <span className="text-[9px] uppercase tracking-[0.3em] font-black text-ro-gold flex items-center gap-2">
              <Sparkles size={12} className="animate-pulse" /> 
              {t('Editorial Walkthrough', 'Recorrido Editorial')}
            </span>
            <h2 className="text-xl md:text-2xl font-display italic text-white mt-1">
              {t('How we read a home', 'Cómo leemos una casa')}
            </h2>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-widest opacity-40 font-mono">
              {t('Step by step', 'Paso a paso')}
            </span>
            <div className="text-sm font-display italic font-bold text-white">
              {t('Texas Real Estate Concierge', 'Texas Real Estate Concierge')}
            </div>
          </div>
        </header>

        {/* Central area */}
        <div className="relative flex-1 flex items-center justify-center p-4 md:p-8">
          <div className="relative w-full max-w-6xl h-[68vh] md:h-[72vh] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_45px_130px_rgba(0,0,0,0.6)]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/55 z-10 pointer-events-none" />

            {/* Images */}
            {scrollySteps.map((step, idx) => (
              <motion.div
                key={step.step}
                style={{
                  opacity: opacities[idx],
                  scale: scales[idx],
                }}
                className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-300"
              >
                <Image
                  src={step.image}
                  alt={language === 'es' ? step.titleEs : step.titleEn}
                  fill
                  priority={idx === 0}
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </motion.div>
            ))}

            {/* Text and actions */}
            <div className="absolute inset-x-0 bottom-0 z-20 p-6 md:p-12 flex flex-col md:flex-row justify-between items-end gap-6 pointer-events-none">
              <div className="max-w-xl w-full relative min-h-[220px] md:min-h-[170px]">
                {scrollySteps.map((step, idx) => {
                  const Icon = step.icon;
                  const isActive = activeIndex === idx;
                  
                  return (
                    <motion.div
                      key={step.step}
                      style={{
                        opacity: textOpacities[idx],
                        y: textYs[idx],
                      }}
                      className={`absolute bottom-0 left-0 w-full text-left transition-all duration-300 ${
                        isActive ? 'pointer-events-auto z-10' : 'pointer-events-none z-0'
                      }`}
                    >
                      <div className="space-y-4">
                        <div className="inline-flex items-center gap-3 bg-ro-copper/85 border border-white/20 text-white rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md">
                          <Icon size={14} />
                          <span>
                            {t('Step', 'Paso')} {step.step} • {t(step.labelEn, step.labelEs)}
                          </span>
                        </div>
                        
                        <h3 className="text-3xl md:text-5xl font-display italic text-white leading-tight font-bold">
                          {t(step.titleEn, step.titleEs)}
                        </h3>
                        
                        <p className="text-xs md:text-sm leading-relaxed text-white/80 font-light max-w-lg border-l-2 border-ro-gold pl-4">
                          {t(step.textEn, step.textEs)}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Action buttons */}
              <div className="shrink-0 relative z-30 w-full md:w-auto">
                {scrollySteps.map((step, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <motion.div
                      key={`btn-${step.step}`}
                      style={{
                        opacity: textOpacities[idx],
                      }}
                      className={`transition-all duration-300 w-full md:w-auto ${
                        isActive ? 'relative pointer-events-auto' : 'absolute bottom-0 right-0 pointer-events-none'
                      }`}
                    >
                      <a
                        href={whatsappLink(step.intent)}
                        target="_blank"
                        rel="noreferrer"
                        className={`btn w-full md:w-auto ${
                          idx === 4 ? 'btn-copper bg-[#c9a864] text-[#0b0a08]' : 'btn-ghost border-white/25 text-white hover:bg-white/10'
                        } text-[11px] shadow-2xl flex items-center justify-center gap-2`}
                      >
                        {idx === 4 ? t('Talk to Rangel', 'Conversar con Rangel') : t('Consult this step', 'Consultar este paso')}
                        <MessageCircle size={16} />
                      </a>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Stepper progress indicator */}
            <div className="absolute top-6 left-6 z-20 flex gap-1.5 md:gap-2">
              {scrollySteps.map((step, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <div 
                    key={`dot-${step.step}`} 
                    className={`h-1.5 rounded-full transition-all duration-500 overflow-hidden relative ${
                      isActive ? 'w-16 bg-white/30' : 'w-8 bg-white/10'
                    }`}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-[#c9a864]" 
                      style={{
                        scaleX: useTransform(
                          scrollYProgress, 
                          [idx * 0.2, (idx + 1) * 0.2], 
                          [0, 1]
                        ),
                        transformOrigin: 'left'
                      }}
                    />
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Footer info */}
        <footer className="relative z-20 w-full px-6 py-5 md:px-12 bg-gradient-to-t from-ro-dark/90 to-transparent border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[10px] uppercase tracking-[0.24em] text-white/40 font-bold">
            {t('Rangel Oviedo Group © 2026 • Quiet Luxury', 'Rangel Oviedo Group © 2026 • Lujo Latino')}
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-medium text-white/60">
              {t('Scroll to advance the walkthrough', 'Haz scroll para avanzar en el recorrido')}
            </span>
            <div className="w-12 h-6 rounded-full border border-white/20 flex items-center justify-center p-1">
              <motion.div 
                className="w-1.5 h-1.5 bg-[#c9a864] rounded-full"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              />
            </div>
          </div>

          <motion.div className="absolute top-0 left-0 h-[2px] bg-[#c9a864] z-30" style={{ width: progressWidth }} />
        </footer>

      </div>
    </section>
  );
}

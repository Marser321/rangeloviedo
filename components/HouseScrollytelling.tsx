'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { MessageCircle, Sparkles, Home, Eye, Maximize2, Compass, Layers } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_RANGEL_WHATSAPP ?? '';
const GHL_FORM_URL = process.env.NEXT_PUBLIC_GHL_FORM_URL ?? '';
const BASE_MESSAGE = 'Hola Rangel, recorrí la casa interactiva en tu web. Quiero conversar sobre propiedades con ese nivel de curaduría en Texas. Mi interés es:';

function actionLink(intent: string) {
  if (GHL_FORM_URL) return GHL_FORM_URL;
  if (!WHATSAPP_NUMBER) return '#contacto';
  const text = encodeURIComponent(`${BASE_MESSAGE} ${intent}.`);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

function externalLinkProps(url: string) {
  return url.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {};
}

const STEP_COUNT = 5;
const getStepRange = (idx: number) => {
  const start = idx / STEP_COUNT;
  const end = (idx + 1) / STEP_COUNT;
  return { start, end };
};

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
  const [isMobile, setIsMobile] = useState(false);
  const [mobileFrameIndex, setMobileFrameIndex] = useState(0);
  const { language, t } = useLanguage();

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile background auto-cycle every 5s
  useEffect(() => {
    if (!isMobile) return;
    const timer = setInterval(() => {
      setMobileFrameIndex((prev) => (prev + 1) % scrollySteps.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isMobile]);

  // Update active index based on scroll (Desktop only)
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (isMobile) return;
    const idx = Math.min(STEP_COUNT - 1, Math.floor(latest * STEP_COUNT));
    setActiveIndex(idx);
  });

  const FADE = 0.03;
  const GAP  = 0.01;

  // ── ALL useTransform hooks called unconditionally at top level ──
  // Image opacities (3 hooks per step × 5 = 15 hooks)
  const op0_t0 = useTransform(scrollYProgress, [0, 0.2 - GAP - FADE, 0.2 - GAP], [1, 1, 0]);
  const op0_tL = useTransform(scrollYProgress, [0 + GAP, 0 + GAP + FADE, 0.2], [0, 1, 1]);
  const op0_tM = useTransform(scrollYProgress, [0 + GAP, 0 + GAP + FADE, 0.2 - GAP - FADE, 0.2 - GAP], [0, 1, 1, 0]);

  const op1_t0 = useTransform(scrollYProgress, [0.2, 0.4 - GAP - FADE, 0.4 - GAP], [1, 1, 0]);
  const op1_tL = useTransform(scrollYProgress, [0.2 + GAP, 0.2 + GAP + FADE, 0.4], [0, 1, 1]);
  const op1_tM = useTransform(scrollYProgress, [0.2 + GAP, 0.2 + GAP + FADE, 0.4 - GAP - FADE, 0.4 - GAP], [0, 1, 1, 0]);

  const op2_t0 = useTransform(scrollYProgress, [0.4, 0.6 - GAP - FADE, 0.6 - GAP], [1, 1, 0]);
  const op2_tL = useTransform(scrollYProgress, [0.4 + GAP, 0.4 + GAP + FADE, 0.6], [0, 1, 1]);
  const op2_tM = useTransform(scrollYProgress, [0.4 + GAP, 0.4 + GAP + FADE, 0.6 - GAP - FADE, 0.6 - GAP], [0, 1, 1, 0]);

  const op3_t0 = useTransform(scrollYProgress, [0.6, 0.8 - GAP - FADE, 0.8 - GAP], [1, 1, 0]);
  const op3_tL = useTransform(scrollYProgress, [0.6 + GAP, 0.6 + GAP + FADE, 0.8], [0, 1, 1]);
  const op3_tM = useTransform(scrollYProgress, [0.6 + GAP, 0.6 + GAP + FADE, 0.8 - GAP - FADE, 0.8 - GAP], [0, 1, 1, 0]);

  const op4_t0 = useTransform(scrollYProgress, [0.8, 1.0 - GAP - FADE, 1.0 - GAP], [1, 1, 0]);
  const op4_tL = useTransform(scrollYProgress, [0.8 + GAP, 0.8 + GAP + FADE, 1.0], [0, 1, 1]);
  const op4_tM = useTransform(scrollYProgress, [0.8 + GAP, 0.8 + GAP + FADE, 1.0 - GAP - FADE, 1.0 - GAP], [0, 1, 1, 0]);

  const opacities = [op0_t0, op1_tM, op2_tM, op3_tM, op4_tL];

  // Scales (5 hooks)
  const scale0 = useTransform(scrollYProgress, [0, 0.2], [1, 1.06]);
  const scale1 = useTransform(scrollYProgress, [0.2, 0.4], [1, 1.06]);
  const scale2 = useTransform(scrollYProgress, [0.4, 0.6], [1, 1.06]);
  const scale3 = useTransform(scrollYProgress, [0.6, 0.8], [1, 1.06]);
  const scale4 = useTransform(scrollYProgress, [0.8, 1.0], [1, 1.06]);
  const scales = [scale0, scale1, scale2, scale3, scale4];

  // Text opacities (3 hooks per step × 5 = 15 hooks)
  const txOp0_t0 = useTransform(scrollYProgress, [0, 0.2 - GAP - FADE, 0.2 - GAP], [1, 1, 0]);
  const txOp0_tL = useTransform(scrollYProgress, [0 + GAP, 0 + GAP + FADE, 0.2], [0, 1, 1]);
  const txOp0_tM = useTransform(scrollYProgress, [0 + GAP, 0 + GAP + FADE, 0.2 - GAP - FADE, 0.2 - GAP], [0, 1, 1, 0]);

  const txOp1_t0 = useTransform(scrollYProgress, [0.2, 0.4 - GAP - FADE, 0.4 - GAP], [1, 1, 0]);
  const txOp1_tL = useTransform(scrollYProgress, [0.2 + GAP, 0.2 + GAP + FADE, 0.4], [0, 1, 1]);
  const txOp1_tM = useTransform(scrollYProgress, [0.2 + GAP, 0.2 + GAP + FADE, 0.4 - GAP - FADE, 0.4 - GAP], [0, 1, 1, 0]);

  const txOp2_t0 = useTransform(scrollYProgress, [0.4, 0.6 - GAP - FADE, 0.6 - GAP], [1, 1, 0]);
  const txOp2_tL = useTransform(scrollYProgress, [0.4 + GAP, 0.4 + GAP + FADE, 0.6], [0, 1, 1]);
  const txOp2_tM = useTransform(scrollYProgress, [0.4 + GAP, 0.4 + GAP + FADE, 0.6 - GAP - FADE, 0.6 - GAP], [0, 1, 1, 0]);

  const txOp3_t0 = useTransform(scrollYProgress, [0.6, 0.8 - GAP - FADE, 0.8 - GAP], [1, 1, 0]);
  const txOp3_tL = useTransform(scrollYProgress, [0.6 + GAP, 0.6 + GAP + FADE, 0.8], [0, 1, 1]);
  const txOp3_tM = useTransform(scrollYProgress, [0.6 + GAP, 0.6 + GAP + FADE, 0.8 - GAP - FADE, 0.8 - GAP], [0, 1, 1, 0]);

  const txOp4_t0 = useTransform(scrollYProgress, [0.8, 1.0 - GAP - FADE, 1.0 - GAP], [1, 1, 0]);
  const txOp4_tL = useTransform(scrollYProgress, [0.8 + GAP, 0.8 + GAP + FADE, 1.0], [0, 1, 1]);
  const txOp4_tM = useTransform(scrollYProgress, [0.8 + GAP, 0.8 + GAP + FADE, 1.0 - GAP - FADE, 1.0 - GAP], [0, 1, 1, 0]);

  const textOpacities = [txOp0_t0, txOp1_tM, txOp2_tM, txOp3_tM, txOp4_tL];

  // Text vertical motion (2 hooks per step × 5 = 10 hooks)
  const ty0_a = useTransform(scrollYProgress, [0, 0.2 - GAP], [0, -24]);
  const ty0_b = useTransform(scrollYProgress, [0 + GAP, 0 + GAP + FADE, 0.2 - GAP], [30, 0, -24]);

  const ty1_a = useTransform(scrollYProgress, [0.2, 0.4 - GAP], [0, -24]);
  const ty1_b = useTransform(scrollYProgress, [0.2 + GAP, 0.2 + GAP + FADE, 0.4 - GAP], [30, 0, -24]);

  const ty2_a = useTransform(scrollYProgress, [0.4, 0.6 - GAP], [0, -24]);
  const ty2_b = useTransform(scrollYProgress, [0.4 + GAP, 0.4 + GAP + FADE, 0.6 - GAP], [30, 0, -24]);

  const ty3_a = useTransform(scrollYProgress, [0.6, 0.8 - GAP], [0, -24]);
  const ty3_b = useTransform(scrollYProgress, [0.6 + GAP, 0.6 + GAP + FADE, 0.8 - GAP], [30, 0, -24]);

  const ty4_a = useTransform(scrollYProgress, [0.8, 1.0 - GAP], [0, -24]);
  const ty4_b = useTransform(scrollYProgress, [0.8 + GAP, 0.8 + GAP + FADE, 1.0 - GAP], [30, 0, -24]);

  const textYs = [ty0_a, ty1_b, ty2_b, ty3_b, ty4_b];

  // Stepper progress bars (5 hooks) — previously called inline in JSX
  const stepperScale0 = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const stepperScale1 = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const stepperScale2 = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const stepperScale3 = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const stepperScale4 = useTransform(scrollYProgress, [0.8, 1.0], [0, 1]);
  const stepperScales = [stepperScale0, stepperScale1, stepperScale2, stepperScale3, stepperScale4];

  // Progress bar width (1 hook)
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // ── Touch handlers for mobile ──
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > swipeThreshold) {
      if (activeIndex < STEP_COUNT - 1) {
        setActiveIndex((prev) => prev + 1);
      }
    } else if (diff < -swipeThreshold) {
      if (activeIndex > 0) {
        setActiveIndex((prev) => prev - 1);
      }
    }
  };

  // ── Determine which layout to show ──
  const showMobile = isMobile;
  const showDesktop = !isMobile;

  // ── SINGLE RETURN — both layouts are always in the tree ──
  return (
    <>
      {/* ═══════════ MOBILE LAYOUT ═══════════ */}
      <section
        ref={showMobile ? containerRef : undefined}
        id={showMobile ? 'casa-interactiva' : undefined}
        className={`relative w-full bg-[#0b0a08] select-none overflow-hidden ${
          showMobile ? 'block' : 'hidden'
        }`}
      >
        {/* Mobile Header: auto-cycling image slideshow */}
        <div className="relative h-[85vh] w-full overflow-hidden">
          {/* Background image crossfade */}
          <div className="absolute inset-0 z-0">
            {scrollySteps.map((step, idx) => (
              <div
                key={step.step}
                className="absolute inset-0 w-full h-full transition-opacity duration-[1500ms] ease-in-out"
                style={{
                  opacity: mobileFrameIndex === idx ? 0.5 : 0,
                  pointerEvents: 'none',
                }}
              >
                <Image
                  src={step.image}
                  alt={language === 'es' ? step.titleEs : step.titleEn}
                  fill
                  priority={idx === 0}
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            ))}
          </div>

          {/* Gradient Overlays */}
          <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-[#0b0a08]/40 via-transparent to-[#0b0a08]" />

          {/* Mobile Header Label */}
          <div className="absolute top-20 left-5 z-10 pointer-events-none">
            <span className="block text-[9px] font-extrabold uppercase tracking-[0.22em] text-[#c9a864]">
              {t('Editorial Walkthrough', 'Recorrido Editorial')}
            </span>
          </div>

          {/* Image cycle indicator */}
          <div className="absolute top-20 right-5 z-10 flex gap-1.5">
            {scrollySteps.map((_, idx) => (
              <div
                key={idx}
                className={`h-0.5 rounded-full transition-all duration-700 ${
                  mobileFrameIndex === idx ? 'w-5 bg-[#c9a864]' : 'w-1.5 bg-white/20'
                }`}
              />
            ))}
          </div>

          {/* Hero text overlay — pinned to bottom */}
          <div className="absolute bottom-0 inset-x-0 z-10 px-5 pb-8">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c9a864]/20 bg-[#0b0a08]/60 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.15em] text-[#c9a864] mb-4">
              <Sparkles size={10} />
              {t('Editorial Walkthrough', 'Recorrido Editorial')}
            </span>
            <h1 className="font-display text-[28px] font-bold leading-[1.08] text-[#f5f1e8] tracking-tight">
              {t('How we read a home.', 'Cómo leemos una casa.')}
            </h1>
            <p className="mt-3 text-[13px] text-[#b8b0a0] leading-relaxed max-w-[340px]">
              {t('A step-by-step evaluation of architectural heritage, spatial flow, and structural design.', 'Evaluación paso a paso del patrimonio arquitectónico, flujo espacial y diseño estructural.')}
            </p>
          </div>
        </div>

        {/* Steps — vertical list of value propositions (no touch-lock, natural scrolling) */}
        <div className="bg-[#0b0a08] px-5 py-10">
          <div className="flex flex-col gap-6">
            {scrollySteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="p-5 rounded-xl border border-[#c9a864]/10 bg-[#13110e] flex flex-col">
                  <div className="inline-flex items-center gap-2 bg-[#a26035]/20 border border-[#a26035]/40 text-[#c9a864] rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em] w-fit mb-3">
                    <Icon size={12} />
                    <span>
                      {t('Step', 'Paso')} {step.step} • {t(step.labelEn, step.labelEs)}
                    </span>
                  </div>
                  <h3 className="text-base font-display font-bold text-[#f5f1e8] leading-tight">
                    {t(step.titleEn, step.titleEs)}
                  </h3>
                  <p className="mt-2 text-xs text-[#b8b0a0] leading-relaxed border-l border-[#c9a864]/30 pl-3">
                    {t(step.textEn, step.textEs)}
                  </p>
                  <div className="mt-4 pt-3 border-t border-white/5">
                    <a
                      href={actionLink(step.intent)}
                      {...externalLinkProps(actionLink(step.intent))}
                      className={`btn w-full py-2.5 rounded-full ${
                        idx === 4 ? 'bg-[#c9a864] text-[#0b0a08]' : 'border border-white/20 text-[#f5f1e8] bg-white/5 hover:bg-white/10'
                      } text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5`}
                    >
                      {idx === 4 ? t('Receive initial route', 'Recibir ruta inicial') : t('Request this route', 'Pedir esta ruta')}
                      <MessageCircle size={13} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ DESKTOP LAYOUT ═══════════ */}
      <section
        ref={showDesktop ? containerRef : undefined}
        id={showDesktop ? 'casa-interactiva' : undefined}
        className={`relative bg-ro-dark text-ro-light ${
          showDesktop ? 'block h-[600vh]' : 'hidden'
        }`}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
          {/* Scrollytelling Header */}
          <header className="relative z-20 w-full px-6 py-6 md:px-12 flex justify-between items-center border-b border-white/5 bg-gradient-to-b from-ro-dark/80 to-transparent backdrop-blur-sm">
            <div>
              <span className="text-[9px] uppercase tracking-[0.3em] font-black text-[#c9a864] flex items-center gap-2">
                <Sparkles size={12} className="animate-pulse" /> 
                {t('Editorial Walkthrough', 'Recorrido Editorial')}
              </span>
              <h2 className="text-xl md:text-2xl font-display text-white mt-1">
                {t('How we read a home', 'Cómo leemos una casa')}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-widest opacity-40 font-mono">
                {t('Step by step', 'Paso a paso')}
              </span>
              <div className="text-[11px] font-sans font-bold uppercase tracking-[0.18em] text-white">
                {t('Texas Real Estate Concierge', 'Texas Real Estate Concierge')}
              </div>
            </div>
          </header>

          {/* Central tablet area */}
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
                  className="absolute inset-0 w-full h-full pointer-events-none"
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

              {/* Text and actions overlay */}
              <div className="absolute inset-x-0 bottom-0 z-20 p-6 md:p-12 flex flex-col md:flex-row justify-between items-end gap-6 pointer-events-none">
                <div className="max-w-xl w-full relative min-h-[220px] md:min-h-[170px]">
                  {scrollySteps.map((step, idx) => {
                    const Icon = step.icon;
                    const isActive = activeIndex === idx;
                    
                    return (
                      <motion.div
                        key={step.step}
                        style={{
                          opacity: isActive ? 1 : 0,
                          y: isActive ? 0 : 12,
                        }}
                        className={`absolute bottom-0 left-0 w-full text-left transition-all duration-300 ease-out ${
                          isActive ? 'pointer-events-auto z-10' : 'pointer-events-none invisible z-0'
                        }`}
                      >
                        <div className="max-w-xl space-y-4 rounded-2xl border border-white/12 bg-[#0b0a08]/82 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur-md md:p-6">
                          <div className="inline-flex items-center gap-3 rounded-full border border-[#c9a864]/30 bg-[#a26035]/90 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                            <Icon size={14} />
                            <span>
                              {t('Step', 'Paso')} {step.step} • {t(step.labelEn, step.labelEs)}
                            </span>
                          </div>
                          
                          <h3 className="text-3xl md:text-5xl font-display text-white leading-tight font-bold">
                            {t(step.titleEn, step.titleEs)}
                          </h3>
                          
                          <p className="text-xs md:text-sm leading-relaxed text-white/86 font-light max-w-lg border-l-2 border-[#c9a864] pl-4">
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
                          opacity: isActive ? 1 : 0,
                        }}
                        className={`transition-all duration-300 ease-out w-full md:w-auto ${
                          isActive ? 'relative pointer-events-auto' : 'absolute bottom-0 right-0 pointer-events-none invisible'
                        }`}
                      >
                        <a
                          href={actionLink(step.intent)}
                          {...externalLinkProps(actionLink(step.intent))}
                          className={`btn w-full md:w-auto ${
                            idx === 4 ? 'btn-copper bg-[#c9a864] text-[#0b0a08]' : 'btn-ghost border-white/25 text-white hover:bg-white/10'
                          } text-[11px] shadow-2xl flex items-center justify-center gap-2`}
                        >
                          {idx === 4 ? t('Receive initial route', 'Recibir ruta inicial') : t('Request this route', 'Pedir esta ruta')}
                          <MessageCircle size={16} />
                        </a>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Stepper progress indicator — using pre-computed hooks */}
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
                          scaleX: stepperScales[idx],
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
              Rangel <span className="font-black">Oviedo</span> Group © {new Date().getFullYear()} •{' '}
              {t('Quiet Luxury', 'Lujo Latino')}
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
    </>
  );
}

'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useScroll, useMotionValueEvent } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { Sparkles } from 'lucide-react';

const FRAME_COUNT = 90;

const HERO_MOBILE_FRAMES = [
  '/assets/seq01/mobile/frame_0001.webp',
  '/assets/seq01/mobile/frame_0030.webp',
  '/assets/seq01/mobile/frame_0055.webp',
  '/assets/seq01/mobile/frame_0072.webp',
  '/assets/seq01/mobile/frame_0090.webp',
];

export default function HeroScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState<(HTMLImageElement | null)[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useLanguage();

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    setIsClient(true);
    
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const actualIsMobile = window.matchMedia('(max-width: 768px)').matches;
    if (actualIsMobile) {
      // Preload only the 5 mobile keyframes
      HERO_MOBILE_FRAMES.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
      return () => {
        window.removeEventListener('resize', checkMobile);
      };
    }

    // Desktop initialization
    const initialImages = new Array(FRAME_COUNT).fill(null);
    setImages(initialImages);

    const getFrameUrl = (index: number) => {
      const pad = String(index + 1).padStart(4, '0');
      return `/assets/seq01/desktop/frame_${pad}.webp`;
    };

    const img0 = new Image();
    img0.src = getFrameUrl(0);
    img0.onload = () => {
      setImages((prev) => {
        const next = [...prev];
        next[0] = img0;
        return next;
      });
    };

    const preload = async () => {
      const promises3 = [];
      for (let i = 3; i < FRAME_COUNT; i += 3) {
        promises3.push(
          new Promise<void>((resolve) => {
            const img = new Image();
            img.src = getFrameUrl(i);
            img.onload = () => {
              setImages((prev) => {
                const next = [...prev];
                next[i] = img;
                return next;
              });
              resolve();
            };
            img.onerror = () => resolve();
          })
        );
      }
      await Promise.all(promises3);

      for (let i = 1; i < FRAME_COUNT; i++) {
        if (i % 3 === 0) continue;
        const img = new Image();
        img.src = getFrameUrl(i);
        img.onload = () => {
          setImages((prev) => {
            const next = [...prev];
            next[i] = img;
            return next;
          });
        };
      }
    };

    preload();

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const drawFrame = (index: number) => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let img = images[index];
    if (!img) {
      for (let i = index; i < FRAME_COUNT; i++) {
        if (images[i]) {
          img = images[i];
          break;
        }
      }
    }
    if (!img) {
      for (let i = index; i >= 0; i--) {
        if (images[i]) {
          img = images[i];
          break;
        }
      }
    }
    if (!img) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const canvasWidth = rect.width;
    const canvasHeight = rect.height;
    const imageRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let x = 0;
    let y = 0;

    if (imageRatio > canvasRatio) {
      drawHeight = canvasHeight;
      drawWidth = drawHeight * imageRatio;
      x = (canvasWidth - drawWidth) / 2;
    } else {
      drawWidth = canvasWidth;
      drawHeight = drawWidth / imageRatio;
      y = (canvasHeight - drawHeight) / 2;
    }

    ctx.fillStyle = '#0b0a08';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, x, y, drawWidth, drawHeight);
  };

  useEffect(() => {
    if (isMobile) return;
    const frameIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(progress * FRAME_COUNT)));
    drawFrame(frameIndex);
  }, [images, progress, isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const handleResize = () => {
      const frameIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(progress * FRAME_COUNT)));
      drawFrame(frameIndex);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images, progress, isMobile]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (isMobile) return;
    setProgress(latest);
    const frameIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(latest * FRAME_COUNT)));
    drawFrame(frameIndex);

    if (latest < 0.18) {
      setActiveStage(0);
    } else if (latest < 0.38) {
      setActiveStage(1);
    } else if (latest < 0.58) {
      setActiveStage(2);
    } else if (latest < 0.78) {
      setActiveStage(3);
    } else {
      setActiveStage(4);
    }
  });

  const getCardTransform = (stage: number) => {
    if (!isClient) {
      return stage === 0 ? 'translate(-50%, -50%) scale(1)' : 'translate(0, 28px) scale(0.982)';
    }

    let stageMin = 0;
    let stageMax = 1;
    if (stage === 1) { stageMin = 0.18; stageMax = 0.38; }
    else if (stage === 2) { stageMin = 0.38; stageMax = 0.58; }
    else if (stage === 3) { stageMin = 0.58; stageMax = 0.78; }
    else if (stage === 4) { stageMin = 0.78; stageMax = 1.0; }

    const localProgress = progress >= stageMin && progress <= stageMax
      ? (progress - stageMin) / (stageMax - stageMin)
      : 0.5;

    const yShift = (localProgress - 0.5) * -26;
    const xShift = (localProgress - 0.5) * 12;

    if (stage === 0) {
      const introProgress = progress <= 0.18 ? progress / 0.18 : 0.5;
      const introYShift = (introProgress - 0.5) * -26;
      const activeY = -50 + introYShift;
      const inactiveY = -50 + 26;
      const y = activeStage === 0 ? activeY : inactiveY;
      const scale = activeStage === 0 ? 1 : 0.985;
      return `translate(-50%, ${y}%) scale(${scale})`;
    }

    const x = activeStage === stage ? xShift : 0;
    const y = activeStage === stage ? yShift : 28;
    const scale = activeStage === stage ? 1 : 0.982;
    return `translate(${x}px, ${y}px) scale(${scale})`;
  };

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
      if (activeStage < 4) {
        setActiveStage((prev) => prev + 1);
      }
    } else if (diff < -swipeThreshold) {
      if (activeStage > 0) {
        setActiveStage((prev) => prev - 1);
      }
    }
  };

  const showMobile = isClient && isMobile;
  const showDesktop = !isClient || !isMobile;

  return (
    <>
      {/* ═══════════ MOBILE LAYOUT ═══════════ */}
      <section
        ref={showMobile ? containerRef : undefined}
        id={showMobile ? 'hero-scrolly' : undefined}
        className={`relative w-full bg-[#0b0a08] select-none overflow-hidden touch-none ${
          showMobile ? 'block h-[100dvh]' : 'hidden'
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Mobile Background Frames with hardware-accelerated crossfade */}
        <div className="absolute inset-0 z-0">
          {HERO_MOBILE_FRAMES.map((src, index) => (
            <img
              key={src}
              src={src}
              alt=""
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
                activeStage === index ? 'opacity-40' : 'opacity-0'
              }`}
              style={{ pointerEvents: 'none' }}
            />
          ))}
        </div>

        {/* Mobile Overlays */}
        <div className="absolute inset-0 z-1 pointer-events-none bg-gradient-to-b from-[#0b0a08]/50 via-transparent to-[#0b0a08]/85" />

        {/* Brand / Sequence Label */}
        <div className="absolute top-20 left-6 z-10 text-white pointer-events-none">
          <span className="block text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#c9a864]">
            Rangel Oviedo Group
          </span>
          <span className="block font-display text-base italic text-[#f5f1e8] mt-0.5">
            {t('Texas Luxury Estates', 'Bienes Raíces de Lujo en Texas')}
          </span>
        </div>

        {/* Swipe Card Area */}
        <div className="absolute inset-x-4 bottom-12 z-10 flex flex-col items-center">
          
          <div className="relative w-full min-h-[230px] flex items-center justify-center">
            
            {/* Stage 0: Intro */}
            <div
              className={`w-full flex flex-col items-center text-center transition-all duration-500 transform ${
                activeStage === 0
                  ? 'opacity-100 translate-x-0 scale-100 pointer-events-auto'
                  : activeStage < 0
                  ? 'opacity-0 -translate-x-full scale-95 pointer-events-none absolute'
                  : 'opacity-0 translate-x-full scale-95 pointer-events-none absolute'
              }`}
            >
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c9a864]/20 bg-[#13110e] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-[#c9a864] mb-3">
                <Sparkles size={11} />
                {t('A bilingual luxury real estate boutique', 'Boutique bilingüe de bienes raíces de lujo')}
              </span>
              <h1 className="font-display text-2xl font-bold leading-tight text-[#f5f1e8] tracking-tight px-1">
                {t('Where Texas estates find their next chapter.', 'Donde las estancias de Texas encuentran su próximo capítulo.')}
              </h1>
              <p className="mt-2 text-xs text-[#b8b0a0] leading-relaxed max-w-[320px] px-1">
                {t('Trusted to handle the homes most agents never see across Texas, Mexico, and LATAM.', 'Confianza para manejar propiedades que la mayoría de los agentes nunca ve entre Texas, México y LATAM.')}
              </p>
              <div className="mt-4 flex flex-row gap-3 w-full max-w-[300px] px-1 justify-center">
                <a href="#contacto" className="flex-1 bg-[#c9a864] text-[#0b0a08] py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-[#ebd095] text-center">
                  {t('Qualify your brief', 'Calificar tu perfil')}
                </a>
                <a href="#contacto" className="flex-1 border border-[#c9a864]/30 bg-[#0b0a08]/40 text-[#f5f1e8] py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-center">
                  {t('Private consultation', 'Consulta privada')}
                </a>
              </div>
            </div>

            {/* Stage 1: Access */}
            <article
              className={`w-full flex flex-col p-6 border border-[#c9a864]/20 bg-[#13110e] rounded-xl shadow-xl transition-all duration-500 transform ${
                activeStage === 1
                  ? 'opacity-100 translate-x-0 scale-100 pointer-events-auto'
                  : activeStage < 1
                  ? 'opacity-0 -translate-x-full scale-95 pointer-events-none absolute'
                  : 'opacity-0 translate-x-full scale-95 pointer-events-none absolute'
              }`}
            >
              <span className="text-[#c9a864] text-[10px] font-bold font-display tracking-[0.2em]">01</span>
              <div className="h-[1px] w-8 bg-gradient-to-r from-[#c9a864] to-transparent my-2.5" />
              <h2 className="font-display text-lg font-bold text-[#f5f1e8] leading-tight">
                {t('Unmatched market access', 'Acceso de mercado sin par')}
              </h2>
              <p className="mt-2 text-xs text-[#b8b0a0] leading-relaxed">
                {t('Off-market listings powered by a decade of trusted relationships across Texas, Mexico and Latin America.', 'Propiedades off-market gracias a una década de relaciones de confianza en Texas, México y Latinoamérica.')}
              </p>
            </article>

            {/* Stage 2: Negotiation */}
            <article
              className={`w-full flex flex-col p-6 border border-[#c9a864]/20 bg-[#13110e] rounded-xl shadow-xl transition-all duration-500 transform ${
                activeStage === 2
                  ? 'opacity-100 translate-x-0 scale-100 pointer-events-auto'
                  : activeStage < 2
                  ? 'opacity-0 -translate-x-full scale-95 pointer-events-none absolute'
                  : 'opacity-0 translate-x-full scale-95 pointer-events-none absolute'
              }`}
            >
              <span className="text-[#c9a864] text-[10px] font-bold font-display tracking-[0.2em]">02</span>
              <div className="h-[1px] w-8 bg-gradient-to-r from-[#c9a864] to-transparent my-2.5" />
              <h2 className="font-display text-lg font-bold text-[#f5f1e8] leading-tight">
                {t('Negotiation as a craft', 'Negociación de oficio')}
              </h2>
              <p className="mt-2 text-xs text-[#b8b0a0] leading-relaxed">
                {t('4.2% average closing above asking on listings sold, 6.1% below on buys closed. Numbers that come from preparation, not pressure.', '4.2% sobre asking en propiedades vendidas. 6.1% bajo en compras cerradas. Números que vienen de la preparación, no de la presión.')}
              </p>
            </article>

            {/* Stage 3: Network */}
            <article
              className={`w-full flex flex-col p-6 border border-[#c9a864]/20 bg-[#13110e] rounded-xl shadow-xl transition-all duration-500 transform ${
                activeStage === 3
                  ? 'opacity-100 translate-x-0 scale-100 pointer-events-auto'
                  : activeStage < 3
                  ? 'opacity-0 -translate-x-full scale-95 pointer-events-none absolute'
                  : 'opacity-0 translate-x-full scale-95 pointer-events-none absolute'
              }`}
            >
              <span className="text-[#c9a864] text-[10px] font-bold font-display tracking-[0.2em]">03</span>
              <div className="h-[1px] w-8 bg-gradient-to-r from-[#c9a864] to-transparent my-2.5" />
              <h2 className="font-display text-lg font-bold text-[#f5f1e8] leading-tight">
                {t('Global network, local intuition', 'Red global, intuición local')}
              </h2>
              <p className="mt-2 text-xs text-[#b8b0a0] leading-relaxed">
                {t('Native bilingual EN/ES service bridging Texas with HNW buyers from Mexico, Argentina, Uruguay and the broader region.', 'Servicio bilingüe nativo EN/ES que conecta Texas con compradores HNW de México, Argentina, Uruguay y la región.')}
              </p>
            </article>

            {/* Stage 4: Concierge */}
            <article
              className={`w-full flex flex-col p-6 border border-[#c9a864]/20 bg-[#13110e] rounded-xl shadow-xl transition-all duration-500 transform ${
                activeStage === 4
                  ? 'opacity-100 translate-x-0 scale-100 pointer-events-auto'
                  : activeStage < 4
                  ? 'opacity-0 -translate-x-full scale-95 pointer-events-none absolute'
                  : 'opacity-0 translate-x-full scale-95 pointer-events-none absolute'
              }`}
            >
              <span className="text-[#c9a864] text-[10px] font-bold font-display tracking-[0.2em]">04</span>
              <div className="h-[1px] w-8 bg-gradient-to-r from-[#c9a864] to-transparent my-2.5" />
              <h2 className="font-display text-lg font-bold text-[#f5f1e8] leading-tight">
                {t('Concierge from listing to keys', 'Concierge de listing a llaves')}
              </h2>
              <p className="mt-2 text-xs text-[#b8b0a0] leading-relaxed">
                {t('Staging, photo/video, legal coordination, mortgage strategy, relocation support — handled end to end so the only decision you face is which home is yours.', 'Staging, producción de foto y video, coordinación legal, estrategia hipotecaria, soporte de mudanza — gestionados de punta a punta para que la única decisión sea qué casa es la tuya.')}
              </p>
            </article>

          </div>

          {/* Dots Indicator */}
          <div className="mt-5 flex gap-2">
            {HERO_MOBILE_FRAMES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStage(idx)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  activeStage === idx ? 'w-5 bg-[#c9a864]' : 'w-1.5 bg-white/20'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════ DESKTOP LAYOUT ═══════════ */}
    <section
      ref={showDesktop ? containerRef : undefined}
      id={showDesktop ? 'hero-scrolly' : undefined}
      className={`relative min-h-[2800px] bg-[#0b0a08] select-none ${
        showDesktop ? 'block h-[500vh]' : 'hidden'
      }`}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0b0a08] z-0">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0" />
        
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 z-1 pointer-events-none bg-[radial-gradient(circle_at_50%_44%,transparent_0%,rgba(11,10,8,0.12)_64%,rgba(11,10,8,0.7)_100%)]" />
        <div className="absolute inset-0 z-1 pointer-events-none bg-gradient-to-r from-[#0b0a08]/72 via-transparent to-[#0b0a08]/68" />
        <div className="absolute inset-0 z-1 pointer-events-none bg-gradient-to-b from-[#0b0a08]/36 via-transparent to-[#0b0a08]/56" />
        <div className="absolute inset-0 z-2 pointer-events-none shadow-[inset_0_0_0_1px_rgba(245,241,232,0.04),inset_0_-18vh_26vh_rgba(0,0,0,0.52)]" />

        {/* Brand/Sequence Label */}
        <div className="absolute top-24 left-6 md:left-12 z-10 text-white pointer-events-none">
          <span className="block text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#c9a864]">
            Rangel Oviedo Group
          </span>
          <span className="block font-display text-lg italic text-[#f5f1e8] mt-1">
            {t('Texas Luxury Estates', 'Bienes Raíces de Lujo en Texas')}
          </span>
        </div>

        {/* Panels */}
        <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
          
          {/* Stage 0: Intro */}
          <div 
            className={`absolute flex flex-col items-center text-center max-w-[760px] transition-all duration-700 ease-out pointer-events-auto
              top-1/2 left-1/2
              ${activeStage === 0 ? 'opacity-100 blur-0' : 'opacity-0 blur-sm pointer-events-none'}`}
            style={{ transform: getCardTransform(0) }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c9a864]/25 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#c9a864] mb-6 backdrop-blur-md">
              <Sparkles size={13} />
              {t('A bilingual luxury real estate boutique', 'Boutique bilingüe de bienes raíces de lujo')}
            </span>
            <h1 className="font-display text-4xl md:text-7xl font-extrabold leading-[1.02] text-[#f5f1e8] tracking-tight">
              {t('Where Texas estates find their next chapter.', 'Donde las estancias de Texas encuentran su próximo capítulo.')}
            </h1>
            <p className="mt-6 text-sm md:text-xl text-[#b8b0a0] leading-relaxed max-w-[620px]">
              {t('Trusted to handle the homes most agents never see across Texas, Mexico, and LATAM.', 'Confianza para manejar propiedades que la mayoría de los agentes nunca ve entre Texas, México y LATAM.')}
            </p>
            <div className="mt-8 flex flex-col md:flex-row justify-center gap-4 w-full md:w-auto px-4 md:px-0">
              <a href="#contacto" className="bg-[#c9a864] text-[#0b0a08] px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#ebd095] hover:-translate-y-0.5 transition-all text-center">
                {t('Qualify your brief', 'Calificar tu perfil')}
              </a>
              <a href="#contacto" className="border border-[#c9a864]/30 bg-[#0b0a08]/20 backdrop-blur-md text-[#f5f1e8] px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider hover:border-[#c9a864] hover:-translate-y-0.5 transition-all text-center">
                {t('Private consultation', 'Consulta privada')}
              </a>
            </div>
          </div>

          {/* Stage 1: Access */}
          <article 
            className={`absolute flex flex-col p-8 md:p-10 border border-[#c9a864]/25 bg-[#1a1612]/74 backdrop-blur-xl shadow-2xl rounded-2xl max-w-[420px] transition-all duration-700 ease-out pointer-events-auto
              top-1/2 left-1/2 md:top-[15%] md:right-[8%] md:left-auto
              ${activeStage === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            style={{ transform: getCardTransform(1) }}
          >
            <span className="text-[#c9a864] text-xs font-bold font-display tracking-[0.2em]">01</span>
            <div className="h-[1px] w-12 bg-gradient-to-r from-[#c9a864] to-transparent my-4" />
            <h2 className="font-display text-2xl font-bold text-[#f5f1e8] leading-tight">
              {t('Unmatched market access', 'Acceso de mercado sin par')}
            </h2>
            <p className="mt-3 text-sm text-[#b8b0a0] leading-relaxed">
              {t('Off-market listings powered by a decade of trusted relationships across Texas, Mexico and Latin America.', 'Propiedades off-market gracias a una década de relaciones de confianza en Texas, México y Latinoamérica.')}
            </p>
          </article>

          {/* Stage 2: Negotiation */}
          <article 
            className={`absolute flex flex-col p-8 md:p-10 border border-[#c9a864]/25 bg-[#1a1612]/74 backdrop-blur-xl shadow-2xl rounded-2xl max-w-[420px] transition-all duration-700 ease-out pointer-events-auto
              top-1/2 left-1/2 md:bottom-[15%] md:left-[8%] md:right-auto
              ${activeStage === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            style={{ transform: getCardTransform(2) }}
          >
            <span className="text-[#c9a864] text-xs font-bold font-display tracking-[0.2em]">02</span>
            <div className="h-[1px] w-12 bg-gradient-to-r from-[#c9a864] to-transparent my-4" />
            <h2 className="font-display text-2xl font-bold text-[#f5f1e8] leading-tight">
              {t('Negotiation as a craft', 'Negociación de oficio')}
            </h2>
            <p className="mt-3 text-sm text-[#b8b0a0] leading-relaxed">
              {t('4.2% average closing above asking on listings sold, 6.1% below on buys closed. Numbers that come from preparation, not pressure.', '4.2% sobre asking en propiedades vendidas. 6.1% bajo en compras cerradas. Números que vienen de la preparación, no de la presión.')}
            </p>
          </article>

          {/* Stage 3: Network */}
          <article 
            className={`absolute flex flex-col p-8 md:p-10 border border-[#c9a864]/25 bg-[#1a1612]/74 backdrop-blur-xl shadow-2xl rounded-2xl max-w-[420px] transition-all duration-700 ease-out pointer-events-auto
              top-1/2 left-1/2 md:top-[15%] md:left-[8%] md:right-auto
              ${activeStage === 3 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            style={{ transform: getCardTransform(3) }}
          >
            <span className="text-[#c9a864] text-xs font-bold font-display tracking-[0.2em]">03</span>
            <div className="h-[1px] w-12 bg-gradient-to-r from-[#c9a864] to-transparent my-4" />
            <h2 className="font-display text-2xl font-bold text-[#f5f1e8] leading-tight">
              {t('Global network, local intuition', 'Red global, intuición local')}
            </h2>
            <p className="mt-3 text-sm text-[#b8b0a0] leading-relaxed">
              {t('Native bilingual EN/ES service bridging Texas with HNW buyers from Mexico, Argentina, Uruguay and the broader region.', 'Servicio bilingüe nativo EN/ES que conecta Texas con compradores HNW de México, Argentina, Uruguay y la región.')}
            </p>
          </article>

          {/* Stage 4: Concierge */}
          <article 
            className={`absolute flex flex-col p-8 md:p-10 border border-[#c9a864]/25 bg-[#1a1612]/74 backdrop-blur-xl shadow-2xl rounded-2xl max-w-[420px] transition-all duration-700 ease-out pointer-events-auto
              top-1/2 left-1/2 md:bottom-[15%] md:right-[8%] md:left-auto
              ${activeStage === 4 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            style={{ transform: getCardTransform(4) }}
          >
            <span className="text-[#c9a864] text-xs font-bold font-display tracking-[0.2em]">04</span>
            <div className="h-[1px] w-12 bg-gradient-to-r from-[#c9a864] to-transparent my-4" />
            <h2 className="font-display text-2xl font-bold text-[#f5f1e8] leading-tight">
              {t('Concierge from listing to keys', 'Concierge de listing a llaves')}
            </h2>
            <p className="mt-3 text-sm text-[#b8b0a0] leading-relaxed">
              {t('Staging, photo/video, legal coordination, mortgage strategy, relocation support — handled end to end so the only decision you face is which home is yours.', 'Staging, producción de foto y video, coordinación legal, estrategia hipotecaria, soporte de mudanza — gestionados de punta a punta para que la única decisión sea qué casa es la tuya.')}
            </p>
          </article>

        </div>

        {/* Scroll Progress Meter */}
        <div className="absolute bottom-10 left-6 right-6 md:left-auto md:right-12 z-20 w-auto md:w-64 h-[2px] bg-[#f5f1e8]/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#c9a864] to-[#f0d99a] transition-all duration-75 shadow-[0_0_10px_rgba(201,168,100,0.5)]"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </section>
    </>
  );
}

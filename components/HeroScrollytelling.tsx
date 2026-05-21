'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { Sparkles } from 'lucide-react';

const FRAME_COUNT = 90;
const MOBILE_SEQUENCE_FPS = 15;

const HERO_MOBILE_SEQUENCE = Array.from({ length: 45 }, (_, i) => {
  const frameNum = Math.min(90, Math.max(1, Math.round((i / 44) * 89) + 1));
  const pad = String(frameNum).padStart(4, '0');
  return `/assets/seq01/mobile/frame_${pad}.webp`;
});

export default function HeroScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mobileCanvasRef = useRef<HTMLCanvasElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState<(HTMLImageElement | null)[]>(
    () => new Array(FRAME_COUNT).fill(null)
  );
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useLanguage();

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const mobileImagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const mobileFrameRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    window.queueMicrotask(() => {
      setIsClient(true);
      checkMobile();
    });
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (!isClient || isMobile) return;

    let cancelled = false;
    const getFrameUrl = (index: number) => {
      const pad = String(index + 1).padStart(4, '0');
      return `/assets/seq01/desktop/frame_${pad}.webp`;
    };

    const img0 = new Image();
    img0.src = getFrameUrl(0);
    img0.onload = () => {
      if (cancelled) return;
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
              if (cancelled) {
                resolve();
                return;
              }
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
          if (cancelled) return;
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
      cancelled = true;
    };
  }, [isClient, isMobile]);

  useEffect(() => {
    if (!isClient || !isMobile) return;

    const canvas = mobileCanvasRef.current;
    if (!canvas) return;

    let animationFrame: number | null = null;
    let lastFrameTime = 0;
    let isVisible = true;
    let isPageVisible = document.visibilityState === 'visible';
    let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cancelled = false;
    const frameDuration = 1000 / MOBILE_SEQUENCE_FPS;

    const drawCoverFrame = (img: HTMLImageElement) => {
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetWidth = Math.round(rect.width * dpr);
      const targetHeight = Math.round(rect.height * dpr);
      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }
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

    const findLoadedFrame = (index: number) => {
      const frames = mobileImagesRef.current;
      let img = frames[index];
      if (img) return img;

      for (let offset = 1; offset < frames.length; offset++) {
        const next = frames[(index + offset) % frames.length];
        if (next) return next;
        const previous = frames[(index - offset + frames.length) % frames.length];
        if (previous) return previous;
      }

      return null;
    };

    const drawMobileFrame = (index: number) => {
      const img = findLoadedFrame(index);
      if (img) drawCoverFrame(img);
    };

    const tick = (time: number) => {
      if (cancelled) return;

      if (!reducedMotion && isVisible && isPageVisible && time - lastFrameTime >= frameDuration) {
        mobileFrameRef.current = (mobileFrameRef.current + 1) % HERO_MOBILE_SEQUENCE.length;
        drawMobileFrame(mobileFrameRef.current);
        lastFrameTime = time;
      }

      animationFrame = window.requestAnimationFrame(tick);
    };

    mobileImagesRef.current = new Array(HERO_MOBILE_SEQUENCE.length).fill(null);

    const firstFrame = new Image();
    firstFrame.decoding = 'async';
    firstFrame.src = HERO_MOBILE_SEQUENCE[0];
    firstFrame.onload = () => {
      if (cancelled) return;
      mobileImagesRef.current[0] = firstFrame;
      drawCoverFrame(firstFrame);
    };

    HERO_MOBILE_SEQUENCE.slice(1).forEach((src, offset) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = src;
      img.onload = () => {
        if (cancelled) return;
        mobileImagesRef.current[offset + 1] = img;
      };
    });

    const handleResize = () => {
      drawMobileFrame(mobileFrameRef.current);
    };
    const handleVisibilityChange = () => {
      isPageVisible = document.visibilityState === 'visible';
      if (isPageVisible) drawMobileFrame(mobileFrameRef.current);
    };
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      drawMobileFrame(mobileFrameRef.current);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) drawMobileFrame(mobileFrameRef.current);
      },
      { threshold: 0.1 }
    );

    observer.observe(canvas);
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    motionQuery.addEventListener('change', handleReducedMotionChange);
    animationFrame = window.requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      motionQuery.removeEventListener('change', handleReducedMotionChange);
    };
  }, [isClient, isMobile]);

  const drawFrame = useCallback((index: number) => {
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
  }, [images, isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const frameIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(progress * FRAME_COUNT)));
    drawFrame(frameIndex);
  }, [drawFrame, progress, isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const handleResize = () => {
      const frameIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(progress * FRAME_COUNT)));
      drawFrame(frameIndex);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame, progress, isMobile]);

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
        className={`relative w-full bg-[#0b0a08] select-none overflow-hidden ${
          showMobile ? 'block' : 'hidden'
        }`}
      >
        {/* ── Hero header: auto-cycling image sequence ── */}
        <div className="relative h-[85vh] w-full overflow-hidden">
          {/* Background image cycle (video-like) */}
          <canvas
            ref={mobileCanvasRef}
            aria-hidden="true"
            className="absolute inset-0 z-0 h-full w-full"
            style={{ opacity: 0.5 }}
          />

          {/* Gradient overlays */}
          <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-[#0b0a08]/40 via-transparent to-[#0b0a08]" />

          {/* Brand label */}
          {/* Hero content overlay — pinned to bottom */}
          <div className="absolute bottom-0 inset-x-0 z-10 px-5 pb-8">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c9a864]/20 bg-[#0b0a08]/60 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.15em] text-[#c9a864] mb-4">
              <Sparkles size={10} />
              {t('Private Texas market context', 'Lectura privada de mercado en Texas')}
            </span>
            <h1 className="font-display text-[28px] font-bold leading-[1.08] text-[#f5f1e8] tracking-tight">
              {t('Texas is easier to decide with private market context.', 'Texas se decide mejor con lectura privada.')}
            </h1>
            <p className="mt-3 text-[13px] text-[#b8b0a0] leading-relaxed max-w-[340px]">
              {t('Receive context on market, off-market, and timing before turning a property into a capital decision.', 'Recibe contexto sobre mercado, off-market y timing antes de convertir una propiedad en una decisión de capital.')}
            </p>
            <div className="mt-5 flex gap-3">
              <a href="#contacto" className="flex-1 bg-[#c9a864] text-[#0b0a08] py-3 rounded-full text-[10px] font-bold uppercase tracking-wider text-center">
                {t('Get Q3 Insider Report', 'Recibir Insider Report Q3')}
              </a>
              <a href="#contacto" className="flex-1 border border-[#c9a864]/30 bg-[#0b0a08]/40 text-[#f5f1e8] py-3 rounded-full text-[10px] font-bold uppercase tracking-wider text-center">
                {t('Private consultation', 'Consulta privada')}
              </a>
            </div>
          </div>
        </div>

        {/* ── Value propositions — compact vertical list ── */}
        <div className="bg-[#0b0a08] px-5 py-10">
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                num: '01',
                titleEn: 'Market access',
                titleEs: 'Acceso de mercado',
                textEn: 'Off-market listings across Texas, Mexico and LATAM.',
                textEs: 'Propiedades off-market en Texas, México y LATAM.',
              },
              {
                num: '02',
                titleEn: 'Negotiation craft',
                titleEs: 'Negociación de oficio',
                textEn: '4.2% above asking on sales, 6.1% below on buys.',
                textEs: '4.2% sobre asking en ventas, 6.1% bajo en compras.',
              },
              {
                num: '03',
                titleEn: 'Global network',
                titleEs: 'Red global',
                textEn: 'Native bilingual EN/ES bridging Texas with HNW buyers.',
                textEs: 'Bilingüe nativo EN/ES conectando Texas con compradores HNW.',
              },
              {
                num: '04',
                titleEn: 'Full concierge',
                titleEs: 'Concierge total',
                textEn: 'Staging, legal, mortgage and relocation — end to end.',
                textEs: 'Staging, legal, hipoteca y mudanza — de punta a punta.',
              },
            ].map((item) => (
              <div key={item.num} className="p-4 rounded-xl border border-[#c9a864]/10 bg-[#13110e]">
                <span className="text-[#c9a864] text-[9px] font-bold tracking-[0.2em]">{item.num}</span>
                <h3 className="mt-1.5 text-[13px] font-display font-bold text-[#f5f1e8] leading-tight">
                  {t(item.titleEn, item.titleEs)}
                </h3>
                <p className="mt-1.5 text-[10px] text-[#b8b0a0] leading-relaxed">
                  {t(item.textEn, item.textEs)}
                </p>
              </div>
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
        <div className="hidden">
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
              {t('Private Texas market context', 'Lectura privada de mercado en Texas')}
            </span>
            <h1 className="font-display text-4xl md:text-7xl font-extrabold leading-[1.02] text-[#f5f1e8] tracking-tight">
              {t('Texas is easier to decide with private market context.', 'Texas se decide mejor con lectura privada.')}
            </h1>
            <p className="mt-6 text-sm md:text-xl text-[#b8b0a0] leading-relaxed max-w-[620px]">
              {t('Receive context on market, off-market, and timing before turning a property into a capital decision.', 'Recibe contexto sobre mercado, off-market y timing antes de convertir una propiedad en una decisión de capital.')}
            </p>
            <div className="mt-8 flex flex-col md:flex-row justify-center gap-4 w-full md:w-auto px-4 md:px-0">
              <a href="#contacto" className="bg-[#c9a864] text-[#0b0a08] px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#ebd095] hover:-translate-y-0.5 transition-all text-center">
                {t('Get Q3 Insider Report', 'Recibir Insider Report Q3')}
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

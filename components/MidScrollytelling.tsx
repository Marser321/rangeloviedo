'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { Map } from 'lucide-react';

const FRAME_COUNT = 90;
const MOBILE_SEQUENCE_FPS = 15;

const MID_MOBILE_SEQUENCE = Array.from({ length: 45 }, (_, i) => {
  const frameNum = Math.min(90, Math.max(1, Math.round((i / 44) * 89) + 1));
  const pad = String(frameNum).padStart(4, '0');
  return `/assets/seq02/mobile/frame_${pad}.webp`;
});

export default function MidScrollytelling() {
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
      return `/assets/seq02/desktop/frame_${pad}.webp`;
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

    // Connection-aware: on Save-Data or slow links, show a static poster
    // (first frame only) instead of streaming ~45 frames.
    const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const lowData = !!conn && (conn.saveData === true || /(^|-)2g$/.test(conn.effectiveType ?? ''));

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

      if (!reducedMotion && !lowData && isVisible && isPageVisible && time - lastFrameTime >= frameDuration) {
        mobileFrameRef.current = (mobileFrameRef.current + 1) % MID_MOBILE_SEQUENCE.length;
        drawMobileFrame(mobileFrameRef.current);
        lastFrameTime = time;
      }

      animationFrame = window.requestAnimationFrame(tick);
    };

    mobileImagesRef.current = new Array(MID_MOBILE_SEQUENCE.length).fill(null);

    const firstFrame = new Image();
    firstFrame.decoding = 'async';
    firstFrame.src = MID_MOBILE_SEQUENCE[0];
    firstFrame.onload = () => {
      if (cancelled) return;
      mobileImagesRef.current[0] = firstFrame;
      drawCoverFrame(firstFrame);
    };

    if (!lowData) {
      MID_MOBILE_SEQUENCE.slice(1).forEach((src, offset) => {
        const img = new Image();
        img.decoding = 'async';
        img.src = src;
        img.onload = () => {
          if (cancelled) return;
          mobileImagesRef.current[offset + 1] = img;
        };
      });
    }

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

    if (latest < 0.25) {
      setActiveStage(0);
    } else if (latest < 0.5) {
      setActiveStage(1);
    } else if (latest < 0.75) {
      setActiveStage(2);
    } else {
      setActiveStage(3);
    }
  });

  const getCardTransform = (stage: number) => {
    if (!isClient) {
      return stage === 0 ? 'translate(-50%, -50%) scale(1)' : 'translate(0, 28px) scale(0.982)';
    }

    let stageMin = 0;
    let stageMax = 1;
    if (stage === 1) { stageMin = 0.25; stageMax = 0.5; }
    else if (stage === 2) { stageMin = 0.5; stageMax = 0.75; }
    else if (stage === 3) { stageMin = 0.75; stageMax = 1.0; }

    const localProgress = progress >= stageMin && progress <= stageMax
      ? (progress - stageMin) / (stageMax - stageMin)
      : 0.5;

    const yShift = (localProgress - 0.5) * -20;
    const xShift = (localProgress - 0.5) * 10;

    if (stage === 0) {
      const introProgress = progress <= 0.25 ? progress / 0.25 : 0.5;
      const introYShift = (introProgress - 0.5) * -20;
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
      if (activeStage < 3) {
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
        id={showMobile ? 'mercado' : undefined}
        className={`relative w-full bg-[#0b0a08] select-none overflow-hidden ${
          showMobile ? 'block' : 'hidden'
        }`}
      >
        {/* Auto-cycling background (video-like) */}
        <canvas
          ref={mobileCanvasRef}
          aria-hidden="true"
          className="absolute inset-0 z-0 h-full w-full"
          style={{ opacity: 0.46 }}
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-[#0b0a08]/66 via-[#0b0a08]/28 to-[#0b0a08]/72" />

        {/* Content */}
        <div className="relative z-10 px-5 py-16">

          {/* Section Header */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c9a864]/20 bg-[#13110e] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#c9a864] mb-4">
              <Map size={11} />
              {t('Market Intelligence', 'Inteligencia de Mercado')}
            </span>
            <h2 className="font-display text-[22px] font-bold leading-tight text-[#f5f1e8] tracking-tight px-2">
              {t('Price is only one layer.', 'El precio es solo una capa.')}
            </h2>
            <p className="mt-3 text-xs text-[#b8b0a0] leading-relaxed max-w-[320px] mx-auto">
              {t('The Insider Report organizes market, scarcity, tax context, and timing before you look at properties.', 'El Insider Report ordena mercado, escasez, fiscalidad y timing antes de mirar propiedades.')}
            </p>
          </div>

          {/* 2×2 Stat Card Grid */}
          <div className="grid grid-cols-2 gap-3">

            {/* Card 1 — Supply Lock */}
            <article className="flex flex-col p-4 rounded-xl border border-[#c9a864]/28 bg-[#1a1612]/38 backdrop-blur-[1px] shadow-[0_18px_44px_rgba(0,0,0,0.24)]">
              <span className="text-[#c9a864] text-[9px] font-bold font-display tracking-[0.18em] uppercase">
                {t('01 · Supply Lock', '01 · Oferta Limitada')}
              </span>
              <div className="h-[1px] w-6 bg-gradient-to-r from-[#c9a864] to-transparent my-2" />
              <h3 className="font-display text-sm font-bold text-[#f5f1e8] leading-snug">
                {t('Structural Under-Supply', 'Sub-oferta Estructural')}
              </h3>
              <p className="mt-1.5 text-[11px] text-[#b8b0a0] leading-relaxed">
                {t('Bilingual residential enclaves, elite school districts (Memorial, The Woodlands), and high-yielding corporate relocation hubs that offer secure exits.', 'Enclaves residenciales bilingües, distritos escolares de élite (Memorial, The Woodlands) y polos de relocalización corporativa de alto rendimiento que ofrecen salidas seguras.')}
              </p>
            </article>

            {/* Card 2 — Terrain Advantage */}
            <article className="flex flex-col p-4 rounded-xl border border-[#c9a864]/28 bg-[#1a1612]/38 backdrop-blur-[1px] shadow-[0_18px_44px_rgba(0,0,0,0.24)]">
              <span className="text-[#c9a864] text-[9px] font-bold font-display tracking-[0.18em] uppercase">
                {t('02 · Terrain Advantage', '02 · Ventaja Geográfica')}
              </span>
              <div className="h-[1px] w-6 bg-gradient-to-r from-[#c9a864] to-transparent my-2" />
              <h3 className="font-display text-sm font-bold text-[#f5f1e8] leading-snug">
                {t('Terrain-Locked Equity', 'Plusvalía Geográfica')}
              </h3>
              <p className="mt-1.5 text-[11px] text-[#b8b0a0] leading-relaxed">
                {t('Rugged topography and strict environmental zoning limit available buildable land, creating locked-in equity premium for modern architectural properties.', 'La topografía accidentada y regulaciones estrictas limitan la tierra urbanizable, garantizando plusvalía a largo plazo para propiedades de diseño moderno.')}
              </p>
            </article>

            {/* Card 3 — Tax Efficiency */}
            <article className="flex flex-col p-4 rounded-xl border border-[#c9a864]/28 bg-[#1a1612]/38 backdrop-blur-[1px] shadow-[0_18px_44px_rgba(0,0,0,0.24)]">
              <span className="text-[#c9a864] text-[9px] font-bold font-display tracking-[0.18em] uppercase">
                {t('03 · Tax Efficiency', '03 · Eficiencia Tributaria')}
              </span>
              <div className="h-[1px] w-6 bg-gradient-to-r from-[#c9a864] to-transparent my-2" />
              <h3 className="font-display text-sm font-bold text-[#f5f1e8] leading-snug">
                {t('Fiscal Optimization', 'Optimización Fiscal')}
              </h3>
              <p className="mt-1.5 text-[11px] text-[#b8b0a0] leading-relaxed">
                {t('High property taxes are offset and amortized by the absolute absence of state income tax for business owners, enabling compound capital growth.', 'El alto impuesto predial se ve compensado y amortizado por la ausencia absoluta de impuesto estatal sobre la renta para dueños de negocios.')}
              </p>
            </article>

            {/* Card 4 — Macro Thesis */}
            <article className="flex flex-col p-4 rounded-xl border border-[#c9a864]/28 bg-[#1a1612]/38 backdrop-blur-[1px] shadow-[0_18px_44px_rgba(0,0,0,0.24)]">
              <span className="text-[#c9a864] text-[9px] font-bold font-display tracking-[0.18em] uppercase">
                {t('Macro Thesis', 'Tesis Macro')}
              </span>
              <div className="h-[1px] w-6 bg-gradient-to-r from-[#c9a864] to-transparent my-2" />
              <h3 className="font-display text-sm font-bold text-[#f5f1e8] leading-snug">
                {t('Industrial Capital & Family Legacy', 'Capital Industrial y Legado Familiar')}
              </h3>
              <p className="mt-1.5 text-[11px] text-[#b8b0a0] leading-relaxed">
                {t('Texas combines zero state income tax, Fortune 500 migration corridors, and terrain-driven scarcity into a single compounding thesis.', 'Texas combina cero impuesto estatal sobre la renta, corredores de migración Fortune 500 y escasez geográfica en una sola tesis de capitalización.')}
              </p>
            </article>

          </div>
        </div>
      </section>

      {/* ═══════════ DESKTOP LAYOUT ═══════════ */}
    <section
      ref={showDesktop ? containerRef : undefined}
      id={showDesktop ? 'mercado' : undefined}
      className={`relative min-h-[2200px] bg-[#0b0a08] select-none ${
        showDesktop ? 'block h-[400vh]' : 'hidden'
      }`}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0b0a08] z-0">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0" />
        
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 z-1 pointer-events-none bg-[radial-gradient(circle_at_50%_44%,transparent_0%,rgba(11,10,8,0.08)_64%,rgba(11,10,8,0.54)_100%)]" />
        <div className="absolute inset-0 z-1 pointer-events-none bg-gradient-to-r from-[#0b0a08]/48 via-transparent to-[#0b0a08]/44" />
        <div className="absolute inset-0 z-1 pointer-events-none bg-gradient-to-b from-[#0b0a08]/18 via-transparent to-[#0b0a08]/42" />

        {/* Floating cards */}
        <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
          
          {/* Stage 0: Intro */}
          <div 
            className={`absolute flex flex-col items-center text-center max-w-[800px] transition-all duration-700 ease-out pointer-events-auto
              top-1/2 left-1/2
              ${activeStage === 0 ? 'opacity-100 blur-0' : 'opacity-0 blur-sm pointer-events-none'}`}
            style={{ transform: getCardTransform(0) }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c9a864]/25 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#c9a864] mb-6 backdrop-blur-md">
              <Map size={13} />
              {t('Texas Market Intelligence', 'Inteligencia de Mercado en Texas')}
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-extrabold leading-[1.05] text-[#f5f1e8] tracking-tight">
              {t('Price is only one layer.', 'El precio es solo una capa.')}
            </h2>
            <p className="mt-6 text-sm md:text-lg text-[#b8b0a0] leading-relaxed max-w-[620px]">
              {t('The Insider Report organizes market, scarcity, tax context, and timing before you look at properties.', 'El Insider Report ordena mercado, escasez, fiscalidad y timing antes de mirar propiedades.')}
            </p>
          </div>

          {/* Stage 1: Houston */}
          <article 
            className={`absolute flex flex-col p-8 md:p-10 border border-[#c9a864]/32 bg-[#1a1612]/36 backdrop-blur-sm shadow-[0_28px_70px_rgba(0,0,0,0.28)] rounded-2xl max-w-[440px] transition-all duration-700 ease-out pointer-events-auto
              top-1/2 left-1/2 md:top-[16%] md:right-[10%] md:left-auto
              ${activeStage === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            style={{ transform: getCardTransform(1) }}
          >
            <span className="text-[#c9a864] text-xs font-bold font-display tracking-[0.2em]">{t('01 · HOUSTON METRO', '01 · ÁREA METROPOLITANA HOUSTON')}</span>
            <div className="h-[1px] w-12 bg-gradient-to-r from-[#c9a864] to-transparent my-4" />
            <h3 className="font-display text-2xl font-bold text-[#f5f1e8] leading-tight">
              {t('Industrial Capital & Family Legacy', 'Capital Industrial y Legado Familiar')}
            </h3>
            <p className="mt-3 text-sm text-[#b8b0a0] leading-relaxed">
              {t('Bilingual residential enclaves, elite school districts (Memorial, The Woodlands), and high-yielding corporate relocation hubs that offer secure exits.', 'Enclaves residenciales bilingües, distritos escolares de élite (Memorial, The Woodlands) y polos de relocalización corporativa de alto rendimiento que ofrecen salidas seguras.')}
            </p>
          </article>

          {/* Stage 2: Austin */}
          <article 
            className={`absolute flex flex-col p-8 md:p-10 border border-[#c9a864]/32 bg-[#1a1612]/36 backdrop-blur-sm shadow-[0_28px_70px_rgba(0,0,0,0.28)] rounded-2xl max-w-[440px] transition-all duration-700 ease-out pointer-events-auto
              top-1/2 left-1/2 md:bottom-[16%] md:left-[10%] md:right-auto
              ${activeStage === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            style={{ transform: getCardTransform(2) }}
          >
            <span className="text-[#c9a864] text-xs font-bold font-display tracking-[0.2em]">{t('02 · AUSTIN & HILL COUNTRY', '02 · AUSTIN Y HILL COUNTRY')}</span>
            <div className="h-[1px] w-12 bg-gradient-to-r from-[#c9a864] to-transparent my-4" />
            <h3 className="font-display text-2xl font-bold text-[#f5f1e8] leading-tight">
              {t('Technology and Scarcity Appreciation', 'Tecnología y Plusvalía por Escasez')}
            </h3>
            <p className="mt-3 text-sm text-[#b8b0a0] leading-relaxed">
              {t('Rugged topography and strict environmental zoning limit available buildable land, creating locked-in equity premium for modern architectural properties.', 'La topografía accidentada y regulaciones estrictas limitan la tierra urbanizable, garantizando plusvalía a largo plazo para propiedades de diseño moderno.')}
            </p>
          </article>

          {/* Stage 3: Texas fiscal */}
          <article 
            className={`absolute flex flex-col p-8 md:p-10 border border-[#c9a864]/32 bg-[#1a1612]/36 backdrop-blur-sm shadow-[0_28px_70px_rgba(0,0,0,0.28)] rounded-2xl max-w-[440px] transition-all duration-700 ease-out pointer-events-auto
              top-1/2 left-1/2 md:top-[16%] md:left-[10%] md:right-auto
              ${activeStage === 3 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            style={{ transform: getCardTransform(3) }}
          >
            <span className="text-[#c9a864] text-xs font-bold font-display tracking-[0.2em]">{t('03 · TAX EFFICIENCY', '03 · EFICIENCIA TRIBUTARIA')}</span>
            <div className="h-[1px] w-12 bg-gradient-to-r from-[#c9a864] to-transparent my-4" />
            <h3 className="font-display text-2xl font-bold text-[#f5f1e8] leading-tight">
              {t('Fiscal Optimization Mechanics', 'Optimización Fiscal y Tributaria')}
            </h3>
            <p className="mt-3 text-sm text-[#b8b0a0] leading-relaxed">
              {t('High property taxes are offset and amortized by the absolute absence of state income tax for business owners, enabling compound capital growth.', 'El alto impuesto predial se ve compensado y amortizado por la ausencia absoluta de impuesto estatal sobre la renta para dueños de negocios.')}
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

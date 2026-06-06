'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Compass,
  Maximize2,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import MarketTicker from '@/components/MarketTicker';
import Navigation from '@/components/Navigation';
import ProcessGuide from '@/components/ProcessGuide';
import Testimonials from '@/components/Testimonials';
import { useLanguage } from '@/components/LanguageContext';
import { teamGallery, teamFeatureImage, teamStoryImages, type GalleryImage } from '@/lib/team';

type LightboxState = {
  items: GalleryImage[];
  index: number;
};

export default function TeamPage() {
  const { t } = useLanguage();
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  const handlePrev = useCallback(() => {
    setLightbox((prev) =>
      prev ? { ...prev, index: prev.index === 0 ? prev.items.length - 1 : prev.index - 1 } : null,
    );
  }, []);

  const handleNext = useCallback(() => {
    setLightbox((prev) =>
      prev ? { ...prev, index: prev.index === prev.items.length - 1 ? 0 : prev.index + 1 } : null,
    );
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!lightbox) return;
      if (event.key === 'Escape') setLightbox(null);
      if (event.key === 'ArrowRight') handleNext();
      if (event.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, lightbox]);

  const servicePillars = [
    {
      icon: Users,
      title: { en: 'International Concierge & Relocation', es: 'Concierge y Relocalización Internacional' },
      desc: {
        en: 'We coordinate transition logistics, school district fit, community selection, and lifestyle onboarding for cross-border families.',
        es: 'Coordinamos la logística de transición, distritos escolares, selección de comunidad e integración de estilo de vida para familias transfronterizas.',
      },
    },
    {
      icon: Compass,
      title: { en: 'Off-Market Sourcing & Intelligence', es: 'Búsqueda Off-Market e Inteligencia' },
      desc: {
        en: 'We use local networks across Houston, Austin, and San Antonio to identify private inventory before it reaches public databases.',
        es: 'Usamos redes locales en Houston, Austin y San Antonio para identificar inventario privado antes de que llegue a las bases públicas.',
      },
    },
    {
      icon: ClipboardCheck,
      title: { en: 'Investment Feasibility & ROI', es: 'Viabilidad de Inversión y ROI' },
      desc: {
        en: 'We pressure-test cash flow, tax context, appreciation logic, and exit strategy before a client commits capital.',
        es: 'Analizamos flujo de caja, contexto fiscal, plusvalía y estrategia de salida antes de comprometer capital.',
      },
    },
    {
      icon: ShieldCheck,
      title: { en: 'Bilingual Escrow & Transaction Safety', es: 'Escrow Bilingüe y Seguridad Transaccional' },
      desc: {
        en: 'We translate the administrative, title, lender, inspection, and legal bridge work into one accountable operating rhythm.',
        es: 'Traducimos administración, título, prestamista, inspección y puente legal en un solo ritmo operativo responsable.',
      },
    },
  ];

  const operatingModel = [
    {
      title: t('Founder-led brief', 'Brief liderado por fundador'),
      text: t(
        'Every serious route begins with a strategic read of capital, family, timing, and risk.',
        'Cada ruta seria empieza con una lectura estratégica de capital, familia, timing y riesgo.',
      ),
    },
    {
      title: t('Specialist routing', 'Ruta por especialistas'),
      text: t(
        'The right advisor, lender, title, inspection, and local network enter only when the brief needs them.',
        'El asesor, prestamista, título, inspección y red local entran solo cuando el brief lo requiere.',
      ),
    },
    {
      title: t('One accountable table', 'Una mesa responsable'),
      text: t(
        'The client sees a coordinated advisory table, not a stack of disconnected vendors.',
        'El cliente ve una mesa consultiva coordinada, no una lista de proveedores desconectados.',
      ),
    },
  ];

  const lightboxItems = lightbox?.items ?? [];
  const activeImage = lightbox ? lightboxItems[lightbox.index] : null;

  return (
    <main id="main-content" className="ro-bg-page min-h-screen text-[var(--ro-ink)]">
      <MarketTicker fixed />
      <Navigation withTicker />

      <section className="relative overflow-hidden px-5 pb-16 pt-36 md:px-8 md:pb-24 md:pt-48">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
          <div className="relative z-10">
            <p className="eyebrow">{t('Elite Advisory Practice', 'Práctica Consultiva de Élite')}</p>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-extrabold leading-none tracking-tight text-ro-dark md:text-8xl">
              {t('A team built like an advisory board.', 'Un equipo construido como consejo consultivo.')}
            </h1>
            <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-[var(--ro-muted)] md:text-xl">
              {t(
                'Not a gallery of agents. A coordinated table for families and investors who need Texas interpreted with privacy, data, and cultural judgment.',
                'No es una galería de agentes. Es una mesa coordinada para familias e inversionistas que necesitan interpretar Texas con privacidad, datos y criterio cultural.',
              )}
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {[
                t('Bilingual EN/ES', 'Bilingüe EN/ES'),
                t('Texas market table', 'Mesa de mercado en Texas'),
                t('Concierge, start to finish', 'Concierge de principio a fin'),
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-ro-dark/10 bg-white/54 px-4 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-ro-dark/62 shadow-sm backdrop-blur">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-ro-dark/10 bg-white shadow-[0_36px_110px_rgba(39,31,26,0.16)] md:rounded-[3rem] lg:min-h-[650px]"
          >
            <Image
              src={teamFeatureImage}
              alt={t('Rangel Oviedo Group leadership', 'Liderazgo de Rangel Oviedo Group')}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover object-[center_34%]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/72 via-black/24 to-transparent p-7 text-white md:p-10">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d4b16f]">
                {t('Founder-led consulting', 'Consultoría liderada por el fundador')}
              </p>
              <h2 className="mt-3 max-w-xl font-display text-3xl leading-tight md:text-5xl">
                {t('One table, many disciplines.', 'Una mesa, múltiples disciplinas.')}
              </h2>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.52fr_1fr]">
          <div className="lg:sticky lg:top-36 lg:self-start">
            <p className="eyebrow">{t('Operating pillars', 'Pilares operativos')}</p>
            <h2 className="mt-5 font-display text-4xl leading-tight md:text-6xl">
              {t('The team is the system behind the route.', 'El equipo es el sistema detrás de la ruta.')}
            </h2>
            <p className="mt-6 text-base leading-7 text-[var(--ro-muted)] md:text-lg">
              {t(
                'Each discipline exists to reduce uncertainty: relocation, sourcing, financial feasibility, and transaction safety.',
                'Cada disciplina existe para reducir la incertidumbre: relocalización, búsqueda, viabilidad financiera y seguridad transaccional.',
              )}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {servicePillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.article
                  key={pillar.title.en}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="ro-bg-surface min-h-[310px] rounded-[1.5rem] border border-ro-dark/8 p-7 md:p-8"
                >
                  <div className="mb-8 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ro-accent/10 text-ro-accent">
                      <Icon size={23} />
                    </div>
                    <span className="font-display text-4xl text-ro-dark/12">0{index + 1}</span>
                  </div>
                  <h3 className="font-display text-2xl leading-tight text-ro-dark">
                    {t(pillar.title.en, pillar.title.es)}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-ro-dark/66">{t(pillar.desc.en, pillar.desc.es)}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 overflow-hidden bg-[var(--ro-ink)] px-5 py-20 text-white md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            <div>
              <p className="eyebrow text-[#d4b16f]">{t('Culture of execution', 'Cultura de ejecución')}</p>
              <h2 className="mt-5 font-display text-4xl leading-tight text-white md:text-6xl">
                {t('A private client should feel coordination, not volume.', 'Un cliente privado debe sentir coordinación, no volumen.')}
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {operatingModel.map((item, index) => (
                <article key={item.title} className="rounded-[1.4rem] border border-white/12 bg-white/7 p-6 backdrop-blur">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4b16f]">0{index + 1}</span>
                  <h3 className="mt-6 font-display text-2xl leading-tight text-white">{item.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-white/62">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ro-bg-section relative z-10 mx-2 mb-20 overflow-hidden rounded-[2rem] px-5 py-20 shadow-xl md:mx-4 md:rounded-[4rem] md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.84fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow">{t('Editorial proof', 'Evidencia editorial')}</p>
              <h2 className="mt-5 font-display text-4xl leading-tight md:text-6xl">
                {t('A few moments are enough when the story is clear.', 'Pocos momentos alcanzan cuando la historia es clara.')}
              </h2>
            </div>
            <div className="lg:justify-self-end">
              <p className="max-w-xl text-base leading-7 text-[var(--ro-muted)] md:text-lg">
                {t(
                  'The complete shoot remains available as an archive. The page now shows only the images that support leadership, unity, and concierge culture.',
                  'La producción completa queda como archivo. La página muestra solo las imágenes que sostienen liderazgo, unidad y cultura concierge.',
                )}
              </p>
              <button
                type="button"
                onClick={() => setLightbox({ items: teamGallery, index: 0 })}
                className="mt-7 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-ro-accent transition-colors hover:text-ro-dark"
              >
                {t('Open complete visual archive', 'Abrir archivo visual completo')}
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-12 lg:auto-rows-[190px]">
            {teamStoryImages.map((image, index) => {
              const layoutClass =
                index === 0
                  ? 'lg:col-span-6 lg:row-span-2'
                  : index === 1
                    ? 'lg:col-span-6'
                    : 'lg:col-span-3';

              return (
                <motion.button
                  key={image.src}
                  type="button"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  onClick={() => setLightbox({ items: teamStoryImages, index })}
                  className={`group relative min-h-[260px] overflow-hidden rounded-[1.5rem] border border-ro-dark/8 bg-ro-dark text-left shadow-[0_24px_74px_rgba(39,31,26,0.13)] ${layoutClass}`}
                >
                  <Image
                    src={image.src}
                    alt={t(image.alt.en, image.alt.es)}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-black/12 to-transparent opacity-80 transition-opacity group-hover:opacity-92" />
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white">
                    <p className="max-w-sm text-sm font-medium leading-5 text-white/86">{t(image.alt.en, image.alt.es)}</p>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/24 bg-white/12 backdrop-blur">
                      <Maximize2 size={15} />
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      <ProcessGuide />
      <Testimonials />
      <FAQ />

      <section className="relative z-10 mx-2 mb-20 overflow-hidden rounded-[2rem] px-5 py-24 text-ro-light shadow-xl md:mx-4 md:rounded-[5rem] md:px-8 md:py-32">
        <div className="absolute inset-0 -z-10">
          <AnimatedBackground
            src="/rog/scrolly_5_terrace.mp4"
            poster="/rog/scrolly_5_terrace.webp"
            className="h-full w-full"
            videoClassName="object-[center_52%]"
            overlayClassName="bg-[linear-gradient(90deg,rgba(11,10,8,0.92)_0%,rgba(11,10,8,0.70)_50%,rgba(11,10,8,0.46)_100%)]"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/50 via-transparent to-black/24" aria-hidden />

        <div className="relative mx-auto max-w-5xl">
          <p className="eyebrow text-[#d4b16f]">{t('Direct strategic contact', 'Contacto estratégico directo')}</p>
          <h2 className="mt-5 max-w-4xl font-display text-5xl leading-tight text-white md:text-7xl">
            {t('Align the team before you enter the market.', 'Alinea al equipo antes de entrar al mercado.')}
          </h2>
          <p className="mt-7 max-w-2xl text-base leading-7 text-white/68 md:text-lg">
            {t(
              'Coordinate an initial strategic conversation with Rangel Oviedo and the core team to design your acquisition route.',
              'Coordina una conversación inicial con Rangel Oviedo y el equipo central para diseñar tu ruta de adquisición.',
            )}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link className="btn bg-[#c9a864] text-[#0b0a08] hover:bg-[#ebd095]" href="/#contacto">
              {t('Book strategy session', 'Agendar estrategia')}
              <CalendarDays size={18} />
            </Link>
            <Link className="btn border border-white/24 bg-white/8 text-white hover:bg-white/14" href="/propiedades">
              {t('View curated assets', 'Ver activos curados')}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && activeImage ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex flex-col justify-between bg-black/95 p-4 text-white md:p-8"
          >
            <div className="z-10 mx-auto flex w-full max-w-7xl items-center justify-between text-white/70">
              <span className="text-xs font-bold uppercase tracking-[0.2em]">
                {lightbox.index + 1} / {lightbox.items.length}
              </span>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:bg-white/10 hover:text-white"
                aria-label={t('Close gallery', 'Cerrar galería')}
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative mx-auto flex w-full max-w-7xl flex-1 items-center justify-center">
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-0 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:bg-white/10 hover:text-white md:left-4"
                aria-label={t('Previous photo', 'Foto anterior')}
              >
                <ChevronLeft size={24} />
              </button>

              <div className="relative h-full max-h-[75vh] w-full overflow-hidden rounded-2xl border border-white/5 md:aspect-[16/10] md:rounded-3xl">
                <Image
                  src={activeImage.src}
                  alt={t(activeImage.alt.en, activeImage.alt.es)}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="absolute right-0 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:bg-white/10 hover:text-white md:right-4"
                aria-label={t('Next photo', 'Siguiente foto')}
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="z-10 mx-auto w-full max-w-4xl space-y-1 pb-4 text-center">
              <p className="text-base font-light text-white md:text-lg">{t(activeImage.alt.en, activeImage.alt.es)}</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                {t('Rangel Oviedo Group visual archive', 'Archivo visual Rangel Oviedo Group')}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <Footer />
    </main>
  );
}

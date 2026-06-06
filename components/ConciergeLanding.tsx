'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  Home,
  Landmark,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';
import Navigation from './Navigation';
import Footer from './Footer';
import ScrollyPlaceholder from './ScrollyPlaceholder';
import AnimatedBackground from './AnimatedBackground';
import { useLanguage } from './LanguageContext';

const HeroScrollytelling = dynamic(() => import('./HeroScrollytelling'), {
  ssr: false,
  loading: ScrollyPlaceholder,
});

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_RANGEL_WHATSAPP ?? '';
const GHL_FORM_URL = process.env.NEXT_PUBLIC_GHL_FORM_URL ?? '';
const GHL_CALENDAR_URL = process.env.NEXT_PUBLIC_GHL_CALENDAR_URL ?? '';
const GHL_FORM_EMBED_URL = process.env.NEXT_PUBLIC_GHL_FORM_EMBED_URL ?? '';
const GHL_CALENDAR_EMBED_URL = process.env.NEXT_PUBLIC_GHL_CALENDAR_EMBED_URL ?? '';
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_RANGEL_EMAIL ?? '';
const CONTACT_PHONE = process.env.NEXT_PUBLIC_RANGEL_PHONE ?? '';

const CATALOG_BG_VIDEO = '/rog/scrolly_1_facade.mp4';
const CATALOG_BG_POSTER = '/rog/scrolly_1_facade.webp';
const PROFILES_BG_VIDEO = '/rog/scrolly_3_livingroom.mp4';
const PROFILES_BG_POSTER = '/rog/scrolly_3_livingroom.webp';
const CONTACTO_BG_VIDEO = process.env.NEXT_PUBLIC_CONTACTO_BG_VIDEO || '/rog/scrolly_4_kitchen.mp4';
const CONTACTO_BG_POSTER = '/rog/scrolly_4_kitchen.webp';

const BASE_MESSAGE =
  'Hola Rangel, vi tu web y quiero una orientación personalizada sobre real estate en Texas. Mi interés principal es:';

function whatsappLink(intent: string) {
  const text = encodeURIComponent(`${BASE_MESSAGE} ${intent}.`);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

function externalLinkProps(url: string) {
  return url ? { target: '_blank', rel: 'noreferrer' } : {};
}

export default function ConciergeLanding() {
  const { t } = useLanguage();
  const formHref = GHL_FORM_URL || '#contacto';
  const calendarHref = GHL_CALENDAR_URL || '#contacto';
  const whatsappHref = WHATSAPP_NUMBER ? whatsappLink('consulta inicial') : '';

  const methodSteps = [
    {
      step: '01',
      title: t('Decision Diagnosis', 'Diagnóstico de decisión'),
      text: t(
        'Capital, family, mobility and timing define the route before any listing opens.',
        'Capital, familia, movilidad y timing definen la ruta antes de abrir un listado.',
      ),
    },
    {
      step: '02',
      title: t('Market Reading', 'Lectura de mercado'),
      text: t(
        'We filter Texas by risk, scarcity, tax context, lifestyle and resale logic.',
        'Filtramos Texas por riesgo, escasez, contexto fiscal, estilo de vida y reventa.',
      ),
    },
    {
      step: '03',
      title: t('Private Selection', 'Selección privada'),
      text: t(
        'Fewer tours, more fit: public, private and off-market options when they serve the brief.',
        'Menos recorridos y más encaje: opciones públicas, privadas y off-market si sirven al brief.',
      ),
    },
    {
      step: '04',
      title: t('Negotiation Craft', 'Negociación de oficio'),
      text: t(
        'Seller reading, inspection leverage, offer strategy and margin protection before closing.',
        'Lectura del vendedor, inspección, estrategia de oferta y protección del margen.',
      ),
    },
    {
      step: '05',
      title: t('Continuity', 'Continuidad'),
      text: t(
        'After closing, the route can continue with leasing, improvements or the next move.',
        'Después del cierre, la ruta puede seguir con renta, mejoras o el siguiente movimiento.',
      ),
    },
  ];

  const profiles = [
    {
      title: t('International Investor', 'Inversor internacional'),
      text: t(
        'You want to enter Texas with a thesis, not with scattered listings and impulse decisions.',
        'Quieres entrar a Texas con una tesis, no con listados sueltos ni decisiones por impulso.',
      ),
      icon: Landmark,
    },
    {
      title: t('Family Purchase', 'Compra familiar'),
      text: t(
        'You need a home, area, school logic, and lifestyle rhythm that match the next chapter.',
        'Necesitas casa, zona, lógica escolar y ritmo de vida alineados con el próximo capítulo.',
      ),
      icon: Home,
    },
    {
      title: t('Premium Seller', 'Vendedor premium'),
      text: t(
        'You need positioning, narrative, buyer quality, and negotiation before public exposure.',
        'Necesitas posicionamiento, narrativa, calidad de comprador y negociación antes de exponerte al mercado.',
      ),
      icon: ShieldCheck,
    },
    {
      title: t('Relocation to Texas', 'Relocation a Texas'),
      text: t(
        'You are evaluating a move and need decisions grounded before the first property visit.',
        'Estás evaluando mudarte y necesitas aterrizar decisiones antes de visitar propiedades.',
      ),
      icon: Compass,
    },
  ];

  useEffect(() => {
    document.documentElement.classList.add('reveal-ready');
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.15 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main id="main-content" className="ro-bg-page min-h-screen overflow-x-clip text-[var(--ro-ink)]">
      <Navigation />
      <HeroScrollytelling />

      <section aria-label="Private Texas advisory proof points" className="relative z-10 overflow-hidden border-y border-[var(--ro-ink)]/8 bg-[var(--ro-ink)] text-[var(--ro-paper)]">
        <div className="trust-marquee flex gap-14 py-3 text-[12px] font-bold uppercase tracking-[0.2em]">
          {[...Array(2)].flatMap((_, loop) =>
            [
              t('Bilingual advisory EN/ES', 'Asesoría bilingüe EN/ES'),
              t('86 properties sold', '86 propiedades vendidas'),
              t('55 leased', '55 rentadas'),
              t('45 Google reviews · 5★', '45 reseñas Google · 5★'),
              t('HAR Platinum agent', 'Agente HAR Platinum'),
              t('Texas ↔ Latin America bridge', 'Puente Texas ↔ Latinoamérica'),
            ].map((item) => (
              <span key={`${loop}-${item}`} className="inline-flex shrink-0 items-center gap-4">
                <CheckCircle2 size={16} className="text-[#c9a864]" />
                {item}
              </span>
            )),
          )}
        </div>
      </section>

      <section id="metodo" className="relative z-10 px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="mb-9 grid gap-5 lg:grid-cols-[0.78fr_1fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="eyebrow">{t('The Rangel Method', 'El Método Rangel')}</p>
              <h2 className="mt-4 font-display text-4xl leading-[1.04] md:text-6xl">
                {t('Before showing properties, we filter risk.', 'Antes de mostrar propiedades, filtramos el riesgo.')}
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-[var(--ro-muted)] md:text-lg lg:justify-self-end">
              {t(
                'Capital, family, mobility and timing define the route before any listing opens.',
                'Capital, familia, movilidad y timing definen la ruta antes de abrir un listado.',
              )}
            </p>
          </div>

          <div data-reveal className="horizontal-rail" aria-label={t('Method steps', 'Etapas del método')}>
            {methodSteps.map((item) => (
              <article key={item.step} className="method-card">
                <span>{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 overflow-hidden px-5 py-20 text-white md:px-8 md:py-24" style={{ '--ro-muted': 'rgba(255,255,255,0.74)' } as React.CSSProperties}>
        <div className="absolute inset-0 -z-10">
          <AnimatedBackground
            src={CATALOG_BG_VIDEO}
            poster={CATALOG_BG_POSTER}
            className="h-full w-full"
            videoClassName="object-[center_52%]"
            overlayClassName="bg-[linear-gradient(90deg,rgba(11,10,8,0.88)_0%,rgba(11,10,8,0.62)_44%,rgba(11,10,8,0.38)_100%)]"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0b0a08]/20 via-transparent to-[#0b0a08]/36" aria-hidden />

        <div className="mx-auto max-w-7xl">
          <div data-reveal className="grid gap-8 lg:grid-cols-[1fr_0.76fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="eyebrow">{t('Curated Catalog', 'Catálogo Curado')}</p>
              <h2 className="mt-4 font-display text-4xl leading-tight md:text-6xl">
                {t('Texas properties, chosen with a strict filter.', 'Propiedades en Texas, elegidas con un filtro estricto.')}
              </h2>
              <p className="mt-6 text-base leading-7 text-[var(--ro-muted)] md:text-lg">
                {t(
                  "We don't compile listings — we curate opportunities. Explore active investments and key neighborhoods in Austin and Houston.",
                  'No compilamos listados: curamos oportunidades. Explora inversiones activas y zonas clave en Austin y Houston.'
                )}
              </p>
              <div className="mt-8">
                <Link href="/propiedades" className="btn btn-copper">
                  {t('Explore Properties', 'Explorar Propiedades')}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="relative rounded-[1.6rem] border border-white/16 bg-[#0b0a08]/42 p-6 shadow-[0_34px_100px_rgba(0,0,0,0.35)] backdrop-blur-md md:p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d4b16f]">
                {t('Selection lens', 'Filtro de seleccion')}
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  t('Architecture', 'Arquitectura'),
                  t('Scarcity', 'Escasez'),
                  t('Exit logic', 'Logica de salida'),
                ].map((item, index) => (
                  <div key={item} className="border-t border-white/14 pt-4">
                    <span className="font-display text-3xl text-white/92">0{index + 1}</span>
                    <p className="mt-1 text-[11px] font-black uppercase tracking-[0.16em] text-white/62">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="perfiles" className="relative z-10 overflow-hidden px-5 py-16 text-white md:px-8 md:py-20" style={{ '--ro-muted': 'rgba(255,255,255,0.70)' } as React.CSSProperties}>
        <div className="absolute inset-0 -z-10">
          <AnimatedBackground
            src={PROFILES_BG_VIDEO}
            poster={PROFILES_BG_POSTER}
            className="h-full w-full"
            videoClassName="object-[center_48%]"
            overlayClassName="bg-[linear-gradient(180deg,rgba(11,10,8,0.82)_0%,rgba(11,10,8,0.68)_48%,rgba(11,10,8,0.88)_100%)]"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(212,177,111,0.20),transparent_34%)]" aria-hidden />
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="mb-9 grid gap-5 lg:grid-cols-[0.78fr_1fr] lg:items-end">
            <div className="max-w-3xl">
            <p className="eyebrow">{t('Diagnosis by profile', 'Diagnóstico por perfil')}</p>
              <h2 className="mt-4 font-display text-4xl leading-[1.04] md:text-6xl">
              {t('Every profile needs a different reading of Texas.', 'Cada perfil necesita una lectura distinta de Texas.')}
            </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-[var(--ro-muted)] md:text-lg lg:justify-self-end">
              {t(
                'The first step changes if you are investing, buying for family, selling, or evaluating relocation.',
                'El primer paso cambia si estás invirtiendo, comprando para tu familia, vendiendo o evaluando relocation.',
              )}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {profiles.map((profile) => {
              const Icon = profile.icon;
              return (
                <article data-reveal key={profile.title} className="flex flex-col rounded-[1.35rem] border border-white/16 bg-white/10 p-6 text-white shadow-[0_24px_90px_rgba(0,0,0,0.26)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/14">
                  <div className="mb-5 flex items-center justify-between">
                    <Icon size={28} className="text-[#d4b16f]" />
                    <span className="rounded-full bg-white/12 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/62">
                      {t('Profile', 'Perfil')}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl leading-tight md:text-3xl">{profile.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/68">{profile.text}</p>
                  <a href={formHref} {...externalLinkProps(GHL_FORM_URL)} className="mt-6 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#d4b16f] transition-colors hover:text-white">
                    {t('Receive initial route', 'Recibir ruta inicial')}
                    <ArrowRight size={16} />
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-[var(--ro-ink)] px-5 py-20 text-[var(--ro-paper)] md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div data-reveal>
            <p className="eyebrow text-[#c9a864]">{t('Roots + criterion', 'Raíces + criterio')}</p>
            <h2 className="mt-5 font-display text-5xl leading-tight text-white md:text-7xl">
              {t('Texas, read with cultural judgment.', 'Texas, leído con criterio cultural.')}
            </h2>
            <p className="mt-8 max-w-2xl text-xl leading-8 text-white/68">
              {t(
                'Rangel translates market, negotiation, and family context for buyers and sellers across Texas, Mexico, and LATAM.',
                'Rangel traduce mercado, negociación y contexto familiar para compradores y vendedores entre Texas, México y Latinoamérica.',
              )}
            </p>
            <div className="mt-10">
              <Link href="/ceo" className="btn bg-[#c9a864] text-[#0b0a08] hover:bg-[#ebd095]">
                {t('Read CEO Vision', 'Ver visión del CEO')}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div data-reveal className="relative min-h-[560px] overflow-hidden rounded-[2.2rem] border border-white/12">
            <Image
              src="/rog/ceo-seated-dark.jpg"
              alt={t('Rangel Oviedo professional portrait', 'Rangel Oviedo en retrato profesional')}
              fill
              sizes="(max-width: 1024px) 90vw, 38vw"
              className="object-cover object-[50%_22%]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/74 to-transparent p-8">
              <p className="max-w-sm font-display text-3xl leading-tight text-white">
                {t(
                  'Texas rooted. Global heart. Personal attention.',
                  'Raíces en Texas. Corazón global. Atención personal.',
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="ro-bg-section-soft relative z-10 px-5 py-16 text-[var(--ro-ink)] md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="grid gap-8 lg:grid-cols-[0.85fr_1fr] lg:items-center">
            <div className="order-2 lg:order-1 relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-ro-dark/10 shadow-xl">
              <Image
                src="/rog/team-texans.jpg"
                alt="Rangel Oviedo Group Team"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 40vw"
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="eyebrow">{t('The Advisory Team', 'El Equipo Consultor')}</p>
              <h2 className="mt-4 font-display text-4xl leading-tight md:text-6xl">
                {t('The team behind every closing.', 'El equipo detrás de cada cierre.')}
              </h2>
              <p className="mt-6 text-base leading-7 text-[var(--ro-muted)] md:text-lg">
                {t(
                  'More than agents, we protect your wealth: legal context, tax efficiency, property sourcing, and school integration — start to finish.',
                  'Más que agentes, protegemos tu patrimonio: contexto legal, eficiencia fiscal, búsqueda de propiedades e integración escolar, de principio a fin.'
                )}
              </p>
              <div className="mt-8">
                <Link href="/equipo" className="btn btn-dark">
                  {t('Meet the Team', 'Conocer al Equipo')}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="relative z-10 overflow-hidden px-5 py-20 md:px-8 md:py-24">
        {CONTACTO_BG_VIDEO ? (
          <div className="absolute inset-0 -z-10">
            <AnimatedBackground
              src={CONTACTO_BG_VIDEO}
              poster={CONTACTO_BG_POSTER}
              className="h-full w-full"
              videoClassName="object-[center_50%]"
              overlayClassName="bg-[linear-gradient(180deg,rgba(246,240,232,0.88)_0%,rgba(246,240,232,0.76)_46%,rgba(234,223,206,0.90)_100%)]"
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(169,105,55,0.18),transparent_32%)]" />
        )}
        <div data-reveal className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow justify-center">{t('Private advisory', 'Asesoría privada')}</p>
            <h2 className="mt-5 font-display text-5xl leading-tight md:text-8xl">
              {t("Let's talk about your next move in Texas.", 'Hablemos de tu próximo paso en Texas.')}
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-xl leading-8 text-[var(--ro-muted)]">
              {t(
                "Tell us where you are and we'll map the next step — no pressure, in your language.",
                'Cuéntanos en qué punto estás y trazamos el siguiente paso — sin presión y en tu idioma.',
              )}
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <article className="ro-bg-surface rounded-[2rem] border border-[var(--ro-ink)]/10 p-6 backdrop-blur md:p-8">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow">{t('Private consultation', 'Asesoría privada')}</p>
                  <h3 className="mt-4 font-display text-4xl leading-tight">
                    {t('Request your private consultation.', 'Solicita tu asesoría privada.')}
                  </h3>
                </div>
                <ClipboardCheck className="mt-1 shrink-0 text-[var(--ro-copper)]" size={30} />
              </div>
              <p className="mb-7 text-base leading-7 text-[var(--ro-muted)]">
                {t(
                  'Ideal if you are exploring Texas and want clarity before committing.',
                  'Ideal si estás explorando Texas y quieres claridad antes de comprometerte.',
                )}
              </p>
              {GHL_FORM_EMBED_URL ? (
                <iframe
                  src={GHL_FORM_EMBED_URL}
                  title="Rangel Oviedo Group qualification form"
                  className="h-[560px] w-full rounded-2xl border border-[var(--ro-ink)]/10 bg-white"
                  loading="lazy"
                />
              ) : (
                <a className="btn btn-copper w-full sm:w-auto" href={formHref} {...externalLinkProps(GHL_FORM_URL)}>
                  {t('Request consultation', 'Agenda tu asesoría')}
                  <ArrowRight size={18} />
                </a>
              )}
            </article>

            <article className="rounded-[2rem] border border-[var(--ro-ink)]/10 bg-[var(--ro-ink)] p-6 text-[var(--ro-paper)] shadow-[0_28px_90px_rgba(39,31,26,0.16)] md:p-8">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow text-[#c9a864]">{t('Private calendar', 'Calendario privado')}</p>
                  <h3 className="mt-4 font-display text-4xl leading-tight text-white">
                    {t('Book if the decision is active.', 'Agenda si la decisión ya está activa.')}
                  </h3>
                </div>
                <CalendarDays className="mt-1 shrink-0 text-[#c9a864]" size={30} />
              </div>
              <p className="mb-7 text-base leading-7 text-white/68">
                {t(
                  'For focused conversations about route, timing, profile, and fit.',
                  'Para conversaciones enfocadas sobre ruta, timing, perfil y encaje.',
                )}
              </p>
              {GHL_CALENDAR_EMBED_URL ? (
                <iframe
                  src={GHL_CALENDAR_EMBED_URL}
                  title="Rangel Oviedo Group private calendar"
                  className="h-[560px] w-full rounded-2xl border border-white/10 bg-white"
                  loading="lazy"
                />
              ) : (
                <a className="btn w-full bg-[#c9a864] text-[#0b0a08] hover:bg-[#ebd095] sm:w-auto" href={calendarHref} {...externalLinkProps(GHL_CALENDAR_URL)}>
                  {t('Open private calendar', 'Abrir calendario privado')}
                  <CalendarDays size={18} />
                </a>
              )}
            </article>
          </div>

          {whatsappHref ? (
            <div className="mt-8 text-center">
              <a className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-[var(--ro-muted)] transition-colors hover:text-[var(--ro-copper)]" href={whatsappHref} target="_blank" rel="noreferrer">
                <MessageCircle size={16} />
                {t('Secondary channel: WhatsApp concierge', 'Canal secundario: concierge por WhatsApp')}
              </a>
            </div>
          ) : null}
        </div>
      </section>

      <Footer />
    </main>
  );
}

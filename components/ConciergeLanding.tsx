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
import Navigation from './Navigation';
import { useLanguage } from './LanguageContext';

const ScrollyPlaceholder = () => (
  <div className="h-screen w-full bg-[#0b0a08] flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-[#c9a864] border-t-transparent rounded-full animate-spin" />
  </div>
);

const HeroScrollytelling = dynamic(() => import('./HeroScrollytelling'), {
  ssr: false,
  loading: ScrollyPlaceholder,
});
const MidScrollytelling = dynamic(() => import('./MidScrollytelling'), {
  ssr: false,
  loading: ScrollyPlaceholder,
});
const HouseScrollytelling = dynamic(() => import('./HouseScrollytelling'), {
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
    <main className="min-h-screen overflow-x-clip bg-[var(--ro-paper)] text-[var(--ro-ink)]">
      <Navigation />
      <HeroScrollytelling />

      <section aria-label="Boutique Texas proof points" className="relative z-10 overflow-hidden border-y border-[var(--ro-ink)]/8 bg-[var(--ro-ink)] text-[var(--ro-paper)]">
        <div className="trust-marquee flex gap-14 py-5 text-[12px] font-bold uppercase tracking-[0.2em]">
          {[...Array(2)].flatMap((_, loop) =>
            [
              t('Boutique Texas advisory', 'Asesoría boutique en Texas'),
              t('Bilingual EN/ES practice', 'Práctica bilingüe EN/ES'),
              t('Mexico + LATAM bridge', 'Puente México + LATAM'),
              t('Off-market lens', 'Lectura off-market'),
              t('Concierge from brief to keys', 'Concierge de brief a llaves'),
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

      <HouseScrollytelling />

      <section id="perfiles" className="relative z-10 bg-white px-5 py-16 md:px-8 md:py-20">
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
                <article data-reveal key={profile.title} className="profile-card">
                  <div className="mb-7 flex items-center justify-between">
                    <Icon size={24} className="text-[var(--ro-copper)]" />
                    <span className="rounded-full bg-[var(--ro-sand)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--ro-muted)]">
                      {t('Profile', 'Perfil')}
                    </span>
                  </div>
                  <h3>{profile.title}</h3>
                  <p>{profile.text}</p>
                  <a href={formHref} {...externalLinkProps(GHL_FORM_URL)} className="profile-link">
                    {t('Receive initial route', 'Recibir ruta inicial')}
                    <ArrowRight size={16} />
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <MidScrollytelling />

      <section className="relative z-10 bg-[var(--ro-ink)] px-5 py-24 text-[var(--ro-paper)] md:px-8 md:py-32">
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
          </div>
          <div data-reveal className="relative min-h-[560px] overflow-hidden rounded-[2.2rem] border border-white/12">
            <Image
              src="/rog/portrait-rangel.webp"
              alt={t('Rangel Oviedo professional portrait', 'Rangel Oviedo en retrato profesional')}
              fill
              sizes="(max-width: 1024px) 90vw, 38vw"
              className="object-cover object-[50%_22%]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/74 to-transparent p-8">
              <p className="max-w-sm font-display text-3xl italic leading-tight text-white">
                {t(
                  'Texas rooted. Global heart. Personal attention.',
                  'Raíces en Texas. Corazón global. Atención personal.',
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="relative z-10 overflow-hidden px-5 py-24 md:px-8 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(169,105,55,0.18),transparent_32%)]" />
        <div data-reveal className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow justify-center">{t('Insider Report Q3 2026', 'Insider Report Q3 2026')}</p>
            <h2 className="mt-5 font-display text-5xl leading-tight md:text-8xl">
              {t('Start with context. Book when the decision is active.', 'Empieza con contexto. Agenda cuando la decisión esté activa.')}
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-xl leading-8 text-[var(--ro-muted)]">
              {t(
                'The report is the soft entry point. The private calendar is for focused strategy conversations.',
                'El reporte es el primer paso suave. El calendario privado queda para conversaciones de estrategia.',
              )}
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <article className="rounded-[2rem] border border-[var(--ro-ink)]/10 bg-white/72 p-6 shadow-[0_28px_90px_rgba(39,31,26,0.09)] backdrop-blur md:p-8">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow">{t('Quarterly insider report', 'Reporte trimestral insider')}</p>
                  <h3 className="mt-4 font-display text-4xl leading-tight">
                    {t('Receive the private report.', 'Recibe el reporte privado.')}
                  </h3>
                </div>
                <ClipboardCheck className="mt-1 shrink-0 text-[var(--ro-copper)]" size={30} />
              </div>
              <p className="mb-7 text-base leading-7 text-[var(--ro-muted)]">
                {t(
                  'Ideal if you are exploring Texas and want context before scheduling.',
                  'Ideal si estás explorando Texas y quieres contexto antes de agendar.',
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
                  {t('Receive Insider Report', 'Recibir Insider Report')}
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

      <footer className="relative z-10 border-t border-[var(--ro-ink)]/8 bg-[var(--ro-ink)] px-5 py-12 text-white/55 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
            <span className="relative block h-16 w-20">
              <Image
                src="/brand/rog-logo-white.png"
                alt="Rangel Oviedo Group"
                fill
                sizes="80px"
                className="object-contain"
              />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-center">{t('Boutique Texas Real Estate', 'Boutique inmobiliaria en Texas')}</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-center">{t('Texas + Mexico + LATAM', 'Texas + México + LATAM')}</span>
          </div>

          {(CONTACT_EMAIL || CONTACT_PHONE || WHATSAPP_NUMBER) && (
            <div className="flex flex-col items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] md:flex-row md:gap-8">
              {CONTACT_EMAIL && (
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="transition-colors hover:text-[#c9a864]"
                  aria-label={t('Send email', 'Enviar correo')}
                >
                  {CONTACT_EMAIL}
                </a>
              )}
              {CONTACT_PHONE && (
                <a
                  href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, '')}`}
                  className="transition-colors hover:text-[#c9a864]"
                  aria-label={t('Call by phone', 'Llamar por teléfono')}
                >
                  {CONTACT_PHONE}
                </a>
              )}
              {WHATSAPP_NUMBER && whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-[#c9a864]"
                >
                  WhatsApp
                </a>
              )}
            </div>
          )}

          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-[10px] font-bold uppercase tracking-[0.22em] md:flex-row">
            <span>© {new Date().getFullYear()} Rangel Oviedo Group</span>
            <span>{t('Insider Report + private calendar via GoHighLevel', 'Insider Report + calendario privado vía GoHighLevel')}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

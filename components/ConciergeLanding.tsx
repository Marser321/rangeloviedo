'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  Home,
  Landmark,
  MessageCircle,
  MoveRight,
  ShieldCheck,
} from 'lucide-react';
import Navigation from './Navigation';
import HeroScrollytelling from './HeroScrollytelling';
import MidScrollytelling from './MidScrollytelling';
import HouseScrollytelling from './HouseScrollytelling';
import { useLanguage } from './LanguageContext';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_RANGEL_WHATSAPP ?? '';
const GHL_FORM_URL = process.env.NEXT_PUBLIC_GHL_FORM_URL ?? '';
const GHL_CALENDAR_URL = process.env.NEXT_PUBLIC_GHL_CALENDAR_URL ?? '';
const GHL_FORM_EMBED_URL = process.env.NEXT_PUBLIC_GHL_FORM_EMBED_URL ?? '';
const GHL_CALENDAR_EMBED_URL = process.env.NEXT_PUBLIC_GHL_CALENDAR_EMBED_URL ?? '';

const BASE_MESSAGE =
  'Hola Rangel, vi tu web y quiero una orientacion personalizada sobre real estate en Texas. Mi interes principal es:';

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
      title: t('Strategic Diagnosis', 'Diagnostico estrategico'),
      text: t(
        'Rangel reads capital, timeline, family needs, tax context, and risk before opening a search.',
        'Rangel lee capital, tiempos, necesidades familiares, contexto fiscal y riesgo antes de abrir una busqueda.',
      ),
    },
    {
      step: '02',
      title: t('Opportunity Map', 'Mapa de oportunidad'),
      text: t(
        'Texas is filtered by city, neighborhood, schools, lifestyle, liquidity, and future resale story.',
        'Texas se filtra por ciudad, zona, escuelas, estilo de vida, liquidez e historia de reventa futura.',
      ),
    },
    {
      step: '03',
      title: t('Private Selection', 'Seleccion privada'),
      text: t(
        'A curated shortlist replaces random tours, including off-market possibilities when the brief supports them.',
        'Una seleccion curada reemplaza recorridos al azar, incluyendo oportunidades off-market cuando el perfil lo permite.',
      ),
    },
    {
      step: '04',
      title: t('Negotiation Craft', 'Negociacion de oficio'),
      text: t(
        'Offer strategy, seller reading, inspection leverage, and margin protection are handled with quiet precision.',
        'La estrategia de oferta, lectura del vendedor, inspeccion y proteccion del margen se trabajan con precision.',
      ),
    },
    {
      step: '05',
      title: t('Concierge Continuity', 'Continuidad concierge'),
      text: t(
        'After closing, the relationship can continue with leasing, improvements, management, or the next acquisition.',
        'Despues del cierre, la relacion puede seguir con renta, mejoras, administracion o la proxima adquisicion.',
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
        'Necesitas casa, zona, logica escolar y ritmo de vida alineados con el proximo capitulo.',
      ),
      icon: Home,
    },
    {
      title: t('Premium Seller', 'Vendedor premium'),
      text: t(
        'You need positioning, narrative, buyer quality, and negotiation before public exposure.',
        'Necesitas posicionamiento, narrativa, calidad de comprador y negociacion antes de exponerte al mercado.',
      ),
      icon: ShieldCheck,
    },
    {
      title: t('Relocation to Texas', 'Relocation a Texas'),
      text: t(
        'You are evaluating a move and need decisions grounded before the first property visit.',
        'Estas evaluando mudarte y necesitas aterrizar decisiones antes de visitar propiedades.',
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
              t('Boutique Texas advisory', 'Asesoria boutique en Texas'),
              t('Bilingual EN/ES practice', 'Practica bilingue EN/ES'),
              t('Mexico + LATAM bridge', 'Puente Mexico + LATAM'),
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

      <section id="metodo" className="relative z-10 px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="eyebrow">{t('The Rangel Method', 'El Metodo Rangel')}</p>
              <h2 className="mt-5 font-display text-5xl leading-tight md:text-7xl">
                {t('Boutique real estate starts before the property.', 'El real estate boutique empieza antes de la propiedad.')}
              </h2>
            </div>
            <p className="max-w-2xl text-xl leading-8 text-[var(--ro-muted)] lg:justify-self-end">
              {t(
                'Every brief is treated as a capital, family, and lifestyle decision across Texas, Mexico, and LATAM contexts.',
                'Cada brief se trata como una decision de capital, familia y estilo de vida entre Texas, Mexico y LATAM.',
              )}
            </p>
          </div>

          <div data-reveal className="horizontal-rail" aria-label={t('Method steps', 'Etapas del metodo')}>
            {methodSteps.map((item) => (
              <article key={item.step} className="method-card">
                <span>{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <MoveRight aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <HouseScrollytelling />

      <section id="perfiles" className="relative z-10 bg-white px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="mb-14 max-w-3xl">
            <p className="eyebrow">{t('Diagnosis by profile', 'Diagnostico por perfil')}</p>
            <h2 className="mt-5 font-display text-5xl leading-tight md:text-7xl">
              {t("Tell me what you are solving, and I'll tell you where to begin.", 'Dime que estas intentando resolver y te digo por donde empezar.')}
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {profiles.map((profile) => {
              const Icon = profile.icon;
              return (
                <article data-reveal key={profile.title} className="profile-card">
                  <div className="mb-10 flex items-center justify-between">
                    <Icon size={28} className="text-[var(--ro-copper)]" />
                    <span className="rounded-full bg-[var(--ro-sand)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--ro-muted)]">
                      {t('Profile', 'Perfil')}
                    </span>
                  </div>
                  <h3>{profile.title}</h3>
                  <p>{profile.text}</p>
                  <a href={formHref} {...externalLinkProps(GHL_FORM_URL)} className="profile-link">
                    {t('Qualify this brief', 'Calificar este perfil')}
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
            <p className="eyebrow text-[#c9a864]">{t('Roots + criterion', 'Raices + criterio')}</p>
            <h2 className="mt-5 font-display text-5xl leading-tight text-white md:text-7xl">
              {t('A cultural bridge for serious Texas decisions.', 'Un puente cultural para decisiones serias en Texas.')}
            </h2>
            <p className="mt-8 max-w-2xl text-xl leading-8 text-white/68">
              {t(
                'Rangel Oviedo Group combines local Texas fluency with the cultural reading international families need before moving capital.',
                'Rangel Oviedo Group une lectura local de Texas con el criterio cultural que una familia internacional necesita antes de mover capital.',
              )}
            </p>
          </div>
          <div data-reveal className="relative min-h-[560px] overflow-hidden rounded-[2.2rem] border border-white/12">
            <Image
              src="/rog/rangel-desire.webp"
              alt={t('Rangel and Desire Oviedo professional portrait', 'Rangel y Desire Oviedo en retrato profesional')}
              fill
              sizes="(max-width: 1024px) 90vw, 38vw"
              className="object-cover object-[50%_18%]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/74 to-transparent p-8">
              <p className="max-w-sm font-display text-3xl italic leading-tight text-white">
                Texas rooted. Global heart. Personal attention.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="relative z-10 overflow-hidden px-5 py-24 md:px-8 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(169,105,55,0.18),transparent_32%)]" />
        <div data-reveal className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow justify-center">{t('GoHighLevel conversion', 'Conversion GoHighLevel')}</p>
            <h2 className="mt-5 font-display text-5xl leading-tight md:text-8xl">
              {t('Choose the next step that matches your timing.', 'Elige el siguiente paso segun tu momento.')}
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-xl leading-8 text-[var(--ro-muted)]">
              {t(
                'Start with a short qualification form or book directly into the calendar when you are ready for a private strategy call.',
                'Empieza con un formulario corto de calificacion o agenda directamente cuando estes listo para una llamada privada de estrategia.',
              )}
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <article className="rounded-[2rem] border border-[var(--ro-ink)]/10 bg-white/72 p-6 shadow-[0_28px_90px_rgba(39,31,26,0.09)] backdrop-blur md:p-8">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow">{t('Qualification form', 'Formulario de calificacion')}</p>
                  <h3 className="mt-4 font-display text-4xl leading-tight">
                    {t('Share the brief.', 'Comparte el brief.')}
                  </h3>
                </div>
                <ClipboardCheck className="mt-1 shrink-0 text-[var(--ro-copper)]" size={30} />
              </div>
              <p className="mb-7 text-base leading-7 text-[var(--ro-muted)]">
                {t(
                  'Best for buyers, sellers, investors, and relocation inquiries that need context before scheduling.',
                  'Ideal para compradores, vendedores, inversores y relocation que necesitan contexto antes de agendar.',
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
                  {t('Open qualification form', 'Abrir formulario')}
                  <ArrowRight size={18} />
                </a>
              )}
            </article>

            <article className="rounded-[2rem] border border-[var(--ro-ink)]/10 bg-[var(--ro-ink)] p-6 text-[var(--ro-paper)] shadow-[0_28px_90px_rgba(39,31,26,0.16)] md:p-8">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow text-[#c9a864]">{t('Private calendar', 'Calendario privado')}</p>
                  <h3 className="mt-4 font-display text-4xl leading-tight text-white">
                    {t('Book strategy time.', 'Agenda estrategia.')}
                  </h3>
                </div>
                <CalendarDays className="mt-1 shrink-0 text-[#c9a864]" size={30} />
              </div>
              <p className="mb-7 text-base leading-7 text-white/68">
                {t(
                  'Best when the decision is active and you want a focused conversation about route, timing, and fit.',
                  'Ideal cuando la decision esta activa y quieres una conversacion enfocada sobre ruta, tiempos y encaje.',
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
                  {t('Open calendar', 'Abrir calendario')}
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

      <footer className="relative z-10 border-t border-[var(--ro-ink)]/8 bg-[var(--ro-ink)] px-5 py-10 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-white/55 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 md:flex-row">
          <span className="relative block h-16 w-20">
            <Image
              src="/brand/rog-logo-white.png"
              alt="Rangel Oviedo Group"
              fill
              sizes="80px"
              className="object-contain"
            />
          </span>
          <span>{t('Boutique Texas Real Estate', 'Boutique inmobiliaria en Texas')}</span>
          <span>{t('Texas + Mexico + LATAM', 'Texas + Mexico + LATAM')}</span>
          <span>{t('Forms and calendars powered by GoHighLevel', 'Formularios y calendarios via GoHighLevel')}</span>
        </div>
      </footer>
    </main>
  );
}

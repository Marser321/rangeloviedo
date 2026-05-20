'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Compass,
  Home,
  Landmark,
  MessageCircle,
  MoveRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import Navigation from './Navigation';
import HeroScrollytelling from './HeroScrollytelling';
import MidScrollytelling from './MidScrollytelling';
import HouseScrollytelling from './HouseScrollytelling';
import { LanguageProvider, useLanguage } from './LanguageContext';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_RANGEL_WHATSAPP ?? '';
const BASE_MESSAGE =
  'Hola Rangel, vi tu web y quiero una orientacion personalizada sobre real estate en Texas. Mi interes principal es:';

function whatsappLink(intent: string) {
  const text = encodeURIComponent(`${BASE_MESSAGE} ${intent}.`);
  return WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
    : `https://wa.me/?text=${text}`;
}

export default function ConciergeLanding() {
  const { language, t } = useLanguage();

  const methodSteps = [
    {
      step: '01',
      title: t('Diagnosis', 'Diagnóstico'),
      text: t('Rangel understands your starting point: capital, timing, family motivation, or investment thesis.', 'Rangel entiende tu punto de partida: capital, timing, motivo familiar o tesis de inversión.'),
    },
    {
      step: '02',
      title: t('Opportunity Map', 'Mapa de oportunidad'),
      text: t('We cross-reference zones, risk, capital appreciation, schools, rentals, and lifestyle to find the right path.', 'Se cruzan zonas, riesgo, plusvalía, escuelas, renta y estilo de vida para encontrar la ruta correcta.'),
    },
    {
      step: '03',
      title: t('Curated Selection', 'Selección curada'),
      text: t('Fewer random tours. Only options that make sense for your decision and your context.', 'Menos recorridos al azar. Solo opciones que tienen sentido para tu decisión y tu contexto.'),
    },
    {
      step: '04',
      title: t('Negotiation', 'Negociación'),
      text: t('Support in strategy, seller reading, and margin protection before closing.', 'Acompañamiento en estrategia, lectura del vendedor y protección del margen antes del cierre.'),
    },
    {
      step: '05',
      title: t('Post-Closing', 'Post-cierre'),
      text: t('The relationship continues: management, renting, improvements, future sale, or new acquisition.', 'La relación sigue: administración, renta, mejoras, venta futura o nueva adquisición.'),
    },
  ];

  const profiles = [
    {
      title: t('International Investor', 'Inversor internacional'),
      text: t('You want to enter Texas without buying on impulse or depending on loose listings.', 'Quieres entrar a Texas sin comprar por impulso ni depender de listados sueltos.'),
      icon: Landmark,
      intent: 'inversion internacional',
    },
    {
      title: t('Family Purchase', 'Compra familiar'),
      text: t('You are looking for a house, area, and future with a human reading of community, schools, and lifestyle rhythm.', 'Buscas casa, zona y futuro con una lectura humana de comunidad, escuelas y ritmo de vida.'),
      icon: Home,
      intent: 'compra familiar',
    },
    {
      title: t('Premium Seller', 'Vendedor premium'),
      text: t('You need to position a property with criteria, narrative, and the right buyers.', 'Necesitas posicionar una propiedad con criterio, narrativa y compradores correctos.'),
      icon: ShieldCheck,
      intent: 'venta premium',
    },
    {
      title: t('Relocation to Texas', 'Relocation a Texas'),
      text: t('You are evaluating moving and need to land decisions before visiting properties.', 'Estás evaluando moverte y necesitas aterrizar decisiones antes de visitar propiedades.'),
      icon: Compass,
      intent: 'relocation a Texas',
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
      {/* Dynamic Bilingual Glass Navigation */}
      <Navigation />

      {/* Hero Canvas Scrollytelling Sequence 1 */}
      <HeroScrollytelling />

      {/* Social proof marquee */}
      <section aria-label="Prueba social" className="overflow-hidden border-y border-[var(--ro-ink)]/8 bg-[var(--ro-ink)] text-[var(--ro-paper)] relative z-10">
        <div className="trust-marquee flex gap-14 py-5 text-[12px] font-bold uppercase tracking-[0.2em]">
          {[...Array(2)].flatMap((_, loop) =>
            [
              t('Texas market intelligence', 'Inteligencia de mercado en Texas'),
              t('Concierge WhatsApp', 'Concierge vía WhatsApp'),
              t('Off-market lens', 'Lente off-market'),
              t('Cultural bridge', 'Puente cultural'),
              t('Capital with context', 'Capital con contexto')
            ].map((item) => (
              <span key={`${loop}-${item}`} className="inline-flex shrink-0 items-center gap-4">
                <CheckCircle2 size={16} className="text-[#c9a864]" />
                {item}
              </span>
            )),
          )}
        </div>
      </section>

      {/* Method Section */}
      <section id="metodo" className="px-5 py-24 md:px-8 md:py-32 relative z-10">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="eyebrow">{t('The Rangel Method', 'El Método Rangel')}</p>
              <h2 className="mt-5 font-display text-5xl leading-tight md:text-7xl">
                {t('A real estate decision does not start with a house.', 'Una decisión inmobiliaria no empieza con una casa.')}
              </h2>
            </div>
            <p className="max-w-2xl text-xl leading-8 text-[var(--ro-muted)] lg:justify-self-end">
              {t('It starts with an honest conversation about capital, family, mobility, and risk. This horizontal rail is the roadmap.', 'Empieza con una conversación honesta sobre capital, familia, movilidad y riesgo. Esta tira horizontal es el mapa de trabajo.')}
            </p>
          </div>

          <div data-reveal className="horizontal-rail" aria-label={t('Method Steps', 'Etapas del Método Rangel')}>
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

      {/* House Editorial Walkthrough Scrollytelling Component */}
      <HouseScrollytelling />

      {/* Diagnostic Profiles Section */}
      <section id="perfiles" className="bg-white px-5 py-24 md:px-8 md:py-32 relative z-10">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="mb-14 max-w-3xl">
            <p className="eyebrow">{t('Diagnosis by profile', 'Diagnóstico por perfil')}</p>
            <h2 className="mt-5 font-display text-5xl leading-tight md:text-7xl">
              {t('Tell me what you are trying to solve and I\'ll tell you where to begin.', 'Dime qué estás intentando resolver y te digo por dónde empezar.')}
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
                  <a href={whatsappLink(profile.intent)} target="_blank" rel="noreferrer" className="profile-link">
                    {t('Inquire via WhatsApp', 'Consultar por WhatsApp')}
                    <ArrowRight size={16} />
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mid-Page Canvas Scrollytelling Sequence 2 (Texas Market Layers) */}
      <MidScrollytelling />

      {/* Roots & Criterion Section */}
      <section className="bg-[var(--ro-ink)] px-5 py-24 text-[var(--ro-paper)] md:px-8 md:py-32 relative z-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div data-reveal>
            <p className="eyebrow text-[#c9a864]">{t('Roots + criterion', 'Raíces + criterio')}</p>
            <h2 className="mt-5 font-display text-5xl leading-tight md:text-7xl text-white">
              {t('A cultural bridge for major decisions.', 'Un puente cultural para decisiones grandes.')}
            </h2>
            <p className="mt-8 max-w-2xl text-xl leading-8 text-white/68">
              {t('Rangel and Desire bring a rare mix to the experience: youth energy, human understanding, and deep respect for the capital a family decides to put in motion.', 'Rangel y Desire le dan a la experiencia una mezcla poco común: energía joven, lectura humana y respeto por el capital que una familia decide poner en movimiento.')}
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

      {/* Contact Section */}
      <section id="contacto" className="relative px-5 py-24 md:px-8 md:py-32 z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(169,105,55,0.18),transparent_32%)]" />
        <div data-reveal className="relative mx-auto max-w-5xl text-center">
          <p className="eyebrow justify-center">{t('Next Step', 'Siguiente paso')}</p>
          <h2 className="mt-5 font-display text-5xl leading-tight md:text-8xl">
            {t('Before buying, talk with someone who understands your context.', 'Antes de comprar, conversa con alguien que lea tu contexto.')}
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-xl leading-8 text-[var(--ro-muted)]">
            {t('Send a WhatsApp with your primary interest. Rangel can guide you on route, timing, and opportunity level before opening a listing.', 'Envía un WhatsApp con tu interés principal. Rangel puede orientarte sobre ruta, timing y nivel de oportunidad antes de abrir un listado.')}
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a className="btn btn-copper" href={whatsappLink('consulta inicial')} target="_blank" rel="noreferrer">
              {t('Write to Rangel', 'Escribir a Rangel')}
              <MessageCircle size={19} />
            </a>
            <a className="btn btn-ghost" href={whatsappLink('agendar una llamada cuando este disponible')} target="_blank" rel="noreferrer">
              {t('Request schedule', 'Pedir agenda')}
              <CalendarDays size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--ro-ink)]/8 px-5 py-10 text-center text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--ro-muted)] md:px-8 relative z-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <span>Rangel Oviedo Group</span>
          <span>{t('Texas Real Estate Concierge', 'Texas Real Estate Concierge')}</span>
          <span>{t('WhatsApp-first conversion', 'Conversión vía WhatsApp')}</span>
        </div>
      </footer>
    </main>
  );
}


'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight, CalendarDays, CheckCircle2, MessageCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import CulturalIdentity from '@/components/CulturalIdentity';
import MarketThesis from '@/components/MarketThesis';
import Footer from '@/components/Footer';
import { useLanguage } from '@/components/LanguageContext';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_RANGEL_WHATSAPP ?? '';
const GHL_CALENDAR_URL = process.env.NEXT_PUBLIC_GHL_CALENDAR_URL ?? '';
const GHL_CALENDAR_EMBED_URL = process.env.NEXT_PUBLIC_GHL_CALENDAR_EMBED_URL ?? '';

const BASE_MESSAGE =
  'Hola Rangel, vi tu página de CEO y quiero coordinar una sesión estratégica contigo.';

function whatsappLink() {
  const text = encodeURIComponent(BASE_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export default function CEOPage() {
  const { t } = useLanguage();
  const calendarHref = GHL_CALENDAR_URL || '#contacto-ceo';
  const whatsappHref = WHATSAPP_NUMBER ? whatsappLink() : '';

  return (
    <main id="main-content" className="min-h-screen bg-[var(--ro-paper)] text-[var(--ro-ink)]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-28 overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 md:px-8 relative z-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Title & Vision Column */}
            <div className="lg:col-span-7 space-y-6">
              <span className="eyebrow">{t('Managing Director & Founder', 'Director General y Fundador')}</span>
              <h1 className="font-display text-5xl md:text-8xl leading-none text-ro-dark font-extrabold tracking-tight">
                Rangel <span className="font-black italic text-ro-accent">Oviedo</span>
              </h1>
              <h3 className="text-xl md:text-3xl font-display italic text-ro-muted font-normal max-w-2xl leading-relaxed">
                {t(
                  '"Texas real estate is not just about transactions; it is the ultimate vehicle for family legacy and wealth preservation."',
                  '"Los bienes raíces en Texas no son solo transacciones; son el vehículo definitivo para el legado familiar y la preservación del patrimonio."'
                )}
              </h3>
              
              <div className="h-px w-24 bg-ro-accent/30 my-8" />
              
              <div className="space-y-6 text-base md:text-lg text-[var(--ro-muted)] leading-relaxed max-w-2xl font-light">
                <p>
                  {t(
                    'As the founder of Rangel Oviedo Group, Rangel represents a new breed of real estate advisor. Educated with both financial modeling precision and a deep respect for LATAM family structures, he bridges the gap between high-ticket Mexican/Latin capital and the complex Texas housing market.',
                    'Como fundador de Rangel Oviedo Group, Rangel representa una nueva generación de asesores inmobiliarios. Educado con la precisión del modelado financiero y un profundo respeto por las estructuras familiares latinoamericanas, actúa como puente entre el capital de alto nivel y el complejo mercado inmobiliario de Texas.'
                  )}
                </p>
                <p>
                  {t(
                    'Personally accountable for every strategic brief, Rangel operates under a strict mandate of absolute privacy, sourcing off-market luxury listings and structuring tax-efficient acquisitions that traditional brokerages fail to identify.',
                    'Responsable personal de cada estrategia, Rangel opera bajo un mandato estricto de privacidad absoluta, localizando oportunidades fuera del mercado de lujo y estructurando adquisiciones fiscalmente eficientes que las corredurías tradicionales no logran identificar.'
                  )}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <a href="#contacto-ceo" className="btn btn-copper">
                  {t('Book Strategy Session', 'Agendar Sesión Estratégica')}
                  <CalendarDays size={16} />
                </a>
                {whatsappHref && (
                  <a href={whatsappHref} target="_blank" rel="noreferrer" className="btn btn-ghost">
                    {t('Direct WhatsApp', 'WhatsApp Directo')}
                    <MessageCircle size={16} />
                  </a>
                )}
              </div>
            </div>

            {/* Profile Image Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] border border-ro-dark/10 shadow-[0_35px_90px_rgba(0,0,0,0.18)]">
                <Image
                  src="/rog/ceo-rangel-my9a3487.jpg"
                  alt={t('Rangel Oviedo, Managing Director & Founder', 'Rangel Oviedo, Director General y Fundador')}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  className="object-cover object-[50%_28%]"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-ro-accent/8 rounded-full blur-2xl -z-10" />
            </div>

          </div>
        </div>
      </section>

      {/* Cultural Identity Bridge Section */}
      <CulturalIdentity />

      {/* Market Thesis Section */}
      <MarketThesis />

      {/* Core Values Section */}
      <section className="py-20 md:py-28 px-5 md:px-8 bg-[var(--ro-dark)] text-white relative z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_20%_20%,#c9a864_0%,transparent_50%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16 max-w-3xl">
            <p className="eyebrow text-[#c9a864]">{t('Founding Principles', 'Principios Fundacionales')}</p>
            <h2 className="mt-4 font-display text-4xl leading-tight md:text-6xl text-white">
              {t('A standard of practice defined by accountability.', 'Un estándar de práctica definido por la responsabilidad.')}
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: t('Absolute Accountability', 'Responsabilidad Absoluta'),
                desc: t(
                  'We do not delegate client relationships. Rangel Oviedo personally designs the acquisitions layout and guides negotiations, providing a single point of accountability.',
                  'No delegamos las relaciones con los clientes. Rangel Oviedo diseña personalmente el plan de adquisición y guía las negociaciones, brindando un único punto de contacto responsable.'
                ),
              },
              {
                title: t('Bilingual & Bicultural Logic', 'Lógica Bilingüe y Bicultural'),
                desc: t(
                  'We understand that moving capital or families to Texas requires translating more than words. We navigate the cultural nuances of Mexican/LATAM structures and local Texas rules.',
                  'Entendemos que trasladar capital o familias a Texas requiere traducir algo más que palabras. Navegamos por los matices culturales de las estructuras de México/LATAM y las normas locales de Texas.'
                ),
              },
              {
                title: t('Off-Market Priority', 'Prioridad Fuera de Mercado'),
                desc: t(
                  'A significant portion of premium Texas inventory changes hands without ever hitting public listings. We deploy our network to source secure, private, off-market opportunities.',
                  'Una parte importante del inventario premium de Texas cambia de manos sin llegar a los listados públicos. Desplegamos nuestra red para asegurar oportunidades privadas fuera del mercado.'
                ),
              },
            ].map((v, i) => (
              <div key={i} className="p-8 md:p-10 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-sm space-y-4">
                <div className="flex items-center gap-3 text-[#c9a864]">
                  <CheckCircle2 size={20} />
                  <h4 className="text-xl font-display font-bold text-white">{v.title}</h4>
                </div>
                <p className="text-sm leading-relaxed text-stone-300 font-light">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Scheduling Page Section */}
      <section id="contacto-ceo" className="relative px-5 py-20 md:px-8 md:py-28 z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(169,105,55,0.14),transparent_40%)]" />
        <div className="mx-auto max-w-5xl relative">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="eyebrow justify-center">{t('Direct Strategy Booking', 'Reserva de Estrategia Directa')}</p>
            <h2 className="mt-4 font-display text-4xl leading-tight md:text-7xl">
              {t('Schedule a private talk with Rangel.', 'Agenda una charla privada con Rangel.')}
            </h2>
            <p className="mt-6 text-lg text-[var(--ro-muted)] leading-relaxed font-light">
              {t(
                'Discuss your Texas real estate strategy, tax concerns, family relocation logistics, or capital preservation goals directly with the founder.',
                'Conversa sobre tu estrategia inmobiliaria en Texas, dudas fiscales, mudanza familiar o preservación de capital directamente con el fundador.'
              )}
            </p>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-ro-dark/10 p-6 md:p-10 shadow-[0_28px_90px_rgba(39,31,26,0.08)]">
            <div className="flex items-start justify-between gap-4 mb-8">
              <div>
                <p className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-ro-accent">{t('Private Calendar Link', 'Calendario Privado')}</p>
                <h3 className="mt-2 font-display text-3xl md:text-4xl leading-tight">
                  {t('Direct Consultation Calendar', 'Calendario de Consulta Directa')}
                </h3>
              </div>
              <CalendarDays className="text-ro-accent shrink-0 mt-1" size={28} />
            </div>
            
            {GHL_CALENDAR_EMBED_URL ? (
              <iframe
                src={GHL_CALENDAR_EMBED_URL}
                title="Rangel Oviedo direct strategic booking calendar"
                className="h-[560px] w-full rounded-2xl border border-[var(--ro-ink)]/10 bg-white"
                loading="lazy"
              />
            ) : (
              <div className="text-center py-10 space-y-6">
                <p className="text-sm text-ro-muted">
                  {t(
                    'Access the strategic calendar directly to view available consultation slots.',
                    'Accede al calendario estratégico directamente para ver los horarios de consulta disponibles.'
                  )}
                </p>
                <a className="btn btn-copper inline-flex" href={calendarHref} target="_blank" rel="noreferrer">
                  {t('Open Strategic Calendar', 'Abrir Calendario Estratégico')}
                  <ArrowRight size={18} />
                </a>
              </div>
            )}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

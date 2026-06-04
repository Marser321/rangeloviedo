'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Compass, ShieldCheck, Globe, Users, CheckCircle2 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import ProcessGuide from '@/components/ProcessGuide';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import { useLanguage } from '@/components/LanguageContext';

export default function TeamPage() {
  const { t } = useLanguage();

  const team = [
    {
      name: 'Rangel Oviedo',
      role: t('Founder & Managing Director', 'Fundador y Director General'),
      specialty: t('Strategy & Negotiation', 'Estrategia y Negociación'),
      bio: t(
        'Texas market specialist personally responsible for structuring investment portfolios, conducting strategic diagnostic interviews, and leading high-value acquisitions.',
        'Especialista en el mercado de Texas. Responsable de estructurar portafolios de inversión, realizar diagnósticos estratégicos y liderar negociaciones de alto valor.'
      ),
      image: '/rog/ceo-rangel-my9a3487.jpg',
      icon: <Globe size={16} />
    },
    {
      name: 'Sofia Rangel',
      role: t('Director of International Concierge', 'Directora de Concierge Internacional'),
      specialty: t('LATAM-Texas Relocation Bridge', 'Puente de Relocalización LATAM-Texas'),
      bio: t(
        'Coordinates transition logistics for Mexican and Latin American families, specializing in elite school district onboarding, community selection, and lifestyle integration.',
        'Coordina la logística de transición para familias de México y Latinoamérica. Especialista en la selección de distritos escolares de élite e integración comunitaria.'
      ),
      image: '/rog/sofia-rangel.png',
      icon: <Users size={16} />
    },
    {
      name: 'Marcus Vance',
      role: t('Head of Texas Acquisitions', 'Director de Adquisiciones en Texas'),
      specialty: t('Off-Market Sourcing & Intelligence', 'Búsqueda y Análisis Off-Market'),
      bio: t(
        'Leverages deep local networks across Houston and Austin to source private listings and off-market inventory before they reach public databases.',
        'Aprovecha redes locales en Houston y Austin para localizar propiedades privadas y listados fuera del mercado antes de que lleguen a bases de datos públicas.'
      ),
      image: '/rog/marcus-vance.png',
      icon: <Compass size={16} />
    },
    {
      name: 'Elena Garza',
      role: t('Escrow & Client Relations Coordinator', 'Coordinadora de Escrow y Relaciones'),
      specialty: t('Bilingual Transaction Coordination', 'Coordinación Transaccional Bilingüe'),
      bio: t(
        'Manages administrative flow, title company coordination, and legal bridge documentation for LATAM clients, ensuring transaction safety and compliance.',
        'Gestiona el flujo administrativo, la coordinación con compañías de títulos y la documentación legal para clientes de LATAM, garantizando la seguridad transaccional.'
      ),
      image: '/rog/elena-garza.png',
      icon: <ShieldCheck size={16} />
    },
    {
      name: 'Alejandro Ruiz',
      role: t('Senior Financial Analyst', 'Analista Financiero Senior'),
      specialty: t('ROI Feasibility & Tax Abatement', 'Análisis de Viabilidad y Beneficios Fiscales'),
      bio: t(
        'Executes cash flow projections, tax valuation models, and local school district property tax abatement audits to protect investor yields.',
        'Realiza proyecciones de flujo de caja, modelos de valoración fiscal y auditorías de impuestos prediales locales para proteger los rendimientos del inversor.'
      ),
      image: '/rog/alejandro-ruiz.png',
      icon: <CheckCircle2 size={16} />
    }
  ];

  return (
    <main id="main-content" className="min-h-screen bg-[var(--ro-paper)] text-[var(--ro-ink)]">
      <Navigation />

      {/* Header section */}
      <section className="relative pt-36 pb-12 md:pt-48 md:pb-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 md:px-8 text-center relative z-10">
          <span className="eyebrow justify-center">{t('Elite Practice', 'Práctica de Élite')}</span>
          <h1 className="mt-6 font-display text-5xl md:text-8xl leading-none text-ro-dark font-extrabold tracking-tight max-w-4xl mx-auto">
            {t('The Advisory &', 'El Equipo Consultor')} <br />
            <span className="font-black italic text-ro-accent">{t('Concierge Team', 'y Concierge')}</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-[var(--ro-muted)] leading-relaxed max-w-2xl mx-auto font-light">
            {t(
              'A dedicated group of bilingual real estate, financial, and logistics specialists translating Texas property mechanics into secure family legacies.',
              'Un grupo especializado de profesionales bilingües en finanzas, logística y bienes raíces dedicado a traducir el mercado de Texas en legados familiares seguros.'
            )}
          </p>
        </div>
      </section>

      {/* Team Grid section */}
      <section className="pb-24 px-5 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-ro-dark/10 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between group h-full"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 30vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  <div className="p-8 space-y-4">
                    <div className="flex items-center gap-2 text-ro-accent">
                      {member.icon}
                      <span className="text-[9px] uppercase font-bold tracking-[0.2em]">{member.specialty}</span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-2xl font-display font-bold text-ro-dark">{member.name}</h3>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-ro-muted">{member.role}</p>
                    </div>
                    <p className="text-sm leading-relaxed text-ro-dark/70 font-light pt-2">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Guide */}
      <ProcessGuide />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* Call to Action */}
      <section className="relative px-5 py-20 md:px-8 md:py-28 z-10 overflow-hidden bg-ro-dark text-ro-light mx-2 md:mx-4 rounded-[2rem] md:rounded-[5rem] shadow-xl mb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(169,105,55,0.15),transparent_40%)] pointer-events-none" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="eyebrow justify-center text-ro-accent">{t('Direct Strategic Contact', 'Contacto Estratégico Directo')}</p>
          <h2 className="mt-4 font-display text-4xl leading-tight md:text-7xl text-white">
            {t('Ready to align your goals?', '¿Listo para alinear sus metas?')}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-stone-300 font-light">
            {t(
              'Coordinate an initial strategic conversation with Rangel Oviedo and our core team to design your personalized acquisitions roadmap.',
              'Coordine una conversación inicial de estrategia con Rangel Oviedo y nuestro equipo central para diseñar su ruta de adquisición personalizada.'
            )}
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link className="btn btn-copper" href="/#contacto">
              {t('Consult the Advisor', 'Consultar al Asesor')}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

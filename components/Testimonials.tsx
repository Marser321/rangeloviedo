'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Star, ArrowUpRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { siteConfig } from '@/lib/site-config';

/**
 * Prueba social REAL basada en las 45 reseñas Google 5★ del agente (verificable).
 * No se inventan testimonios. Para sumar 2-3 citas reales (con consentimiento),
 * pegarlas en `quotes` con nombre y rol verdaderos; si está vacío, se muestra
 * solo el bloque de rating + enlace al perfil.
 */
const quotes: { name: string; role: { en: string; es: string }; content: { en: string; es: string } }[] = [
  // { name: 'Nombre real', role: { en: '...', es: '...' }, content: { en: '...', es: '...' } },
];

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section className="ro-bg-section py-20 md:py-32 px-5 md:px-8 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <h6 className="text-ro-accent font-black uppercase tracking-[0.4em] text-[10px]">
          {t('Verified reviews', 'Reseñas verificadas')}
        </h6>
        <h2 className="mt-4 text-4xl md:text-7xl font-display text-ro-dark">
          {t('45 clients,', '45 clientes,')} <br />
          <span className="italic font-normal">{t('five stars.', 'cinco estrellas.')}</span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="ro-bg-surface mx-auto mt-12 max-w-xl rounded-[2.5rem] p-8 md:p-12 shadow-xl"
        >
          <div className="flex justify-center gap-1 text-ro-accent">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={22} fill="currentColor" />
            ))}
          </div>
          <p className="mt-6 font-display text-6xl md:text-7xl text-ro-dark">5.0</p>
          <p className="mt-3 text-[11px] font-black uppercase tracking-[0.2em] text-ro-dark/60">
            {t('45 verified reviews on Google', '45 reseñas verificadas en Google')}
          </p>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed font-light italic text-ro-dark/65">
            {t(
              'Families and investors across Texas and Latin America trust Rangel with the move that matters most.',
              'Familias e inversores de Texas y Latinoamérica confían a Rangel la decisión que más importa.',
            )}
          </p>
          <a
            href={siteConfig.har.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-copper mt-8 inline-flex"
          >
            {t('Read the reviews', 'Leer las reseñas')}
            <ArrowUpRight size={16} />
          </a>
        </motion.div>

        {quotes.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {quotes.map((q) => (
              <figure key={q.name} className="ro-bg-surface rounded-[2rem] p-7 text-left shadow-sm">
                <div className="flex text-ro-accent">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={13} fill="currentColor" />
                  ))}
                </div>
                <blockquote className="mt-5 font-display text-lg italic leading-relaxed text-ro-dark">
                  &ldquo;{t(q.content.en, q.content.es)}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-ro-dark/5 pt-5">
                  <span className="block text-sm font-bold uppercase tracking-wider text-ro-dark">{q.name}</span>
                  <span className="mt-1 block text-[10px] font-black uppercase tracking-widest italic text-ro-accent/60">
                    {t(q.role.en, q.role.es)}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

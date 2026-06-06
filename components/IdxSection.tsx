'use client';

import React from 'react';
import HarIdxWidget from './HarIdxWidget';

/**
 * Banda "Descenso a la luz": envuelve un widget IDX de HAR (iframe claro) en una
 * sección con gradiente de marca oscuro → cobre/arena → casi blanco, con glows
 * difuminados. El iframe (vitrina casi blanca) se asienta en la base luminosa,
 * integrándose con la estética "Lujo Latino" en vez de verse como una caja blanca.
 */
export default function IdxSection({
  id,
  eyebrow,
  title,
  description,
  src,
  titleAs = 'h2',
  placeholderEyebrow,
  placeholderTitle,
  placeholderDescription,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  src?: string;
  titleAs?: 'h1' | 'h2';
  placeholderEyebrow?: string;
  placeholderTitle?: string;
  placeholderDescription?: string;
}) {
  const Title = titleAs;

  return (
    <section id={id} className="mx-2 my-8 md:mx-4 md:my-12">
      <div
        className="relative overflow-hidden rounded-[2rem] px-5 pt-12 pb-8 md:rounded-[3.5rem] md:px-14 md:pt-16 md:pb-12"
        style={{
          backgroundImage:
            'linear-gradient(180deg, #1b1510 0%, #2a201a 16%, #5e4830 38%, #b89a6e 56%, var(--ro-paper) 78%, #fffdf9 100%)',
        }}
      >
        {/* Glows difuminados elegantes (cobre + oro) */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -left-20 top-4 h-72 w-72 rounded-full blur-[120px]"
            style={{ backgroundColor: 'rgba(162,96,53,0.38)' }}
          />
          <div
            className="absolute -right-16 top-28 h-80 w-80 rounded-full blur-[140px]"
            style={{ backgroundColor: 'rgba(212,177,111,0.30)' }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <span className="eyebrow" style={{ color: 'var(--ro-gold)' }}>
            {eyebrow}
          </span>
          <Title className="mt-5 max-w-3xl font-display text-4xl leading-[1.05] text-[var(--ro-light)] md:text-6xl">
            {title}
          </Title>
          <p
            className="mt-6 max-w-2xl text-base font-light leading-8 md:text-lg"
            style={{ color: 'rgba(246,240,232,0.74)' }}
          >
            {description}
          </p>

          <div className="mt-12 md:mt-16">
            <HarIdxWidget
              src={src}
              eyebrow={placeholderEyebrow}
              title={placeholderTitle}
              description={placeholderDescription}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

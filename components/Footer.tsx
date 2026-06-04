'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from './LanguageContext';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_RANGEL_WHATSAPP ?? '';
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_RANGEL_EMAIL ?? '';
const CONTACT_PHONE = process.env.NEXT_PUBLIC_RANGEL_PHONE ?? '';

const BASE_MESSAGE =
  'Hola Rangel, vi tu web y quiero una orientación personalizada sobre real estate en Texas. Mi interés principal es:';

function whatsappLink(intent: string) {
  const text = encodeURIComponent(`${BASE_MESSAGE} ${intent}.`);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export default function Footer() {
  const { t } = useLanguage();
  const whatsappHref = WHATSAPP_NUMBER ? whatsappLink('consulta inicial') : '';

  return (
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
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-center">
            {t('Private Texas Real Estate', 'Inmobiliaria privada en Texas')}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-center">
            {t('Texas + Mexico + LATAM', 'Texas + México + LATAM')}
          </span>
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
          <span className="tracking-[0.18em]">
            © {new Date().getFullYear()} Rangel <span className="font-black">Oviedo</span> Group
          </span>
          <a
            href="https://admediasolution.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="AD Media Solution"
            className="transition-colors hover:text-[#c9a864]"
          >
            {t('Created by AD Media Solution', 'Creado por AD Media Solution')}
          </a>
        </div>
      </div>
    </footer>
  );
}

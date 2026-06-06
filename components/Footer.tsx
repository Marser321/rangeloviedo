'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
  const menuItems = [
    { labelEn: 'Home', labelEs: 'Inicio', href: '/' },
    { labelEn: 'CEO', labelEs: 'CEO', href: '/ceo' },
    { labelEn: 'Properties', labelEs: 'Propiedades', href: '/propiedades' },
    { labelEn: 'Search', labelEs: 'Buscar', href: '/buscar' },
    { labelEn: 'Team', labelEs: 'Equipo', href: '/equipo' },
  ];

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[var(--ro-ink)] px-5 py-6 text-white/58 md:px-8 md:py-7">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <div className="grid items-center gap-5 border-b border-white/10 pb-5 lg:grid-cols-[minmax(220px,1fr)_auto_minmax(220px,1fr)]">
          <Link href="/" className="flex items-center justify-center gap-3 text-center lg:justify-start lg:text-left">
            <span className="relative block h-11 w-16 shrink-0">
              <Image
                src="/brand/rog-logo-white.png"
                alt="Rangel Oviedo Group"
                fill
                sizes="64px"
                className="object-contain"
              />
            </span>
            <span className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.22em] text-white">
                Rangel Oviedo Group
              </span>
              <span className="mt-1 text-[8px] font-bold uppercase tracking-[0.24em] text-white/42">
                {t('Private Texas Real Estate', 'Inmobiliaria privada en Texas')}
              </span>
            </span>
          </Link>

          <nav
            aria-label={t('Footer navigation', 'Navegación del footer')}
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[9px] font-black uppercase tracking-[0.18em]"
          >
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-[#d4b16f]">
                {t(item.labelEn, item.labelEs)}
              </Link>
            ))}
            <Link href="/#contacto" className="text-[#d4b16f] transition-colors hover:text-white">
              {t('Book a consultation', 'Agenda tu asesoría')}
            </Link>
          </nav>

          <span className="text-center text-[9px] font-bold uppercase tracking-[0.24em] text-white/42 lg:text-right">
            {t('Texas · clients from Mexico & Latin America', 'Texas · clientes de México y Latinoamérica')}
          </span>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {(CONTACT_EMAIL || CONTACT_PHONE || WHATSAPP_NUMBER) ? (
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[9px] font-bold uppercase tracking-[0.18em] md:justify-start">
              {CONTACT_EMAIL && (
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="transition-colors hover:text-[#d4b16f]"
                  aria-label={t('Send email', 'Enviar correo')}
                >
                  {CONTACT_EMAIL}
                </a>
              )}
              {CONTACT_PHONE && (
                <a
                  href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, '')}`}
                  className="transition-colors hover:text-[#d4b16f]"
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
                  className="transition-colors hover:text-[#d4b16f]"
                >
                  WhatsApp
                </a>
              )}
            </div>
          ) : (
            <span className="text-center text-[9px] font-bold uppercase tracking-[0.2em] text-white/38 md:text-left">
              {t('Private Texas Real Estate', 'Inmobiliaria privada en Texas')}
            </span>
          )}

          <div className="flex flex-col items-center gap-2 text-center text-[9px] font-bold uppercase tracking-[0.18em] md:flex-row md:gap-5 md:text-right">
            <span>
              © {new Date().getFullYear()} Rangel <span className="font-black text-white/72">Oviedo</span> Group
            </span>
            <a
              href="https://admediasolution.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AD Media Solution"
              className="transition-colors hover:text-[#d4b16f]"
            >
              {t('Created by AD Media Solution', 'Creado por AD Media Solution')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

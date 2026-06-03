'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { Globe, Menu, X } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function Navigation() {
  const { scrollY } = useScroll();
  const navHeight = useTransform(scrollY, [0, 100], ['112px', '78px']);
  const navBg = useTransform(scrollY, [0, 100], ['rgba(255, 255, 255, 0.72)', 'rgba(255, 255, 255, 0.9)']);
  const navBorder = useTransform(scrollY, [0, 100], ['rgba(45, 36, 33, 0.08)', 'rgba(45, 36, 33, 0.07)']);

  const { language, setLanguage, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { labelEn: 'Method', labelEs: 'Método', href: '#metodo' },
    { labelEn: 'Tour 360°', labelEs: 'Tour 360°', href: '#tour-360' },
    { labelEn: 'Profiles', labelEs: 'Perfiles', href: '#perfiles' },
    { labelEn: 'Market', labelEs: 'Mercado', href: '#mercado' },
    { labelEn: 'Apply', labelEs: 'Aplicar', href: '#contacto' },
  ];

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <motion.nav
      style={{ height: navHeight }}
      className="fixed top-0 z-[100] flex w-full items-center px-4 transition-all duration-500 md:px-8"
    >
      <motion.div
        style={{ backgroundColor: navBg, borderColor: navBorder }}
        className="mx-auto flex w-[calc(100vw-2.5rem)] max-w-7xl items-center justify-between gap-3 overflow-hidden rounded-[2.5rem] border px-4 py-3 shadow-sm backdrop-blur-xl md:w-full md:gap-4 md:px-8 md:py-4"
      >
        <button
          type="button"
          className="group flex min-w-0 items-center gap-3 text-left"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Rangel Oviedo Group home"
        >
          <span className="relative block h-10 w-14 shrink-0 md:h-14 md:w-20">
            <Image
              src="/brand/rog-logo-gold.png"
              alt="Rangel Oviedo Group"
              fill
              priority
              sizes="(max-width: 768px) 64px, 80px"
              className="object-contain"
            />
          </span>
          <span className="hidden min-w-0 flex-col sm:flex">
            <span className="text-[11px] font-sans font-bold uppercase tracking-[0.18em] text-ro-dark transition-colors group-hover:text-ro-accent md:text-xs">
              Rangel <span className="font-black">Oviedo</span> Group
            </span>
            <span className="text-[8px] uppercase tracking-[0.28em] opacity-55 transition-opacity group-hover:opacity-100 md:text-[9px]">
              {t('Private Texas Real Estate', 'Inmobiliaria privada en Texas')}
            </span>
          </span>
        </button>

        <div className="hidden items-center space-x-8 lg:flex">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group/link relative text-[10px] font-bold uppercase tracking-widest transition-colors hover:text-ro-accent"
            >
              {t(item.labelEn, item.labelEs)}
              <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-ro-accent transition-all group-hover/link:w-full" />
            </a>
          ))}

          <div className="flex items-center gap-2 rounded-full border border-ro-dark/10 bg-ro-dark/5 px-3 py-1.5 text-[10px] font-bold tracking-wider">
            <Globe size={12} className="text-ro-dark/40" aria-hidden="true" />
            <button
              type="button"
              onClick={() => setLanguage('en')}
              aria-label="Switch to English"
              aria-pressed={language === 'en'}
              className={`uppercase transition-colors hover:text-ro-accent ${language === 'en' ? 'font-extrabold text-ro-accent' : 'font-normal text-ro-dark/50'}`}
            >
              EN
            </button>
            <span aria-hidden="true" className="font-light text-ro-dark/20">|</span>
            <button
              type="button"
              onClick={() => setLanguage('es')}
              aria-label="Cambiar a Español"
              aria-pressed={language === 'es'}
              className={`uppercase transition-colors hover:text-ro-accent ${language === 'es' ? 'font-extrabold text-ro-accent' : 'font-normal text-ro-dark/50'}`}
            >
              ES
            </button>
          </div>

          <a
            href="#contacto"
            className="rounded-2xl bg-ro-dark px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-ro-light shadow-md transition-all hover:scale-105 hover:bg-ro-accent"
          >
            {t('Apply / Book', 'Aplicar / Agenda')}
          </a>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <div className="flex items-center gap-1.5 rounded-full border border-ro-dark/10 bg-ro-dark/5 px-2.5 py-1 text-[9px] font-bold">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              aria-label="Switch to English"
              aria-pressed={language === 'en'}
              className={`transition-colors ${language === 'en' ? 'font-extrabold text-ro-accent' : 'text-ro-dark/40'}`}
            >
              EN
            </button>
            <span aria-hidden="true" className="text-ro-dark/20">|</span>
            <button
              type="button"
              onClick={() => setLanguage('es')}
              aria-label="Cambiar a Español"
              aria-pressed={language === 'es'}
              className={`transition-colors ${language === 'es' ? 'font-extrabold text-ro-accent' : 'text-ro-dark/40'}`}
            >
              ES
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? t('Close menu', 'Cerrar menú') : t('Open menu', 'Abrir menú')}
            aria-expanded={mobileOpen}
            aria-controls="rog-mobile-drawer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ro-dark/10 bg-ro-dark/5 text-ro-dark transition-colors hover:bg-ro-dark hover:text-ro-light"
          >
            {mobileOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </motion.div>

      <div
        id="rog-mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={t('Site navigation', 'Navegación del sitio')}
        className={`fixed inset-0 top-0 z-[90] flex flex-col bg-ro-light/98 backdrop-blur-2xl transition-opacity duration-300 lg:hidden ${
          mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <button
          type="button"
          aria-label={t('Close menu overlay', 'Cerrar overlay del menú')}
          onClick={closeMobile}
          className="absolute inset-0 h-full w-full cursor-default"
          tabIndex={-1}
        />
        <nav className="relative mt-32 flex flex-col gap-2 px-8 pb-12">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMobile}
              className="group flex items-center justify-between border-b border-ro-dark/10 py-5 text-2xl font-display tracking-tight text-ro-dark transition-colors hover:text-ro-accent"
            >
              {t(item.labelEn, item.labelEs)}
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-ro-dark/30 transition-colors group-hover:text-ro-accent">
                →
              </span>
            </a>
          ))}
          <a
            href="#contacto"
            onClick={closeMobile}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-ro-dark px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-ro-light shadow-md transition-all hover:bg-ro-accent"
          >
            {t('Apply / Book', 'Aplicar / Agenda')}
          </a>
          <p className="mt-10 text-[10px] font-bold uppercase tracking-[0.3em] text-ro-dark/40">
            {t('Private Texas Real Estate', 'Inmobiliaria privada en Texas')}
          </p>
        </nav>
      </div>
    </motion.nav>
  );
}

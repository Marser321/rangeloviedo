'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { Globe } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function Navigation() {
  const { scrollY } = useScroll();
  const navHeight = useTransform(scrollY, [0, 100], ['112px', '78px']);
  const navBg = useTransform(scrollY, [0, 100], ['rgba(255, 255, 255, 0.72)', 'rgba(255, 255, 255, 0.9)']);
  const navBorder = useTransform(scrollY, [0, 100], ['rgba(45, 36, 33, 0.08)', 'rgba(45, 36, 33, 0.07)']);

  const { language, setLanguage, t } = useLanguage();

  const menuItems = [
    { labelEn: 'Method', labelEs: 'Metodo', href: '#metodo' },
    { labelEn: 'Profiles', labelEs: 'Perfiles', href: '#perfiles' },
    { labelEn: 'Market', labelEs: 'Mercado', href: '#mercado' },
    { labelEn: 'Apply', labelEs: 'Aplicar', href: '#contacto' },
  ];

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
            <span className="text-sm font-display italic font-bold tracking-tight text-ro-dark transition-colors group-hover:text-ro-accent md:text-base">
              Rangel Oviedo Group
            </span>
            <span className="text-[8px] uppercase tracking-[0.28em] opacity-55 transition-opacity group-hover:opacity-100 md:text-[9px]">
              {t('Boutique Texas Real Estate', 'Boutique inmobiliaria en Texas')}
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
            <Globe size={12} className="text-ro-dark/40" />
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`uppercase transition-colors hover:text-ro-accent ${language === 'en' ? 'font-extrabold text-ro-accent' : 'font-normal text-ro-dark/50'}`}
            >
              EN
            </button>
            <span className="font-light text-ro-dark/20">|</span>
            <button
              type="button"
              onClick={() => setLanguage('es')}
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
              className={`transition-colors ${language === 'en' ? 'font-extrabold text-ro-accent' : 'text-ro-dark/40'}`}
            >
              EN
            </button>
            <span className="text-ro-dark/20">|</span>
            <button
              type="button"
              onClick={() => setLanguage('es')}
              className={`transition-colors ${language === 'es' ? 'font-extrabold text-ro-accent' : 'text-ro-dark/40'}`}
            >
              ES
            </button>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}

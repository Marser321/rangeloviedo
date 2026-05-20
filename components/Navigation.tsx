'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { Globe } from 'lucide-react';

export default function Navigation() {
  const { scrollY } = useScroll();
  const navHeight = useTransform(scrollY, [0, 100], ["120px", "80px"]);
  const navBg = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.82)"]);
  const navBorder = useTransform(scrollY, [0, 100], ["rgba(45, 36, 33, 0)", "rgba(45, 36, 33, 0.06)"]);

  const { language, setLanguage, t } = useLanguage();

  const menuItems = [
    { labelEn: 'Thesis', labelEs: 'Tesis', href: '#tesis' },
    { labelEn: 'Method', labelEs: 'Metodología', href: '#metodo' },
    { labelEn: 'Insights', labelEs: 'Insights', href: '#mercado' },
    { labelEn: 'Showcase', labelEs: 'Showcase', href: '#perfiles' }
  ];

  return (
    <motion.nav 
      style={{ height: navHeight }}
      className="fixed top-0 w-full z-[100] px-4 md:px-8 flex items-center transition-all duration-500"
    >
      <motion.div 
        style={{ backgroundColor: navBg, borderColor: navBorder }}
        className="max-w-7xl mx-auto w-full flex justify-between items-center backdrop-blur-xl border px-6 md:px-8 py-4 rounded-[2.5rem] shadow-sm"
      >
        <div className="flex flex-col group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="text-xl font-display italic font-bold tracking-tight text-ro-dark group-hover:text-ro-accent transition-colors">
            Rangel Oviedo
          </span>
          <span className="text-[9px] uppercase tracking-[0.38em] font-sans opacity-50 group-hover:opacity-100 transition-opacity">
            {t('Real Estate Group', 'Grupo de Bienes Raíces')}
          </span>
        </div>
        
        <div className="hidden lg:flex items-center space-x-8">
          {menuItems.map((item) => (
            <a 
              key={item.href} 
              href={item.href} 
              className="text-[10px] uppercase tracking-widest font-bold hover:text-ro-accent transition-colors relative group/link"
            >
              {t(item.labelEn, item.labelEs)}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-ro-accent transition-all group-hover/link:w-full" />
            </a>
          ))}
          
          {/* Elegant Language Switcher */}
          <div className="flex items-center gap-2 border border-ro-dark/10 bg-ro-dark/5 rounded-full px-3 py-1.5 text-[10px] font-bold tracking-wider">
            <Globe size={12} className="text-ro-dark/40" />
            <button 
              onClick={() => setLanguage('en')}
              className={`transition-colors uppercase hover:text-ro-accent ${language === 'en' ? 'text-ro-accent font-extrabold' : 'text-ro-dark/50 font-normal'}`}
            >
              EN
            </button>
            <span className="text-ro-dark/20 font-light">|</span>
            <button 
              onClick={() => setLanguage('es')}
              className={`transition-colors uppercase hover:text-ro-accent ${language === 'es' ? 'text-ro-accent font-extrabold' : 'text-ro-dark/50 font-normal'}`}
            >
              ES
            </button>
          </div>

          <a 
            href="#contacto" 
            className="bg-ro-dark text-ro-light px-6 py-3 rounded-2xl text-[10px] uppercase tracking-widest font-bold hover:bg-ro-accent transition-all transform hover:scale-105 shadow-md"
          >
            {t('Schedule Strategy', 'Agendar Estrategia')}
          </a>
        </div>

        {/* Mobile menu trigger helper or mobile lang toggle */}
        <div className="flex lg:hidden items-center gap-3">
          <div className="flex items-center gap-1.5 border border-ro-dark/10 bg-ro-dark/5 rounded-full px-2.5 py-1 text-[9px] font-bold">
            <button 
              onClick={() => setLanguage('en')}
              className={`transition-colors ${language === 'en' ? 'text-ro-accent font-extrabold' : 'text-ro-dark/40'}`}
            >
              EN
            </button>
            <span className="text-ro-dark/20">|</span>
            <button 
              onClick={() => setLanguage('es')}
              className={`transition-colors ${language === 'es' ? 'text-ro-accent font-extrabold' : 'text-ro-dark/40'}`}
            >
              ES
            </button>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'es';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (enVal: string, esVal: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es'); // Default to Spanish as requested, but detect below

  useEffect(() => {
    const saved = localStorage.getItem('language_pref');
    if (saved === 'en' || saved === 'es') {
      setLanguageState(saved);
    } else {
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'es') {
        setLanguageState('es');
      } else {
        setLanguageState('en');
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language_pref', lang);
  };

  // Helper function to return translation based on active language
  const t = (enVal: string, esVal: string) => {
    return language === 'es' ? esVal : enVal;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

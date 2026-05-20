'use client';

import React, { useEffect, useState } from 'react';
import { Settings2, Palette, Type, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('theme-default');
  const [typo, setTypo] = useState('typo-default');

  useEffect(() => {
    document.documentElement.classList.remove('theme-minimal', 'theme-warm', 'theme-ocean');
    if (theme !== 'theme-default') {
      document.documentElement.classList.add(theme);
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.classList.remove('typo-sans-heading');
    if (typo !== 'typo-default') {
      document.documentElement.classList.add(typo);
    }
  }, [typo]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[100] bg-black text-white p-3 rounded-full shadow-2xl hover:-translate-y-1 hover:scale-105 transition-all"
        title="Opciones de Diseño"
      >
        <Settings2 size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-6 z-[100] bg-white text-stone-900 w-72 rounded-3xl shadow-2xl overflow-hidden border border-stone-200"
          >
            <div className="flex justify-between items-center p-4 bg-stone-100 border-b border-stone-200">
              <span className="font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                <Settings2 size={16} /> Opciones Visionales
              </span>
              <button onClick={() => setIsOpen(false)} className="hover:text-stone-500">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <span className="text-xs uppercase font-bold tracking-widest text-stone-400 flex items-center gap-2 mb-2">
                  <Palette size={14} /> Paleta de Colores
                </span>
                
                <div className="space-y-2">
                  <button 
                    onClick={() => setTheme('theme-default')}
                    className={`w-full flex items-center gap-3 p-2 rounded-xl border transition-all ${theme === 'theme-default' ? 'border-[#9A3412] bg-[#9A3412]/5' : 'border-stone-200 hover:bg-stone-50'}`}
                  >
                    <div className="flex -space-x-1">
                      <div className="w-5 h-5 rounded-full bg-[#2D2421]"></div>
                      <div className="w-5 h-5 rounded-full bg-[#9A3412] relative z-10 border border-white"></div>
                      <div className="w-5 h-5 rounded-full bg-[#F9F7F2] relative z-20 border border-stone-200"></div>
                    </div>
                    <span className="text-sm font-medium">Lujo Latino (Default)</span>
                  </button>

                  <button 
                    onClick={() => setTheme('theme-minimal')}
                    className={`w-full flex items-center gap-3 p-2 rounded-xl border transition-all ${theme === 'theme-minimal' ? 'border-indigo-600 bg-indigo-50' : 'border-stone-200 hover:bg-stone-50'}`}
                  >
                    <div className="flex -space-x-1">
                      <div className="w-5 h-5 rounded-full bg-slate-900"></div>
                      <div className="w-5 h-5 rounded-full bg-indigo-600 relative z-10 border border-white"></div>
                      <div className="w-5 h-5 rounded-full bg-slate-50 relative z-20 border border-stone-200"></div>
                    </div>
                    <span className="text-sm font-medium">Tech Minimalista</span>
                  </button>

                  <button 
                    onClick={() => setTheme('theme-ocean')}
                    className={`w-full flex items-center gap-3 p-2 rounded-xl border transition-all ${theme === 'theme-ocean' ? 'border-teal-600 bg-teal-50' : 'border-stone-200 hover:bg-stone-50'}`}
                  >
                    <div className="flex -space-x-1">
                      <div className="w-5 h-5 rounded-full bg-teal-950"></div>
                      <div className="w-5 h-5 rounded-full bg-teal-600 relative z-10 border border-white"></div>
                      <div className="w-5 h-5 rounded-full bg-teal-50 relative z-20 border border-stone-200"></div>
                    </div>
                    <span className="text-sm font-medium">Océano Ejecutivo</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-xs uppercase font-bold tracking-widest text-stone-400 flex items-center gap-2 mb-2">
                  <Type size={14} /> Tipografías
                </span>
                
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setTypo('typo-default')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center ${typo === 'typo-default' ? 'border-[#9A3412] bg-[#9A3412]/5 text-[#9A3412]' : 'border-stone-200 hover:bg-stone-50'}`}
                  >
                    <span className="font-serif text-xl italic leading-none mb-1">Aa</span>
                    <span className="text-[10px] uppercase tracking-widest font-bold">Editorial</span>
                  </button>

                  <button 
                    onClick={() => setTypo('typo-sans-heading')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center ${typo === 'typo-sans-heading' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-stone-200 hover:bg-stone-50'}`}
                  >
                    <span className="font-sans text-xl font-bold leading-none mb-1">Aa</span>
                    <span className="text-[10px] uppercase tracking-widest font-bold">Moderno</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

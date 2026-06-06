'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Calculator, Info } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from './LanguageContext';

export default function ROICalculator() {
  const [investment, setInvestment] = useState(500000);
  const [years, setYears] = useState(5);
  const [appreciation, setAppreciation] = useState(6);
  const { t } = useLanguage();

  const results = useMemo(() => {
    const totalAppreciation = investment * Math.pow(1 + appreciation / 100, years);
    const profit = totalAppreciation - investment;
    return {
      total: totalAppreciation.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }),
      profit: profit.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }),
      roi: ((profit / investment) * 100).toFixed(1)
    };
  }, [investment, years, appreciation]);

  return (
    <section className="py-20 md:py-24 bg-ro-dark text-ro-light px-5 md:px-8 rounded-[2.5rem] md:rounded-[5rem] mx-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[60%] h-full bg-ro-accent/5 blur-[120px] max-md:hidden rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div className="space-y-8 md:space-y-10">
            <div className="space-y-4 md:space-y-6">
              <h6 className="text-ro-accent font-black uppercase tracking-[0.4em] text-[10px]">
                {t('Intelligence Tool', 'Herramienta de Inteligencia')}
              </h6>
              <h2 className="text-4xl md:text-7xl font-display leading-tight tracking-tighter">
                {t('Project your', 'Proyecta tu')} <br />
                <span className="italic font-normal">{t('future in Texas.', 'futuro en Texas.')}</span>
              </h2>
              <p className="text-lg md:text-xl text-stone-400 font-light max-w-md leading-relaxed italic">
                {t(
                  '"Data removes doubt. Use our appreciation simulator to picture your capital growth."',
                  '"Los datos eliminan la duda. Usa nuestro simulador de plusvalía para visualizar el crecimiento de tu capital."'
                )}
              </p>
            </div>
 
            <div className="bg-white/5 backdrop-blur-xl max-md:backdrop-blur-none border border-white/10 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] space-y-8">
               <div className="flex items-start gap-4">
                 <div className="bg-ro-accent/20 p-3 rounded-2xl text-ro-accent shrink-0">
                   <Info size={20} />
                 </div>
                 <p className="text-xs text-stone-500 italic">
                   {t(
                     '*Calculations based on historical annual appreciation averages in the Texas Triangle (Houston, Austin, Dallas).',
                     '*Cálculos basados en promedios históricos de apreciación anual en el Triángulo de Texas (Houston, Austin, Dallas).'
                   )}
                 </p>
               </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="ro-bg-surface p-6 md:p-16 rounded-[2.5rem] md:rounded-[4rem] text-ro-dark space-y-8 md:space-y-12"
          >
            <div className="space-y-8">
              {/* Investment Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-end gap-4">
                  <label className="text-[10px] uppercase font-black tracking-widest opacity-40">
                    {t('Investment Amount', 'Monto de Inversión')}
                  </label>
                  <span className="text-xl md:text-2xl font-display text-ro-accent">${investment.toLocaleString()}</span>
                </div>
                <input 
                  type="range" min="100000" max="5000000" step="50000" 
                  value={investment} onChange={(e) => setInvestment(Number(e.target.value))}
                  className="w-full h-1 bg-ro-dark/10 rounded-lg appearance-none cursor-pointer accent-ro-accent"
                />
              </div>

              {/* Years Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-end gap-4">
                  <label className="text-[10px] uppercase font-black tracking-widest opacity-40">
                    {t('Holding Period', 'Período de Retención')}
                  </label>
                  <span className="text-xl md:text-2xl font-display text-ro-accent">
                    {years} {t(years === 1 ? 'Year' : 'Years', years === 1 ? 'Año' : 'Años')}
                  </span>
                </div>
                <input 
                  type="range" min="1" max="15" step="1" 
                  value={years} onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full h-1 bg-ro-dark/10 rounded-lg appearance-none cursor-pointer accent-ro-accent"
                />
              </div>

              {/* Appreciation Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-end gap-4">
                  <label className="text-[10px] uppercase font-black tracking-widest opacity-40">
                    {t('Projected Annual Appreciation', 'Plusvalía Anual Proyectada')}
                  </label>
                  <span className="text-xl md:text-2xl font-display text-ro-accent">{appreciation}%</span>
                </div>
                <input 
                  type="range" min="1" max="15" step="0.5" 
                  value={appreciation} onChange={(e) => setAppreciation(Number(e.target.value))}
                  className="w-full h-1 bg-ro-dark/10 rounded-lg appearance-none cursor-pointer accent-ro-accent"
                />
              </div>
            </div>

            <div className="pt-8 border-t border-ro-dark/5 grid grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] uppercase font-black tracking-widest opacity-40 mb-2">
                  {t('Estimated Total Value', 'Valor Total Estimado')}
                </p>
                <motion.p 
                  key={results.total}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl md:text-4xl font-display italic text-ro-dark"
                >
                  {results.total}
                </motion.p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-black tracking-widest opacity-40 mb-2">
                  {t('Estimated Net ROI', 'ROI Neto Estimado')}
                </p>
                <motion.p 
                  key={results.roi}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl md:text-4xl font-display italic text-ro-accent"
                >
                  {results.roi}%
                </motion.p>
              </div>
            </div>

            <Link href="/#contacto" className="w-full bg-ro-dark text-white py-4 md:py-6 rounded-2xl flex items-center justify-center gap-4 hover:bg-ro-accent transition-all transform hover:-translate-y-1 font-bold uppercase text-[10px] tracking-widest">
              <Calculator size={18} />
              {t('Request Feasibility Analysis', 'Solicitar Análisis de Factibilidad')}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

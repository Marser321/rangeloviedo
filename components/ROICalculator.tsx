'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Calculator, Info, TrendingUp } from 'lucide-react';

export default function ROICalculator() {
  const [investment, setInvestment] = useState(500000);
  const [years, setYears] = useState(5);
  const [appreciation, setAppreciation] = useState(6);

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
    <section className="py-32 bg-ro-dark text-ro-light px-8 rounded-[5rem] mx-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[60%] h-full bg-ro-accent/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          <div className="space-y-10">
            <div className="space-y-6">
              <h6 className="text-ro-accent font-black uppercase tracking-[0.4em] text-[10px]">Herramienta de Inteligencia</h6>
              <h2 className="text-5xl md:text-7xl font-display leading-tight tracking-tighter">
                Proyecte su <br />
                <span className="italic font-normal">futuro en Texas.</span>
              </h2>
              <p className="text-xl text-stone-400 font-light max-w-md leading-relaxed italic">
                "Los datos eliminan la duda. Utilice nuestro simulador de plusvalía para visualizar el crecimiento de su capital."
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[3rem] space-y-8">
               <div className="flex items-start gap-4">
                 <div className="bg-ro-accent/20 p-3 rounded-2xl text-ro-accent">
                   <Info size={20} />
                 </div>
                 <p className="text-xs text-stone-500 italic">
                   *Cálculos basados en promedios históricos de apreciación anual en el Triángulo de Texas (Houston, Austin, Dallas).
                 </p>
               </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-ro-light p-10 md:p-16 rounded-[4rem] text-ro-dark shadow-2xl space-y-12"
          >
            <div className="space-y-10">
              {/* Investment Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] uppercase font-black tracking-widest opacity-40">Monto de Inversión</label>
                  <span className="text-2xl font-display text-ro-accent">${investment.toLocaleString()}</span>
                </div>
                <input 
                  type="range" min="100000" max="5000000" step="50000" 
                  value={investment} onChange={(e) => setInvestment(Number(e.target.value))}
                  className="w-full h-1 bg-ro-dark/10 rounded-lg appearance-none cursor-pointer accent-ro-accent"
                />
              </div>

              {/* Years Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] uppercase font-black tracking-widest opacity-40">Periodo de Retención</label>
                  <span className="text-2xl font-display text-ro-accent">{years} Años</span>
                </div>
                <input 
                  type="range" min="1" max="15" step="1" 
                  value={years} onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full h-1 bg-ro-dark/10 rounded-lg appearance-none cursor-pointer accent-ro-accent"
                />
              </div>

              {/* Appreciation Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] uppercase font-black tracking-widest opacity-40">Plusvalía Anual Proyectada</label>
                  <span className="text-2xl font-display text-ro-accent">{appreciation}%</span>
                </div>
                <input 
                  type="range" min="1" max="15" step="0.5" 
                  value={appreciation} onChange={(e) => setAppreciation(Number(e.target.value))}
                  className="w-full h-1 bg-ro-dark/10 rounded-lg appearance-none cursor-pointer accent-ro-accent"
                />
              </div>
            </div>

            <div className="pt-10 border-t border-ro-dark/5 grid grid-cols-2 gap-8">
              <div>
                <p className="text-[10px] uppercase font-black tracking-widest opacity-40 mb-2">Valor Total Estimado</p>
                <motion.p 
                  key={results.total}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl md:text-4xl font-display italic text-ro-dark"
                >
                  {results.total}
                </motion.p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-black tracking-widest opacity-40 mb-2">ROI Neto Estimado</p>
                <motion.p 
                  key={results.roi}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl md:text-4xl font-display italic text-ro-accent"
                >
                  {results.roi}%
                </motion.p>
              </div>
            </div>

            <button className="w-full bg-ro-dark text-white py-6 rounded-2xl flex items-center justify-center gap-4 hover:bg-ro-accent transition-all transform hover:-translate-y-1 font-bold uppercase text-[10px] tracking-widest">
              <Calculator size={18} />
              Solicitar Análisis de Factibilidad
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

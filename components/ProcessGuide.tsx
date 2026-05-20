'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Search, ShieldCheck, Key, ArrowRight } from 'lucide-react';

const steps = [
  {
    title: 'Análisis de Perfil e Inteligencia',
    description: 'Definimos su tesis de inversión personal, analizando tolerancia al riesgo, horizonte temporal y objetivos de capitalización en el mercado tejano.',
    icon: <Search className="w-6 h-6" />
  },
  {
    title: 'Arquitectura y Negociación',
    description: 'Utilizamos nuestra red de contactos (off-market) y datos demográficos para asegurar activos con ventajas competitivas antes de que lleguen al público.',
    icon: <ShieldCheck className="w-6 h-6" />
  },
  {
    title: 'Cierre y Gestión Patrimonial',
    description: 'Acompañamos en todo el proceso legal y administrativo, asegurando que su inversión esté protegida y lista para generar valor desde el primer día.',
    icon: <Key className="w-6 h-6" />
  }
];

export default function ProcessGuide() {
  return (
    <section className="py-32 bg-ro-light px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24 space-y-4">
          <h6 className="text-ro-accent font-black uppercase tracking-[0.4em] text-[10px]">Metodología de Éxito</h6>
          <h2 className="text-5xl md:text-7xl font-display text-ro-dark leading-tight">
            Tres pasos hacia su <br />
            <span className="italic font-normal">libertad patrimonial.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-12 left-20 right-20 h-px bg-ro-accent/10 z-0" />
          
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 bg-white rounded-[2.5rem] shadow-xl flex items-center justify-center text-ro-accent mb-10 group-hover:bg-ro-accent group-hover:text-white transition-all duration-500 border border-ro-dark/5">
                {s.icon}
              </div>
              
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-black tracking-widest text-ro-accent opacity-40">Fase 0{i + 1}</span>
                <h3 className="text-2xl font-display italic text-ro-dark tracking-tight">{s.title}</h3>
                <p className="text-ro-dark/60 font-light leading-relaxed italic">{s.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 flex justify-center">
           <a href="#contacto" className="group flex items-center gap-4 text-ro-dark hover:text-ro-accent transition-colors font-bold uppercase text-[10px] tracking-[0.3em]">
             Comenzar Fase de Inteligencia
             <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
           </a>
        </div>
      </div>
    </section>
  );
}

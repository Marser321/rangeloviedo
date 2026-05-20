'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Landmark, TrendingUp, Key, ArrowUpRight } from 'lucide-react';

export default function StrategyServices() {
  const services = [
    {
      id: '01',
      title: 'Estrategia de Adquisición Patrimonial',
      description: 'Más que buscar casas, identificamos activos subvalorados en zonas de alto flujo demográfico en Texas. Analizamos el subsuelo, la plusvalía proyectada y el encaje cultural.',
      icon: <Landmark className="w-8 h-8" />,
      detail: 'Enfoque: Compradores de Alta Gama y Family Offices.'
    },
    {
      id: '02',
      title: 'Arquitectura de Portafolios de Inversión',
      description: 'Diseñamos una estructura diversificada de Real Estate para proteger tu capital contra la inflación, optimizando beneficios fiscales vigentes en Houston y Austin.',
      icon: <TrendingUp className="w-8 h-8" />,
      detail: 'Enfoque: Rendimiento Pasivo y Multi-Family.'
    },
    {
      id: '03',
      title: 'Posicionamiento y Venta Exclusiva',
      description: 'Elevamos tu propiedad mediante "Storytelling Inmobiliario" y redes de contacto cerradas (Off-market), asegurando que tu activo atraiga al comprador correcto, no solo al primero.',
      icon: <Key className="w-8 h-8" />,
      detail: 'Enfoque: Vendedores con Propiedades de Autor.'
    }
  ];

  return (
    <section id="metodologia" className="py-32 bg-ro-light px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="max-w-2xl">
            <h6 className="text-ro-accent font-black uppercase tracking-[0.3em] text-[11px] mb-6">Expertise Sistémico</h6>
            <h2 className="text-5xl md:text-7xl font-display text-ro-dark leading-tight tracking-tighter">
              Soluciones para <br />
              <span className="italic font-normal">inversiones con propósito.</span>
            </h2>
          </div>
          <div className="md:max-w-sm pb-2">
            <p className="text-ro-dark/60 font-light text-lg italic">
              "El éxito inmobiliario en Texas no es producto del azar, es el resultado de una metodología que une el dato con la intuición."
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-px bg-ro-dark/5 overflow-hidden rounded-[3.5rem] border border-ro-dark/5 shadow-inner">
          {services.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.4)" }}
              initial={{ backgroundColor: "rgba(255,255,255,0)" }}
              className="bg-white/40 backdrop-blur-sm p-12 md:p-16 flex flex-col justify-between group transition-all duration-700 min-h-[550px]"
            >
              <div className="space-y-10">
                <div className="flex justify-between items-start">
                  <span className="text-ro-accent/30 font-display italic text-4xl leading-none">
                    {service.id}
                  </span>
                  <div className="text-ro-accent p-4 bg-ro-accent/5 rounded-full group-hover:scale-110 transition-transform duration-500 italic">
                    {service.icon}
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-3xl font-display text-ro-dark leading-snug pr-4 tracking-tight group-hover:text-ro-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-ro-dark/60 font-light leading-relaxed text-lg">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="pt-12 mt-12 border-t border-ro-dark/5 flex flex-col xl:flex-row gap-4 justify-between xl:items-center group-hover:border-ro-accent/20 transition-all">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-ro-dark/50 uppercase">
                  {service.detail}
                </span>
                <button className="text-ro-dark hover:text-ro-accent flex items-center gap-2 group/btn font-bold text-xs uppercase tracking-widest transition-colors font-sans">
                   Saber más
                   <ArrowUpRight size={18} className="group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex flex-col md:flex-row justify-center items-center gap-8">
           <div className="flex -space-x-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-ro-light bg-stone-300 shadow-sm" />
              ))}
           </div>
           <p className="text-sm font-light text-ro-dark/60 italic max-w-xs text-center md:text-left leading-snug">
             Más de <strong>30 familias internacionales</strong> han transformado su capital bajo nuestra arquitectura de servicios.
           </p>
        </div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Globe } from 'lucide-react';
import Image from 'next/image';

export default function CulturalIdentity() {
  return (
    <section id="insights" className="py-20 md:py-32 px-5 md:px-8 bg-white overflow-hidden rounded-[2.5rem] md:rounded-[4rem] mx-2 md:mx-4 mb-20 md:mb-32 shadow-xl">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-20 items-center">
          
          <div className="lg:col-span-5 relative">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl aspect-[4/5] bg-stone-100"
            >
              <Image 
                src="https://picsum.photos/seed/cultural/1000/1250" 
                alt="Rangel y Desiré Oviedo - Liderazgo con Propósito"
                className="w-full object-cover"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-ro-accent/5 rounded-full blur-[80px]" />
            <div className="absolute -bottom-8 -left-8 bg-ro-dark text-ro-light p-10 rounded-[3rem] shadow-2xl z-20 hidden md:block">
              <span className="font-display italic text-3xl leading-none block">Texas Rooted, <br />Global Heart.</span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-6">
              <h6 className="text-ro-accent font-black uppercase tracking-[0.4em] text-[10px] italic">Nuestro "Por Qué"</h6>
              <h2 className="text-5xl md:text-7xl font-display text-ro-dark leading-tight">
                Más que activos, <br />
                <span className="italic font-normal">protegemos raíces.</span>
              </h2>
            </div>

            <div className="space-y-8 text-xl font-light leading-relaxed text-ro-dark/70 max-w-2xl">
              <p>
                Rangel Oviedo Group nació de una convicción clara: en la industria de bienes raíces de lujo, <span className="font-semibold text-ro-dark">la eficiencia no tiene por qué ser fría.</span> 
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8 pt-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-ro-accent">
                    <Sparkles size={20} />
                    <span className="text-xs uppercase font-black tracking-widest italic">Magia Latina</span>
                  </div>
                  <p className="text-base text-ro-dark/60">Nuestra intuición cultural nos permite negociar con un matiz humano que las firmas tradicionales ignoran.</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-ro-accent">
                    <Globe size={20} />
                    <span className="text-xs uppercase font-black tracking-widest italic">Visión 360°</span>
                  </div>
                  <p className="text-base text-ro-dark/60">Entendemos la logística del inversor internacional porque compartimos su ambición por un futuro sólido en EE.UU.</p>
                </div>
              </div>

              <div className="bg-ro-light p-8 rounded-3xl border-l-4 border-ro-accent">
                 <p className="text-lg italic font-display">
                   "Somos jóvenes, dinámicos y profundamente agradecidos por Texas. Aquí, unimos nuestras raíces culturales con la solidez del mercado inmobiliario más potente del mundo."
                 </p>
                 <div className="mt-4 flex items-center gap-3">
                    <div className="h-px w-8 bg-ro-dark/20" />
                    <span className="text-xs uppercase font-black tracking-widest opacity-80 italic">Rangel & Desiré Oviedo</span>
                 </div>
              </div>
            </div>

            <div className="pt-6">
              <a href="#contacto" className="inline-flex bg-ro-dark text-ro-light px-12 py-5 rounded-2xl items-center gap-4 hover:bg-ro-accent transition-all transform hover:-translate-y-1 shadow-lg font-bold uppercase text-[10px] tracking-widest">
                Conecta con Nosotros
                <Heart size={16} fill="currentColor" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-32 pt-20 border-t border-ro-dark/5 flex flex-wrap justify-between items-center gap-10 opacity-50 grayscale hover:grayscale-0 transition-all">
           <span className="text-xs font-black uppercase tracking-[0.5em] w-full text-center mb-8">Validación de Terceros</span>
           <div className="flex flex-col md:flex-row w-full justify-between items-center opacity-60 md:px-10 gap-6">
             <div className="font-display italic text-2xl font-bold tracking-tighter">TRUSTINDEX 5★</div>
             <div className="font-display italic text-2xl font-bold tracking-tighter">Zillow Elite</div>
             <div className="font-display italic text-2xl font-bold tracking-tighter">Google Reviewers</div>
             <div className="font-display italic text-2xl font-bold tracking-tighter">Texas Real Estate Board</div>
           </div>
        </div>
      </div>
    </section>
  );
}

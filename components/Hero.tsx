'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-5 sm:pt-40 md:pt-64 md:pb-32 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 text-ro-accent mb-10">
            <div className="w-12 h-[2px] bg-ro-accent" />
            <span className="text-xs uppercase tracking-[0.3em] font-black">Texas Investment Experts</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-display text-ro-dark leading-[1.1] mb-8">
            Tu futuro en Texas, <br />
            <span className="italic font-normal">diseñado con raíces.</span>
          </h1>

          <p className="text-xl md:text-2xl text-ro-dark/60 font-light max-w-xl leading-relaxed mb-12 border-l-2 border-ro-accent/20 pl-8 italic">
            "Ayudamos a inversores internacionales a navegar el mercado de Houston con inteligencia de datos y empatía cultural."
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <a href="#contacto" className="group w-full md:w-auto relative bg-ro-accent text-white px-10 py-5 rounded-[2rem] text-lg font-medium overflow-hidden shadow-2xl transition-all hover:scale-[1.02]">
              <div className="flex items-center justify-center gap-3">
                <span>Descubre tu potencial de ROI</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
            
            <div className="flex justify-center items-center gap-4 bg-white/50 backdrop-blur-sm px-6 py-4 rounded-[2rem] border border-ro-dark/5">
              <div className="flex text-ro-accent">
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 italic">Elite en Trustindex</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
        >
          <div className="aspect-[3/4] relative z-10 rounded-[5rem] overflow-hidden shadow-[40px_40px_100px_-40px_rgba(45,36,33,0.3)] transform rotate-2">
            <Image 
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80" 
              className="w-full h-full object-cover grayscale-[0.2]" 
              alt="Texas Real Estate Luxury"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="absolute -bottom-6 left-2 sm:-bottom-10 sm:-left-10 z-20 bg-white/80 backdrop-blur-md p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] shadow-xl border border-white/50 max-w-[240px] sm:max-w-[280px]">
              <div className="text-4xl text-ro-accent mb-4">“</div>
              <p className="text-ro-dark font-display italic text-lg sm:text-xl mb-6">Unimos tu capital con soluciones que tienen corazón.</p>
              <span className="text-[10px] uppercase font-black tracking-widest text-ro-dark/40">— Desiré Oviedo</span>
          </div>

          <div className="absolute -top-10 -right-10 w-64 h-64 bg-ro-accent/5 rounded-full blur-[80px]" />
        </motion.div>
      </div>
    </section>
  );
}

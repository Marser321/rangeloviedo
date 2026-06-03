'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowRight, Instagram, Linkedin, MessageCircle } from 'lucide-react';

export default function ClosingContact() {
  return (
    <section id="contacto" className="relative py-20 px-5 md:py-32 md:px-6 bg-ro-dark text-ro-light overflow-hidden rounded-t-[2.5rem] md:rounded-t-[5rem]">
      <div className="absolute top-0 right-0 w-[40%] h-full bg-ro-accent/10 blur-3xl rounded-full translate-x-1/2 translate-y-[-20%] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        
        <div className="space-y-12">
          <div className="space-y-6">
            <h6 className="text-ro-accent font-black uppercase tracking-[0.4em] text-[10px]">Paso Final</h6>
            <h2 className="text-5xl md:text-8xl font-display leading-[0.9] tracking-tighter">
              Aseguremos su <br /> 
              <span className="italic font-normal">próximo éxito.</span>
            </h2>
            <p className="text-xl md:text-2xl text-stone-400 font-light max-w-md leading-relaxed border-l-2 border-ro-accent/30 pl-8 italic">
              "No buscamos clientes; construimos alianzas a largo plazo fundamentadas en integridad y resultados tangibles en Texas."
            </p>
          </div>

          <div className="flex flex-col space-y-6">
            <button type="button" className="flex items-center gap-6 group cursor-pointer text-left w-full">
              <div className="bg-white/10 p-5 rounded-2xl group-hover:bg-ro-accent group-active:bg-ro-accent group-focus-visible:bg-ro-accent transition-all">
                <Calendar className="text-ro-light" size={28} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest opacity-40">Agenda Directa</p>
                <p className="text-xl font-display italic">Sesión de Inteligencia 15 min</p>
              </div>
            </button>

            <button type="button" className="flex items-center gap-6 group cursor-pointer text-left w-full">
              <div className="bg-white/10 p-5 rounded-2xl group-hover:bg-ro-accent group-active:bg-ro-accent group-focus-visible:bg-ro-accent transition-all">
                <MessageCircle className="text-ro-light" size={28} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest opacity-40">Atención Personal</p>
                <p className="text-xl font-display italic">Concierge WhatsApp 24/7</p>
              </div>
            </button>
          </div>

          <div className="flex gap-6 opacity-40 hover:opacity-100 transition-opacity">
            <Instagram size={24} className="hover:text-ro-accent cursor-pointer" />
            <Linkedin size={24} className="hover:text-ro-accent cursor-pointer" />
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-ro-light p-10 md:p-16 rounded-[4rem] text-ro-dark shadow-2xl relative"
        >
          <div className="mb-12">
            <h4 className="text-3xl font-display italic mb-2 tracking-tight">Forme parte de nuestra red exclusiva</h4>
            <p className="text-sm opacity-60">Indique brevemente su intención estratégica.</p>
          </div>

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-4">
              <label className="text-[10px] uppercase font-black tracking-widest opacity-40">Información de contacto</label>
              <input 
                type="text" 
                placeholder="Nombre Completo" 
                className="w-full bg-transparent border-b-2 border-ro-dark/10 py-4 focus:border-ro-accent outline-none transition-all font-medium italic"
              />
              <input 
                type="email" 
                placeholder="Email Profesional" 
                className="w-full bg-transparent border-b-2 border-ro-dark/10 py-4 focus:border-ro-accent outline-none transition-all font-medium italic"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase font-black tracking-widest opacity-40">Perfil de interés</label>
              <div className="flex flex-wrap gap-4 pt-2">
                 {['Inversión Texas', 'Compra Lujo', 'Gestión Portafolio'].map((item) => (
                   <button type="button" key={item} className="px-5 py-2 border border-ro-dark/10 rounded-full text-xs font-bold tracking-widest cursor-pointer hover:bg-ro-dark hover:text-ro-light active:bg-ro-dark active:text-ro-light transition-all">
                     {item}
                   </button>
                 ))}
              </div>
            </div>

            <button type="submit" className="w-full bg-ro-accent text-ro-light py-6 rounded-2xl flex items-center justify-center gap-4 hover:shadow-2xl hover:bg-ro-dark transition-all transform hover:-translate-y-1">
              <span className="font-bold uppercase text-xs tracking-widest leading-none mt-1">Enviar solicitud de consulta</span>
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-12 flex justify-center border-t border-ro-dark/5 pt-8 text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 text-center">
             Protegiendo el capital de 30+ inversores globales
          </div>
        </motion.div>
      </div>

      <footer className="mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center opacity-40 text-[9px] uppercase tracking-[0.4em] gap-8 text-center md:text-left">
         <p>© 2026 Rangel Oviedo Group. Todos los derechos reservados.</p>
         <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <span className="hover:text-white cursor-pointer transition-colors">Aviso de Privacidad</span>
            <span className="hover:text-white cursor-pointer transition-colors">Disclaimer Texas RE</span>
         </div>
         <p className="text-ro-accent font-black">Texas First · Cultural Heart</p>
      </footer>
    </section>
  );
}

'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Alejandro Martínez',
    role: 'Inversor / Monterrey, MX',
    content: 'La capacidad de Rangel para leer el mercado de Houston antes de que las tendencias se vuelvan obvias es lo que nos ha dado una ventaja competitiva real.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Elena Rodríguez',
    role: 'Family Office / Madrid, ES',
    content: 'No solo compramos propiedades; compramos tranquilidad. El enfoque cultural y la transparencia del grupo son inigualables en Texas.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'David Chen',
    role: 'Real Estate Developer / Toronto, CA',
    content: 'Integridad y datos. Esa es la combinación que buscaba. El equipo de Rangel Oviedo Group superó nuestras expectativas en cada fase.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  }
];

export default function Testimonials() {
  return (
    <section className="py-32 bg-white px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 space-y-4">
          <h6 className="text-ro-accent font-black uppercase tracking-[0.4em] text-[10px]">Testimonios de Autoridad</h6>
          <h2 className="text-5xl md:text-7xl font-display text-ro-dark">
            Voces que validan <br />
            <span className="italic font-normal">nuestra visión.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-ro-light p-10 rounded-[3rem] relative group hover:-translate-y-2 transition-all duration-500 shadow-sm hover:shadow-xl"
            >
              <Quote className="absolute top-10 right-10 text-ro-accent/10 w-16 h-16" />
              
              <div className="flex text-ro-accent mb-8">
                {[1, 2, 3, 4, 5].map(star => <Star key={star} size={14} fill="currentColor" />)}
              </div>

              <p className="text-xl font-display italic text-ro-dark leading-relaxed mb-10 relative z-10">
                "{t.content}"
              </p>

              <div className="flex items-center gap-4 border-t border-ro-dark/5 pt-8">
                <div className="w-12 h-12 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 shadow-lg">
                  <Image src={t.image} alt={t.name} width={48} height={48} className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-wider text-ro-dark">{t.name}</h4>
                  <p className="text-[10px] uppercase font-black tracking-widest text-ro-accent/60 italic">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

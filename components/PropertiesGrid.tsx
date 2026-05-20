'use client';

import React from 'react';
import { motion } from 'motion/react';
import { MapPin, TrendingUp, Maximize2 } from 'lucide-react';
import Image from 'next/image';

const properties = [
  {
    title: 'The Woodlands Executive Retreat',
    location: 'Houston, TX',
    price: '$2.4M',
    roi: '8.5% Proyectado',
    sqft: '5,200',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Austin Hill Country Modern',
    location: 'Austin, TX',
    price: '$3.1M',
    roi: '12% Proyectado',
    sqft: '4,800',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Sugar Land Investment Estate',
    location: 'Sugar Land, TX',
    price: '$1.8M',
    roi: '7.2% Proyectado',
    sqft: '6,100',
    image: 'https://images.unsplash.com/photo-1600607687940-472f1227555e?auto=format&fit=crop&w=800&q=80'
  }
];

export default function PropertiesGrid() {
  return (
    <section className="py-32 bg-ro-dark text-ro-light px-8 rounded-[5rem] mx-4 relative z-40">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="space-y-4">
            <h6 className="text-ro-accent font-black uppercase tracking-[0.4em] text-[10px]">Oportunidades Curadas</h6>
            <h2 className="text-5xl md:text-7xl font-display leading-tight">
              Activos con <br />
              <span className="italic font-normal">alto potencial.</span>
            </h2>
          </div>
          <div className="max-w-xs pb-2">
            <p className="text-stone-400 font-light italic text-lg border-l border-ro-accent/30 pl-6">
              "Cada propiedad en nuestra red ha pasado por un filtro riguroso de plusvalía y demanda internacional."
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {properties.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden mb-8 shadow-2xl">
                <Image 
                  src={p.image} 
                  alt={p.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0" 
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ro-dark/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                <div className="absolute top-6 right-6 bg-ro-accent text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                  {p.roi}
                </div>
              </div>

              <div className="space-y-4 px-4">
                <div className="flex items-center gap-2 text-ro-accent/60 italic">
                  <MapPin size={14} />
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em]">{p.location}</span>
                </div>
                <h3 className="text-2xl font-display italic tracking-tight group-hover:text-ro-accent transition-colors">
                  {p.title}
                </h3>
                <div className="flex items-center justify-between border-t border-white/10 pt-6 mt-6">
                  <div className="flex items-center gap-2">
                    <Maximize2 size={16} className="text-stone-500" />
                    <span className="text-xs font-light text-stone-400">{p.sqft} SqFt</span>
                  </div>
                  <span className="text-2xl font-display text-ro-accent">{p.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

const neighborhoods = [
  {
    name: 'The Woodlands',
    description: 'El refugio ejecutivo por excelencia, con el mayor crecimiento corporativo de Texas.',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'River Oaks',
    description: 'El epicentro del lujo tradicional en Houston, donde el patrimonio encuentra su legado.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Westlake (Austin)',
    description: 'Vistas panorámicas y cercanía a la nueva frontera tecnológica de Austin.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
  }
];

export default function NeighborhoodSpotlight() {
  return (
    <section className="py-32 bg-white px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 space-y-6">
          <h6 className="text-ro-accent font-black uppercase tracking-[0.4em] text-[10px]">Territorios de Valor</h6>
          <h2 className="text-5xl md:text-7xl font-display text-ro-dark leading-tight">
            Donde el capital <br />
            <span className="italic font-normal">encuentra su lugar.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {neighborhoods.map((n, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative aspect-[3/4] rounded-[4rem] overflow-hidden group cursor-pointer shadow-2xl"
            >
              <Image 
                src={n.image} 
                alt={n.name} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ro-dark via-ro-dark/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute inset-0 p-12 flex flex-col justify-end transform translate-y-12 group-hover:translate-y-0 transition-transform duration-700">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-4xl font-display italic text-ro-light tracking-tight">{n.name}</h3>
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-ro-accent group-hover:border-ro-accent transition-all duration-500">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                  <p className="text-stone-300 font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 italic">
                    {n.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

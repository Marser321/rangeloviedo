'use client';

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ro-light px-6 text-center">
      <div className="space-y-8">
        <h1 className="text-9xl font-display italic text-ro-accent opacity-20">404</h1>
        <div className="space-y-4">
          <h2 className="text-4xl font-display text-ro-dark italic">Página no encontrada</h2>
          <p className="text-ro-dark/60 font-light max-w-md mx-auto italic">
            "En el mercado inmobiliario, la ubicación lo es todo. Parece que te has movido fuera del mapa."
          </p>
        </div>
        <Link 
          href="/" 
          className="inline-block bg-ro-dark text-ro-light px-10 py-4 rounded-2xl font-bold uppercase text-[10px] tracking-widest hover:bg-ro-accent transition-all"
        >
          Volver a la Residencia
        </Link>
      </div>
    </div>
  );
}

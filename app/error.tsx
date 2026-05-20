'use client';

import React from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ro-light px-6 text-center">
      <div className="space-y-8">
        <h1 className="text-9xl font-display italic text-ro-accent opacity-20">Err</h1>
        <div className="space-y-4">
          <h2 className="text-4xl font-display text-ro-dark italic">Algo no salió según el plan</h2>
          <p className="text-ro-dark/60 font-light max-w-md mx-auto italic">
            "Incluso las mejores inversiones enfrentan contratiempos. Estamos trabajando para restaurar la conexión."
          </p>
        </div>
        <button
          onClick={() => reset()}
          className="inline-block bg-ro-dark text-ro-light px-10 py-4 rounded-2xl font-bold uppercase text-[10px] tracking-widest hover:bg-ro-accent transition-all"
        >
          Reintentar Estrategia
        </button>
      </div>
    </div>
  );
}

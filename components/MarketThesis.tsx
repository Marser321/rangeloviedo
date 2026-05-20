import React from 'react';

export default function MarketThesis() {
  return (
    <section id="tesis" className="py-32 bg-ro-dark text-ro-light rounded-[5rem] mx-4 relative z-40 shadow-2xl">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-24 items-end">
          <div>
            <span className="text-ro-accent font-black uppercase tracking-[0.5em] text-[10px]">Filosofía del Grupo</span>
            <h2 className="text-5xl md:text-6xl font-display italic mt-6 leading-tight">
              La inteligencia de mercado es nuestra brújula, <br/>
              <span className="not-italic text-stone-500 underline decoration-ro-accent">la calidez es nuestro ADN.</span>
            </h2>
          </div>
          <div className="space-y-10 border-l border-white/10 lg:pl-10">
             <p className="text-xl text-stone-400 font-light leading-relaxed">
               "No se trata solo de encontrar una casa; se trata de predecir el flujo demográfico de Texas y entender cómo su ventaja fiscal de 2026 maximiza tu riqueza transgeneracional."
             </p>
             <div className="grid grid-cols-2 gap-8">
               <div>
                  <h4 className="text-4xl font-display mb-2">$50M+</h4>
                  <p className="text-[10px] uppercase opacity-40 font-bold tracking-widest">En Transacciones Curadas</p>
               </div>
               <div>
                  <h4 className="text-4xl font-display mb-2">100%</h4>
                  <p className="text-[10px] uppercase opacity-40 font-bold tracking-widest">Satisfacción Verificada</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

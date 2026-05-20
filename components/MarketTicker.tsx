'use client';

import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

const stats = [
  "Houston Median Price: +5.2% YoY",
  "Austin Rental Demand: 94% Capacity",
  "Texas GDP Growth: 4th Globally (Equivalent)",
  "No State Income Tax Benefit",
  "Luxury Inventory Turn: 42 Days",
  "Rangel Oviedo Exclusive ROI: 12% Avg"
];

export default function MarketTicker() {
  return (
    <div className="bg-ro-accent py-4 overflow-hidden relative z-50">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="flex whitespace-nowrap gap-20 items-center"
      >
        {[...stats, ...stats].map((stat, i) => (
          <div key={i} className="flex items-center gap-4 text-white font-bold uppercase text-[10px] tracking-[0.3em]">
            <TrendingUp size={14} className="opacity-60" />
            <span>{stat}</span>
            <ArrowUpRight size={14} className="text-white/40" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

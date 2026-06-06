'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  type MotionValue,
} from 'motion/react';
import { Maximize2 } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import type { GalleryImage } from '@/lib/team';

/**
 * Bento de 12 columnas que llena 3 filas sin huecos con 7 fotos:
 * [6x2][6] · [3][3] · [4][4][4].
 */
const SPANS = [
  'lg:col-span-6 lg:row-span-2',
  'lg:col-span-6',
  'lg:col-span-3',
  'lg:col-span-3',
  'lg:col-span-4',
  'lg:col-span-4',
  'lg:col-span-4',
];

function MosaicTile({
  image,
  index,
  onOpen,
  progress,
  reduced,
}: {
  image: GalleryImage;
  index: number;
  onOpen: (index: number) => void;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const { t } = useLanguage();
  const label = t(image.alt.en, image.alt.es);

  // Parallax sutil al hacer scroll (dirección alterna por tile).
  const dir = index % 2 === 0 ? -1 : 1;
  const y = useTransform(progress, [0, 1], [34 * dir, -34 * dir]);

  // Tilt 3D que sigue al mouse.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), { stiffness: 160, damping: 18 });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-7, 7]), { stiffness: 160, damping: 18 });

  function handleMove(e: React.MouseEvent<HTMLButtonElement>) {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }
  function handleLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <motion.div
      className={`group relative min-h-[260px] lg:min-h-0 ${SPANS[index] ?? 'lg:col-span-4'}`}
      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (index % 4) * 0.08 }}
      style={reduced ? undefined : { y }}
    >
      <button
        type="button"
        onClick={() => onOpen(index)}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        aria-label={label}
        className="relative block h-full min-h-[260px] w-full overflow-hidden rounded-[1.5rem] border border-ro-dark/8 bg-ro-dark text-left shadow-[0_24px_74px_rgba(39,31,26,0.13)] [perspective:1100px]"
      >
        <motion.div
          className="relative h-full w-full"
          style={reduced ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        >
          <Image
            src={image.src}
            alt={label}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/15 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
          <div className="absolute inset-x-5 bottom-5 flex translate-y-3 items-end justify-between gap-4 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="max-w-[78%] text-sm font-medium leading-5 text-white/90">{label}</p>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/24 bg-white/12 backdrop-blur">
              <Maximize2 size={15} />
            </span>
          </div>
        </motion.div>
      </button>
    </motion.div>
  );
}

export default function TeamMosaic({
  images,
  onOpen,
}: {
  images: GalleryImage[];
  onOpen: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return (
    <div ref={ref} className="grid gap-4 lg:grid-cols-12 lg:auto-rows-[200px]">
      {images.map((image, index) => (
        <MosaicTile
          key={image.src}
          image={image}
          index={index}
          onOpen={onOpen}
          progress={scrollYProgress}
          reduced={reduced}
        />
      ))}
    </div>
  );
}

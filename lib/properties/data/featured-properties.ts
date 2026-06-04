import type { Property } from '../types';

/**
 * ⚠️  DATOS DE EJEMPLO (PLACEHOLDER)  ⚠️
 *
 * Reemplazar por los listados REALES de Rangel Oviedo en HAR.com.
 *
 * Cumplimiento IDX: para tarjetas con diseño propio (sin feed licenciado), usar
 * únicamente listados donde Rangel es el listing agent, o selecciones curadas
 * SIEMPRE con enlace al listado oficial (`harUrl`). No republicar datos MLS de
 * otros brokers en UI propia sin un feed IDX licenciado.
 *
 * Imágenes: apuntan a los renders locales en `/public/rog` (scrolly_*) mientras
 * se cargan las fotos reales de cada propiedad.
 */
export const featuredProperties: Property[] = [
  {
    id: 'sample-the-woodlands',
    slug: 'the-woodlands-executive-retreat',
    title: {
      en: 'The Woodlands Executive Retreat',
      es: 'Retiro Ejecutivo en The Woodlands',
    },
    city: 'The Woodlands, TX',
    price: '$2,400,000',
    beds: 5,
    baths: 6,
    sqft: 5200,
    status: 'for_sale',
    images: [
      '/rog/scrolly_1_facade.webp',
      '/rog/scrolly_2_entrance.webp',
      '/rog/scrolly_3_livingroom.webp',
      '/rog/scrolly_4_kitchen.webp',
      '/rog/scrolly_5_terrace.webp',
    ],
    description: {
      en: 'A founder-grade residence on a private wooded lot: double-height great room, chef’s kitchen, and a primary suite designed for calm. Minutes from Houston’s northern corridor.',
      es: 'Una residencia de nivel fundador en un lote arbolado privado: gran salón de doble altura, cocina de chef y suite principal diseñada para la calma. A minutos del corredor norte de Houston.',
    },
    harUrl: 'https://www.har.com/rangel-oviedo/agent_rangelovie',
    mlsNumber: '00000000',
    featured: true,
  },
  {
    id: 'sample-sugar-land',
    slug: 'sugar-land-investment-estate',
    title: {
      en: 'Sugar Land Investment Estate',
      es: 'Finca de Inversión en Sugar Land',
    },
    city: 'Sugar Land, TX',
    price: '$1,850,000',
    beds: 4,
    baths: 5,
    sqft: 6100,
    status: 'for_sale',
    images: [
      '/rog/scrolly_2_entrance.webp',
      '/rog/scrolly_3_livingroom.webp',
      '/rog/scrolly_5_terrace.webp',
      '/rog/scrolly_1_facade.webp',
    ],
    description: {
      en: 'A capital-appreciation play in one of Texas’ strongest school corridors. Generous floor plan, flexible layout, and rental upside for international investors.',
      es: 'Una jugada de plusvalía en uno de los corredores escolares más fuertes de Texas. Planta generosa, distribución flexible y potencial de renta para inversores internacionales.',
    },
    harUrl: 'https://www.har.com/rangel-oviedo/agent_rangelovie',
    mlsNumber: '00000000',
    featured: true,
  },
  {
    id: 'sample-memorial',
    slug: 'memorial-modern-villa',
    title: {
      en: 'Memorial Modern Villa',
      es: 'Villa Moderna en Memorial',
    },
    city: 'Houston, TX',
    price: '$3,100,000',
    beds: 5,
    baths: 6,
    sqft: 4800,
    status: 'for_sale',
    images: [
      '/rog/scrolly_4_kitchen.webp',
      '/rog/scrolly_3_livingroom.webp',
      '/rog/scrolly_5_terrace.webp',
      '/rog/scrolly_1_facade.webp',
    ],
    description: {
      en: 'Architectural modern inside the loop: light-filled volumes, spa-grade primary bath, and a resort backyard. Built for the family that wants Houston at its best.',
      es: 'Modernidad arquitectónica dentro del loop: volúmenes llenos de luz, baño principal nivel spa y patio tipo resort. Para la familia que quiere lo mejor de Houston.',
    },
    harUrl: 'https://www.har.com/rangel-oviedo/agent_rangelovie',
    mlsNumber: '00000000',
    featured: true,
  },
];

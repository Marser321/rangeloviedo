export interface GalleryImage {
  src: string;
  alt: { en: string; es: string };
  category: 'union' | 'complicidad' | 'estrategia';
}

export const teamGallery: GalleryImage[] = [
  {
    src: '/rog/team-gallery/MY9A0105.jpg',
    alt: { en: 'Rangel Oviedo Group team together in the Texas landscape', es: 'Equipo de Rangel Oviedo Group reunido en el paisaje de Texas' },
    category: 'union'
  },
  {
    src: '/rog/team-gallery/MY9A0064.jpg',
    alt: { en: 'Team sharing comments and smiling outdoors', es: 'Miembros del equipo compartiendo comentarios y sonriendo al aire libre' },
    category: 'complicidad'
  },
  {
    src: '/rog/team-gallery/MY9A0071.jpg',
    alt: { en: 'Strategic planning and alignment session in Texas', es: 'Sesión de planificación estratégica y alineación en Texas' },
    category: 'estrategia'
  },
  {
    src: '/rog/team-gallery/MY9A0084.jpg',
    alt: { en: 'Natural laughter and synergy among the advisors', es: 'Risas naturales y sinergia entre los asesores' },
    category: 'complicidad'
  },
  {
    src: '/rog/team-gallery/MY9A0087.jpg',
    alt: { en: 'Discussing portfolios in the Texas grasslands', es: 'Discusión de portafolios en los pastizales de Texas' },
    category: 'estrategia'
  },
  {
    src: '/rog/team-gallery/MY9A0089.jpg',
    alt: { en: 'Spontaneous smile from the consulting team', es: 'Sonrisa espontánea del equipo consultor' },
    category: 'complicidad'
  },
  {
    src: '/rog/team-gallery/MY9A0090.jpg',
    alt: { en: 'Team focus and determination', es: 'Enfoque y determinación del equipo consultor' },
    category: 'estrategia'
  },
  {
    src: '/rog/team-gallery/MY9A0093.jpg',
    alt: { en: 'Genuine connection and teamwork', es: 'Conexión genuina y trabajo en equipo' },
    category: 'complicidad'
  },
  {
    src: '/rog/team-gallery/MY9A0099.jpg',
    alt: { en: 'United team looking towards the future', es: 'Equipo unido con la mirada hacia el futuro' },
    category: 'union'
  },
  {
    src: '/rog/team-gallery/MY9A0102.jpg',
    alt: { en: 'Informal meeting in the field', es: 'Reunión informal de planeación en el campo' },
    category: 'estrategia'
  },
  {
    src: '/rog/team-gallery/MY9A0107.jpg',
    alt: { en: 'Strategic lineup of the concierge advisors', es: 'Alineación estratégica de los asesores de concierge' },
    category: 'union'
  },
  {
    src: '/rog/team-gallery/MY9A0113.jpg',
    alt: { en: 'Shared laughter and lighthearted moments', es: 'Risas compartidas y momentos de complicidad' },
    category: 'complicidad'
  },
  {
    src: '/rog/team-gallery/MY9A0113-2.jpg',
    alt: { en: 'Genuine synergy and smiling interaction', es: 'Sinergia genuina e interacción sonriente' },
    category: 'complicidad'
  },
  {
    src: '/rog/team-gallery/MY9A0115.jpg',
    alt: { en: 'Rangel Oviedo Group standing strong in Texas', es: 'Rangel Oviedo Group posando con firmeza en Texas' },
    category: 'union'
  },
  {
    src: '/rog/team-gallery/MY9A0229.jpg',
    alt: { en: 'Conversations and natural chemistry', es: 'Conversaciones y química natural en el rancho' },
    category: 'complicidad'
  },
  {
    src: '/rog/team-gallery/MY9A0232.jpg',
    alt: { en: 'Discussing local Texas investment properties', es: 'Análisis y discusión de propiedades de inversión en Texas' },
    category: 'estrategia'
  },
  {
    src: '/rog/team-gallery/MY9A0233.jpg',
    alt: { en: 'Focusing on strategic negotiation points', es: 'Enfoque en los puntos estratégicos de negociación' },
    category: 'estrategia'
  },
  {
    src: '/rog/team-gallery/MY9A0233-2.jpg',
    alt: { en: 'Interactive planning and collaboration', es: 'Planificación interactiva y colaboración constante' },
    category: 'estrategia'
  },
  {
    src: '/rog/team-gallery/MY9A0237.jpg',
    alt: { en: 'Security and confidence of our elite team', es: 'Seguridad y confianza de nuestro equipo de élite' },
    category: 'union'
  },
  {
    src: '/rog/team-gallery/MY9A0240.jpg',
    alt: { en: 'Laughter reflecting genuine team unity', es: 'Risas que reflejan la verdadera unión del equipo' },
    category: 'complicidad'
  },
  {
    src: '/rog/team-gallery/MY9A0242.jpg',
    alt: { en: 'On-site strategy review', es: 'Revisión estratégica en el sitio' },
    category: 'estrategia'
  },
  {
    src: '/rog/team-gallery/MY9A0253.jpg',
    alt: { en: 'Walking together towards new horizons', es: 'Caminando juntos hacia nuevos horizontes' },
    category: 'union'
  },
  {
    src: '/rog/team-gallery/MY9A0255.jpg',
    alt: { en: 'Solid presence of Rangel Oviedo Group in Texas', es: 'Presencia sólida de Rangel Oviedo Group en Texas' },
    category: 'union'
  },
  {
    src: '/rog/team-gallery/MY9A0255-2.jpg',
    alt: { en: 'Unity and professionalism in every detail', es: 'Unión y profesionalismo en cada detalle' },
    category: 'union'
  },
  {
    src: '/rog/team-gallery/MY9A0256.jpg',
    alt: { en: 'Observing the horizon of real estate investments', es: 'Observando el horizonte de inversiones inmobiliarias' },
    category: 'estrategia'
  },
  {
    src: '/rog/team-gallery/MY9A0257.jpg',
    alt: { en: 'Planning the acquisition path with confidence', es: 'Trazando la ruta de adquisición con confianza' },
    category: 'estrategia'
  }
];

// 7 fotos grupales (priorizando 'union' / más miembros) para un bento de 12
// columnas que llena las 3 filas sin huecos: [6x2][6] · [3][3] · [4][4][4].
export const teamStoryImages: GalleryImage[] = [
  teamGallery.find((image) => image.src.endsWith('MY9A0105.jpg'))!,
  teamGallery.find((image) => image.src.endsWith('MY9A0115.jpg'))!,
  teamGallery.find((image) => image.src.endsWith('MY9A0107.jpg'))!,
  teamGallery.find((image) => image.src.endsWith('MY9A0099.jpg'))!,
  teamGallery.find((image) => image.src.endsWith('MY9A0071.jpg'))!,
  teamGallery.find((image) => image.src.endsWith('MY9A0237.jpg'))!,
  teamGallery.find((image) => image.src.endsWith('MY9A0257.jpg'))!,
];

export const teamFeatureImage = '/rog/team-texans.jpg';

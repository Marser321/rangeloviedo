/**
 * Modelo de datos normalizado del catálogo de propiedades.
 *
 * La UI consume SIEMPRE este tipo, sin importar de dónde vengan los datos
 * (hoy: datos curados locales; mañana: feed RESO/RETS vía middleware). Así la
 * fuente se puede cambiar sin tocar componentes ni páginas.
 */

export type Locale = 'en' | 'es';

/** Texto bilingüe; se resuelve con el idioma activo (`useLanguage().t`). */
export interface Localized {
  en: string;
  es: string;
}

export type PropertyStatus = 'for_sale' | 'for_lease' | 'pending' | 'sold';

export interface Property {
  /** Identificador estable (número MLS de HAR o id interno). */
  id: string;
  /** Slug para la URL `/propiedades/[slug]`. */
  slug: string;
  title: Localized;
  /** Ciudad/zona para mostrar, p. ej. "The Woodlands, TX". */
  city: string;
  /** Precio ya formateado para mostrar, p. ej. "$2,400,000". */
  price: string;
  beds?: number;
  baths?: number;
  /** Superficie construida (pies cuadrados). */
  sqft?: number;
  status: PropertyStatus;
  /** Rutas de imágenes (locales en `/public` o dominio permitido en next.config). */
  images: string[];
  description: Localized;
  /** URL del listado oficial en HAR.com (atribución + fuente de verdad). */
  harUrl: string;
  /** Número MLS de HAR, si aplica. */
  mlsNumber?: string;
  /** Destacada en home/listado. */
  featured?: boolean;
}

/**
 * Contrato de fuente de datos. Cualquier implementación (curada, RESO, etc.)
 * cumple esta interfaz; la UI depende solo de ella.
 */
export interface PropertySource {
  getAll(): Promise<Property[]>;
  getFeatured(): Promise<Property[]>;
  getBySlug(slug: string): Promise<Property | null>;
  getSlugs(): Promise<string[]>;
}

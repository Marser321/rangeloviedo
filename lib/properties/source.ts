import type { PropertySource } from './types';
import { curatedSource } from './curated';

export type { Property, PropertyStatus, PropertySource, Localized, Locale } from './types';

/**
 * Fuente de datos ACTIVA del catálogo.
 *
 * Hoy: `curatedSource` (listados curados locales).
 * Futuro: para alimentar el catálogo desde el MLS de forma automática, crear
 * `lib/properties/reso.ts` (RESO Web API vía middleware: SimplyRETS/Realtyna)
 * que implemente `PropertySource` y cambiar SOLO esta línea. La UI no cambia.
 */
export const properties: PropertySource = curatedSource;

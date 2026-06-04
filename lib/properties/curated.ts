import type { Property, PropertySource } from './types';
import { featuredProperties } from './data/featured-properties';

/**
 * Fuente "curada": listados mantenidos a mano en `data/featured-properties.ts`.
 * Cumple las reglas IDX (listados propios del agente + enlace a HAR) y permite
 * lanzar el diseño premium sin depender de un feed licenciado.
 */
const all: Property[] = featuredProperties;

export const curatedSource: PropertySource = {
  async getAll() {
    return all;
  },
  async getFeatured() {
    return all.filter((p) => p.featured);
  },
  async getBySlug(slug: string) {
    return all.find((p) => p.slug === slug) ?? null;
  },
  async getSlugs() {
    return all.map((p) => p.slug);
  },
};

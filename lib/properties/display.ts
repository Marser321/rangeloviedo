import type { Localized, PropertyStatus } from './types';

/** Etiquetas bilingües de estado, compartidas por tarjeta y detalle. */
export const PROPERTY_STATUS_LABEL: Record<PropertyStatus, Localized> = {
  for_sale: { en: 'For Sale', es: 'En Venta' },
  for_lease: { en: 'For Lease', es: 'En Renta' },
  pending: { en: 'Pending', es: 'En Proceso' },
  sold: { en: 'Sold', es: 'Vendida' },
};

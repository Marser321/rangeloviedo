import { siteConfig } from './site-config';

/**
 * Canal WhatsApp (secundario) del sitio. Centraliza la construcción de enlaces
 * `wa.me` para las CTAs de propiedades. La conversión principal sigue siendo la
 * sección de contacto (`siteConfig.contactHref`).
 */

const BASE_MESSAGE =
  'Hola Rangel, vi tu web y quiero una orientación personalizada sobre real estate en Texas. Mi interés principal es:';

/** Enlace de WhatsApp con un "intent" (interés) que se agrega al mensaje base. */
export function whatsappLink(intent: string): string {
  const text = encodeURIComponent(`${BASE_MESSAGE} ${intent}.`);
  const number = siteConfig.whatsappNumber;
  return number ? `https://wa.me/${number}?text=${text}` : `https://wa.me/?text=${text}`;
}

/** Enlace de WhatsApp para consultar por una propiedad específica del catálogo. */
export function whatsappPropertyLink(opts: { title: string; ref?: string }): string {
  const ref = opts.ref ? ` (Ref MLS: ${opts.ref})` : '';
  return whatsappLink(`la propiedad "${opts.title}"${ref}`);
}

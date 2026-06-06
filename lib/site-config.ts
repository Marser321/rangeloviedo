/**
 * Configuración central del sitio de Rangel Oviedo Group.
 *
 * Los valores que cambian por entorno (URL del sitio, número de WhatsApp, embed
 * del widget IDX de HAR, nombre del broker) se leen de variables de entorno en
 * `.env.local`. Los valores estables del agente (slug y perfil en HAR.com) viven
 * aquí.
 */

export const siteConfig = {
  name: 'Rangel Oviedo Group',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rangeloviedo.com',

  /** Conversión principal del sitio: la sección de contacto (formulario GHL). */
  contactHref: '/#contacto',
  /** Canal secundario opcional. International format, sin + ni espacios. */
  whatsappNumber: process.env.NEXT_PUBLIC_RANGEL_WHATSAPP ?? '',

  /** Datos de la cuenta del agente en HAR.com (MLS de Houston). */
  har: {
    /** Slug del agente en HAR (https://www.har.com/<slug>). */
    agentSlug: 'rangelovie',
    /** Perfil oficial del agente en HAR.com. */
    profileUrl: 'https://www.har.com/rangel-oviedo/agent_rangelovie',
    /**
     * URL del iframe del widget IDX generado desde el panel Platinum de HAR
     * (https://cms.har.com/idxtools/  ·  https://www.har.com/moa_idx_tools).
     * Pegar la URL del widget en NEXT_PUBLIC_HAR_IDX_WIDGET_URL. Mientras esté
     * vacía, /buscar muestra un placeholder con instrucciones.
     */
    idxWidgetUrl: process.env.NEXT_PUBLIC_HAR_IDX_WIDGET_URL ?? '',
    /**
     * URL del embed "View My Listings" (solo los listados propios del agente),
     * auto-actualizado desde HAR. Alimenta el catálogo completo en /propiedades.
     * Pegar en NEXT_PUBLIC_HAR_MY_LISTINGS_URL.
     */
    myListingsUrl: process.env.NEXT_PUBLIC_HAR_MY_LISTINGS_URL ?? '',
    /**
     * URL del embed "View My Sold Listings" (propiedades vendidas) — portafolio
     * de trayectoria en /propiedades. Pegar en NEXT_PUBLIC_HAR_SOLD_LISTINGS_URL.
     */
    soldListingsUrl: process.env.NEXT_PUBLIC_HAR_SOLD_LISTINGS_URL ?? '',
    /** Nombre del broker of record (requerido en avisos IDX). */
    brokerName: process.env.NEXT_PUBLIC_HAR_BROKER_NAME ?? 'Rangel Oviedo Group',
  },

  /**
   * Trayectoria del agente (prueba social). Cifras tomadas del perfil HAR de
   * Rangel — actualizar a mano cuando cambien (HAR no expone un feed de totales).
   */
  trackRecord: {
    sold: 86,
    leased: 55,
    reviews: 45,
    rating: '5.0',
  },
} as const;

export type SiteConfig = typeof siteConfig;

# Integración con HAR.com — Rangel Oviedo Group

> Guía de estrategia y referencia técnica para mostrar el catálogo del MLS de
> Houston (HAR.com) en este sitio. Última revisión: junio 2026.

## 1. Qué es HAR.com

**HAR.com** es el portal de la **Houston Association of REALTORS®**, uno de los
MLS (Multiple Listing Service) más grandes de EE. UU. Es donde el cliente
(Rangel Oviedo, agente `rangelovie`,
[perfil](https://www.har.com/rangel-oviedo/agent_rangelovie)) publica y gestiona
sus listados. El "catálogo" del cliente vive ahí; nuestra web necesita
**mostrar esos datos**, no reemplazarlos.

## 2. Las tres formas de integrar HAR

| # | Camino | Qué es | Control de diseño | Requisitos | Costo |
|---|--------|--------|-------------------|------------|-------|
| 1 | **Widgets IDX de HAR** | Snippets embebibles (iframe): Home Finder (búsqueda MLS completa), Featured Listings, School/Neighborhood Finder, captura de leads. | Bajo (estética HAR) | **Suscripción Platinum** ✓ (el cliente ya la tiene) | Incluido en Platinum |
| 2 | **Feed de datos crudo** (RESO Web API / RETS) | Datos crudos del MLS para construir UI 100% propia. | Total | Licencia de datos firmada por el **broker of record**; HAR restringe estos feeds y prioriza sus widgets | Medio-alto |
| 3 | **Middleware de terceros** | SimplyRETS, Realtyna, iHomefinder, IDX Broker: gestionan el feed RETS/RESO y exponen API/widgets propios. | Alto | Igual que #2 (licencia de datos) | $50–300+/mes |

**Nota sobre el estándar técnico:** en 2026 el estándar vigente es el **RESO Web
API** (REST/OData), que reemplazó al antiguo **RETS**. Si algún día se pide un
feed (caminos #2/#3), hay que solicitarlo **por nombre**: "RESO Web API IDX data
feed" (endpoint OData + client_id + client_secret + token), o muchos MLS envían
credenciales RETS por defecto.

## 3. Enfoque elegido: **Híbrido**

El sitio tiene una estética premium muy específica ("Lujo Latino"). Un iframe
genérico de HAR en cada tarjeta rompería el diseño; pero construir TODA la
búsqueda del MLS a medida exige licencia de feed + costo mensual. El híbrido
toma lo mejor de cada lado:

- **Propiedades destacadas → diseño 100% a medida.** Tarjetas y fichas propias,
  alimentadas por una capa de datos curada (hoy) o por un feed (mañana), sin
  cambiar la UI.
- **Búsqueda completa del MLS → widget IDX de HAR** embebido en `/buscar`. Datos
  servidos y mantenidos por HAR, siempre actualizados, sin trabajo de
  sincronización ni costo extra (incluido en Platinum).

## 4. Reglas de display IDX (cumplimiento)

Mostrar datos del MLS conlleva obligaciones. Lo que respetamos:

- **Tarjetas a medida:** sin un feed licenciado, el contenido seguro son
  **listados propios del agente** (donde Rangel es el listing agent) o
  selecciones curadas **siempre con enlace al listado oficial en HAR** (`harUrl`).
  No se debe republicar datos MLS de otros brokers en UI propia sin un feed IDX
  con licencia.
- **Búsqueda (`/buscar`):** usa el widget oficial de HAR → cumple por defecto
  (HAR sirve los datos).
- **Atribución + aviso:** el componente [`MlsDisclaimer`](../components/MlsDisclaimer.tsx)
  muestra la atribución a HAR y la cláusula "data deemed reliable but not
  guaranteed" en todas las páginas de propiedades.

## 5. Cómo está implementado en este código

Principio: **la UI depende de una interfaz de datos, no de la fuente.**

```
lib/properties/
  types.ts      → Property (modelo normalizado, bilingüe) + PropertySource (interfaz)
  source.ts     → `properties`: la fuente ACTIVA (hoy = curated)
  curated.ts    → implementación con datos locales (cumple IDX)
  data/featured-properties.ts → los listados curados (REEMPLAZAR por los reales)
  display.ts    → etiquetas de estado bilingües

components/
  PropertyCard.tsx   → tarjeta premium (enlaza a /propiedades/[slug])
  PropertiesGrid.tsx → rejilla (recibe Property[]; por defecto, destacados curados)
  PropertyDetail.tsx → ficha de detalle (galería + CTA contacto + enlace a HAR)
  HarIdxWidget.tsx   → embed del widget IDX de HAR (búsqueda)
  MlsDisclaimer.tsx  → aviso de cumplimiento

app/
  propiedades/page.tsx          → listado de destacadas (+ CTA a /buscar)
  propiedades/[slug]/page.tsx   → detalle (static params + metadata SEO)
  buscar/page.tsx               → widget IDX de HAR
```

**Conversión:** la CTA principal de la ficha apunta a la sección de contacto
(`siteConfig.contactHref` = `/#contacto`, formulario GoHighLevel). Si se define
`NEXT_PUBLIC_RANGEL_WHATSAPP`, además aparece un botón de WhatsApp con el contexto
de la propiedad.

**Para cambiar a un feed automático en el futuro:** crear
`lib/properties/reso.ts` que implemente `PropertySource` (consumiendo el RESO Web
API vía middleware) y cambiar **una línea** en `source.ts`. Componentes y páginas
no cambian.

## 6. Conectar el widget IDX de HAR (acción del cliente)

1. Entrar a HAR logueado (cuenta Platinum) →
   [cms.har.com/idxtools](https://cms.har.com/idxtools/) o
   [har.com/moa_idx_tools](https://www.har.com/moa_idx_tools).
2. Generar el widget **Home Finder** (búsqueda completa) y/o **Featured Listings**.
3. Copiar la **URL del iframe** del widget.
4. Pegarla en `.env.local`:

   ```bash
   NEXT_PUBLIC_HAR_IDX_WIDGET_URL="https://...har.com/.../widget..."
   NEXT_PUBLIC_HAR_BROKER_NAME="Nombre legal del broker of record"
   # Opcional (canal secundario): número con código de país, sin +
   NEXT_PUBLIC_RANGEL_WHATSAPP="1XXXXXXXXXX"
   ```

Mientras `NEXT_PUBLIC_HAR_IDX_WIDGET_URL` esté vacía, `/buscar` muestra un
placeholder con estas mismas instrucciones (no rompe el build).

## 7. Prerrequisitos / pendientes del cliente

- [ ] **Embed del widget IDX** generado desde el panel Platinum → pegar la URL.
- [ ] **Listados destacados reales** (sustituir `lib/properties/data/featured-properties.ts`):
      título, ciudad, precio, recámaras/baños/pies², fotos en alta, `harUrl` del
      listado oficial y `mlsNumber`.
- [ ] **Nombre legal del broker of record** (para el aviso IDX).
- [ ] *(Opcional, futuro)* Feed RESO automático: requiere licencia de datos
      firmada por el broker + contratar middleware (SimplyRETS/Realtyna). La
      arquitectura ya está lista para ese upgrade sin rehacer la UI.

## Fuentes

- [HAR IDX Tools](https://cms.har.com/idxtools/) · [HAR Widget Gallery](https://www.har.com/content/widgets) · [HAR APIs (Q&A)](https://www.har.com/question/27185_har-apis-to-access-data)
- [Get Platinum Access — HAR](https://www.har.com/content/page/platinum_services)
- [RESO — Moving to Replication via the Web API](https://www.reso.org/moving-replication-reso-web-api/)
- [Realtyna — Connect HAR RETS feed](https://realtyna.com/blog/connect-har-rets-feed-wordpress/) · [SimplyRETS Developer API](https://simplyrets.com/idx-developer-api)

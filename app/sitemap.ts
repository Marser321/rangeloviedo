import type { MetadataRoute } from 'next';
import { properties } from '@/lib/properties/source';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://rangeloviedo.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const slugs = await properties.getSlugs();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/propiedades`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/buscar`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/ceo`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/equipo`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...slugs.map((slug) => ({
      url: `${SITE_URL}/propiedades/${slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
    {
      url: `${SITE_URL}/showcase`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];
}

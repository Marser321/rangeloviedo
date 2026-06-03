import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { LanguageProvider } from '@/components/LanguageContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  style: ['normal', 'italic'],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://rangeloviedo.com';
const title = 'Rangel Oviedo Group | Texas Real Estate Concierge';
const description =
  'Private bilingual real estate advisory for buying, investing, selling, and relocating in Texas with Rangel Oviedo Group.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  applicationName: 'Rangel Oviedo Group',
  alternates: {
    canonical: '/',
    languages: {
      'es-MX': '/',
      'en-US': '/',
    },
  },
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png' }],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title,
    description,
    siteName: 'Rangel Oviedo Group',
    type: 'website',
    locale: 'es_MX',
    url: SITE_URL,
    images: [
      {
        url: '/rog/hero-rangel.webp',
        width: 1200,
        height: 630,
        alt: 'Rangel Oviedo Group Texas Real Estate Concierge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/rog/hero-rangel.webp'],
  },
};

export const viewport: Viewport = {
  themeColor: '#271f1a',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Rangel Oviedo Group',
  url: SITE_URL,
  logo: `${SITE_URL}/brand/rog-logo-gold.png`,
  image: `${SITE_URL}/rog/hero-rangel.webp`,
  description,
  areaServed: [
    { '@type': 'State', name: 'Texas' },
    { '@type': 'AdministrativeArea', name: 'Mexico' },
    { '@type': 'AdministrativeArea', name: 'Latin America' },
  ],
  knowsLanguage: ['es', 'en'],
  serviceType: ['Buying', 'Selling', 'Investing', 'Relocation', 'Off-market sourcing'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <head>
        {/* Preload the first hero sequence frame for a faster LCP, per device. */}
        <link
          rel="preload"
          as="image"
          href="/assets/seq01/mobile/frame_0001.webp"
          media="(max-width: 768px)"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/seq01/desktop/frame_0001.webp"
          media="(min-width: 769px)"
        />
      </head>
      <body suppressHydrationWarning className="bg-ro-light font-sans text-ro-dark selection:bg-ro-accent selection:text-white">
        <a href="#main-content" className="skip-link">
          Saltar al contenido
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

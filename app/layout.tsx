import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { LanguageProvider } from '@/components/LanguageContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  style: ['normal', 'italic'],
});

const title = 'Rangel Oviedo Group | Texas Real Estate Concierge';
const description =
  'Boutique bilingual real estate advisory for buying, investing, selling, and relocating in Texas with Rangel Oviedo Group.';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://rangeloviedo.com'),
  title,
  description,
  applicationName: 'Rangel Oviedo Group',
  icons: {
    icon: [
      { url: '/favicon.png' },
      { url: '/brand/rog-logo-gold.png', type: 'image/png' },
    ],
    apple: '/brand/rog-logo-gold.png',
  },
  openGraph: {
    title,
    description,
    siteName: 'Rangel Oviedo Group',
    type: 'website',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body suppressHydrationWarning className="bg-ro-light font-sans text-ro-dark selection:bg-ro-accent selection:text-white">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

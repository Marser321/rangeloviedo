import type {Metadata} from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css'; 
import { LanguageProvider } from '@/components/LanguageContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display', style: ['normal', 'italic'] });

export const metadata: Metadata = {
  title: 'Rangel Oviedo | Texas Real Estate Concierge',
  description: 'Orientación personalizada para comprar, invertir o vender bienes raíces en Texas con Rangel Oviedo.',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body suppressHydrationWarning className="font-sans text-ro-dark bg-ro-light selection:bg-ro-accent selection:text-white">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

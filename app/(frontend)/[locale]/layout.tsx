import type { Metadata } from 'next'
import { Bricolage_Grotesque, Figtree } from 'next/font/google'

import '@/app/globals.css'

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const body = Figtree({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'QRious — QR codes dynamiques pour Art, Immobilier & Cartes de visite',
  description:
    'Créez des QR codes permanents qui pointent vers des landing pages dynamiques. Art, immobilier, carte de visite — marque blanche incluse.',
  openGraph: {
    title: 'QRious — QR codes dynamiques multi-métiers',
    description:
      'Un QR code. Trois univers. Zéro limite. Landing pages mobile-first avec marque blanche.',
    type: 'website',
    locale: 'fr_FR',
  },
}

import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/src/i18n/routing';
import { ScrollToTop } from '@/components/ui/scroll-to-top'

export default async function FrontendLayout({ 
  children,
  params 
}: { 
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${display.variable} ${body.variable}`}>
      <body className="font-body antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
          <ScrollToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

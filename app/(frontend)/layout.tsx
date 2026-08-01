import type { Metadata } from 'next'
import { Bricolage_Grotesque, Figtree } from 'next/font/google'

import '../globals.css'

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

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  )
}

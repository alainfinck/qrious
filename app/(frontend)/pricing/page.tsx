import type { Metadata } from 'next'

import PricingPageClient from './PricingPageClient'

export const metadata: Metadata = {
  title: 'Tarifs | QRious',
  description:
    'Tarifs QRious — plans Découverte, Starter, Professional et Enterprise. Essai gratuit 14 jours.',
}

export default function PricingPage() {
  return <PricingPageClient />
}

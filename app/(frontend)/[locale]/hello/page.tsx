import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { HelloScanLanding } from '@/components/marketing/HelloScanLanding'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('HelloScan')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    robots: { index: false, follow: false },
  }
}

export default function HelloPage() {
  return <HelloScanLanding />
}

import { getTranslations } from 'next-intl/server'

import { DashboardPageHeader } from '@/components/dashboard/DashboardPageHeader'
import { QrCodesGrid } from '@/components/dashboard/QrCodesGrid'
import { getAllLandingPages } from '@/lib/payload'

export default async function SmartPagesPage() {
  const [pages, t] = await Promise.all([
    getAllLandingPages(),
    getTranslations('Dashboard.smartPages'),
  ])

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <DashboardPageHeader title={t('title')} description={t('description')} />
      <QrCodesGrid pages={pages} />
    </div>
  )
}

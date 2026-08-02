import { getTranslations } from 'next-intl/server'

import { DashboardPageHeader } from '@/components/dashboard/DashboardPageHeader'
import { StatistiquesClient } from '@/components/dashboard/StatistiquesClient'
import { getAllLandingPages, getDashboardStats } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export default async function StatistiquesPage() {
  const [stats, pages, t] = await Promise.all([
    getDashboardStats(),
    getAllLandingPages(),
    getTranslations('Dashboard.stats'),
  ])

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <DashboardPageHeader
        title={t('title')}
        description={t('description')}
        showCreateButton={false}
      />

      <StatistiquesClient stats={stats} pages={pages} />
    </div>
  )
}

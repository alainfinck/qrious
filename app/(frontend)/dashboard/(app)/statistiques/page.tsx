import { ActivityChart } from '@/components/dashboard/ActivityChart'
import { DashboardPageHeader } from '@/components/dashboard/DashboardPageHeader'
import { OverviewStats } from '@/components/dashboard/OverviewStats'
import { getAllLandingPages, getDashboardStats } from '@/lib/payload'

export default async function StatistiquesPage() {
  const [stats, pages] = await Promise.all([getDashboardStats(), getAllLandingPages()])

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <DashboardPageHeader
        title="Statistiques"
        description="Suivez les performances de vos QR codes"
        showCreateButton={false}
      />

      <OverviewStats total={stats.total} pages={pages} />
      <ActivityChart />
    </div>
  )
}

import { ActivityChart } from '@/components/dashboard/ActivityChart'
import { DashboardPageHeader } from '@/components/dashboard/DashboardPageHeader'
import { OverviewStats } from '@/components/dashboard/OverviewStats'
import { RecentQrList } from '@/components/dashboard/RecentQrList'
import { getAllLandingPages, getDashboardStats } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export default async function DashboardHomePage() {
  const [stats, pages] = await Promise.all([getDashboardStats(), getAllLandingPages()])

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <DashboardPageHeader
        title="Tableau de bord"
        description="Bienvenue sur votre tableau de bord Art QR."
      />

      <OverviewStats total={stats.total} pages={pages} />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
        <ActivityChart />
        <RecentQrList pages={pages} />
      </div>
    </div>
  )
}

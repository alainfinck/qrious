import { DashboardPageHeader } from '@/components/dashboard/DashboardPageHeader'
import { StatistiquesClient } from '@/components/dashboard/StatistiquesClient'
import { getAllLandingPages, getDashboardStats } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export default async function StatistiquesPage() {
  const [stats, pages] = await Promise.all([getDashboardStats(), getAllLandingPages()])

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <DashboardPageHeader
        title="Statistiques & Intelligence d'Affaires"
        description="Analysez les scans, la géolocalisation, les heures de pointe et vos rapports hebdomadaires par email."
        showCreateButton={false}
      />

      <StatistiquesClient stats={stats} pages={pages} />
    </div>
  )
}

import { DashboardPageHeader } from '@/components/dashboard/DashboardPageHeader'
import { QrCodesGrid } from '@/components/dashboard/QrCodesGrid'
import { getAllLandingPages } from '@/lib/payload'

export default async function QrCodesPage() {
  const pages = await getAllLandingPages()

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <DashboardPageHeader
        title="Mes QR Codes"
        description="Gérez et suivez tous vos QR codes générés."
      />
      <QrCodesGrid pages={pages} />
    </div>
  )
}

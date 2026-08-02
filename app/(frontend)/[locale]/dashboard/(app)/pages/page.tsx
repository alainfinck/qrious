import { DashboardPageHeader } from '@/components/dashboard/DashboardPageHeader'
import { QrCodesGrid } from '@/components/dashboard/QrCodesGrid'
import { getAllLandingPages } from '@/lib/payload'

export default async function SmartPagesPage() {
  const pages = await getAllLandingPages()

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <DashboardPageHeader
        title="Mes Smart Pages"
        description="Gérez les pages de destination dynamiques associées à vos QR Codes."
      />
      <QrCodesGrid pages={pages} />
    </div>
  )
}

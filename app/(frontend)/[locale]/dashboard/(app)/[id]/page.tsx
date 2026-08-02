import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { QrCodeForm } from '@/components/dashboard/QrCodeForm'
import { QrPreviewCard } from '@/components/dashboard/QrPreviewCard'
import { QrStatsPanel } from '@/components/dashboard/QrStatsPanel'
import { Button } from '@/components/ui/button'
import { updateQrCodeAction } from '@/lib/dashboard/actions'
import { getLandingPageById } from '@/lib/payload'
import { Link } from '@/src/i18n/routing'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditQrCodePage({ params }: PageProps) {
  const { id } = await params
  const [page, t] = await Promise.all([
    getLandingPageById(id),
    getTranslations('Dashboard.qrEdit'),
  ])

  if (!page) {
    notFound()
  }

  const boundUpdate = updateQrCodeAction.bind(null, id)

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{page.title}</h1>
          <p className="text-sm text-muted-foreground">{t('description')}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <QrCodeForm page={page} action={boundUpdate} submitLabel={t('submit')} />
        <div className="space-y-6">
          <QrPreviewCard page={page} />
          <QrStatsPanel page={page} />
        </div>
      </div>
    </div>
  )
}

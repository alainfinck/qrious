import { ArrowLeft } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { QrCodeForm } from '@/components/dashboard/QrCodeForm'
import { Button } from '@/components/ui/button'
import { createQrCodeAction } from '@/lib/dashboard/actions'
import { Link } from '@/src/i18n/routing'

import type { LandingPageVertical } from '@/types/landing-page'

export default async function NewQrCodePage({
  searchParams,
}: {
  searchParams: Promise<{ vertical?: string }>
}) {
  const [params, t, tCommon] = await Promise.all([
    searchParams,
    getTranslations('Dashboard.qrNew'),
    getTranslations('Dashboard.common'),
  ])

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-start gap-3">
        <Button asChild variant="ghost" size="icon" className="mt-0.5 shrink-0">
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">{tCommon('back')}</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
          <p className="text-sm text-muted-foreground">{t('description')}</p>
        </div>
      </div>

      <QrCodeForm
        action={createQrCodeAction}
        submitLabel={t('submit')}
        initialVertical={params.vertical as LandingPageVertical | undefined}
      />
    </div>
  )
}

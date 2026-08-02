import { getTranslations } from 'next-intl/server'

import { DashboardPageHeader } from '@/components/dashboard/DashboardPageHeader'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getCurrentUser } from '@/lib/auth/session'
import { getDashboardStats } from '@/lib/payload'

export default async function ProfilPage() {
  const [stats, user, t] = await Promise.all([
    getDashboardStats(),
    getCurrentUser(),
    getTranslations('Dashboard.profile'),
  ])

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <DashboardPageHeader
        title={t('title')}
        description={t('description')}
        showCreateButton={false}
      />

      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle>{t('accountTitle')}</CardTitle>
          <CardDescription>{t('accountDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="flex justify-between border-b pb-3">
            <span className="text-muted-foreground">{t('email')}</span>
            <span className="font-medium">{user?.email ?? '—'}</span>
          </div>
          <div className="flex justify-between border-b pb-3">
            <span className="text-muted-foreground">{t('role')}</span>
            <span className="font-medium">
              {user?.role === 'admin' ? t('roleAdmin') : t('roleUser')}
            </span>
          </div>
          <div className="flex justify-between border-b pb-3">
            <span className="text-muted-foreground">{t('activeQrCodes')}</span>
            <span className="font-medium">{stats.published}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t('drafts')}</span>
            <span className="font-medium">{stats.drafts}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

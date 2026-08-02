import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { LoginForm } from '@/components/dashboard/LoginForm'
import { isAuthenticated } from '@/lib/auth/session'

export const dynamic = 'force-dynamic'

export default async function DashboardLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ reset?: string; registered?: string; redirectTo?: string }>
}) {
  const [params, t] = await Promise.all([
    searchParams,
    getTranslations('Dashboard.login'),
  ])

  if (await isAuthenticated()) {
    redirect(
      params.redirectTo && params.redirectTo.startsWith('/dashboard')
        ? params.redirectTo
        : '/dashboard',
    )
  }

  let notice: string | null = null
  if (params.reset === '1') {
    notice = t('noticeReset')
  } else if (params.registered === '1') {
    notice = t('noticeRegistered')
  } else if (params.redirectTo) {
    notice = t('noticeRedirect')
  }

  return <LoginForm notice={notice} redirectTo={params.redirectTo} />
}

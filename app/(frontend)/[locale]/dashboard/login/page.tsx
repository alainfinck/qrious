import { redirect } from 'next/navigation'

import { LoginForm } from '@/components/dashboard/LoginForm'
import { isAuthenticated } from '@/lib/auth/session'

export const dynamic = 'force-dynamic'

export default async function DashboardLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ reset?: string; registered?: string; redirectTo?: string }>
}) {
  const params = await searchParams

  if (await isAuthenticated()) {
    redirect(params.redirectTo && params.redirectTo.startsWith('/dashboard') ? params.redirectTo : '/dashboard')
  }

  let notice: string | null = null
  if (params.reset === '1') {
    notice = 'Mot de passe mis à jour. Vous pouvez vous connecter.'
  } else if (params.registered === '1') {
    notice = 'Compte créé. Connectez-vous avec vos identifiants.'
  } else if (params.redirectTo) {
    notice = 'Connectez-vous pour personnaliser et publier votre Landing Page.'
  }

  return <LoginForm notice={notice} redirectTo={params.redirectTo} />
}

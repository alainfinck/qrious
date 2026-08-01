import { redirect } from 'next/navigation'

import { LoginForm } from '@/components/dashboard/LoginForm'
import { isAuthenticated } from '@/lib/auth/session'

export default async function DashboardLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ reset?: string; registered?: string }>
}) {
  if (await isAuthenticated()) {
    redirect('/dashboard')
  }

  const params = await searchParams
  let notice: string | null = null
  if (params.reset === '1') {
    notice = 'Mot de passe mis à jour. Vous pouvez vous connecter.'
  } else if (params.registered === '1') {
    notice = 'Compte créé. Connectez-vous avec vos identifiants.'
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-white to-white p-4">
      <LoginForm notice={notice} />
    </div>
  )
}

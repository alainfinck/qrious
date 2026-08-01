import { redirect } from 'next/navigation'

import { LoginForm } from '@/components/dashboard/LoginForm'
import { isManagerAuthenticated } from '@/lib/auth/manager-session'

export default async function DashboardLoginPage() {
  if (await isManagerAuthenticated()) {
    redirect('/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-white to-white p-4">
      <LoginForm />
    </div>
  )
}

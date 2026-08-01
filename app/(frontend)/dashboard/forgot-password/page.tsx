import { redirect } from 'next/navigation'

import { ForgotPasswordForm } from '@/components/dashboard/ForgotPasswordForm'
import { isAuthenticated } from '@/lib/auth/session'

export default async function ForgotPasswordPage() {
  if (await isAuthenticated()) {
    redirect('/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-white to-white p-4">
      <ForgotPasswordForm />
    </div>
  )
}

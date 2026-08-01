import { redirect } from 'next/navigation'

import { ResetPasswordForm } from '@/components/dashboard/ResetPasswordForm'
import { isAuthenticated } from '@/lib/auth/session'

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  if (await isAuthenticated()) {
    redirect('/dashboard')
  }

  const params = await searchParams

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-white to-white p-4">
      <ResetPasswordForm token={params.token ?? ''} />
    </div>
  )
}

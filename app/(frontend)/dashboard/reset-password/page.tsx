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

  return <ResetPasswordForm token={params.token ?? ''} />
}

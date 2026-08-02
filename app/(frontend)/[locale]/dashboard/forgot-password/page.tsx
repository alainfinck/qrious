import { redirect } from 'next/navigation'

import { ForgotPasswordForm } from '@/components/dashboard/ForgotPasswordForm'
import { isAuthenticated } from '@/lib/auth/session'

export const dynamic = 'force-dynamic'

export default async function ForgotPasswordPage() {
  if (await isAuthenticated()) {
    redirect('/dashboard')
  }

  return <ForgotPasswordForm />
}

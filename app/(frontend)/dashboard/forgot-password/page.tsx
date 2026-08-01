import { redirect } from 'next/navigation'

import { ForgotPasswordForm } from '@/components/dashboard/ForgotPasswordForm'
import { isAuthenticated } from '@/lib/auth/session'

export default async function ForgotPasswordPage() {
  if (await isAuthenticated()) {
    redirect('/dashboard')
  }

  return <ForgotPasswordForm />
}

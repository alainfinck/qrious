import { redirect } from 'next/navigation'

import { RegisterForm } from '@/components/dashboard/RegisterForm'
import { isAuthenticated } from '@/lib/auth/session'

export default async function DashboardRegisterPage() {
  if (await isAuthenticated()) {
    redirect('/dashboard')
  }

  return <RegisterForm />
}

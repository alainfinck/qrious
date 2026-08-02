import { RegisterForm } from '@/components/dashboard/RegisterForm'
import { appleOAuthEnabled, googleOAuthEnabled } from '@/lib/auth/oauth'
import { isAuthenticated } from '@/lib/auth/session'

export const dynamic = 'force-dynamic'

export default async function DashboardRegisterPage() {
  const hasSession = await isAuthenticated()

  return (
    <RegisterForm
      hasSession={hasSession}
      googleEnabled={googleOAuthEnabled}
      appleEnabled={appleOAuthEnabled}
    />
  )
}

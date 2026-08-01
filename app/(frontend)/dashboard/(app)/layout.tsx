import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { DashboardShell } from '@/components/dashboard/DashboardShell'
import { isAuthenticated } from '@/lib/auth/session'

export const metadata: Metadata = {
  title: 'Dashboard — Qrious',
  description: 'Gérez vos QR codes dynamiques',
}

export default async function DashboardAppLayout({ children }: { children: React.ReactNode }) {
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    redirect('/dashboard/login')
  }

  return <DashboardShell>{children}</DashboardShell>
}

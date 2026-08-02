import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { DashboardShell } from '@/components/dashboard/DashboardShell'
import { isAuthenticated } from '@/lib/auth/session'

export const metadata: Metadata = {
  title: 'Dashboard — QRious',
  description: 'Gérez vos QR codes dynamiques',
}

export default async function DashboardAppLayout({ children }: { children: React.ReactNode }) {
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    const headersList = await headers()
    const rawPath = headersList.get('x-pathname') || '/dashboard'
    const normalizedPath = rawPath.replace(/^\/(fr|en|de|it|es|pl)/, '') || '/dashboard'
    redirect(`/dashboard/login?redirectTo=${encodeURIComponent(normalizedPath)}`)
  }

  return <DashboardShell>{children}</DashboardShell>
}


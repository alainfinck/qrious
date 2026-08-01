import type { ReactNode } from 'react'

/** Auth + Payload must not run at static build time. */
export const dynamic = 'force-dynamic'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return children
}

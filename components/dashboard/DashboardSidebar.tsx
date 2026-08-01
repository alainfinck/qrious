'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BarChart3,
  LayoutDashboard,
  LogOut,
  QrCode,
  Settings,
  User,
  Users,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { logoutAction } from '@/lib/auth/actions'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Tableau de bord', icon: LayoutDashboard, exact: true },
  { href: '/dashboard/qr-codes', label: 'Mes QR Codes', icon: QrCode },
  { href: '/dashboard/artistes', label: 'Artistes', icon: Users },
  { href: '/dashboard/statistiques', label: 'Statistiques', icon: BarChart3 },
  { href: '/dashboard/profil', label: 'Profil', icon: User },
]

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href
  return pathname === href || pathname.startsWith(`${href}/`)
}

function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <rect x="2" y="2" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="2.2" />
      <rect x="5" y="5" width="6" height="6" fill="currentColor" />
      <rect x="18" y="2" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="2.2" />
      <rect x="21" y="5" width="6" height="6" fill="currentColor" />
      <rect x="2" y="18" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="2.2" />
      <rect x="5" y="21" width="6" height="6" fill="currentColor" />
      <rect x="18" y="18" width="5" height="5" fill="currentColor" />
      <rect x="25" y="18" width="5" height="5" fill="currentColor" />
      <rect x="18" y="25" width="5" height="5" fill="currentColor" />
      <rect x="24" y="24" width="6" height="6" fill="currentColor" />
    </svg>
  )
}

interface DashboardSidebarProps {
  className?: string
  onNavigate?: () => void
}

export function DashboardSidebar({ className, onNavigate }: DashboardSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className={cn('flex h-full w-64 flex-col border-r border-slate-200/80 bg-white', className)}>
      <div className="px-5 py-6">
        <Link
          href="/dashboard"
          onClick={onNavigate}
          className="group inline-flex items-center gap-3.5"
        >
          <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-mq-ink shadow-[0_10px_24px_-12px_rgba(11,18,32,0.55)] ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-[1.04]">
            <span
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(18,196,168,0.35)_0%,transparent_45%,rgba(255,92,77,0.28)_100%)]"
              aria-hidden
            />
            <span
              className="pointer-events-none absolute -right-3 -top-3 h-10 w-10 rounded-full bg-mq-sun/25 blur-md"
              aria-hidden
            />
            <BrandMark className="relative h-6 w-6 text-white" />
          </span>
          <span className="min-w-0">
            <span className="block font-display text-xl font-bold leading-none tracking-tight mq-rainbow-text">
              QRious
            </span>
            <span className="mt-1.5 block text-sm font-medium text-slate-500">Dashboard</span>
          </span>
        </Link>
      </div>

      <div className="flex-1 px-3 pb-4">
        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          Navigation
        </p>
        <nav className="space-y-1.5">
          {navItems.map(({ href, label, icon: Icon, exact }) => {
            const active = isActive(pathname, href, exact)

            return (
              <Link
                key={href}
                href={href}
                onClick={onNavigate}
                className={cn(
                  'group relative flex items-center gap-3.5 rounded-xl px-3.5 py-3 text-base font-semibold tracking-tight transition-colors',
                  active
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                )}
              >
                {active ? (
                  <span
                    className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-mq-signal"
                    aria-hidden
                  />
                ) : null}
                <Icon
                  className={cn(
                    'h-5 w-5 shrink-0 transition-colors',
                    active ? 'text-mq-signal' : 'text-slate-400 group-hover:text-slate-700',
                  )}
                  strokeWidth={active ? 2.25 : 2}
                />
                <span className="leading-none">{label}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="space-y-1 border-t border-slate-100 p-3">
        <Button
          asChild
          variant="ghost"
          className="h-11 w-full justify-start gap-3 rounded-xl px-3.5 text-base font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        >
          <Link href="/cms" onClick={onNavigate}>
            <Settings className="h-5 w-5" />
            Admin CMS
          </Link>
        </Button>
        <form action={logoutAction}>
          <Button
            type="submit"
            variant="ghost"
            className="h-11 w-full justify-start gap-3 rounded-xl px-3.5 text-base font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            <LogOut className="h-5 w-5" />
            Déconnexion
          </Button>
        </form>
      </div>
    </aside>
  )
}

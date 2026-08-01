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
import { Separator } from '@/components/ui/separator'
import { logoutAction } from '@/lib/dashboard/actions'
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

interface DashboardSidebarProps {
  className?: string
  onNavigate?: () => void
}

export function DashboardSidebar({ className, onNavigate }: DashboardSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className={cn('flex h-full w-64 flex-col border-r bg-background', className)}>
      <div className="flex items-center gap-3 px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
          <QrCode className="h-5 w-5 text-primary" />
        </div>
        <div>
          <Link href="/dashboard" onClick={onNavigate} className="text-base font-bold">
            QRious
          </Link>
          <p className="text-xs text-muted-foreground">Gestion de QR codes pour l&apos;art</p>
        </div>
      </div>

      <Separator />

      <div className="flex-1 px-4 py-5">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Navigation
        </p>
        <nav className="space-y-1">
          {navItems.map(({ href, label, icon: Icon, exact }) => {
            const active = isActive(pathname, href, exact)

            return (
              <Link
                key={href}
                href={href}
                onClick={onNavigate}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                )}
              >
                <Icon className={cn('h-4 w-4', active && 'text-primary')} />
                {label}
              </Link>
            )
          })}
        </nav>
      </div>

      <Separator />

      <div className="space-y-1 p-4">
        <Button asChild variant="ghost" className="w-full justify-start text-muted-foreground">
          <Link href="/cms" onClick={onNavigate}>
            <Settings className="h-4 w-4" />
            Admin CMS
          </Link>
        </Button>
        <form action={logoutAction}>
          <Button type="submit" variant="ghost" className="w-full justify-start text-muted-foreground">
            <LogOut className="h-4 w-4" />
            Déconnexion
          </Button>
        </form>
      </div>
    </aside>
  )
}

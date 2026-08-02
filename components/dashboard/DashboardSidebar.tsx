'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import {
  BarChart3,
  LayoutDashboard,
  LogOut,
  QrCode,
  Settings,
  User,
  FileText,
  Image as ImageIcon,
} from 'lucide-react'

import { BrandMark } from '@/components/brand/BrandMark'
import { BrandWordmark } from '@/components/brand/BrandWordmark'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { Button } from '@/components/ui/button'
import { logoutAction } from '@/lib/auth/actions'
import { cn } from '@/lib/utils'
import { Link as LocaleLink, usePathname } from '@/src/i18n/routing'

const navItems = [
  { href: '/dashboard', labelKey: 'overview' as const, icon: LayoutDashboard, exact: true },
  { href: '/dashboard/qr-codes', labelKey: 'qrCodes' as const, icon: QrCode },
  { href: '/dashboard/pages', labelKey: 'smartPages' as const, icon: FileText },
  { href: '/dashboard/medias', labelKey: 'medias' as const, icon: ImageIcon },
  { href: '/dashboard/statistiques', labelKey: 'stats' as const, icon: BarChart3 },
  { href: '/dashboard/profil', labelKey: 'profile' as const, icon: User },
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
  const t = useTranslations('Dashboard.nav')

  return (
    <aside className={cn('flex h-full w-64 flex-col border-r border-slate-200/80 bg-white', className)}>
      <div className="px-5 py-6">
        <LocaleLink
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
            <span className="block text-xl font-bold leading-none tracking-tight text-mq-ink">
              <BrandWordmark className="text-mq-ink" />
            </span>
            <span className="mt-1.5 block text-sm font-medium text-slate-500">
              {t('brandSubtitle')}
            </span>
          </span>
        </LocaleLink>
      </div>

      <div className="flex-1 px-3 pb-4">
        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          {t('sectionLabel')}
        </p>
        <nav className="space-y-1.5">
          {navItems.map(({ href, labelKey, icon: Icon, exact }) => {
            const active = isActive(pathname, href, exact)

            return (
              <LocaleLink
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
                <span className="leading-none">{t(labelKey)}</span>
              </LocaleLink>
            )
          })}
        </nav>
      </div>

      <div className="space-y-1 border-t border-slate-100 p-3">
        <div className="flex items-center justify-between px-1.5 py-1">
          <span className="text-xs font-medium text-slate-400">{t('language')}</span>
          <LanguageSwitcher />
        </div>
        <Button
          asChild
          variant="ghost"
          className="h-11 w-full justify-start gap-3 rounded-xl px-3.5 text-base font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        >
          <Link href="/cms" onClick={onNavigate}>
            <Settings className="h-5 w-5" />
            {t('adminCms')}
          </Link>
        </Button>
        <form action={logoutAction}>
          <Button
            type="submit"
            variant="ghost"
            className="h-11 w-full justify-start gap-3 rounded-xl px-3.5 text-base font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            <LogOut className="h-5 w-5" />
            {t('logout')}
          </Button>
        </form>
      </div>
    </aside>
  )
}

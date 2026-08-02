'use client'

import { LogOut, Menu, Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { BrandWordmark } from '@/components/brand/BrandWordmark'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { logoutAction } from '@/lib/auth/actions'
import { Link } from '@/src/i18n/routing'

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const t = useTranslations('Dashboard.nav')

  return (
    <div className="flex min-h-screen bg-muted/40">
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64">
        <DashboardSidebar />
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetTitle className="sr-only">{t('sheetTitle')}</SheetTitle>
          <DashboardSidebar className="w-full border-0" onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex flex-1 flex-col md:pl-64">
        <header className="sticky top-0 z-10 flex items-center justify-between gap-2 border-b bg-background/95 px-4 py-3 backdrop-blur md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)} aria-label={t('menuAria')}>
            <Menu className="h-5 w-5" />
          </Button>
          <span className="text-lg font-bold text-primary">
            <BrandWordmark />
          </span>
          <div className="flex items-center gap-1">
            <LanguageSwitcher />
            <form action={logoutAction}>
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                aria-label={t('logout')}
                className="text-slate-500 hover:text-red-600"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </form>
            <Button asChild size="icon">
              <Link href="/dashboard/new">
                <Plus className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </header>

        <header className="sticky top-0 z-10 hidden items-center justify-end gap-3 border-b bg-background/95 px-6 py-3 backdrop-blur md:flex lg:px-8">
          <form action={logoutAction}>
            <Button
              type="submit"
              variant="outline"
              className="h-9 gap-2 rounded-lg border-slate-200 text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="h-4 w-4" />
              {t('logout')}
            </Button>
          </form>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}

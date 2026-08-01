'use client'

import Link from 'next/link'
import { Menu, Plus } from 'lucide-react'
import { useState } from 'react'

import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-muted/40">
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64">
        <DashboardSidebar />
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <DashboardSidebar className="w-full border-0" onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex flex-1 flex-col md:pl-64">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/95 px-4 py-3 backdrop-blur md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)} aria-label="Menu">
            <Menu className="h-5 w-5" />
          </Button>
          <span className="font-bold text-primary">QRious</span>
          <Button asChild size="icon">
            <Link href="/dashboard/new">
              <Plus className="h-4 w-4" />
            </Link>
          </Button>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}

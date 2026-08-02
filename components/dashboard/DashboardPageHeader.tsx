import Link from 'next/link'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface DashboardPageHeaderProps {
  title: string
  description: string
  showCreateButton?: boolean
  children?: React.ReactNode
}

export function DashboardPageHeader({
  title,
  description,
  showCreateButton = true,
  children,
}: DashboardPageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="mt-1 text-muted-foreground">{description}</p>
      </div>
      {showCreateButton ? (
        <Button asChild className="shrink-0">
          <Link href="/dashboard/new">
            <Plus className="h-4 w-4" />
            Créer un QR Code
          </Link>
        </Button>
      ) : null}
      {children}
    </div>
  )
}

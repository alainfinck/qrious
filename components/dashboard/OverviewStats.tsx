import { BarChart3, QrCode, Users } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { getMockTotalScans, getMockUniqueVisitors } from '@/lib/dashboard/mock-analytics'
import type { LandingPage } from '@/types/landing-page'

interface OverviewStatsProps {
  total: number
  pages: LandingPage[]
}

export function OverviewStats({ total, pages }: OverviewStatsProps) {
  const totalScans = getMockTotalScans(pages)
  const uniqueVisitors = getMockUniqueVisitors(pages)

  const cards = [
    {
      label: 'QR Codes',
      value: total,
      delta: `+${Math.max(1, Math.round(total * 0.25))} ce mois-ci`,
      icon: QrCode,
    },
    {
      label: 'Total de scans',
      value: totalScans,
      delta: `+${Math.max(8, Math.round(totalScans * 0.15))} cette semaine`,
      icon: BarChart3,
    },
    {
      label: 'Visiteurs uniques',
      value: uniqueVisitors,
      delta: `+${Math.max(5, Math.round(uniqueVisitors * 0.12))} cette semaine`,
      icon: Users,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map(({ label, value, delta, icon: Icon }) => (
        <Card key={label}>
          <CardContent className="flex items-start justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{label}</p>
              <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{delta}</p>
            </div>
            <div className="rounded-md bg-accent p-2">
              <Icon className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

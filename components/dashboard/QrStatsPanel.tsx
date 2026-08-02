import Link from 'next/link'
import { BarChart3, Eye, ArrowUpRight, TrendingUp, Clock, Smartphone } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getMockScanCount } from '@/lib/dashboard/mock-analytics'
import { VERTICAL_LABELS } from '@/lib/dashboard/utils'
import type { LandingPage } from '@/types/landing-page'

interface QrStatsPanelProps {
  page: LandingPage
}

const MOCK_WEEKLY = [12, 18, 14, 22, 28, 19, 15]
const DAY_LABELS = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
const MAX_BAR = 40

function MiniBarChart({ data }: { data: number[] }) {
  return (
    <div className="flex items-end gap-1 h-12">
      {data.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
          <div
            className="w-full rounded-sm bg-primary/70 transition-all"
            style={{ height: `${(v / MAX_BAR) * 48}px` }}
          />
          <span className="text-[9px] text-muted-foreground">{DAY_LABELS[i]}</span>
        </div>
      ))}
    </div>
  )
}

export function QrStatsPanel({ page }: QrStatsPanelProps) {
  // For redirect type, use real scanCount; for others, use deterministic mock
  const totalScans = page.vertical === 'redirect' && page.scanCount != null
    ? page.scanCount
    : getMockScanCount(page.id)

  const weeklyScans = Math.round(totalScans * 0.3)
  const uniqueVisitors = Math.round(totalScans * 0.72)
  const peakHour = '19h–21h'

  const mockBarData = MOCK_WEEKLY.map(v => Math.round(v * (totalScans / 128)))

  return (
    <Card className="border-slate-200/80 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            Statistiques
          </CardTitle>
          <Button asChild variant="ghost" size="sm" className="h-7 text-xs">
            <Link href={`/dashboard/statistiques`}>
              Voir tout →
            </Link>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          {VERTICAL_LABELS[page.vertical]}
          {page.vertical === 'redirect' ? ' · Tracking réel' : ' · Données estimées'}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Scans totaux */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-slate-50 p-3">
            <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
              <Eye className="h-3.5 w-3.5" />
              <span className="text-[11px] font-medium">Total scans</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{totalScans.toLocaleString('fr-FR')}</p>
            {page.vertical === 'redirect' && (
              <p className="text-[10px] text-emerald-600 font-medium mt-0.5">● Temps réel</p>
            )}
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
              <Smartphone className="h-3.5 w-3.5" />
              <span className="text-[11px] font-medium">Visiteurs uniques</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{uniqueVisitors.toLocaleString('fr-FR')}</p>
          </div>
        </div>

        {/* Graphe hebdo */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-700">Cette semaine</span>
            <span className="text-xs font-bold text-primary">{weeklyScans} scans</span>
          </div>
          <MiniBarChart data={mockBarData} />
        </div>

        {/* Métriques secondaires */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <TrendingUp className="h-3 w-3 text-emerald-500" />
            <span>+12% vs semaine préc.</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3 w-3 text-amber-500" />
            <span>Pic : {peakHour}</span>
          </div>
        </div>

        {/* Pour les QR redirect : info lien */}
        {page.vertical === 'redirect' && page.redirectData?.targetUrl && (
          <div className="rounded-lg border border-blue-100 bg-blue-50/60 p-2.5 flex items-start gap-2">
            <ArrowUpRight className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="text-[10px] font-semibold text-blue-800">Destination</p>
              <p className="text-[10px] text-blue-600 break-all truncate">{page.redirectData.targetUrl}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

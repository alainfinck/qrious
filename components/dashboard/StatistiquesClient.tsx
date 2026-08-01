'use client'

import { useState } from 'react'
import { MapPin, Clock, BarChart3, Mail, Sparkles, Filter, Download } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ActivityChart } from '@/components/dashboard/ActivityChart'
import { OverviewStats } from '@/components/dashboard/OverviewStats'
import { ScanHeatmap } from '@/components/dashboard/ScanHeatmap'
import { PeakHoursChart } from '@/components/dashboard/PeakHoursChart'
import { WeeklyReportSettings } from '@/components/dashboard/WeeklyReportSettings'
import { EmailReportPreviewModal } from '@/components/dashboard/EmailReportPreviewModal'
import type { LandingPage } from '@/types/landing-page'

interface StatistiquesClientProps {
  stats: {
    total: number
    published: number
    drafts: number
    byVertical: Record<string, number>
  }
  pages: LandingPage[]
}

export function StatistiquesClient({ stats, pages }: StatistiquesClientProps) {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="space-y-6">
      {/* Intelligence Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 via-primary/90 to-slate-950 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
              <Sparkles className="h-3 w-3 mr-1" />
              Business Intelligence v2.0
            </Badge>
            <span className="text-xs text-slate-300">Données en direct</span>
          </div>
          <h2 className="text-lg font-bold">
            Analytics & Centre de Décision Commerciale
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl">
            Analysez la géolocalisation de vos visiteurs, anticipez vos heures de pointe et configurez l'envoi de bilans hebdomadaires automatiques par email.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <EmailReportPreviewModal />
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 h-auto p-1 bg-muted/60">
          <TabsTrigger value="overview" className="gap-2 py-2.5 text-xs font-semibold">
            <BarChart3 className="h-4 w-4 text-primary" />
            Vue d'Ensemble
          </TabsTrigger>
          <TabsTrigger value="heatmap" className="gap-2 py-2.5 text-xs font-semibold">
            <MapPin className="h-4 w-4 text-emerald-500" />
            Carte & Heatmap Villes
          </TabsTrigger>
          <TabsTrigger value="peakhours" className="gap-2 py-2.5 text-xs font-semibold">
            <Clock className="h-4 w-4 text-amber-500" />
            Pics Horaires & Appareils
          </TabsTrigger>
          <TabsTrigger value="reports" className="gap-2 py-2.5 text-xs font-semibold">
            <Mail className="h-4 w-4 text-blue-500" />
            Rapports Hebdo & Alertes
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Vue d'Ensemble */}
        <TabsContent value="overview" className="space-y-6 focus-visible:outline-none">
          <OverviewStats total={stats.total} pages={pages} />
          <ActivityChart />
        </TabsContent>

        {/* Tab 2: Scan Heatmap */}
        <TabsContent value="heatmap" className="space-y-6 focus-visible:outline-none">
          <ScanHeatmap />
        </TabsContent>

        {/* Tab 3: Peak Hours & Devices */}
        <TabsContent value="peakhours" className="space-y-6 focus-visible:outline-none">
          <PeakHoursChart />
        </TabsContent>

        {/* Tab 4: Weekly Email Reports & Alerts */}
        <TabsContent value="reports" className="space-y-6 focus-visible:outline-none">
          <WeeklyReportSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}

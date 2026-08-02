'use client'

import { useState } from 'react'
import { MapPin, Clock, BarChart3, Mail, Sparkles } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  const t = useTranslations('Dashboard.stats')
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="space-y-6">
      {/* Intelligence Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 via-primary/90 to-slate-950 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
              <Sparkles className="h-3 w-3 mr-1" />
              {t('biBadge')}
            </Badge>
            <span className="text-xs text-slate-300">{t('liveData')}</span>
          </div>
          <h2 className="text-lg font-bold">{t('bannerTitle')}</h2>
          <p className="text-xs text-slate-300 max-w-2xl">{t('bannerDescription')}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <EmailReportPreviewModal />
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="overview">
            <BarChart3 className="h-4 w-4 shrink-0 opacity-80" />
            {t('tabOverview')}
          </TabsTrigger>
          <TabsTrigger value="heatmap">
            <MapPin className="h-4 w-4 shrink-0 opacity-80" />
            {t('tabHeatmap')}
          </TabsTrigger>
          <TabsTrigger value="peakhours">
            <Clock className="h-4 w-4 shrink-0 opacity-80" />
            {t('tabPeakHours')}
          </TabsTrigger>
          <TabsTrigger value="reports">
            <Mail className="h-4 w-4 shrink-0 opacity-80" />
            {t('tabReports')}
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

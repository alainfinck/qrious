'use client'

import { useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Clock, Smartphone, Globe, Sparkles, TrendingUp, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  HOURLY_PEAK_DATA,
  DAY_HOUR_HEATMAP,
  DEVICE_STATS,
  BROWSER_LANGUAGES,
} from '@/lib/dashboard/analytics-data'
import { cn } from '@/lib/utils'

export function PeakHoursChart() {
  const [selectedDay, setSelectedDay] = useState<string>('Ven')

  // Find max scan count for heatmap cell scaling
  const maxMatrixScan = Math.max(...DAY_HOUR_HEATMAP.flatMap((d) => d.hours))

  return (
    <div className="space-y-6">
      {/* 24h Hourly Peak Chart */}
      <Card className="border-border/80 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Pics Horaires & Heures d'Affluence
            </CardTitle>
            <CardDescription>
              Volume de scans heure par heure sur 24h. Identifiez les moments d'impact maximal.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 gap-1">
              <Sparkles className="h-3 w-3" />
              Pics détectés: 12h-14h & 19h-21h
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-4">
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={HOURLY_PEAK_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="hour"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                />
                <Tooltip
                  formatter={(value: any) => [`${value ?? 0} scans`, 'Scans enregistrés']}
                  labelFormatter={(label) => `Heure: ${label}`}
                  contentStyle={{
                    borderRadius: 'var(--radius)',
                    border: '1px solid hsl(var(--border))',
                    background: 'hsl(var(--popover))',
                    color: 'hsl(var(--popover-foreground))',
                  }}
                />
                <Bar dataKey="scans" radius={[4, 4, 0, 0]}>
                  {HOURLY_PEAK_DATA.map((entry) => (
                    <Cell
                      key={entry.hour}
                      fill={entry.isPeak ? '#f59e0b' : 'hsl(var(--primary))'}
                      opacity={entry.isPeak ? 0.95 : 0.7}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Peak Insight Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-lg border border-amber-500/30 bg-amber-500/5 flex items-start gap-3">
              <div className="p-2 rounded-md bg-amber-500/10 text-amber-600 shrink-0 mt-0.5">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">Service Midi (12h - 14h)</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Moyenne de <strong className="text-foreground">256 scans/heure</strong>. Recommandé pour mettre en avant les formules du jour.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-lg border border-primary/30 bg-primary/5 flex items-start gap-3">
              <div className="p-2 rounded-md bg-primary/10 text-primary shrink-0 mt-0.5">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">Service Soir (19h - 21h)</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Peak absolu à <strong className="text-foreground">310 scans à 20h</strong>. Moment idéal pour inciter aux avis Google.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Heatmap Grid (Days vs Hours) & Device / Browser Breakdown */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Heatmap Matrix: Day vs Hour */}
        <Card className="lg:col-span-2 border-border/80 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Matrice de Fréquentation (Jour x Heure)
            </CardTitle>
            <CardDescription>
              Vue synthétique de l'intensité des scans sur toute la semaine
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="overflow-x-auto pb-2">
              <div className="min-w-[600px] space-y-1.5">
                {/* Hours header */}
                <div className="flex items-center text-[10px] text-muted-foreground font-medium pl-10 pr-1">
                  {Array.from({ length: 24 }).map((_, h) => (
                    <div key={h} className="flex-1 text-center">
                      {h % 3 === 0 ? `${h}h` : ''}
                    </div>
                  ))}
                </div>

                {/* Day Rows */}
                {DAY_HOUR_HEATMAP.map((row) => (
                  <div key={row.day} className="flex items-center gap-1.5">
                    <span className="w-8 text-xs font-semibold text-muted-foreground shrink-0">
                      {row.day}
                    </span>
                    <div className="flex-1 flex gap-1">
                      {row.hours.map((val, hIdx) => {
                        const intensity = val / maxMatrixScan
                        let bgStyle = 'bg-muted/40'
                        if (intensity > 0.8) bgStyle = 'bg-amber-500 text-slate-950 font-bold'
                        else if (intensity > 0.5) bgStyle = 'bg-primary'
                        else if (intensity > 0.25) bgStyle = 'bg-primary/60'
                        else if (intensity > 0.1) bgStyle = 'bg-primary/30'

                        return (
                          <div
                            key={hIdx}
                            title={`${row.day} à ${hIdx}h: ${val} scans`}
                            className={cn(
                              "h-7 flex-1 rounded-[3px] transition-all hover:scale-110 cursor-pointer flex items-center justify-center text-[9px]",
                              bgStyle
                            )}
                          />
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
              <span className="text-[11px]">Faible intensité</span>
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-4 rounded-[2px] bg-muted/40" />
                <span className="h-3 w-4 rounded-[2px] bg-primary/30" />
                <span className="h-3 w-4 rounded-[2px] bg-primary/60" />
                <span className="h-3 w-4 rounded-[2px] bg-primary" />
                <span className="h-3 w-4 rounded-[2px] bg-amber-500" />
              </div>
              <span className="text-[11px] font-semibold text-amber-600">Peak Maximal</span>
            </div>
          </CardContent>
        </Card>

        {/* Devices & Browser Languages */}
        <div className="space-y-6">
          {/* Appareils (Devices) */}
          <Card className="border-border/80 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-primary" />
                Types d'Appareils
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2.5">
                {DEVICE_STATS.map((dev) => (
                  <div key={dev.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-foreground">{dev.name}</span>
                      <span className="font-bold text-foreground">{dev.percentage}% ({dev.count})</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${dev.percentage}%`, backgroundColor: dev.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Langues des navigateurs */}
          <Card className="border-border/80 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-500" />
                Langues des Navigateurs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {BROWSER_LANGUAGES.map((lang) => (
                <div 
                  key={lang.code}
                  className="flex items-center justify-between p-2 rounded-lg bg-accent/30 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{lang.flag}</span>
                    <span className="font-medium text-foreground">{lang.name}</span>
                  </div>
                  <span className="font-bold text-foreground">{lang.percentage}%</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

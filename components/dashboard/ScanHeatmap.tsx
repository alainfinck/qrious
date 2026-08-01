'use client'

import { useState } from 'react'
import { MapPin, Navigation, Smartphone, Globe2, Activity, ArrowUpRight, Flame } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CITY_SCAN_LOCATIONS, RECENT_SCAN_FEED, type CityScanLocation } from '@/lib/dashboard/analytics-data'
import { cn } from '@/lib/utils'

export function ScanHeatmap() {
  const [selectedCity, setSelectedCity] = useState<CityScanLocation>(CITY_SCAN_LOCATIONS[0])
  const [filterRegion, setFilterRegion] = useState<string>('all')

  const totalMapScans = CITY_SCAN_LOCATIONS.reduce((sum, c) => sum + c.scans, 0)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Map Visualizer */}
        <Card className="lg:col-span-2 relative overflow-hidden border-border/80 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Carte Heatmap des Scans
              </CardTitle>
              <CardDescription>
                Répartition géographique en temps réel de la provenance de vos scans QR
              </CardDescription>
            </div>
            <Badge variant="outline" className="gap-1 bg-primary/5 text-primary border-primary/20">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Direct GPS / IP
            </Badge>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Interactive SVG Heatmap Map Container */}
            <div className="relative w-full h-[380px] bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center p-4">
              {/* Map background grid effect */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.3) 1px, transparent 0)`,
                  backgroundSize: '24px 24px'
                }}
              />
              
              {/* Stylized France / Western Europe Silhouette SVG */}
              <svg 
                viewBox="0 0 100 100" 
                className="w-full h-full max-w-[480px] opacity-25 text-slate-400 stroke-slate-500 fill-slate-900 pointer-events-none"
                strokeWidth="0.5"
              >
                {/* Simplified contour for France & neighboring region */}
                <path d="M 45,15 L 60,18 L 68,26 L 66,35 L 75,40 L 78,58 L 80,72 L 70,82 L 62,80 L 52,78 L 40,82 L 32,74 L 28,62 L 32,48 L 26,42 L 30,30 L 40,22 Z" />
              </svg>

              {/* City Markers overlay */}
              {CITY_SCAN_LOCATIONS.map((loc) => {
                const isSelected = selectedCity.id === loc.id
                const pulseSize = Math.max(24, Math.min(60, loc.percentage * 1.4))

                return (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setSelectedCity(loc)}
                    className="absolute group transform -translate-x-1/2 -translate-y-1/2 focus:outline-none transition-all duration-300 z-10"
                    style={{ left: `${loc.lng}%`, top: `${loc.lat}%` }}
                    title={`${loc.cityName}: ${loc.scans} scans (${loc.percentage}%)`}
                  >
                    {/* Heat Glow Ring */}
                    <div 
                      className={cn(
                        "absolute rounded-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 transition-all duration-500 pointer-events-none",
                        isSelected ? "bg-primary/40 animate-ping" : "bg-primary/20 group-hover:bg-primary/30"
                      )}
                      style={{ width: `${pulseSize}px`, height: `${pulseSize}px` }}
                    />
                    <div 
                      className={cn(
                        "absolute rounded-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 transition-all duration-300 pointer-events-none",
                        isSelected ? "bg-primary/30 border border-primary" : "bg-indigo-500/20"
                      )}
                      style={{ width: `${pulseSize * 0.7}px`, height: `${pulseSize * 0.7}px` }}
                    />

                    {/* Pin Center Dot */}
                    <div className={cn(
                      "relative h-4 w-4 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-125 shadow-lg",
                      isSelected ? "bg-primary text-primary-foreground ring-4 ring-primary/30 scale-110" : "bg-white text-slate-900 border-2 border-primary"
                    )}>
                      <div className="h-1.5 w-1.5 rounded-full bg-slate-950" />
                    </div>

                    {/* Tooltip Label */}
                    <div className={cn(
                      "absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-md text-[11px] font-semibold transition-all duration-200 pointer-events-none shadow-md",
                      isSelected 
                        ? "bg-primary text-primary-foreground opacity-100 z-20 scale-105" 
                        : "bg-slate-900/90 text-slate-200 opacity-0 group-hover:opacity-100 border border-slate-700"
                    )}>
                      {loc.cityName} ({loc.scans})
                    </div>
                  </button>
                )
              })}

              {/* Map Floating Legend */}
              <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-sm border border-slate-800 rounded-lg p-2.5 text-slate-300 text-xs flex items-center gap-3 shadow-xl">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
                  <span className="font-medium text-white">Forte concentration</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-indigo-400" />
                  <span>Modérée</span>
                </div>
              </div>
            </div>

            {/* Selected City Highlight Card */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-accent/40 border border-border/50">
                <p className="text-xs text-muted-foreground">Ville sélectionnée</p>
                <p className="text-base font-bold text-foreground mt-0.5 flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  {selectedCity.cityName}
                </p>
                <p className="text-[11px] text-muted-foreground">{selectedCity.region}</p>
              </div>

              <div className="p-3 rounded-lg bg-accent/40 border border-border/50">
                <p className="text-xs text-muted-foreground">Volume de Scans</p>
                <p className="text-base font-bold text-foreground mt-0.5">
                  {selectedCity.scans.toLocaleString('fr-FR')}
                </p>
                <p className="text-[11px] text-emerald-600 font-medium">Scans confirmés</p>
              </div>

              <div className="p-3 rounded-lg bg-accent/40 border border-border/50">
                <p className="text-xs text-muted-foreground">Part du total</p>
                <p className="text-base font-bold text-foreground mt-0.5">
                  {selectedCity.percentage}%
                </p>
                <div className="w-full bg-muted rounded-full h-1.5 mt-1.5 overflow-hidden">
                  <div 
                    className="bg-primary h-full rounded-full" 
                    style={{ width: `${selectedCity.percentage}%` }}
                  />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-accent/40 border border-border/50">
                <p className="text-xs text-muted-foreground">Pays</p>
                <p className="text-base font-bold text-foreground mt-0.5 flex items-center gap-1.5">
                  <Globe2 className="h-4 w-4 text-blue-500 shrink-0" />
                  {selectedCity.country}
                </p>
                <p className="text-[11px] text-muted-foreground">Europe de l'Ouest</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Feed & City Ranking Sidebar */}
        <Card className="border-border/80 shadow-sm flex flex-col justify-between">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-500" />
              Derniers Scans en Direct
            </CardTitle>
            <CardDescription>
              Flux d'activité récent des visiteurs
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 flex-1 overflow-y-auto max-h-[380px] pr-1">
            <div className="space-y-3">
              {RECENT_SCAN_FEED.map((feed) => (
                <div 
                  key={feed.id}
                  className="p-2.5 rounded-lg border border-border/60 bg-card hover:bg-accent/30 transition-colors flex items-start justify-between gap-2"
                >
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-foreground line-clamp-1">
                      {feed.qrTitle}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                        <MapPin className="h-3 w-3 text-primary" />
                        {feed.city}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Smartphone className="h-3 w-3" />
                        {feed.device}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                      {feed.timeAgo}
                    </span>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {feed.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Top 5 Cities Ranking */}
            <div className="pt-2 border-t border-border/60">
              <p className="text-xs font-bold text-foreground mb-2 flex items-center justify-between">
                <span>Top Villes (Scans)</span>
                <span className="text-[10px] text-muted-foreground">{totalMapScans} au total</span>
              </p>

              <div className="space-y-2">
                {CITY_SCAN_LOCATIONS.slice(0, 4).map((c, i) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCity(c)}
                    className={cn(
                      "w-full text-left p-2 rounded-md text-xs flex items-center justify-between transition-colors",
                      selectedCity.id === c.id ? "bg-primary/10 font-medium text-primary" : "hover:bg-accent/40"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-semibold text-muted-foreground w-3">#{i + 1}</span>
                      {c.cityName}
                    </span>
                    <span className="font-bold">{c.scans} scans</span>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

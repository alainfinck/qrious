'use client'

import { useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { WEEKLY_ACTIVITY } from '@/lib/dashboard/mock-analytics'
import { cn } from '@/lib/utils'

type ChartMode = 'line' | 'bar'

const CHART_COLOR = 'hsl(var(--primary))'

export function ActivityChart() {
  const [mode, setMode] = useState<ChartMode>('line')

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl">Activité récente</CardTitle>
          <CardDescription>Nombre de scans par jour cette semaine</CardDescription>
        </div>
        <div className="flex rounded-md border p-1">
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className={cn('h-8 px-3', mode === 'line' && 'bg-accent text-accent-foreground')}
            onClick={() => setMode('line')}
          >
            Ligne
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className={cn('h-8 px-3', mode === 'bar' && 'bg-accent text-accent-foreground')}
            onClick={() => setMode('bar')}
          >
            Barres
          </Button>
        </div>
      </CardHeader>
      <CardContent className="h-[280px] pt-4">
        <ResponsiveContainer width="100%" height="100%">
          {mode === 'line' ? (
            <AreaChart data={WEEKLY_ACTIVITY} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="scanGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_COLOR} stopOpacity={0.35} />
                  <stop offset="95%" stopColor={CHART_COLOR} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 'var(--radius)',
                  border: '1px solid hsl(var(--border))',
                  background: 'hsl(var(--popover))',
                  color: 'hsl(var(--popover-foreground))',
                }}
              />
              <Area
                type="monotone"
                dataKey="scans"
                stroke={CHART_COLOR}
                strokeWidth={2.5}
                fill="url(#scanGradient)"
                dot={{ r: 4, fill: CHART_COLOR, strokeWidth: 0 }}
              />
            </AreaChart>
          ) : (
            <BarChart data={WEEKLY_ACTIVITY} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 'var(--radius)',
                  border: '1px solid hsl(var(--border))',
                  background: 'hsl(var(--popover))',
                  color: 'hsl(var(--popover-foreground))',
                }}
              />
              <Bar dataKey="scans" fill={CHART_COLOR} radius={[6, 6, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

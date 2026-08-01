import { Palette, Building2, Contact, QrCode, Eye, FilePenLine, FileText, Star, Landmark } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface StatsCardsProps {
  stats: {
    total: number
    published: number
    drafts: number
    byVertical: {
      art: number
      immo: number
      vcard: number
      product: number
      feedback: number
      tourism: number
    }
  }
}

const cards = [
  {
    key: 'total',
    label: 'QR codes',
    icon: QrCode,
    getValue: (s: StatsCardsProps['stats']) => s.total,
    hint: 'Total créés',
  },
  {
    key: 'published',
    label: 'Publiés',
    icon: Eye,
    getValue: (s: StatsCardsProps['stats']) => s.published,
    hint: 'Actifs et scannables',
  },
  {
    key: 'drafts',
    label: 'Brouillons',
    icon: FilePenLine,
    getValue: (s: StatsCardsProps['stats']) => s.drafts,
    hint: 'En cours de rédaction',
  },
] as const

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ key, label, icon: Icon, getValue, hint }) => (
        <Card key={key} className="border-slate-200/80 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">{getValue(stats)}</div>
            <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
          </CardContent>
        </Card>
      ))}

      <Card className="border-slate-200/80 shadow-sm sm:col-span-2 xl:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Par univers</CardTitle>
          <Palette className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Palette className="h-3.5 w-3.5" /> Art
            </span>
            <span className="font-semibold">{stats.byVertical.art}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="h-3.5 w-3.5" /> Immo
            </span>
            <span className="font-semibold">{stats.byVertical.immo}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Contact className="h-3.5 w-3.5" /> vCard
            </span>
            <span className="font-semibold">{stats.byVertical.vcard}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted-foreground">
              <FileText className="h-3.5 w-3.5" /> Produit
            </span>
            <span className="font-semibold">{stats.byVertical.product}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Star className="h-3.5 w-3.5" /> Avis
            </span>
            <span className="font-semibold">{stats.byVertical.feedback}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Landmark className="h-3.5 w-3.5" /> Tourisme
            </span>
            <span className="font-semibold">{stats.byVertical.tourism}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

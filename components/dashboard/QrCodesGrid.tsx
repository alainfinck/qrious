'use client'

import Link from 'next/link'
import { BarChart3, Eye, Search } from 'lucide-react'
import { useMemo, useState } from 'react'

import { QrCardThumbnail } from '@/components/dashboard/RecentQrList'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  formatShortDate,
  getArtistName,
  getMockScanCount,
} from '@/lib/dashboard/mock-analytics'
import type { LandingPage } from '@/types/landing-page'

interface QrCodesGridProps {
  pages: LandingPage[]
}

export function QrCodesGrid({ pages }: QrCodesGridProps) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return pages

    return pages.filter((page) => {
      const artist = getArtistName(page).toLowerCase()
      return page.title.toLowerCase().includes(q) || artist.includes(q) || page.slug.includes(q)
    })
  }, [pages, query])

  if (pages.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <p className="text-lg font-medium">Aucun QR code pour l&apos;instant</p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Créez votre premier QR code et associez-le à une œuvre d&apos;art.
          </p>
          <Button asChild className="mt-6">
            <Link href="/dashboard/new">Créer un QR Code</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher par titre ou artiste..."
          className="h-11 bg-background pl-10"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground">Aucun résultat pour « {query} ».</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((page) => (
            <QrCodeCard key={page.id} page={page} />
          ))}
        </div>
      )}
    </div>
  )
}

function QrCodeCard({ page }: { page: LandingPage }) {
  const scans = getMockScanCount(page.id)

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <QrCardThumbnail />
      <CardContent className="space-y-1 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold leading-tight">{page.title}</h3>
          <Badge variant="accent" className="shrink-0">
            {scans} scans
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{getArtistName(page)}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t bg-muted/40 px-5 py-3">
        <span className="text-xs text-muted-foreground">
          Créé le {formatShortDate(page.createdAt)}
        </span>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
            <Link href={`/dashboard/statistiques?qr=${page.id}`}>
              <BarChart3 className="h-3.5 w-3.5" />
              Stats
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="h-8">
            <Link href={`/dashboard/${page.id}`}>
              <Eye className="h-3.5 w-3.5" />
              Aperçu
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

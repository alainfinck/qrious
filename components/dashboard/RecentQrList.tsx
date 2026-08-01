import Link from 'next/link'
import { ImageIcon, QrCode } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatShortDate, getArtistName, getMockScanCount } from '@/lib/dashboard/mock-analytics'
import type { LandingPage } from '@/types/landing-page'

interface RecentQrListProps {
  pages: LandingPage[]
}

export function RecentQrList({ pages }: RecentQrListProps) {
  const recent = pages.slice(0, 3)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">QR Codes récents</CardTitle>
        <CardDescription>Vos 3 derniers QR codes créés</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recent.length === 0 ? (
          <p className="text-sm text-muted-foreground">Aucun QR code pour l&apos;instant.</p>
        ) : (
          recent.map((page) => (
            <div key={page.id} className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-accent">
                <QrPlaceholder />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{page.title}</p>
                <p className="truncate text-sm text-muted-foreground">{getArtistName(page)}</p>
              </div>
              <span className="shrink-0 text-sm font-medium text-primary">
                {getMockScanCount(page.id)} scans
              </span>
            </div>
          ))
        )}
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href="/dashboard/qr-codes">Voir tous les QR codes</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function QrPlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-accent">
      <ImageIcon className="h-5 w-5 text-primary/60" />
    </div>
  )
}

export function QrCardThumbnail() {
  return (
    <div className="flex aspect-[4/3] w-full items-center justify-center bg-muted">
      <div className="rounded-2xl border bg-background p-4 shadow-sm">
        <QrCode className="h-10 w-10 text-primary" />
      </div>
    </div>
  )
}

export { formatShortDate, getArtistName, getMockScanCount }

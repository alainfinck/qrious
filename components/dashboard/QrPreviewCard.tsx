import Image from 'next/image'
import Link from 'next/link'
import { Download, ExternalLink } from 'lucide-react'

import { CopyUrlClient } from '@/components/dashboard/CopyUrlClient'
import { StatusBadge } from '@/components/dashboard/QrBadges'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { generateQrDataUrl } from '@/lib/dashboard/qr'
import { getQrTargetUrl } from '@/lib/dashboard/utils'
import type { LandingPage } from '@/types/landing-page'

interface QrPreviewCardProps {
  page: LandingPage
}

export async function QrPreviewCard({ page }: QrPreviewCardProps) {
  const targetUrl = getQrTargetUrl(page.slug)
  const qrDataUrl = await generateQrDataUrl(page.slug, page.theme?.primaryColor || '#0f172a')

  return (
    <Card className="border-slate-200/80 shadow-sm lg:sticky lg:top-8">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>Aperçu QR code</CardTitle>
            <CardDescription>URL permanente — contenu modifiable sans réimprimer</CardDescription>
          </div>
          <StatusBadge status={page.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="mx-auto flex max-w-[220px] flex-col items-center rounded-2xl border bg-white p-4 shadow-inner">
          <Image
            src={qrDataUrl}
            alt={`QR code ${page.title}`}
            width={192}
            height={192}
            className="h-48 w-48"
            unoptimized
          />
        </div>

        <div className="rounded-lg bg-slate-50 p-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">URL cible</p>
          <p className="mt-1 break-all text-sm font-medium">{targetUrl}</p>
        </div>

        <div className="grid gap-2">
          <Button asChild variant="outline" className="w-full justify-start">
            <Link href={targetUrl} target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" />
              Ouvrir la landing page
            </Link>
          </Button>
          <Button asChild className="w-full justify-start">
            <a href={`/api/qr/${page.slug}`} download={`qrious-${page.slug}.png`}>
              <Download className="mr-2 h-4 w-4" />
              Télécharger le PNG
            </a>
          </Button>
          <CopyUrlClient url={targetUrl} />
        </div>
      </CardContent>
    </Card>
  )
}

import { NextResponse } from 'next/server'

import { generateQrBuffer } from '@/lib/dashboard/qr'
import { getLandingPageBySlugAny } from '@/lib/payload'

interface RouteParams {
  params: Promise<{ slug: string }>
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { slug } = await params
  const page = await getLandingPageBySlugAny(slug)

  if (!page) {
    return NextResponse.json({ error: 'QR code introuvable' }, { status: 404 })
  }

  const color = page.theme?.primaryColor || '#0f172a'
  const buffer = await generateQrBuffer(slug, color)

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'image/png',
      'Content-Disposition': `attachment; filename="qrious-${slug}.png"`,
      'Cache-Control': 'public, max-age=3600',
    },
  })
}

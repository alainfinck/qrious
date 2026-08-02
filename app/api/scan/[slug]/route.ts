import { NextResponse } from 'next/server'
import { getLandingPageBySlugAny, incrementScanCount } from '@/lib/payload'

interface RouteParams {
  params: Promise<{ slug: string }>
}

/**
 * GET /api/scan/[slug]
 *
 * Pour les QR codes de type "redirect" :
 * - Incrémente le compteur de scans
 * - Redirige vers l'URL cible
 *
 * Pour les autres types :
 * - Incrémente le compteur de scans
 * - Redirige vers la landing page standard
 */
export async function GET(request: Request, { params }: RouteParams) {
  const { slug } = await params

  try {
    const page = await getLandingPageBySlugAny(slug)

    if (!page) {
      return NextResponse.redirect(new URL('/', request.url), { status: 302 })
    }

    // Incrémenter le compteur de scans (best-effort, non bloquant)
    incrementScanCount(page.id).catch(console.error)

    if (page.vertical === 'redirect' && page.redirectData?.targetUrl) {
      // Redirection directe vers l'URL cible
      const targetUrl = page.redirectData.targetUrl.startsWith('http')
        ? page.redirectData.targetUrl
        : `https://${page.redirectData.targetUrl}`

      return NextResponse.redirect(targetUrl, { status: 302 })
    }

    // Pour les autres types, redirection vers la landing page standard
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
    return NextResponse.redirect(`${baseUrl}/${slug}`, { status: 302 })
  } catch (error) {
    console.error('[Scan API] Error:', error)
    return NextResponse.redirect(new URL('/', request.url), { status: 302 })
  }
}

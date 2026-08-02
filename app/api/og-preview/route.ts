import { NextResponse } from 'next/server'

export type OgPreviewResult = {
  url: string
  finalUrl: string
  title: string | null
  description: string | null
  image: string | null
  siteName: string | null
  favicon: string | null
}

const MAX_BYTES = 512_000
const FETCH_TIMEOUT_MS = 8_000

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
}

function extractAttr(tag: string, attr: string): string | null {
  const re = new RegExp(`${attr}\\s*=\\s*["']([^"']*)["']`, 'i')
  const m = tag.match(re)
  return m?.[1] ? decodeHtmlEntities(m[1].trim()) : null
}

function metaContent(html: string, keys: string[]): string | null {
  const metaRe = /<meta\b[^>]*>/gi
  let match: RegExpExecArray | null
  while ((match = metaRe.exec(html))) {
    const tag = match[0]
    const prop =
      extractAttr(tag, 'property') || extractAttr(tag, 'name') || extractAttr(tag, 'itemprop')
    if (!prop) continue
    const normalized = prop.toLowerCase()
    if (!keys.some((k) => k.toLowerCase() === normalized)) continue
    const content = extractAttr(tag, 'content')
    if (content) return content
  }
  return null
}

function extractTitle(html: string): string | null {
  const m = html.match(/<title[^>]*>([^<]*)<\/title>/i)
  return m?.[1] ? decodeHtmlEntities(m[1].trim()) : null
}

function extractFavicon(html: string, base: URL): string | null {
  const linkRe = /<link\b[^>]*>/gi
  let match: RegExpExecArray | null
  let fallback: string | null = null
  while ((match = linkRe.exec(html))) {
    const tag = match[0]
    const rel = (extractAttr(tag, 'rel') || '').toLowerCase()
    if (!rel.includes('icon')) continue
    const href = extractAttr(tag, 'href')
    if (!href) continue
    try {
      const abs = new URL(href, base).toString()
      if (rel.includes('apple-touch-icon')) return abs
      if (!fallback) fallback = abs
    } catch {
      /* ignore */
    }
  }
  return fallback
}

function absoluteUrl(value: string | null, base: URL): string | null {
  if (!value) return null
  try {
    return new URL(value, base).toString()
  } catch {
    return null
  }
}

function isAllowedUrl(raw: string): URL | null {
  let parsed: URL
  try {
    parsed = new URL(raw)
  } catch {
    return null
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null
  return parsed
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const rawUrl = searchParams.get('url')?.trim()

  if (!rawUrl) {
    return NextResponse.json({ error: 'Paramètre url requis' }, { status: 400 })
  }

  const target = isAllowedUrl(rawUrl)
  if (!target) {
    return NextResponse.json({ error: 'URL invalide (http/https uniquement)' }, { status: 400 })
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

  try {
    const response = await fetch(target.toString(), {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        Accept: 'text/html,application/xhtml+xml',
        'User-Agent': 'QRiousOgPreview/1.0 (+https://www.qrious.fr)',
      },
    })

    const finalUrl = response.url || target.toString()
    const finalParsed = new URL(finalUrl)
    const contentType = response.headers.get('content-type') || ''

    if (!contentType.includes('text/html') && !contentType.includes('application/xhtml')) {
      const host = finalParsed.hostname.replace(/^www\./, '')
      const result: OgPreviewResult = {
        url: target.toString(),
        finalUrl,
        title: host,
        description: null,
        image: null,
        siteName: host,
        favicon: `${finalParsed.origin}/favicon.ico`,
      }
      return NextResponse.json(result)
    }

    const reader = response.body?.getReader()
    let html = ''
    if (reader) {
      const decoder = new TextDecoder()
      let received = 0
      while (received < MAX_BYTES) {
        const { done, value } = await reader.read()
        if (done) break
        received += value.byteLength
        html += decoder.decode(value, { stream: true })
        if (html.includes('</head>') || received >= MAX_BYTES) {
          try {
            await reader.cancel()
          } catch {
            /* ignore */
          }
          break
        }
      }
    } else {
      html = (await response.text()).slice(0, MAX_BYTES)
    }

    const title =
      metaContent(html, ['og:title', 'twitter:title']) || extractTitle(html)
    const description =
      metaContent(html, ['og:description', 'twitter:description', 'description'])
    const image = absoluteUrl(
      metaContent(html, ['og:image', 'og:image:url', 'twitter:image', 'twitter:image:src']),
      finalParsed,
    )
    const siteName =
      metaContent(html, ['og:site_name']) || finalParsed.hostname.replace(/^www\./, '')
    const favicon =
      extractFavicon(html, finalParsed) || `${finalParsed.origin}/favicon.ico`

    const result: OgPreviewResult = {
      url: target.toString(),
      finalUrl,
      title,
      description,
      image,
      siteName,
      favicon,
    }

    return NextResponse.json(result, {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
    })
  } catch (error) {
    const message =
      error instanceof Error && error.name === 'AbortError'
        ? 'Délai dépassé en récupérant la page'
        : 'Impossible de récupérer les métadonnées'
    return NextResponse.json({ error: message }, { status: 502 })
  } finally {
    clearTimeout(timer)
  }
}

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

const CORS_ORIGINS = new Set([
  'http://localhost:3000',
  'http://localhost:8081',
  'http://localhost:19006',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:8081',
  'http://127.0.0.1:19006',
  'https://www.qrious.fr',
  'https://qrious.fr',
])

/** Prefer a social-crawler UA so Next.js/SSR sites emit OG tags in the initial head. */
const FETCH_HEADERS = {
  Accept: 'text/html,application/xhtml+xml',
  'User-Agent':
    'facebookexternalhit/1.1; QRiousOgPreview/1.0 (+https://www.qrious.fr)',
  'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8',
}

function corsHeaders(request: Request): HeadersInit {
  const origin = request.headers.get('origin') || ''
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    Vary: 'Origin',
  }
  if (origin && CORS_ORIGINS.has(origin)) {
    headers['Access-Control-Allow-Origin'] = origin
  }
  return headers
}

function jsonWithCors(
  request: Request,
  body: unknown,
  init?: { status?: number; headers?: Record<string, string> },
) {
  return NextResponse.json(body, {
    status: init?.status,
    headers: {
      ...corsHeaders(request),
      ...init?.headers,
    },
  })
}

export async function OPTIONS(request: Request) {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(request),
  })
}

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

/**
 * Next.js App Router sometimes streams an early </head> and only later embeds
 * metadata inside the RSC payload as escaped JSON. Recover those values.
 */
function metaContentFromRsc(html: string, keys: string[]): string | null {
  for (const key of keys) {
    const patterns = [
      new RegExp(
        `\\\\"property\\\\":\\\\"${escapeRegExp(key)}\\\\",\\\\"content\\\\":\\\\"((?:\\\\.|[^\\\\"])*)\\\\"`,
        'i',
      ),
      new RegExp(
        `\\\\"name\\\\":\\\\"${escapeRegExp(key)}\\\\",\\\\"content\\\\":\\\\"((?:\\\\.|[^\\\\"])*)\\\\"`,
        'i',
      ),
      new RegExp(
        `"property"\\s*:\\s*"${escapeRegExp(key)}"\\s*,\\s*"content"\\s*:\\s*"((?:\\\\.|[^"\\\\])*)"`,
        'i',
      ),
    ]
    for (const re of patterns) {
      const m = html.match(re)
      if (!m?.[1]) continue
      const raw = m[1]
        .replace(/\\"/g, '"')
        .replace(/\\n/g, '\n')
        .replace(/\\u([0-9a-f]{4})/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
      const value = decodeHtmlEntities(raw.trim())
      if (value) return value
    }
  }
  return null
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function readMeta(html: string, keys: string[]): string | null {
  return metaContent(html, keys) || metaContentFromRsc(html, keys)
}

function extractTitle(html: string): string | null {
  const m = html.match(/<title[^>]*>([^<]*)<\/title>/i)
  if (m?.[1]) return decodeHtmlEntities(m[1].trim())
  const rsc = html.match(/\\\\"children\\\\":\\\\"((?:\\\\.|[^\\\\"])*)\\\\"[^"]*\\\\"type\\\\":\\\\"title\\\\"/i)
  if (rsc?.[1]) {
    return decodeHtmlEntities(
      rsc[1].replace(/\\"/g, '"').replace(/\\u([0-9a-f]{4})/gi, (_, h) =>
        String.fromCharCode(parseInt(h, 16)),
      ),
    )
  }
  return null
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

function hasUsefulHeadMeta(html: string): boolean {
  return Boolean(
    readMeta(html, ['og:title', 'twitter:title', 'og:image', 'og:description']) ||
      extractTitle(html),
  )
}

async function readHtml(response: Response): Promise<string> {
  const reader = response.body?.getReader()
  if (!reader) {
    return (await response.text()).slice(0, MAX_BYTES)
  }

  const decoder = new TextDecoder()
  let html = ''
  let received = 0

  while (received < MAX_BYTES) {
    const { done, value } = await reader.read()
    if (done) break
    received += value.byteLength
    html += decoder.decode(value, { stream: true })

    // Next.js may flush an early </head> before streaming metadata.
    // Only stop once the head is closed AND we already have useful meta,
    // or we've consumed a generous prefix of the document.
    const headClosed = html.includes('</head>')
    if (headClosed && hasUsefulHeadMeta(html)) break
    if (received >= MAX_BYTES) break
  }

  try {
    await reader.cancel()
  } catch {
    /* ignore */
  }

  return html
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const rawUrl = searchParams.get('url')?.trim()

  if (!rawUrl) {
    return jsonWithCors(request, { error: 'Paramètre url requis' }, { status: 400 })
  }

  const target = isAllowedUrl(rawUrl)
  if (!target) {
    return jsonWithCors(
      request,
      { error: 'URL invalide (http/https uniquement)' },
      { status: 400 },
    )
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

  try {
    const response = await fetch(target.toString(), {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: FETCH_HEADERS,
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
      return jsonWithCors(request, result)
    }

    const html = await readHtml(response)

    const title =
      readMeta(html, ['og:title', 'twitter:title']) || extractTitle(html)
    const description = readMeta(html, [
      'og:description',
      'twitter:description',
      'description',
    ])
    const image = absoluteUrl(
      readMeta(html, ['og:image', 'og:image:url', 'twitter:image', 'twitter:image:src']),
      finalParsed,
    )
    const siteName =
      readMeta(html, ['og:site_name']) || finalParsed.hostname.replace(/^www\./, '')
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

    const hasContent = Boolean(title || description || image)
    return jsonWithCors(request, result, {
      headers: {
        'Cache-Control': hasContent
          ? 'public, s-maxage=300, stale-while-revalidate=600'
          : 'public, s-maxage=30, stale-while-revalidate=60',
      },
    })
  } catch (error) {
    const message =
      error instanceof Error && error.name === 'AbortError'
        ? 'Délai dépassé en récupérant la page'
        : 'Impossible de récupérer les métadonnées'
    return jsonWithCors(request, { error: message }, { status: 502 })
  } finally {
    clearTimeout(timer)
  }
}

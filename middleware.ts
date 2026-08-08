import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing, locales } from './src/i18n/routing'

const handleI18n = createMiddleware(routing)

const EXPO_WEB_BASE = '/newqr'

/** Sites autorisés à iframe l’éditeur (/newqr?embed=1) */
const EMBED_FRAME_ANCESTORS = [
  "'self'",
  'https://www.qrious.fr',
  'https://qrious.fr',
  'https://www.cartepostale.cool',
  'https://cartepostale.cool',
  'https://www.postcard.cool',
  'https://postcard.cool',
  'http://localhost:3000',
  'http://localhost:8081',
  'http://localhost:8082',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:8081',
  'http://127.0.0.1:8082',
].join(' ')

function withEmbedHeaders(response: NextResponse): NextResponse {
  // Autorise l’iframe partenaire ; retire X-Frame-Options si un proxy l’avait posé
  response.headers.set('Content-Security-Policy', `frame-ancestors ${EMBED_FRAME_ANCESTORS}`)
  response.headers.delete('X-Frame-Options')
  return response
}

/**
 * Expo export static pose des fichiers `home.html`, `login.html`, `[id].html`, etc.
 * Next ne mappe pas `/newqr/home` → `home.html` : on réécrit ici.
 */
function resolveExpoStaticRewrite(pathname: string): string | null {
  if (pathname === EXPO_WEB_BASE || pathname === `${EXPO_WEB_BASE}/`) {
    return `${EXPO_WEB_BASE}/index.html`
  }
  if (!pathname.startsWith(`${EXPO_WEB_BASE}/`)) return null
  // Assets déjà sous public (js/css/ico/png…) — laisser Next les servir
  if (pathname.includes('.')) return null

  const rest = pathname.slice(EXPO_WEB_BASE.length) // e.g. /home, /login, /abc123

  // Routes dynamiques expo-router
  const dynamicRules: Array<{ pattern: RegExp; file: string }> = [
    { pattern: /^\/[^/]+$/, file: '/[id].html' },
  ]

  // Fichiers connus hors dynamique
  const staticRoutes = new Set([
    '/home',
    '/new',
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/qr-codes',
    '/pages',
    '/medias',
    '/statistiques',
    '/profil',
    '/scanner',
    '/embed',
  ])

  if (staticRoutes.has(rest)) {
    return `${EXPO_WEB_BASE}${rest}.html`
  }

  for (const rule of dynamicRules) {
    if (rule.pattern.test(rest)) {
      return `${EXPO_WEB_BASE}${rule.file}`
    }
  }

  return `${EXPO_WEB_BASE}${rest}.html`
}

function stripLocalePrefix(pathname: string): string | null {
  const parts = pathname.split('/')
  if (parts.length >= 2 && locales.includes(parts[1] as (typeof locales)[number])) {
    const segment = parts[2]
    if (segment === 'newqr' || segment === 'editeur' || segment === 'embed') {
      return (
        EXPO_WEB_BASE + (segment === 'embed' ? '/embed' : '') + (parts.length > 3 ? '/' + parts.slice(3).join('/') : '')
      )
    }
  }
  return null
}

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // /fr/newqr|/editeur|/embed → /newqr ou /newqr/embed
  const localeStripped = stripLocalePrefix(pathname)
  if (localeStripped) {
    const url = request.nextUrl.clone()
    url.pathname = localeStripped
    return NextResponse.redirect(url, 301)
  }

  // Ancien chemin /editeur → /newqr
  if (pathname === '/editeur' || pathname.startsWith('/editeur/')) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.replace(/^\/editeur/, EXPO_WEB_BASE)
    return NextResponse.redirect(url, 301)
  }

  // Chemin direct /embed → /newqr/embed
  if (pathname === '/embed' || pathname.startsWith('/embed/')) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.replace(/^\/embed/, `${EXPO_WEB_BASE}/embed`)
    return withEmbedHeaders(NextResponse.rewrite(url))
  }

  if (pathname === EXPO_WEB_BASE || pathname.startsWith(`${EXPO_WEB_BASE}/`)) {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-pathname', pathname)

    const expoRewrite = resolveExpoStaticRewrite(pathname)
    if (expoRewrite && expoRewrite !== pathname) {
      const url = request.nextUrl.clone()
      url.pathname = expoRewrite
      return withEmbedHeaders(NextResponse.rewrite(url, { request: { headers: requestHeaders } }))
    }

    return withEmbedHeaders(
      NextResponse.next({
        request: { headers: requestHeaders },
      }),
    )
  }

  const requestHeaders = new Headers(request.headers)
  const fullPath = pathname + request.nextUrl.search
  requestHeaders.set('x-pathname', fullPath)

  const req = new NextRequest(request, {
    headers: requestHeaders,
  })

  return handleI18n(req)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|admin|.*\\..*).*)'],
}

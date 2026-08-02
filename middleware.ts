import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing, locales } from './src/i18n/routing'

const handleI18n = createMiddleware(routing)

const EXPO_WEB_BASE = '/newqr'

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
    if (segment === 'newqr' || segment === 'editeur') {
      return (
        EXPO_WEB_BASE + (parts.length > 3 ? '/' + parts.slice(3).join('/') : '')
      )
    }
  }
  return null
}

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // /fr/newqr|/editeur → /newqr (pas de locale sur l’app Expo)
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

  if (pathname === EXPO_WEB_BASE || pathname.startsWith(`${EXPO_WEB_BASE}/`)) {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-pathname', pathname)

    const rewriteTarget = resolveExpoStaticRewrite(pathname)
    if (rewriteTarget) {
      const url = request.nextUrl.clone()
      url.pathname = rewriteTarget
      return NextResponse.rewrite(url, {
        request: { headers: requestHeaders },
      })
    }

    return NextResponse.next({
      request: { headers: requestHeaders },
    })
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

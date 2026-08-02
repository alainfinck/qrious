import createMiddleware from 'next-intl/middleware'
import { NextRequest } from 'next/server'
import { routing } from './src/i18n/routing'

const handleI18n = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  const fullPath = request.nextUrl.pathname + request.nextUrl.search
  requestHeaders.set('x-pathname', fullPath)

  const req = new NextRequest(request, {
    headers: requestHeaders,
  })

  return handleI18n(req)
}

export const config = {
  // Match only internationalized pathnames
  // We exclude /api, /admin (Payload CMS), and static files
  matcher: ['/((?!api|_next|_vercel|admin|.*\\..*).*)'],
}


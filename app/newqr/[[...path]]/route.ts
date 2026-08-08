import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

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

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase()
  switch (ext) {
    case '.html':
      return 'text/html; charset=utf-8'
    case '.js':
    case '.mjs':
      return 'application/javascript; charset=utf-8'
    case '.css':
      return 'text/css; charset=utf-8'
    case '.json':
      return 'application/json; charset=utf-8'
    case '.png':
      return 'image/png'
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg'
    case '.gif':
      return 'image/gif'
    case '.webp':
      return 'image/webp'
    case '.svg':
      return 'image/svg+xml'
    case '.ico':
      return 'image/x-icon'
    case '.woff2':
      return 'font/woff2'
    case '.woff':
      return 'font/woff'
    case '.ttf':
      return 'font/ttf'
    default:
      return 'application/octet-stream'
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> },
) {
  const { path: pathSegments } = await params
  const publicNewqrDir = path.join(process.cwd(), 'public', 'newqr')

  const relPath = pathSegments ? pathSegments.join('/') : ''

  // Known Expo static HTML pages
  const staticHtmlRoutes = new Set([
    '',
    'index',
    'home',
    'new',
    'login',
    'register',
    'forgot-password',
    'reset-password',
    'qr-codes',
    'pages',
    'medias',
    'statistiques',
    'profil',
    'scanner',
  ])

  let targetFile: string

  if (!relPath || relPath === '/') {
    targetFile = path.join(publicNewqrDir, 'index.html')
  } else if (path.extname(relPath)) {
    // Direct static asset file (js, css, png, ico, etc.)
    targetFile = path.join(publicNewqrDir, relPath)
  } else {
    // HTML route without extension
    if (staticHtmlRoutes.has(relPath)) {
      targetFile = path.join(publicNewqrDir, `${relPath}.html`)
    } else if (fs.existsSync(path.join(publicNewqrDir, `${relPath}.html`))) {
      targetFile = path.join(publicNewqrDir, `${relPath}.html`)
    } else {
      // Dynamic route like /newqr/[id]
      const dynamicFile = path.join(publicNewqrDir, '[id].html')
      targetFile = fs.existsSync(dynamicFile) ? dynamicFile : path.join(publicNewqrDir, 'index.html')
    }
  }

  if (!fs.existsSync(targetFile) || fs.statSync(targetFile).isDirectory()) {
    return new NextResponse('Not found', { status: 404 })
  }

  const content = fs.readFileSync(targetFile)
  const mimeType = getMimeType(targetFile)

  const response = new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': mimeType,
      'Content-Security-Policy': `frame-ancestors ${EMBED_FRAME_ANCESTORS}`,
      'Cache-Control': relPath.includes('_expo/static/')
        ? 'public, max-age=31536000, immutable'
        : 'no-cache, no-store, must-revalidate',
    },
  })
  response.headers.delete('X-Frame-Options')
  return response
}

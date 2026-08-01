import { NextRequest, NextResponse } from 'next/server'

import { getLandingPageBySlug } from '@/lib/payload'
import { getPublicBaseUrl } from '@/lib/dashboard/utils'

interface Params {
  params: Promise<{ slug: string }>
}

/**
 * Generates a RFC 6350-compliant vCard 3.0 file for the given slug.
 * GET /api/vcard/[slug]
 */
export async function GET(_req: NextRequest, { params }: Params) {
  const { slug } = await params
  const page = await getLandingPageBySlug(slug)

  if (!page || page.vertical !== 'vcard') {
    return new NextResponse('Not found', { status: 404 })
  }

  const v = page.vcardData ?? {}

  // ── Build vCard 3.0 ──────────────────────────────────────────────────────
  const lines: string[] = []

  const push = (line: string) => lines.push(line)

  push('BEGIN:VCARD')
  push('VERSION:3.0')

  // FN (formatted name)
  const fn =
    v.fullName ||
    [v.firstName, v.lastName].filter(Boolean).join(' ') ||
    page.title
  push(`FN:${escVcard(fn)}`)

  // N (structured name: Family;Given;Additional;Prefix;Suffix)
  const family = v.lastName || ''
  const given = v.firstName || ''
  push(`N:${escVcard(family)};${escVcard(given)};;;`)

  // ORG
  if (v.company) push(`ORG:${escVcard(v.company)}`)

  // TITLE
  if (v.jobTitle) push(`TITLE:${escVcard(v.jobTitle)}`)

  // NOTE (bio)
  if (v.bio) push(`NOTE:${escVcard(v.bio)}`)

  // TEL
  if (v.phone) push(`TEL;TYPE=CELL:${v.phone}`)
  if (v.phoneWork) push(`TEL;TYPE=WORK:${v.phoneWork}`)

  // EMAIL
  if (v.email) push(`EMAIL;TYPE=HOME:${v.email}`)
  if (v.emailWork) push(`EMAIL;TYPE=WORK:${v.emailWork}`)

  // URL (website)
  if (v.website) push(`URL:${v.website}`)

  // ADR
  if (v.address) push(`ADR;TYPE=HOME:;;${escVcard(v.address)};;;;`)

  // X-SOCIALPROFILE — LinkedIn
  if (v.linkedinUrl) push(`X-SOCIALPROFILE;TYPE=linkedin:${v.linkedinUrl}`)
  if (v.twitterUrl) push(`X-SOCIALPROFILE;TYPE=twitter:${v.twitterUrl}`)
  if (v.instagramUrl) push(`X-SOCIALPROFILE;TYPE=instagram:${v.instagramUrl}`)
  if (v.githubUrl) push(`X-SOCIALPROFILE;TYPE=github:${v.githubUrl}`)

  // Profile URL (for QR landing)
  push(`URL;TYPE=WORK:${getPublicBaseUrl()}/${page.slug}`)

  // Source
  push(`SOURCE:${getPublicBaseUrl()}/${page.slug}`)

  // Rev
  push(`REV:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`)

  push('END:VCARD')

  const vcfContent = lines.join('\r\n') + '\r\n'

  const filename = slugToFilename(fn)

  return new NextResponse(vcfContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}.vcf"`,
      'Cache-Control': 'no-store',
    },
  })
}

// ── Helpers ─────────────────────────────────────────────────────────────────

/** Escape special characters for vCard values */
function escVcard(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
    .replace(/\n/g, '\\n')
}

/** Turn a display name into a safe ASCII filename */
function slugToFilename(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48) || 'contact'
}

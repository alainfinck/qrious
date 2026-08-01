import type { LandingPage } from '@/types/landing-page'

export function getMockScanCount(id: string): number {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = (hash + id.charCodeAt(i) * (i + 1)) % 1000
  }
  return 40 + (hash % 180)
}

export function getMockUniqueVisitors(pages: LandingPage[]): number {
  return Math.round(pages.reduce((sum, page) => sum + getMockScanCount(page.id), 0) * 0.42)
}

export function getMockTotalScans(pages: LandingPage[]): number {
  return pages.reduce((sum, page) => sum + getMockScanCount(page.id), 0)
}

export const WEEKLY_ACTIVITY = [
  { day: 'Lun', scans: 12 },
  { day: 'Mar', scans: 18 },
  { day: 'Mer', scans: 14 },
  { day: 'Jeu', scans: 22 },
  { day: 'Ven', scans: 28 },
  { day: 'Sam', scans: 19 },
  { day: 'Dim', scans: 15 },
]

export function getArtistName(page: LandingPage): string {
  if (page.vertical === 'art' && page.artData?.artistName) {
    return page.artData.artistName
  }
  if (page.vertical === 'vcard' && page.vcardData?.fullName) {
    return page.vcardData.fullName
  }
  if (page.vertical === 'immo') {
    return 'Immobilier'
  }
  return 'Artiste non renseigné'
}

export function formatShortDate(value?: string | null): string {
  if (!value) return '—'
  return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'short' }).format(new Date(value))
}

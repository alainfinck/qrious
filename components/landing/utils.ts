import type { MediaAsset } from '@/types/landing-page'

export function resolveMediaUrl(media?: MediaAsset | string | null): string | null {
  if (!media) return null
  if (typeof media === 'string') return null
  return media.url ?? null
}

export function formatPrice(price?: number | null): string {
  if (price == null) return '—'
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price)
}

const DPE_COLORS: Record<string, string> = {
  A: '#319834',
  B: '#33cc31',
  C: '#cbda2c',
  D: '#fbea49',
  E: '#f7b231',
  F: '#eb8235',
  G: '#e31f26',
}

export function getDpeColor(dpe?: string | null): string {
  if (!dpe) return '#94a3b8'
  return DPE_COLORS[dpe] ?? '#94a3b8'
}

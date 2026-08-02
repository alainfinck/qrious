export function getPublicBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
}

export function getQrTargetUrl(slug: string): string {
  return `${getPublicBaseUrl()}/${slug}`
}

export function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64)
}

import type { LandingPageVertical } from '@/types/landing-page'

export const VERTICAL_LABELS: Record<LandingPageVertical, string> = {
  generic: 'Générique',
  redirect: 'Redirection URL',
  art: 'Art',
  immo: 'Immobilier',
  vcard: 'Carte de visite',
  product: 'Manuel / Produit',
  feedback: 'Avis / Feedback',
  tourism: 'Tourisme / Patrimoine',
  chrd: 'CHR & Hôtellerie',
  corporate_event: 'Événement Pro',
  ugc_retail: 'UGC & Retail',
  field_service: 'Intervention / Maintenance',
}

export const STATUS_LABELS = {
  draft: 'Brouillon',
  published: 'Publié',
} as const

export function formatDate(value?: string | null): string {
  if (!value) return '—'
  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

import type { LandingPageVertical } from '../types/landing-page'

export function getApiBaseUrl(): string {
  const raw = (process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000').replace(/\/$/, '')
  if (raw === 'https://v2.qrious.fr' || raw === 'http://v2.qrious.fr') {
    return 'https://www.qrious.fr'
  }
  return raw
}

export function getQrTargetUrl(slug: string): string {
  return `${getApiBaseUrl()}/${slug}`
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

export function generateRandomSlug(length = 4): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export const VERTICAL_LABELS: Record<LandingPageVertical, string> = {
  generic: 'Générique',
  redirect: 'Redirection URL',
  art: 'Art & Galerie',
  immo: 'Immobilier & Gîte',
  vcard: 'vCard Pro',
  product: 'Produit & Notice',
  feedback: 'Avis & Satisfaction',
  tourism: 'Tourisme & Guide',
  chrd: 'CHRD (Hôtel/Resto)',
  corporate_event: 'Événement Corporate',
  ugc_retail: 'Retail & Concours UGC',
  field_service: 'Field Service & Machine',
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

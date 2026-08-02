export type QrContentType =
  | 'url'
  | 'text'
  | 'email'
  | 'phone'
  | 'sms'
  | 'wifi'
  | 'vcard'
  | 'whatsapp'
  | 'location'
  | 'event'
  | 'social'
  | 'pdf'
  | 'app'
  | 'art'
  | 'immo'
  | 'chrd'
  | 'product'
  | 'feedback'
  | 'tourism'
  | 'corporate_event'
  | 'ugc_retail'
  | 'field_service'
  | 'generic_smart'

export type WifiEncryption = 'WPA' | 'WEP' | 'nopass'

export interface UrlPayload {
  url: string
}

export interface TextPayload {
  text: string
}

export interface EmailPayload {
  email: string
  subject?: string
  body?: string
}

export interface PhonePayload {
  phone: string
}

export interface SmsPayload {
  phone: string
  message?: string
}

export interface WifiPayload {
  ssid: string
  password?: string
  encryption: WifiEncryption
  hidden?: boolean
}

export interface VCardPayload {
  firstName: string
  lastName?: string
  organization?: string
  title?: string
  phone?: string
  email?: string
  website?: string
  street?: string
  city?: string
  zip?: string
  country?: string
}

export interface WhatsappPayload {
  phone: string
  message?: string
}

export interface LocationPayload {
  address?: string
  latitude?: string
  longitude?: string
}

export interface EventPayload {
  title: string
  location?: string
  startDate?: string
  endDate?: string
  description?: string
}

export interface SocialPayload {
  platform: 'instagram' | 'tiktok' | 'linkedin' | 'youtube' | 'facebook' | 'twitter'
  usernameOrUrl: string
}

export interface PdfPayload {
  pdfUrl: string
  title?: string
}

export interface AppPayload {
  appUrl: string
  appName?: string
}

export interface ArtPayload {
  artistName: string
  title: string
  medium?: string
  price?: string
  gallery?: string
  targetUrl?: string
}

export interface ImmoPayload {
  title: string
  city?: string
  price?: string
  wifiName?: string
  contactPhone?: string
  targetUrl?: string
}

export interface ChrdPayload {
  establishmentName: string
  menuUrl?: string
  wifiName?: string
  googleReviewUrl?: string
  targetUrl?: string
}

export interface ProductPayload {
  productName: string
  brandName?: string
  manualUrl?: string
  supportEmail?: string
  targetUrl?: string
}

export interface FeedbackPayload {
  companyName: string
  googleReviewUrl?: string
  directEmail?: string
  targetUrl?: string
}

export interface TourismPayload {
  placeName: string
  location?: string
  audioGuideUrl?: string
  websiteUrl?: string
  targetUrl?: string
}

export interface CorporateEventPayload {
  eventName: string
  companyName?: string
  date?: string
  scheduleUrl?: string
  targetUrl?: string
}

export interface UgcRetailPayload {
  brandName: string
  campaignTitle?: string
  discountCode?: string
  targetUrl?: string
}

export interface FieldServicePayload {
  assetName: string
  assetId?: string
  status?: string
  contactPhone?: string
  targetUrl?: string
}

export interface GenericSmartPayload {
  title: string
  description?: string
  ctaUrl?: string
  targetUrl?: string
}

export type QrPayloadInput =
  | { type: 'url'; data: UrlPayload }
  | { type: 'text'; data: TextPayload }
  | { type: 'email'; data: EmailPayload }
  | { type: 'phone'; data: PhonePayload }
  | { type: 'sms'; data: SmsPayload }
  | { type: 'wifi'; data: WifiPayload }
  | { type: 'vcard'; data: VCardPayload }
  | { type: 'whatsapp'; data: WhatsappPayload }
  | { type: 'location'; data: LocationPayload }
  | { type: 'event'; data: EventPayload }
  | { type: 'social'; data: SocialPayload }
  | { type: 'pdf'; data: PdfPayload }
  | { type: 'app'; data: AppPayload }
  | { type: 'art'; data: ArtPayload }
  | { type: 'immo'; data: ImmoPayload }
  | { type: 'chrd'; data: ChrdPayload }
  | { type: 'product'; data: ProductPayload }
  | { type: 'feedback'; data: FeedbackPayload }
  | { type: 'tourism'; data: TourismPayload }
  | { type: 'corporate_event'; data: CorporateEventPayload }
  | { type: 'ugc_retail'; data: UgcRetailPayload }
  | { type: 'field_service'; data: FieldServicePayload }
  | { type: 'generic_smart'; data: GenericSmartPayload }

function escapeWifiValue(value: string): string {
  return value.replace(/([\\;,:"])/g, '\\$1')
}

function normalizeUrl(url: string): string {
  const trimmed = url.trim()
  if (!trimmed) return ''
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

export function buildQrPayload(input: QrPayloadInput): string {
  switch (input.type) {
    case 'url':
      return normalizeUrl(input.data.url)
    case 'text':
      return input.data.text.trim()
    case 'email': {
      const { email, subject, body } = input.data
      const params = new URLSearchParams()
      if (subject?.trim()) params.set('subject', subject.trim())
      if (body?.trim()) params.set('body', body.trim())
      const query = params.toString()
      return `mailto:${email.trim()}${query ? `?${query}` : ''}`
    }
    case 'phone':
      return `tel:${input.data.phone.trim().replace(/\s+/g, '')}`
    case 'sms': {
      const phone = input.data.phone.trim().replace(/\s+/g, '')
      const message = input.data.message?.trim()
      return message ? `sms:${phone}?body=${encodeURIComponent(message)}` : `sms:${phone}`
    }
    case 'wifi': {
      const { ssid, password, encryption, hidden } = input.data
      const parts = [
        `T:${encryption}`,
        `S:${escapeWifiValue(ssid)}`,
        encryption === 'nopass' ? '' : `P:${escapeWifiValue(password ?? '')}`,
        hidden ? 'H:true' : '',
      ].filter(Boolean)
      return `WIFI:${parts.join(';')};;`
    }
    case 'vcard': {
      const d = input.data
      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${d.lastName ?? ''};${d.firstName};;;`,
        `FN:${[d.firstName, d.lastName].filter(Boolean).join(' ')}`,
      ]
      if (d.organization?.trim()) lines.push(`ORG:${d.organization.trim()}`)
      if (d.title?.trim()) lines.push(`TITLE:${d.title.trim()}`)
      if (d.phone?.trim()) lines.push(`TEL;TYPE=CELL:${d.phone.trim()}`)
      if (d.email?.trim()) lines.push(`EMAIL:${d.email.trim()}`)
      if (d.website?.trim()) lines.push(`URL:${normalizeUrl(d.website)}`)
      const adr = [d.street, d.city, d.zip, d.country].some((v) => v?.trim())
      if (adr) {
        lines.push(`ADR:;;${d.street ?? ''};${d.city ?? ''};;${d.zip ?? ''};${d.country ?? ''}`)
      }
      lines.push('END:VCARD')
      return lines.join('\n')
    }
    case 'whatsapp': {
      const phone = input.data.phone.trim().replace(/[^\d+]/g, '')
      const text = input.data.message?.trim()
      return text ? `https://wa.me/${phone}?text=${encodeURIComponent(text)}` : `https://wa.me/${phone}`
    }
    case 'location': {
      if (input.data.address?.trim()) {
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(input.data.address.trim())}`
      }
      const lat = input.data.latitude?.trim()
      const lng = input.data.longitude?.trim()
      return lat && lng ? `https://www.google.com/maps/search/?api=1&query=${lat},${lng}` : ''
    }
    case 'event': {
      const d = input.data
      const formatDate = (str?: string) => str ? str.replace(/[-:]/g, '') : ''
      const lines = [
        'BEGIN:VEVENT',
        `SUMMARY:${d.title.trim()}`,
      ]
      if (d.startDate?.trim()) lines.push(`DTSTART:${formatDate(d.startDate.trim())}`)
      if (d.endDate?.trim()) lines.push(`DTEND:${formatDate(d.endDate.trim())}`)
      if (d.location?.trim()) lines.push(`LOCATION:${d.location.trim()}`)
      if (d.description?.trim()) lines.push(`DESCRIPTION:${d.description.trim()}`)
      lines.push('END:VEVENT')
      return lines.join('\n')
    }
    case 'social': {
      const val = input.data.usernameOrUrl.trim()
      if (/^https?:\/\//i.test(val)) return val
      const user = val.replace(/^@/, '')
      switch (input.data.platform) {
        case 'instagram': return `https://instagram.com/${user}`
        case 'tiktok': return `https://tiktok.com/@${user}`
        case 'linkedin': return `https://linkedin.com/in/${user}`
        case 'youtube': return `https://youtube.com/@${user}`
        case 'facebook': return `https://facebook.com/${user}`
        case 'twitter': return `https://x.com/${user}`
      }
    }
    case 'pdf':
      return normalizeUrl(input.data.pdfUrl)
    case 'app':
      return normalizeUrl(input.data.appUrl)

    case 'art':
      return input.data.targetUrl?.trim()
        ? normalizeUrl(input.data.targetUrl)
        : `https://qrious.app/s/demo-art?artist=${encodeURIComponent(input.data.artistName)}&title=${encodeURIComponent(input.data.title)}`
    case 'immo':
      return input.data.targetUrl?.trim()
        ? normalizeUrl(input.data.targetUrl)
        : `https://qrious.app/s/demo-immo?title=${encodeURIComponent(input.data.title)}&city=${encodeURIComponent(input.data.city ?? '')}`
    case 'chrd':
      return input.data.targetUrl?.trim()
        ? normalizeUrl(input.data.targetUrl)
        : `https://qrious.app/s/demo-chrd?name=${encodeURIComponent(input.data.establishmentName)}`
    case 'product':
      return input.data.targetUrl?.trim()
        ? normalizeUrl(input.data.targetUrl)
        : `https://qrious.app/s/demo-product?name=${encodeURIComponent(input.data.productName)}`
    case 'feedback':
      return input.data.targetUrl?.trim()
        ? normalizeUrl(input.data.targetUrl)
        : `https://qrious.app/s/demo-feedback?name=${encodeURIComponent(input.data.companyName)}`
    case 'tourism':
      return input.data.targetUrl?.trim()
        ? normalizeUrl(input.data.targetUrl)
        : `https://qrious.app/s/demo-tourism?place=${encodeURIComponent(input.data.placeName)}`
    case 'corporate_event':
      return input.data.targetUrl?.trim()
        ? normalizeUrl(input.data.targetUrl)
        : `https://qrious.app/s/demo-event?event=${encodeURIComponent(input.data.eventName)}`
    case 'ugc_retail':
      return input.data.targetUrl?.trim()
        ? normalizeUrl(input.data.targetUrl)
        : `https://qrious.app/s/demo-retail?brand=${encodeURIComponent(input.data.brandName)}`
    case 'field_service':
      return input.data.targetUrl?.trim()
        ? normalizeUrl(input.data.targetUrl)
        : `https://qrious.app/s/demo-field?asset=${encodeURIComponent(input.data.assetName)}`
    case 'generic_smart':
      return input.data.targetUrl?.trim()
        ? normalizeUrl(input.data.targetUrl)
        : `https://qrious.app/s/demo-page?title=${encodeURIComponent(input.data.title)}`
  }
}

export function isPayloadReady(input: QrPayloadInput): boolean {
  switch (input.type) {
    case 'url':
      return Boolean(input.data.url.trim())
    case 'text':
      return Boolean(input.data.text.trim())
    case 'email':
      return Boolean(input.data.email.trim())
    case 'phone':
      return Boolean(input.data.phone.trim())
    case 'sms':
      return Boolean(input.data.phone.trim())
    case 'wifi':
      return Boolean(input.data.ssid.trim())
    case 'vcard':
      return Boolean(input.data.firstName.trim())
    case 'whatsapp':
      return Boolean(input.data.phone.trim())
    case 'location':
      return Boolean(input.data.address?.trim() || (input.data.latitude?.trim() && input.data.longitude?.trim()))
    case 'event':
      return Boolean(input.data.title.trim())
    case 'social':
      return Boolean(input.data.usernameOrUrl.trim())
    case 'pdf':
      return Boolean(input.data.pdfUrl.trim())
    case 'app':
      return Boolean(input.data.appUrl.trim())
    case 'art':
      return Boolean(input.data.artistName.trim() || input.data.title.trim())
    case 'immo':
      return Boolean(input.data.title.trim())
    case 'chrd':
      return Boolean(input.data.establishmentName.trim())
    case 'product':
      return Boolean(input.data.productName.trim())
    case 'feedback':
      return Boolean(input.data.companyName.trim())
    case 'tourism':
      return Boolean(input.data.placeName.trim())
    case 'corporate_event':
      return Boolean(input.data.eventName.trim())
    case 'ugc_retail':
      return Boolean(input.data.brandName.trim())
    case 'field_service':
      return Boolean(input.data.assetName.trim())
    case 'generic_smart':
      return Boolean(input.data.title.trim())
  }
}

export const QR_CONTENT_TYPES: {
  value: QrContentType
  label: string
  description: string
  category: 'static' | 'smart'
}[] = [
  // Classiques Statiques
  { value: 'url', label: 'Lien Web', description: 'Lien direct vers un site ou une page', category: 'static' },
  { value: 'vcard', label: 'vCard Contact', description: 'Fiche contact téléphonique complète (VCF)', category: 'static' },
  { value: 'whatsapp', label: 'WhatsApp', description: 'Ouvre une discussion WhatsApp direct', category: 'static' },
  { value: 'wifi', label: 'Wi-Fi', description: 'Connexion automatique à un réseau Wi-Fi', category: 'static' },
  { value: 'location', label: 'Localisation', description: 'Ouvre un itinéraire Google Maps', category: 'static' },
  { value: 'event', label: 'Événement iCal', description: 'Ajout de rendez-vous dans le calendrier', category: 'static' },
  { value: 'social', label: 'Réseaux Sociaux', description: 'Profil Instagram, TikTok, LinkedIn, YouTube', category: 'static' },
  { value: 'pdf', label: 'Document PDF', description: 'Lien direct vers une brochure ou menu PDF', category: 'static' },
  { value: 'app', label: 'App Store / Play', description: 'Lien de téléchargement d’application', category: 'static' },
  { value: 'text', label: 'Texte', description: 'Texte ou note libre encodée', category: 'static' },
  { value: 'email', label: 'Email', description: 'Ouvre une rédaction d’email prérempli', category: 'static' },
  { value: 'phone', label: 'Téléphone', description: 'Déclenche un appel téléphonique direct', category: 'static' },
  { value: 'sms', label: 'SMS', description: 'Message SMS pré-rédigé', category: 'static' },

  // Smart QR Landing Pages
  { value: 'art', label: 'Art & Exposition', description: 'Fiche d’œuvre, biographie d’artiste, certificat et prix', category: 'smart' },
  { value: 'immo', label: 'Immobilier & Gîte', description: 'Notice de bienvenue, Wi-Fi, consignes et DPE', category: 'smart' },
  { value: 'chrd', label: 'Hôtel & Resto', description: 'Menu digital PDF, accès Wi-Fi et cartes postales', category: 'smart' },
  { value: 'product', label: 'Manuel Produit', description: 'Guide de mise en service, tutoriel vidéo et garantie', category: 'smart' },
  { value: 'feedback', label: 'Avis & E-Réputation', description: 'Collecte Google Reviews, Tripadvisor et avis directs', category: 'smart' },
  { value: 'tourism', label: 'Tourisme & Patrimoine', description: 'Audio-guide, coordonnées GPS et histoire du lieu', category: 'smart' },
  { value: 'corporate_event', label: 'Événement Corporate', description: 'Programme B2B, slides et Live Wall photos', category: 'smart' },
  { value: 'ugc_retail', label: 'Retail & Promo UGC', description: 'Codes promos, téléchargement de photos produit', category: 'smart' },
  { value: 'field_service', label: 'Field Service', description: 'Fiche technique matériel, astreinte et contrôles', category: 'smart' },
  { value: 'generic_smart', label: 'Landing Sur-Mesure', description: 'Page dynamique personnalisée avec boutons et média', category: 'smart' },
]

export type QrContentType = 'url' | 'text' | 'email' | 'phone' | 'sms' | 'wifi' | 'vcard'

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

export type QrPayloadInput =
  | { type: 'url'; data: UrlPayload }
  | { type: 'text'; data: TextPayload }
  | { type: 'email'; data: EmailPayload }
  | { type: 'phone'; data: PhonePayload }
  | { type: 'sms'; data: SmsPayload }
  | { type: 'wifi'; data: WifiPayload }
  | { type: 'vcard'; data: VCardPayload }

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
        lines.push(
          `ADR:;;${d.street ?? ''};${d.city ?? ''};;${d.zip ?? ''};${d.country ?? ''}`,
        )
      }
      lines.push('END:VCARD')
      return lines.join('\n')
    }
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
  }
}

export const QR_CONTENT_TYPES: { value: QrContentType; label: string; description: string }[] = [
  { value: 'url', label: 'URL', description: 'Lien vers un site ou une page' },
  { value: 'text', label: 'Texte', description: 'Message ou note libre' },
  { value: 'email', label: 'Email', description: 'Ouvre un email prérempli' },
  { value: 'phone', label: 'Téléphone', description: 'Lance un appel' },
  { value: 'sms', label: 'SMS', description: 'Ouvre un SMS' },
  { value: 'wifi', label: 'Wi-Fi', description: 'Partage un réseau Wi-Fi' },
  { value: 'vcard', label: 'vCard', description: 'Carte de visite digitale' },
]

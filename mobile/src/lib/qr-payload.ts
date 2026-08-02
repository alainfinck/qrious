export type StaticQrContentType =
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

export type WifiEncryption = 'WPA' | 'WEP' | 'nopass'

export type StaticQrPayload =
  | { type: 'url'; data: { url: string } }
  | { type: 'text'; data: { text: string } }
  | { type: 'email'; data: { email: string; subject: string; body: string } }
  | { type: 'phone'; data: { phone: string } }
  | { type: 'sms'; data: { phone: string; message: string } }
  | {
      type: 'wifi'
      data: { ssid: string; password: string; encryption: WifiEncryption; hidden: boolean }
    }
  | {
      type: 'vcard'
      data: {
        firstName: string
        lastName: string
        organization: string
        title: string
        phone: string
        email: string
        website: string
      }
    }
  | { type: 'whatsapp'; data: { phone: string; message: string } }
  | { type: 'location'; data: { address: string; latitude: string; longitude: string } }
  | {
      type: 'event'
      data: { title: string; startDate: string; endDate: string; location: string; description: string }
    }
  | {
      type: 'social'
      data: {
        platform: 'instagram' | 'tiktok' | 'linkedin' | 'youtube' | 'facebook' | 'twitter'
        usernameOrUrl: string
      }
    }
  | { type: 'pdf'; data: { pdfUrl: string } }
  | { type: 'app'; data: { appUrl: string } }

export const STATIC_CONTENT_TYPES: {
  value: StaticQrContentType
  label: string
  description: string
}[] = [
  { value: 'url', label: 'Lien Web', description: 'Lien direct vers un site' },
  { value: 'vcard', label: 'vCard Contact', description: 'Fiche contact VCF' },
  { value: 'whatsapp', label: 'WhatsApp', description: 'Discussion directe' },
  { value: 'wifi', label: 'Wi-Fi', description: 'Connexion réseau auto' },
  { value: 'location', label: 'Localisation', description: 'Itinéraire Maps' },
  { value: 'event', label: 'Événement iCal', description: 'Ajout calendrier' },
  { value: 'social', label: 'Réseaux Sociaux', description: 'Profil social' },
  { value: 'pdf', label: 'Document PDF', description: 'Brochure / menu' },
  { value: 'app', label: 'App Store / Play', description: 'Téléchargement app' },
  { value: 'text', label: 'Texte', description: 'Note libre encodée' },
  { value: 'email', label: 'Email', description: 'Mail prérempli' },
  { value: 'phone', label: 'Téléphone', description: 'Appel direct' },
  { value: 'sms', label: 'SMS', description: 'SMS pré-rédigé' },
]

function normalizeUrl(url: string): string {
  const trimmed = url.trim()
  if (!trimmed) return ''
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

export function defaultStaticPayload(type: StaticQrContentType): StaticQrPayload {
  switch (type) {
    case 'url':
      return { type: 'url', data: { url: 'https://qrious.app' } }
    case 'text':
      return { type: 'text', data: { text: '' } }
    case 'email':
      return { type: 'email', data: { email: '', subject: '', body: '' } }
    case 'phone':
      return { type: 'phone', data: { phone: '' } }
    case 'sms':
      return { type: 'sms', data: { phone: '', message: '' } }
    case 'wifi':
      return { type: 'wifi', data: { ssid: '', password: '', encryption: 'WPA', hidden: false } }
    case 'vcard':
      return {
        type: 'vcard',
        data: {
          firstName: '',
          lastName: '',
          organization: '',
          title: '',
          phone: '',
          email: '',
          website: '',
        },
      }
    case 'whatsapp':
      return { type: 'whatsapp', data: { phone: '', message: '' } }
    case 'location':
      return { type: 'location', data: { address: '', latitude: '', longitude: '' } }
    case 'event':
      return { type: 'event', data: { title: '', startDate: '', endDate: '', location: '', description: '' } }
    case 'social':
      return { type: 'social', data: { platform: 'instagram', usernameOrUrl: '' } }
    case 'pdf':
      return { type: 'pdf', data: { pdfUrl: '' } }
    case 'app':
      return { type: 'app', data: { appUrl: '' } }
  }
}

export function isStaticPayloadReady(payload: StaticQrPayload): boolean {
  switch (payload.type) {
    case 'url':
      return Boolean(payload.data.url.trim())
    case 'text':
      return Boolean(payload.data.text.trim())
    case 'email':
      return Boolean(payload.data.email.trim())
    case 'phone':
      return Boolean(payload.data.phone.trim())
    case 'sms':
      return Boolean(payload.data.phone.trim())
    case 'wifi':
      return Boolean(payload.data.ssid.trim())
    case 'vcard':
      return Boolean(payload.data.firstName.trim())
    case 'whatsapp':
      return Boolean(payload.data.phone.trim())
    case 'location':
      return Boolean(
        payload.data.address.trim() ||
          (payload.data.latitude.trim() && payload.data.longitude.trim()),
      )
    case 'event':
      return Boolean(payload.data.title.trim())
    case 'social':
      return Boolean(payload.data.usernameOrUrl.trim())
    case 'pdf':
      return Boolean(payload.data.pdfUrl.trim())
    case 'app':
      return Boolean(payload.data.appUrl.trim())
  }
}

export function buildStaticQrPayload(input: StaticQrPayload): string {
  switch (input.type) {
    case 'url':
      return normalizeUrl(input.data.url)
    case 'text':
      return input.data.text
    case 'email': {
      const { email, subject, body } = input.data
      const params = new URLSearchParams()
      if (subject.trim()) params.set('subject', subject.trim())
      if (body.trim()) params.set('body', body.trim())
      const q = params.toString()
      return `mailto:${email.trim()}${q ? `?${q}` : ''}`
    }
    case 'phone':
      return `tel:${input.data.phone.trim()}`
    case 'sms': {
      const msg = input.data.message?.trim()
      return msg
        ? `sms:${input.data.phone.trim()}?body=${encodeURIComponent(msg)}`
        : `sms:${input.data.phone.trim()}`
    }
    case 'wifi': {
      const { ssid, password, encryption, hidden } = input.data
      const parts = [`T:${encryption}`, `S:${ssid}`, password ? `P:${password}` : '', hidden ? 'H:true' : '']
      return `WIFI:${parts.filter(Boolean).join(';')};;`
    }
    case 'vcard': {
      const d = input.data
      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${d.lastName};${d.firstName};;;`,
        `FN:${[d.firstName, d.lastName].filter(Boolean).join(' ')}`,
      ]
      if (d.organization.trim()) lines.push(`ORG:${d.organization.trim()}`)
      if (d.title.trim()) lines.push(`TITLE:${d.title.trim()}`)
      if (d.phone.trim()) lines.push(`TEL;TYPE=CELL:${d.phone.trim()}`)
      if (d.email.trim()) lines.push(`EMAIL:${d.email.trim()}`)
      if (d.website.trim()) lines.push(`URL:${normalizeUrl(d.website)}`)
      lines.push('END:VCARD')
      return lines.join('\n')
    }
    case 'whatsapp': {
      const phone = input.data.phone.trim().replace(/[^\d+]/g, '')
      const text = input.data.message.trim()
      return text ? `https://wa.me/${phone}?text=${encodeURIComponent(text)}` : `https://wa.me/${phone}`
    }
    case 'location': {
      if (input.data.address.trim()) {
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(input.data.address.trim())}`
      }
      const lat = input.data.latitude.trim()
      const lng = input.data.longitude.trim()
      return lat && lng ? `https://www.google.com/maps/search/?api=1&query=${lat},${lng}` : ''
    }
    case 'event': {
      const d = input.data
      const formatDate = (str: string) => str.replace(/[-:]/g, '')
      const lines = ['BEGIN:VEVENT', `SUMMARY:${d.title.trim()}`]
      if (d.startDate.trim()) lines.push(`DTSTART:${formatDate(d.startDate.trim())}`)
      if (d.endDate.trim()) lines.push(`DTEND:${formatDate(d.endDate.trim())}`)
      if (d.location.trim()) lines.push(`LOCATION:${d.location.trim()}`)
      if (d.description.trim()) lines.push(`DESCRIPTION:${d.description.trim()}`)
      lines.push('END:VEVENT')
      return lines.join('\n')
    }
    case 'social': {
      const val = input.data.usernameOrUrl.trim()
      if (/^https?:\/\//i.test(val)) return val
      const user = val.replace(/^@/, '')
      switch (input.data.platform) {
        case 'instagram':
          return `https://instagram.com/${user}`
        case 'tiktok':
          return `https://tiktok.com/@${user}`
        case 'linkedin':
          return `https://linkedin.com/in/${user}`
        case 'youtube':
          return `https://youtube.com/@${user}`
        case 'facebook':
          return `https://facebook.com/${user}`
        case 'twitter':
          return `https://x.com/${user}`
      }
      break
    }
    case 'pdf':
      return normalizeUrl(input.data.pdfUrl)
    case 'app':
      return normalizeUrl(input.data.appUrl)
  }
  return ''
}

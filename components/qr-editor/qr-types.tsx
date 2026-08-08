import { useState, type ReactNode } from 'react'
import {
  Box,
  Building2,
  Calendar,
  CalendarDays,
  Check,
  Compass,
  Copy,
  ExternalLink,
  FileText,
  LayoutGrid,
  Link2,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Palette,
  Phone,
  Share2,
  ShoppingBag,
  Smartphone,
  Star,
  Type,
  User,
  Utensils,
  Wifi,
  Wrench,
} from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  type QrContentType,
  type QrPayloadInput,
  type WifiEncryption,
} from '@/lib/qr/payload'

export const CONTENT_ICONS: Record<QrContentType, typeof Link2> = {
  url: Link2,
  text: Type,
  email: Mail,
  phone: Phone,
  sms: MessageSquare,
  wifi: Wifi,
  vcard: User,
  whatsapp: MessageCircle,
  location: MapPin,
  event: CalendarDays,
  social: Share2,
  pdf: FileText,
  app: Smartphone,
  art: Palette,
  immo: Building2,
  chrd: Utensils,
  product: Box,
  feedback: Star,
  tourism: Compass,
  corporate_event: Calendar,
  ugc_retail: ShoppingBag,
  field_service: Wrench,
  generic_smart: LayoutGrid,
}

export function defaultPayload(type: QrContentType): QrPayloadInput {
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
      return { type: 'event', data: { title: '', location: '', startDate: '', endDate: '', description: '' } }
    case 'social':
      return { type: 'social', data: { platform: 'instagram', usernameOrUrl: '' } }
    case 'pdf':
      return { type: 'pdf', data: { pdfUrl: '', title: '' } }
    case 'app':
      return { type: 'app', data: { appUrl: '', appName: '' } }
    case 'art':
      return {
        type: 'art',
        data: { artistName: '', title: '', medium: 'Huile sur toile', price: '', gallery: '', targetUrl: '' },
      }
    case 'immo':
      return {
        type: 'immo',
        data: { title: '', city: '', price: '', wifiName: '', contactPhone: '', targetUrl: '' },
      }
    case 'chrd':
      return {
        type: 'chrd',
        data: { establishmentName: '', menuUrl: '', wifiName: '', googleReviewUrl: '', targetUrl: '' },
      }
    case 'product':
      return {
        type: 'product',
        data: { productName: '', brandName: '', manualUrl: '', supportEmail: '', targetUrl: '' },
      }
    case 'feedback':
      return {
        type: 'feedback',
        data: { companyName: '', googleReviewUrl: '', directEmail: '', targetUrl: '' },
      }
    case 'tourism':
      return {
        type: 'tourism',
        data: { placeName: '', location: '', audioGuideUrl: '', websiteUrl: '', targetUrl: '' },
      }
    case 'corporate_event':
      return {
        type: 'corporate_event',
        data: { eventName: '', companyName: '', date: '', scheduleUrl: '', targetUrl: '' },
      }
    case 'ugc_retail':
      return {
        type: 'ugc_retail',
        data: { brandName: '', campaignTitle: '', discountCode: '', targetUrl: '' },
      }
    case 'field_service':
      return {
        type: 'field_service',
        data: { assetName: '', assetId: '', status: 'opérationnel', contactPhone: '', targetUrl: '' },
      }
    case 'generic_smart':
      return {
        type: 'generic_smart',
        data: { title: '', description: '', ctaUrl: '', targetUrl: '' },
      }
  }
}

function Field({
  label,
  children,
  htmlFor,
  hint,
}: {
  label: string
  children: ReactNode
  htmlFor?: string
  hint?: string
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label htmlFor={htmlFor} className="text-slate-800 font-medium text-sm">
          {label}
        </Label>
        {hint ? <span className="text-xs text-slate-400">{hint}</span> : null}
      </div>
      {children}
    </div>
  )
}

function CopyUrlInput({
  value,
  onChange,
}: {
  value: string
  onChange: (val: string) => void
}) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    if (!value) return
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const handleOpen = () => {
    if (!value) return
    const target = value.startsWith('http://') || value.startsWith('https://') ? value : `https://${value}`
    window.open(target, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="relative flex items-center">
      <Input
        id="qr-url"
        type="url"
        placeholder="https://votresite.com"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pr-16"
      />
      {value ? (
        <div className="absolute right-2 flex items-center gap-1">
          <button
            type="button"
            onClick={handleOpen}
            className="rounded-md p-1 text-mq-muted hover:bg-mq-mist hover:text-mq-ink transition-colors"
            title="Ouvrir dans un nouvel onglet"
          >
            <ExternalLink className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-md p-1 text-mq-muted hover:bg-mq-mist hover:text-mq-ink transition-colors"
            title="Copier l'URL"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      ) : null}
    </div>
  )
}

export function ContentFields({
  payload,
  onChange,
}: {
  payload: QrPayloadInput
  onChange: (next: QrPayloadInput) => void
}) {
  switch (payload.type) {
    case 'url':
      return (
        <Field label="Lien web (URL)" htmlFor="qr-url" hint="Ex: https://votresite.com">
          <CopyUrlInput
            value={payload.data.url}
            onChange={(url) => onChange({ type: 'url', data: { url } })}
          />
        </Field>
      )
    case 'text':
      return (
        <Field label="Texte libre encodé" htmlFor="qr-text">
          <Textarea
            id="qr-text"
            rows={4}
            placeholder="Votre message ou note..."
            value={payload.data.text}
            onChange={(e) => onChange({ type: 'text', data: { text: e.target.value } })}
          />
        </Field>
      )
    case 'email':
      return (
        <div className="grid gap-4">
          <Field label="Adresse email destinataire" htmlFor="qr-email">
            <Input
              id="qr-email"
              type="email"
              placeholder="contact@exemple.com"
              value={payload.data.email}
              onChange={(e) =>
                onChange({ type: 'email', data: { ...payload.data, email: e.target.value } })
              }
            />
          </Field>
          <Field label="Sujet du message (optionnel)" htmlFor="qr-email-subject">
            <Input
              id="qr-email-subject"
              placeholder="Demande d'information"
              value={payload.data.subject ?? ''}
              onChange={(e) =>
                onChange({ type: 'email', data: { ...payload.data, subject: e.target.value } })
              }
            />
          </Field>
          <Field label="Corps du message (optionnel)" htmlFor="qr-email-body">
            <Textarea
              id="qr-email-body"
              rows={3}
              placeholder="Bonjour..."
              value={payload.data.body ?? ''}
              onChange={(e) =>
                onChange({ type: 'email', data: { ...payload.data, body: e.target.value } })
              }
            />
          </Field>
        </div>
      )
    case 'phone':
      return (
        <Field label="Numéro de téléphone" htmlFor="qr-phone" hint="International ou national">
          <Input
            id="qr-phone"
            type="tel"
            placeholder="+33 6 12 34 56 78"
            value={payload.data.phone}
            onChange={(e) => onChange({ type: 'phone', data: { phone: e.target.value } })}
          />
        </Field>
      )
    case 'sms':
      return (
        <div className="grid gap-4">
          <Field label="Numéro destinataire" htmlFor="qr-sms-phone">
            <Input
              id="qr-sms-phone"
              type="tel"
              placeholder="+33 6 12 34 56 78"
              value={payload.data.phone}
              onChange={(e) =>
                onChange({ type: 'sms', data: { ...payload.data, phone: e.target.value } })
              }
            />
          </Field>
          <Field label="Message SMS prérempli" htmlFor="qr-sms-message">
            <Textarea
              id="qr-sms-message"
              rows={3}
              placeholder="Bonjour, je souhaite des infos..."
              value={payload.data.message ?? ''}
              onChange={(e) =>
                onChange({ type: 'sms', data: { ...payload.data, message: e.target.value } })
              }
            />
          </Field>
        </div>
      )
    case 'wifi':
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nom du réseau (SSID)" htmlFor="qr-wifi-ssid">
            <Input
              id="qr-wifi-ssid"
              placeholder="Mon-Reseau-WiFi"
              value={payload.data.ssid}
              onChange={(e) =>
                onChange({ type: 'wifi', data: { ...payload.data, ssid: e.target.value } })
              }
            />
          </Field>
          <Field label="Sécurité">
            <Select
              value={payload.data.encryption}
              onValueChange={(v) =>
                onChange({
                  type: 'wifi',
                  data: { ...payload.data, encryption: v as WifiEncryption },
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="WPA">WPA / WPA2 / WPA3</SelectItem>
                <SelectItem value="WEP">WEP</SelectItem>
                <SelectItem value="nopass">Réseau ouvert (Sans mot de passe)</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          {payload.data.encryption !== 'nopass' ? (
            <Field label="Mot de passe Wi-Fi" htmlFor="qr-wifi-password">
              <Input
                id="qr-wifi-password"
                type="text"
                autoComplete="off"
                placeholder="MotDePasseCle123"
                value={payload.data.password ?? ''}
                onChange={(e) =>
                  onChange({ type: 'wifi', data: { ...payload.data, password: e.target.value } })
                }
              />
            </Field>
          ) : null}
          <div className="flex items-end pb-2 sm:col-span-2">
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={Boolean(payload.data.hidden)}
                onChange={(e) =>
                  onChange({ type: 'wifi', data: { ...payload.data, hidden: e.target.checked } })
                }
                className="h-4 w-4 rounded border-slate-300 accent-slate-900"
              />
              Réseau Wi-Fi masqué
            </label>
          </div>
        </div>
      )
    case 'vcard':
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Prénom *" htmlFor="qr-vcard-first">
            <Input
              id="qr-vcard-first"
              placeholder="Jean"
              value={payload.data.firstName}
              onChange={(e) =>
                onChange({ type: 'vcard', data: { ...payload.data, firstName: e.target.value } })
              }
            />
          </Field>
          <Field label="Nom" htmlFor="qr-vcard-last">
            <Input
              id="qr-vcard-last"
              placeholder="Dupont"
              value={payload.data.lastName ?? ''}
              onChange={(e) =>
                onChange({ type: 'vcard', data: { ...payload.data, lastName: e.target.value } })
              }
            />
          </Field>
          <Field label="Société / Organisation" htmlFor="qr-vcard-org">
            <Input
              id="qr-vcard-org"
              placeholder="Acme Inc."
              value={payload.data.organization ?? ''}
              onChange={(e) =>
                onChange({
                  type: 'vcard',
                  data: { ...payload.data, organization: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Fonction / Poste" htmlFor="qr-vcard-title">
            <Input
              id="qr-vcard-title"
              placeholder="Directeur Général"
              value={payload.data.title ?? ''}
              onChange={(e) =>
                onChange({ type: 'vcard', data: { ...payload.data, title: e.target.value } })
              }
            />
          </Field>
          <Field label="Téléphone" htmlFor="qr-vcard-phone">
            <Input
              id="qr-vcard-phone"
              type="tel"
              placeholder="+33 6 12 34 56 78"
              value={payload.data.phone ?? ''}
              onChange={(e) =>
                onChange({ type: 'vcard', data: { ...payload.data, phone: e.target.value } })
              }
            />
          </Field>
          <Field label="Adresse Email" htmlFor="qr-vcard-email">
            <Input
              id="qr-vcard-email"
              type="email"
              placeholder="jean.dupont@acme.com"
              value={payload.data.email ?? ''}
              onChange={(e) =>
                onChange({ type: 'vcard', data: { ...payload.data, email: e.target.value } })
              }
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Site Web" htmlFor="qr-vcard-web">
              <Input
                id="qr-vcard-web"
                type="url"
                placeholder="https://acme.com"
                value={payload.data.website ?? ''}
                onChange={(e) =>
                  onChange({ type: 'vcard', data: { ...payload.data, website: e.target.value } })
                }
              />
            </Field>
          </div>
        </div>
      )
    case 'whatsapp':
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Numéro WhatsApp *" htmlFor="qr-wa-phone" hint="Format international ex: +33612345678">
            <Input
              id="qr-wa-phone"
              type="tel"
              placeholder="+33 6 12 34 56 78"
              value={payload.data.phone}
              onChange={(e) =>
                onChange({ type: 'whatsapp', data: { ...payload.data, phone: e.target.value } })
              }
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Message WhatsApp prédéfini (Optionnel)" htmlFor="qr-wa-msg">
              <Textarea
                id="qr-wa-msg"
                rows={3}
                placeholder="Bonjour, je vous contacte suite à votre QR Code..."
                value={payload.data.message ?? ''}
                onChange={(e) =>
                  onChange({ type: 'whatsapp', data: { ...payload.data, message: e.target.value } })
                }
              />
            </Field>
          </div>
        </div>
      )
    case 'location':
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Adresse ou nom du lieu (Google Maps)" htmlFor="qr-loc-addr" hint="Ex: 10 Place de la Concorde, 75008 Paris">
              <Input
                id="qr-loc-addr"
                placeholder="Ex: 10 Place de la Concorde, Paris"
                value={payload.data.address ?? ''}
                onChange={(e) =>
                  onChange({ type: 'location', data: { ...payload.data, address: e.target.value } })
                }
              />
            </Field>
          </div>
          <Field label="Latitude (GPS Optionnel)" htmlFor="qr-loc-lat">
            <Input
              id="qr-loc-lat"
              placeholder="48.8566"
              value={payload.data.latitude ?? ''}
              onChange={(e) =>
                onChange({ type: 'location', data: { ...payload.data, latitude: e.target.value } })
              }
            />
          </Field>
          <Field label="Longitude (GPS Optionnel)" htmlFor="qr-loc-lng">
            <Input
              id="qr-loc-lng"
              placeholder="2.3522"
              value={payload.data.longitude ?? ''}
              onChange={(e) =>
                onChange({ type: 'location', data: { ...payload.data, longitude: e.target.value } })
              }
            />
          </Field>
        </div>
      )
    case 'event':
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Titre de l'événement *" htmlFor="qr-ev-title">
              <Input
                id="qr-ev-title"
                placeholder="Ex: Soirée de Lancement QRious"
                value={payload.data.title}
                onChange={(e) =>
                  onChange({ type: 'event', data: { ...payload.data, title: e.target.value } })
                }
              />
            </Field>
          </div>
          <Field label="Lieu" htmlFor="qr-ev-loc">
            <Input
              id="qr-ev-loc"
              placeholder="Ex: Palais des Congrès, Paris"
              value={payload.data.location ?? ''}
              onChange={(e) =>
                onChange({ type: 'event', data: { ...payload.data, location: e.target.value } })
              }
            />
          </Field>
          <Field label="Date & Heure de début" htmlFor="qr-ev-start">
            <Input
              id="qr-ev-start"
              type="datetime-local"
              value={payload.data.startDate ?? ''}
              onChange={(e) =>
                onChange({ type: 'event', data: { ...payload.data, startDate: e.target.value } })
              }
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Description (Optionnelle)" htmlFor="qr-ev-desc">
              <Textarea
                id="qr-ev-desc"
                rows={3}
                placeholder="Détails du programme ou informations aux invités..."
                value={payload.data.description ?? ''}
                onChange={(e) =>
                  onChange({ type: 'event', data: { ...payload.data, description: e.target.value } })
                }
              />
            </Field>
          </div>
        </div>
      )
    case 'social':
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Réseau social">
            <Select
              value={payload.data.platform}
              onValueChange={(v) =>
                onChange({
                  type: 'social',
                  data: { ...payload.data, platform: v as 'instagram' | 'tiktok' | 'linkedin' | 'youtube' | 'facebook' | 'twitter' },
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="twitter">X / Twitter</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Nom d'utilisateur ou Lien URL *" htmlFor="qr-soc-user" hint="Ex: @moncompte ou URL">
            <Input
              id="qr-soc-user"
              placeholder="@moncompte ou https://..."
              value={payload.data.usernameOrUrl}
              onChange={(e) =>
                onChange({ type: 'social', data: { ...payload.data, usernameOrUrl: e.target.value } })
              }
            />
          </Field>
        </div>
      )
    case 'pdf':
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Lien URL du fichier PDF *" htmlFor="qr-pdf-url" hint="Ex: https://votresite.com/brochure.pdf">
              <Input
                id="qr-pdf-url"
                type="url"
                placeholder="https://votresite.com/menu.pdf"
                value={payload.data.pdfUrl}
                onChange={(e) =>
                  onChange({ type: 'pdf', data: { ...payload.data, pdfUrl: e.target.value } })
                }
              />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Nom du document (Optionnel)" htmlFor="qr-pdf-title">
              <Input
                id="qr-pdf-title"
                placeholder="Ex: Carte des Vins 2026"
                value={payload.data.title ?? ''}
                onChange={(e) =>
                  onChange({ type: 'pdf', data: { ...payload.data, title: e.target.value } })
                }
              />
            </Field>
          </div>
        </div>
      )
    case 'app':
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Lien App Store / Google Play *" htmlFor="qr-app-url">
              <Input
                id="qr-app-url"
                type="url"
                placeholder="https://apps.apple.com/app/id123456789"
                value={payload.data.appUrl}
                onChange={(e) =>
                  onChange({ type: 'app', data: { ...payload.data, appUrl: e.target.value } })
                }
              />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Nom de l'application (Optionnel)" htmlFor="qr-app-name">
              <Input
                id="qr-app-name"
                placeholder="Ex: QRious Mobile"
                value={payload.data.appName ?? ''}
                onChange={(e) =>
                  onChange({ type: 'app', data: { ...payload.data, appName: e.target.value } })
                }
              />
            </Field>
          </div>
        </div>
      )
    case 'art':
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nom de l'artiste *" htmlFor="qr-art-artist">
            <Input
              id="qr-art-artist"
              placeholder="Ex: Camille Claudel"
              value={payload.data.artistName}
              onChange={(e) =>
                onChange({ type: 'art', data: { ...payload.data, artistName: e.target.value } })
              }
            />
          </Field>
          <Field label="Titre de l'œuvre *" htmlFor="qr-art-title">
            <Input
              id="qr-art-title"
              placeholder="Ex: La Vague (1897)"
              value={payload.data.title}
              onChange={(e) =>
                onChange({ type: 'art', data: { ...payload.data, title: e.target.value } })
              }
            />
          </Field>
          <Field label="Technique / Médium" htmlFor="qr-art-medium">
            <Input
              id="qr-art-medium"
              placeholder="Ex: Bronze et Onyx"
              value={payload.data.medium ?? ''}
              onChange={(e) =>
                onChange({ type: 'art', data: { ...payload.data, medium: e.target.value } })
              }
            />
          </Field>
          <Field label="Galerie / Galerie d'exposition" htmlFor="qr-art-gallery">
            <Input
              id="qr-art-gallery"
              placeholder="Ex: Galerie Rodin, Paris"
              value={payload.data.gallery ?? ''}
              onChange={(e) =>
                onChange({ type: 'art', data: { ...payload.data, gallery: e.target.value } })
              }
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Lien personnalisé / URL de la fiche d'œuvre (Optionnel)" htmlFor="qr-art-target">
              <Input
                id="qr-art-target"
                type="url"
                placeholder="https://votre-galerie.com/oeuvres/la-vague"
                value={payload.data.targetUrl ?? ''}
                onChange={(e) =>
                  onChange({ type: 'art', data: { ...payload.data, targetUrl: e.target.value } })
                }
              />
            </Field>
          </div>
        </div>
      )
    case 'immo':
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Titre du bien / Gîte *" htmlFor="qr-immo-title">
            <Input
              id="qr-immo-title"
              placeholder="Ex: Villa Bel-Air avec piscine"
              value={payload.data.title}
              onChange={(e) =>
                onChange({ type: 'immo', data: { ...payload.data, title: e.target.value } })
              }
            />
          </Field>
          <Field label="Ville / Localisation" htmlFor="qr-immo-city">
            <Input
              id="qr-immo-city"
              placeholder="Ex: Aix-en-Provence"
              value={payload.data.city ?? ''}
              onChange={(e) =>
                onChange({ type: 'immo', data: { ...payload.data, city: e.target.value } })
              }
            />
          </Field>
          <Field label="Code ou nom Wi-Fi voyageur" htmlFor="qr-immo-wifi">
            <Input
              id="qr-immo-wifi"
              placeholder="Ex: VillaBelAir_Guest"
              value={payload.data.wifiName ?? ''}
              onChange={(e) =>
                onChange({ type: 'immo', data: { ...payload.data, wifiName: e.target.value } })
              }
            />
          </Field>
          <Field label="Téléphone Hôte / Urgence" htmlFor="qr-immo-phone">
            <Input
              id="qr-immo-phone"
              type="tel"
              placeholder="+33 6 00 00 00 00"
              value={payload.data.contactPhone ?? ''}
              onChange={(e) =>
                onChange({ type: 'immo', data: { ...payload.data, contactPhone: e.target.value } })
              }
            />
          </Field>
        </div>
      )
    case 'chrd':
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nom de l'établissement *" htmlFor="qr-chrd-name">
            <Input
              id="qr-chrd-name"
              placeholder="Ex: Le Bistro Gourmand"
              value={payload.data.establishmentName}
              onChange={(e) =>
                onChange({
                  type: 'chrd',
                  data: { ...payload.data, establishmentName: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Lien du Menu PDF / Carte digitalisée" htmlFor="qr-chrd-menu">
            <Input
              id="qr-chrd-menu"
              type="url"
              placeholder="https://lebistrogourmand.fr/menu.pdf"
              value={payload.data.menuUrl ?? ''}
              onChange={(e) =>
                onChange({ type: 'chrd', data: { ...payload.data, menuUrl: e.target.value } })
              }
            />
          </Field>
          <Field label="Nom du Wi-Fi clients" htmlFor="qr-chrd-wifi">
            <Input
              id="qr-chrd-wifi"
              placeholder="Ex: Bistro_Guest_Free"
              value={payload.data.wifiName ?? ''}
              onChange={(e) =>
                onChange({ type: 'chrd', data: { ...payload.data, wifiName: e.target.value } })
              }
            />
          </Field>
          <Field label="Lien Google Reviews (Avis)" htmlFor="qr-chrd-reviews">
            <Input
              id="qr-chrd-reviews"
              type="url"
              placeholder="https://g.page/r/example/review"
              value={payload.data.googleReviewUrl ?? ''}
              onChange={(e) =>
                onChange({
                  type: 'chrd',
                  data: { ...payload.data, googleReviewUrl: e.target.value },
                })
              }
            />
          </Field>
        </div>
      )
    case 'product':
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nom du produit *" htmlFor="qr-prod-name">
            <Input
              id="qr-prod-name"
              placeholder="Ex: Machine à café Barista Express"
              value={payload.data.productName}
              onChange={(e) =>
                onChange({
                  type: 'product',
                  data: { ...payload.data, productName: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Marque" htmlFor="qr-prod-brand">
            <Input
              id="qr-prod-brand"
              placeholder="Ex: Breville"
              value={payload.data.brandName ?? ''}
              onChange={(e) =>
                onChange({ type: 'product', data: { ...payload.data, brandName: e.target.value } })
              }
            />
          </Field>
          <Field label="Lien Manuel PDF / Guide vidéo" htmlFor="qr-prod-manual">
            <Input
              id="qr-prod-manual"
              type="url"
              placeholder="https://brand.com/manuals/barista.pdf"
              value={payload.data.manualUrl ?? ''}
              onChange={(e) =>
                onChange({ type: 'product', data: { ...payload.data, manualUrl: e.target.value } })
              }
            />
          </Field>
          <Field label="Email du support client" htmlFor="qr-prod-email">
            <Input
              id="qr-prod-email"
              type="email"
              placeholder="support@brand.com"
              value={payload.data.supportEmail ?? ''}
              onChange={(e) =>
                onChange({
                  type: 'product',
                  data: { ...payload.data, supportEmail: e.target.value },
                })
              }
            />
          </Field>
        </div>
      )
    case 'feedback':
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nom de la société / Commerce *" htmlFor="qr-fb-name">
            <Input
              id="qr-fb-name"
              placeholder="Ex: Garage Automobile Central"
              value={payload.data.companyName}
              onChange={(e) =>
                onChange({
                  type: 'feedback',
                  data: { ...payload.data, companyName: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Lien Fiche Google My Business / TripAdvisor" htmlFor="qr-fb-google">
            <Input
              id="qr-fb-google"
              type="url"
              placeholder="https://g.page/r/your-business/review"
              value={payload.data.googleReviewUrl ?? ''}
              onChange={(e) =>
                onChange({
                  type: 'feedback',
                  data: { ...payload.data, googleReviewUrl: e.target.value },
                })
              }
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Email de reception des retours privés" htmlFor="qr-fb-email">
              <Input
                id="qr-fb-email"
                type="email"
                placeholder="direction@garagecentral.com"
                value={payload.data.directEmail ?? ''}
                onChange={(e) =>
                  onChange({
                    type: 'feedback',
                    data: { ...payload.data, directEmail: e.target.value },
                  })
                }
              />
            </Field>
          </div>
        </div>
      )
    case 'tourism':
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nom du lieu / Monument *" htmlFor="qr-tour-name">
            <Input
              id="qr-tour-name"
              placeholder="Ex: Château de Fontainebleau"
              value={payload.data.placeName}
              onChange={(e) =>
                onChange({
                  type: 'tourism',
                  data: { ...payload.data, placeName: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Localisation / Région" htmlFor="qr-tour-loc">
            <Input
              id="qr-tour-loc"
              placeholder="Ex: Seine-et-Marne, France"
              value={payload.data.location ?? ''}
              onChange={(e) =>
                onChange({ type: 'tourism', data: { ...payload.data, location: e.target.value } })
              }
            />
          </Field>
          <Field label="Lien Audio-guide / MP3" htmlFor="qr-tour-audio">
            <Input
              id="qr-tour-audio"
              type="url"
              placeholder="https://chateau.fr/audio/track-1.mp3"
              value={payload.data.audioGuideUrl ?? ''}
              onChange={(e) =>
                onChange({
                  type: 'tourism',
                  data: { ...payload.data, audioGuideUrl: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Site web officiel du lieu" htmlFor="qr-tour-web">
            <Input
              id="qr-tour-web"
              type="url"
              placeholder="https://chateau-fontainebleau.fr"
              value={payload.data.websiteUrl ?? ''}
              onChange={(e) =>
                onChange({ type: 'tourism', data: { ...payload.data, websiteUrl: e.target.value } })
              }
            />
          </Field>
        </div>
      )
    case 'corporate_event':
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nom de l'événement *" htmlFor="qr-ev-name">
            <Input
              id="qr-ev-name"
              placeholder="Ex: Sommet Tech & Innovation 2026"
              value={payload.data.eventName}
              onChange={(e) =>
                onChange({
                  type: 'corporate_event',
                  data: { ...payload.data, eventName: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Entreprise / Organisateur" htmlFor="qr-ev-company">
            <Input
              id="qr-ev-company"
              placeholder="Ex: Qrious Digital"
              value={payload.data.companyName ?? ''}
              onChange={(e) =>
                onChange({
                  type: 'corporate_event',
                  data: { ...payload.data, companyName: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Date de l'événement" htmlFor="qr-ev-date">
            <Input
              id="qr-ev-date"
              placeholder="Ex: 15-16 Octobre 2026"
              value={payload.data.date ?? ''}
              onChange={(e) =>
                onChange({
                  type: 'corporate_event',
                  data: { ...payload.data, date: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Lien du Programme / Presentation Slides" htmlFor="qr-ev-schedule">
            <Input
              id="qr-ev-schedule"
              type="url"
              placeholder="https://event.com/planning.pdf"
              value={payload.data.scheduleUrl ?? ''}
              onChange={(e) =>
                onChange({
                  type: 'corporate_event',
                  data: { ...payload.data, scheduleUrl: e.target.value },
                })
              }
            />
          </Field>
        </div>
      )
    case 'ugc_retail':
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nom de la Marque *" htmlFor="qr-ret-brand">
            <Input
              id="qr-ret-brand"
              placeholder="Ex: Maison Solaire Paris"
              value={payload.data.brandName}
              onChange={(e) =>
                onChange({
                  type: 'ugc_retail',
                  data: { ...payload.data, brandName: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Titre du jeu / Campagne promo" htmlFor="qr-ret-campaign">
            <Input
              id="qr-ret-campaign"
              placeholder="Ex: Concours Photo Été 2026"
              value={payload.data.campaignTitle ?? ''}
              onChange={(e) =>
                onChange({
                  type: 'ugc_retail',
                  data: { ...payload.data, campaignTitle: e.target.value },
                })
              }
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Code promo de récompense" htmlFor="qr-ret-code">
              <Input
                id="qr-ret-code"
                placeholder="Ex: SUMMER20 (-20%)"
                value={payload.data.discountCode ?? ''}
                onChange={(e) =>
                  onChange({
                    type: 'ugc_retail',
                    data: { ...payload.data, discountCode: e.target.value },
                  })
                }
              />
            </Field>
          </div>
        </div>
      )
    case 'field_service':
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nom de l'équipement / Machine *" htmlFor="qr-fs-name">
            <Input
              id="qr-fs-name"
              placeholder="Ex: Pompe à chaleur PAC-400"
              value={payload.data.assetName}
              onChange={(e) =>
                onChange({
                  type: 'field_service',
                  data: { ...payload.data, assetName: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Numéro de série / Asset ID" htmlFor="qr-fs-id">
            <Input
              id="qr-fs-id"
              placeholder="Ex: SN-2026-99482"
              value={payload.data.assetId ?? ''}
              onChange={(e) =>
                onChange({
                  type: 'field_service',
                  data: { ...payload.data, assetId: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Numéro d'urgence / Astreinte" htmlFor="qr-fs-phone">
            <Input
              id="qr-fs-phone"
              type="tel"
              placeholder="+33 800 123 456"
              value={payload.data.contactPhone ?? ''}
              onChange={(e) =>
                onChange({
                  type: 'field_service',
                  data: { ...payload.data, contactPhone: e.target.value },
                })
              }
            />
          </Field>
        </div>
      )
    case 'generic_smart':
      return (
        <div className="grid gap-4">
          <Field label="Titre de la Landing Page *" htmlFor="qr-smart-title">
            <Input
              id="qr-smart-title"
              placeholder="Ex: Bienvenue sur ma page personnalisée"
              value={payload.data.title}
              onChange={(e) =>
                onChange({
                  type: 'generic_smart',
                  data: { ...payload.data, title: e.target.value },
                })
            }
            />
          </Field>
          <Field label="Description / Accroche" htmlFor="qr-smart-desc">
            <Textarea
              id="qr-smart-desc"
              rows={3}
              placeholder="Présentez votre entreprise ou projet..."
              value={payload.data.description ?? ''}
              onChange={(e) =>
                onChange({
                  type: 'generic_smart',
                  data: { ...payload.data, description: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Lien du bouton principal (CTA)" htmlFor="qr-smart-cta">
            <Input
              id="qr-smart-cta"
              type="url"
              placeholder="https://votre-site.com/action"
              value={payload.data.ctaUrl ?? ''}
              onChange={(e) =>
                onChange({
                  type: 'generic_smart',
                  data: { ...payload.data, ctaUrl: e.target.value },
                })
              }
            />
          </Field>
        </div>
      )
  }
}

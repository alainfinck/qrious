'use client'

import { useCallback, useRef, useState, type ReactNode } from 'react'
import Link from 'next/link'
import {
  Box,
  Building2,
  Calendar,
  Check,
  Compass,
  Copy,
  Download,
  ExternalLink,
  LayoutGrid,
  Link2,
  Mail,
  MessageSquare,
  Palette,
  Phone,
  QrCode,
  ShoppingBag,
  Sparkles,
  Star,
  Type,
  User,
  Utensils,
  Wifi,
  Wrench,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
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
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  buildQrPayload,
  isPayloadReady,
  QR_CONTENT_TYPES,
  type QrContentType,
  type QrPayloadInput,
  type WifiEncryption,
} from '@/lib/qr/payload'
import { DEFAULT_QR_STYLE, type QrStyle } from '@/lib/qr/style'
import { cn } from '@/lib/utils'

import { QrStyleForm } from './QrStyleForm'
import { QrStyledPreview, type QrStyledPreviewHandle } from './QrStyledPreview'

const CONTENT_ICONS: Record<QrContentType, typeof Link2> = {
  url: Link2,
  text: Type,
  email: Mail,
  phone: Phone,
  sms: MessageSquare,
  wifi: Wifi,
  vcard: User,
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

function defaultPayload(type: QrContentType): QrPayloadInput {
  switch (type) {
    case 'url':
      return { type: 'url', data: { url: 'https://' } }
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

export function PublicQrEditor() {
  const [contentType, setContentType] = useState<QrContentType>('url')
  const [payload, setPayload] = useState<QrPayloadInput>(defaultPayload('url'))
  const [style, setStyle] = useState<QrStyle>(DEFAULT_QR_STYLE)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const previewRef = useRef<QrStyledPreviewHandle>(null)

  const ready = isPayloadReady(payload)
  const encoded = ready ? buildQrPayload(payload) : ''
  const currentConfig = QR_CONTENT_TYPES.find((c) => c.value === contentType)
  const isSmart = currentConfig?.category === 'smart'

  const updatePayload = useCallback((next: QrPayloadInput) => {
    setPayload(next)
  }, [])

  const handleTypeChange = (type: QrContentType) => {
    setContentType(type)
    setPayload(defaultPayload(type))
  }

  const downloadPng = async () => {
    if (!ready) return
    try {
      await previewRef.current?.download('png', `qrious-qr-${contentType}`)
    } catch {
      setError('Export PNG impossible.')
    }
  }

  const downloadSvg = async () => {
    if (!ready) return
    try {
      await previewRef.current?.download('svg', `qrious-qr-${contentType}`)
    } catch {
      setError('Export SVG impossible.')
    }
  }

  const copyPayload = async () => {
    if (!encoded) return
    await navigator.clipboard.writeText(encoded)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  const staticTypes = QR_CONTENT_TYPES.filter((t) => t.category === 'static')
  const smartTypes = QR_CONTENT_TYPES.filter((t) => t.category === 'smart')

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start">
      <div className="space-y-6">
        {/* En-tête / Choix du type de QR Code */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">1. Type de QR Code</h2>
              <p className="text-sm text-slate-500">
                Sélectionnez le format statique direct ou une Landing Page Métier dynamique.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-mq-ink/5 px-2.5 py-1 text-xs font-semibold text-mq-ink">
              <QrCode className="h-4 w-4" /> Universel
            </span>
          </div>

          <Tabs defaultValue="static" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-100/80 p-1">
              <TabsTrigger value="static" className="text-xs font-medium sm:text-sm">
                Codes Statiques Directs
              </TabsTrigger>
              <TabsTrigger value="smart" className="text-xs font-semibold sm:text-sm text-mq-ink">
                ✨ Smart QR Pages (Métiers)
              </TabsTrigger>
            </TabsList>

            {/* Statiques */}
            <TabsContent value="static" className="mt-4">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {staticTypes.map((opt) => {
                  const Icon = CONTENT_ICONS[opt.value]
                  const active = contentType === opt.value
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleTypeChange(opt.value)}
                      className={cn(
                        'flex flex-col items-start gap-1.5 rounded-xl border p-3 text-left transition-all',
                        active
                          ? 'border-mq-ink bg-mq-ink text-white shadow-sm'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50',
                      )}
                    >
                      <Icon className={cn('h-5 w-5', active ? 'text-mq-signal' : 'text-slate-500')} />
                      <div>
                        <div className="text-sm font-semibold leading-none">{opt.label}</div>
                        <div className={cn('mt-1 text-[11px] leading-tight', active ? 'text-white/70' : 'text-slate-400')}>
                          {opt.description}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </TabsContent>

            {/* Smart Landing Pages */}
            <TabsContent value="smart" className="mt-4">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {smartTypes.map((opt) => {
                  const Icon = CONTENT_ICONS[opt.value]
                  const active = contentType === opt.value
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleTypeChange(opt.value)}
                      className={cn(
                        'flex flex-col items-start gap-1.5 rounded-xl border p-3 text-left transition-all',
                        active
                          ? 'border-mq-ink bg-mq-ink text-white shadow-sm ring-1 ring-mq-ink'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50/80',
                      )}
                    >
                      <span className={cn('flex h-7 w-7 items-center justify-center rounded-lg', active ? 'bg-mq-signal/20 text-mq-signal' : 'bg-slate-100 text-slate-700')}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <div className="text-sm font-semibold leading-tight">{opt.label}</div>
                        <div className={cn('mt-1 text-[11px] leading-tight line-clamp-2', active ? 'text-white/70' : 'text-slate-400')}>
                          {opt.description}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Formulaire des données */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                2. Données encodées : <span className="text-mq-ink">{currentConfig?.label}</span>
              </h2>
              <p className="text-sm text-slate-500">{currentConfig?.description}</p>
            </div>
          </div>

          <ContentFields payload={payload} onChange={updatePayload} />
        </section>

        {/* Customisation du Style */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-900">3. Personnalisation & Design</h2>
            <p className="text-sm text-slate-500">
              Forme des modules, yeux, palette de couleurs et logo central.
            </p>
          </div>
          <QrStyleForm value={style} onChange={setStyle} onError={setError} />
        </section>
      </div>

      {/* Panneau Latéral d'Aperçu & Téléchargement */}
      <aside className="lg:sticky lg:top-24 space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-slate-900">Aperçu en direct</h2>
            {isSmart && (
              <span className="inline-flex items-center gap-1 rounded-full bg-mq-coral/15 px-2.5 py-0.5 text-xs font-semibold text-mq-ink">
                <Sparkles className="h-3.5 w-3.5 text-mq-coral" /> Dynamic Page
              </span>
            )}
          </div>
          <p className="mb-4 text-sm text-slate-500">
            {isSmart ? 'Prévisualisez le QR Code qui pointe vers votre landing page dédiée.' : 'QR Code statique haute définition prêt à télécharger.'}
          </p>

          <QrStyledPreview ref={previewRef} data={encoded} style={style} displaySize={280} />

          {error ? <p className="mt-3 text-sm font-medium text-red-600">{error}</p> : null}

          <div className="mt-5 grid gap-2">
            <Button
              type="button"
              className="bg-mq-ink text-white hover:bg-mq-ink-soft h-11 text-sm font-semibold rounded-xl"
              disabled={!ready}
              onClick={downloadPng}
            >
              <Download className="mr-2 h-4 w-4" />
              Télécharger PNG HD
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-10 text-sm font-medium rounded-xl"
              disabled={!ready}
              onClick={downloadSvg}
            >
              <Download className="mr-2 h-4 w-4" />
              Télécharger Vectoriel SVG
            </Button>
            <Button type="button" variant="ghost" className="h-9 text-xs" disabled={!encoded} onClick={copyPayload}>
              {copied ? <Check className="mr-2 h-3.5 w-3.5" /> : <Copy className="mr-2 h-3.5 w-3.5" />}
              {copied ? 'Copié dans le presse-papier' : 'Copier le contenu du QR'}
            </Button>
          </div>

          <Separator className="my-5" />

          {/* Banner d'encouragement pour les Smart Landing Pages */}
          {isSmart ? (
            <div className="rounded-xl border border-mq-coral/30 bg-gradient-to-br from-mq-coral/5 to-mq-sun/10 p-4 text-sm text-slate-700 space-y-3">
              <div className="flex items-center gap-2 text-mq-ink font-semibold">
                <Sparkles className="h-4 w-4 text-mq-coral" />
                Landing Page {currentConfig?.label}
              </div>
              <p className="text-xs leading-relaxed text-slate-600">
                Vous créez un QR Code pour <strong>{currentConfig?.label}</strong>. Publiez une page responsive complète dédiée sans coder. Vous pourrez mettre à jour le contenu et suivre les scans en temps réel sans réimprimer le QR code !
              </p>
              <Button asChild size="sm" className="w-full rounded-xl bg-gradient-to-r from-mq-coral to-mq-sun font-semibold text-mq-ink hover:opacity-90">
                <Link href={`/dashboard/new?vertical=${contentType}`}>
                  Publier ma page complète (Gratuit)
                  <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          ) : (
            <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600 space-y-2">
              <p className="font-medium text-slate-900">Passez au QR Code Dynamique !</p>
              <p className="text-xs leading-relaxed text-slate-600">
                Un QR statique ne peut plus être modifié une fois imprimé. Avec QRious, créez des QR dynamiques rééditables avec analytics complets.
              </p>
              <Button asChild size="sm" className="w-full mt-2 rounded-xl bg-mq-ink text-white hover:bg-mq-ink-soft">
                <Link href="/dashboard">Découvrir le Dashboard</Link>
              </Button>
            </div>
          )}
        </div>
      </aside>
    </div>
  )
}

function ContentFields({
  payload,
  onChange,
}: {
  payload: QrPayloadInput
  onChange: (next: QrPayloadInput) => void
}) {
  switch (payload.type) {
    case 'url':
      return (
        <Field label="Adresse web (URL)" htmlFor="qr-url" hint="Ex: https://votresite.com">
          <Input
            id="qr-url"
            type="url"
            placeholder="https://votresite.com"
            value={payload.data.url}
            onChange={(e) => onChange({ type: 'url', data: { url: e.target.value } })}
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

    // Verticals Smart QR
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

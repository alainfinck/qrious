'use client'

import { useCallback, useRef, useState, type ReactNode } from 'react'
import Link from 'next/link'
import {
  Copy,
  Check,
  Download,
  Link2,
  Mail,
  MessageSquare,
  Phone,
  QrCode,
  Type,
  User,
  Wifi,
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
import {
  buildQrPayload,
  isPayloadReady,
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
}

const CONTENT_OPTIONS: { value: QrContentType; label: string }[] = [
  { value: 'url', label: 'URL' },
  { value: 'text', label: 'Texte' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Téléphone' },
  { value: 'sms', label: 'SMS' },
  { value: 'wifi', label: 'Wi-Fi' },
  { value: 'vcard', label: 'vCard' },
]

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
  }
}

function Field({
  label,
  children,
  htmlFor,
}: {
  label: string
  children: ReactNode
  htmlFor?: string
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor} className="text-slate-700">
        {label}
      </Label>
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

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
      <div className="space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Contenu</h2>
              <p className="text-sm text-slate-500">Choisissez le type de données encodées.</p>
            </div>
            <QrCode className="hidden h-5 w-5 text-slate-300 sm:block" />
          </div>

          <div className="mb-5 flex flex-wrap gap-2">
            {CONTENT_OPTIONS.map((opt) => {
              const Icon = CONTENT_ICONS[opt.value]
              const active = contentType === opt.value
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleTypeChange(opt.value)}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-colors',
                    active
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900',
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {opt.label}
                </button>
              )
            })}
          </div>

          <ContentFields payload={payload} onChange={updatePayload} />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-900">Style du QR</h2>
            <p className="text-sm text-slate-500">
              Modules, yeux, couleurs et logo — prévisualisation en direct.
            </p>
          </div>
          <QrStyleForm value={style} onChange={setStyle} onError={setError} />
        </section>
      </div>

      <aside className="lg:sticky lg:top-24">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900">Aperçu</h2>
          <p className="mb-4 text-sm text-slate-500">Mise à jour en direct — gratuit, sans compte.</p>

          <QrStyledPreview ref={previewRef} data={encoded} style={style} displaySize={280} />

          {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

          <div className="mt-5 grid gap-2">
            <Button
              type="button"
              className="bg-mq-ink text-white hover:bg-mq-ink-soft"
              disabled={!ready}
              onClick={downloadPng}
            >
              <Download className="mr-2 h-4 w-4" />
              Télécharger PNG
            </Button>
            <Button type="button" variant="outline" disabled={!ready} onClick={downloadSvg}>
              <Download className="mr-2 h-4 w-4" />
              Télécharger SVG
            </Button>
            <Button type="button" variant="ghost" disabled={!encoded} onClick={copyPayload}>
              {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
              {copied ? 'Copié' : 'Copier le contenu'}
            </Button>
          </div>

          <Separator className="my-5" />

          <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
            <p className="font-medium text-slate-900">Besoin d’un QR dynamique ?</p>
            <p className="mt-1 leading-relaxed">
              Suivez les scans, changez la destination sans réimprimer, et créez une landing page
              dédiée.
            </p>
            <Button asChild size="sm" className="mt-3 bg-mq-ink text-white hover:bg-mq-ink-soft">
              <Link href="/dashboard">Créer un QR dynamique</Link>
            </Button>
          </div>
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
        <Field label="Adresse web" htmlFor="qr-url">
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
        <Field label="Texte" htmlFor="qr-text">
          <Textarea
            id="qr-text"
            rows={4}
            placeholder="Votre message…"
            value={payload.data.text}
            onChange={(e) => onChange({ type: 'text', data: { text: e.target.value } })}
          />
        </Field>
      )
    case 'email':
      return (
        <div className="grid gap-4">
          <Field label="Adresse email" htmlFor="qr-email">
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
          <Field label="Sujet (optionnel)" htmlFor="qr-email-subject">
            <Input
              id="qr-email-subject"
              value={payload.data.subject ?? ''}
              onChange={(e) =>
                onChange({ type: 'email', data: { ...payload.data, subject: e.target.value } })
              }
            />
          </Field>
          <Field label="Message (optionnel)" htmlFor="qr-email-body">
            <Textarea
              id="qr-email-body"
              rows={3}
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
        <Field label="Numéro de téléphone" htmlFor="qr-phone">
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
          <Field label="Numéro" htmlFor="qr-sms-phone">
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
          <Field label="Message (optionnel)" htmlFor="qr-sms-message">
            <Textarea
              id="qr-sms-message"
              rows={3}
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
                <SelectItem value="WPA">WPA / WPA2</SelectItem>
                <SelectItem value="WEP">WEP</SelectItem>
                <SelectItem value="nopass">Aucune</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          {payload.data.encryption !== 'nopass' ? (
            <Field label="Mot de passe" htmlFor="qr-wifi-password">
              <Input
                id="qr-wifi-password"
                type="text"
                autoComplete="off"
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
              Réseau masqué
            </label>
          </div>
        </div>
      )
    case 'vcard':
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Prénom" htmlFor="qr-vcard-first">
            <Input
              id="qr-vcard-first"
              value={payload.data.firstName}
              onChange={(e) =>
                onChange({ type: 'vcard', data: { ...payload.data, firstName: e.target.value } })
              }
            />
          </Field>
          <Field label="Nom" htmlFor="qr-vcard-last">
            <Input
              id="qr-vcard-last"
              value={payload.data.lastName ?? ''}
              onChange={(e) =>
                onChange({ type: 'vcard', data: { ...payload.data, lastName: e.target.value } })
              }
            />
          </Field>
          <Field label="Organisation" htmlFor="qr-vcard-org">
            <Input
              id="qr-vcard-org"
              value={payload.data.organization ?? ''}
              onChange={(e) =>
                onChange({
                  type: 'vcard',
                  data: { ...payload.data, organization: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Fonction" htmlFor="qr-vcard-title">
            <Input
              id="qr-vcard-title"
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
              value={payload.data.phone ?? ''}
              onChange={(e) =>
                onChange({ type: 'vcard', data: { ...payload.data, phone: e.target.value } })
              }
            />
          </Field>
          <Field label="Email" htmlFor="qr-vcard-email">
            <Input
              id="qr-vcard-email"
              type="email"
              value={payload.data.email ?? ''}
              onChange={(e) =>
                onChange({ type: 'vcard', data: { ...payload.data, email: e.target.value } })
              }
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Site web" htmlFor="qr-vcard-web">
              <Input
                id="qr-vcard-web"
                type="url"
                placeholder="https://"
                value={payload.data.website ?? ''}
                onChange={(e) =>
                  onChange({ type: 'vcard', data: { ...payload.data, website: e.target.value } })
                }
              />
            </Field>
          </div>
        </div>
      )
  }
}

'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import Link from 'next/link'
import QRCode from 'qrcode'
import {
  Copy,
  Check,
  Download,
  ImagePlus,
  Link2,
  Mail,
  MessageSquare,
  Phone,
  QrCode,
  Trash2,
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
import { cn } from '@/lib/utils'

type ErrorLevel = 'L' | 'M' | 'Q' | 'H'

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

const PRESET_COLORS = [
  '#0f172a',
  '#1e3a5f',
  '#0f766e',
  '#b45309',
  '#9f1239',
  '#5b21b6',
  '#ffffff',
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

async function composeWithLogo(
  qrDataUrl: string,
  logoDataUrl: string,
  size: number,
): Promise<string> {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) return qrDataUrl

  const qrImage = await loadImage(qrDataUrl)
  ctx.drawImage(qrImage, 0, 0, size, size)

  const logo = await loadImage(logoDataUrl)
  const logoSize = Math.round(size * 0.22)
  const padding = Math.round(logoSize * 0.12)
  const box = logoSize + padding * 2
  const x = (size - box) / 2
  const y = (size - box) / 2

  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  const r = Math.round(box * 0.18)
  roundRect(ctx, x, y, box, box, r)
  ctx.fill()

  ctx.drawImage(logo, x + padding, y + padding, logoSize, logoSize)
  return canvas.toDataURL('image/png')
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function downloadDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement('a')
  a.href = dataUrl
  a.download = filename
  a.click()
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
  const [fgColor, setFgColor] = useState('#0f172a')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [errorLevel, setErrorLevel] = useState<ErrorLevel>('M')
  const [margin, setMargin] = useState(2)
  const [size, setSize] = useState(512)
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [generating, setGenerating] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const ready = isPayloadReady(payload)
  const encoded = ready ? buildQrPayload(payload) : ''

  const updatePayload = useCallback((next: QrPayloadInput) => {
    setPayload(next)
  }, [])

  const handleTypeChange = (type: QrContentType) => {
    setContentType(type)
    setPayload(defaultPayload(type))
  }

  const handleLogoUpload = (file: File | undefined) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Le logo doit être une image (PNG, JPG, SVG…).')
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setError('Le logo ne doit pas dépasser 2 Mo.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      setLogoDataUrl(String(reader.result))
      setErrorLevel('H')
      setError(null)
    }
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    let cancelled = false

    async function render() {
      if (!ready || !encoded) {
        setPreviewUrl(null)
        return
      }

      setGenerating(true)
      try {
        const effectiveEcc = logoDataUrl ? 'H' : errorLevel
        let dataUrl = await QRCode.toDataURL(encoded, {
          width: size,
          margin,
          errorCorrectionLevel: effectiveEcc,
          color: { dark: fgColor, light: bgColor },
        })

        if (logoDataUrl) {
          dataUrl = await composeWithLogo(dataUrl, logoDataUrl, size)
        }

        if (!cancelled) {
          setPreviewUrl(dataUrl)
          setError(null)
        }
      } catch {
        if (!cancelled) {
          setPreviewUrl(null)
          setError('Impossible de générer ce QR code. Vérifiez le contenu.')
        }
      } finally {
        if (!cancelled) setGenerating(false)
      }
    }

    const timer = window.setTimeout(render, 180)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [encoded, ready, fgColor, bgColor, errorLevel, margin, size, logoDataUrl])

  const downloadPng = () => {
    if (!previewUrl) return
    downloadDataUrl(previewUrl, `qrious-qr-${contentType}.png`)
  }

  const downloadSvg = async () => {
    if (!ready || !encoded) return
    try {
      // Logo composite is raster-only; fall back to PNG when a logo is present
      if (logoDataUrl && previewUrl) {
        downloadDataUrl(previewUrl, `qrious-qr-${contentType}.png`)
        return
      }

      const svg = await QRCode.toString(encoded, {
        type: 'svg',
        width: size,
        margin,
        errorCorrectionLevel: errorLevel,
        color: { dark: fgColor, light: bgColor },
      })

      const blob = new Blob([svg], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      downloadDataUrl(url, `qrious-qr-${contentType}.svg`)
      URL.revokeObjectURL(url)
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
            <h2 className="text-lg font-semibold text-slate-900">Apparence</h2>
            <p className="text-sm text-slate-500">Couleurs, taille, correction d’erreur et logo.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Couleur du QR">
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="h-10 w-12 cursor-pointer rounded-md border border-slate-200 bg-white p-1"
                  aria-label="Couleur du QR"
                />
                <Input
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="font-mono text-sm uppercase"
                />
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {PRESET_COLORS.filter((c) => c !== '#ffffff').map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setFgColor(c)}
                    className={cn(
                      'h-7 w-7 rounded-full border border-slate-200',
                      fgColor === c && 'ring-2 ring-slate-900 ring-offset-2',
                    )}
                    style={{ backgroundColor: c }}
                    aria-label={`Couleur ${c}`}
                  />
                ))}
              </div>
            </Field>

            <Field label="Couleur de fond">
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="h-10 w-12 cursor-pointer rounded-md border border-slate-200 bg-white p-1"
                  aria-label="Couleur de fond"
                />
                <Input
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="font-mono text-sm uppercase"
                />
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {['#ffffff', '#f8fafc', '#fef3c7', '#ecfeff', '#fce7f3'].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setBgColor(c)}
                    className={cn(
                      'h-7 w-7 rounded-full border border-slate-200',
                      bgColor === c && 'ring-2 ring-slate-900 ring-offset-2',
                    )}
                    style={{ backgroundColor: c }}
                    aria-label={`Fond ${c}`}
                  />
                ))}
              </div>
            </Field>

            <Field label="Niveau de correction">
              <Select
                value={logoDataUrl ? 'H' : errorLevel}
                onValueChange={(v) => setErrorLevel(v as ErrorLevel)}
                disabled={Boolean(logoDataUrl)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="L">L — ~7% (faible)</SelectItem>
                  <SelectItem value="M">M — ~15% (recommandé)</SelectItem>
                  <SelectItem value="Q">Q — ~25%</SelectItem>
                  <SelectItem value="H">H — ~30% (logo)</SelectItem>
                </SelectContent>
              </Select>
              {logoDataUrl ? (
                <p className="text-xs text-slate-500">Forcé sur H tant qu’un logo est présent.</p>
              ) : null}
            </Field>

            <Field label="Taille d’export (px)">
              <Select value={String(size)} onValueChange={(v) => setSize(Number(v))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="256">256 × 256</SelectItem>
                  <SelectItem value="512">512 × 512</SelectItem>
                  <SelectItem value="1024">1024 × 1024</SelectItem>
                  <SelectItem value="2048">2048 × 2048</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field label={`Marge (${margin})`}>
              <input
                type="range"
                min={0}
                max={8}
                step={1}
                value={margin}
                onChange={(e) => setMargin(Number(e.target.value))}
                className="w-full accent-slate-900"
              />
            </Field>

            <Field label="Logo au centre (optionnel)">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleLogoUpload(e.target.files?.[0])}
              />
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImagePlus className="mr-2 h-4 w-4" />
                  {logoDataUrl ? 'Changer' : 'Ajouter un logo'}
                </Button>
                {logoDataUrl ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setLogoDataUrl(null)
                      if (fileInputRef.current) fileInputRef.current.value = ''
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Retirer
                  </Button>
                ) : null}
              </div>
            </Field>
          </div>
        </section>
      </div>

      <aside className="lg:sticky lg:top-24">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900">Aperçu</h2>
          <p className="mb-4 text-sm text-slate-500">Mise à jour en direct — gratuit, sans compte.</p>

          <div
            className="mx-auto flex aspect-square w-full max-w-[280px] items-center justify-center rounded-2xl border border-dashed border-slate-200 p-4"
            style={{ backgroundColor: bgColor === '#ffffff' ? '#f8fafc' : bgColor }}
          >
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt="Aperçu du QR code"
                className="h-full w-full object-contain transition-opacity duration-200"
                style={{ opacity: generating ? 0.55 : 1 }}
              />
            ) : (
              <div className="text-center text-sm text-slate-400">
                <QrCode className="mx-auto mb-2 h-10 w-10 opacity-40" />
                Renseignez un contenu pour générer le QR
              </div>
            )}
          </div>

          {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

          <div className="mt-5 grid gap-2">
            <Button
              type="button"
              className="bg-slate-900 hover:bg-slate-800"
              disabled={!previewUrl}
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
            <Button asChild size="sm" className="mt-3 bg-slate-900 hover:bg-slate-800">
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

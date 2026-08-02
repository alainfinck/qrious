'use client'

import { useCallback, useRef, useState, type ReactNode } from 'react'
import Link from 'next/link'
import {
  Box,
  Building2,
  Calendar,
  CalendarDays,
  Check,
  Compass,
  Copy,
  Download,
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
  QrCode,
  Share2,
  ShoppingBag,
  Smartphone,
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
} from '@/lib/qr/payload'
import { DEFAULT_QR_STYLE, type QrStyle } from '@/lib/qr/style'
import { cn } from '@/lib/utils'

import { QrStyleForm } from './QrStyleForm'
import { QrStyledPreview, type QrStyledPreviewHandle } from './QrStyledPreview'
import { CONTENT_ICONS, defaultPayload, ContentFields } from './qr-types'
export function PublicQrEditor({ initialType = 'url' }: { initialType?: QrContentType }) {
  const [contentType, setContentType] = useState<QrContentType>(initialType)
  const [payload, setPayload] = useState<QrPayloadInput>(defaultPayload(initialType))
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
            <TabsList className="grid w-full grid-cols-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
              <TabsTrigger
                value="static"
                className="rounded-lg py-2.5 text-xs font-bold sm:text-sm text-slate-600 data-[state=active]:bg-mq-ink data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
              >
                Codes Statiques Directs
              </TabsTrigger>
              <TabsTrigger
                value="smart"
                className="rounded-lg py-2.5 text-xs font-bold sm:text-sm text-slate-600 data-[state=active]:bg-mq-ink data-[state=active]:text-mq-signal data-[state=active]:shadow-md transition-all"
              >
                ✨ Smart QR Pages (Métiers)
              </TabsTrigger>
            </TabsList>

            {/* Statiques */}
            <TabsContent value="static" className="mt-4">
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
                {staticTypes.map((opt) => {
                  const Icon = CONTENT_ICONS[opt.value]
                  const active = contentType === opt.value
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleTypeChange(opt.value)}
                      className={cn(
                        'group relative flex flex-col items-start gap-2 rounded-xl border p-3 text-left transition-all',
                        active
                          ? 'border-mq-ink bg-mq-ink text-white shadow-md ring-2 ring-mq-ink/30'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50',
                      )}
                    >
                      <div className="flex w-full items-center justify-between">
                        <span
                          className={cn(
                            'flex h-7 w-7 items-center justify-center rounded-lg transition-colors',
                            active ? 'bg-mq-signal/20 text-mq-signal' : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200',
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        {active && (
                          <span className="h-2 w-2 rounded-full bg-mq-signal animate-pulse" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-bold leading-snug sm:text-sm">{opt.label}</div>
                        <div
                          className={cn(
                            'mt-1 text-[11px] leading-tight line-clamp-2',
                            active ? 'text-white/80' : 'text-slate-500',
                          )}
                        >
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
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {smartTypes.map((opt) => {
                  const Icon = CONTENT_ICONS[opt.value]
                  const active = contentType === opt.value
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleTypeChange(opt.value)}
                      className={cn(
                        'group relative flex flex-col items-start gap-2 rounded-xl border p-3 text-left transition-all',
                        active
                          ? 'border-mq-ink bg-mq-ink text-white shadow-md ring-2 ring-mq-ink/30'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50/90',
                      )}
                    >
                      <div className="flex w-full items-center justify-between">
                        <span
                          className={cn(
                            'flex h-7 w-7 items-center justify-center rounded-lg transition-colors',
                            active ? 'bg-mq-signal/20 text-mq-signal' : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200',
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <span
                          className={cn(
                            'text-[10px] font-bold px-1.5 py-0.5 rounded-full',
                            active ? 'bg-mq-coral text-mq-ink' : 'bg-slate-100 text-slate-500',
                          )}
                        >
                          Page
                        </span>
                      </div>
                      <div>
                        <div className="text-xs font-bold leading-snug sm:text-sm">{opt.label}</div>
                        <div
                          className={cn(
                            'mt-1 text-[11px] leading-tight line-clamp-2',
                            active ? 'text-white/80' : 'text-slate-500',
                          )}
                        >
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
                <Link href="/demo">Découvrir le Dashboard</Link>
              </Button>
            </div>
          )}
        </div>
      </aside>
    </div>
  )
}


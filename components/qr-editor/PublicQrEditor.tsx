'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  Check,
  Copy,
  Download,
  ExternalLink,
  FileType,
  QrCode,
  Redo2,
  Sparkles,
  Undo2,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  buildQrPayload,
  isPayloadReady,
  QR_CONTENT_TYPES,
  type QrContentType,
  type QrPayloadInput,
} from '@/lib/qr/payload'
import {
  applyTemplate,
  STYLE_TEMPLATES,
  type QrStyle,
  type QrStyleTemplate,
} from '@/lib/qr/style'
import { cn } from '@/lib/utils'

import { QrStyleForm } from './QrStyleForm'
import { QrStyledPreview, type QrStyledPreviewHandle } from './QrStyledPreview'
import { CONTENT_ICONS, defaultPayload, ContentFields } from './qr-types'

const HISTORY_LIMIT = 40
const INITIAL_TEMPLATE = STYLE_TEMPLATES.find((t) => t.id === 'signal')!
const INITIAL_STYLE = applyTemplate(INITIAL_TEMPLATE)

export function PublicQrEditor({ initialType = 'url' }: { initialType?: QrContentType }) {
  const [contentType, setContentType] = useState<QrContentType>(initialType)
  const [payload, setPayload] = useState<QrPayloadInput>(defaultPayload(initialType))
  const [style, setStyle] = useState<QrStyle>(INITIAL_STYLE)
  const [history, setHistory] = useState<QrStyle[]>([INITIAL_STYLE])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [activeTemplateId, setActiveTemplateId] = useState<string | null>(INITIAL_TEMPLATE.id)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [exporting, setExporting] = useState(false)
  const previewRef = useRef<QrStyledPreviewHandle>(null)
  const skipHistoryRef = useRef(false)
  const historyIndexRef = useRef(0)

  const ready = isPayloadReady(payload)
  const encoded = ready ? buildQrPayload(payload) : ''
  const currentConfig = QR_CONTENT_TYPES.find((c) => c.value === contentType)
  const isSmart = currentConfig?.category === 'smart'
  const canUndo = historyIndex > 0
  const canRedo = historyIndex < history.length - 1

  const commitStyle = useCallback((next: QrStyle, templateId: string | null = null) => {
    setStyle(next)
    setActiveTemplateId(templateId)
    if (skipHistoryRef.current) {
      skipHistoryRef.current = false
      return
    }
    setHistory((prev) => {
      const trimmed = prev.slice(0, historyIndexRef.current + 1)
      const merged = [...trimmed, next].slice(-HISTORY_LIMIT)
      historyIndexRef.current = merged.length - 1
      setHistoryIndex(merged.length - 1)
      return merged
    })
  }, [])

  const handleStyleChange = (next: QrStyle) => {
    commitStyle(next, null)
  }

  const handleTemplateApply = (tpl: QrStyleTemplate) => {
    setActiveTemplateId(tpl.id)
  }

  const undo = () => {
    if (!canUndo) return
    const idx = historyIndex - 1
    skipHistoryRef.current = true
    historyIndexRef.current = idx
    setHistoryIndex(idx)
    setStyle(history[idx])
    setActiveTemplateId(null)
  }

  const redo = () => {
    if (!canRedo) return
    const idx = historyIndex + 1
    skipHistoryRef.current = true
    historyIndexRef.current = idx
    setHistoryIndex(idx)
    setStyle(history[idx])
    setActiveTemplateId(null)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey
      if (!mod) return
      if (e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        undo()
      } else if ((e.key === 'z' && e.shiftKey) || e.key === 'y') {
        e.preventDefault()
        redo()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyIndex, history])

  const updatePayload = useCallback((next: QrPayloadInput) => {
    setPayload(next)
  }, [])

  const handleTypeChange = (type: QrContentType) => {
    setContentType(type)
    setPayload(defaultPayload(type))
  }

  const download = async (ext: 'png' | 'svg' | 'jpeg' | 'webp') => {
    if (!ready) return
    setExporting(true)
    setError(null)
    try {
      await previewRef.current?.download(ext, `qrious-qr-${contentType}`)
    } catch {
      setError(`Export ${ext.toUpperCase()} impossible.`)
    } finally {
      setExporting(false)
    }
  }

  const downloadPdf = async () => {
    if (!ready) return
    setExporting(true)
    setError(null)
    try {
      const blob = await previewRef.current?.getRawData('png')
      if (!blob) throw new Error('no blob')
      const { jsPDF } = await import('jspdf')
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(String(reader.result))
        reader.onerror = reject
        reader.readAsDataURL(blob)
      })
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const el = new Image()
        el.onload = () => resolve(el)
        el.onerror = reject
        el.src = dataUrl
      })
      const maxMm = 90
      const ratio = img.width / img.height
      const w = ratio >= 1 ? maxMm : maxMm * ratio
      const h = ratio >= 1 ? maxMm / ratio : maxMm
      const pdf = new jsPDF({
        orientation: w >= h ? 'landscape' : 'portrait',
        unit: 'mm',
        format: [w + 20, h + 20],
      })
      pdf.addImage(dataUrl, 'PNG', 10, 10, w, h)
      pdf.save(`qrious-qr-${contentType}.pdf`)
    } catch {
      setError('Export PDF impossible.')
    } finally {
      setExporting(false)
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

  const typeBtn = (active: boolean) =>
    cn(
      'group relative flex flex-col items-start gap-2 rounded-xl border p-3 text-left transition-all',
      active
        ? 'border-mq-ink bg-mq-ink text-white shadow-sm ring-2 ring-mq-signal/30'
        : 'border-mq-ink/10 bg-white text-mq-ink hover:border-mq-signal/40 hover:bg-mq-mist/50',
    )

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
      <div className="space-y-5">
        {/* Step 1 — Type */}
        <section className="rounded-2xl border border-mq-ink/10 bg-white/90 p-5 shadow-[0_18px_50px_-36px_rgba(11,18,32,0.5)] backdrop-blur sm:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-mq-signal-deep">
                Étape 1
              </p>
              <h2 className="font-display text-xl font-bold text-mq-ink">Type de QR</h2>
              <p className="text-sm text-mq-muted">
                Statique direct ou landing métier dynamique.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-mq-ink/10 bg-mq-mist px-2.5 py-1 text-xs font-semibold text-mq-ink">
              <QrCode className="h-3.5 w-3.5 text-mq-signal-deep" />
              Gratuit
            </span>
          </div>

          <Tabs defaultValue={isSmart ? 'smart' : 'static'} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="static">
                <QrCode className="h-3.5 w-3.5 shrink-0 opacity-80" />
                Statiques
              </TabsTrigger>
              <TabsTrigger value="smart">
                <Sparkles className="h-3.5 w-3.5 shrink-0 opacity-80" />
                Smart Pages
              </TabsTrigger>
            </TabsList>

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
                      className={typeBtn(active)}
                    >
                      <span
                        className={cn(
                          'flex h-7 w-7 items-center justify-center rounded-lg transition-colors',
                          active ? 'bg-mq-signal text-mq-ink' : 'bg-mq-mist text-mq-ink',
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <div className="text-xs font-bold leading-snug sm:text-sm">{opt.label}</div>
                        <div
                          className={cn(
                            'mt-1 line-clamp-2 text-[11px] leading-tight',
                            active ? 'text-white/65' : 'text-mq-muted',
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
                      className={typeBtn(active)}
                    >
                      <div className="flex w-full items-center justify-between">
                        <span
                          className={cn(
                            'flex h-7 w-7 items-center justify-center rounded-lg',
                            active ? 'bg-mq-signal text-mq-ink' : 'bg-mq-mist text-mq-ink',
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <span
                          className={cn(
                            'rounded-full px-1.5 py-0.5 text-[10px] font-bold',
                            active ? 'bg-white/15 text-mq-signal' : 'bg-mq-mist text-mq-muted',
                          )}
                        >
                          Page
                        </span>
                      </div>
                      <div>
                        <div className="text-xs font-bold leading-snug sm:text-sm">{opt.label}</div>
                        <div
                          className={cn(
                            'mt-1 line-clamp-2 text-[11px] leading-tight',
                            active ? 'text-white/65' : 'text-mq-muted',
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

        {/* Step 2 — Data */}
        <section className="rounded-2xl border border-mq-ink/10 bg-white/90 p-5 shadow-[0_18px_50px_-36px_rgba(11,18,32,0.5)] backdrop-blur sm:p-6">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-mq-signal-deep">
              Étape 2
            </p>
            <h2 className="font-display text-xl font-bold text-mq-ink">
              Contenu · {currentConfig?.label}
            </h2>
            <p className="text-sm text-mq-muted">{currentConfig?.description}</p>
          </div>
          <ContentFields payload={payload} onChange={updatePayload} />
        </section>

        {/* Step 3 — Style */}
        <section className="rounded-2xl border border-mq-ink/10 bg-white/90 p-5 shadow-[0_18px_50px_-36px_rgba(11,18,32,0.5)] backdrop-blur sm:p-6">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-mq-signal-deep">
                Étape 3
              </p>
              <h2 className="font-display text-xl font-bold text-mq-ink">Design</h2>
              <p className="text-sm text-mq-muted">
                Templates, cadres, formes, dégradés, logo.
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9 w-9 rounded-xl border-mq-ink/10 p-0"
                disabled={!canUndo}
                onClick={undo}
                title="Annuler (⌘Z)"
              >
                <Undo2 className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9 w-9 rounded-xl border-mq-ink/10 p-0"
                disabled={!canRedo}
                onClick={redo}
                title="Rétablir (⌘⇧Z)"
              >
                <Redo2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <QrStyleForm
            value={style}
            onChange={handleStyleChange}
            onError={setError}
            activeTemplateId={activeTemplateId}
            onTemplateApply={handleTemplateApply}
          />
        </section>
      </div>

      {/* Preview aside */}
      <aside className="self-start lg:sticky lg:top-28 lg:z-20 lg:max-h-[calc(100dvh-8rem)] lg:overflow-y-auto lg:overscroll-contain lg:pr-1">
        <div className="space-y-4 rounded-2xl border border-mq-ink/10 bg-white/95 p-5 shadow-[0_24px_60px_-32px_rgba(11,18,32,0.55)] backdrop-blur sm:p-6">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-mq-ink">Aperçu live</h2>
            {isSmart ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-mq-signal/30 bg-mq-signal/10 px-2.5 py-0.5 text-xs font-semibold text-mq-signal-deep">
                <Sparkles className="h-3.5 w-3.5" /> Smart
              </span>
            ) : null}
          </div>
          <p className="mb-4 text-sm text-mq-muted">
            {style.size}×{style.size}px · {style.transparentBackground ? 'transparent' : 'opaque'}
          </p>

          <QrStyledPreview ref={previewRef} data={encoded} style={style} displaySize={300} />

          {error ? <p className="mt-3 text-sm font-medium text-mq-coral-deep">{error}</p> : null}

          <div className="mt-5 grid gap-2">
            <Button
              type="button"
              className="h-11 rounded-xl bg-mq-ink text-sm font-semibold text-white hover:bg-mq-ink-soft"
              disabled={!ready || exporting}
              onClick={() => download('png')}
            >
              <Download className="mr-2 h-4 w-4" />
              PNG HD
            </Button>
            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant="outline"
                className="h-10 rounded-xl border-mq-ink/12 text-xs font-semibold"
                disabled={!ready || exporting}
                onClick={() => download('svg')}
              >
                SVG
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-10 rounded-xl border-mq-ink/12 text-xs font-semibold"
                disabled={!ready || exporting}
                onClick={downloadPdf}
              >
                <FileType className="mr-1 h-3.5 w-3.5" />
                PDF
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-10 rounded-xl border-mq-ink/12 text-xs font-semibold"
                disabled={!ready || exporting || style.transparentBackground}
                onClick={() => download('jpeg')}
                title={
                  style.transparentBackground
                    ? 'JPEG ne supporte pas la transparence'
                    : undefined
                }
              >
                JPEG
              </Button>
            </div>
            <Button
              type="button"
              variant="ghost"
              className="h-9 text-xs text-mq-muted hover:text-mq-ink"
              disabled={!encoded}
              onClick={copyPayload}
            >
              {copied ? <Check className="mr-2 h-3.5 w-3.5" /> : <Copy className="mr-2 h-3.5 w-3.5" />}
              {copied ? 'Copié' : 'Copier le payload'}
            </Button>
          </div>

          <Separator className="my-5" />

          {isSmart ? (
            <div className="space-y-3 rounded-xl border border-mq-signal/25 bg-mq-mist/80 p-4 text-sm text-mq-ink">
              <div className="flex items-center gap-2 font-semibold">
                <Sparkles className="h-4 w-4 text-mq-signal-deep" />
                Landing {currentConfig?.label}
              </div>
              <p className="text-xs leading-relaxed text-mq-muted">
                Publiez une page responsive, changez le contenu sans réimprimer, suivez les scans.
              </p>
              <Button
                asChild
                size="sm"
                className="w-full rounded-xl bg-mq-signal font-semibold text-mq-ink hover:bg-mq-signal/90"
              >
                <Link href={`/dashboard/new?vertical=${contentType}`}>
                  Publier ma page
                  <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-2 rounded-xl border border-mq-ink/8 bg-mq-mist/50 p-4 text-sm">
              <p className="font-semibold text-mq-ink">Passez au dynamique</p>
              <p className="text-xs leading-relaxed text-mq-muted">
                Un QR statique est figé. Avec QRious, destination éditable + analytics.
              </p>
              <Button
                asChild
                size="sm"
                className="mt-2 w-full rounded-xl bg-mq-ink text-white hover:bg-mq-ink-soft"
              >
                <Link href="/demo">Essayer le dashboard</Link>
              </Button>
            </div>
          )}
        </div>
      </aside>
    </div>
  )
}

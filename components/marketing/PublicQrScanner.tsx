'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import {
  Check,
  Copy,
  ExternalLink,
  ImagePlus,
  Loader2,
  ScanLine,
  Share2,
  Upload,
} from 'lucide-react'

import { decodeQrFromImageFile } from '@/lib/decode-qr-image'
import { cn } from '@/lib/utils'

type OgPreview = {
  url: string
  finalUrl: string
  title: string | null
  description: string | null
  image: string | null
  siteName: string | null
  favicon: string | null
}

const PHONE_W = 300
const PHONE_H = 620
const PHONE_CHROME = 7 * 2 + 3 * 2
const MOBILE_VIEWPORT_W = 390
const MOBILE_VIEWPORT_H = 844
const SAFE_TOP = 44

function isHttpUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function describePayload(data: string, t: ReturnType<typeof useTranslations<'Scanner'>>): string {
  const trimmed = data.trim()
  const upper = trimmed.toUpperCase()
  if (isHttpUrl(trimmed)) return t('kindUrl')
  if (upper.startsWith('WIFI:')) return t('kindWifi')
  if (upper.startsWith('BEGIN:VCARD')) return t('kindVcard')
  if (upper.startsWith('MATMSG:') || upper.startsWith('MAILTO:')) return t('kindEmail')
  if (upper.startsWith('TEL:')) return t('kindPhone')
  if (upper.startsWith('SMS:') || upper.startsWith('SMSTO:')) return t('kindSms')
  if (upper.startsWith('GEO:')) return t('kindGeo')
  return t('kindText')
}

function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

function UrlPhonePreview({ url, label }: { url: string; label: string }) {
  const screenW = PHONE_W - PHONE_CHROME
  const screenH = PHONE_H - PHONE_CHROME
  const contentH = screenH - SAFE_TOP
  const scale = screenW / MOBILE_VIEWPORT_W
  const viewportH = Math.max(MOBILE_VIEWPORT_H, Math.ceil(contentH / scale))

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm font-semibold text-mq-ink/70">{label}</p>
      <div
        className="relative overflow-hidden rounded-[40px] border-[7px] border-mq-ink bg-mq-ink p-[3px] shadow-xl shadow-mq-ink/25"
        style={{ width: PHONE_W, height: PHONE_H }}
      >
        <div
          className="flex w-full items-center justify-center bg-mq-ink"
          style={{ height: SAFE_TOP }}
          aria-hidden
        >
          <div className="h-[26px] w-24 rounded-full border border-white/10 bg-black" />
        </div>
        <div
          className="relative w-full overflow-hidden rounded-b-[32px] bg-white"
          style={{ height: contentH }}
        >
          <iframe
            title={label}
            src={url}
            className="absolute left-0 top-0 border-0 bg-white"
            style={{
              width: MOBILE_VIEWPORT_W,
              height: viewportH,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          />
        </div>
      </div>
    </div>
  )
}

function OgShareCard({
  preview,
  loading,
  error,
  t,
}: {
  preview: OgPreview | null
  loading: boolean
  error: string | null
  t: ReturnType<typeof useTranslations<'Scanner'>>
}) {
  return (
    <div className="flex min-w-[260px] max-w-md flex-1 flex-col gap-3">
      <div className="flex items-center gap-2">
        <Share2 className="h-4 w-4 text-mq-signal" />
        <p className="text-sm font-semibold text-mq-ink/70">{t('ogTitle')}</p>
      </div>

      {loading ? (
        <div className="flex items-center gap-2.5 py-5 text-sm text-mq-ink/50">
          <Loader2 className="h-4 w-4 animate-spin text-mq-signal" />
          {t('ogLoading')}
        </div>
      ) : null}

      {error && !loading ? (
        <p className="text-sm font-semibold text-red-600">{error}</p>
      ) : null}

      {!loading && preview ? (
        <div className="overflow-hidden rounded-xl border border-mq-ink/10 bg-white shadow-sm">
          {preview.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview.image}
              alt=""
              className="aspect-[1.91/1] w-full object-cover bg-mq-ink/5"
            />
          ) : (
            <div className="flex aspect-[1.91/1] w-full items-center justify-center bg-mq-ink/[0.04] text-sm font-medium text-mq-ink/40">
              {t('ogNoImage')}
            </div>
          )}
          <div className="space-y-1 p-3.5">
            <p className="truncate text-[11px] font-semibold uppercase tracking-wide text-mq-ink/45">
              {(preview.siteName || hostnameOf(preview.finalUrl || preview.url)).toUpperCase()}
            </p>
            <p className="line-clamp-2 text-[15px] font-bold leading-snug text-mq-ink">
              {preview.title || t('ogUntitled')}
            </p>
            {preview.description ? (
              <p className="line-clamp-3 text-sm leading-relaxed text-mq-ink/60">
                {preview.description}
              </p>
            ) : (
              <p className="text-sm text-mq-ink/40">{t('ogNoDescription')}</p>
            )}
          </div>
        </div>
      ) : null}

      {!loading && !preview && !error ? (
        <p className="text-sm text-mq-ink/40">{t('ogEmpty')}</p>
      ) : null}
    </div>
  )
}

export function PublicQrScanner() {
  const t = useTranslations('Scanner')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const dragDepth = useRef(0)
  const [dragging, setDragging] = useState(false)
  const [decoding, setDecoding] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [payload, setPayload] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [og, setOg] = useState<OgPreview | null>(null)
  const [ogLoading, setOgLoading] = useState(false)
  const [ogError, setOgError] = useState<string | null>(null)

  const processFile = useCallback(
    async (file: File | undefined | null) => {
      if (!file) return
      if (!file.type.startsWith('image/')) {
        setError(t('errorNotImage'))
        return
      }

      setDecoding(true)
      setError(null)
      setPayload(null)
      setCopied(false)
      try {
        const data = await decodeQrFromImageFile(file)
        if (!data) {
          setError(t('errorNoQr'))
          return
        }
        setPayload(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : t('errorDecode'))
      } finally {
        setDecoding(false)
      }
    },
    [t],
  )

  useEffect(() => {
    if (!payload || !isHttpUrl(payload)) {
      setOg(null)
      setOgError(null)
      setOgLoading(false)
      return
    }

    let cancelled = false
    setOgLoading(true)
    setOgError(null)
    setOg(null)

    void fetch(`/api/og-preview?url=${encodeURIComponent(payload.trim())}`)
      .then(async (res) => {
        const data = (await res.json()) as OgPreview & { error?: string }
        if (!res.ok) throw new Error(data.error || t('ogFetchError'))
        if (!cancelled) setOg(data)
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setOgError(err instanceof Error ? err.message : t('ogFetchError'))
        }
      })
      .finally(() => {
        if (!cancelled) setOgLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [payload, t])

  async function handleCopy() {
    if (!payload) return
    try {
      await navigator.clipboard.writeText(payload)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setError(t('errorCopy'))
    }
  }

  const canOpen = Boolean(payload && isHttpUrl(payload))

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            inputRef.current?.click()
          }
        }}
        onClick={() => inputRef.current?.click()}
        onDragEnter={(e) => {
          e.preventDefault()
          dragDepth.current += 1
          setDragging(true)
        }}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={(e) => {
          e.preventDefault()
          dragDepth.current = Math.max(0, dragDepth.current - 1)
          if (dragDepth.current === 0) setDragging(false)
        }}
        onDrop={(e) => {
          e.preventDefault()
          dragDepth.current = 0
          setDragging(false)
          void processFile(e.dataTransfer.files?.[0])
        }}
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-14 text-center transition-colors',
          dragging
            ? 'border-mq-signal bg-mq-signal/10'
            : 'border-mq-ink/15 bg-white hover:border-mq-ink/30 hover:bg-mq-ink/[0.02]',
          decoding && 'pointer-events-none opacity-70',
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            void processFile(e.target.files?.[0])
            e.target.value = ''
          }}
        />
        <div
          className={cn(
            'flex h-14 w-14 items-center justify-center rounded-2xl border bg-white',
            dragging ? 'border-mq-signal/40 bg-mq-signal/10' : 'border-mq-ink/10',
          )}
        >
          {decoding ? (
            <Loader2 className="h-6 w-6 animate-spin text-mq-signal" />
          ) : dragging ? (
            <Upload className="h-6 w-6 text-mq-signal" />
          ) : (
            <ImagePlus className="h-6 w-6 text-mq-ink/70" />
          )}
        </div>
        <div className="space-y-1">
          <p className="text-base font-bold text-mq-ink">
            {decoding ? t('decoding') : dragging ? t('dropActive') : t('dropTitle')}
          </p>
          <p className="text-sm text-mq-ink/55">{t('dropHint')}</p>
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      ) : null}

      {payload ? (
        <div className="space-y-6 rounded-2xl border border-mq-ink/10 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
              <Check className="h-3.5 w-3.5" />
              {t('scannedBadge')}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-mq-ink/5 px-2.5 py-1 text-xs font-bold text-mq-ink/70">
              <ScanLine className="h-3.5 w-3.5" />
              {describePayload(payload, t)}
            </span>
          </div>

          <div className="rounded-xl bg-mq-ink/[0.03] px-4 py-3">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-mq-ink/40">
              {t('payloadLabel')}
            </p>
            <p className="break-all text-sm leading-relaxed text-mq-ink/80">{payload}</p>
          </div>

          {canOpen ? (
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              <UrlPhonePreview url={payload.trim()} label={t('clientPreview')} />
              <OgShareCard preview={og} loading={ogLoading} error={ogError} t={t} />
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3">
            {canOpen ? (
              <a
                href={payload.trim()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-mq-ink px-4 py-2.5 text-sm font-bold text-white transition hover:bg-mq-ink/90"
              >
                <ExternalLink className="h-4 w-4" />
                {t('openLink')}
              </a>
            ) : null}
            <button
              type="button"
              onClick={() => void handleCopy()}
              className="inline-flex items-center gap-2 rounded-xl border border-mq-ink/15 bg-white px-4 py-2.5 text-sm font-semibold text-mq-ink transition hover:bg-mq-ink/[0.03]"
            >
              <Copy className="h-4 w-4" />
              {copied ? t('copied') : t('copy')}
            </button>
            <button
              type="button"
              onClick={() => {
                setPayload(null)
                setError(null)
                setOg(null)
                setOgError(null)
                inputRef.current?.click()
              }}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-mq-ink/60 transition hover:text-mq-ink"
            >
              {t('scanAgain')}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

'use client'

import { useEffect, useImperativeHandle, useRef, forwardRef, useState, useCallback, useMemo } from 'react'
import type QRCodeStyling from 'qr-code-styling'
import { AlertTriangle, QrCode, ShieldCheck } from 'lucide-react'

import { assessScanability } from '@/lib/qr/scanability'
import { styleToOptions, type QrStyle } from '@/lib/qr/style'
import { compositeCanvasFrame, compositeSvgFrame } from '@/lib/qr/frames'
import { cn } from '@/lib/utils'

export type QrStyledPreviewHandle = {
  download: (extension: 'png' | 'svg' | 'jpeg' | 'webp', name?: string) => Promise<void>
  getRawData: (extension: 'png' | 'svg' | 'jpeg' | 'webp') => Promise<Blob | null>
}

type Props = {
  data: string
  style: QrStyle
  className?: string
  displaySize?: number
  emptyMessage?: string
  showScanability?: boolean
}

export const QrStyledPreview = forwardRef<QrStyledPreviewHandle, Props>(function QrStyledPreview(
  {
    data,
    style,
    className,
    displaySize = 280,
    emptyMessage = 'Renseignez un contenu pour générer le QR',
    showScanability = true,
  },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const instanceRef = useRef<QRCodeStyling | null>(null)
  const cachedQrSvgRef = useRef<string>('')
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const scan = useMemo(() => assessScanability(style), [style])

  useImperativeHandle(ref, () => ({
    async download(extension, name = 'qrious-qr') {
      if (!instanceRef.current) return

      if (style.frameStyle === 'none') {
        await instanceRef.current.download({ name, extension })
        return
      }

      try {
        if (extension === 'svg') {
          const raw =
            cachedQrSvgRef.current ||
            (await (await instanceRef.current.getRawData('svg') as Blob | null)?.text())
          if (!raw) return
          const composited = compositeSvgFrame(raw, style)
          const blob = new Blob([composited], { type: 'image/svg+xml;charset=utf-8' })
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `${name}.svg`
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          URL.revokeObjectURL(url)
        } else {
          const raw = await instanceRef.current.getRawData('png')
          if (!raw) return
          const canvas = await compositeCanvasFrame(raw as Blob, style)
          const mime = extension === 'jpeg' ? 'image/jpeg' : `image/${extension}`
          const url = canvas.toDataURL(mime)
          const a = document.createElement('a')
          a.href = url
          a.download = `${name}.${extension}`
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
        }
      } catch (err) {
        console.error('Download error:', err)
        setError('Erreur lors du téléchargement.')
      }
    },
    async getRawData(extension) {
      if (!instanceRef.current) return null

      if (style.frameStyle === 'none') {
        const raw = await instanceRef.current.getRawData(extension)
        if (!raw) return null
        if (raw instanceof Blob) return raw
        return new Blob([new Uint8Array(raw as unknown as ArrayBuffer)])
      }

      if (extension === 'svg') {
        const raw =
          cachedQrSvgRef.current ||
          (await (await instanceRef.current.getRawData('svg') as Blob | null)?.text())
        if (!raw) return null
        const composited = compositeSvgFrame(raw, style)
        return new Blob([composited], { type: 'image/svg+xml;charset=utf-8' })
      }

      const raw = await instanceRef.current.getRawData('png')
      if (!raw) return null
      const canvas = await compositeCanvasFrame(raw as Blob, style)
      return await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, `image/${extension}`),
      )
    },
  }))

  const renderFrameOverlay = useCallback(
    (rawQrSvg: string, currentStyle: QrStyle) => {
      if (!containerRef.current || !rawQrSvg) return
      if (currentStyle.frameStyle === 'none') {
        containerRef.current.innerHTML = rawQrSvg
      } else {
        const composited = compositeSvgFrame(rawQrSvg, currentStyle)
        containerRef.current.innerHTML = composited
      }
      const el = containerRef.current.firstElementChild as HTMLElement | null
      if (el) {
        el.style.width = '100%'
        el.style.height = '100%'
        el.style.maxWidth = `${displaySize}px`
        el.style.maxHeight = `${displaySize}px`
      }
    },
    [displaySize],
  )

  const framePropsKey = `${style.frameStyle}-${style.frameText}-${style.frameColor}-${style.frameTextColor}-${style.transparentBackground}-${style.backgroundColor}`

  useEffect(() => {
    if (cachedQrSvgRef.current) {
      renderFrameOverlay(cachedQrSvgRef.current, style)
    }
  }, [framePropsKey, renderFrameOverlay, style])

  const gradientKey = [
    style.dotsGradient?.type,
    style.dotsGradient?.rotation,
    style.dotsGradient?.color1,
    style.dotsGradient?.color2,
    style.backgroundGradient?.type,
    style.backgroundGradient?.rotation,
    style.backgroundGradient?.color1,
    style.backgroundGradient?.color2,
    style.transparentBackground,
  ].join('-')

  const qrOptionsKey = `${data}-${style.dotsType}-${style.dotsColor}-${style.cornersSquareType}-${style.cornersSquareColor}-${style.cornersDotType}-${style.cornersDotColor}-${style.backgroundColor}-${style.logoDataUrl}-${style.logoSize}-${style.logoMargin}-${style.hideBackgroundDots}-${style.errorCorrectionLevel}-${style.shape}-${style.margin}-${gradientKey}`

  useEffect(() => {
    let cancelled = false

    async function setup() {
      if (!data.trim()) {
        instanceRef.current = null
        cachedQrSvgRef.current = ''
        if (containerRef.current) containerRef.current.innerHTML = ''
        setReady(false)
        return
      }

      try {
        const { default: QRCodeStylingCtor } = await import('qr-code-styling')
        if (cancelled) return

        const options = styleToOptions(data, style)
        const finalOptions = {
          ...options,
          type: 'svg' as const,
        }

        if (!instanceRef.current) {
          instanceRef.current = new QRCodeStylingCtor(finalOptions)
        } else {
          instanceRef.current.update(finalOptions)
        }

        const raw = await instanceRef.current.getRawData('svg')
        if (raw && !cancelled) {
          const text = await (raw as Blob).text()
          cachedQrSvgRef.current = text
          if (containerRef.current) {
            renderFrameOverlay(text, style)
          }
          setReady(true)
          setError(null)
        }
      } catch {
        if (!cancelled) {
          setError('Impossible de générer ce QR code.')
          setReady(false)
        }
      }
    }

    const timer = window.setTimeout(setup, 40)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [data, qrOptionsKey, renderFrameOverlay, style])

  const hasData = Boolean(data.trim())

  const scoreColor =
    scan.score === 'excellent' || scan.score === 'good'
      ? 'text-mq-signal-deep bg-mq-signal/15 border-mq-signal/30'
      : scan.score === 'fair'
        ? 'text-amber-800 bg-amber-50 border-amber-200'
        : 'text-mq-coral-deep bg-mq-coral/10 border-mq-coral/30'

  return (
    <div className={cn('relative', className)}>
      <div
        className={cn(
          'mx-auto flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border border-mq-ink/10 p-3 transition-shadow',
          ready && hasData && 'shadow-[0_20px_50px_-28px_rgba(11,18,32,0.45)]',
        )}
        style={{
          maxWidth: displaySize + 24,
          backgroundColor: style.transparentBackground
            ? undefined
            : style.backgroundColor === '#ffffff'
              ? '#f3faf7'
              : style.backgroundColor,
          backgroundImage: style.transparentBackground
            ? 'linear-gradient(45deg,#e8f7f3 25%,transparent 25%),linear-gradient(-45deg,#e8f7f3 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#e8f7f3 75%),linear-gradient(-45deg,transparent 75%,#e8f7f3 75%)'
            : undefined,
          backgroundSize: style.transparentBackground ? '16px 16px' : undefined,
          backgroundPosition: style.transparentBackground
            ? '0 0, 0 8px, 8px -8px, -8px 0'
            : undefined,
        }}
      >
        <div
          ref={containerRef}
          className={cn(
            'flex h-full w-full items-center justify-center [&_canvas]:!h-auto [&_canvas]:!w-full [&_svg]:!h-auto [&_svg]:!w-full',
            !hasData && 'hidden',
          )}
          aria-hidden={!hasData}
        />
        {!hasData ? (
          <div className="text-center text-sm text-mq-muted">
            <QrCode className="mx-auto mb-2 h-10 w-10 opacity-40" />
            {emptyMessage}
          </div>
        ) : null}
      </div>

      {showScanability && hasData && ready ? (
        <div className="mt-3 space-y-2">
          <div
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold',
              scoreColor,
            )}
          >
            {scan.score === 'poor' || scan.score === 'fair' ? (
              <AlertTriangle className="h-3.5 w-3.5" />
            ) : (
              <ShieldCheck className="h-3.5 w-3.5" />
            )}
            Scannabilité {scan.label}
            <span className="opacity-70">· {scan.contrast}:1</span>
          </div>
          {scan.warnings.slice(0, 2).map((w) => (
            <p key={w} className="text-[11px] leading-snug text-mq-muted">
              {w}
            </p>
          ))}
        </div>
      ) : null}

      {error ? <p className="mt-3 text-sm text-mq-coral-deep">{error}</p> : null}
    </div>
  )
})

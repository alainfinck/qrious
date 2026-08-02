'use client'

import { useEffect, useImperativeHandle, useRef, forwardRef, useState, useCallback } from 'react'
import type QRCodeStyling from 'qr-code-styling'
import { QrCode } from 'lucide-react'

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
  /** Display size in the UI (CSS). Actual export uses style.size. */
  displaySize?: number
  emptyMessage?: string
}

export const QrStyledPreview = forwardRef<QrStyledPreviewHandle, Props>(function QrStyledPreview(
  {
    data,
    style,
    className,
    displaySize = 280,
    emptyMessage = 'Renseignez un contenu pour générer le QR',
  },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const instanceRef = useRef<QRCodeStyling | null>(null)
  const cachedQrSvgRef = useRef<string>('')
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useImperativeHandle(ref, () => ({
    async download(extension, name = 'qrious-qr') {
      if (!instanceRef.current) return

      if (style.frameStyle === 'none') {
        await instanceRef.current.download({ name, extension })
        return
      }

      // With frame
      try {
        if (extension === 'svg') {
          const raw = cachedQrSvgRef.current || (await (await instanceRef.current.getRawData('svg') as Blob | null)?.text())
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
          const url = canvas.toDataURL(`image/${extension}`)
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
        const raw = cachedQrSvgRef.current || (await (await instanceRef.current.getRawData('svg') as Blob | null)?.text())
        if (!raw) return null
        const composited = compositeSvgFrame(raw, style)
        return new Blob([composited], { type: 'image/svg+xml;charset=utf-8' })
      } else {
        const raw = await instanceRef.current.getRawData('png')
        if (!raw) return null
        const canvas = await compositeCanvasFrame(raw as Blob, style)
        return await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, `image/${extension}`))
      }
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

  // 1. Instant synchronous frame overlay update when ONLY frame properties change
  const framePropsKey = `${style.frameStyle}-${style.frameText}-${style.frameColor}-${style.frameTextColor}`

  useEffect(() => {
    if (cachedQrSvgRef.current) {
      renderFrameOverlay(cachedQrSvgRef.current, style)
    }
  }, [framePropsKey, renderFrameOverlay, style])

  // 2. Debounced QR code generation when core QR parameters change
  const qrOptionsKey = `${data}-${style.dotsType}-${style.dotsColor}-${style.cornersSquareType}-${style.cornersSquareColor}-${style.cornersDotType}-${style.cornersDotColor}-${style.backgroundColor}-${style.logoDataUrl}-${style.logoSize}-${style.logoMargin}-${style.hideBackgroundDots}-${style.errorCorrectionLevel}-${style.shape}-${style.margin}`

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
  }, [data, qrOptionsKey, renderFrameOverlay])

  const hasData = Boolean(data.trim())

  return (
    <div className={cn('relative', className)}>
      <div
        className="mx-auto flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border border-dashed border-slate-200 p-3"
        style={{
          maxWidth: displaySize + 24,
          backgroundColor:
            style.backgroundColor === '#ffffff' ? '#f8fafc' : style.backgroundColor,
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
          <div className="text-center text-sm text-slate-400">
            <QrCode className="mx-auto mb-2 h-10 w-10 opacity-40" />
            {emptyMessage}
          </div>
        ) : null}
      </div>
      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
    </div>
  )
})

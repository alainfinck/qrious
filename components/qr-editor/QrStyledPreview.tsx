'use client'

import { useEffect, useImperativeHandle, useRef, forwardRef, useState } from 'react'
import type QRCodeStyling from 'qr-code-styling'
import { QrCode } from 'lucide-react'

import { styleToOptions, type QrStyle } from '@/lib/qr/style'
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
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useImperativeHandle(ref, () => ({
    async download(extension, name = 'qrious-qr') {
      if (!instanceRef.current) return
      await instanceRef.current.download({ name, extension })
    },
    async getRawData(extension) {
      if (!instanceRef.current) return null
      const raw = await instanceRef.current.getRawData(extension)
      if (!raw) return null
      if (raw instanceof Blob) return raw
      // Browser builds always return Blob; this branch is for type narrowing only.
      return new Blob([new Uint8Array(raw as unknown as ArrayBuffer)])
    },
  }))

  useEffect(() => {
    let cancelled = false

    async function setup() {
      if (!data.trim()) {
        instanceRef.current = null
        if (containerRef.current) containerRef.current.innerHTML = ''
        setReady(false)
        return
      }

      try {
        const { default: QRCodeStylingCtor } = await import('qr-code-styling')
        if (cancelled || !containerRef.current) return

        const options = styleToOptions(data, style)

        if (!instanceRef.current) {
          containerRef.current.innerHTML = ''
          const qr = new QRCodeStylingCtor(options)
          qr.append(containerRef.current)
          instanceRef.current = qr
        } else {
          instanceRef.current.update(options)
        }

        // Scale canvas/svg to fit display box
        const el = containerRef.current.firstElementChild as HTMLElement | null
        if (el) {
          el.style.width = '100%'
          el.style.height = '100%'
          el.style.maxWidth = `${displaySize}px`
          el.style.maxHeight = `${displaySize}px`
        }

        setReady(true)
        setError(null)
      } catch {
        if (!cancelled) {
          setError('Impossible de générer ce QR code.')
          setReady(false)
        }
      }
    }

    const timer = window.setTimeout(setup, 120)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [data, style, displaySize])

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
      {hasData && !ready && !error ? (
        <p className="mt-2 text-center text-xs text-slate-400">Génération…</p>
      ) : null}
    </div>
  )
})

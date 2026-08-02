import React, { useEffect, useMemo, useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import type QRCodeStyling from 'qr-code-styling'

import { compositeCanvasFrame, compositeSvgFrame } from '../lib/qr-frames'
import { assessScanability } from '../lib/qr-scanability'
import { styleToOptions, type QrStyle } from '../lib/qr-style'
import { colors, spacing } from '../theme/colors'

export type QrExportExtension = 'png' | 'svg' | 'jpeg' | 'webp'

export type QrPreviewHandle = {
  download: (opts: { name: string; extension: QrExportExtension }) => Promise<void>
  getRawData: (extension: QrExportExtension) => Promise<Blob | null>
}

type Props = {
  data: string
  style: QrStyle
  displaySize?: number
  emptyMessage?: string
  showScanability?: boolean
  onReadyInstance?: (handle: QrPreviewHandle | null) => void
}

function triggerDownload(url: string, filename: string) {
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export function QrStyledPreview({
  data,
  style,
  displaySize = 300,
  emptyMessage = 'Renseignez un contenu pour générer le QR',
  showScanability = true,
  onReadyInstance,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const instanceRef = useRef<QRCodeStyling | null>(null)
  const cachedQrSvgRef = useRef('')
  const styleRef = useRef(style)
  styleRef.current = style

  const [error, setError] = useState<string | null>(null)
  const scan = useMemo(() => assessScanability(style), [style])

  const onReadyRef = useRef(onReadyInstance)
  onReadyRef.current = onReadyInstance

  useEffect(() => {
    if (!data.trim()) {
      instanceRef.current = null
      cachedQrSvgRef.current = ''
      if (containerRef.current) containerRef.current.innerHTML = ''
      onReadyRef.current?.(null)
      return
    }

    let cancelled = false

    const handle: QrPreviewHandle = {
      async download({ name, extension }) {
        const current = styleRef.current
        if (!instanceRef.current) return

        if (current.frameStyle === 'none') {
          await instanceRef.current.download({ name, extension })
          return
        }

        if (extension === 'svg') {
          let raw = cachedQrSvgRef.current
          if (!raw) {
            const svgData = await instanceRef.current.getRawData('svg')
            if (svgData instanceof Blob) raw = await svgData.text()
          }
          if (!raw) return
          const composited = compositeSvgFrame(raw, current)
          const blob = new Blob([composited], { type: 'image/svg+xml;charset=utf-8' })
          const url = URL.createObjectURL(blob)
          triggerDownload(url, `${name}.svg`)
          URL.revokeObjectURL(url)
          return
        }

        const raw = await instanceRef.current.getRawData('png')
        if (!raw) return
        const canvas = await compositeCanvasFrame(raw as Blob, current)
        const mime = extension === 'jpeg' ? 'image/jpeg' : `image/${extension}`
        triggerDownload(canvas.toDataURL(mime), `${name}.${extension}`)
      },

      async getRawData(extension) {
        const current = styleRef.current
        if (!instanceRef.current) return null

        if (current.frameStyle === 'none') {
          const raw = await instanceRef.current.getRawData(extension)
          if (!raw) return null
          if (raw instanceof Blob) return raw
          return new Blob([new Uint8Array(raw as unknown as ArrayBuffer)])
        }

        if (extension === 'svg') {
          let raw = cachedQrSvgRef.current
          if (!raw) {
            const svgData = await instanceRef.current.getRawData('svg')
            if (svgData instanceof Blob) raw = await svgData.text()
          }
          if (!raw) return null
          return new Blob([compositeSvgFrame(raw, current)], {
            type: 'image/svg+xml;charset=utf-8',
          })
        }

        const raw = await instanceRef.current.getRawData('png')
        if (!raw) return null
        const canvas = await compositeCanvasFrame(raw as Blob, current)
        return await new Promise<Blob | null>((resolve) =>
          canvas.toBlob(resolve, `image/${extension}`),
        )
      },
    }

    async function render() {
      try {
        const { default: QRCodeStylingCtor } = await import('qr-code-styling')
        if (cancelled || !containerRef.current) return

        const options = styleToOptions(data, { ...style, size: Math.max(displaySize, 512) })
        options.type = 'svg'
        options.width = Math.max(displaySize, 512)
        options.height = Math.max(displaySize, 512)

        if (!instanceRef.current) {
          instanceRef.current = new QRCodeStylingCtor(options)
        } else {
          instanceRef.current.update(options)
        }

        const raw = await instanceRef.current.getRawData('svg')
        if (!raw || cancelled || !containerRef.current) return
        const svgText =
          raw instanceof Blob ? await raw.text() : new TextDecoder().decode(raw as ArrayBuffer)
        cachedQrSvgRef.current = svgText

        containerRef.current.innerHTML =
          style.frameStyle !== 'none' ? compositeSvgFrame(svgText, style) : svgText

        const el = containerRef.current.firstElementChild as HTMLElement | null
        if (el) {
          el.style.width = '100%'
          el.style.height = 'auto'
          el.style.maxWidth = `${displaySize}px`
        }

        onReadyRef.current?.(handle)
        setError(null)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Aperçu indisponible')
        onReadyRef.current?.(null)
      }
    }

    void render()
    return () => {
      cancelled = true
    }
  }, [data, style, displaySize])

  if (!data.trim()) {
    return (
      <View style={[styles.empty, { width: displaySize, height: displaySize }]}>
        <Text style={styles.emptyText}>{emptyMessage}</Text>
      </View>
    )
  }

  return (
    <View style={styles.wrap}>
      <div
        ref={containerRef}
        style={{
          width: displaySize,
          minHeight: displaySize,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {showScanability ? (
        <View
          style={[
            styles.scanBadge,
            scan.score === 'excellent' || scan.score === 'good'
              ? styles.scanGood
              : scan.score === 'fair'
                ? styles.scanFair
                : styles.scanPoor,
          ]}
        >
          <Text style={styles.scanText}>
            Scannabilité {scan.label} · {scan.contrast}:1
          </Text>
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', gap: spacing.sm, alignSelf: 'stretch' },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.slate200,
    backgroundColor: colors.slate50,
    padding: spacing.md,
  },
  emptyText: { color: colors.slate500, textAlign: 'center', fontSize: 13 },
  error: { color: colors.danger, fontSize: 12 },
  scanBadge: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  scanGood: { backgroundColor: '#ECFDF5' },
  scanFair: { backgroundColor: '#FFFBEB' },
  scanPoor: { backgroundColor: '#FEF2F2' },
  scanText: { fontSize: 11, fontWeight: '700', color: colors.slate700 },
})

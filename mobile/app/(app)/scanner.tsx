import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { CameraView, useCameraPermissions, type BarcodeScanningResult } from 'expo-camera'
import * as Clipboard from 'expo-clipboard'
import { useIsFocused } from 'expo-router'
import {
  Check,
  Copy,
  ExternalLink,
  Flashlight,
  FlashlightOff,
  ImagePlus,
  ScanLine,
  Share2,
  Upload,
} from 'lucide-react-native'

import { fetchOgPreview, type OgPreview } from '../../src/api/og-preview'
import { Button, Card } from '../../src/components/ui'
import { decodeQrFromImageFile } from '../../src/lib/decode-qr-image'
import { colors, spacing } from '../../src/theme/colors'

type ScanResult = {
  data: string
  type: string
}

type DragEventLike = {
  preventDefault?: () => void
  stopPropagation?: () => void
  dataTransfer?: { files?: FileList }
}

function isHttpUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function describePayload(data: string): { kind: string; detail?: string } {
  const trimmed = data.trim()
  const upper = trimmed.toUpperCase()

  if (isHttpUrl(trimmed)) return { kind: 'URL', detail: trimmed }
  if (upper.startsWith('WIFI:')) return { kind: 'Wi-Fi', detail: trimmed }
  if (upper.startsWith('BEGIN:VCARD')) return { kind: 'Contact (vCard)' }
  if (upper.startsWith('MATMSG:') || upper.startsWith('MAILTO:')) return { kind: 'E-mail' }
  if (upper.startsWith('TEL:')) return { kind: 'Téléphone', detail: trimmed.slice(4) }
  if (upper.startsWith('SMS:') || upper.startsWith('SMSTO:')) return { kind: 'SMS' }
  if (upper.startsWith('GEO:')) return { kind: 'Géolocalisation' }
  return { kind: 'Texte' }
}

function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

/** Real phone CSS size so responsive pages render as on mobile, then scaled into the frame. */
const MOBILE_VIEWPORT_W = 390
const MOBILE_VIEWPORT_H = 844
/** Status bar + Dynamic Island band inside the bezel (frame px). */
const SAFE_TOP = 44

function UrlPhonePreview({ url }: { url: string }) {
  const screenW = PHONE_W - PHONE_CHROME
  const screenH = PHONE_H - PHONE_CHROME
  const contentH = screenH - SAFE_TOP
  const scale = screenW / MOBILE_VIEWPORT_W
  // Fill the content area under the safe-area band (cover height).
  const viewportH = Math.max(MOBILE_VIEWPORT_H, Math.ceil(contentH / scale))

  return (
    <View style={styles.phoneWrap} accessibilityLabel="Aperçu client de la page">
      <Text style={styles.previewSectionLabel}>Aperçu client</Text>
      <View style={styles.phone}>
        <View style={[styles.phoneSafeArea, { height: SAFE_TOP }]} pointerEvents="none">
          <View style={styles.dynamicIsland} />
        </View>
        <View style={[styles.phoneScreen, { height: contentH }]}>
          {Platform.OS === 'web' ? (
            <View style={[styles.phoneViewport, { width: screenW, height: contentH }]}>
              {/* @ts-expect-error iframe is web-only */}
              <iframe
                title="Aperçu page scannée"
                src={url}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: MOBILE_VIEWPORT_W,
                  height: viewportH,
                  border: 'none',
                  background: '#fff',
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left',
                  display: 'block',
                }}
              />
            </View>
          ) : (
            <View style={styles.phoneFallback}>
              <Text style={styles.phoneFallbackTitle}>Aperçu web</Text>
              <Text style={styles.phoneFallbackText} numberOfLines={4}>
                {url}
              </Text>
              <Text style={styles.phoneFallbackHint}>
                Ouvrez le lien pour voir la page complète.
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

function OgShareCard({
  preview,
  loading,
  error,
}: {
  preview: OgPreview | null
  loading: boolean
  error: string | null
}) {
  return (
    <View style={styles.ogWrap} accessibilityLabel="Aperçu partage social Open Graph">
      <View style={styles.ogHead}>
        <Share2 size={16} color={colors.signal} />
        <Text style={styles.previewSectionLabel}>Partage social (OG)</Text>
      </View>

      {loading ? (
        <View style={styles.ogLoading}>
          <ActivityIndicator color={colors.signal} />
          <Text style={styles.ogLoadingText}>Lecture des métadonnées…</Text>
        </View>
      ) : null}

      {error && !loading ? <Text style={styles.ogError}>{error}</Text> : null}

      {!loading && preview ? (
        <View style={styles.ogCard}>
          {preview.image ? (
            <Image source={{ uri: preview.image }} style={styles.ogImage} resizeMode="cover" />
          ) : (
            <View style={styles.ogImagePlaceholder}>
              <Text style={styles.ogImagePlaceholderText}>Pas d’image OG</Text>
            </View>
          )}
          <View style={styles.ogBody}>
            <Text style={styles.ogSite} numberOfLines={1}>
              {(preview.siteName || hostnameOf(preview.finalUrl || preview.url)).toUpperCase()}
            </Text>
            <Text style={styles.ogTitle} numberOfLines={2}>
              {preview.title || 'Sans titre'}
            </Text>
            {preview.description ? (
              <Text style={styles.ogDesc} numberOfLines={3}>
                {preview.description}
              </Text>
            ) : (
              <Text style={styles.ogDescMuted}>Aucune description Open Graph</Text>
            )}
          </View>
        </View>
      ) : null}

      {!loading && !preview && !error ? (
        <Text style={styles.ogDescMuted}>Aucune métadonnée disponible</Text>
      ) : null}
    </View>
  )
}

function ScanResultView({
  scanned,
  copied,
  onCopy,
  onOpen,
  onReset,
}: {
  scanned: ScanResult
  copied: boolean
  onCopy: () => void
  onOpen: () => void
  onReset: () => void
}) {
  const info = describePayload(scanned.data)
  const canOpen = isHttpUrl(scanned.data)
  const [og, setOg] = useState<OgPreview | null>(null)
  const [ogLoading, setOgLoading] = useState(false)
  const [ogError, setOgError] = useState<string | null>(null)

  useEffect(() => {
    if (!canOpen) {
      setOg(null)
      setOgError(null)
      setOgLoading(false)
      return
    }

    let cancelled = false
    setOgLoading(true)
    setOgError(null)
    setOg(null)

    void fetchOgPreview(scanned.data.trim())
      .then((data) => {
        if (!cancelled) setOg(data)
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setOgError(err instanceof Error ? err.message : 'Métadonnées indisponibles')
        }
      })
      .finally(() => {
        if (!cancelled) setOgLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [canOpen, scanned.data])

  return (
    <ScrollView contentContainerStyle={styles.resultContainer}>
      <Card style={styles.resultCard}>
        <View style={styles.resultBadge}>
          <Check size={16} color={colors.success} />
          <Text style={styles.resultBadgeText}>QR scanné</Text>
        </View>
        <Text style={styles.resultKind}>{info.kind}</Text>
        <Text style={styles.resultData} selectable>
          {scanned.data}
        </Text>

        {canOpen ? (
          <View style={styles.previewsRow}>
            <UrlPhonePreview url={scanned.data.trim()} />
            <OgShareCard preview={og} loading={ogLoading} error={ogError} />
          </View>
        ) : null}

        <View style={styles.resultActions}>
          {canOpen ? (
            <Button
              label="Ouvrir le lien"
              onPress={onOpen}
              icon={<ExternalLink size={16} color="#fff" />}
            />
          ) : null}
          <Button
            label={copied ? 'Copié' : 'Copier'}
            variant="secondary"
            onPress={onCopy}
            icon={<Copy size={16} color={colors.slate700} />}
          />
          <Button label="Scanner à nouveau" variant="ghost" onPress={onReset} />
        </View>
      </Card>
    </ScrollView>
  )
}

function WebImageDropScanner({ onDecoded }: { onDecoded: (data: string) => void }) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [dragging, setDragging] = useState(false)
  const [decoding, setDecoding] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const dragDepth = useRef(0)

  const processFile = useCallback(
    async (file: File | undefined | null) => {
      if (!file) return
      if (!file.type.startsWith('image/')) {
        setError('Choisissez une image (PNG, JPG, WebP…).')
        return
      }

      setDecoding(true)
      setError(null)
      try {
        const data = await decodeQrFromImageFile(file)
        if (!data) {
          setError('Aucun QR code détecté dans cette image.')
          return
        }
        onDecoded(data)
      } catch {
        setError('Impossible de lire cette image.')
      } finally {
        setDecoding(false)
      }
    },
    [onDecoded],
  )

  function openFilePicker() {
    if (typeof document === 'undefined') return
    const existing = inputRef.current
    if (existing) {
      existing.click()
      return
    }
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.style.display = 'none'
    input.onchange = () => {
      const file = input.files?.[0]
      void processFile(file)
      input.remove()
      inputRef.current = null
    }
    document.body.appendChild(input)
    inputRef.current = input
    input.click()
  }

  const dropHandlers = {
    onDragEnter: (e: DragEventLike) => {
      e.preventDefault?.()
      e.stopPropagation?.()
      dragDepth.current += 1
      setDragging(true)
    },
    onDragOver: (e: DragEventLike) => {
      e.preventDefault?.()
      e.stopPropagation?.()
      setDragging(true)
    },
    onDragLeave: (e: DragEventLike) => {
      e.preventDefault?.()
      e.stopPropagation?.()
      dragDepth.current = Math.max(0, dragDepth.current - 1)
      if (dragDepth.current === 0) setDragging(false)
    },
    onDrop: (e: DragEventLike) => {
      e.preventDefault?.()
      e.stopPropagation?.()
      dragDepth.current = 0
      setDragging(false)
      const file = e.dataTransfer?.files?.[0]
      void processFile(file)
    },
  }

  return (
    <View style={styles.webRoot}>
      <View style={styles.webIntro}>
        <View style={styles.fallbackIcon}>
          <ScanLine size={36} color={colors.signal} />
        </View>
        <Text style={styles.fallbackTitle}>Scanner QR</Text>
        <Text style={styles.fallbackText}>
          Déposez une image de QR code pour le décoder, ou choisissez un fichier.
        </Text>
      </View>

      <Pressable
        onPress={openFilePicker}
        disabled={decoding}
        accessibilityRole="button"
        accessibilityLabel="Déposer ou choisir une image de QR code"
        style={({ pressed }) => [
          styles.dropZone,
          dragging && styles.dropZoneActive,
          pressed && !decoding && styles.dropZonePressed,
          decoding && styles.dropZoneDisabled,
        ]}
        // @ts-expect-error web drag-and-drop events (react-native-web)
        {...dropHandlers}
      >
        <View style={[styles.dropIconWrap, dragging && styles.dropIconWrapActive]}>
          {decoding ? (
            <Upload size={28} color={colors.signal} />
          ) : (
            <ImagePlus size={28} color={dragging ? colors.signal : colors.slate500} />
          )}
        </View>
        <Text style={styles.dropTitle}>
          {decoding ? 'Décodage…' : dragging ? 'Relâchez pour décoder' : 'Glissez-déposez une image'}
        </Text>
        <Text style={styles.dropHint}>PNG, JPG, WebP — ou cliquez pour parcourir</Text>
      </Pressable>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Text style={styles.webFootnote}>
        Sur téléphone, utilisez l’app pour scanner avec la caméra.
      </Text>
    </View>
  )
}

export default function ScannerScreen() {
  const isFocused = useIsFocused()
  const [permission, requestPermission] = useCameraPermissions()
  const [scanned, setScanned] = useState<ScanResult | null>(null)
  const [torch, setTorch] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleBarcodeScanned = useCallback((result: BarcodeScanningResult) => {
    if (!result.data) return
    setScanned({ data: result.data, type: result.type })
    setCopied(false)
  }, [])

  const handleImageDecoded = useCallback((data: string) => {
    setScanned({ data, type: 'qr' })
    setCopied(false)
  }, [])

  function resetScan() {
    setScanned(null)
    setCopied(false)
  }

  async function copyData() {
    if (!scanned) return
    await Clipboard.setStringAsync(scanned.data)
    setCopied(true)
  }

  async function openUrl() {
    if (!scanned || !isHttpUrl(scanned.data)) return
    await Linking.openURL(scanned.data)
  }

  if (scanned) {
    return (
      <ScanResultView
        scanned={scanned}
        copied={copied}
        onCopy={() => void copyData()}
        onOpen={() => void openUrl()}
        onReset={resetScan}
      />
    )
  }

  if (Platform.OS === 'web') {
    return <WebImageDropScanner onDecoded={handleImageDecoded} />
  }

  if (!permission) {
    return <View style={styles.loading} />
  }

  if (!permission.granted) {
    return (
      <View style={styles.fallback}>
        <View style={styles.fallbackIcon}>
          <ScanLine size={36} color={colors.signal} />
        </View>
        <Text style={styles.fallbackTitle}>Accès caméra requis</Text>
        <Text style={styles.fallbackText}>
          Autorisez la caméra pour scanner les codes QR avec QRious.
        </Text>
        <Button label="Autoriser la caméra" onPress={() => void requestPermission()} />
      </View>
    )
  }

  return (
    <View style={styles.cameraRoot}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        active={isFocused}
        enableTorch={torch}
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        onBarcodeScanned={handleBarcodeScanned}
      />

      <View style={styles.overlay} pointerEvents="box-none">
        <Text style={styles.hint}>Placez le QR code dans le cadre</Text>

        <View style={styles.frame}>
          <View style={[styles.corner, styles.cornerTL]} />
          <View style={[styles.corner, styles.cornerTR]} />
          <View style={[styles.corner, styles.cornerBL]} />
          <View style={[styles.corner, styles.cornerBR]} />
        </View>

        <Pressable
          onPress={() => setTorch((v) => !v)}
          accessibilityLabel={torch ? 'Éteindre la lampe' : 'Allumer la lampe'}
          style={styles.torchBtn}
        >
          {torch ? (
            <FlashlightOff size={22} color="#fff" />
          ) : (
            <Flashlight size={22} color="#fff" />
          )}
          <Text style={styles.torchLabel}>{torch ? 'Lampe off' : 'Lampe'}</Text>
        </Pressable>
      </View>
    </View>
  )
}

const FRAME = 240
const CORNER = 28
const THICK = 3
/** Outer bezel size (~iPhone proportions). */
const PHONE_W = 300
const PHONE_H = 620
/** borderWidth×2 + padding×2 */
const PHONE_CHROME = 7 * 2 + 3 * 2

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    padding: spacing.xl,
    maxWidth: 420,
    alignSelf: 'center',
    width: '100%',
  },
  loading: { flex: 1, backgroundColor: colors.slate50 },
  fallbackIcon: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: 'rgba(18, 196, 168, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  fallbackTitle: { fontSize: 22, fontWeight: '800', color: colors.ink },
  fallbackText: {
    textAlign: 'center',
    color: colors.slate500,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 8,
  },
  webRoot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
    padding: spacing.xl,
    maxWidth: 560,
    width: '100%',
    alignSelf: 'center',
  },
  webIntro: {
    alignItems: 'center',
    gap: spacing.sm,
    maxWidth: 420,
  },
  dropZone: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: 48,
    paddingHorizontal: spacing.xl,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.slate300,
    backgroundColor: colors.slate50,
  },
  dropZoneActive: {
    borderColor: colors.signal,
    backgroundColor: 'rgba(18, 196, 168, 0.08)',
  },
  dropZonePressed: {
    borderColor: colors.slate400,
    backgroundColor: colors.slate100,
  },
  dropZoneDisabled: {
    opacity: 0.7,
  },
  dropIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.slate200,
    marginBottom: 4,
  },
  dropIconWrapActive: {
    borderColor: 'rgba(18, 196, 168, 0.35)',
    backgroundColor: 'rgba(18, 196, 168, 0.12)',
  },
  dropTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.ink,
    textAlign: 'center',
  },
  dropHint: {
    fontSize: 13,
    color: colors.slate500,
    textAlign: 'center',
  },
  errorText: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  webFootnote: {
    fontSize: 13,
    color: colors.slate400,
    textAlign: 'center',
    marginTop: 4,
  },
  cameraRoot: {
    flex: 1,
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hint: {
    position: 'absolute',
    top: 48,
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 24,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  frame: {
    width: FRAME,
    height: FRAME,
    backgroundColor: 'transparent',
  },
  corner: {
    position: 'absolute',
    width: CORNER,
    height: CORNER,
    borderColor: colors.signal,
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: THICK,
    borderLeftWidth: THICK,
    borderTopLeftRadius: 8,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: THICK,
    borderRightWidth: THICK,
    borderTopRightRadius: 8,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: THICK,
    borderLeftWidth: THICK,
    borderBottomLeftRadius: 8,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: THICK,
    borderRightWidth: THICK,
    borderBottomRightRadius: 8,
  },
  torchBtn: {
    position: 'absolute',
    bottom: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(15, 23, 42, 0.72)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  torchLabel: { color: '#fff', fontWeight: '700', fontSize: 14 },
  resultContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    padding: spacing.lg,
    paddingBottom: 40,
    maxWidth: 960,
    width: '100%',
    alignSelf: 'center',
  },
  resultCard: { gap: spacing.md },
  resultBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(5, 150, 105, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  resultBadgeText: { color: colors.success, fontWeight: '700', fontSize: 13 },
  resultKind: { fontSize: 20, fontWeight: '800', color: colors.ink },
  resultData: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.slate700,
    backgroundColor: colors.slate50,
    padding: 12,
    borderRadius: 10,
    overflow: 'hidden',
  },
  resultActions: { gap: 10, marginTop: 4 },
  previewsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
    alignItems: 'flex-start',
    marginTop: spacing.sm,
  },
  previewSectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.slate700,
    letterSpacing: 0.2,
  },
  phoneWrap: {
    gap: spacing.sm,
    alignItems: 'center',
    minWidth: PHONE_W,
  },
  phone: {
    width: PHONE_W,
    height: PHONE_H,
    borderRadius: 40,
    borderWidth: 7,
    borderColor: '#0F172A',
    backgroundColor: '#0F172A',
    padding: 3,
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOpacity: 0.22,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  phoneSafeArea: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F172A',
    zIndex: 2,
  },
  dynamicIsland: {
    width: 96,
    height: 26,
    borderRadius: 14,
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  phoneScreen: {
    width: '100%',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
    backgroundColor: colors.white,
  },
  phoneViewport: {
    overflow: 'hidden',
    position: 'relative',
  },
  phoneFallback: {
    flex: 1,
    padding: spacing.md,
    gap: spacing.sm,
    justifyContent: 'center',
  },  phoneFallbackTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.ink,
  },
  phoneFallbackText: {
    fontSize: 12,
    lineHeight: 18,
    color: colors.slate600,
  },
  phoneFallbackHint: {
    fontSize: 11,
    color: colors.slate400,
  },
  ogWrap: {
    flex: 1,
    minWidth: 260,
    maxWidth: 420,
    gap: spacing.sm,
  },
  ogHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ogLoading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 20,
  },
  ogLoadingText: {
    fontSize: 13,
    color: colors.slate500,
  },
  ogError: {
    fontSize: 13,
    color: colors.danger,
    fontWeight: '600',
  },
  ogCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.slate200,
    overflow: 'hidden',
    backgroundColor: colors.white,
  },
  ogImage: {
    width: '100%',
    height: 168,
    backgroundColor: colors.slate100,
  },
  ogImagePlaceholder: {
    width: '100%',
    height: 120,
    backgroundColor: colors.slate100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ogImagePlaceholderText: {
    fontSize: 12,
    color: colors.slate400,
    fontWeight: '600',
  },
  ogBody: {
    padding: 14,
    gap: 4,
  },
  ogSite: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.slate400,
    letterSpacing: 0.4,
  },
  ogTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.ink,
    lineHeight: 22,
  },
  ogDesc: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.slate600,
    marginTop: 2,
  },
  ogDescMuted: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.slate400,
    fontStyle: 'italic',
  },
})

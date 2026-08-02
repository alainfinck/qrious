import React, { useCallback, useState } from 'react'
import {
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
  ScanLine,
} from 'lucide-react-native'

import { Button, Card } from '../../src/components/ui'
import { colors, spacing } from '../../src/theme/colors'

type ScanResult = {
  data: string
  type: string
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

  if (Platform.OS === 'web') {
    return (
      <View style={styles.fallback}>
        <View style={styles.fallbackIcon}>
          <ScanLine size={36} color={colors.signal} />
        </View>
        <Text style={styles.fallbackTitle}>Scanner QR</Text>
        <Text style={styles.fallbackText}>
          Le scanner caméra est disponible sur iOS et Android. Ouvrez l’app QRious sur votre
          téléphone pour scanner un code QR.
        </Text>
      </View>
    )
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

  if (scanned) {
    const info = describePayload(scanned.data)
    const canOpen = isHttpUrl(scanned.data)

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

          <View style={styles.resultActions}>
            {canOpen ? (
              <Button
                label="Ouvrir le lien"
                onPress={() => void openUrl()}
                icon={<ExternalLink size={16} color="#fff" />}
              />
            ) : null}
            <Button
              label={copied ? 'Copié' : 'Copier'}
              variant="secondary"
              onPress={() => void copyData()}
              icon={<Copy size={16} color={colors.slate700} />}
            />
            <Button label="Scanner à nouveau" variant="ghost" onPress={resetScan} />
          </View>
        </Card>
      </ScrollView>
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
    justifyContent: 'center',
    padding: spacing.lg,
    paddingBottom: 40,
    maxWidth: 560,
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
})

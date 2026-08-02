import React, { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import QRCode from 'react-native-qrcode-svg'

import { assessScanability } from '../lib/qr-scanability'
import { type QrStyle } from '../lib/qr-style'
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

/** Native fallback — couleurs + logo ; formes avancées via export web. */
export function QrStyledPreview({
  data,
  style,
  displaySize = 300,
  emptyMessage = 'Renseignez un contenu pour générer le QR',
  showScanability = true,
  onReadyInstance,
}: Props) {
  const scan = useMemo(() => assessScanability(style), [style])

  React.useEffect(() => {
    onReadyInstance?.(null)
  }, [onReadyInstance])

  if (!data.trim()) {
    return (
      <View style={[styles.empty, { width: displaySize, height: displaySize }]}>
        <Text style={styles.emptyText}>{emptyMessage}</Text>
      </View>
    )
  }

  return (
    <View style={styles.wrap}>
      <View
        style={[
          styles.nativeBox,
          {
            backgroundColor: style.transparentBackground ? 'transparent' : style.backgroundColor,
            borderRadius: style.shape === 'circle' ? displaySize / 2 : 16,
          },
        ]}
      >
        <QRCode
          value={data}
          size={displaySize - 24}
          color={style.dotsColor || colors.ink}
          backgroundColor={style.transparentBackground ? 'transparent' : style.backgroundColor}
          ecl={style.logoDataUrl ? 'H' : style.errorCorrectionLevel}
          logo={style.logoDataUrl || undefined}
          logoSize={style.logoDataUrl ? (displaySize - 24) * style.logoSize : undefined}
          logoMargin={style.logoMargin}
          logoBackgroundColor={style.backgroundColor}
        />
      </View>
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
          <Text style={styles.scanText}>{scan.label}</Text>
        </View>
      ) : null}
      {style.frameStyle !== 'none' ? (
        <Text style={styles.frameHint}>Cadre « {style.frameStyle} » — rendu complet sur web</Text>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', gap: spacing.sm },
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
  nativeBox: { padding: 12, alignItems: 'center', justifyContent: 'center' },
  frameHint: { fontSize: 11, color: colors.slate400, textAlign: 'center' },
  scanBadge: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  scanGood: { backgroundColor: '#ECFDF5' },
  scanFair: { backgroundColor: '#FFFBEB' },
  scanPoor: { backgroundColor: '#FEF2F2' },
  scanText: { fontSize: 11, fontWeight: '700', color: colors.slate700 },
})

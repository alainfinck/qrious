import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Svg, { Rect } from 'react-native-svg'

export function BrandMark({ size = 32, color = '#FF5C4D' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <Rect x="2" y="2" width="12" height="12" rx="1" stroke={color} strokeWidth="2.2" />
      <Rect x="5.5" y="5.5" width="5" height="5" fill={color} />
      <Rect x="18" y="2" width="12" height="12" rx="1" stroke={color} strokeWidth="2.2" />
      <Rect x="21.5" y="5.5" width="5" height="5" fill={color} />
      <Rect x="2" y="18" width="12" height="12" rx="1" stroke={color} strokeWidth="2.2" />
      <Rect x="5.5" y="21.5" width="5" height="5" fill={color} />
      <Rect x="18" y="18" width="5" height="5" fill={color} />
      <Rect x="25" y="18" width="5" height="5" fill={color} />
      <Rect x="18" y="25" width="5" height="5" fill={color} />
      <Rect x="24" y="24" width="6" height="6" fill={color} />
    </Svg>
  )
}

export function BrandWordmark({
  size = 28,
  color = '#fff',
}: {
  size?: number
  color?: string
}) {
  return (
    <View style={styles.wordmark} accessibilityLabel="QRious">
      <Text
        style={[
          styles.qr,
          { fontSize: size, lineHeight: size * 1.05, color },
        ]}
      >
        QR
      </Text>
      <Text
        style={[
          styles.ious,
          { fontSize: size, lineHeight: size * 1.05, color },
        ]}
      >
        ious
      </Text>
    </View>
  )
}

/** Logo site : QR pixellisé + wordmark — même composition que le header marketing. */
export function BrandLogo({
  size = 28,
  markSize,
  tone = 'dark',
}: {
  size?: number
  markSize?: number
  /** dark = texte blanc (fonds sombres), light = texte encre (fonds clairs) */
  tone?: 'dark' | 'light'
}) {
  const wordColor = tone === 'dark' ? '#fff' : '#0B1220'
  return (
    <View style={styles.logo} accessibilityLabel="QRious">
      <BrandMark size={markSize ?? Math.round(size * 1.15)} />
      <BrandWordmark size={size} color={wordColor} />
    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  wordmark: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  qr: {
    fontWeight: '800',
    letterSpacing: 1.1,
    fontFamily: 'monospace',
  },
  ious: {
    fontWeight: '700',
    letterSpacing: -0.4,
  },
})

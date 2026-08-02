import { effectiveBackgroundColor, type QrStyle } from './style'

export type ScanScore = 'excellent' | 'good' | 'fair' | 'poor'

export type ScanabilityReport = {
  score: ScanScore
  contrast: number
  label: string
  warnings: string[]
}

function parseHex(input: string): { r: number; g: number; b: number } | null {
  const raw = input.trim().toLowerCase()
  if (raw === 'transparent' || raw === 'none') return null

  let hex = raw.replace('#', '')
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((c) => c + c)
      .join('')
  }
  if (hex.length === 8) hex = hex.slice(0, 6)
  if (!/^[0-9a-f]{6}$/.test(hex)) return null

  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
  }
}

function channel(c: number): number {
  const s = c / 255
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
}

function relativeLuminance(hex: string): number | null {
  const rgb = parseHex(hex)
  if (!rgb) return null
  return 0.2126 * channel(rgb.r) + 0.7152 * channel(rgb.g) + 0.0722 * channel(rgb.b)
}

/** WCAG contrast ratio between two hex colors. */
export function contrastRatio(fg: string, bg: string): number | null {
  const L1 = relativeLuminance(fg)
  const L2 = relativeLuminance(bg)
  if (L1 == null || L2 == null) return null
  const lighter = Math.max(L1, L2)
  const darker = Math.min(L1, L2)
  return (lighter + 0.05) / (darker + 0.05)
}

function primaryFg(style: QrStyle): string {
  if (style.dotsGradient) return style.dotsGradient.color1
  return style.dotsColor
}

function primaryBg(style: QrStyle): string {
  if (style.transparentBackground) return '#ffffff'
  if (style.backgroundGradient) return style.backgroundGradient.color1
  return effectiveBackgroundColor(style)
}

/**
 * Heuristic scanability check for print / camera scanners.
 * Not a substitute for a real device scan, but catches common failures.
 */
export function assessScanability(style: QrStyle): ScanabilityReport {
  const warnings: string[] = []
  const fg = primaryFg(style)
  const bg = primaryBg(style)
  const contrast = contrastRatio(fg, bg) ?? 1

  if (style.transparentBackground) {
    warnings.push('Fond transparent : vérifiez le contraste sur le support d’impression.')
  }

  if (style.dotsGradient) {
    const g2 = contrastRatio(style.dotsGradient.color2, bg)
    if (g2 != null && g2 < 3) {
      warnings.push('Une extrémité du dégradé contraste trop peu avec le fond.')
    }
  }

  if (style.logoDataUrl) {
    if (style.logoSize > 0.32) {
      warnings.push('Logo volumineux : risque de lecture difficile hors correction H.')
    }
    if (style.errorCorrectionLevel !== 'H' && !style.logoDataUrl) {
      /* logo forces H via effectiveErrorLevel — noop */
    }
  }

  if (style.margin < 4) {
    warnings.push('Quiet zone trop étroite : laissez au moins 4 px de marge.')
  }

  if (contrast < 2.5) {
    warnings.push('Contraste insuffisant : le QR risque de ne pas scanner.')
  } else if (contrast < 4) {
    warnings.push('Contraste limite : privilégiez un fond clair et des modules sombres.')
  }

  let score: ScanScore
  if (contrast >= 7 && warnings.length === 0) score = 'excellent'
  else if (contrast >= 4.5 && warnings.length <= 1) score = 'good'
  else if (contrast >= 3) score = 'fair'
  else score = 'poor'

  const label =
    score === 'excellent'
      ? 'Excellent'
      : score === 'good'
        ? 'Bon'
        : score === 'fair'
          ? 'Correct'
          : 'Faible'

  return {
    score,
    contrast: Math.round(contrast * 10) / 10,
    label,
    warnings,
  }
}

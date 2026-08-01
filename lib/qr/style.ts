import type { Options as QrCodeStylingOptions } from 'qr-code-styling'

export type QrDotStyle =
  | 'square'
  | 'rounded'
  | 'dots'
  | 'classy'
  | 'classy-rounded'
  | 'extra-rounded'

export type QrCornerSquareStyle =
  | 'square'
  | 'dot'
  | 'extra-rounded'
  | 'rounded'
  | 'dots'
  | 'classy'
  | 'classy-rounded'

export type QrCornerDotStyle =
  | 'square'
  | 'dot'
  | 'rounded'
  | 'dots'
  | 'classy'
  | 'classy-rounded'
  | 'extra-rounded'

export type QrErrorLevel = 'L' | 'M' | 'Q' | 'H'
export type QrShape = 'square' | 'circle'

/** Serializable style config — shared by public editor & admin. */
export interface QrStyle {
  size: number
  margin: number
  errorCorrectionLevel: QrErrorLevel
  shape: QrShape
  dotsType: QrDotStyle
  dotsColor: string
  cornersSquareType: QrCornerSquareStyle
  /** Empty string = inherit dotsColor */
  cornersSquareColor: string
  cornersDotType: QrCornerDotStyle
  /** Empty string = inherit dotsColor */
  cornersDotColor: string
  backgroundColor: string
  logoDataUrl: string | null
  /** Relative logo size (0.15–0.4) */
  logoSize: number
  logoMargin: number
  hideBackgroundDots: boolean
}

export const DEFAULT_QR_STYLE: QrStyle = {
  size: 512,
  margin: 12,
  errorCorrectionLevel: 'M',
  shape: 'square',
  dotsType: 'square',
  dotsColor: '#0f172a',
  cornersSquareType: 'square',
  cornersSquareColor: '',
  cornersDotType: 'square',
  cornersDotColor: '',
  backgroundColor: '#ffffff',
  logoDataUrl: null,
  logoSize: 0.28,
  logoMargin: 6,
  hideBackgroundDots: true,
}

export const DOT_STYLE_OPTIONS: { value: QrDotStyle; label: string }[] = [
  { value: 'square', label: 'Carrés' },
  { value: 'rounded', label: 'Arrondis' },
  { value: 'extra-rounded', label: 'Très arrondis' },
  { value: 'dots', label: 'Points' },
  { value: 'classy', label: 'Classy' },
  { value: 'classy-rounded', label: 'Classy arrondi' },
]

export const CORNER_SQUARE_OPTIONS: { value: QrCornerSquareStyle; label: string }[] = [
  { value: 'square', label: 'Carré' },
  { value: 'extra-rounded', label: 'Arrondi' },
  { value: 'dot', label: 'Cercle' },
  { value: 'rounded', label: 'Soft' },
  { value: 'dots', label: 'Points' },
  { value: 'classy', label: 'Classy' },
  { value: 'classy-rounded', label: 'Classy arrondi' },
]

export const CORNER_DOT_OPTIONS: { value: QrCornerDotStyle; label: string }[] = [
  { value: 'square', label: 'Carré' },
  { value: 'dot', label: 'Cercle' },
  { value: 'rounded', label: 'Arrondi' },
  { value: 'dots', label: 'Points' },
  { value: 'classy', label: 'Classy' },
  { value: 'classy-rounded', label: 'Classy arrondi' },
  { value: 'extra-rounded', label: 'Très arrondi' },
]

export const FG_PRESETS = ['#0f172a', '#1e3a5f', '#0f766e', '#b45309', '#9f1239', '#5b21b6']
export const BG_PRESETS = ['#ffffff', '#f8fafc', '#fef3c7', '#ecfeff', '#fce7f3', '#f1f5f9']

export const SIZE_OPTIONS = [256, 512, 1024, 2048] as const

export function effectiveErrorLevel(style: QrStyle): QrErrorLevel {
  return style.logoDataUrl ? 'H' : style.errorCorrectionLevel
}

export function styleToOptions(data: string, style: QrStyle): QrCodeStylingOptions {
  const dotsColor = style.dotsColor
  const cornerSquareColor = style.cornersSquareColor || dotsColor
  const cornerDotColor = style.cornersDotColor || dotsColor

  return {
    width: style.size,
    height: style.size,
    type: 'canvas',
    shape: style.shape,
    data,
    margin: style.margin,
    qrOptions: {
      errorCorrectionLevel: effectiveErrorLevel(style),
    },
    dotsOptions: {
      type: style.dotsType,
      color: dotsColor,
    },
    cornersSquareOptions: {
      type: style.cornersSquareType,
      color: cornerSquareColor,
    },
    cornersDotOptions: {
      type: style.cornersDotType,
      color: cornerDotColor,
    },
    backgroundOptions: {
      color: style.backgroundColor,
    },
    image: style.logoDataUrl || '',
    imageOptions: {
      hideBackgroundDots: style.hideBackgroundDots,
      imageSize: style.logoSize,
      margin: style.logoMargin,
      crossOrigin: 'anonymous',
    },
  }
}

export function mergeQrStyle(partial: Partial<QrStyle>, base: QrStyle = DEFAULT_QR_STYLE): QrStyle {
  return { ...base, ...partial }
}

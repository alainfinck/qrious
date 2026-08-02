import type { Options as QrCodeStylingOptions, Gradient } from 'qr-code-styling'

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
export type QrFrameStyle =
  | 'none'
  | 'bottom-text'
  | 'top-text'
  | 'balloon'
  | 'phone-mockup'
  | 'badge'
  | 'polaroid'
  | 'simple-border'
  | 'circle-frame'
  | 'ticket'
  | 'ribbon'
  | 'arrow'

export type QrGradientType = 'linear' | 'radial'

/** Two-stop gradient used by dots / background. */
export interface QrGradient {
  type: QrGradientType
  /** Degrees — used for linear gradients. */
  rotation: number
  color1: string
  color2: string
}

/** Serializable style config — shared by public editor & admin. */
export interface QrStyle {
  size: number
  margin: number
  errorCorrectionLevel: QrErrorLevel
  shape: QrShape
  dotsType: QrDotStyle
  dotsColor: string
  /** When set, overrides solid dotsColor. */
  dotsGradient: QrGradient | null
  cornersSquareType: QrCornerSquareStyle
  /** Empty string = inherit dotsColor */
  cornersSquareColor: string
  cornersDotType: QrCornerDotStyle
  /** Empty string = inherit dotsColor */
  cornersDotColor: string
  backgroundColor: string
  /** When set, overrides solid backgroundColor. */
  backgroundGradient: QrGradient | null
  /** Export with alpha channel (PNG/SVG). */
  transparentBackground: boolean
  logoDataUrl: string | null
  /** Relative logo size (0.15–0.4) */
  logoSize: number
  logoMargin: number
  hideBackgroundDots: boolean

  // Frame settings
  frameStyle: QrFrameStyle
  frameText: string
  frameColor: string
  frameTextColor: string
}

export const DEFAULT_QR_STYLE: QrStyle = {
  size: 1024,
  margin: 12,
  errorCorrectionLevel: 'M',
  shape: 'square',
  dotsType: 'rounded',
  dotsColor: '#0b1220',
  dotsGradient: null,
  cornersSquareType: 'extra-rounded',
  cornersSquareColor: '',
  cornersDotType: 'dot',
  cornersDotColor: '',
  backgroundColor: '#ffffff',
  backgroundGradient: null,
  transparentBackground: false,
  logoDataUrl: null,
  logoSize: 0.28,
  logoMargin: 6,
  hideBackgroundDots: true,

  frameStyle: 'none',
  frameText: 'SCAN ME',
  frameColor: '#0b1220',
  frameTextColor: '#ffffff',
}

export const DOT_STYLE_OPTIONS: { value: QrDotStyle; label: string }[] = [
  { value: 'square', label: 'Carrés' },
  { value: 'rounded', label: 'Arrondis' },
  { value: 'extra-rounded', label: 'Fluides' },
  { value: 'dots', label: 'Points' },
  { value: 'classy', label: 'Classy' },
  { value: 'classy-rounded', label: 'Classy+' },
]

export const CORNER_SQUARE_OPTIONS: { value: QrCornerSquareStyle; label: string }[] = [
  { value: 'square', label: 'Carré' },
  { value: 'extra-rounded', label: 'Arrondi' },
  { value: 'dot', label: 'Cercle' },
  { value: 'rounded', label: 'Soft' },
  { value: 'dots', label: 'Points' },
  { value: 'classy', label: 'Classy' },
  { value: 'classy-rounded', label: 'Classy+' },
]

export const CORNER_DOT_OPTIONS: { value: QrCornerDotStyle; label: string }[] = [
  { value: 'square', label: 'Carré' },
  { value: 'dot', label: 'Cercle' },
  { value: 'rounded', label: 'Arrondi' },
  { value: 'dots', label: 'Points' },
  { value: 'classy', label: 'Classy' },
  { value: 'classy-rounded', label: 'Classy+' },
  { value: 'extra-rounded', label: 'Fluide' },
]

/** Brand-aligned foreground presets */
export const FG_PRESETS = [
  '#0b1220',
  '#152033',
  '#0a8f7a',
  '#12c4a8',
  '#e84435',
  '#ff5c4d',
  '#1e3a5f',
  '#3dbbff',
]

export const BG_PRESETS = [
  '#ffffff',
  '#f3faf7',
  '#e8f7f3',
  '#fff8eb',
  '#fff1ee',
  '#eef8ff',
  '#0b1220',
  '#152033',
]

export const SIZE_OPTIONS = [256, 512, 1024, 2048] as const

export type QrStyleTemplate = {
  id: string
  name: string
  description: string
  /** Two colors for the template chip preview */
  swatch: [string, string]
  style: Partial<QrStyle>
}

export const STYLE_TEMPLATES: QrStyleTemplate[] = [
  {
    id: 'classic',
    name: 'Classique',
    description: 'Noir sur blanc, scannable partout',
    swatch: ['#0b1220', '#ffffff'],
    style: {
      dotsType: 'square',
      dotsColor: '#0b1220',
      dotsGradient: null,
      cornersSquareType: 'square',
      cornersSquareColor: '',
      cornersDotType: 'square',
      cornersDotColor: '',
      backgroundColor: '#ffffff',
      backgroundGradient: null,
      transparentBackground: false,
      shape: 'square',
      frameStyle: 'none',
    },
  },
  {
    id: 'signal',
    name: 'Signal',
    description: 'Teal QRious, modules arrondis',
    swatch: ['#0a8f7a', '#f3faf7'],
    style: {
      dotsType: 'rounded',
      dotsColor: '#0a8f7a',
      dotsGradient: null,
      cornersSquareType: 'extra-rounded',
      cornersSquareColor: '#0b1220',
      cornersDotType: 'dot',
      cornersDotColor: '#12c4a8',
      backgroundColor: '#f3faf7',
      backgroundGradient: null,
      transparentBackground: false,
      shape: 'square',
      frameStyle: 'none',
    },
  },
  {
    id: 'ink',
    name: 'Ink',
    description: 'Blanc sur encre sombre',
    swatch: ['#12c4a8', '#0b1220'],
    style: {
      dotsType: 'extra-rounded',
      dotsColor: '#e8f7f3',
      dotsGradient: null,
      cornersSquareType: 'extra-rounded',
      cornersSquareColor: '#12c4a8',
      cornersDotType: 'dot',
      cornersDotColor: '#12c4a8',
      backgroundColor: '#0b1220',
      backgroundGradient: null,
      transparentBackground: false,
      shape: 'square',
      frameStyle: 'none',
    },
  },
  {
    id: 'coral',
    name: 'Coral',
    description: 'Accent chaud, énergie print',
    swatch: ['#e84435', '#fff1ee'],
    style: {
      dotsType: 'classy-rounded',
      dotsColor: '#e84435',
      dotsGradient: null,
      cornersSquareType: 'extra-rounded',
      cornersSquareColor: '#0b1220',
      cornersDotType: 'dot',
      cornersDotColor: '#ff5c4d',
      backgroundColor: '#fff1ee',
      backgroundGradient: null,
      transparentBackground: false,
      shape: 'square',
      frameStyle: 'none',
    },
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Dégradé coral → soleil',
    swatch: ['#ff5c4d', '#ffc53d'],
    style: {
      dotsType: 'rounded',
      dotsColor: '#ff5c4d',
      dotsGradient: {
        type: 'linear',
        rotation: 135,
        color1: '#ff5c4d',
        color2: '#ffc53d',
      },
      cornersSquareType: 'extra-rounded',
      cornersSquareColor: '#0b1220',
      cornersDotType: 'dot',
      cornersDotColor: '#e84435',
      backgroundColor: '#ffffff',
      backgroundGradient: null,
      transparentBackground: false,
      shape: 'square',
      frameStyle: 'none',
    },
  },
  {
    id: 'ocean',
    name: 'Océan',
    description: 'Dégradé signal → ciel',
    swatch: ['#0a8f7a', '#3dbbff'],
    style: {
      dotsType: 'dots',
      dotsColor: '#0a8f7a',
      dotsGradient: {
        type: 'linear',
        rotation: 45,
        color1: '#0a8f7a',
        color2: '#3dbbff',
      },
      cornersSquareType: 'dot',
      cornersSquareColor: '#0b1220',
      cornersDotType: 'dot',
      cornersDotColor: '#12c4a8',
      backgroundColor: '#eef8ff',
      backgroundGradient: null,
      transparentBackground: false,
      shape: 'square',
      frameStyle: 'none',
    },
  },
  {
    id: 'radial-glow',
    name: 'Radial',
    description: 'Dégradé radial ink → signal',
    swatch: ['#0b1220', '#12c4a8'],
    style: {
      dotsType: 'classy',
      dotsColor: '#0b1220',
      dotsGradient: {
        type: 'radial',
        rotation: 0,
        color1: '#0b1220',
        color2: '#12c4a8',
      },
      cornersSquareType: 'classy-rounded',
      cornersSquareColor: '#0b1220',
      cornersDotType: 'classy',
      cornersDotColor: '#0a8f7a',
      backgroundColor: '#ffffff',
      backgroundGradient: null,
      transparentBackground: false,
      shape: 'square',
      frameStyle: 'none',
    },
  },
  {
    id: 'circle-badge',
    name: 'Badge',
    description: 'QR rond + cadre badge',
    swatch: ['#0b1220', '#12c4a8'],
    style: {
      dotsType: 'rounded',
      dotsColor: '#0b1220',
      dotsGradient: null,
      cornersSquareType: 'extra-rounded',
      cornersSquareColor: '',
      cornersDotType: 'dot',
      cornersDotColor: '',
      backgroundColor: '#ffffff',
      backgroundGradient: null,
      transparentBackground: false,
      shape: 'circle',
      frameStyle: 'badge',
      frameText: 'SCAN ME',
      frameColor: '#0b1220',
      frameTextColor: '#ffffff',
    },
  },
  {
    id: 'polaroid',
    name: 'Polaroid',
    description: 'Cadre photo + CTA',
    swatch: ['#152033', '#f3faf7'],
    style: {
      dotsType: 'extra-rounded',
      dotsColor: '#152033',
      dotsGradient: null,
      cornersSquareType: 'rounded',
      cornersSquareColor: '#0a8f7a',
      cornersDotType: 'rounded',
      cornersDotColor: '#12c4a8',
      backgroundColor: '#ffffff',
      backgroundGradient: null,
      transparentBackground: false,
      shape: 'square',
      frameStyle: 'polaroid',
      frameText: 'SCANNEZ',
      frameColor: '#f3faf7',
      frameTextColor: '#0b1220',
    },
  },
  {
    id: 'soft-mint',
    name: 'Menthe',
    description: 'Fond mist, modules fluides',
    swatch: ['#0a8f7a', '#e8f7f3'],
    style: {
      dotsType: 'extra-rounded',
      dotsColor: '#0a8f7a',
      dotsGradient: null,
      cornersSquareType: 'extra-rounded',
      cornersSquareColor: '#0b1220',
      cornersDotType: 'extra-rounded',
      cornersDotColor: '#12c4a8',
      backgroundColor: '#e8f7f3',
      backgroundGradient: null,
      transparentBackground: false,
      shape: 'square',
      frameStyle: 'simple-border',
      frameText: 'OUVRIR',
      frameColor: '#0a8f7a',
      frameTextColor: '#ffffff',
    },
  },
]

function toLibraryGradient(g: QrGradient): Gradient {
  return {
    type: g.type,
    rotation: (g.rotation * Math.PI) / 180,
    colorStops: [
      { offset: 0, color: g.color1 },
      { offset: 1, color: g.color2 },
    ],
  }
}

export function effectiveErrorLevel(style: QrStyle): QrErrorLevel {
  return style.logoDataUrl ? 'H' : style.errorCorrectionLevel
}

export function effectiveBackgroundColor(style: QrStyle): string {
  if (style.transparentBackground) return 'transparent'
  return style.backgroundColor
}

export function styleToOptions(data: string, style: QrStyle): QrCodeStylingOptions {
  const dotsColor = style.dotsColor
  const cornerSquareColor = style.cornersSquareColor || dotsColor
  const cornerDotColor = style.cornersDotColor || dotsColor
  const bg = effectiveBackgroundColor(style)

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
    dotsOptions: style.dotsGradient
      ? {
          type: style.dotsType,
          gradient: toLibraryGradient(style.dotsGradient),
        }
      : {
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
    backgroundOptions: style.backgroundGradient && !style.transparentBackground
      ? {
          gradient: toLibraryGradient(style.backgroundGradient),
        }
      : {
          color: bg,
        },
    image: style.logoDataUrl || '',
    imageOptions: {
      hideBackgroundDots: style.hideBackgroundDots,
      imageSize: style.logoSize,
      margin: style.logoMargin,
      crossOrigin: 'anonymous',
      saveAsBlob: true,
    },
  }
}

export function applyTemplate(template: QrStyleTemplate, base: QrStyle = DEFAULT_QR_STYLE): QrStyle {
  return { ...base, ...template.style }
}

export function mergeQrStyle(partial: Partial<QrStyle>, base: QrStyle = DEFAULT_QR_STYLE): QrStyle {
  return { ...base, ...partial }
}

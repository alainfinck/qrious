import { QrFrameStyle, QrStyle } from './style'

export interface FrameDefinition {
  viewBox: string
  width: number
  height: number
  qrArea: { x: number; y: number; width: number; height: number }
  renderSvg: (style: QrStyle) => string
}

const safeText = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export const FRAMES: Record<Exclude<QrFrameStyle, 'none'>, FrameDefinition> = {
  'bottom-text': {
    viewBox: '0 0 1000 1200',
    width: 1000,
    height: 1200,
    qrArea: { x: 80, y: 80, width: 840, height: 840 },
    renderSvg: (style) => `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1200" width="100%" height="100%">
        <rect x="0" y="0" width="1000" height="1200" rx="80" fill="${style.frameColor}" />
        <rect x="50" y="50" width="900" height="900" rx="45" fill="${style.backgroundColor}" />
        <text x="500" y="1060" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="90" fill="${style.frameTextColor}" text-anchor="middle" dominant-baseline="middle">
          ${safeText(style.frameText)}
        </text>
      </svg>
    `,
  },
  'top-text': {
    viewBox: '0 0 1000 1200',
    width: 1000,
    height: 1200,
    qrArea: { x: 80, y: 280, width: 840, height: 840 },
    renderSvg: (style) => `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1200" width="100%" height="100%">
        <rect x="0" y="0" width="1000" height="1200" rx="80" fill="${style.frameColor}" />
        <rect x="50" y="250" width="900" height="900" rx="45" fill="${style.backgroundColor}" />
        <text x="500" y="140" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="90" fill="${style.frameTextColor}" text-anchor="middle" dominant-baseline="middle">
          ${safeText(style.frameText)}
        </text>
      </svg>
    `,
  },
  balloon: {
    viewBox: '0 0 1000 1350',
    width: 1000,
    height: 1350,
    qrArea: { x: 80, y: 280, width: 840, height: 840 },
    renderSvg: (style) => `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1350" width="100%" height="100%">
        <path d="M 0 80 Q 0 0 80 0 L 920 0 Q 1000 0 1000 80 L 1000 1100 Q 1000 1180 920 1180 L 620 1180 L 500 1340 L 380 1180 L 80 1180 Q 0 1180 0 1100 Z" fill="${style.frameColor}" />
        <rect x="50" y="250" width="900" height="900" rx="45" fill="${style.backgroundColor}" />
        <text x="500" y="140" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="90" fill="${style.frameTextColor}" text-anchor="middle" dominant-baseline="middle">
          ${safeText(style.frameText)}
        </text>
      </svg>
    `,
  },
  'phone-mockup': {
    viewBox: '0 0 1000 1600',
    width: 1000,
    height: 1600,
    qrArea: { x: 100, y: 400, width: 800, height: 800 },
    renderSvg: (style) => `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1600" width="100%" height="100%">
        <rect x="0" y="0" width="1000" height="1600" rx="120" fill="${style.frameColor}" />
        <rect x="360" y="35" width="280" height="35" rx="18" fill="${style.frameTextColor}" opacity="0.3" />
        <rect x="40" y="100" width="920" height="1420" rx="80" fill="${style.backgroundColor}" />
        <rect x="150" y="200" width="700" height="120" rx="60" fill="${style.frameColor}" />
        <text x="500" y="260" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="65" fill="${style.frameTextColor}" text-anchor="middle" dominant-baseline="middle">
          ${safeText(style.frameText)}
        </text>
      </svg>
    `,
  },
  badge: {
    viewBox: '0 0 1000 1350',
    width: 1000,
    height: 1350,
    qrArea: { x: 80, y: 220, width: 840, height: 840 },
    renderSvg: (style) => `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1350" width="100%" height="100%">
        <circle cx="500" cy="70" r="32" fill="${style.frameTextColor}" opacity="0.5" />
        <rect x="0" y="140" width="1000" height="1210" rx="70" fill="${style.frameColor}" />
        <rect x="50" y="190" width="900" height="900" rx="45" fill="${style.backgroundColor}" />
        <text x="500" y="1205" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="85" fill="${style.frameTextColor}" text-anchor="middle" dominant-baseline="middle">
          ${safeText(style.frameText)}
        </text>
      </svg>
    `,
  },
  polaroid: {
    viewBox: '0 0 1000 1300',
    width: 1000,
    height: 1300,
    qrArea: { x: 90, y: 90, width: 820, height: 820 },
    renderSvg: (style) => `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1300" width="100%" height="100%">
        <rect x="0" y="0" width="1000" height="1300" rx="40" fill="${style.frameColor}" />
        <rect x="60" y="60" width="880" height="880" rx="20" fill="${style.backgroundColor}" />
        <text x="500" y="1110" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="85" fill="${style.frameTextColor}" text-anchor="middle" dominant-baseline="middle">
          ${safeText(style.frameText)}
        </text>
      </svg>
    `,
  },
  'simple-border': {
    viewBox: '0 0 1000 1150',
    width: 1000,
    height: 1150,
    qrArea: { x: 60, y: 60, width: 880, height: 880 },
    renderSvg: (style) => `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1150" width="100%" height="100%">
        <rect x="20" y="20" width="960" height="1110" rx="50" fill="none" stroke="${style.frameColor}" stroke-width="40" />
        <rect x="40" y="40" width="920" height="920" rx="30" fill="${style.backgroundColor}" />
        <rect x="200" y="990" width="600" height="120" rx="60" fill="${style.frameColor}" />
        <text x="500" y="1050" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="65" fill="${style.frameTextColor}" text-anchor="middle" dominant-baseline="middle">
          ${safeText(style.frameText)}
        </text>
      </svg>
    `,
  },
  'circle-frame': {
    viewBox: '0 0 1000 1250',
    width: 1000,
    height: 1250,
    qrArea: { x: 140, y: 140, width: 720, height: 720 },
    renderSvg: (style) => `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1250" width="100%" height="100%">
        <circle cx="500" cy="500" r="480" fill="${style.frameColor}" />
        <circle cx="500" cy="500" r="400" fill="${style.backgroundColor}" />
        <rect x="150" y="970" width="700" height="150" rx="75" fill="${style.frameColor}" />
        <text x="500" y="1045" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="75" fill="${style.frameTextColor}" text-anchor="middle" dominant-baseline="middle">
          ${safeText(style.frameText)}
        </text>
      </svg>
    `,
  },
  ticket: {
    viewBox: '0 0 1000 1250',
    width: 1000,
    height: 1250,
    qrArea: { x: 90, y: 90, width: 820, height: 820 },
    renderSvg: (style) => `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1250" width="100%" height="100%">
        <path d="M 0 60 Q 0 0 60 0 L 940 0 Q 1000 0 1000 60 L 1000 550 C 930 550 930 650 1000 650 L 1000 1190 Q 1000 1250 940 1250 L 60 1250 Q 0 1250 0 1190 L 0 650 C 70 650 70 550 0 550 Z" fill="${style.frameColor}" />
        <rect x="60" y="60" width="880" height="880" rx="30" fill="${style.backgroundColor}" />
        <text x="500" y="1070" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="85" fill="${style.frameTextColor}" text-anchor="middle" dominant-baseline="middle">
          ${safeText(style.frameText)}
        </text>
      </svg>
    `,
  },
  ribbon: {
    viewBox: '0 0 1000 1300',
    width: 1000,
    height: 1300,
    qrArea: { x: 80, y: 230, width: 840, height: 840 },
    renderSvg: (style) => `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1300" width="100%" height="100%">
        <rect x="40" y="190" width="920" height="920" rx="60" fill="${style.frameColor}" />
        <rect x="80" y="230" width="840" height="840" rx="40" fill="${style.backgroundColor}" />
        <path d="M 100 70 L 900 70 L 850 150 L 900 230 L 100 230 L 150 150 Z" fill="${style.frameColor}" />
        <text x="500" y="150" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="80" fill="${style.frameTextColor}" text-anchor="middle" dominant-baseline="middle">
          ${safeText(style.frameText)}
        </text>
      </svg>
    `,
  },
  arrow: {
    viewBox: '0 0 1000 1350',
    width: 1000,
    height: 1350,
    qrArea: { x: 80, y: 80, width: 840, height: 840 },
    renderSvg: (style) => `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1350" width="100%" height="100%">
        <rect x="0" y="0" width="1000" height="1000" rx="70" fill="${style.frameColor}" />
        <rect x="50" y="50" width="900" height="900" rx="45" fill="${style.backgroundColor}" />
        <path d="M 350 1000 L 650 1000 L 650 1140 L 780 1140 L 500 1340 L 220 1140 L 350 1140 Z" fill="${style.frameColor}" />
        <text x="500" y="1070" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="60" fill="${style.frameTextColor}" text-anchor="middle" dominant-baseline="middle">
          ${safeText(style.frameText)}
        </text>
      </svg>
    `,
  },
}

/**
 * Composite a generated QR SVG (string) with the selected frame.
 */
export function compositeSvgFrame(qrSvgContent: string, style: QrStyle): string {
  if (style.frameStyle === 'none') {
    return qrSvgContent
  }

  const frameDef = FRAMES[style.frameStyle]
  if (!frameDef) return qrSvgContent

  const frameSvg = frameDef.renderSvg(style)
  const { x, y, width: qrW, height: qrH } = frameDef.qrArea

  const viewBoxMatch = qrSvgContent.match(/viewBox=["']([^"']+)["']/)
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 512 512'

  const innerSvg = qrSvgContent.replace(
    /^[\s\S]*?<svg[^>]*>/i,
    `<svg x="${x}" y="${y}" width="${qrW}" height="${qrH}" viewBox="${viewBox}" preserveAspectRatio="xMidYMid meet">`,
  )

  return frameSvg.replace('</svg>', `\n${innerSvg}\n</svg>`)
}

/**
 * Composite a generated QR Image (Blob or Data URL) with the selected frame onto a new Canvas.
 */
export async function compositeCanvasFrame(
  qrBlobOrUrl: Blob | string,
  style: QrStyle,
): Promise<HTMLCanvasElement> {
  const finalCanvas = document.createElement('canvas')
  if (style.frameStyle === 'none') {
    const img = new Image()
    const src = typeof qrBlobOrUrl === 'string' ? qrBlobOrUrl : URL.createObjectURL(qrBlobOrUrl)
    await new Promise((resolve, reject) => {
      img.onload = resolve
      img.onerror = reject
      img.src = src
    })
    if (typeof qrBlobOrUrl !== 'string') URL.revokeObjectURL(src)
    finalCanvas.width = img.width
    finalCanvas.height = img.height
    finalCanvas.getContext('2d')?.drawImage(img, 0, 0)
    return finalCanvas
  }

  const frameDef = FRAMES[style.frameStyle]
  if (!frameDef) return finalCanvas

  const frameSvgStr = frameDef.renderSvg(style)
  const frameImg = new Image()
  const frameSvgBlob = new Blob([frameSvgStr], { type: 'image/svg+xml;charset=utf-8' })
  const frameSvgUrl = URL.createObjectURL(frameSvgBlob)

  const qrImg = new Image()
  const qrSrc = typeof qrBlobOrUrl === 'string' ? qrBlobOrUrl : URL.createObjectURL(qrBlobOrUrl)

  await Promise.all([
    new Promise((resolve, reject) => {
      frameImg.onload = resolve
      frameImg.onerror = reject
      frameImg.src = frameSvgUrl
    }),
    new Promise((resolve, reject) => {
      qrImg.onload = resolve
      qrImg.onerror = reject
      qrImg.src = qrSrc
    }),
  ])

  URL.revokeObjectURL(frameSvgUrl)
  if (typeof qrBlobOrUrl !== 'string') URL.revokeObjectURL(qrSrc)

  const scale = style.size / frameDef.qrArea.width

  finalCanvas.width = frameDef.width * scale
  finalCanvas.height = frameDef.height * scale

  const ctx = finalCanvas.getContext('2d')
  if (!ctx) return finalCanvas

  ctx.drawImage(frameImg, 0, 0, finalCanvas.width, finalCanvas.height)

  const qrX = frameDef.qrArea.x * scale
  const qrY = frameDef.qrArea.y * scale
  const qrW = frameDef.qrArea.width * scale
  const qrH = frameDef.qrArea.height * scale

  ctx.drawImage(qrImg, qrX, qrY, qrW, qrH)

  return finalCanvas
}

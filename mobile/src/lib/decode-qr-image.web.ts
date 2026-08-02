import jsQR from 'jsqr'

const MAX_EDGE = 1600

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Impossible de charger l’image'))
    img.src = src
  })
}

/**
 * Décode un QR code depuis un fichier image (web).
 * Retourne le payload texte, ou `null` si aucun QR n’est détecté.
 */
export async function decodeQrFromImageFile(file: Blob): Promise<string | null> {
  const objectUrl = URL.createObjectURL(file)
  try {
    const img = await loadImage(objectUrl)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) throw new Error('Canvas indisponible')

    let { width, height } = img
    if (width > MAX_EDGE || height > MAX_EDGE) {
      const scale = Math.min(MAX_EDGE / width, MAX_EDGE / height)
      width = Math.max(1, Math.floor(width * scale))
      height = Math.max(1, Math.floor(height * scale))
    }

    canvas.width = width
    canvas.height = height
    ctx.drawImage(img, 0, 0, width, height)

    const imageData = ctx.getImageData(0, 0, width, height)
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'attemptBoth',
    })

    return code?.data?.trim() ? code.data : null
  } finally {
    URL.revokeObjectURL(objectUrl)
  }
}

import { getQrTargetUrl } from '@/lib/dashboard/utils'

async function getQRCode() {
  const module = await import('qrcode')
  return module.default
}

export async function generateQrDataUrl(slug: string, color = '#0f172a'): Promise<string> {
  const QRCode = await getQRCode()
  return QRCode.toDataURL(getQrTargetUrl(slug), {
    width: 512,
    margin: 2,
    color: {
      dark: color,
      light: '#ffffff',
    },
  })
}

export async function generateQrBuffer(slug: string, color = '#0f172a'): Promise<Buffer> {
  const QRCode = await getQRCode()
  return QRCode.toBuffer(getQrTargetUrl(slug), {
    width: 1024,
    margin: 2,
    type: 'png',
    color: {
      dark: color,
      light: '#ffffff',
    },
  })
}

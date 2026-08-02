/**
 * Stub natif — le décodage image n’est disponible que sur le web
 * (voir `decode-qr-image.web.ts`).
 */
export async function decodeQrFromImageFile(_file: unknown): Promise<string | null> {
  return null
}

import { apiRequest } from './client'
import type { LandingPage, LandingPageInput } from '../types/landing-page'

type PayloadDoc = Record<string, unknown> & {
  id: string | number
  title: string
  slug: string
  status: LandingPage['status']
  vertical: LandingPage['vertical']
  updatedAt?: string
  createdAt?: string
}

function mapLandingPage(doc: PayloadDoc): LandingPage {
  return {
    id: String(doc.id),
    title: doc.title,
    slug: doc.slug,
    status: doc.status,
    vertical: doc.vertical,
    scanCount: typeof doc.scanCount === 'number' ? doc.scanCount : null,
    theme: (doc.theme as LandingPage['theme']) ?? null,
    genericData: (doc.genericData as LandingPage['genericData']) ?? null,
    redirectData: (doc.redirectData as LandingPage['redirectData']) ?? null,
    artData: (doc.artData as LandingPage['artData']) ?? null,
    immoData: (doc.immoData as LandingPage['immoData']) ?? null,
    vcardData: (doc.vcardData as LandingPage['vcardData']) ?? null,
    productData: (doc.productData as LandingPage['productData']) ?? null,
    feedbackData: (doc.feedbackData as LandingPage['feedbackData']) ?? null,
    tourismData: (doc.tourismData as LandingPage['tourismData']) ?? null,
    chrdData: (doc.chrdData as LandingPage['chrdData']) ?? null,
    corporateEventData: (doc.corporateEventData as LandingPage['corporateEventData']) ?? null,
    ugcRetailData: (doc.ugcRetailData as LandingPage['ugcRetailData']) ?? null,
    fieldServiceData: (doc.fieldServiceData as LandingPage['fieldServiceData']) ?? null,
    smartRouting: (doc.smartRouting as LandingPage['smartRouting']) ?? null,
    updatedAt: doc.updatedAt ?? null,
    createdAt: doc.createdAt ?? null,
  }
}

export async function fetchLandingPages(): Promise<LandingPage[]> {
  const result = await apiRequest<{ docs: PayloadDoc[] }>(
    '/api/landing-pages?limit=200&depth=1&sort=-updatedAt',
  )
  return result.docs.map(mapLandingPage)
}

export async function fetchLandingPage(id: string): Promise<LandingPage> {
  const doc = await apiRequest<PayloadDoc>(`/api/landing-pages/${id}?depth=1`)
  return mapLandingPage(doc)
}

type MutationResponse = PayloadDoc & { doc?: PayloadDoc }

function unwrapDoc(result: MutationResponse): PayloadDoc {
  if (result.doc) return result.doc
  return result
}

export async function createLandingPage(data: LandingPageInput): Promise<LandingPage> {
  const result = await apiRequest<MutationResponse>('/api/landing-pages', {
    method: 'POST',
    body: data,
  })
  return mapLandingPage(unwrapDoc(result))
}

export async function updateLandingPage(
  id: string,
  data: Partial<LandingPageInput>,
): Promise<LandingPage> {
  const result = await apiRequest<MutationResponse>(`/api/landing-pages/${id}`, {
    method: 'PATCH',
    body: data,
  })
  return mapLandingPage(unwrapDoc(result))
}

export async function deleteLandingPage(id: string): Promise<void> {
  await apiRequest(`/api/landing-pages/${id}`, { method: 'DELETE' })
}

export async function fetchMedia() {
  return apiRequest<{
    docs: Array<{
      id: string | number
      alt?: string | null
      url?: string | null
      filename?: string | null
      mimeType?: string | null
      filesize?: number | null
      createdAt?: string
    }>
  }>('/api/media?limit=200&sort=-createdAt')
}

const MEDIA_MAX_BYTES = 50 * 1024 * 1024

async function resolveUploadBody(
  file: File | { uri: string; name: string; type: string },
): Promise<{ name: string; type: string; size: number; body: Blob }> {
  if (typeof File !== 'undefined' && file instanceof File) {
    return {
      name: file.name,
      type: file.type || 'application/octet-stream',
      size: file.size,
      body: file,
    }
  }

  const asset = file as { uri: string; name: string; type: string }
  const response = await fetch(asset.uri)
  if (!response.ok) {
    throw new ApiError('Impossible de lire le fichier local', response.status)
  }
  const body = await response.blob()
  return {
    name: asset.name,
    type: asset.type || body.type || 'application/octet-stream',
    size: body.size,
    body,
  }
}

/**
 * Upload direct vers S3 (URL présignée), puis enregistrement metadata Payload.
 * Le fichier ne transite pas par le serveur Next.
 */
export async function uploadMedia(
  file: File | { uri: string; name: string; type: string },
): Promise<void> {
  const { name, type, size, body } = await resolveUploadBody(file)

  if (size <= 0) {
    throw new ApiError('Fichier vide', 400)
  }
  if (size > MEDIA_MAX_BYTES) {
    throw new ApiError('Le fichier dépasse la limite de 50 Mo', 400)
  }
  if (!type.startsWith('image/') && type !== 'application/pdf') {
    throw new ApiError('Type non supporté (images ou PDF)', 400)
  }

  const signed = await apiRequest<{
    uploadUrl: string
    key: string
    filename: string
    mimeType: string
    filesize: number
  }>('/api/media/presign', {
    method: 'POST',
    body: {
      filename: name,
      filesize: size,
      mimeType: type,
    },
  })

  const putResponse = await fetch(signed.uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': type,
    },
    body,
  })

  if (!putResponse.ok) {
    throw new ApiError(
      `Échec de l’envoi S3 (${putResponse.status}). Vérifiez le CORS du bucket.`,
      putResponse.status,
    )
  }

  await apiRequest('/api/media/complete', {
    method: 'POST',
    body: {
      key: signed.key,
      filename: signed.filename,
      mimeType: type,
      filesize: size,
      alt: name.replace(/\.[^.]+$/, ''),
    },
  })
}

export type AuthUser = {
  id: string
  email: string
  role?: 'user' | 'admin'
}

export async function loginRequest(email: string, password: string) {
  return apiRequest<{ token: string; user: AuthUser }>('/api/users/login', {
    method: 'POST',
    body: { email, password },
    token: null,
  })
}

export async function registerRequest(email: string, password: string) {
  await apiRequest('/api/users', {
    method: 'POST',
    body: { email, password },
    token: null,
  })
  return loginRequest(email, password)
}

export async function meRequest(token: string) {
  return apiRequest<{ user: AuthUser }>('/api/users/me', { token })
}

export async function forgotPasswordRequest(email: string) {
  return apiRequest('/api/users/forgot-password', {
    method: 'POST',
    body: { email },
    token: null,
  })
}

export async function resetPasswordRequest(token: string, password: string) {
  return apiRequest<{ token?: string; user?: AuthUser }>('/api/users/reset-password', {
    method: 'POST',
    body: { token, password },
    token: null,
  })
}

import { getApiBaseUrl } from '../lib/utils'

export type OgPreview = {
  url: string
  finalUrl: string
  title: string | null
  description: string | null
  image: string | null
  siteName: string | null
  favicon: string | null
}

export async function fetchOgPreview(url: string): Promise<OgPreview> {
  const endpoint = `${getApiBaseUrl()}/api/og-preview?url=${encodeURIComponent(url)}`
  const response = await fetch(endpoint)
  const data = (await response.json()) as OgPreview & { error?: string }
  if (!response.ok) {
    throw new Error(data.error || `Erreur ${response.status}`)
  }
  return data
}

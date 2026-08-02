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
  let response: Response
  try {
    response = await fetch(endpoint)
  } catch {
    throw new Error(
      `Impossible de joindre l’API (${getApiBaseUrl()}). Vérifiez que le serveur tourne.`,
    )
  }
  const data = (await response.json()) as OgPreview & { error?: string }
  if (!response.ok) {
    throw new Error(data.error || `Erreur ${response.status}`)
  }
  return data
}

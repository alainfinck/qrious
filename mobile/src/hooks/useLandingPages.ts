import { useCallback, useEffect, useState } from 'react'

import { fetchLandingPages } from '../api/landing-pages'
import type { LandingPage } from '../types/landing-page'

export function useLandingPages() {
  const [pages, setPages] = useState<LandingPage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const reload = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchLandingPages()
      setPages(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de chargement')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void reload()
  }, [reload])

  return { pages, loading, error, reload }
}

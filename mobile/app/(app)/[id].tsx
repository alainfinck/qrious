import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'

import {
  deleteLandingPage,
  fetchLandingPage,
  updateLandingPage,
} from '../../src/api/landing-pages'
import { QrCodeForm } from '../../src/components/QrCodeForm'
import { LoadingBlock, PageHeader } from '../../src/components/ui'
import { colors, spacing } from '../../src/theme/colors'
import type { LandingPage, LandingPageInput } from '../../src/types/landing-page'

export default function EditQrScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const [page, setPage] = useState<LandingPage | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      if (!id) return
      setLoading(true)
      try {
        const data = await fetchLandingPage(String(id))
        if (!cancelled) setPage(data)
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Introuvable')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [id])

  if (loading) return <LoadingBlock />
  if (error || !page) {
    return <Text style={styles.error}>{error || 'Page introuvable'}</Text>
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageHeader title={page.title} description={`Édition · /${page.slug}`} />
      <QrCodeForm
        page={page}
        submitLabel="Enregistrer"
        onSubmit={async (data: LandingPageInput) => {
          const updated = await updateLandingPage(page.id, data)
          setPage(updated)
        }}
        onDelete={async () => {
          await deleteLandingPage(page.id)
          router.replace('/qr-codes')
        }}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { gap: spacing.lg, paddingBottom: 40, maxWidth: 1100, width: '100%', alignSelf: 'center' },
  error: { color: colors.danger, padding: 24 },
})

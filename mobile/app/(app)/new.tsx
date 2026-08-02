import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'

import { createLandingPage } from '../../src/api/landing-pages'
import { QrCodeForm } from '../../src/components/QrCodeForm'
import { PageHeader } from '../../src/components/ui'
import { spacing } from '../../src/theme/colors'
import type { LandingPageInput, LandingPageVertical } from '../../src/types/landing-page'

export default function NewQrScreen() {
  const router = useRouter()
  const { vertical } = useLocalSearchParams<{ vertical?: string }>()

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageHeader
        title="Nouveau QR Code"
        description="Statique ou Smart Page · contenu · design · publication."
      />
      <QrCodeForm
        initialVertical={(vertical as LandingPageVertical) || 'generic'}
        submitLabel="Créer le QR Code"
        onSubmit={async (data: LandingPageInput) => {
          const page = await createLandingPage(data)
          router.replace(`/${page.id}`)
        }}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { gap: spacing.lg, paddingBottom: 40, maxWidth: 1100, width: '100%', alignSelf: 'center' },
})

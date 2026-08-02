import React, { useMemo } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'

import { useAuth } from '../../src/auth/AuthContext'
import { Badge, Card, LoadingBlock, PageHeader } from '../../src/components/ui'
import { useLandingPages } from '../../src/hooks/useLandingPages'
import { colors, spacing } from '../../src/theme/colors'

export default function ProfilScreen() {
  const { user } = useAuth()
  const { pages, loading } = useLandingPages()

  const published = useMemo(() => pages.filter((p) => p.status === 'published').length, [pages])
  const drafts = useMemo(() => pages.filter((p) => p.status === 'draft').length, [pages])

  if (loading) return <LoadingBlock />

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageHeader title="Profil" description="Informations de votre compte QRious." />
      <Card style={{ gap: 12 }}>
        <Text style={styles.label}>E-mail</Text>
        <Text style={styles.value}>{user?.email}</Text>
        <Text style={styles.label}>Rôle</Text>
        <Badge label={user?.role === 'admin' ? 'Admin' : 'Utilisateur'} tone="accent" />
        <Text style={styles.label}>Publiés</Text>
        <Text style={styles.value}>{published}</Text>
        <Text style={styles.label}>Brouillons</Text>
        <Text style={styles.value}>{drafts}</Text>
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { gap: spacing.lg, paddingBottom: 40, maxWidth: 720, width: '100%', alignSelf: 'center' },
  label: { fontSize: 12, fontWeight: '700', color: colors.slate400, textTransform: 'uppercase', letterSpacing: 0.8 },
  value: { fontSize: 16, fontWeight: '600', color: colors.ink, marginBottom: 8 },
})

import React, { useMemo, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useRouter } from 'expo-router'

import { Badge, Button, Card, EmptyState, Input, LoadingBlock, PageHeader } from '../../src/components/ui'
import { useLandingPages } from '../../src/hooks/useLandingPages'
import { formatShortDate, getArtistName, getMockScanCount } from '../../src/lib/mock-analytics'
import { STATUS_LABELS, VERTICAL_LABELS } from '../../src/lib/utils'
import { colors, spacing } from '../../src/theme/colors'
import type { LandingPage } from '../../src/types/landing-page'

export default function QrCodesScreen() {
  return <PagesGridScreen title="Mes QR Codes" description="Tous vos QR codes et landing pages associées." />
}

export function PagesGridScreen({ title, description }: { title: string; description: string }) {
  const { pages, loading, error } = useLandingPages()
  const [query, setQuery] = useState('')
  const router = useRouter()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return pages
    return pages.filter(
      (page) =>
        page.title.toLowerCase().includes(q) ||
        getArtistName(page).toLowerCase().includes(q) ||
        page.slug.includes(q),
    )
  }, [pages, query])

  if (loading) return <LoadingBlock />

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageHeader
        title={title}
        description={description}
        action={<Button label="Créer" onPress={() => router.push('/new')} />}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {pages.length === 0 ? (
        <EmptyState
          title="Aucun QR code pour l’instant"
          description="Créez votre premier QR code et associez-le à une landing page."
          action={<Button label="Créer un QR Code" onPress={() => router.push('/new')} />}
        />
      ) : (
        <>
          <Input
            value={query}
            onChangeText={setQuery}
            placeholder="Rechercher par titre, artiste ou slug…"
          />
          {filtered.length === 0 ? (
            <Text style={styles.muted}>Aucun résultat pour « {query} ».</Text>
          ) : (
            <View style={styles.grid}>
              {filtered.map((page) => (
                <QrCard key={page.id} page={page} onPress={() => router.push(`/${page.id}`)} />
              ))}
            </View>
          )}
        </>
      )}
    </ScrollView>
  )
}

function QrCard({ page, onPress }: { page: LandingPage; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.cardWrap}>
      <Card style={styles.card}>
        <View style={styles.thumb}>
          <Text style={styles.thumbText}>QR</Text>
        </View>
        <View style={styles.cardBody}>
          <View style={styles.cardTop}>
            <Text style={styles.cardTitle} numberOfLines={2}>
              {page.title}
            </Text>
            <Badge label={`${getMockScanCount(page.id)} scans`} tone="accent" />
          </View>
          <Text style={styles.meta}>{getArtistName(page)}</Text>
          <View style={styles.badges}>
            <Badge label={VERTICAL_LABELS[page.vertical]} />
            <Badge
              label={STATUS_LABELS[page.status]}
              tone={page.status === 'published' ? 'success' : 'warning'}
            />
          </View>
          <Text style={styles.date}>Créé le {formatShortDate(page.createdAt)}</Text>
        </View>
      </Card>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: { gap: spacing.lg, paddingBottom: 40, maxWidth: 1100, width: '100%', alignSelf: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
  cardWrap: { width: '100%', maxWidth: 340, flexGrow: 1 },
  card: { padding: 0, overflow: 'hidden' },
  thumb: {
    height: 120,
    backgroundColor: colors.slate100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbText: { fontWeight: '800', color: colors.slate400, fontSize: 28 },
  cardBody: { padding: 16, gap: 8 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  cardTitle: { flex: 1, fontWeight: '700', fontSize: 16, color: colors.ink },
  meta: { color: colors.slate500, fontSize: 13 },
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  date: { color: colors.slate400, fontSize: 12 },
  muted: { color: colors.slate500, textAlign: 'center' },
  error: { color: colors.danger },
})

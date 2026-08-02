import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useRouter } from 'expo-router'

import { ActivityChart } from '../../src/components/ActivityChart'
import { Badge, Button, Card, EmptyState, LoadingBlock, PageHeader } from '../../src/components/ui'
import { useLandingPages } from '../../src/hooks/useLandingPages'
import {
  formatShortDate,
  getArtistName,
  getMockScanCount,
  getMockTotalScans,
  getMockUniqueVisitors,
  WEEKLY_ACTIVITY,
} from '../../src/lib/mock-analytics'
import { colors, spacing } from '../../src/theme/colors'

export default function OverviewScreen() {
  const { pages, loading, error, reload } = useLandingPages()
  const router = useRouter()
  const recent = pages.slice(0, 5)
  const totalScans = getMockTotalScans(pages)
  const visitors = getMockUniqueVisitors(pages)

  if (loading) return <LoadingBlock />

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageHeader
        title="Vue d’ensemble"
        description="Suivez vos QR codes, pages smart et activité récente."
        action={<Button label="Créer" onPress={() => router.push('/new')} />}
      />

      {error ? (
        <Card>
          <Text style={styles.error}>{error}</Text>
          <Button label="Réessayer" variant="secondary" onPress={() => void reload()} />
        </Card>
      ) : null}

      <View style={styles.stats}>
        <StatCard label="QR codes" value={String(pages.length)} />
        <StatCard label="Scans (estim.)" value={String(totalScans)} />
        <StatCard label="Visiteurs uniques" value={String(visitors)} />
      </View>

      <View style={styles.grid}>
        <ActivityChart data={WEEKLY_ACTIVITY} style={styles.chartCard} />

        <Card style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>Récents</Text>
          {recent.length === 0 ? (
            <EmptyState
              title="Aucun QR code"
              description="Créez votre premier QR code pour démarrer."
              action={<Button label="Créer un QR Code" onPress={() => router.push('/new')} />}
            />
          ) : (
            <View style={{ gap: 10 }}>
              {recent.map((page) => (
                <Pressable
                  key={page.id}
                  style={styles.recentRow}
                  onPress={() => router.push(`/${page.id}`)}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={styles.recentTitle}>{page.title}</Text>
                    <Text style={styles.recentMeta}>
                      {getArtistName(page)} · {formatShortDate(page.createdAt)}
                    </Text>
                  </View>
                  <Badge label={`${getMockScanCount(page.id)} scans`} tone="accent" />
                </Pressable>
              ))}
            </View>
          )}
        </Card>
      </View>
    </ScrollView>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: { gap: spacing.xl, paddingBottom: 40, maxWidth: 1100, width: '100%', alignSelf: 'center' },
  stats: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  statCard: { flexGrow: 1, minWidth: 140, gap: 4 },
  statValue: { fontSize: 28, fontWeight: '800', color: colors.ink },
  statLabel: { color: colors.slate500, fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  chartCard: { flex: 1.4, minWidth: 280 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: colors.ink, marginBottom: 14 },
  recentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate100,
  },
  recentTitle: { fontWeight: '700', color: colors.ink },
  recentMeta: { color: colors.slate500, fontSize: 12, marginTop: 2 },
  error: { color: colors.danger, marginBottom: 8 },
})

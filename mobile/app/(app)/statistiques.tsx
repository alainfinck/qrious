import React, { useMemo, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

import { Badge, Card, Input, LoadingBlock, PageHeader } from '../../src/components/ui'
import { useLandingPages } from '../../src/hooks/useLandingPages'
import {
  CITY_SCAN_LOCATIONS,
  DEVICE_STATS,
  HOURLY_PEAK_DATA,
} from '../../src/lib/analytics-data'
import { getMockTotalScans, getMockUniqueVisitors, WEEKLY_ACTIVITY } from '../../src/lib/mock-analytics'
import { colors, spacing } from '../../src/theme/colors'

const TABS = [
  { id: 'overview', label: 'Vue d’ensemble' },
  { id: 'heatmap', label: 'Carte' },
  { id: 'peak', label: 'Heures de pointe' },
  { id: 'reports', label: 'Rapports' },
] as const

export default function StatistiquesScreen() {
  const { pages, loading } = useLandingPages()
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('overview')
  const [email, setEmail] = useState('')
  const [enabled, setEnabled] = useState(true)
  const totalScans = useMemo(() => getMockTotalScans(pages), [pages])
  const visitors = useMemo(() => getMockUniqueVisitors(pages), [pages])
  const maxHour = Math.max(...HOURLY_PEAK_DATA.map((h) => h.scans), 1)

  if (loading) return <LoadingBlock />

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageHeader
        title="Statistiques"
        description="Analyse des scans, géographie, appareils et rapports e-mail."
      />

      <View style={styles.tabs}>
        {TABS.map((t) => (
          <Pressable
            key={t.id}
            onPress={() => setTab(t.id)}
            style={[styles.tab, tab === t.id && styles.tabActive]}
          >
            <Text style={[styles.tabText, tab === t.id && styles.tabTextActive]}>{t.label}</Text>
          </Pressable>
        ))}
      </View>

      {tab === 'overview' ? (
        <View style={styles.section}>
          <View style={styles.stats}>
            <Card style={styles.stat}>
              <Text style={styles.statValue}>{totalScans}</Text>
              <Text style={styles.statLabel}>Scans totaux</Text>
            </Card>
            <Card style={styles.stat}>
              <Text style={styles.statValue}>{visitors}</Text>
              <Text style={styles.statLabel}>Visiteurs</Text>
            </Card>
            <Card style={styles.stat}>
              <Text style={styles.statValue}>{pages.length}</Text>
              <Text style={styles.statLabel}>QR actifs</Text>
            </Card>
          </View>
          <Card>
            <Text style={styles.cardTitle}>Cette semaine</Text>
            {WEEKLY_ACTIVITY.map((d) => (
              <View key={d.day} style={styles.row}>
                <Text style={styles.rowLabel}>{d.day}</Text>
                <Text style={styles.rowValue}>{d.scans} scans</Text>
              </View>
            ))}
          </Card>
        </View>
      ) : null}

      {tab === 'heatmap' ? (
        <Card>
          <Text style={styles.cardTitle}>Top villes</Text>
          {CITY_SCAN_LOCATIONS.map((city) => (
            <View key={city.id} style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.rowLabel}>{city.cityName}</Text>
                <Text style={styles.meta}>
                  {city.region} · {city.country}
                </Text>
              </View>
              <Badge label={`${city.scans} · ${city.percentage}%`} tone="accent" />
            </View>
          ))}
        </Card>
      ) : null}

      {tab === 'peak' ? (
        <View style={styles.section}>
          <Card>
            <Text style={styles.cardTitle}>Heures de pointe</Text>
            <View style={styles.bars}>
              {HOURLY_PEAK_DATA.filter((_, i) => i % 2 === 0).map((h) => (
                <View key={h.hour} style={styles.barCol}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: Math.max(8, (h.scans / maxHour) * 100),
                        backgroundColor: h.isPeak ? colors.sun : colors.signal,
                      },
                    ]}
                  />
                  <Text style={styles.barLabel}>{h.hour}</Text>
                </View>
              ))}
            </View>
          </Card>
          <Card>
            <Text style={styles.cardTitle}>Appareils</Text>
            {DEVICE_STATS.map((d) => (
              <View key={d.name} style={styles.row}>
                <Text style={styles.rowLabel}>{d.name}</Text>
                <Badge label={`${d.percentage}%`} />
              </View>
            ))}
          </Card>
        </View>
      ) : null}

      {tab === 'reports' ? (
        <Card style={{ gap: 12 }}>
          <Text style={styles.cardTitle}>Rapport hebdomadaire</Text>
          <Text style={styles.meta}>
            Recevez un digest e-mail de vos performances QR (préférences stockées côté app pour
            l’instant).
          </Text>
          <Input
            label="E-mail de réception"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="vous@entreprise.fr"
          />
          <Pressable onPress={() => setEnabled((v) => !v)} style={styles.row}>
            <Text style={styles.rowLabel}>Activer le rapport</Text>
            <Badge label={enabled ? 'Oui' : 'Non'} tone={enabled ? 'success' : 'neutral'} />
          </Pressable>
          <Text style={styles.ok}>
            {enabled
              ? 'Rapport activé (simulation locale).'
              : 'Rapport désactivé.'}
          </Text>
        </Card>
      ) : null}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { gap: spacing.lg, paddingBottom: 40, maxWidth: 1100, width: '100%', alignSelf: 'center' },
  tabs: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tab: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.slate200,
  },
  tabActive: { backgroundColor: colors.slate900, borderColor: colors.slate900 },
  tabText: { fontWeight: '600', color: colors.slate600, fontSize: 13 },
  tabTextActive: { color: colors.white },
  section: { gap: 14 },
  stats: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  stat: { flexGrow: 1, minWidth: 120 },
  statValue: { fontSize: 26, fontWeight: '800', color: colors.ink },
  statLabel: { color: colors.slate500, fontWeight: '600' },
  cardTitle: { fontSize: 16, fontWeight: '700', color: colors.ink, marginBottom: 10 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate100,
    gap: 12,
  },
  rowLabel: { fontWeight: '600', color: colors.ink },
  rowValue: { color: colors.slate500 },
  meta: { color: colors.slate500, fontSize: 12, marginTop: 2 },
  bars: { flexDirection: 'row', alignItems: 'flex-end', gap: 4, height: 120 },
  barCol: { flex: 1, alignItems: 'center', gap: 4 },
  bar: { width: '100%', borderRadius: 4 },
  barLabel: { fontSize: 9, color: colors.slate400 },
  ok: { color: colors.success, fontWeight: '600' },
})

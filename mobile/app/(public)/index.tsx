import React, { useMemo } from 'react'
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native'
import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { QrCodeForm } from '../../src/components/QrCodeForm'
import { BrandLogo } from '../../src/components/Brand'
import { goToSiteHome } from '../../src/lib/utils'
import { colors, spacing } from '../../src/theme/colors'
import type { LandingPageVertical } from '../../src/types/landing-page'
import type { StaticQrContentType } from '../../src/lib/qr-payload'

function firstParam(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0]
  return value
}

function isTruthyParam(value: string | string[] | undefined): boolean {
  const v = firstParam(value)?.toLowerCase()
  return v === '1' || v === 'true' || v === 'yes'
}

/**
 * Mode embed pour sites partenaires (ex. cartepostale.cool) :
 *   /newqr?embed=1&url=https://…&lockUrl=1&partner=cartepostale
 * — chrome marketing masqué, URL préremplie, export OK
 */
export default function PublicEditorScreen() {
  const router = useRouter()
  const { width } = useWindowDimensions()
  const params = useLocalSearchParams<{
    type?: string
    vertical?: string
    embed?: string
    url?: string
    lockUrl?: string
    partner?: string
  }>()
  const showHomeHint = width >= 420

  const embedMode = isTruthyParam(params.embed)
  const lockUrl = isTruthyParam(params.lockUrl)
  const initialUrl = useMemo(() => {
    const raw = firstParam(params.url)?.trim()
    if (!raw) return undefined
    try {
      return decodeURIComponent(raw)
    } catch {
      return raw
    }
  }, [params.url])
  const partner = firstParam(params.partner)?.trim()
  const initialStaticType = (firstParam(params.type) as StaticQrContentType) || 'url'

  if (embedMode) {
    return (
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <ScrollView
          contentContainerStyle={[styles.container, styles.embedContainer]}
          keyboardShouldPersistTaps="handled"
        >
          <QrCodeForm
            guestMode
            embedMode
            lockUrl={lockUrl || Boolean(initialUrl)}
            initialUrl={initialUrl}
            initialVertical={(firstParam(params.vertical) as LandingPageVertical) || 'generic'}
            initialStaticType={lockUrl || initialUrl ? 'url' : initialStaticType}
            submitLabel="Exporter"
            onSubmit={async () => undefined}
          />
          <Pressable
            onPress={() => void Linking.openURL('https://www.qrious.fr')}
            style={styles.poweredBy}
            accessibilityRole="link"
          >
            <Text style={styles.poweredByText}>
              Éditeur QR{partner ? ` · ${partner}` : ''} · propulsé par QRious
            </Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.topBar}>
        <Pressable
          onPress={goToSiteHome}
          accessibilityRole="link"
          accessibilityLabel="Retour à l’accueil QRious"
          style={styles.brandLink}
        >
          <ChevronLeft size={18} color={colors.slate600} />
          <BrandLogo size={20} markSize={24} tone="light" />
          {showHomeHint ? <Text style={styles.homeHint}>Accueil</Text> : null}
        </Pressable>
        <View style={styles.topActions}>
          <Link href="/login" asChild>
            <Pressable style={styles.linkBtn}>
              <Text style={styles.linkBtnText}>Connexion</Text>
            </Pressable>
          </Link>
          <Pressable style={styles.ctaBtn} onPress={() => router.push('/register')}>
            <Text style={styles.ctaBtnText}>Créer un compte</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.intro}>
          <Text style={styles.title}>Éditeur QR</Text>
          <Text style={styles.subtitle}>
            Créez et exportez un QR statique gratuitement. Connectez-vous pour publier une Smart
            Page dynamique.
          </Text>
        </View>
        <QrCodeForm
          guestMode
          initialUrl={initialUrl}
          lockUrl={lockUrl}
          initialVertical={(firstParam(params.vertical) as LandingPageVertical) || 'generic'}
          initialStaticType={lockUrl || initialUrl ? 'url' : initialStaticType}
          submitLabel="Créer un compte pour publier"
          onSubmit={async () => {
            router.push('/register')
          }}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.slate50 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate100,
    backgroundColor: colors.white,
  },
  brandLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
    paddingRight: 8,
    minWidth: 0,
  },
  homeHint: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.slate500,
    marginLeft: 2,
  },
  topActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  linkBtn: { paddingHorizontal: 12, paddingVertical: 8 },
  linkBtnText: { fontWeight: '600', color: colors.slate600 },
  ctaBtn: {
    backgroundColor: colors.ink,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  ctaBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  container: {
    gap: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingBottom: 48,
    maxWidth: 1100,
    width: '100%',
    alignSelf: 'center',
  },
  embedContainer: {
    paddingTop: spacing.md,
    paddingBottom: 24,
  },
  poweredBy: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  poweredByText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.slate400,
    textAlign: 'center',
  },
  intro: { gap: 6, paddingTop: spacing.md },
  title: { fontSize: 28, fontWeight: '800', color: colors.ink },
  subtitle: { fontSize: 15, lineHeight: 22, color: colors.slate500, maxWidth: 560 },
})

import React from 'react'
import {
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

export default function PublicEditorScreen() {
  const router = useRouter()
  const { width } = useWindowDimensions()
  const params = useLocalSearchParams<{ type?: string; vertical?: string }>()
  const showHomeHint = width >= 420

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
          initialVertical={(params.vertical as LandingPageVertical) || 'generic'}
          initialStaticType={(params.type as StaticQrContentType) || 'url'}
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
  intro: { gap: 6, paddingTop: spacing.md },
  title: { fontSize: 28, fontWeight: '800', color: colors.ink },
  subtitle: { fontSize: 15, lineHeight: 22, color: colors.slate500, maxWidth: 560 },
})

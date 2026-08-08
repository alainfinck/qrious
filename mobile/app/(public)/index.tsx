import React, { useEffect, useMemo } from 'react'
import {
  Linking,
  Platform,
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

const EMBED_RESIZE_MSG = 'qrious-embed-resize'

function firstParam(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0]
  return value
}

function isTruthyParam(value: string | string[] | undefined): boolean {
  const v = firstParam(value)?.toLowerCase()
  return v === '1' || v === 'true' || v === 'yes'
}

function useEmbedAutoHeight(enabled: boolean) {
  useEffect(() => {
    if (!enabled || Platform.OS !== 'web' || typeof window === 'undefined') return

    const root = document.documentElement
    const body = document.body
    const rootEl = document.getElementById('root')

    root.style.overflow = 'visible'
    body.style.overflow = 'visible'
    body.style.height = 'auto'
    root.style.height = 'auto'
    if (rootEl) {
      rootEl.style.height = 'auto'
      rootEl.style.minHeight = '100vh'
    }

    const report = () => {
      const height = Math.ceil(
        Math.max(
          body.scrollHeight,
          body.offsetHeight,
          root.scrollHeight,
          root.offsetHeight,
          rootEl?.scrollHeight ?? 0,
          rootEl?.offsetHeight ?? 0,
        ),
      )
      if (height < 100) return
      window.parent?.postMessage({ type: EMBED_RESIZE_MSG, height }, '*')
    }

    report()
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(report) : null
    if (body) ro?.observe(body)
    if (rootEl) ro?.observe(rootEl)

    window.addEventListener('resize', report)
    const interval = window.setInterval(report, 300)

    return () => {
      ro?.disconnect()
      window.removeEventListener('resize', report)
      window.clearInterval(interval)
      root.style.overflow = ''
      body.style.overflow = ''
      body.style.height = ''
      root.style.height = ''
      if (rootEl) {
        rootEl.style.height = ''
        rootEl.style.minHeight = ''
      }
    }
  }, [enabled])
}

function getWebSearchParam(key: string): string | undefined {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return undefined
  try {
    const val = new URLSearchParams(window.location.search).get(key)
    return val ?? undefined
  } catch {
    return undefined
  }
}

/**
 * Mode embed pour sites partenaires (ex. cartepostale.cool) :
 *   /newqr?embed=1&url=https://…&lockUrl=1&partner=cartepostale
 * — chrome marketing masqué, URL préremplie, export OK
 */
export default function PublicEditorScreen({ forceEmbed = false }: { forceEmbed?: boolean } = {}) {
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

  const getParam = (key: 'type' | 'vertical' | 'embed' | 'url' | 'lockUrl' | 'partner') => {
    const val = firstParam(params[key])
    if (val !== undefined && val !== '') return val
    return getWebSearchParam(key)
  }

  const rawEmbed = getParam('embed')
  const rawLockUrl = getParam('lockUrl')
  const rawUrl = getParam('url')
  const rawPartner = getParam('partner')
  const rawType = getParam('type')
  const rawVertical = getParam('vertical')

  const isEmbedPath = Platform.OS === 'web' && typeof window !== 'undefined' && window.location.pathname.includes('/embed')
  const embedMode = forceEmbed || isTruthyParam(rawEmbed) || isEmbedPath
  const lockUrl = isTruthyParam(rawLockUrl)
  const initialUrl = useMemo(() => {
    let raw = rawUrl?.trim()
    if (!raw) return undefined
    raw = raw.replace(/^["']+|["']+$/g, '').trim()
    if (!raw) return undefined
    try {
      return decodeURIComponent(raw)
    } catch {
      return raw
    }
  }, [rawUrl])
  const partner = useMemo(() => {
    const raw = rawPartner?.trim()
    return raw ? raw.replace(/^["']+|["']+$/g, '').trim() : undefined
  }, [rawPartner])
  const initialStaticType = (rawType as StaticQrContentType) || 'url'

  useEmbedAutoHeight(embedMode)

  if (embedMode) {
    return (
      <View style={styles.embedRoot}>
        <View style={[styles.container, styles.embedContainer]}>
          <QrCodeForm
            guestMode
            embedMode
            lockUrl={lockUrl || Boolean(initialUrl)}
            initialUrl={initialUrl}
            initialVertical={(rawVertical as LandingPageVertical) || 'generic'}
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
        </View>
      </View>
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
  /** Pas de flex:1 — laisse le contenu dicter la hauteur pour l’iframe parent */
  embedRoot: {
    backgroundColor: colors.slate50,
    width: '100%',
    minHeight: '100vh',
  },
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
    paddingBottom: 16,
    maxWidth: '100%',
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

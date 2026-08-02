import React, { useEffect } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { ChevronLeft } from 'lucide-react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

import { goToSiteHome } from '../lib/utils'
import { BrandLogo } from './Brand'

const FEATURES = [
  { color: '#12C4A8', text: 'QR dynamiques sans réimpression' },
  { color: '#38BDF8', text: 'Templates métiers prêts à l’emploi' },
  { color: '#FF5C4D', text: 'Marque blanche en quelques clics' },
]

function FadeIn({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode
  delay?: number
  style?: object
}) {
  const opacity = useSharedValue(0)
  const translateY = useSharedValue(14)

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withTiming(1, { duration: 520, easing: Easing.out(Easing.cubic) }),
    )
    translateY.value = withDelay(
      delay,
      withTiming(0, { duration: 520, easing: Easing.out(Easing.cubic) }),
    )
  }, [delay, opacity, translateY])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }))

  return <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
}

function BackToSite() {
  return (
    <Pressable
      onPress={goToSiteHome}
      accessibilityRole="link"
      accessibilityLabel="Retour au site QRious"
      style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.75 }]}
    >
      <ChevronLeft size={18} color="rgba(255,255,255,0.75)" />
      <Text style={styles.backBtnText}>Retour au site</Text>
    </Pressable>
  )
}

export function AuthShell({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  const { width } = useWindowDimensions()
  const desktop = width >= 960
  const year = new Date().getFullYear()

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={['#0B1220', '#102536', '#0B1A2A']}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={[styles.blob, styles.blobSignal]} />
      <View style={[styles.blob, styles.blobCoral]} />
      <View style={[styles.blob, styles.blobSky]} />
      <View style={[styles.blob, styles.blobSun]} />

      <SafeAreaView style={styles.safe} edges={['top', 'bottom', 'left', 'right']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.flex}
        >
          <View style={styles.topBar}>
            <BackToSite />
          </View>
          <View style={[styles.layout, desktop && styles.layoutDesktop]}>
            <View style={[styles.stage, desktop && styles.stageDesktop]}>
              {desktop ? (
                <View style={styles.brandPanel}>
                  <FadeIn delay={40}>
                    <Pressable
                      onPress={goToSiteHome}
                      accessibilityRole="link"
                      accessibilityLabel="Retour à l’accueil QRious"
                      style={styles.brandRow}
                    >
                      <BrandLogo size={30} markSize={36} tone="dark" />
                    </Pressable>
                  </FadeIn>

                  <View style={styles.heroBlock}>
                    <FadeIn delay={120}>
                      <Text style={styles.eyebrow}>Tableau de bord</Text>
                      <Text style={styles.heroTitle}>
                        Des QR codes{'\n'}
                        <Text style={styles.heroSignal}>pour chaque usage.</Text>
                        {'\n'}
                        <Text style={styles.heroCoral}>Facile et rapide.</Text>
                      </Text>
                      <Text style={styles.heroDesc}>
                        Créez, personnalisez et exportez en quelques clics — ou publiez une Smart
                        Page dynamique.
                      </Text>
                    </FadeIn>

                    <FadeIn delay={240}>
                      <View style={styles.features}>
                        {FEATURES.map((item) => (
                          <View key={item.text} style={styles.featureRow}>
                            <View style={[styles.featureDot, { backgroundColor: item.color }]} />
                            <Text style={styles.featureText}>{item.text}</Text>
                          </View>
                        ))}
                      </View>
                    </FadeIn>
                  </View>

                  <FadeIn delay={360}>
                    <Text style={styles.copyright}>© {year} QRious</Text>
                  </FadeIn>
                </View>
              ) : null}

              <ScrollView
                contentContainerStyle={[
                  styles.formScroll,
                  desktop && styles.formScrollDesktop,
                ]}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                style={desktop ? styles.formScrollViewDesktop : undefined}
              >
                {!desktop ? (
                  <FadeIn delay={40} style={styles.mobileBrand}>
                    <Pressable
                      onPress={goToSiteHome}
                      accessibilityRole="link"
                      accessibilityLabel="Retour à l’accueil QRious"
                      style={styles.brandRow}
                    >
                      <BrandLogo size={26} markSize={30} tone="dark" />
                    </Pressable>
                  </FadeIn>
                ) : null}

                <FadeIn delay={120}>
                  <View style={styles.formCard}>
                    <LinearGradient
                      colors={['rgba(18,196,168,0.35)', 'transparent', 'rgba(255,92,77,0.3)']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.cardBeam}
                    />
                    <Text style={styles.formTitle}>{title}</Text>
                    <Text style={styles.formDesc}>{description}</Text>
                    {children}
                  </View>
                </FadeIn>
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0B1220',
    overflow: 'hidden',
  },
  flex: { flex: 1 },
  safe: { flex: 1 },
  topBar: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 4,
  },
  backBtn: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  backBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.75)',
  },
  blob: {
    position: 'absolute',
    borderRadius: 9999,
    // Soft glow — CSS filter on web, large soft fill on native
    ...(Platform.OS === 'web'
      ? ({ filter: 'blur(90px)' } as object)
      : { opacity: 0.9 }),
  },
  blobSignal: {
    width: 420,
    height: 420,
    left: -120,
    top: -100,
    backgroundColor: 'rgba(18,196,168,0.28)',
  },
  blobCoral: {
    width: 380,
    height: 380,
    right: -100,
    bottom: -120,
    backgroundColor: 'rgba(255,92,77,0.22)',
  },
  blobSky: {
    width: 220,
    height: 220,
    right: '18%',
    top: '18%',
    backgroundColor: 'rgba(56,189,248,0.16)',
  },
  blobSun: {
    width: 160,
    height: 160,
    left: '28%',
    bottom: '22%',
    backgroundColor: 'rgba(255,197,61,0.12)',
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  layoutDesktop: {
    paddingHorizontal: 32,
    paddingVertical: 24,
  },
  stage: {
    flex: 1,
    width: '100%',
  },
  stageDesktop: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 48,
    width: '100%',
    maxWidth: 1120,
  },
  brandPanel: {
    flex: 1,
    maxWidth: 460,
    minHeight: 520,
    paddingHorizontal: 24,
    paddingVertical: 28,
    justifyContent: 'space-between',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  heroBlock: {
    maxWidth: 420,
    gap: 28,
  },
  eyebrow: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 3.2,
    textTransform: 'uppercase',
    color: '#FFC53D',
    marginBottom: 14,
  },
  heroTitle: {
    fontSize: 44,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -1.2,
    lineHeight: 50,
  },
  heroSignal: { color: '#12C4A8' },
  heroCoral: { color: '#FF5C4D' },
  heroDesc: {
    marginTop: 18,
    fontSize: 17,
    lineHeight: 26,
    color: 'rgba(255,255,255,0.55)',
  },
  features: { gap: 14 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  featureDot: { width: 10, height: 10, borderRadius: 3 },
  featureText: { fontSize: 14, color: 'rgba(255,255,255,0.7)', flex: 1 },
  copyright: { fontSize: 13, color: 'rgba(255,255,255,0.35)' },
  formScrollViewDesktop: {
    flex: 1,
    maxWidth: 460,
  },
  formScroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 28,
  },
  formScrollDesktop: {
    flexGrow: 0,
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 0,
  },
  mobileBrand: {
    alignItems: 'center',
    marginBottom: 24,
  },
  formCard: {
    width: '100%',
    maxWidth: 460,
    alignSelf: 'center',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    backgroundColor: 'rgba(255,255,255,0.07)',
    paddingHorizontal: 28,
    paddingVertical: 32,
    overflow: 'hidden',
  },
  cardBeam: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
  },
  formTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.8,
    marginBottom: 10,
  },
  formDesc: {
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 28,
  },
})

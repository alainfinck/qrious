import React, { useEffect, useState } from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useGlobalSearchParams, usePathname, useRouter } from 'expo-router'
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  FileText,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  QrCode,
  ScanLine,
  User,
  X,
  PenTool,
  Code,
} from 'lucide-react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  Easing,
  Extrapolation,
  FadeIn,
  FadeOut,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useAuth } from '../auth/AuthContext'
import { colors, spacing } from '../theme/colors'

const SIDEBAR_EXPANDED = 240
const SIDEBAR_COLLAPSED = 68
const DRAWER_WIDTH = SIDEBAR_EXPANDED + 16
const STORAGE_KEY = 'qrious_sidebar_collapsed'
const MOTION_MS = 300
const MOTION_EASING = Easing.bezier(0.22, 1, 0.36, 1)

const NAV = [
  { href: '/home', label: 'Vue d’ensemble', icon: LayoutDashboard, exact: true },
  { href: '/new', label: 'Éditeur', icon: PenTool },
  { href: '/scanner', label: 'Scanner', icon: ScanLine },
  { href: '/qr-codes', label: 'Mes QR Codes', icon: QrCode },
  { href: '/pages', label: 'Smart Pages', icon: FileText },
  { href: '/medias', label: 'Médias', icon: ImageIcon },
  { href: '/statistiques', label: 'Statistiques', icon: BarChart3 },
  { href: '/integration', label: 'Intégration', icon: Code },
  { href: '/profil', label: 'Profil', icon: User },
] as const

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href || pathname === '/home'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { width } = useWindowDimensions()
  const pathname = usePathname()
  const params = useGlobalSearchParams()
  const embedParam = Array.isArray(params.embed) ? params.embed[0] : params.embed
  const isEmbed =
    pathname.startsWith('/embed') ||
    pathname === '/embed' ||
    embedParam === '1' ||
    embedParam === 'true' ||
    (typeof window !== 'undefined' && (window.location.pathname.includes('/embed') || window.location.search.includes('embed=1')))

  if (isEmbed) {
    return <View style={{ flex: 1 }}>{children}</View>
  }

  const desktop = width >= 900
  const isScanner = pathname === '/scanner' || pathname.startsWith('/scanner/')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [ready, setReady] = useState(false)
  const [motionReady, setMotionReady] = useState(false)

  useEffect(() => {
    void AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      if (value === '1') setCollapsed(true)
      setReady(true)
      queueMicrotask(() => setMotionReady(true))
    })
  }, [])

  async function toggleCollapsed() {
    const next = !collapsed
    setCollapsed(next)
    await AsyncStorage.setItem(STORAGE_KEY, next ? '1' : '0')
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={[styles.root, desktop && styles.rootDesktop]}>
        {desktop ? (
          <Sidebar
            collapsed={ready ? collapsed : false}
            animate={motionReady}
            onToggleCollapsed={() => void toggleCollapsed()}
            onNavigate={() => undefined}
          />
        ) : (
          <>
            <View style={styles.mobileHeader}>
              <Pressable
                onPress={() => setDrawerOpen(true)}
                style={styles.menuBtn}
                accessibilityLabel="Ouvrir le menu"
              >
                <Menu size={22} color={colors.ink} strokeWidth={2.25} />
              </Pressable>
              <Text style={styles.brand}>{isScanner ? 'Scanner' : 'QRious'}</Text>
              {isScanner ? <View style={styles.headerSpacer} /> : <NewButton compact />}
            </View>
            <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
              <Sidebar collapsed={false} onNavigate={() => setDrawerOpen(false)} />
            </MobileDrawer>
          </>
        )}
        <View style={[styles.content, isScanner && styles.contentScanner]}>{children}</View>
      </View>
    </SafeAreaView>
  )
}

/** Drawer latéral gauche — slide + fade, swipe pour fermer (iOS / iPad / web). */
function MobileDrawer({
  open,
  onClose,
  children,
}: {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(open)
  const progress = useSharedValue(open ? 1 : 0)
  const dragX = useSharedValue(0)

  useEffect(() => {
    if (open) {
      setMounted(true)
      dragX.value = 0
      progress.value = withTiming(1, { duration: MOTION_MS, easing: MOTION_EASING })
      return
    }
    progress.value = withTiming(0, { duration: MOTION_MS, easing: MOTION_EASING }, (finished) => {
      if (finished) runOnJS(setMounted)(false)
    })
  }, [open, progress, dragX])

  const closeFromGesture = () => {
    onClose()
  }

  const pan = Gesture.Pan()
    .activeOffsetX([-12, 12])
    .failOffsetY([-24, 24])
    .onUpdate((e) => {
      dragX.value = Math.min(0, Math.max(-DRAWER_WIDTH, e.translationX))
    })
    .onEnd((e) => {
      const shouldClose = e.translationX < -DRAWER_WIDTH * 0.28 || e.velocityX < -600
      if (shouldClose) {
        dragX.value = withTiming(-DRAWER_WIDTH, { duration: 180, easing: MOTION_EASING })
        progress.value = withTiming(0, { duration: 180, easing: MOTION_EASING }, (finished) => {
          if (finished) {
            dragX.value = 0
            runOnJS(closeFromGesture)()
          }
        })
      } else {
        dragX.value = withTiming(0, { duration: 220, easing: MOTION_EASING })
      }
    })

  const backdropOpacityStyle = useAnimatedStyle(() => {
    const dragFactor = interpolate(
      dragX.value,
      [-DRAWER_WIDTH, 0],
      [0, 1],
      Extrapolation.CLAMP,
    )
    return {
      opacity: interpolate(progress.value, [0, 1], [0, 0.35], Extrapolation.CLAMP) * dragFactor,
    }
  })

  const drawerStyle = useAnimatedStyle(() => {
    const base = interpolate(progress.value, [0, 1], [-DRAWER_WIDTH, 0], Extrapolation.CLAMP)
    return {
      transform: [{ translateX: base + dragX.value }],
    }
  })

  if (!mounted) return null

  return (
    <View style={styles.drawerOverlay} pointerEvents="box-none">
      <Animated.View style={[styles.drawerBackdrop, backdropOpacityStyle]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel="Fermer le menu" />
      </Animated.View>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.drawer, drawerStyle]}>
          <Pressable style={styles.close} onPress={onClose} accessibilityLabel="Fermer">
            <X size={18} color={colors.slate600} />
          </Pressable>
          {children}
        </Animated.View>
      </GestureDetector>
    </View>
  )
}

function NewButton({ compact }: { compact?: boolean }) {
  const router = useRouter()
  return (
    <Pressable
      onPress={() => router.push('/new')}
      accessibilityLabel="Créer un QR code"
      style={[styles.newBtn, compact && styles.newBtnCompact]}
    >
      <Plus size={18} color="#fff" />
      {!compact ? <Text style={styles.newBtnText}>Créer</Text> : null}
    </Pressable>
  )
}

function Sidebar({
  collapsed = false,
  animate = true,
  onToggleCollapsed,
  onNavigate,
}: {
  collapsed?: boolean
  /** Skip entrance animation on first paint from storage */
  animate?: boolean
  onToggleCollapsed?: () => void
  onNavigate: () => void
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { logout, user } = useAuth()
  const progress = useSharedValue(collapsed ? 0 : 1)
  const [labelsVisible, setLabelsVisible] = useState(!collapsed)
  const prev = React.useRef({ collapsed, animate })

  useEffect(() => {
    const collapsedChanged = prev.current.collapsed !== collapsed
    const unlockedMotion = !prev.current.animate && animate
    prev.current = { collapsed, animate }

    if (!animate) {
      progress.value = collapsed ? 0 : 1
      setLabelsVisible(!collapsed)
      return
    }

    // Hydration just finished — keep the restored state without animating.
    if (unlockedMotion && !collapsedChanged) return

    if (collapsed) {
      setLabelsVisible(false)
      progress.value = withTiming(0, { duration: MOTION_MS, easing: MOTION_EASING })
      return
    }

    progress.value = withTiming(1, { duration: MOTION_MS, easing: MOTION_EASING })
    const t = setTimeout(() => setLabelsVisible(true), 100)
    return () => clearTimeout(t)
  }, [animate, collapsed, progress])

  const sidebarStyle = useAnimatedStyle(() => ({
    width: interpolate(progress.value, [0, 1], [SIDEBAR_COLLAPSED, SIDEBAR_EXPANDED]),
    paddingHorizontal: interpolate(progress.value, [0, 1], [8, 10]),
  }))

  const sectionStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.45, 1], [0, 0, 1]),
    height: interpolate(progress.value, [0, 1], [0, 22]),
    marginBottom: interpolate(progress.value, [0, 1], [0, 8]),
    overflow: 'hidden' as const,
  }))

  return (
    <Animated.View style={[styles.sidebar, collapsed && styles.sidebarCollapsed, sidebarStyle]}>
      <View style={[styles.brandBlock, collapsed && styles.brandBlockCollapsed]}>
        <View style={styles.logoMark}>
          <Text style={styles.logoMarkText}>QR</Text>
        </View>
        {labelsVisible ? (
          <Animated.View
            entering={FadeIn.duration(200).delay(40)}
            exiting={FadeOut.duration(140)}
            style={styles.brandText}
          >
            <Text style={styles.brandTitle}>QRious</Text>
            <Text style={styles.brandSub}>Dashboard</Text>
          </Animated.View>
        ) : null}
        {onToggleCollapsed ? (
          <Pressable
            onPress={onToggleCollapsed}
            accessibilityLabel={collapsed ? 'Déplier la sidebar' : 'Replier la sidebar'}
            style={styles.collapseBtn}
          >
            {collapsed ? (
              <ChevronRight size={16} color={colors.slate500} />
            ) : (
              <ChevronLeft size={16} color={colors.slate500} />
            )}
          </Pressable>
        ) : null}
      </View>

      <Animated.View style={sectionStyle}>
        <Text style={styles.sectionLabel}>Navigation</Text>
      </Animated.View>

      <View style={styles.nav}>
        {NAV.map((item) => {
          const { href, label, icon: Icon } = item
          const exact = 'exact' in item ? item.exact : false
          const active = isActive(pathname, href, exact)
          return (
            <Pressable
              key={href}
              onPress={() => {
                router.push(href as '/')
                onNavigate()
              }}
              accessibilityLabel={label}
              accessibilityState={{ selected: active }}
              style={[
                styles.navItem,
                collapsed && styles.navItemCollapsed,
                active && styles.navItemActive,
              ]}
            >
              <Icon size={20} color={active ? colors.signal : colors.slate700} strokeWidth={2.25} />
              {labelsVisible ? (
                <Animated.Text
                  entering={FadeIn.duration(200).delay(40)}
                  exiting={FadeOut.duration(120)}
                  style={[styles.navLabel, active && styles.navLabelActive]}
                  numberOfLines={1}
                >
                  {label}
                </Animated.Text>
              ) : null}
            </Pressable>
          )
        })}
      </View>

      <View style={[styles.sidebarFooter, collapsed && styles.sidebarFooterCollapsed]}>
        <Pressable
          onPress={() => {
            router.push('/new')
            onNavigate()
          }}
          accessibilityLabel="Créer"
          style={[styles.newBtn, collapsed && styles.newBtnCollapsed]}
        >
          <Plus size={18} color="#fff" />
          {labelsVisible ? (
            <Animated.Text
              entering={FadeIn.duration(200).delay(40)}
              exiting={FadeOut.duration(120)}
              style={styles.newBtnText}
            >
              Créer
            </Animated.Text>
          ) : null}
        </Pressable>

        {labelsVisible ? (
          <Animated.Text
            entering={FadeIn.duration(200).delay(40)}
            exiting={FadeOut.duration(120)}
            style={styles.userEmail}
            numberOfLines={1}
          >
            {user?.email}
          </Animated.Text>
        ) : null}

        <Pressable
          style={[styles.logout, collapsed && styles.logoutCollapsed]}
          accessibilityLabel="Déconnexion"
          onPress={async () => {
            await logout()
            router.replace('/login')
          }}
        >
          <LogOut size={18} color={colors.slate500} />
          {labelsVisible ? (
            <Animated.Text
              entering={FadeIn.duration(200).delay(40)}
              exiting={FadeOut.duration(120)}
              style={styles.logoutText}
            >
              Déconnexion
            </Animated.Text>
          ) : null}
        </Pressable>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.slate50 },
  root: { flex: 1 },
  rootDesktop: { flexDirection: 'row' },
  content: { flex: 1, padding: spacing.lg, minWidth: 0 },
  contentScanner: { padding: 0 },
  headerSpacer: { width: 36, height: 36 },
  mobileHeader: {
    height: 56,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.white,
  },
  menuBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  brand: { fontSize: 18, fontWeight: '700', color: colors.ink },
  drawerOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 20,
    flexDirection: 'row',
  },
  drawerBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0F172A',
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: colors.white,
    borderRightWidth: 1,
    borderRightColor: colors.border,
    shadowColor: '#0F172A',
    shadowOffset: { width: 8, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 12,
  },
  close: { position: 'absolute', right: 8, top: 10, zIndex: 2, padding: 8 },
  sidebar: {
    width: SIDEBAR_EXPANDED,
    flexGrow: 0,
    flexShrink: 0,
    backgroundColor: colors.white,
    borderRightWidth: 1,
    borderRightColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 14,
    overflow: 'hidden',
  },
  sidebarCollapsed: {
    alignItems: 'center',
  },
  brandBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 18,
    minHeight: 40,
  },
  brandBlockCollapsed: {
    flexDirection: 'column',
    gap: 8,
    alignItems: 'center',
  },
  logoMark: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoMarkText: { color: '#fff', fontWeight: '800', fontSize: 12 },
  brandText: { flex: 1, minWidth: 0 },
  brandTitle: { fontSize: 16, fontWeight: '800', color: colors.ink },
  brandSub: { color: colors.slate500, marginTop: 1, fontSize: 11 },
  collapseBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.slate200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.slate50,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.slate400,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    paddingHorizontal: 8,
  },
  nav: { gap: 4, flex: 1, width: '100%' },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    position: 'relative',
  },
  navItemCollapsed: {
    justifyContent: 'center',
    paddingHorizontal: 0,
    width: 44,
    alignSelf: 'center',
  },
  navItemActive: { backgroundColor: colors.slate900 },
  navLabel: { fontSize: 15, fontWeight: '700', color: colors.slate900, flex: 1 },
  navLabelActive: { color: colors.white },
  sidebarFooter: {
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: colors.slate100,
    paddingTop: 12,
    width: '100%',
  },
  sidebarFooterCollapsed: {
    alignItems: 'center',
  },
  newBtn: {
    backgroundColor: colors.slate900,
    borderRadius: 10,
    minHeight: 38,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  newBtnCompact: { paddingHorizontal: 10 },
  newBtnCollapsed: {
    width: 44,
    paddingHorizontal: 0,
  },
  newBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  userEmail: { fontSize: 11, color: colors.slate400, paddingHorizontal: 4 },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  logoutCollapsed: {
    justifyContent: 'center',
    width: 44,
    paddingHorizontal: 0,
  },
  logoutText: { color: colors.slate500, fontWeight: '600', fontSize: 13 },
})

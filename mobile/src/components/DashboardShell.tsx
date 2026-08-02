import React, { useEffect, useState } from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { usePathname, useRouter } from 'expo-router'
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  FileText,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Plus,
  QrCode,
  User,
  X,
} from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useAuth } from '../auth/AuthContext'
import { colors, spacing } from '../theme/colors'

const SIDEBAR_EXPANDED = 200
const SIDEBAR_COLLAPSED = 68
const STORAGE_KEY = 'qrious_sidebar_collapsed'

const NAV = [
  { href: '/home', label: 'Vue d’ensemble', icon: LayoutDashboard, exact: true },
  { href: '/qr-codes', label: 'Mes QR Codes', icon: QrCode },
  { href: '/pages', label: 'Smart Pages', icon: FileText },
  { href: '/medias', label: 'Médias', icon: ImageIcon },
  { href: '/statistiques', label: 'Statistiques', icon: BarChart3 },
  { href: '/profil', label: 'Profil', icon: User },
] as const

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href || pathname === '/home'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { width } = useWindowDimensions()
  const desktop = width >= 900
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    void AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      if (value === '1') setCollapsed(true)
      setReady(true)
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
            onToggleCollapsed={() => void toggleCollapsed()}
            onNavigate={() => undefined}
          />
        ) : (
          <>
            <View style={styles.mobileHeader}>
              <Pressable onPress={() => setDrawerOpen(true)} style={styles.menuBtn}>
                <Text style={styles.menuBtnText}>☰</Text>
              </Pressable>
              <Text style={styles.brand}>QRious</Text>
              <NewButton compact />
            </View>
            {drawerOpen ? (
              <View style={styles.drawerOverlay}>
                <Pressable style={styles.drawerBackdrop} onPress={() => setDrawerOpen(false)} />
                <View style={styles.drawer}>
                  <Pressable style={styles.close} onPress={() => setDrawerOpen(false)}>
                    <X size={18} color={colors.slate600} />
                  </Pressable>
                  <Sidebar
                    collapsed={false}
                    onNavigate={() => setDrawerOpen(false)}
                  />
                </View>
              </View>
            ) : null}
          </>
        )}
        <View style={styles.content}>{children}</View>
      </View>
    </SafeAreaView>
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
  onToggleCollapsed,
  onNavigate,
}: {
  collapsed?: boolean
  onToggleCollapsed?: () => void
  onNavigate: () => void
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { logout, user } = useAuth()

  return (
    <View style={[styles.sidebar, collapsed && styles.sidebarCollapsed]}>
      <View style={[styles.brandBlock, collapsed && styles.brandBlockCollapsed]}>
        <View style={[styles.logoMark, collapsed && styles.logoMarkCollapsed]}>
          <Text style={styles.logoMarkText}>QR</Text>
        </View>
        {!collapsed ? (
          <View style={styles.brandText}>
            <Text style={styles.brandTitle}>QRious</Text>
            <Text style={styles.brandSub}>Dashboard</Text>
          </View>
        ) : null}
        {onToggleCollapsed ? (
          <Pressable
            onPress={onToggleCollapsed}
            accessibilityLabel={collapsed ? 'Déplier la sidebar' : 'Replier la sidebar'}
            style={[styles.collapseBtn, collapsed && styles.collapseBtnCollapsed]}
          >
            {collapsed ? (
              <ChevronRight size={16} color={colors.slate500} />
            ) : (
              <ChevronLeft size={16} color={colors.slate500} />
            )}
          </Pressable>
        ) : null}
      </View>

      {!collapsed ? <Text style={styles.sectionLabel}>Navigation</Text> : null}

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
              {!collapsed ? (
                <Text style={[styles.navLabel, active && styles.navLabelActive]} numberOfLines={1}>
                  {label}
                </Text>
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
          {!collapsed ? <Text style={styles.newBtnText}>Créer</Text> : null}
        </Pressable>

        {!collapsed ? (
          <Text style={styles.userEmail} numberOfLines={1}>
            {user?.email}
          </Text>
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
          {!collapsed ? <Text style={styles.logoutText}>Déconnexion</Text> : null}
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.slate50 },
  root: { flex: 1 },
  rootDesktop: { flexDirection: 'row' },
  content: { flex: 1, padding: spacing.lg, minWidth: 0 },
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
  menuBtnText: { fontSize: 22, color: colors.ink },
  brand: { fontSize: 18, fontWeight: '700', color: colors.ink },
  drawerOverlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 20,
    flexDirection: 'row',
  },
  drawerBackdrop: { flex: 1, backgroundColor: 'rgba(15,23,42,0.35)' },
  drawer: {
    width: SIDEBAR_EXPANDED + 16,
    backgroundColor: colors.white,
    borderRightWidth: 1,
    borderRightColor: colors.border,
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
  },
  sidebarCollapsed: {
    width: SIDEBAR_COLLAPSED,
    paddingHorizontal: 8,
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
  logoMarkCollapsed: {
    width: 36,
    height: 36,
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
  collapseBtnCollapsed: {
    width: 28,
    height: 28,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.slate400,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginBottom: 8,
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

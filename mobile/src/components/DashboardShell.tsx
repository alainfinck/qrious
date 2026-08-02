import React from 'react'
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { usePathname, useRouter } from 'expo-router'
import {
  BarChart3,
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

const NAV = [
  { href: '/', label: 'Vue d’ensemble', icon: LayoutDashboard, exact: true },
  { href: '/qr-codes', label: 'Mes QR Codes', icon: QrCode },
  { href: '/pages', label: 'Smart Pages', icon: FileText },
  { href: '/medias', label: 'Médias', icon: ImageIcon },
  { href: '/statistiques', label: 'Statistiques', icon: BarChart3 },
  { href: '/profil', label: 'Profil', icon: User },
] as const

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href || pathname === ''
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { width } = useWindowDimensions()
  const desktop = width >= 900
  const [open, setOpen] = React.useState(false)

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={[styles.root, desktop && styles.rootDesktop]}>
        {desktop ? (
          <Sidebar onNavigate={() => undefined} />
        ) : (
          <>
            <View style={styles.mobileHeader}>
              <Pressable onPress={() => setOpen(true)} style={styles.menuBtn}>
                <Text style={styles.menuBtnText}>☰</Text>
              </Pressable>
              <Text style={styles.brand}>QRious</Text>
              <NewButton compact />
            </View>
            {open ? (
              <View style={styles.drawerOverlay}>
                <Pressable style={styles.drawerBackdrop} onPress={() => setOpen(false)} />
                <View style={styles.drawer}>
                  <Pressable style={styles.close} onPress={() => setOpen(false)}>
                    <X size={20} color={colors.slate600} />
                  </Pressable>
                  <Sidebar onNavigate={() => setOpen(false)} />
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
      style={[styles.newBtn, compact && { paddingHorizontal: 10 }]}
    >
      <Plus size={18} color="#fff" />
      {!compact ? <Text style={styles.newBtnText}>Créer</Text> : null}
    </Pressable>
  )
}

function Sidebar({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname()
  const router = useRouter()
  const { logout, user } = useAuth()

  return (
    <View style={styles.sidebar}>
      <View style={styles.brandBlock}>
        <View style={styles.logoMark}>
          <Text style={styles.logoMarkText}>QR</Text>
        </View>
        <View>
          <Text style={styles.brandTitle}>QRious</Text>
          <Text style={styles.brandSub}>Dashboard</Text>
        </View>
      </View>

      <Text style={styles.sectionLabel}>Navigation</Text>
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
              style={[styles.navItem, active && styles.navItemActive]}
            >
              <Icon size={18} color={active ? colors.signal : colors.slate400} />
              <Text style={[styles.navLabel, active && styles.navLabelActive]}>{label}</Text>
            </Pressable>
          )
        })}
      </View>

      <View style={styles.sidebarFooter}>
        <NewButton />
        <Text style={styles.userEmail} numberOfLines={1}>
          {user?.email}
        </Text>
        <Pressable
          style={styles.logout}
          onPress={async () => {
            await logout()
            router.replace('/login')
          }}
        >
          <LogOut size={18} color={colors.slate500} />
          <Text style={styles.logoutText}>Déconnexion</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.slate50 },
  root: { flex: 1 },
  rootDesktop: { flexDirection: 'row' },
  content: { flex: 1, padding: spacing.lg },
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
    width: 280,
    backgroundColor: colors.white,
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  close: { position: 'absolute', right: 12, top: 12, zIndex: 2, padding: 8 },
  sidebar: {
    width: 260,
    flex: 1,
    backgroundColor: colors.white,
    borderRightWidth: 1,
    borderRightColor: colors.border,
    padding: spacing.lg,
  },
  brandBlock: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 28 },
  logoMark: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoMarkText: { color: '#fff', fontWeight: '800' },
  brandTitle: { fontSize: 20, fontWeight: '800', color: colors.ink },
  brandSub: { color: colors.slate500, marginTop: 2 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.slate400,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  nav: { gap: 6, flex: 1 },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  navItemActive: { backgroundColor: colors.slate900 },
  navLabel: { fontSize: 15, fontWeight: '600', color: colors.slate600 },
  navLabelActive: { color: colors.white },
  sidebarFooter: { gap: 10, borderTopWidth: 1, borderTopColor: colors.slate100, paddingTop: 14 },
  newBtn: {
    backgroundColor: colors.slate900,
    borderRadius: 12,
    minHeight: 42,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  newBtnText: { color: '#fff', fontWeight: '700' },
  userEmail: { fontSize: 12, color: colors.slate400 },
  logout: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 8 },
  logoutText: { color: colors.slate500, fontWeight: '600' },
})

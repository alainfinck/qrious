import React from 'react'
import { ActivityIndicator, Platform, View } from 'react-native'
import { Stack, useGlobalSearchParams, useRouter, useSegments } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { AuthProvider, useAuth } from '../src/auth/AuthContext'
import { colors } from '../src/theme/colors'

function isEmbedMode(params: Record<string, string | string[] | undefined>): boolean {
  const raw = params.embed
  const v = (Array.isArray(raw) ? raw[0] : raw)?.toLowerCase()
  if (v === '1' || v === 'true' || v === 'yes') return true
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    try {
      const q = new URLSearchParams(window.location.search).get('embed')?.toLowerCase()
      return q === '1' || q === 'true' || q === 'yes'
    } catch {
      return false
    }
  }
  return false
}

function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const segments = useSegments()
  const router = useRouter()
  const params = useGlobalSearchParams()
  const embedMode = isEmbedMode(params)

  React.useEffect(() => {
    if (loading) return
    const segStr = segments.join('/')
    const inAuth =
      segments.includes('(auth)') ||
      segments.includes('login') ||
      segments.includes('register') ||
      segments.includes('forgot-password') ||
      segments.includes('reset-password')

    const inPublic =
      segments.includes('(public)') ||
      segStr === '' ||
      segStr === 'index' ||
      segStr === 'newqr' ||
      segments.length === 0

    if (!user && !inAuth && !inPublic) {
      // Non connecté et sur une route protégée -> rediriger vers login
      router.replace('/login')
    } else if (user && inAuth) {
      router.replace('/home')
    } else if (user && inPublic && !embedMode) {
      // Mode embed (iframe partenaires) : rester sur l’éditeur même si connecté
      router.replace('/home')
    }
  }, [user, loading, segments, router, embedMode])

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.slate50 }}>
        <ActivityIndicator size="large" color={colors.signal} />
      </View>
    )
  }

  return <>{children}</>
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <StatusBar style="dark" />
        <AuthGate>
          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.slate50 } }} />
        </AuthGate>
      </AuthProvider>
    </GestureHandlerRootView>
  )
}

import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { Stack, useRouter, useSegments } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { AuthProvider, useAuth } from '../src/auth/AuthContext'
import { colors } from '../src/theme/colors'

function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const segments = useSegments()
  const router = useRouter()

  React.useEffect(() => {
    if (loading) return
    const root = segments[0]
    const inAuth = root === '(auth)'
    const inPublic = root === '(public)'

    if (!user && !inAuth && !inPublic) {
      // Invité : éditeur public plutôt que login forcé
      router.replace('/')
    } else if (user && inAuth) {
      router.replace('/home')
    } else if (user && inPublic) {
      router.replace('/home')
    }
  }, [user, loading, segments, router])

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

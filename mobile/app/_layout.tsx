import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { Stack, useRouter, useSegments } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { AuthProvider, useAuth } from '../src/auth/AuthContext'
import { colors } from '../src/theme/colors'

function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const segments = useSegments()
  const router = useRouter()

  React.useEffect(() => {
    if (loading) return
    const inAuth = segments[0] === '(auth)'
    if (!user && !inAuth) {
      router.replace('/login')
    } else if (user && inAuth) {
      router.replace('/')
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
    <AuthProvider>
      <StatusBar style="dark" />
      <AuthGate>
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.slate50 } }} />
      </AuthGate>
    </AuthProvider>
  )
}

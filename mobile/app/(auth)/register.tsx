import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useAuth } from '../../src/auth/AuthContext'
import { Button, Input } from '../../src/components/ui'
import { colors, spacing } from '../../src/theme/colors'

export default function RegisterScreen() {
  const { register } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit() {
    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères')
      return
    }
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas')
      return
    }
    setLoading(true)
    setError(null)
    try {
      await register(email, password)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Impossible de créer le compte')
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            <Text style={styles.brand}>QRious</Text>
            <Text style={styles.title}>Créer un compte</Text>
            <Input label="E-mail" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
            <Input label="Mot de passe" value={password} onChangeText={setPassword} secureTextEntry />
            <Input label="Confirmer" value={confirm} onChangeText={setConfirm} secureTextEntry />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Button label="Créer mon compte" loading={loading} onPress={() => void onSubmit()} />
            <Link href="/login" style={styles.link}>
              Déjà un compte ? Se connecter
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.slate50 },
  container: { flexGrow: 1, justifyContent: 'center', padding: spacing.xl },
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    gap: spacing.md,
    maxWidth: 440,
    width: '100%',
    alignSelf: 'center',
  },
  brand: { fontSize: 28, fontWeight: '800', color: colors.ink },
  title: { fontSize: 22, fontWeight: '700', color: colors.ink },
  error: { color: colors.danger, fontWeight: '600' },
  link: { color: colors.signal, fontWeight: '600', textAlign: 'center' },
})

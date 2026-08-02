import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useAuth } from '../../src/auth/AuthContext'
import { Button, Input } from '../../src/components/ui'
import { colors, spacing } from '../../src/theme/colors'

export default function ResetPasswordScreen() {
  const { token } = useLocalSearchParams<{ token?: string }>()
  const { resetPassword } = useAuth()
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit() {
    if (!token) {
      setError('Lien invalide')
      return
    }
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
      await resetPassword(String(token), password)
      router.replace('/')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Lien expiré ou invalide')
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.card}>
        <Text style={styles.title}>Nouveau mot de passe</Text>
        <Input label="Mot de passe" value={password} onChangeText={setPassword} secureTextEntry />
        <Input label="Confirmer" value={confirm} onChangeText={setConfirm} secureTextEntry />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Button label="Enregistrer" loading={loading} onPress={() => void onSubmit()} />
        <Link href="/login" style={styles.link}>
          Retour connexion
        </Link>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.slate50, justifyContent: 'center', padding: spacing.xl },
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
  title: { fontSize: 22, fontWeight: '700', color: colors.ink },
  error: { color: colors.danger },
  link: { color: colors.signal, fontWeight: '600', textAlign: 'center' },
})

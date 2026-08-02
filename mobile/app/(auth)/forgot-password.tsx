import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useAuth } from '../../src/auth/AuthContext'
import { Button, Input } from '../../src/components/ui'
import { colors, spacing } from '../../src/theme/colors'

export default function ForgotPasswordScreen() {
  const { forgotPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit() {
    setLoading(true)
    setError(null)
    setMessage(null)
    try {
      await forgotPassword(email)
      setMessage('Si un compte existe, vous recevrez un e-mail de réinitialisation.')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur')
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.card}>
        <Text style={styles.title}>Mot de passe oublié</Text>
        <Input label="E-mail" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {message ? <Text style={styles.ok}>{message}</Text> : null}
        <Button label="Envoyer le lien" loading={loading} onPress={() => void onSubmit()} />
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
  ok: { color: colors.success },
  link: { color: colors.signal, fontWeight: '600', textAlign: 'center' },
})

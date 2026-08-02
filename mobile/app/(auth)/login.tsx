import React, { useState } from 'react'
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { Link } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { ArrowRight, Eye, EyeOff } from 'lucide-react-native'

import { useAuth } from '../../src/auth/AuthContext'
import { AuthShell } from '../../src/components/AuthShell'

export default function LoginScreen() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

  async function onSubmit() {
    if (!email.trim() || !password) {
      setError('E-mail et mot de passe requis')
      return
    }
    setLoading(true)
    setError(null)
    try {
      await login(email, password)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'E-mail ou mot de passe incorrect')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title="Bon retour"
      description="Connectez-vous pour accéder à votre tableau de bord"
    >
      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
            autoCorrect={false}
            placeholder="vous@exemple.fr"
            placeholderTextColor="rgba(255,255,255,0.35)"
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            style={[styles.input, emailFocused && styles.inputFocused]}
            editable={!loading}
          />
        </View>

        <View style={styles.field}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>Mot de passe</Text>
            <Link href="/forgot-password" style={styles.forgot}>
              Mot de passe oublié ?
            </Link>
          </View>
          <View style={styles.passwordWrap}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoComplete="password"
              placeholder="••••••••"
              placeholderTextColor="rgba(255,255,255,0.35)"
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              onSubmitEditing={() => void onSubmit()}
              style={[styles.input, styles.passwordInput, passwordFocused && styles.inputFocused]}
              editable={!loading}
            />
            <Pressable
              onPress={() => setShowPassword((v) => !v)}
              style={styles.eyeBtn}
              accessibilityLabel={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            >
              {showPassword ? (
                <EyeOff size={20} color="rgba(255,255,255,0.55)" />
              ) : (
                <Eye size={20} color="rgba(255,255,255,0.55)" />
              )}
            </Pressable>
          </View>
        </View>

        {error ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        <Pressable
          onPress={() => void onSubmit()}
          disabled={loading}
          style={({ pressed }) => [
            styles.submitWrap,
            (pressed || loading) && { opacity: 0.88 },
          ]}
        >
          <LinearGradient
            colors={['#FF5C4D', '#FF8A3D', '#FFC53D']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.submit}
          >
            {loading ? (
              <>
                <ActivityIndicator color="#0B1220" />
                <Text style={styles.submitLabel}>Connexion…</Text>
              </>
            ) : (
              <>
                <Text style={styles.submitLabel}>Se connecter</Text>
                <ArrowRight size={20} color="#0B1220" strokeWidth={2.5} />
              </>
            )}
          </LinearGradient>
        </Pressable>

        <Text style={styles.footer}>
          Pas encore de compte ?{' '}
          <Link href="/register" style={styles.footerLink}>
            Créer un compte
          </Link>
        </Text>
      </View>
    </AuthShell>
  )
}

const styles = StyleSheet.create({
  form: {
    gap: 20,
  },
  field: {
    gap: 10,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.9)',
  },
  forgot: {
    fontSize: 13,
    fontWeight: '600',
    color: '#38BDF8',
  },
  input: {
    minHeight: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
    color: '#fff',
  },
  inputFocused: {
    borderColor: '#12C4A8',
    backgroundColor: 'rgba(18,196,168,0.08)',
  },
  passwordWrap: {
    position: 'relative',
    justifyContent: 'center',
  },
  passwordInput: {
    paddingRight: 52,
  },
  eyeBtn: {
    position: 'absolute',
    right: 14,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorBox: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,92,77,0.4)',
    backgroundColor: 'rgba(255,92,77,0.15)',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  errorText: {
    color: '#FFB4AC',
    fontSize: 14,
    fontWeight: '600',
  },
  submitWrap: {
    marginTop: 4,
    borderRadius: 16,
    overflow: 'hidden',
  },
  submit: {
    minHeight: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 20,
  },
  submitLabel: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0B1220',
  },
  footer: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 15,
    color: 'rgba(255,255,255,0.55)',
  },
  footerLink: {
    fontWeight: '700',
    color: '#12C4A8',
  },
})

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

export default function RegisterScreen() {
  const { register } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [confirmFocused, setConfirmFocused] = useState(false)

  async function onSubmit() {
    if (!email.trim() || !password || !confirm) {
      setError('Tous les champs sont requis')
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
      await register(email, password)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Impossible de créer le compte')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title="Créer un compte"
      description="Publiez des Smart Pages, suivez vos scans et gérez vos QR"
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
          <Text style={styles.label}>Mot de passe</Text>
          <View style={styles.passwordWrap}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoComplete="new-password"
              placeholder="8 caractères minimum"
              placeholderTextColor="rgba(255,255,255,0.35)"
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
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

        <View style={styles.field}>
          <Text style={styles.label}>Confirmer le mot de passe</Text>
          <View style={styles.passwordWrap}>
            <TextInput
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry={!showConfirm}
              autoComplete="new-password"
              placeholder="••••••••"
              placeholderTextColor="rgba(255,255,255,0.35)"
              onFocus={() => setConfirmFocused(true)}
              onBlur={() => setConfirmFocused(false)}
              onSubmitEditing={() => void onSubmit()}
              style={[styles.input, styles.passwordInput, confirmFocused && styles.inputFocused]}
              editable={!loading}
            />
            <Pressable
              onPress={() => setShowConfirm((v) => !v)}
              style={styles.eyeBtn}
              accessibilityLabel={showConfirm ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            >
              {showConfirm ? (
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
                <Text style={styles.submitLabel}>Création…</Text>
              </>
            ) : (
              <>
                <Text style={styles.submitLabel}>Créer mon compte</Text>
                <ArrowRight size={20} color="#0B1220" strokeWidth={2.5} />
              </>
            )}
          </LinearGradient>
        </Pressable>

        <Text style={styles.footer}>
          Déjà un compte ?{' '}
          <Link href="/login" style={styles.footerLink}>
            Se connecter
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
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.9)',
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

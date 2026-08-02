'use server'

import { login, logout } from '@payloadcms/next/auth'
import { getPayload } from 'payload'
import { redirect } from 'next/navigation'

import config from '@payload-config'

export type AuthActionResult = {
  error?: string
  success?: string
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

function validatePassword(password: string): string | null {
  if (password.length < 8) {
    return 'Le mot de passe doit contenir au moins 8 caractères'
  }
  return null
}

export async function loginAction(formData: FormData): Promise<AuthActionResult | void> {
  const email = normalizeEmail(String(formData.get('email') ?? ''))
  const password = String(formData.get('password') ?? '')
  const redirectTo = String(formData.get('redirectTo') ?? '').trim()

  if (!email || !password) {
    return { error: 'E-mail et mot de passe requis' }
  }

  try {
    await login({
      collection: 'users',
      config,
      email,
      password,
    })
  } catch {
    return { error: 'E-mail ou mot de passe incorrect' }
  }

  const target = redirectTo && redirectTo.startsWith('/dashboard') ? redirectTo : '/dashboard'
  redirect(target)
}

export async function logoutAction(): Promise<void> {
  try {
    await logout({ allSessions: true, config })
  } catch {
    // Cookie may already be cleared
  }
  redirect('/dashboard/login')
}

export async function registerAction(formData: FormData): Promise<AuthActionResult | void> {
  const email = normalizeEmail(String(formData.get('email') ?? ''))
  const password = String(formData.get('password') ?? '')
  const confirmPassword = String(formData.get('confirmPassword') ?? '')
  const redirectTo = String(formData.get('redirectTo') ?? '').trim()

  if (!email || !password) {
    return { error: 'E-mail et mot de passe requis' }
  }

  const passwordError = validatePassword(password)
  if (passwordError) {
    return { error: passwordError }
  }

  if (password !== confirmPassword) {
    return { error: 'Les mots de passe ne correspondent pas' }
  }

  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
    overrideAccess: true,
  })

  if (existing.docs.length > 0) {
    return { error: 'Un compte existe déjà avec cet e-mail' }
  }

  try {
    await payload.create({
      collection: 'users',
      data: {
        email,
        password,
        role: 'user',
      },
      overrideAccess: true,
    })
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Impossible de créer le compte',
    }
  }

  try {
    await login({
      collection: 'users',
      config,
      email,
      password,
    })
  } catch {
    redirect('/dashboard/login?registered=1')
  }

  const target = redirectTo && redirectTo.startsWith('/dashboard') ? redirectTo : '/dashboard'
  redirect(target)
}

export async function forgotPasswordAction(formData: FormData): Promise<AuthActionResult> {
  const email = normalizeEmail(String(formData.get('email') ?? ''))

  if (!email) {
    return { error: 'E-mail requis' }
  }

  if (!process.env.SMTP_HOST) {
    return {
      error: "L'envoi d'e-mails n'est pas configuré. Contactez le support.",
    }
  }

  const payload = await getPayload({ config })

  try {
    await payload.forgotPassword({
      collection: 'users',
      data: { email },
      disableEmail: false,
    })
  } catch {
    // Ne pas révéler si l'e-mail existe ou non
  }

  return {
    success:
      'Si un compte est associé à cet e-mail, vous recevrez un lien de réinitialisation.',
  }
}

export async function resetPasswordAction(formData: FormData): Promise<AuthActionResult | void> {
  const token = String(formData.get('token') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  const confirmPassword = String(formData.get('confirmPassword') ?? '')

  if (!token) {
    return { error: 'Lien de réinitialisation invalide' }
  }

  const passwordError = validatePassword(password)
  if (passwordError) {
    return { error: passwordError }
  }

  if (password !== confirmPassword) {
    return { error: 'Les mots de passe ne correspondent pas' }
  }

  const payload = await getPayload({ config })

  let email: string | undefined

  try {
    const result = await payload.resetPassword({
      collection: 'users',
      data: { token, password },
      overrideAccess: true,
    })
    email = typeof result.user?.email === 'string' ? result.user.email : undefined
  } catch {
    return { error: 'Lien expiré ou invalide. Demandez un nouveau lien.' }
  }

  if (email) {
    try {
      await login({
        collection: 'users',
        config,
        email,
        password,
      })
      redirect('/dashboard')
    } catch {
      redirect('/dashboard/login?reset=1')
    }
  }

  redirect('/dashboard/login?reset=1')
}

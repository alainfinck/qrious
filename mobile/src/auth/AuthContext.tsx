import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import {
  forgotPasswordRequest,
  loginRequest,
  meRequest,
  registerRequest,
  resetPasswordRequest,
  type AuthUser,
} from '../api/landing-pages'
import { clearStoredToken, getStoredToken, setStoredToken } from './token'

type AuthContextValue = {
  user: AuthUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (token: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function bootstrap() {
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Auth check timeout')), 5000),
      )

      try {
        const token = await getStoredToken()
        if (!token) {
          if (!cancelled) setUser(null)
          return
        }
        const result = await Promise.race([meRequest(token), timeoutPromise])
        if (!cancelled) {
          setUser({
            id: String(result.user.id),
            email: result.user.email,
            role: result.user.role,
          })
        }
      } catch {
        await clearStoredToken().catch(() => {})
        if (!cancelled) setUser(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void bootstrap()
    return () => {
      cancelled = true
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const result = await loginRequest(email.trim().toLowerCase(), password)
    await setStoredToken(result.token)
    setUser({
      id: String(result.user.id),
      email: result.user.email,
      role: result.user.role,
    })
  }, [])

  const register = useCallback(async (email: string, password: string) => {
    const result = await registerRequest(email.trim().toLowerCase(), password)
    await setStoredToken(result.token)
    setUser({
      id: String(result.user.id),
      email: result.user.email,
      role: result.user.role,
    })
  }, [])

  const logout = useCallback(async () => {
    await clearStoredToken()
    setUser(null)
  }, [])

  const forgotPassword = useCallback(async (email: string) => {
    await forgotPasswordRequest(email.trim().toLowerCase())
  }, [])

  const resetPassword = useCallback(async (token: string, password: string) => {
    const result = await resetPasswordRequest(token, password)
    if (result.token && result.user) {
      await setStoredToken(result.token)
      setUser({
        id: String(result.user.id),
        email: result.user.email,
        role: result.user.role,
      })
    }
  }, [])

  const value = useMemo(
    () => ({ user, loading, login, register, logout, forgotPassword, resetPassword }),
    [user, loading, login, register, logout, forgotPassword, resetPassword],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

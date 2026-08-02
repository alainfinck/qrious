'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react'

import { AuthShell } from '@/components/dashboard/AuthShell'
import {
  authErrorClass,
  authFieldClass,
  authLabelClass,
  authLinkClass,
  authMutedLinkClass,
  authSuccessClass,
} from '@/components/dashboard/auth-styles'
import { BlurFade } from '@/components/ui/blur-fade'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { loginAction } from '@/lib/auth/actions'
import { cn } from '@/lib/utils'

export function LoginForm({
  notice,
  redirectTo,
}: {
  notice?: string | null
  redirectTo?: string
}) {
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(formData: FormData) {
    setPending(true)
    setError(null)
    const result = await loginAction(formData)
    if (result?.error) {
      setError(result.error)
      setPending(false)
    }
  }

  return (
    <AuthShell title="Bon retour" description="Connectez-vous pour accéder à votre tableau de bord">
      <form action={handleSubmit} className="space-y-6">
        {redirectTo ? <input type="hidden" name="redirectTo" value={redirectTo} /> : null}
        {notice ? (
          <BlurFade delay={0.05} inView>
            <p className={authSuccessClass}>{notice}</p>
          </BlurFade>
        ) : null}

        <BlurFade delay={0.08} inView>
          <div className="space-y-2.5">
            <Label htmlFor="email" className={authLabelClass}>
              E-mail
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="vous@exemple.fr"
              required
              autoFocus
              className={authFieldClass}
            />
          </div>
        </BlurFade>

        <BlurFade delay={0.14} inView>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="password" className={authLabelClass}>
                Mot de passe
              </Label>
              <Link
                href="/dashboard/forgot-password"
                className="text-sm font-medium text-mq-sky hover:text-mq-signal"
              >
                Mot de passe oublié ?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••"
                required
                className={cn(authFieldClass, 'pr-14')}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 transition-colors hover:text-white/80"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </BlurFade>

        {error ? <p className={authErrorClass}>{error}</p> : null}

        <BlurFade delay={0.2} inView>
          <ShimmerButton
            type="submit"
            disabled={pending}
            className="h-16 w-full text-lg disabled:cursor-not-allowed disabled:opacity-60"
            background="linear-gradient(135deg, #ff5c4d 0%, #ff8a3d 50%, #ffc53d 100%)"
            shimmerColor="#fff7e8"
            borderRadius="16px"
            shimmerDuration="2.2s"
          >
            <span className="flex items-center justify-center gap-2.5 text-lg font-bold text-mq-ink">
              {pending ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Connexion…
                </>
              ) : (
                <>
                  Se connecter
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </span>
          </ShimmerButton>
        </BlurFade>
      </form>

      <BlurFade delay={0.28} inView>
        <p className={`mt-7 ${authMutedLinkClass}`}>
          Pas encore de compte ?{' '}
          <Link href="/dashboard/register" className={authLinkClass}>
            Créer un compte
          </Link>
        </p>
      </BlurFade>
    </AuthShell>
  )
}

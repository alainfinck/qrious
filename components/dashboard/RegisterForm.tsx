'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'

import {
  authErrorClass,
  authFieldClass,
  authLabelClass,
  authLinkClass,
  authMutedLinkClass,
} from '@/components/dashboard/auth-styles'
import { AuthShell } from '@/components/dashboard/AuthShell'
import { BlurFade } from '@/components/ui/blur-fade'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { registerAction } from '@/lib/auth/actions'

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(formData: FormData) {
    setPending(true)
    setError(null)
    const result = await registerAction(formData)
    if (result?.error) {
      setError(result.error)
      setPending(false)
    }
  }

  return (
    <AuthShell
      title="Créer un compte"
      description="Rejoignez QRious pour gérer vos QR codes dynamiques"
    >
      <form action={handleSubmit} className="space-y-6">
        <BlurFade delay={0.08} inView>
          <div className="space-y-2">
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

        <BlurFade delay={0.12} inView>
          <div className="space-y-2">
            <Label htmlFor="password" className={authLabelClass}>
              Mot de passe
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="8 caractères minimum"
              minLength={8}
              required
              className={authFieldClass}
            />
          </div>
        </BlurFade>

        <BlurFade delay={0.16} inView>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className={authLabelClass}>
              Confirmer le mot de passe
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              minLength={8}
              required
              className={authFieldClass}
            />
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
          >
            <span className="flex items-center justify-center gap-2.5 text-lg font-bold text-mq-ink">
              {pending ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Création…
                </>
              ) : (
                <>
                  Créer mon compte
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </span>
          </ShimmerButton>
        </BlurFade>
      </form>

      <BlurFade delay={0.28} inView>
        <p className={`mt-7 ${authMutedLinkClass}`}>
          Déjà un compte ?{' '}
          <Link href="/dashboard/login" className={authLinkClass}>
            Se connecter
          </Link>
        </p>
      </BlurFade>
    </AuthShell>
  )
}

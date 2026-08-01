'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'

import {
  authErrorClass,
  authFieldClass,
  authLabelClass,
  authLinkClass,
} from '@/components/dashboard/auth-styles'
import { AuthShell } from '@/components/dashboard/AuthShell'
import { BlurFade } from '@/components/ui/blur-fade'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { resetPasswordAction } from '@/lib/auth/actions'

export function ResetPasswordForm({ token }: { token: string }) {
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  if (!token) {
    return (
      <AuthShell title="Lien invalide" description="Ce lien de réinitialisation est incomplet">
        <p className="text-sm text-white/60">
          Demandez un nouveau lien depuis la page{' '}
          <Link href="/dashboard/forgot-password" className={authLinkClass}>
            mot de passe oublié
          </Link>
          .
        </p>
      </AuthShell>
    )
  }

  async function handleSubmit(formData: FormData) {
    setPending(true)
    setError(null)
    formData.set('token', token)
    const result = await resetPasswordAction(formData)
    if (result?.error) {
      setError(result.error)
      setPending(false)
    }
  }

  return (
    <AuthShell title="Nouveau mot de passe" description="Choisissez un nouveau mot de passe sécurisé">
      <form action={handleSubmit} className="space-y-6">
        <BlurFade delay={0.08} inView>
          <div className="space-y-2">
            <Label htmlFor="password" className={authLabelClass}>
              Nouveau mot de passe
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="8 caractères minimum"
              minLength={8}
              required
              autoFocus
              className={authFieldClass}
            />
          </div>
        </BlurFade>

        <BlurFade delay={0.14} inView>
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
            className="h-14 w-full text-base disabled:cursor-not-allowed disabled:opacity-60"
            background="linear-gradient(135deg, #ff5c4d 0%, #ffc53d 100%)"
            shimmerColor="#fff7e8"
            borderRadius="12px"
          >
            <span className="flex items-center justify-center gap-2.5 text-base font-semibold text-mq-ink">
              {pending ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Enregistrement…
                </>
              ) : (
                <>
                  Enregistrer
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </span>
          </ShimmerButton>
        </BlurFade>
      </form>
    </AuthShell>
  )
}

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
  authSuccessClass,
} from '@/components/dashboard/auth-styles'
import { AuthShell } from '@/components/dashboard/AuthShell'
import { BlurFade } from '@/components/ui/blur-fade'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { forgotPasswordAction } from '@/lib/auth/actions'

export function ForgotPasswordForm() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(formData: FormData) {
    setPending(true)
    setError(null)
    setSuccess(null)
    const result = await forgotPasswordAction(formData)
    if (result.error) {
      setError(result.error)
    } else if (result.success) {
      setSuccess(result.success)
    }
    setPending(false)
  }

  return (
    <AuthShell
      title="Mot de passe oublié"
      description="Recevez un lien pour réinitialiser votre mot de passe"
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

        {error ? <p className={authErrorClass}>{error}</p> : null}
        {success ? <p className={authSuccessClass}>{success}</p> : null}

        <BlurFade delay={0.16} inView>
          <ShimmerButton
            type="submit"
            disabled={pending}
            className="h-14 w-full text-base disabled:cursor-not-allowed disabled:opacity-60"
            background="linear-gradient(135deg, #12c4a8 0%, #3dbbff 100%)"
            shimmerColor="#e8fff9"
            borderRadius="12px"
          >
            <span className="flex items-center justify-center gap-2.5 text-base font-semibold text-mq-ink">
              {pending ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Envoi…
                </>
              ) : (
                <>
                  Envoyer le lien
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </span>
          </ShimmerButton>
        </BlurFade>
      </form>

      <BlurFade delay={0.24} inView>
        <p className={`mt-7 ${authMutedLinkClass}`}>
          <Link href="/dashboard/login" className={authLinkClass}>
            ← Retour à la connexion
          </Link>
        </p>
      </BlurFade>
    </AuthShell>
  )
}

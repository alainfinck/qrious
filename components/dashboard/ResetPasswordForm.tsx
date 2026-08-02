'use client'

import { useState } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

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
import { Link } from '@/src/i18n/routing'

export function ResetPasswordForm({ token }: { token: string }) {
  const t = useTranslations('Dashboard.resetPassword')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  if (!token) {
    const linkLabel = t('forgotPasswordLink')
    const [hintBefore, hintAfter] = t('invalidHint', { link: '___' }).split('___')

    return (
      <AuthShell title={t('invalidTitle')} description={t('invalidDescription')}>
        <p className="text-sm text-white/60">
          {hintBefore}
          <Link href="/dashboard/forgot-password" className={authLinkClass}>
            {linkLabel}
          </Link>
          {hintAfter}
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
    <AuthShell title={t('title')} description={t('description')}>
      <form action={handleSubmit} className="space-y-6">
        <BlurFade delay={0.08} inView>
          <div className="space-y-2">
            <Label htmlFor="password" className={authLabelClass}>
              {t('newPassword')}
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder={t('passwordPlaceholder')}
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
              {t('confirmPassword')}
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
                  {t('submitting')}
                </>
              ) : (
                <>
                  {t('submit')}
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

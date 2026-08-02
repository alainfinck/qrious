'use client'

import { useState } from 'react'
import { ArrowRight, Loader2, LogOut } from 'lucide-react'
import { useTranslations } from 'next-intl'

import {
  authErrorClass,
  authFieldClass,
  authLabelClass,
  authLinkClass,
  authMutedLinkClass,
} from '@/components/dashboard/auth-styles'
import { AuthShell } from '@/components/dashboard/AuthShell'
import { OAuthButtons } from '@/components/dashboard/OAuthButtons'
import { BlurFade } from '@/components/ui/blur-fade'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { logoutAction, registerAction } from '@/lib/auth/actions'
import { Link } from '@/src/i18n/routing'

export function RegisterForm({
  hasSession = false,
  googleEnabled = false,
  appleEnabled = false,
}: {
  hasSession?: boolean
  googleEnabled?: boolean
  appleEnabled?: boolean
}) {
  const t = useTranslations('Dashboard.register')
  const tAuth = useTranslations('Dashboard.auth')
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

  if (hasSession) {
    return (
      <AuthShell title={t('title')} description={t('sessionDescription')}>
        <div className="space-y-4">
          <BlurFade delay={0.08} inView>
            <p className="rounded-2xl border border-mq-sun/30 bg-mq-sun/10 px-4 py-3 text-center text-sm leading-relaxed text-white/80">
              {t('sessionHint')}
            </p>
          </BlurFade>

          <BlurFade delay={0.12} inView>
            <form action={logoutAction}>
              <input type="hidden" name="redirectTo" value="/dashboard/register" />
              <ShimmerButton
                type="submit"
                className="h-14 w-full text-base"
                background="linear-gradient(135deg, #ff5c4d 0%, #ff8a3d 50%, #ffc53d 100%)"
                shimmerColor="#fff7e8"
                borderRadius="16px"
              >
                <span className="flex items-center justify-center gap-2.5 font-bold text-mq-ink">
                  <LogOut className="h-5 w-5" />
                  {t('logoutToRegister')}
                </span>
              </ShimmerButton>
            </form>
          </BlurFade>

          <BlurFade delay={0.18} inView>
            <Link
              href="/dashboard"
              className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-white/20 bg-white/5 text-sm font-medium text-white/85 transition-colors hover:bg-white/10"
            >
              {t('goToDashboard')}
            </Link>
          </BlurFade>
        </div>
      </AuthShell>
    )
  }

  return (
    <AuthShell title={t('title')} description={t('description')}>
      <BlurFade delay={0.05} inView>
        <OAuthButtons
          className="mb-6"
          googleEnabled={googleEnabled}
          appleEnabled={appleEnabled}
        />
      </BlurFade>

      <form action={handleSubmit} className="space-y-6">
        <BlurFade delay={0.08} inView>
          <div className="space-y-2">
            <Label htmlFor="email" className={authLabelClass}>
              {tAuth('email')}
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder={tAuth('emailPlaceholder')}
              required
              autoFocus
              className={authFieldClass}
            />
          </div>
        </BlurFade>

        <BlurFade delay={0.12} inView>
          <div className="space-y-2">
            <Label htmlFor="password" className={authLabelClass}>
              {tAuth('password')}
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder={t('passwordPlaceholder')}
              minLength={8}
              required
              className={authFieldClass}
            />
          </div>
        </BlurFade>

        <BlurFade delay={0.16} inView>
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
            className="h-16 w-full text-lg disabled:cursor-not-allowed disabled:opacity-60"
            background="linear-gradient(135deg, #ff5c4d 0%, #ff8a3d 50%, #ffc53d 100%)"
            shimmerColor="#fff7e8"
            borderRadius="16px"
          >
            <span className="flex items-center justify-center gap-2.5 text-lg font-bold text-mq-ink">
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

      <BlurFade delay={0.28} inView>
        <p className={`mt-7 ${authMutedLinkClass}`}>
          {t('hasAccount')}{' '}
          <Link href="/dashboard/login" className={authLinkClass}>
            {t('signIn')}
          </Link>
        </p>
      </BlurFade>
    </AuthShell>
  )
}

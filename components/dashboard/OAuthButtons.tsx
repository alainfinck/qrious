'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#EA4335"
        d="M12 10.2v3.6h5.1c-.2 1.2-.9 2.3-1.9 3l3.1 2.4c1.8-1.7 2.9-4.1 2.9-7 0-.7-.1-1.3-.2-1.9H12z"
      />
      <path
        fill="#34A853"
        d="M5.3 14.3 4.4 15l-2.5 2c1.6 3.1 4.8 5.2 8.4 5.2 2.5 0 4.7-.8 6.2-2.3l-3.1-2.4c-.8.6-1.9.9-3.1.9-2.4 0-4.4-1.6-5.1-3.8z"
      />
      <path
        fill="#4A90E2"
        d="M12 4.8c1.4 0 2.6.5 3.6 1.4l2.7-2.7C16.7 1.9 14.5 1 12 1 8.4 1 5.2 3.1 3.6 6.2l2.9 2.3C7.3 6.3 9.4 4.8 12 4.8z"
      />
      <path
        fill="#FBBC05"
        d="M5.3 9.7C5 10.4 4.8 11.2 4.8 12s.2 1.6.5 2.3l-2.9 2.3C1.5 15.1 1 13.6 1 12s.5-3.1 1.4-4.6l2.9 2.3z"
      />
    </svg>
  )
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.7 12.6c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.7-1.3-.1-2.5.8-3.1.8-.7 0-1.7-.7-2.8-.7-1.4 0-2.8.9-3.5 2.2-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7s1.7.7 2.8.7c1.2 0 1.9-1 2.6-2 .8-1.2 1.1-2.3 1.2-2.4-.1 0-2.1-.8-2.1-3.2zM14.4 6.3c.6-.7 1-1.7.9-2.7-1 .1-2.1.6-2.7 1.4-.6.7-1.1 1.7-.9 2.7 1 .1 2-.5 2.7-1.4z" />
    </svg>
  )
}

type OAuthButtonsProps = {
  className?: string
  googleEnabled?: boolean
  appleEnabled?: boolean
}

/**
 * OAuth must use a normal browser navigation (`<a href>`), not Next Link/router,
 * because the authorize endpoint returns a redirect to the IdP.
 */
export function OAuthButtons({
  className,
  googleEnabled = false,
  appleEnabled = false,
}: OAuthButtonsProps) {
  const t = useTranslations('Dashboard.login')

  const googleClass =
    'inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-white/15 bg-white px-4 text-sm font-semibold text-mq-ink transition-opacity hover:opacity-90'
  const appleClass =
    'inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-white/20 bg-black px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90'

  return (
    <div className={cn('space-y-3', className)}>
      <div className="relative flex items-center gap-3 py-1">
        <span className="h-px flex-1 bg-white/15" />
        <span className="text-xs font-medium uppercase tracking-[0.16em] text-white/40">
          {t('orContinueWith')}
        </span>
        <span className="h-px flex-1 bg-white/15" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {googleEnabled ? (
          <a href="/api/users/oauth/google" className={googleClass}>
            <GoogleIcon className="h-5 w-5" />
            {t('continueGoogle')}
          </a>
        ) : (
          <button
            type="button"
            disabled
            title={t('oauthNotConfigured')}
            className={cn(googleClass, 'cursor-not-allowed opacity-45')}
          >
            <GoogleIcon className="h-5 w-5" />
            {t('continueGoogle')}
          </button>
        )}

        {appleEnabled ? (
          <a href="/api/users/oauth/apple" className={appleClass}>
            <AppleIcon className="h-5 w-5" />
            {t('continueApple')}
          </a>
        ) : (
          <button
            type="button"
            disabled
            title={t('oauthNotConfigured')}
            className={cn(appleClass, 'cursor-not-allowed opacity-45')}
          >
            <AppleIcon className="h-5 w-5" />
            {t('continueApple')}
          </button>
        )}
      </div>
    </div>
  )
}

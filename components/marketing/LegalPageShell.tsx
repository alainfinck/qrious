'use client'

import { useTranslations } from 'next-intl'

import { BrandWordmark } from '@/components/brand/BrandWordmark'
import { MarketingFooter } from '@/components/marketing/MarketingFooter'
import { MarketingHeader } from '@/components/marketing/MarketingHeader'
import { Link } from '@/src/i18n/routing'

export function LegalPageShell({
  title,
  updated,
  children,
}: {
  title: string
  updated: string
  children: React.ReactNode
}) {
  const t = useTranslations('LegalShell')

  return (
    <div className="min-h-dvh bg-mq-paper font-body">
      <MarketingHeader />
      <main>
        <section className="relative overflow-hidden bg-mq-ink pt-32 pb-16 text-white lg:pt-40 lg:pb-20">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,#12c4a833_0%,transparent_50%),radial-gradient(ellipse_at_80%_60%,#ff5c4d22_0%,transparent_45%)]"
            aria-hidden
          />
          <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
            <p className="text-4xl font-bold tracking-tight sm:text-5xl">
              <BrandWordmark rainbow />
            </p>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {title}
            </h1>
            <p className="mt-3 text-sm text-white/50">
              {t('updatedPrefix')} {updated}
            </p>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <article className="prose-mq mx-auto max-w-3xl space-y-10 px-4 sm:px-6">
            {children}
          </article>
          <div className="mx-auto mt-12 max-w-3xl px-4 text-sm text-mq-muted sm:px-6">
            <Link href="/contact" className="font-medium text-mq-signal-deep hover:underline">
              {t('contactCta')}
            </Link>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  )
}

export function LegalSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-3">
      <h2 className="font-display text-xl font-bold text-mq-ink sm:text-2xl">{title}</h2>
      <div className="space-y-3 text-[15px] leading-relaxed text-mq-muted">{children}</div>
    </section>
  )
}

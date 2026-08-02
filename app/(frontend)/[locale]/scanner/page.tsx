import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { ScanLine } from 'lucide-react'

import { MarketingFooter } from '@/components/marketing/MarketingFooter'
import { MarketingHeader } from '@/components/marketing/MarketingHeader'
import { PublicQrScanner } from '@/components/marketing/PublicQrScanner'
import { Link } from '@/src/i18n/routing'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Scanner')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

export default async function ScannerPage() {
  const t = await getTranslations('Scanner')

  return (
    <div className="min-h-dvh bg-mq-paper font-body">
      <MarketingHeader />
      <main>
        <section className="relative overflow-hidden border-b border-mq-ink/10 bg-gradient-to-b from-mq-ink via-[#102536] to-mq-ink pt-28 pb-16 text-white sm:pt-32 sm:pb-20">
          <div
            className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-mq-signal/20 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-mq-coral/15 blur-3xl"
            aria-hidden
          />
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-mq-signal/30 bg-mq-signal/10 px-3 py-1 text-sm font-medium text-mq-signal">
              <ScanLine className="h-3.5 w-3.5" />
              {t('badge')}
            </p>
            <h1 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              {t('title')}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/60">
              {t('subtitle')}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <PublicQrScanner />

          <div className="mt-12 rounded-2xl border border-mq-ink/10 bg-white px-6 py-8 text-center sm:px-10">
            <h2 className="font-display text-2xl font-bold text-mq-ink">{t('ctaTitle')}</h2>
            <p className="mx-auto mt-2 max-w-xl text-mq-ink/60">{t('ctaSubtitle')}</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/newqr"
                className="inline-flex items-center rounded-xl bg-mq-signal px-5 py-3 text-sm font-bold text-mq-ink transition hover:bg-mq-signal-deep"
              >
                {t('ctaCreate')}
              </Link>
              <a
                href="/newqr/login"
                className="inline-flex items-center rounded-xl border border-mq-ink/15 px-5 py-3 text-sm font-semibold text-mq-ink transition hover:bg-mq-ink/[0.03]"
              >
                {t('ctaDashboard')}
              </a>
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  )
}

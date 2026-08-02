import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { BrandWordmarkAppear } from '@/components/brand/BrandWordmarkAppear'
import { MarketingFooter } from '@/components/marketing/MarketingFooter'
import { MarketingHeader } from '@/components/marketing/MarketingHeader'
import { PublicQrEditor } from '@/components/qr-editor/PublicQrEditor'
import { Button } from '@/components/ui/button'
import { Link } from '@/src/i18n/routing'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Editor')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

export default async function EditeurPage() {
  const t = await getTranslations('Editor')

  return (
    <div className="relative min-h-dvh bg-mq-paper font-body">
      {/* Decorative layer isolated so overflow doesn't break sticky preview */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] overflow-hidden" aria-hidden>
        <div className="absolute inset-0 mq-grid opacity-[0.35]" />
        <div className="absolute -left-32 top-24 h-72 w-72 rounded-full bg-mq-signal/20 blur-3xl mq-blob" />
        <div className="absolute -right-24 top-48 h-80 w-80 rounded-full bg-mq-sky/15 blur-3xl mq-blob-delay" />
      </div>

      <MarketingHeader />
      <main className="relative">
        <section className="relative border-b border-mq-ink/5 pt-28 pb-8 lg:pt-32 lg:pb-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl space-y-3">
                <p className="font-qr text-sm font-semibold tracking-wide text-mq-signal-deep">
                  {t('badge')}
                </p>
                <h1 className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-4xl font-bold tracking-tight text-mq-ink sm:text-5xl">
                  <BrandWordmarkAppear rainbow />
                </h1>
                <p className="font-display text-2xl font-bold tracking-tight text-mq-ink sm:text-3xl">
                  {t('title')}
                </p>
                <p className="max-w-xl text-base leading-relaxed text-mq-muted sm:text-lg">
                  {t('description')}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  asChild
                  size="sm"
                  className="rounded-xl bg-mq-ink font-semibold text-white hover:bg-mq-ink-soft"
                >
                  <Link href="/demo">{t('ctaDynamic')}</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="rounded-xl border-mq-ink/15 bg-white/70"
                >
                  <Link href="/features">{t('ctaFeatures')}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 lg:py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <PublicQrEditor />
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  )
}

import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { MarketingFooter } from '@/components/marketing/MarketingFooter'
import { MarketingHeader } from '@/components/marketing/MarketingHeader'
import { PublicQrEditor } from '@/components/qr-editor/PublicQrEditor'
import { Button } from '@/components/ui/button'
import { Link } from '@/src/i18n/routing'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Generator')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

export default async function GenerateurPage() {
  const t = await getTranslations('Generator')

  return (
    <div className="min-h-dvh bg-mq-paper font-body">
      <MarketingHeader />
      <main>
        <section className="relative overflow-hidden border-b border-mq-ink/5 bg-mq-ink pt-28 pb-12 text-white lg:pt-32 lg:pb-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,#1a3d36_0%,transparent_50%)]" />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center rounded-full border border-mq-signal/30 bg-mq-signal/10 px-3 py-1 text-xs font-semibold text-mq-signal">
                ✨ {t('badge')}
              </span>
              <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {t('title')}
              </h1>
              <p className="text-lg leading-relaxed text-white/70">{t('description')}</p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  asChild
                  size="sm"
                  className="rounded-xl bg-mq-signal font-semibold text-mq-ink hover:bg-mq-signal/90"
                >
                  <Link href="/dashboard">{t('ctaDynamic')}</Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="rounded-xl text-white/70 hover:bg-white/10 hover:text-white"
                >
                  <Link href="/features">{t('ctaFeatures')}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 lg:py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <PublicQrEditor />
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  )
}

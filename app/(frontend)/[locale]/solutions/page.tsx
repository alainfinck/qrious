'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import {
  Utensils,
  Calendar,
  ShoppingBag,
  Wrench,
  Palette,
  Contact,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Globe,
  FileText,
  Wifi,
  Smartphone,
  Tag,
  Star,
} from 'lucide-react'

import { MarketingHeader } from '@/components/marketing/MarketingHeader'
import { MarketingFooter } from '@/components/marketing/MarketingFooter'
import { CtaSection } from '@/components/marketing/CtaSection'
import { QuickStepsSection } from '@/components/marketing/QuickStepsSection'
import { LandingPageTemplatesSection } from '@/components/marketing/LandingPageTemplatesSection'
import { QrPrintMediumsSection } from '@/components/marketing/QrPrintMediumsSection'
import { DisclaimerSection } from '@/components/marketing/DisclaimerSection'
import { BlurFade } from '@/components/ui/blur-fade'
import { MagicCard } from '@/components/ui/magic-card'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { Link } from '@/src/i18n/routing'

const VERTICAL_META = [
  { slug: 'chrd', key: 'chrd', icon: Utensils, accentColor: '#e11d48' },
  { slug: 'corporate-event', key: 'corporate', icon: Calendar, accentColor: '#6366f1' },
  { slug: 'ugc-retail', key: 'ugc', icon: ShoppingBag, accentColor: '#a855f7' },
  { slug: 'field-service', key: 'field', icon: Wrench, accentColor: '#059669' },
  { slug: 'art', key: 'art', icon: Palette, accentColor: '#d97706' },
] as const

const QUICK_TYPE_META = [
  { typeKey: 'web', icon: Globe, color: 'text-sky-400' },
  { typeKey: 'menu', icon: Utensils, color: 'text-rose-400' },
  { typeKey: 'pdf', icon: FileText, color: 'text-emerald-400' },
  { typeKey: 'vcard', icon: Contact, color: 'text-amber-400' },
  { typeKey: 'wifi', icon: Wifi, color: 'text-indigo-400' },
  { typeKey: 'social', icon: Smartphone, color: 'text-purple-400' },
  { typeKey: 'coupons', icon: Tag, color: 'text-yellow-400' },
  { typeKey: 'reviews', icon: Star, color: 'text-amber-300' },
] as const

export default function SolutionsPage() {
  const t = useTranslations('Solutions')

  const allVerticals = VERTICAL_META.map((v) => ({
    ...v,
    title: t(`verticals.${v.key}.title`),
    badge: t(`verticals.${v.key}.badge`),
    description: t(`verticals.${v.key}.description`),
    highlights: [
      t(`verticals.${v.key}.h1`),
      t(`verticals.${v.key}.h2`),
      t(`verticals.${v.key}.h3`),
      t(`verticals.${v.key}.h4`),
    ],
  }))

  return (
    <div className="min-h-dvh bg-mq-paper font-body">
      <MarketingHeader />

      <main>
        {/* Main Hero Banner */}
        <section className="relative overflow-hidden bg-mq-ink pt-32 pb-24 text-white lg:pt-40 lg:pb-32">
          <div className="absolute inset-0" aria-hidden>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#102536_0%,#0b1220_70%)]" />
            <div className="mq-blob absolute left-1/4 top-10 h-72 w-72 rounded-full bg-mq-signal/20 blur-[100px]" />
            <div className="mq-blob-delay absolute right-1/4 bottom-10 h-72 w-72 rounded-full bg-mq-coral/20 blur-[100px]" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <BlurFade delay={0.1} inView>
              <div className="text-center max-w-3xl mx-auto space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-mq-signal backdrop-blur-md">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{t('heroBadge')}</span>
                </div>
                <h1 className="font-display text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                  {t('heroTitleBefore')}{' '}
                  <span className="mq-rainbow-text">{t('heroTitleHighlight')}</span>
                </h1>
                <p className="text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
                  {t('heroSubtitle')}
                </p>
                <div className="pt-4 flex justify-center gap-4">
                  <Link href="/editeur">
                    <ShimmerButton
                      background="linear-gradient(135deg, #12c4a8 0%, #0b7a6a 100%)"
                      shimmerColor="#e8fff9"
                      borderRadius="12px"
                      className="h-12 px-7"
                    >
                      <span className="font-bold text-mq-ink flex items-center gap-2">
                        {t('ctaCreate')}
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </ShimmerButton>
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                  >
                    {t('ctaPricing')}
                  </Link>
                </div>
              </div>
            </BlurFade>

            {/* Quick Type Chips Selector Banner */}
            <BlurFade delay={0.2} inView>
              <div className="mt-16 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <p className="text-center text-xs font-bold uppercase tracking-wider text-white/60 mb-4">
                  {t('typesLabel')}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {QUICK_TYPE_META.map((item) => {
                    const Icon = item.icon
                    return (
                      <div
                        key={item.typeKey}
                        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white/90 transition-all hover:bg-white/15 hover:scale-[1.03]"
                      >
                        <Icon className={`h-4 w-4 ${item.color}`} />
                        <span>{t(`types.${item.typeKey}`)}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Vertical Deep-Dive Section */}
        <section className="py-24 sm:py-32 bg-mq-paper">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-16">
            <BlurFade delay={0.1} inView>
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <p className="text-sm font-semibold uppercase tracking-wider text-mq-coral">
                  {t('sectionEyebrow')}
                </p>
                <h2 className="font-display text-3xl font-bold tracking-tight text-mq-ink sm:text-5xl">
                  {t('sectionTitleBefore')}{' '}
                  <span className="mq-rainbow-text">{t('sectionTitleHighlight')}</span>{' '}
                  {t('sectionTitleAfter')}
                </h2>
                <p className="text-base text-mq-muted leading-relaxed">{t('sectionSubtitle')}</p>
              </div>
            </BlurFade>

            <div className="grid gap-8 lg:grid-cols-2">
              {allVerticals.map((v, index) => {
                const Icon = v.icon
                return (
                  <BlurFade key={v.slug} delay={0.08 + index * 0.06} inView>
                    <MagicCard
                      className="group relative flex flex-col justify-between h-full overflow-hidden rounded-3xl border bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl"
                      gradientFrom={v.accentColor}
                      gradientTo="#ffffff"
                      gradientOpacity={0.15}
                    >
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <span
                            className="flex h-13 w-13 items-center justify-center rounded-2xl text-white shadow-md transition-transform duration-300 group-hover:scale-105"
                            style={{ backgroundColor: v.accentColor }}
                          >
                            <Icon className="h-7 w-7" />
                          </span>
                          <span className="text-xs font-bold text-mq-ink bg-mq-mist px-3 py-1 rounded-full border border-mq-ink/10">
                            {v.badge}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-display text-2xl font-bold text-mq-ink group-hover:text-mq-coral transition-colors">
                            {v.title}
                          </h3>
                          <p className="mt-3 text-sm text-mq-muted leading-relaxed">
                            {v.description}
                          </p>
                        </div>

                        <ul className="space-y-2.5 border-t border-mq-ink/5 pt-4">
                          {v.highlights.map((h, i) => (
                            <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-mq-ink/90">
                              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-8 pt-4 border-t border-mq-ink/5 flex items-center justify-between">
                        <Link
                          href={`/solutions/${v.slug}`}
                          className="inline-flex items-center gap-2 text-sm font-bold text-mq-ink hover:text-mq-coral transition-colors group/link"
                        >
                          <span>{t('viewFull')}</span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                        <Link
                          href="/editeur"
                          className="text-xs font-semibold text-mq-muted hover:text-mq-ink underline"
                        >
                          {t('createQr')}
                        </Link>
                      </div>
                    </MagicCard>
                  </BlurFade>
                )
              })}
            </div>
          </div>
        </section>

        {/* Tabbed Interactive Feature Showcase (QuickStepsSection) */}
        <QuickStepsSection />

        {/* Landing Page Templates Explorer (LandingPageTemplatesSection) */}
        <LandingPageTemplatesSection />

        {/* QR Print Mediums Showcase (QrPrintMediumsSection) */}
        <QrPrintMediumsSection />

        {/* Transparency & Legal Disclaimers (DisclaimerSection) */}
        <DisclaimerSection />

        {/* Call to action section */}
        <CtaSection />
      </main>

      <MarketingFooter />
    </div>
  )
}

'use client'

import { useTranslations } from 'next-intl'
import { BarChart3, Eye, QrCode, Settings, Smartphone, Users } from 'lucide-react'

import { MarketingFooter } from '@/components/marketing/MarketingFooter'
import { MarketingHeader } from '@/components/marketing/MarketingHeader'
import { BlurFade } from '@/components/ui/blur-fade'
import { BorderBeam } from '@/components/ui/border-beam'
import { MagicCard } from '@/components/ui/magic-card'
import { NumberTicker } from '@/components/ui/number-ticker'
import { Particles } from '@/components/ui/particles'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { Link } from '@/src/i18n/routing'

const highlights = [
  {
    icon: QrCode,
    title: 'Création en 2 min',
    desc: 'Choisissez un template, remplissez, publiez.',
  },
  {
    icon: Smartphone,
    title: 'Aperçu mobile',
    desc: 'Voyez exactement ce que vos visiteurs scannent.',
  },
  {
    icon: BarChart3,
    title: 'Stats en direct',
    desc: 'Scans, visiteurs et performance de vos pages.',
  },
  {
    icon: Settings,
    title: 'Personnalisation',
    desc: 'Couleurs, logo, contenu — tout est éditable.',
  },
]

export default function DemoPage() {
  const t = useTranslations('Demo')

  return (
    <div className="min-h-dvh bg-mq-paper font-body">
      <MarketingHeader />
      <main>
        <section className="relative overflow-hidden bg-mq-ink pt-32 pb-24 text-white lg:pt-40 lg:pb-28">
          <Particles quantity={50} color="#0f9f8a" size={0.4} className="absolute inset-0" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
            <BlurFade delay={0.1} inView>
              <p className="inline-flex items-center rounded-full border border-mq-signal/30 bg-mq-signal/10 px-3 py-1 text-sm font-medium text-mq-signal">
                {t('badge')}
              </p>
              <h1 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                {t('title')}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-white/60">{t('subtitle')}</p>
              <div className="mt-8 flex gap-8">
                <div>
                  <div className="font-display text-2xl font-bold">
                    <NumberTicker value={2} className="text-white" /> min
                  </div>
                  <div className="text-sm text-white/45">{t('statCreate')}</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-bold">
                    <NumberTicker value={100} className="text-white" />%
                  </div>
                  <div className="text-sm text-white/45">{t('statCustomizable')}</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-bold">
                    <NumberTicker value={24} className="text-white" />h
                  </div>
                  <div className="text-sm text-white/45">{t('statSupport')}</div>
                </div>
              </div>
              <div className="mt-10">
                <Link href="/dashboard/register">
                  <ShimmerButton
                    background="linear-gradient(135deg, #0f9f8a 0%, #0b7a6a 100%)"
                    shimmerColor="#e8fff9"
                    borderRadius="12px"
                    className="h-12 px-6"
                  >
                    <span className="font-semibold text-mq-ink">{t('ctaTry')}</span>
                  </ShimmerButton>
                </Link>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
                <BorderBeam size={110} duration={9} colorFrom="#0f9f8a" colorTo="#5eead4" />
                <div className="mb-5 flex gap-6 border-b border-white/10 pb-4 text-sm font-medium">
                  <span className="text-white">Dashboard</span>
                  <span className="text-white/35">QR Codes</span>
                  <span className="text-white/35">Analytics</span>
                </div>
                <div className="mb-6 grid grid-cols-3 gap-3">
                  {[
                    { icon: QrCode, value: 12, label: 'QR Codes' },
                    { icon: Eye, value: 854, label: 'Scans' },
                    { icon: Users, value: 357, label: 'Visiteurs' },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center"
                    >
                      <stat.icon className="mx-auto mb-2 h-5 w-5 text-mq-signal" />
                      <div className="font-display text-xl font-bold">
                        <NumberTicker value={stat.value} className="text-white" />
                      </div>
                      <div className="text-[11px] text-white/40">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mx-auto flex max-w-[220px] flex-col items-center rounded-2xl border border-white/10 bg-mq-ink/60 p-6">
                  <div className="relative mb-4 flex h-28 w-28 items-center justify-center rounded-xl border-2 border-white/80">
                    <QrCode className="h-16 w-16 text-white" />
                  </div>
                  <p className="text-sm text-white/55">Scannez pour découvrir</p>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <BlurFade delay={0.1} inView>
              <h2 className="font-display text-3xl font-bold text-mq-ink sm:text-4xl">
                {t('highlightsTitle')}
              </h2>
              <p className="mt-3 max-w-xl text-mq-muted">{t('highlightsSubtitle')}</p>
            </BlurFade>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {highlights.map((item, index) => (
                <BlurFade key={item.title} delay={0.08 + index * 0.06} inView>
                  <MagicCard
                    className="h-full rounded-2xl"
                    gradientFrom="#0f9f8a"
                    gradientTo="#5eead4"
                    gradientColor="#0f9f8a12"
                  >
                    <div className="flex h-full flex-col gap-3 p-6">
                      <item.icon className="h-6 w-6 text-mq-signal" />
                      <h3 className="font-display text-lg font-semibold text-mq-ink">
                        {item.title}
                      </h3>
                      <p className="text-sm text-mq-muted">{item.desc}</p>
                    </div>
                  </MagicCard>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-mq-ink/5 bg-white/40 py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <BlurFade delay={0.1} inView>
              <h2 className="font-display text-3xl font-bold text-mq-ink">{t('bottomTitle')}</h2>
              <p className="mt-4 text-mq-muted">{t('bottomSubtitle')}</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/dashboard/register">
                  <ShimmerButton
                    background="#0a0c0b"
                    shimmerColor="#0f9f8a"
                    borderRadius="12px"
                    className="h-12 px-6"
                  >
                    <span className="font-semibold">{t('ctaRegister')}</span>
                  </ShimmerButton>
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-mq-ink/15 px-6 text-sm font-medium text-mq-ink hover:bg-mq-ink/5"
                >
                  {t('ctaPricing')}
                </Link>
              </div>
            </BlurFade>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  )
}

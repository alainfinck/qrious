'use client'

import { useTranslations } from 'next-intl'

import { BlurFade } from '@/components/ui/blur-fade'
import { ShineBorder } from '@/components/ui/shine-border'

const perks = [
  { key: 'perk1' as const, color: 'bg-mq-coral' },
  { key: 'perk2' as const, color: 'bg-mq-sun' },
  { key: 'perk3' as const, color: 'bg-mq-signal' },
  { key: 'perk4' as const, color: 'bg-mq-sky' },
]

export function WhiteLabelSection() {
  const t = useTranslations('WhiteLabel')

  return (
    <section className="relative overflow-hidden bg-mq-ink-soft py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="mq-blob absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(ellipse_at_center,#12c4a833_0%,transparent_70%)]" />
        <div className="mq-blob-delay absolute left-0 bottom-0 h-1/2 w-1/3 bg-[radial-gradient(ellipse_at_center,#ff5c4d28_0%,transparent_70%)]" />
        <div className="mq-noise absolute inset-0 opacity-[0.1] mix-blend-overlay" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2">
        <BlurFade delay={0.1} inView>
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mq-sun">
              {t('eyebrow')}
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
              {t('titleLine1')}
              <br />
              <span className="text-mq-coral">{t('titleLine2')}</span>
            </h2>
            <p className="text-lg leading-relaxed text-white/60">{t('description')}</p>
            <ul className="space-y-4 pt-2">
              {perks.map((perk) => (
                <li key={perk.key} className="flex items-start gap-3 text-sm text-white/75">
                  <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-md ${perk.color}`} />
                  {t(perk.key)}
                </li>
              ))}
            </ul>
          </div>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <div className="relative mx-auto w-full max-w-md">
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-mq-signal/15 via-white/[0.06] to-mq-coral/15 p-6 backdrop-blur-sm">
              <ShineBorder
                shineColor={['#12c4a8', '#ffc53d', '#ff5c4d', '#3dbbff']}
                borderWidth={1.5}
                duration={10}
              />
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-mq-coral to-mq-sun font-display text-sm font-bold text-mq-ink">
                  GL
                </div>
                <div>
                  <p className="font-display text-sm font-semibold">{t('demoGallery')}</p>
                  <p className="text-xs text-white/45">{t('demoTheme')}</p>
                </div>
              </div>

              <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#c45a2a] via-[#ff8a3d] to-[#5c2b1a]" />
                <div className="absolute inset-[12%] rounded-sm bg-gradient-to-b from-mq-sun/50 to-mq-coral/30" />
                <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                  <span className="rounded-md bg-black/45 px-2.5 py-1 text-[11px] text-white/90 backdrop-blur-sm">
                    {t('demoMedium')}
                  </span>
                  <span className="rounded-md bg-black/45 px-2.5 py-1 text-[11px] text-white/90 backdrop-blur-sm">
                    {t('demoSize')}
                  </span>
                </div>
              </div>

              <div className="h-11 rounded-xl bg-gradient-to-r from-mq-coral via-mq-sun to-mq-signal text-center font-display text-sm font-semibold leading-[2.75rem] text-mq-ink">
                {t('demoCta')}
              </div>
            </div>

            <div className="absolute -bottom-5 -left-4 flex gap-2 rounded-2xl border border-white/15 bg-mq-ink px-4 py-3 sm:-left-8">
              <span className="h-5 w-5 rounded-md bg-mq-coral" />
              <span className="h-5 w-5 rounded-md bg-mq-sun" />
              <span className="h-5 w-5 rounded-md bg-mq-signal" />
              <span className="h-5 w-5 rounded-md bg-mq-sky" />
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}

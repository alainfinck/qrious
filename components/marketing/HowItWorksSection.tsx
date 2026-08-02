'use client'

import { useTranslations } from 'next-intl'
import { Edit3, QrCode, Share2, ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import { BlurFade } from '@/components/ui/blur-fade'
import { NumberTicker } from '@/components/ui/number-ticker'
import { Link } from '@/src/i18n/routing'
import { cn } from '@/lib/utils'

const steps = [
  {
    step: 1,
    key: '1' as const,
    icon: Edit3,
    accent: '#12c4a8',
    accentSoft: 'rgba(18, 196, 168, 0.16)',
  },
  {
    step: 2,
    key: '2' as const,
    icon: QrCode,
    accent: '#3dbbff',
    accentSoft: 'rgba(61, 187, 255, 0.16)',
  },
  {
    step: 3,
    key: '3' as const,
    icon: Share2,
    accent: '#ff5c4d',
    accentSoft: 'rgba(255, 92, 77, 0.16)',
  },
]

export function HowItWorksSection() {
  const t = useTranslations('HowItWorks')
  const reduce = useReducedMotion()

  return (
    <section
      id="comment"
      className="relative overflow-hidden bg-mq-paper py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 mq-grid opacity-30" aria-hidden />
      <div
        className="pointer-events-none absolute -left-20 top-24 h-64 w-64 rounded-full bg-mq-signal/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-mq-coral/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <BlurFade delay={0.1} inView>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mq-sky">
              {t('eyebrow')}
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-mq-ink sm:text-5xl">
              {t('titleBefore')}{' '}
              <NumberTicker value={3} className="text-mq-coral" /> {t('titleAfter')}
            </h2>
          </div>
        </BlurFade>

        {/* Desktop sequence */}
        <ol className="relative mt-16 hidden md:grid md:grid-cols-3 md:gap-0">
          {/* Base track */}
          <div
            className="pointer-events-none absolute left-[16.5%] right-[16.5%] top-[2.35rem] h-[3px] rounded-full bg-mq-ink/10"
            aria-hidden
          />
          <motion.div
            className="pointer-events-none absolute left-[16.5%] top-[2.35rem] h-[3px] origin-left rounded-full bg-gradient-to-r from-mq-signal via-mq-sky to-mq-coral"
            aria-hidden
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={{ width: '67%' }}
          />

          {steps.map((item, index) => {
            const Icon = item.icon
            return (
              <BlurFade key={item.step} delay={0.15 + index * 0.14} inView>
                <li className="relative flex flex-col items-center px-6 text-center">
                  <div className="relative mb-8 flex h-[4.75rem] w-[4.75rem] items-center justify-center">
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-[1.35rem] opacity-90 blur-xl"
                      style={{ backgroundColor: item.accentSoft }}
                    />
                    <span
                      className="relative flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-[1.35rem] border-2 bg-white shadow-[0_12px_30px_-16px_rgba(11,18,32,0.35)]"
                      style={{ borderColor: `${item.accent}55`, color: item.accent }}
                    >
                      <Icon className="h-7 w-7" strokeWidth={1.85} />
                    </span>
                    <span
                      className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full font-display text-xs font-bold text-white shadow-md"
                      style={{ backgroundColor: item.accent }}
                    >
                      0{item.step}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-semibold text-mq-ink">
                    {t(`steps.${item.key}.title`)}
                  </h3>
                  <p className="mt-3 max-w-[16rem] text-base leading-relaxed text-mq-muted">
                    {t(`steps.${item.key}.description`)}
                  </p>

                  {index < steps.length - 1 && (
                    <ArrowRight
                      className="pointer-events-none absolute -right-3 top-[2.1rem] h-4 w-4 text-mq-ink/25"
                      aria-hidden
                    />
                  )}
                </li>
              </BlurFade>
            )
          })}
        </ol>

        {/* Mobile vertical timeline */}
        <ol className="relative mt-14 space-y-0 md:hidden">
          <div
            className="absolute bottom-6 left-[1.9rem] top-6 w-[2px] bg-mq-ink/10"
            aria-hidden
          />
          <motion.div
            className="absolute left-[1.9rem] top-6 w-[2px] origin-top bg-gradient-to-b from-mq-signal via-mq-sky to-mq-coral"
            aria-hidden
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ bottom: '1.5rem' }}
          />

          {steps.map((item, index) => {
            const Icon = item.icon
            return (
              <BlurFade key={item.step} delay={0.1 + index * 0.1} inView>
                <li className="relative flex gap-5 pb-10 last:pb-0">
                  <div className="relative z-10 shrink-0">
                    <span
                      className={cn(
                        'flex h-16 w-16 items-center justify-center rounded-2xl border-2 bg-white shadow-sm',
                      )}
                      style={{ borderColor: `${item.accent}55`, color: item.accent }}
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.85} />
                    </span>
                  </div>
                  <div className="min-w-0 pt-1">
                    <p
                      className="font-display text-sm font-bold tracking-wide"
                      style={{ color: item.accent }}
                    >
                      {t('stepLabel')} 0{item.step}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-semibold text-mq-ink">
                      {t(`steps.${item.key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-mq-muted">
                      {t(`steps.${item.key}.description`)}
                    </p>
                  </div>
                </li>
              </BlurFade>
            )
          })}
        </ol>

        <BlurFade delay={0.35} inView>
          <div className="mt-14 flex justify-start md:justify-center">
            <Link
              href="/newqr"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-mq-coral to-mq-sun px-6 text-base font-semibold text-mq-ink transition-opacity hover:opacity-90"
            >
              {t('cta')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}

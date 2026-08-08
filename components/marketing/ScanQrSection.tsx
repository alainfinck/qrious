'use client'

import { useTranslations } from 'next-intl'
import { ScanLine } from 'lucide-react'

import { BlurFade } from '@/components/ui/blur-fade'
import { PublicQrScanner } from '@/components/marketing/PublicQrScanner'

export function ScanQrSection() {
  const t = useTranslations('ScanSection')

  return (
    <section
      id="scanner"
      className="relative overflow-hidden border-y border-mq-ink/10 bg-gradient-to-b from-mq-ink via-[#102536] to-mq-ink py-24 text-white sm:py-32"
    >
      <div
        className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-mq-signal/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-8 h-64 w-64 rounded-full bg-mq-coral/20 blur-3xl"
        aria-hidden
      />
      <div className="mq-noise pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <BlurFade delay={0.1} inView>
          <div className="mx-auto max-w-2xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-mq-signal/30 bg-mq-signal/10 px-3 py-1 text-sm font-medium text-mq-signal">
              <ScanLine className="h-3.5 w-3.5" />
              {t('eyebrow')}
            </p>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-5xl">
              {t('title')}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/60">
              {t('subtitle')}
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <div className="mt-12 sm:mt-14">
            <PublicQrScanner />
          </div>
        </BlurFade>
      </div>
    </section>
  )
}

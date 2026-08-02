'use client'

import { useTranslations } from 'next-intl'
import { Info, CheckCircle, RefreshCw, Zap } from 'lucide-react'

import { BlurFade } from '@/components/ui/blur-fade'

export function DisclaimerSection() {
  const t = useTranslations('Disclaimer')

  return (
    <section className="relative border-t border-mq-ink/5 bg-gradient-to-b from-white to-mq-paper py-16">
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <BlurFade delay={0.1} inView>
          <div className="rounded-2xl border border-mq-ink/10 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-mq-sky/15 text-mq-sky">
                <Info className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-mq-ink">{t('title')}</h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 text-xs sm:text-sm text-mq-muted leading-relaxed">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-mq-paper border border-mq-ink/5">
                <Zap className="h-4 w-4 text-mq-coral shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-mq-ink">{t('trial.title')}</p>
                  <p className="mt-1">{t('trial.description')}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-mq-paper border border-mq-ink/5">
                <RefreshCw className="h-4 w-4 text-mq-signal shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-mq-ink">{t('continuity.title')}</p>
                  <p className="mt-1">{t('continuity.description')}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-mq-paper border border-mq-ink/5">
                <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-mq-ink">{t('static.title')}</p>
                  <p className="mt-1">{t('static.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}

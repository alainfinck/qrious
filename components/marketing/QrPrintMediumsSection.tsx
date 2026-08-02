'use client'

import { useTranslations } from 'next-intl'
import { Megaphone, CreditCard, FileText, BookOpen, ArrowRight, Printer } from 'lucide-react'

import { BlurFade } from '@/components/ui/blur-fade'
import { Link } from '@/src/i18n/routing'
import { cn } from '@/lib/utils'

const PRINT_ITEMS = [
  {
    key: 'marketing' as const,
    icon: Megaphone,
    accent: '#ff5c4d',
  },
  {
    key: 'vcard' as const,
    icon: CreditCard,
    accent: '#12c4a8',
  },
  {
    key: 'flyers' as const,
    icon: FileText,
    accent: '#ffc53d',
  },
  {
    key: 'brochures' as const,
    icon: BookOpen,
    accent: '#3dbbff',
  },
]

export function QrPrintMediumsSection() {
  const t = useTranslations('QrPrintMediums')

  return (
    <section className="relative overflow-hidden bg-mq-ink py-24 text-white sm:py-32">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-[800px] -translate-x-1/2 rounded-full bg-mq-sky/10 blur-[130px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <BlurFade delay={0.1} inView>
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-mq-signal backdrop-blur-md">
              <Printer className="h-3.5 w-3.5 text-mq-signal" />
              <span>{t('badge')}</span>
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t('titleBefore')}{' '}
              <span className="mq-rainbow-text">{t('titleHighlight')}</span>
            </h2>
            <p className="text-lg leading-relaxed text-white/70">{t('subtitle')}</p>
          </div>
        </BlurFade>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRINT_ITEMS.map((item, index) => {
            const Icon = item.icon
            return (
              <BlurFade key={item.key} delay={0.08 + index * 0.06} inView>
                <article
                  className={cn(
                    'group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/12',
                    'bg-gradient-to-b from-white/[0.09] to-white/[0.03] p-6 backdrop-blur-md',
                    'shadow-[0_20px_50px_-28px_rgba(0,0,0,0.7)]',
                    'transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25 hover:from-white/[0.12]',
                  )}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-40 blur-2xl transition-opacity duration-300 group-hover:opacity-70"
                    style={{ backgroundColor: item.accent }}
                  />

                  <div className="relative space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className="flex h-12 w-12 items-center justify-center rounded-xl text-mq-ink shadow-md"
                        style={{ backgroundColor: item.accent }}
                      >
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="rounded-md border border-white/15 bg-mq-ink/50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white/75">
                        {t(`items.${item.key}.tag`)}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold text-white transition-colors group-hover:text-mq-signal">
                        {t(`items.${item.key}.title`)}
                      </h3>
                      <p className="mt-1 text-xs font-semibold text-mq-sun">
                        {t(`items.${item.key}.subtitle`)}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-white/75">
                        {t(`items.${item.key}.description`)}
                      </p>
                    </div>
                  </div>

                  <div className="relative mt-6 border-t border-white/12 pt-4">
                    <Link
                      href="/editeur"
                      className="group/link inline-flex items-center gap-2 text-xs font-bold text-mq-signal transition-colors hover:text-white"
                    >
                      <span>{t('cta')}</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </article>
              </BlurFade>
            )
          })}
        </div>
      </div>
    </section>
  )
}

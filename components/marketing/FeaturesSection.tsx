'use client'

import { useTranslations } from 'next-intl'
import { BarChart3, Layers, Paintbrush, RefreshCw, Shield, Zap } from 'lucide-react'

import { BlurFade } from '@/components/ui/blur-fade'
import { MagicCard } from '@/components/ui/magic-card'
import { cn } from '@/lib/utils'

const features = [
  {
    key: 'dynamic' as const,
    icon: RefreshCw,
    accent: '#12c4a8',
    from: '#12c4a8',
    to: '#3dbbff',
    wash: '#12c4a820',
  },
  {
    key: 'multi' as const,
    icon: Layers,
    accent: '#3dbbff',
    from: '#3dbbff',
    to: '#12c4a8',
    wash: '#3dbbff22',
  },
  {
    key: 'whiteLabel' as const,
    icon: Paintbrush,
    accent: '#ff5c4d',
    from: '#ff5c4d',
    to: '#ffc53d',
    wash: '#ff5c4d18',
  },
  {
    key: 'deploy' as const,
    icon: Zap,
    accent: '#ffc53d',
    from: '#ffc53d',
    to: '#ff5c4d',
    wash: '#ffc53d28',
  },
  {
    key: 'central' as const,
    icon: BarChart3,
    accent: '#0a8f7a',
    from: '#12c4a8',
    to: '#ffc53d',
    wash: '#12c4a816',
  },
  {
    key: 'mobile' as const,
    icon: Shield,
    accent: '#3dbbff',
    from: '#3dbbff',
    to: '#ff5c4d',
    wash: '#3dbbff18',
  },
]

function FeatureIcon({
  icon: Icon,
  accent,
}: {
  icon: React.ElementType
  accent: string
}) {
  return (
    <span className="relative inline-flex h-12 w-12 items-center justify-center">
      <span
        aria-hidden
        className="absolute inset-[-18%] rounded-full opacity-70 blur-xl transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle, ${accent}55 0%, transparent 70%)`,
        }}
      />
      <span
        className={cn(
          'relative flex h-11 w-11 items-center justify-center rounded-xl',
          'border bg-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-sm',
          'transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-[1.04]',
        )}
        style={{
          borderColor: `${accent}35`,
          color: accent,
          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.85), 0 8px 20px -12px ${accent}66`,
        }}
      >
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>
    </span>
  )
}

export function FeaturesSection() {
  const t = useTranslations('Features')

  return (
    <section
      id="fonctionnalites"
      className="relative overflow-hidden bg-mq-paper py-24 sm:py-32"
    >
      <div
        className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-mq-signal/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-mq-coral/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <BlurFade delay={0.1} inView>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mq-coral">
              {t('eyebrow')}
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-mq-ink sm:text-5xl">
              {t('titleBefore')}{' '}
              <span className="mq-rainbow-text">{t('titleHighlight')}</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-mq-muted">{t('subtitle')}</p>
          </div>
        </BlurFade>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <BlurFade key={feature.key} delay={0.08 + index * 0.06} inView>
              <MagicCard
                className="mq-wiggle h-full rounded-2xl"
                gradientFrom={feature.from}
                gradientTo={feature.to}
                gradientColor={feature.wash}
                gradientOpacity={0.55}
                gradientSize={280}
              >
                <div className="flex h-full flex-col gap-4 p-7">
                  <FeatureIcon icon={feature.icon} accent={feature.accent} />
                  <h3 className="font-display text-xl font-semibold text-mq-ink">
                    {t(`items.${feature.key}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-mq-muted">
                    {t(`items.${feature.key}.description`)}
                  </p>
                </div>
              </MagicCard>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}

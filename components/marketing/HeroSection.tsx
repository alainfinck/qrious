'use client'

import { useEffect, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { ArrowRight, Sparkles } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

import { BrandMark } from '@/components/brand/BrandMark'
import { BrandWordmarkAppear } from '@/components/brand/BrandWordmarkAppear'
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text'
import { BlurFade } from '@/components/ui/blur-fade'
import { BorderBeam } from '@/components/ui/border-beam'
import { Particles } from '@/components/ui/particles'
import { Ripple } from '@/components/ui/ripple'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import {
  DEFAULT_QR_STYLE,
  STYLE_TEMPLATES,
  styleToOptions,
  type QrStyleTemplate,
} from '@/lib/qr/style'
import { Link, defaultLocale } from '@/src/i18n/routing'
import { cn } from '@/lib/utils'

const HERO_STYLE_ORDER = [
  'signal',
  'coral',
  'ink',
  'sunset',
  'ocean',
  'radial-glow',
  'classic',
] as const

const HERO_TEMPLATES = HERO_STYLE_ORDER.map(
  (id) => STYLE_TEMPLATES.find((template) => template.id === id)!,
).filter(Boolean)

const STYLE_INTERVAL_MS = 6500

/** Canonical public origin for the scannable hero QR (not env-dependent). */
const HERO_PUBLIC_ORIGIN = 'https://www.qrious.fr'

function getHeroScanUrl(locale: string) {
  const prefix = locale === defaultLocale ? '' : `/${locale}`
  return `${HERO_PUBLIC_ORIGIN}${prefix}/hello`
}

function HeroQrCode({
  data,
  size,
  template,
}: {
  data: string
  size: number
  template: QrStyleTemplate
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false

    async function render() {
      const { default: QRCodeStyling } = await import('qr-code-styling')
      if (cancelled || !containerRef.current) return

      containerRef.current.innerHTML = ''

      const style = {
        ...DEFAULT_QR_STYLE,
        ...template.style,
        size,
        margin: 10,
        frameStyle: 'none' as const,
      }

      const qr = new QRCodeStyling({
        ...styleToOptions(data, style),
        width: size,
        height: size,
        type: 'svg',
      })

      qr.append(containerRef.current)
    }

    void render()

    return () => {
      cancelled = true
      if (containerRef.current) containerRef.current.innerHTML = ''
    }
  }, [data, size, template])

  return (
    <div
      ref={containerRef}
      className="h-full w-full [&_canvas]:h-full [&_canvas]:w-full [&_svg]:h-full [&_svg]:w-full"
      aria-hidden
    />
  )
}

function HeroQrVisual({
  payload,
  size = 320,
  className,
}: {
  payload: string
  size?: number
  className?: string
}) {
  const t = useTranslations('Hero')
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const template = HERO_TEMPLATES[index] ?? HERO_TEMPLATES[0]
  const [beamFrom, beamTo] = template.swatch
  const hint = t('scanHint')

  useEffect(() => {
    if (reduce || paused) return
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % HERO_TEMPLATES.length)
    }, STYLE_INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [paused, reduce])

  return (
    <div
      className={cn('relative mx-auto w-full max-w-[380px]', className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Ripple
        className="opacity-40"
        mainCircleSize={140}
        mainCircleOpacity={0.16}
        numCircles={4}
      />
      <div className="mq-pulse-ring absolute inset-[-6%] rounded-[2.25rem] border border-mq-signal/35" />

      <div className="mq-float relative">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/20 bg-gradient-to-br from-white/15 via-white/[0.07] to-mq-coral/10 p-4 shadow-[0_28px_80px_-28px_rgba(0,0,0,0.75)] backdrop-blur-md sm:p-5">
          <BorderBeam
            size={120}
            duration={7}
            colorFrom={beamFrom}
            colorTo={beamTo}
            borderWidth={2}
          />

          <div
            className="relative aspect-square overflow-hidden rounded-2xl p-2 shadow-inner transition-[background-color] duration-500"
            style={{ backgroundColor: template.style.backgroundColor ?? '#ffffff' }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={template.id}
                className="absolute inset-2"
                initial={
                  reduce
                    ? false
                    : { opacity: 0, scale: 0.86, rotate: -5, filter: 'blur(10px)' }
                }
                animate={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }}
                exit={
                  reduce
                    ? undefined
                    : { opacity: 0, scale: 1.08, rotate: 5, filter: 'blur(8px)' }
                }
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <HeroQrCode data={payload} size={size} template={template} />
              </motion.div>
            </AnimatePresence>

            <div className="mq-scan pointer-events-none absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-mq-signal/35 to-transparent" />

            <AnimatePresence mode="wait">
              <motion.span
                key={`${template.id}-label`}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
                className="pointer-events-none absolute bottom-3 right-3 z-10 rounded-full border border-white/20 bg-mq-ink/75 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm"
              >
                {template.name}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="mt-3 flex flex-col items-center gap-2.5">
            <p className="text-center text-xs font-medium tracking-wide text-white/65 sm:text-sm">
              {hint}
            </p>
            <div className="flex items-center gap-1.5" aria-hidden>
              {HERO_TEMPLATES.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={item.name}
                  onClick={() => setIndex(i)}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    i === index
                      ? 'w-5 bg-gradient-to-r from-mq-coral to-mq-sun'
                      : 'w-1.5 bg-white/30 hover:bg-white/55',
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function HeroSection() {
  const t = useTranslations('Hero')
  const locale = useLocale()
  const scanUrl = getHeroScanUrl(locale)

  return (
    <section className="relative min-h-[min(100dvh,920px)] overflow-hidden bg-mq-ink text-white">
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(155deg,#0b1220_0%,#102536_40%,#0b1a2a_100%)]" />
        <div className="mq-blob absolute -right-[12%] top-[-8%] h-[55%] w-[55%] rounded-full bg-mq-signal/35 blur-[90px]" />
        <div className="mq-blob-delay absolute -left-[8%] bottom-[-12%] h-[45%] w-[45%] rounded-full bg-mq-coral/30 blur-[90px]" />
        <div className="mq-blob absolute left-[35%] top-[15%] h-[30%] w-[30%] rounded-full bg-mq-sky/25 blur-[80px]" />
        <div className="absolute right-[18%] bottom-[20%] h-[22%] w-[22%] rounded-full bg-mq-sun/20 blur-[70px]" />
        <div className="mq-noise absolute inset-0 opacity-[0.1] mix-blend-overlay" />
        <Particles
          className="absolute inset-0"
          quantity={70}
          ease={65}
          color="#12c4a8"
          size={0.55}
          staticity={35}
        />
      </div>

      <div className="relative mx-auto grid min-h-[min(100dvh,920px)] max-w-6xl items-center gap-12 px-4 pb-24 pt-32 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10 lg:pb-32 lg:pt-36">
        <div className="max-w-xl space-y-8 lg:max-w-none">
          <BlurFade delay={0.05} inView>
            <div
              className={cn(
                'group inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-3.5 py-1.5 backdrop-blur-sm transition-colors hover:border-mq-sun/50 hover:bg-mq-sun/10',
              )}
            >
              <Sparkles className="h-3.5 w-3.5 text-mq-sun" />
              <AnimatedShinyText className="mx-0 text-sm text-white/80 via-white">
                {t('badge')}
              </AnimatedShinyText>
            </div>
          </BlurFade>

          <BlurFade delay={0.12} inView>
            <div className="flex items-center gap-4 sm:gap-5">
              <BrandMark className="h-12 w-12 shrink-0 text-mq-coral sm:h-14 sm:w-14 lg:h-16 lg:w-16" />
              <p className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                <BrandWordmarkAppear rainbow />
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <h1 className="font-display text-3xl font-semibold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
              {t('headlineLine1')}
              <br />
              <span className="text-mq-sky">{t('headlineLine2')}</span>
              <br />
              <span className="text-mq-coral">{t('headlineLine3')}</span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.28} inView>
            <p className="max-w-md text-lg leading-relaxed text-white/70">{t('description')}</p>
          </BlurFade>

          <BlurFade delay={0.36} inView>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/dashboard/register">
                <ShimmerButton
                  className="h-12 px-6"
                  background="linear-gradient(135deg, #ff5c4d 0%, #ff8a3d 55%, #ffc53d 100%)"
                  shimmerColor="#fff7e8"
                  borderRadius="14px"
                  shimmerDuration="2.2s"
                >
                  <span className="flex items-center gap-2 font-semibold text-mq-ink">
                    {t('ctaPrimary')}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </ShimmerButton>
              </Link>
              <a
                href="#comment"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 text-base font-medium text-white/90 transition-colors hover:border-mq-signal/50 hover:bg-mq-signal/15"
              >
                {t('ctaSecondary')}
              </a>
            </div>
          </BlurFade>
        </div>

        <BlurFade delay={0.28} inView className="flex justify-center lg:justify-end">
          <HeroQrVisual
            payload={scanUrl}
            size={360}
            className="w-[min(100%,360px)]"
          />
        </BlurFade>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-mq-paper via-mq-paper/80 to-transparent" />
    </section>
  )
}

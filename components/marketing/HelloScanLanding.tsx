'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { ArrowRight, Sparkles } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import { BrandMark } from '@/components/brand/BrandMark'
import { BrandWordmarkAppear } from '@/components/brand/BrandWordmarkAppear'
import { Particles } from '@/components/ui/particles'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { Link } from '@/src/i18n/routing'

const PIXEL_COLORS = ['#12c4a8', '#3dbbff', '#ffc53d', '#ff5c4d'] as const

function PixelBurst({ reduce }: { reduce: boolean | null }) {
  if (reduce) return null

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: 18 }).map((_, i) => {
        const angle = (i / 18) * Math.PI * 2
        const dist = 110 + (i % 4) * 28
        return (
          <motion.span
            key={i}
            className="absolute left-1/2 top-[38%] h-2.5 w-2.5 rounded-[2px]"
            style={{ backgroundColor: PIXEL_COLORS[i % PIXEL_COLORS.length] }}
            initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              x: Math.cos(angle) * dist,
              y: Math.sin(angle) * dist,
              scale: [0, 1, 0.4],
              rotate: [0, 90 + i * 12],
            }}
            transition={{
              delay: 0.35 + (i % 6) * 0.04,
              duration: 1.1,
              ease: 'easeOut',
            }}
          />
        )
      })}
    </div>
  )
}

export function HelloScanLanding() {
  const t = useTranslations('HelloScan')
  const reduce = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden bg-mq-ink text-white">
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(160deg,#0b1220_0%,#123044_42%,#0b1a2a_100%)]" />
        <div className="mq-blob absolute -right-[20%] top-[-10%] h-[50%] w-[50%] rounded-full bg-mq-signal/40 blur-[100px]" />
        <div className="mq-blob-delay absolute -left-[15%] bottom-[-15%] h-[45%] w-[45%] rounded-full bg-mq-coral/35 blur-[100px]" />
        <div className="absolute left-[40%] top-[20%] h-[28%] w-[28%] rounded-full bg-mq-sun/20 blur-[80px]" />
        <div className="mq-noise absolute inset-0 opacity-[0.12] mix-blend-overlay" />
        <Particles
          className="absolute inset-0"
          quantity={55}
          ease={70}
          color="#12c4a8"
          size={0.5}
          staticity={40}
        />
      </div>

      {mounted && <PixelBurst reduce={reduce} />}

      <div className="relative z-10 mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-5 py-16 sm:px-8">
        <motion.div
          className="flex flex-col items-center text-center"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="mb-8 text-mq-coral"
            initial={reduce ? false : { scale: 0.4, rotate: -18, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 380, damping: 16, delay: 0.05 }}
          >
            <BrandMark className="h-16 w-16 sm:h-20 sm:w-20" />
          </motion.div>

          <p className="text-4xl font-bold tracking-tight sm:text-5xl">
            <BrandWordmarkAppear rainbow />
          </p>

          <p className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-3.5 py-1.5 text-sm text-white/80 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-mq-sun" />
            {t('badge')}
          </p>

          <h1 className="mt-8 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            <span className="mq-rainbow-text">{t('headline')}</span>
          </h1>

          <p className="mt-4 max-w-sm text-base leading-relaxed text-white/70 sm:text-lg">
            {t('message')}
          </p>

          <p className="mt-3 font-qr text-sm tracking-wide text-mq-signal/90">{t('punchline')}</p>

          <div className="mt-10 flex w-full flex-col gap-3 sm:mx-auto sm:max-w-xs">
            <Link href="/newqr" className="w-full">
              <ShimmerButton
                className="h-12 w-full px-6"
                background="linear-gradient(135deg, #ff5c4d 0%, #ff8a3d 55%, #ffc53d 100%)"
                shimmerColor="#fff7e8"
                borderRadius="14px"
                shimmerDuration="2.2s"
              >
                <span className="flex items-center justify-center gap-2 font-semibold text-mq-ink">
                  {t('cta')}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </ShimmerButton>
            </Link>
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 text-sm font-medium text-white/85 transition-colors hover:border-mq-signal/45 hover:bg-mq-signal/15"
            >
              {t('back')}
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
}

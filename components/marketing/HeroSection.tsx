'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

import { AnimatedShinyText } from '@/components/ui/animated-shiny-text'
import { BlurFade } from '@/components/ui/blur-fade'
import { BorderBeam } from '@/components/ui/border-beam'
import { Particles } from '@/components/ui/particles'
import { Ripple } from '@/components/ui/ripple'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { cn } from '@/lib/utils'

function QrMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="3" />
      <rect x="8" y="8" width="8" height="8" fill="currentColor" />
      <rect x="28" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="3" />
      <rect x="32" y="8" width="8" height="8" fill="currentColor" />
      <rect x="4" y="28" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="3" />
      <rect x="8" y="32" width="8" height="8" fill="currentColor" />
      <rect x="28" y="28" width="6" height="6" fill="currentColor" />
      <rect x="38" y="28" width="6" height="6" fill="currentColor" />
      <rect x="28" y="38" width="6" height="6" fill="currentColor" />
      <rect x="36" y="36" width="8" height="8" fill="currentColor" />
    </svg>
  )
}

export function HeroSection() {
  return (
    <section className="relative min-h-[min(100dvh,920px)] overflow-hidden bg-mq-ink text-white">
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(155deg,#0b1220_0%,#102536_40%,#0b1a2a_100%)]" />
        <div className="mq-blob absolute -right-[12%] top-[-8%] h-[55%] w-[55%] rounded-full bg-mq-signal/35 blur-[90px]" />
        <div className="mq-blob-delay absolute -left-[8%] bottom-[-12%] h-[45%] w-[45%] rounded-full bg-mq-coral/30 blur-[90px]" />
        <div className="mq-blob absolute left-[35%] top-[15%] h-[30%] w-[30%] rounded-full bg-mq-sky/25 blur-[80px]" />
        <div className="absolute right-[20%] bottom-[18%] h-[22%] w-[22%] rounded-full bg-mq-sun/20 blur-[70px]" />
        <div className="mq-noise absolute inset-0 opacity-[0.1] mix-blend-overlay" />
        <Particles
          className="absolute inset-0"
          quantity={70}
          ease={65}
          color="#12c4a8"
          size={0.55}
          staticity={35}
        />

        <div className="pointer-events-none absolute right-[-8%] top-1/2 hidden w-[min(58vw,640px)] -translate-y-1/2 lg:block">
          <div className="relative aspect-square">
            <Ripple
              className="opacity-35"
              mainCircleSize={180}
              mainCircleOpacity={0.18}
              numCircles={5}
            />
            <div className="mq-pulse-ring absolute inset-[8%] rounded-[2.5rem] border border-mq-signal/40" />
            <div className="mq-float absolute inset-0 flex items-center justify-center">
              <div className="relative h-[78%] w-[78%] overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-mq-signal/20 via-white/[0.06] to-mq-coral/15 backdrop-blur-sm">
                <BorderBeam
                  size={130}
                  duration={7}
                  colorFrom="#12c4a8"
                  colorTo="#ff5c4d"
                  borderWidth={2}
                />
                <div className="absolute inset-6 grid grid-cols-7 gap-2 opacity-95">
                  {Array.from({ length: 49 }).map((_, i) => {
                    const filled = [
                      0, 1, 2, 4, 5, 6, 7, 8, 10, 12, 13, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34,
                      35, 36, 38, 40, 41, 42, 43, 44, 46, 47, 48,
                    ].includes(i)
                    const tint =
                      i % 11 === 0
                        ? 'bg-mq-coral'
                        : i % 7 === 0
                          ? 'bg-mq-sun'
                          : i % 5 === 0
                            ? 'bg-mq-sky'
                            : 'bg-white'
                    return (
                      <span
                        key={i}
                        className={`rounded-sm ${filled ? tint : 'bg-transparent'}`}
                      />
                    )
                  })}
                </div>
                <div className="mq-scan absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-mq-signal/50 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto flex min-h-[min(100dvh,920px)] max-w-6xl flex-col justify-center px-4 pb-24 pt-32 sm:px-6 lg:pb-32 lg:pt-36">
        <div className="max-w-xl space-y-8 lg:max-w-2xl">
          <BlurFade delay={0.05} inView>
            <div
              className={cn(
                'group inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-3.5 py-1.5 backdrop-blur-sm transition-colors hover:border-mq-sun/50 hover:bg-mq-sun/10',
              )}
            >
              <Sparkles className="h-3.5 w-3.5 text-mq-sun" />
              <AnimatedShinyText className="mx-0 text-sm text-white/80 via-white">
                QR dynamiques · Landing pages · Marque blanche
              </AnimatedShinyText>
            </div>
          </BlurFade>

          <BlurFade delay={0.12} inView>
            <p className="font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="mq-rainbow-text">QRious</span>
            </p>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <h1 className="font-display text-3xl font-semibold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
              Un QR code.
              <br />
              <span className="text-mq-sky">Trois univers.</span>
              <br />
              <span className="text-mq-coral">Zéro limite.</span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.28} inView>
            <p className="max-w-md text-lg leading-relaxed text-white/70">
              Transformez chaque scan en landing page sur-mesure — art, immobilier ou carte de
              visite — modifiable sans jamais réimprimer.
            </p>
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
                    Commencer gratuitement
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </ShimmerButton>
              </Link>
              <a
                href="#comment"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 text-base font-medium text-white/90 transition-colors hover:border-mq-signal/50 hover:bg-mq-signal/15"
              >
                Voir comment ça marche
              </a>
            </div>
          </BlurFade>
        </div>

        <BlurFade delay={0.4} inView className="relative mt-16 flex justify-center lg:hidden">
          <div className="relative h-56 w-56">
            <div className="mq-pulse-ring absolute inset-0 rounded-[1.75rem] border border-mq-coral/40" />
            <div className="absolute inset-4 overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-mq-signal/25 to-mq-coral/20">
              <BorderBeam size={80} duration={6} colorFrom="#12c4a8" colorTo="#ffc53d" />
              <div className="absolute inset-4 flex items-center justify-center text-white">
                <QrMark className="h-28 w-28" />
              </div>
              <div className="mq-scan absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-mq-sun/45 to-transparent" />
            </div>
          </div>
        </BlurFade>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-mq-paper via-mq-paper/80 to-transparent" />
    </section>
  )
}

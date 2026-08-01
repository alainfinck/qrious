import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

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
      {/* Full-bleed visual plane */}
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,#1a3d36_0%,transparent_55%),radial-gradient(ellipse_at_20%_80%,#14302b_0%,transparent_50%),linear-gradient(165deg,#0a0c0b_0%,#121816_45%,#0a0c0b_100%)]" />
        <div className="mq-noise absolute inset-0 opacity-[0.12] mix-blend-overlay" />
        <div className="absolute inset-0 mq-grid opacity-40" />
        <div className="absolute -right-[18%] top-[-10%] h-[70%] w-[70%] rounded-full bg-mq-signal/15 blur-[100px]" />
        <div className="absolute -left-[10%] bottom-[-20%] h-[50%] w-[50%] rounded-full bg-mq-signal/10 blur-[80px]" />

        {/* Giant QR motif — edge-to-edge visual anchor */}
        <div className="pointer-events-none absolute right-[-8%] top-1/2 hidden w-[min(58vw,640px)] -translate-y-1/2 lg:block">
          <div className="relative aspect-square">
            <div className="mq-pulse-ring absolute inset-[8%] rounded-[2.5rem] border border-mq-signal/30" />
            <div className="mq-float absolute inset-0 flex items-center justify-center">
              <div className="relative h-[78%] w-[78%] overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.55)] backdrop-blur-sm">
                <div className="absolute inset-6 grid grid-cols-7 gap-2 opacity-90">
                  {Array.from({ length: 49 }).map((_, i) => {
                    const filled = [0, 1, 2, 4, 5, 6, 7, 8, 10, 12, 13, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 35, 36, 38, 40, 41, 42, 43, 44, 46, 47, 48].includes(i)
                    return (
                      <span
                        key={i}
                        className={`rounded-sm ${filled ? 'bg-white' : 'bg-transparent'}`}
                      />
                    )
                  })}
                </div>
                <div className="mq-scan absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-mq-signal/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto flex min-h-[min(100dvh,920px)] max-w-6xl flex-col justify-center px-4 pb-24 pt-28 sm:px-6 lg:pb-32 lg:pt-32">
        <div className="max-w-xl space-y-8 lg:max-w-2xl">
          <p className="mq-reveal font-display text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Qrious
          </p>

          <h1 className="mq-reveal mq-reveal-delay-1 font-display text-3xl font-semibold leading-[1.15] tracking-tight text-white/95 sm:text-4xl lg:text-[2.75rem]">
            Un QR code.
            <br />
            Trois univers.
            <br />
            <span className="text-mq-signal">Zéro limite.</span>
          </h1>

          <p className="mq-reveal mq-reveal-delay-2 max-w-md text-lg leading-relaxed text-white/65">
            Transformez chaque scan en landing page sur-mesure — art, immobilier ou carte de
            visite — modifiable sans jamais réimprimer.
          </p>

          <div className="mq-reveal mq-reveal-delay-3 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-xl bg-mq-signal px-6 text-base font-semibold text-mq-ink hover:bg-mq-signal/90"
            >
              <Link href="/dashboard/register">
                Commencer gratuitement
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="h-12 rounded-xl px-6 text-base text-white/80 hover:bg-white/10 hover:text-white"
            >
              <a href="#comment">Voir comment ça marche</a>
            </Button>
          </div>
        </div>

        {/* Mobile visual — below fold on small screens still part of hero composition */}
        <div className="mq-reveal mq-reveal-delay-3 relative mt-16 flex justify-center lg:hidden">
          <div className="relative h-56 w-56">
            <div className="mq-pulse-ring absolute inset-0 rounded-[1.75rem] border border-mq-signal/35" />
            <div className="absolute inset-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
              <div className="absolute inset-4 flex items-center justify-center text-white">
                <QrMark className="h-28 w-28" />
              </div>
              <div className="mq-scan absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-mq-signal/40 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-mq-paper to-transparent" />
    </section>
  )
}

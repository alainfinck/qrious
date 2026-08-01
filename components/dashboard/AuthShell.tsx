'use client'

import Link from 'next/link'

import { BlurFade } from '@/components/ui/blur-fade'
import { BorderBeam } from '@/components/ui/border-beam'
import { Particles } from '@/components/ui/particles'
import { Ripple } from '@/components/ui/ripple'

function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <rect x="2" y="2" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="2.2" />
      <rect x="5" y="5" width="6" height="6" fill="currentColor" />
      <rect x="18" y="2" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="2.2" />
      <rect x="21" y="5" width="6" height="6" fill="currentColor" />
      <rect x="2" y="18" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="2.2" />
      <rect x="5" y="21" width="6" height="6" fill="currentColor" />
      <rect x="18" y="18" width="5" height="5" fill="currentColor" />
      <rect x="25" y="18" width="5" height="5" fill="currentColor" />
      <rect x="18" y="25" width="5" height="5" fill="currentColor" />
      <rect x="24" y="24" width="6" height="6" fill="currentColor" />
    </svg>
  )
}

export function AuthShell({
  children,
  title,
  description,
}: {
  children: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="relative flex min-h-dvh w-full overflow-hidden bg-mq-ink font-body text-white">
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(155deg,#0b1220_0%,#102536_45%,#0b1a2a_100%)]" />
        <div className="mq-blob absolute -left-[15%] top-[-10%] h-[55%] w-[55%] rounded-full bg-mq-signal/30 blur-[100px]" />
        <div className="mq-blob-delay absolute -right-[10%] bottom-[-15%] h-[50%] w-[50%] rounded-full bg-mq-coral/25 blur-[100px]" />
        <div className="mq-blob absolute right-[20%] top-[20%] h-[28%] w-[28%] rounded-full bg-mq-sky/20 blur-[80px]" />
        <div className="absolute left-[30%] bottom-[25%] h-[20%] w-[20%] rounded-full bg-mq-sun/15 blur-[70px]" />
        <div className="mq-noise absolute inset-0 opacity-[0.1] mix-blend-overlay" />
        <Particles
          className="absolute inset-0"
          quantity={60}
          ease={70}
          color="#12c4a8"
          size={0.45}
          staticity={40}
        />
      </div>

      {/* Left brand panel — desktop */}
      <div className="relative hidden w-[46%] flex-col justify-between p-10 lg:flex xl:p-14">
        <BlurFade delay={0.05} inView>
          <Link href="/" className="inline-flex items-center gap-3 font-display text-2xl font-bold">
            <BrandMark className="h-9 w-9 text-mq-coral" />
            <span className="mq-rainbow-text">QRious</span>
          </Link>
        </BlurFade>

        <div className="relative max-w-md">
          <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 opacity-40" aria-hidden>
            <Ripple mainCircleSize={120} mainCircleOpacity={0.25} numCircles={4} />
          </div>
          <BlurFade delay={0.15} inView>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-mq-sun">
              Tableau de bord
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
              Un QR.
              <br />
              <span className="text-mq-signal">Trois univers.</span>
              <br />
              <span className="text-mq-coral">Zéro friction.</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/55">
              Gérez vos landings art, immobilier et cartes de visite — contenu dynamique, marque
              blanche, stats en un clin d’œil.
            </p>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <ul className="mt-10 space-y-3">
              {[
                { color: 'bg-mq-signal', text: 'QR dynamiques sans réimpression' },
                { color: 'bg-mq-sky', text: 'Templates métiers prêts à l’emploi' },
                { color: 'bg-mq-coral', text: 'Marque blanche en quelques clics' },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-3 text-sm text-white/70">
                  <span className={`h-2.5 w-2.5 rounded-md ${item.color}`} />
                  {item.text}
                </li>
              ))}
            </ul>
          </BlurFade>
        </div>

        <BlurFade delay={0.4} inView>
          <p className="text-sm text-white/35">© {new Date().getFullYear()} QRious</p>
        </BlurFade>
      </div>

      {/* Form panel */}
      <div className="relative flex flex-1 items-center justify-center p-4 sm:p-8">
        <div className="absolute inset-y-0 left-0 hidden w-px bg-gradient-to-b from-transparent via-white/15 to-transparent lg:block" />

        <div className="relative w-full max-w-[480px]">
          <BlurFade delay={0.1} inView className="mb-8 text-center lg:hidden">
            <Link href="/" className="inline-flex items-center gap-2.5 font-display text-xl font-bold">
              <BrandMark className="h-8 w-8 text-mq-coral" />
              <span className="mq-rainbow-text">QRious</span>
            </Link>
          </BlurFade>

          <BlurFade delay={0.18} inView>
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.07] p-8 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] backdrop-blur-md sm:p-10">
              <BorderBeam
                size={140}
                duration={9}
                colorFrom="#12c4a8"
                colorTo="#ff5c4d"
                borderWidth={1.5}
              />

              <div className="mb-8 space-y-3 text-center sm:text-left">
                <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {title}
                </h2>
                <p className="text-base leading-relaxed text-white/60 sm:text-lg">{description}</p>
              </div>

              {children}
            </div>
          </BlurFade>

          <BlurFade delay={0.32} inView>
            <p className="mt-6 text-center text-sm text-white/40 lg:hidden">
              <Link href="/" className="hover:text-mq-signal">
                ← Retour au site
              </Link>
            </p>
          </BlurFade>
        </div>
      </div>
    </div>
  )
}

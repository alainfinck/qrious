'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { BlurFade } from '@/components/ui/blur-fade'
import { ShimmerButton } from '@/components/ui/shimmer-button'

export function CtaSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div
        className="absolute inset-0 bg-[linear-gradient(120deg,#12c4a8_0%,#3dbbff_35%,#ffc53d_70%,#ff5c4d_100%)]"
        aria-hidden
      />
      <div className="mq-noise absolute inset-0 opacity-[0.12] mix-blend-overlay" aria-hidden />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.2),transparent_35%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <BlurFade delay={0.1} inView>
          <p className="font-display text-5xl font-bold tracking-tight text-mq-ink sm:text-6xl">
            QRious
          </p>
        </BlurFade>
        <BlurFade delay={0.18} inView>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-mq-ink sm:text-4xl">
            Prêt à lancer votre premier QR&nbsp;?
          </h2>
        </BlurFade>
        <BlurFade delay={0.26} inView>
          <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-mq-ink/70">
            Créez votre compte, configurez votre landing et partagez-la en quelques minutes.
          </p>
        </BlurFade>
        <BlurFade delay={0.34} inView>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/dashboard/register">
              <ShimmerButton
                className="h-12 px-6"
                background="#0b1220"
                shimmerColor="#ffc53d"
                borderRadius="14px"
              >
                <span className="flex items-center gap-2 font-semibold text-white">
                  Accéder au tableau de bord
                  <ArrowRight className="h-4 w-4" />
                </span>
              </ShimmerButton>
            </Link>
            <a
              href="#metiers"
              className="inline-flex h-12 items-center justify-center rounded-xl border-2 border-mq-ink/20 bg-white/50 px-6 text-base font-semibold text-mq-ink backdrop-blur-sm transition-colors hover:bg-white"
            >
              Découvrir les métiers
            </a>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}

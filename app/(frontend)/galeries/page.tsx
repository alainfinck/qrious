'use client'

import Link from 'next/link'
import { Check, Instagram, Palette, Video } from 'lucide-react'

import { CtaSection } from '@/components/marketing/CtaSection'
import { MarketingFooter } from '@/components/marketing/MarketingFooter'
import { MarketingHeader } from '@/components/marketing/MarketingHeader'
import { BlurFade } from '@/components/ui/blur-fade'
import { BorderBeam } from '@/components/ui/border-beam'
import { MagicCard } from '@/components/ui/magic-card'
import { Particles } from '@/components/ui/particles'
import { ShimmerButton } from '@/components/ui/shimmer-button'

const benefits = [
  'Fiche œuvre complète : artiste, médium, dimensions, prix',
  'Liens Instagram & vidéo intégrés',
  'QR imprimé une fois, contenu mis à jour à volonté',
  'Marque blanche pour votre galerie',
  'Expérience mobile-first pour vos visiteurs',
  'Gestion centralisée de toutes vos œuvres',
]

const features = [
  {
    icon: Palette,
    title: 'Mise en valeur',
    desc: 'Chaque œuvre a sa landing dédiée, élégante et immersive.',
  },
  {
    icon: Instagram,
    title: 'Réseaux sociaux',
    desc: 'Reliez Instagram et contenus vidéo directement depuis le scan.',
  },
  {
    icon: Video,
    title: 'Contenus enrichis',
    desc: 'Ajoutez vidéos, bio artiste et détails techniques en un clic.',
  },
]

export default function GaleriesPage() {
  return (
    <div className="min-h-dvh bg-mq-paper font-body">
      <MarketingHeader />
      <main>
        <section className="relative overflow-hidden bg-mq-ink pt-32 pb-24 text-white lg:pt-40 lg:pb-28">
          <div className="absolute inset-0" aria-hidden>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_30%,#3d2b1f55_0%,transparent_55%)]" />
            <Particles quantity={40} color="#c4a574" size={0.4} className="absolute inset-0" />
          </div>
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
            <BlurFade delay={0.1} inView>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#c4a574]">
                Pour les galeries d&apos;art
              </p>
              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                Transformez vos expositions en expériences interactives
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-white/60">
                Un QR par œuvre : informations détaillées, Instagram, vidéo — sans réimprimer quand
                le prix ou la description change.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link href="/demo">
                  <ShimmerButton
                    background="linear-gradient(135deg, #c4a574 0%, #a38455 100%)"
                    shimmerColor="#fff8ee"
                    borderRadius="12px"
                    className="h-12 px-6"
                  >
                    <span className="font-semibold text-mq-ink">Voir la démo</span>
                  </ShimmerButton>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-white/15 px-6 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Demander une démo
                </Link>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 backdrop-blur-sm">
                <BorderBeam size={100} duration={10} colorFrom="#c4a574" colorTo="#e8d5b5" />
                <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="font-display font-semibold">Galerie Moderne</span>
                  <span className="text-xs text-white/40">Landing œuvre</span>
                </div>
                <div className="mb-4 aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-[#3d2b1f] via-[#6b4c3b] to-[#1a1512]">
                  <div className="flex h-full items-center justify-center">
                    <div className="h-32 w-24 -rotate-3 rounded-sm bg-gradient-to-b from-[#d4b896]/50 to-[#8b6914]/30 shadow-2xl" />
                  </div>
                </div>
                <p className="font-display text-lg font-semibold">Horizon #12</p>
                <p className="mt-1 text-sm text-white/45">Marie Dubois · Huile sur toile · 80 × 60 cm</p>
                <div className="mt-4 h-10 rounded-xl bg-[#c4a574] text-center font-display text-sm font-semibold leading-10 text-mq-ink">
                  Découvrir l&apos;œuvre
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <BlurFade delay={0.1} inView>
              <h2 className="font-display text-3xl font-bold text-mq-ink sm:text-4xl">
                Pensé pour les galeries
              </h2>
            </BlurFade>
            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              {features.map((f, i) => (
                <BlurFade key={f.title} delay={0.1 + i * 0.08} inView>
                  <MagicCard
                    className="h-full rounded-2xl"
                    gradientFrom="#c4a574"
                    gradientTo="#0f9f8a"
                    gradientColor="#c4a57418"
                  >
                    <div className="flex h-full flex-col gap-3 p-6">
                      <f.icon className="h-6 w-6 text-mq-signal" />
                      <h3 className="font-display text-lg font-semibold text-mq-ink">{f.title}</h3>
                      <p className="text-sm text-mq-muted">{f.desc}</p>
                    </div>
                  </MagicCard>
                </BlurFade>
              ))}
            </div>

            <BlurFade delay={0.2} inView>
              <ul className="mt-16 grid gap-3 sm:grid-cols-2">
                {benefits.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 rounded-xl border border-mq-ink/8 bg-white/60 px-4 py-3"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-mq-signal" />
                    <span className="text-sm text-mq-ink/80">{b}</span>
                  </li>
                ))}
              </ul>
            </BlurFade>
          </div>
        </section>

        <CtaSection />
      </main>
      <MarketingFooter />
    </div>
  )
}

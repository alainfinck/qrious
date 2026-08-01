'use client'

import Link from 'next/link'
import { Heart, Leaf, Lightbulb, Users, Zap } from 'lucide-react'

import { CtaSection } from '@/components/marketing/CtaSection'
import { MarketingFooter } from '@/components/marketing/MarketingFooter'
import { MarketingHeader } from '@/components/marketing/MarketingHeader'
import { BlurFade } from '@/components/ui/blur-fade'
import { MagicCard } from '@/components/ui/magic-card'
import { NumberTicker } from '@/components/ui/number-ticker'
import { Particles } from '@/components/ui/particles'
import { ShimmerButton } from '@/components/ui/shimmer-button'

const timeline = [
  {
    year: '2020',
    title: "La naissance d'une idée",
    desc: 'Les artistes et galeries avaient besoin de connecter le physique au digital sans réimprimer.',
  },
  {
    year: '2022',
    title: 'Premier produit',
    desc: 'Lancement de QRious : QR dynamiques et landings métiers.',
  },
  {
    year: '2024',
    title: 'Multi-vertical',
    desc: "Art, immobilier et cartes de visite — un back-office, trois expériences.",
  },
  {
    year: '2026',
    title: 'Marque blanche',
    desc: 'Personnalisation complète pour agences, galeries et indépendants.',
  },
]

const values = [
  {
    icon: Lightbulb,
    title: 'Simplicité',
    desc: 'Pas de complexité technique. Créez, publiez, partagez.',
  },
  {
    icon: Users,
    title: 'Métier d’abord',
    desc: 'Des templates pensés pour vos usages réels, pas des pages génériques.',
  },
  {
    icon: Zap,
    title: 'Rapidité',
    desc: 'De l’idée au QR scannable en quelques minutes.',
  },
  {
    icon: Leaf,
    title: 'Durabilité',
    desc: 'Un QR imprimé une fois. Le contenu évolue sans papier gaspillé.',
  },
  {
    icon: Heart,
    title: 'Proximité',
    desc: 'Une équipe à taille humaine, réactive et à l’écoute.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-dvh bg-mq-paper font-body">
      <MarketingHeader />
      <main>
        <section className="relative overflow-hidden bg-mq-ink pt-32 pb-24 text-white lg:pt-40 lg:pb-28">
          <div className="absolute inset-0" aria-hidden>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_30%,#1a3d36_0%,transparent_55%)]" />
            <Particles quantity={40} color="#0f9f8a" size={0.4} className="absolute inset-0" />
          </div>
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
            <BlurFade delay={0.1} inView>
              <p className="font-display text-5xl font-bold tracking-tight sm:text-6xl">QRious</p>
              <h1 className="mt-6 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Relier le physique au digital, sans friction
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/60">
                Nous construisons l’outil qui transforme chaque scan en expérience de marque —
                pour les galeries, l’immobilier et les professionnels.
              </p>
            </BlurFade>
            <BlurFade delay={0.2} inView>
              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                <a href="#histoire">
                  <ShimmerButton
                    background="linear-gradient(135deg, #0f9f8a 0%, #0b7a6a 100%)"
                    shimmerColor="#e8fff9"
                    borderRadius="12px"
                    className="h-12 px-6"
                  >
                    <span className="font-semibold text-mq-ink">Notre histoire</span>
                  </ShimmerButton>
                </a>
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-white/15 px-6 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Nous contacter
                </Link>
              </div>
            </BlurFade>
          </div>
        </section>

        <section id="histoire" className="scroll-mt-24 py-24 sm:py-32">
          <div className="mx-auto grid max-w-6xl gap-16 px-4 sm:px-6 lg:grid-cols-2">
            <BlurFade delay={0.1} inView>
              <h2 className="font-display text-3xl font-bold text-mq-ink sm:text-4xl">
                Notre histoire
              </h2>
              <div className="relative mt-12 space-y-10 border-l border-mq-ink/10 pl-6">
                {timeline.map((event) => (
                  <div key={event.year} className="relative">
                    <div className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-[3px] border-mq-signal bg-mq-paper" />
                    <p className="text-sm font-bold text-mq-signal">{event.year}</p>
                    <h3 className="mt-1 font-display text-lg font-semibold text-mq-ink">
                      {event.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-mq-muted">{event.desc}</p>
                  </div>
                ))}
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 rounded-3xl bg-mq-ink p-8 text-white">
                  <p className="font-display text-4xl font-bold">
                    <NumberTicker value={500} className="text-white" />+
                  </p>
                  <p className="mt-2 text-white/55">Professionnels accompagnés</p>
                </div>
                <div className="rounded-3xl bg-mq-signal/15 p-6">
                  <p className="font-display text-3xl font-bold text-mq-ink">
                    <NumberTicker value={3} className="text-mq-ink" />
                  </p>
                  <p className="mt-1 text-sm text-mq-muted">Verticals</p>
                </div>
                <div className="rounded-3xl bg-mq-ink-soft p-6 text-white">
                  <p className="font-display text-3xl font-bold">
                    <NumberTicker value={24} className="text-white" />h
                  </p>
                  <p className="mt-1 text-sm text-white/50">Support réactif</p>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        <section className="border-t border-mq-ink/5 bg-white/40 py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <BlurFade delay={0.1} inView>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mq-signal-deep">
                Valeurs
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-mq-ink sm:text-4xl">
                Ce qui nous guide
              </h2>
            </BlurFade>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((value, index) => (
                <BlurFade key={value.title} delay={0.08 + index * 0.05} inView>
                  <MagicCard
                    className="h-full rounded-2xl"
                    gradientFrom="#0f9f8a"
                    gradientTo="#5eead4"
                    gradientColor="#0f9f8a12"
                  >
                    <div className="flex h-full flex-col gap-3 p-6">
                      <value.icon className="h-6 w-6 text-mq-signal" />
                      <h3 className="font-display text-lg font-semibold text-mq-ink">
                        {value.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-mq-muted">{value.desc}</p>
                    </div>
                  </MagicCard>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        <CtaSection />
      </main>
      <MarketingFooter />
    </div>
  )
}

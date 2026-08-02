'use client'

import Link from 'next/link'
import { ArrowUpRight, Building2, Contact, Palette } from 'lucide-react'

import { BlurFade } from '@/components/ui/blur-fade'
import { BorderBeam } from '@/components/ui/border-beam'

const verticals = [
  {
    id: 'art',
    icon: Palette,
    label: 'Art & Galeries',
    href: '/galeries',
    description:
      'Mettez en valeur chaque œuvre : artiste, dimensions, médium, Instagram et vidéo.',
    visual: 'from-[#5c2b1a] via-[#c45a2a] to-[#1a0f0c]',
    accent: 'bg-mq-sun',
    beamFrom: '#ffc53d',
    beamTo: '#ff5c4d',
    pattern: (
      <div className="absolute inset-0 opacity-50" aria-hidden>
        <div className="absolute left-[15%] top-[20%] h-40 w-28 -rotate-6 rounded-sm bg-gradient-to-b from-mq-sun to-[#ff8a3d]/50" />
        <div className="absolute right-[18%] top-[28%] h-32 w-24 rotate-3 rounded-sm bg-gradient-to-br from-mq-coral to-[#8b2e1f]" />
        <div className="absolute bottom-[18%] left-[30%] h-24 w-36 rounded-sm bg-gradient-to-r from-[#ff8a3d]/70 to-mq-sun/40" />
      </div>
    ),
  },
  {
    id: 'immo',
    icon: Building2,
    label: 'Immobilier & Gîtes',
    href: '/features',
    description:
      'Présentez un bien avec prix, surface, pièces, DPE coloré et bouton de réservation.',
    visual: 'from-[#0a2a44] via-[#1a6fb5] to-[#061820]',
    accent: 'bg-mq-sky',
    beamFrom: '#3dbbff',
    beamTo: '#12c4a8',
    pattern: (
      <div className="absolute inset-0 opacity-55" aria-hidden>
        <div className="absolute bottom-0 left-[10%] right-[10%] h-[55%] rounded-t-lg border border-white/20 bg-gradient-to-t from-mq-sky/20 to-white/20" />
        <div className="absolute bottom-[55%] left-[18%] h-16 w-10 border border-white/25 bg-mq-sky/30" />
        <div className="absolute bottom-[55%] left-[32%] h-24 w-12 border border-white/25 bg-white/20" />
        <div className="absolute bottom-[55%] right-[22%] h-20 w-14 border border-white/25 bg-mq-signal/25" />
        <div className="absolute left-1/2 top-[22%] h-3 w-3 -translate-x-1/2 rounded-full bg-mq-sun" />
      </div>
    ),
  },
  {
    id: 'vcard',
    icon: Contact,
    label: 'Carte de visite',
    href: '/editeur',
    description:
      'Remplacez la carte papier : nom, fonction, téléphone, email et LinkedIn en un scan.',
    visual: 'from-[#06352e] via-[#12c4a8] to-[#042018]',
    accent: 'bg-mq-signal',
    beamFrom: '#12c4a8',
    beamTo: '#ffc53d',
    pattern: (
      <div className="absolute inset-0 flex items-center justify-center opacity-70" aria-hidden>
        <div className="relative h-44 w-72 rotate-[-8deg] rounded-2xl border border-white/25 bg-gradient-to-br from-white/20 to-mq-signal/20 p-6 backdrop-blur-sm">
          <div className="h-10 w-10 rounded-full bg-mq-coral" />
          <div className="mt-4 h-3 w-32 rounded-full bg-white/60" />
          <div className="mt-2 h-2 w-20 rounded-full bg-mq-sun/80" />
          <div className="mt-6 flex gap-2">
            <div className="h-8 flex-1 rounded-lg bg-mq-sky/40" />
            <div className="h-8 flex-1 rounded-lg bg-mq-signal/50" />
          </div>
        </div>
      </div>
    ),
  },
]

export function VerticalsSection() {
  return (
    <section id="metiers" className="relative overflow-hidden bg-mq-ink py-24 text-white sm:py-32">
      <div
        className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-mq-coral/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-mq-sky/20 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <BlurFade delay={0.1} inView>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mq-sun">Métiers</p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-5xl">
              Un template par{' '}
              <span className="text-mq-signal">univers</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/60">
              Les champs s&apos;adaptent à votre métier. Un back-office, trois expériences distinctes.
            </p>
          </div>
        </BlurFade>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {verticals.map((vertical, index) => (
            <BlurFade key={vertical.id} delay={0.1 + index * 0.08} inView>
              <Link
                href={vertical.href}
                className="group relative flex min-h-[420px] flex-col overflow-hidden rounded-3xl outline-none transition-transform duration-500 hover:-translate-y-1.5 hover:rotate-1 focus-visible:ring-2 focus-visible:ring-mq-sun"
              >
                <BorderBeam
                  size={110}
                  duration={9}
                  delay={index * 2}
                  colorFrom={vertical.beamFrom}
                  colorTo={vertical.beamTo}
                  borderWidth={1.5}
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${vertical.visual}`} />
                <div className="mq-noise absolute inset-0 opacity-[0.12] mix-blend-overlay" />
                {vertical.pattern}

                <div className="relative mt-auto space-y-4 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-7 pt-24">
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-md ${vertical.accent} text-mq-ink`}
                    >
                      <vertical.icon className="h-6 w-6" />
                    </span>
                    <h3 className="font-display text-xl font-semibold">{vertical.label}</h3>
                    <ArrowUpRight className="ml-auto h-5 w-5 text-white/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-mq-sun" />
                  </div>
                  <p className="text-sm leading-relaxed text-white/75">{vertical.description}</p>
                </div>
              </Link>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}

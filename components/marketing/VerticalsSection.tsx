import Link from 'next/link'
import { ArrowUpRight, Building2, Contact, Palette } from 'lucide-react'

const verticals = [
  {
    id: 'art',
    icon: Palette,
    label: 'Art & Galeries',
    href: '/galeries',
    description:
      'Mettez en valeur chaque œuvre : artiste, dimensions, médium, Instagram et vidéo.',
    visual: 'from-[#2a1f18] via-[#4a3428] to-[#1a1512]',
    accent: 'bg-[#c4a574]',
    pattern: (
      <div className="absolute inset-0 opacity-40" aria-hidden>
        <div className="absolute left-[15%] top-[20%] h-40 w-28 -rotate-6 rounded-sm bg-gradient-to-b from-[#d4b896] to-[#8b6914]/30 shadow-2xl" />
        <div className="absolute right-[18%] top-[28%] h-32 w-24 rotate-3 rounded-sm bg-gradient-to-br from-[#6b4c3b] to-[#2c1810] shadow-xl" />
        <div className="absolute bottom-[18%] left-[30%] h-24 w-36 rounded-sm bg-gradient-to-r from-[#3d2b1f]/80 to-[#5c4033]/60" />
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
    visual: 'from-[#0f1c24] via-[#1a3344] to-[#0c1419]',
    accent: 'bg-[#6bb3d9]',
    pattern: (
      <div className="absolute inset-0 opacity-50" aria-hidden>
        <div className="absolute bottom-0 left-[10%] right-[10%] h-[55%] rounded-t-lg border border-white/10 bg-gradient-to-t from-white/5 to-white/15" />
        <div className="absolute bottom-[55%] left-[18%] h-16 w-10 border border-white/15 bg-white/10" />
        <div className="absolute bottom-[55%] left-[32%] h-24 w-12 border border-white/15 bg-white/10" />
        <div className="absolute bottom-[55%] right-[22%] h-20 w-14 border border-white/15 bg-white/10" />
        <div className="absolute left-1/2 top-[22%] h-2 w-2 -translate-x-1/2 rounded-full bg-[#6bb3d9] shadow-[0_0_20px_#6bb3d9]" />
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
    visual: 'from-[#0f1a16] via-[#1a2e26] to-[#0a1210]',
    accent: 'bg-mq-signal',
    pattern: (
      <div className="absolute inset-0 flex items-center justify-center opacity-60" aria-hidden>
        <div className="relative h-44 w-72 rotate-[-8deg] rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/[0.03] p-6 shadow-2xl backdrop-blur-sm">
          <div className="h-10 w-10 rounded-full bg-mq-signal/80" />
          <div className="mt-4 h-3 w-32 rounded-full bg-white/40" />
          <div className="mt-2 h-2 w-20 rounded-full bg-white/20" />
          <div className="mt-6 flex gap-2">
            <div className="h-8 flex-1 rounded-lg bg-white/10" />
            <div className="h-8 flex-1 rounded-lg bg-white/10" />
          </div>
        </div>
      </div>
    ),
  },
]

export function VerticalsSection() {
  return (
    <section id="metiers" className="bg-mq-ink py-24 text-white sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mq-signal">
            Métiers
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-5xl">
            Un template par univers
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/55">
            Les champs s&apos;adaptent à votre métier. Un back-office, trois expériences distinctes.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {verticals.map((vertical) => (
            <Link
              key={vertical.id}
              href={vertical.href}
              className="group relative flex min-h-[420px] flex-col overflow-hidden rounded-3xl outline-none ring-mq-signal transition-transform duration-500 hover:-translate-y-1 focus-visible:ring-2"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${vertical.visual}`} />
              <div className="mq-noise absolute inset-0 opacity-[0.15] mix-blend-overlay" />
              {vertical.pattern}

              <div className="relative mt-auto space-y-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-7 pt-24">
                <div className="flex items-center gap-3">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${vertical.accent} text-mq-ink`}>
                    <vertical.icon className="h-4 w-4" />
                  </span>
                  <h3 className="font-display text-xl font-semibold">{vertical.label}</h3>
                  <ArrowUpRight className="ml-auto h-5 w-5 text-white/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-mq-signal" />
                </div>
                <p className="text-sm leading-relaxed text-white/65">{vertical.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { BarChart3, Layers, Paintbrush, RefreshCw, Shield, Zap } from 'lucide-react'

import { BlurFade } from '@/components/ui/blur-fade'
import { MagicCard } from '@/components/ui/magic-card'

const features = [
  {
    icon: RefreshCw,
    title: 'Contenu dynamique',
    description:
      'Modifiez prix, visuels ou coordonnées en temps réel. Le QR code imprimé reste le même.',
    iconBg: 'bg-mq-signal text-mq-ink',
    from: '#12c4a8',
    to: '#3dbbff',
    wash: '#12c4a820',
  },
  {
    icon: Layers,
    title: 'Multi-vertical',
    description:
      "Un seul outil pour l'art, l'immobilier et les cartes de visite. Chaque métier a son template.",
    iconBg: 'bg-mq-sky text-mq-ink',
    from: '#3dbbff',
    to: '#12c4a8',
    wash: '#3dbbff22',
  },
  {
    icon: Paintbrush,
    title: 'Marque blanche',
    description:
      'Logo et couleur primaire personnalisables. Vos clients voient votre marque, pas la nôtre.',
    iconBg: 'bg-mq-coral text-white',
    from: '#ff5c4d',
    to: '#ffc53d',
    wash: '#ff5c4d18',
  },
  {
    icon: Zap,
    title: 'Déploiement instantané',
    description:
      'Créez une page, publiez, partagez. Votre landing est en ligne en quelques secondes.',
    iconBg: 'bg-mq-sun text-mq-ink',
    from: '#ffc53d',
    to: '#ff5c4d',
    wash: '#ffc53d28',
  },
  {
    icon: BarChart3,
    title: 'Gestion centralisée',
    description:
      'Tous vos QR codes dans un tableau de bord unique. Statut brouillon ou publié en un clic.',
    iconBg: 'bg-mq-ink text-mq-signal',
    from: '#12c4a8',
    to: '#ffc53d',
    wash: '#12c4a816',
  },
  {
    icon: Shield,
    title: 'Pensé pour le mobile',
    description:
      'Design type link-in-bio, optimisé pour le scan smartphone. Rapide, lisible, élégant.',
    iconBg: 'bg-[#1a3a55] text-mq-sky',
    from: '#3dbbff',
    to: '#ff5c4d',
    wash: '#3dbbff18',
  },
]

export function FeaturesSection() {
  return (
    <section
      id="fonctionnalites"
      className="relative overflow-hidden bg-mq-paper py-24 sm:py-32"
    >
      <div
        className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-mq-signal/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-mq-coral/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <BlurFade delay={0.1} inView>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mq-coral">
              Fonctionnalités
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-mq-ink sm:text-5xl">
              Tout pour des QR codes{' '}
              <span className="mq-rainbow-text">professionnels</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-mq-muted">
              De la création à la mise en ligne — sans compétence technique.
            </p>
          </div>
        </BlurFade>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <BlurFade key={feature.title} delay={0.08 + index * 0.06} inView>
              <MagicCard
                className="mq-wiggle h-full rounded-2xl"
                gradientFrom={feature.from}
                gradientTo={feature.to}
                gradientColor={feature.wash}
                gradientOpacity={0.55}
                gradientSize={280}
              >
                <div className="flex h-full flex-col gap-4 p-6">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${feature.iconBg}`}
                  >
                    <feature.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-mq-ink">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-mq-muted">{feature.description}</p>
                </div>
              </MagicCard>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}

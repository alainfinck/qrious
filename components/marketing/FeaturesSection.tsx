import { BarChart3, Layers, Paintbrush, RefreshCw, Shield, Zap } from 'lucide-react'

const features = [
  {
    icon: RefreshCw,
    title: 'Contenu dynamique',
    description:
      'Modifiez prix, visuels ou coordonnées en temps réel. Le QR code imprimé reste le même.',
  },
  {
    icon: Layers,
    title: 'Multi-vertical',
    description:
      'Un seul outil pour l\'art, l\'immobilier et les cartes de visite. Chaque métier a son template.',
  },
  {
    icon: Paintbrush,
    title: 'Marque blanche',
    description:
      'Logo et couleur primaire personnalisables. Vos clients voient votre marque, pas la nôtre.',
  },
  {
    icon: Zap,
    title: 'Déploiement instantané',
    description:
      'Créez une page, publiez, partagez. Votre landing est en ligne en quelques secondes.',
  },
  {
    icon: BarChart3,
    title: 'Gestion centralisée',
    description:
      'Tous vos QR codes dans un tableau de bord unique. Statut brouillon ou publié en un clic.',
  },
  {
    icon: Shield,
    title: 'Pensé pour le mobile',
    description:
      'Design type link-in-bio, optimisé pour le scan smartphone. Rapide, lisible, élégant.',
  },
]

export function FeaturesSection() {
  return (
    <section id="fonctionnalites" className="bg-mq-paper py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mq-signal-deep">
            Fonctionnalités
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-mq-ink sm:text-5xl">
            Tout pour des QR codes professionnels
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-mq-muted">
            De la création à la mise en ligne — sans compétence technique.
          </p>
        </div>

        <ul className="mt-16 divide-y divide-mq-ink/10 border-y border-mq-ink/10">
          {features.map((feature, index) => (
            <li
              key={feature.title}
              className="group grid gap-4 py-8 transition-colors sm:grid-cols-[4rem_1fr_1.4fr] sm:items-start sm:gap-8"
            >
              <span className="font-display text-sm font-bold tabular-nums text-mq-fog group-hover:text-mq-signal">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="flex items-start gap-4">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mq-ink text-white transition-transform duration-300 group-hover:scale-105 group-hover:bg-mq-signal group-hover:text-mq-ink">
                  <feature.icon className="h-5 w-5" />
                </span>
                <h3 className="font-display text-xl font-semibold text-mq-ink">{feature.title}</h3>
              </div>
              <p className="text-base leading-relaxed text-mq-muted sm:pt-1">{feature.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

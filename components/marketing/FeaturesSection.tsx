import { BarChart3, Layers, Paintbrush, RefreshCw, Shield, Zap } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

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
      'Un seul outil pour l\'art, l\'immobilier et les cartes de visite. Chaque métier a son template dédié.',
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
    title: 'Pages optimisées mobile',
    description:
      'Design type link-in-bio, pensé pour le scan smartphone. Rapide, lisible, élégant.',
  },
]

export function FeaturesSection() {
  return (
    <section id="fonctionnalites" className="border-t border-slate-100 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
            Fonctionnalités
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Tout ce qu&apos;il faut pour des QR codes professionnels
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            De la création à la mise en ligne, Qrious couvre l&apos;intégralité du parcours — sans
            compétence technique requise.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-slate-200/80 transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

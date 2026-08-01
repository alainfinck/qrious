import { Check } from 'lucide-react'

const perks = [
  'Couleur primaire personnalisable (hex)',
  'Logo uploadé depuis votre médiathèque',
  'Application automatique sur toute la landing',
  'Cohérence visuelle pour vos clients finaux',
]

export function WhiteLabelSection() {
  return (
    <section className="border-t border-slate-100 bg-slate-900 py-20 text-white sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
            Marque blanche
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Votre image, pas la nôtre
          </h2>
          <p className="text-lg leading-relaxed text-slate-300">
            Chaque landing page hérite de votre identité visuelle. Idéal pour les galeries, agences
            immobilières et indépendants qui veulent une expérience premium sans développement sur
            mesure.
          </p>
          <ul className="space-y-3">
            {perks.map((perk) => (
              <li key={perk} className="flex items-start gap-3 text-sm text-slate-300">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                {perk}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="rounded-3xl border border-slate-700 bg-slate-800 p-6 shadow-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-violet-500" />
              <div>
                <p className="text-sm font-medium">Galerie Lumière</p>
                <p className="text-xs text-slate-400">Thème personnalisé</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-32 rounded-2xl bg-slate-700" />
              <div className="flex gap-2">
                <span className="rounded-full bg-violet-500/20 px-3 py-1 text-xs text-violet-300">
                  Huile sur toile
                </span>
                <span className="rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-300">
                  80 × 60 cm
                </span>
              </div>
              <div className="h-10 rounded-full bg-violet-500" />
            </div>
          </div>
          <div className="absolute -right-4 -top-4 rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 shadow-lg">
            <p className="text-xs text-slate-400">Couleur primaire</p>
            <p className="font-mono text-sm text-violet-400">#8B5CF6</p>
          </div>
        </div>
      </div>
    </section>
  )
}

const perks = [
  'Couleur primaire personnalisable (hex)',
  'Logo uploadé depuis votre médiathèque',
  'Application automatique sur toute la landing',
  'Cohérence visuelle pour vos clients finaux',
]

export function WhiteLabelSection() {
  return (
    <section className="relative overflow-hidden bg-mq-ink-soft py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(ellipse_at_center,#0f9f8a22_0%,transparent_70%)]" />
        <div className="mq-noise absolute inset-0 opacity-[0.1] mix-blend-overlay" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mq-signal">
            Marque blanche
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
            Votre image,
            <br />
            pas la nôtre
          </h2>
          <p className="text-lg leading-relaxed text-white/55">
            Chaque landing hérite de votre identité. Idéal pour galeries, agences et indépendants
            qui veulent du premium sans développement sur mesure.
          </p>
          <ul className="space-y-4 pt-2">
            {perks.map((perk) => (
              <li key={perk} className="flex items-start gap-3 text-sm text-white/70">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mq-signal" />
                {perk}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] backdrop-blur-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-mq-signal font-display text-sm font-bold text-mq-ink">
                GL
              </div>
              <div>
                <p className="font-display text-sm font-semibold">Galerie Lumière</p>
                <p className="text-xs text-white/40">Thème personnalisé</p>
              </div>
            </div>

            <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#3d2b1f] via-[#6b4c3b] to-[#1a1512]" />
              <div className="absolute inset-[12%] rounded-sm bg-gradient-to-b from-[#d4b896]/40 to-[#8b6914]/20" />
              <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                <span className="rounded-md bg-black/40 px-2.5 py-1 text-[11px] text-white/80 backdrop-blur-sm">
                  Huile sur toile
                </span>
                <span className="rounded-md bg-black/40 px-2.5 py-1 text-[11px] text-white/80 backdrop-blur-sm">
                  80 × 60 cm
                </span>
              </div>
            </div>

            <div className="h-11 rounded-xl bg-mq-signal text-center font-display text-sm font-semibold leading-[2.75rem] text-mq-ink">
              Découvrir l&apos;œuvre
            </div>
          </div>

          <div className="absolute -bottom-5 -left-4 rounded-2xl border border-white/10 bg-mq-ink px-4 py-3 sm:-left-8">
            <p className="text-[11px] uppercase tracking-wider text-white/40">Couleur primaire</p>
            <p className="mt-0.5 font-mono text-sm text-mq-signal">#0F9F8A</p>
          </div>
        </div>
      </div>
    </section>
  )
}

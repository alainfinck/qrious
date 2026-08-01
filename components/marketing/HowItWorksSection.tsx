import { Edit3, QrCode, Share2 } from 'lucide-react'

const steps = [
  {
    step: '01',
    icon: Edit3,
    title: 'Créez votre page',
    description:
      'Choisissez votre métier, renseignez le contenu et personnalisez votre thème depuis le tableau de bord.',
  },
  {
    step: '02',
    icon: QrCode,
    title: 'Générez votre QR',
    description:
      'Chaque page reçoit une URL unique. Imprimez le QR une seule fois — il ne change jamais.',
  },
  {
    step: '03',
    icon: Share2,
    title: 'Partagez & mettez à jour',
    description:
      'Vos visiteurs scannent une landing mobile-first. Vous modifiez le contenu quand vous voulez.',
  },
]

export function HowItWorksSection() {
  return (
    <section id="comment" className="relative overflow-hidden bg-mq-paper py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 mq-grid opacity-50" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mq-signal-deep">
            Comment ça marche
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-mq-ink sm:text-5xl">
            De l&apos;idée au scan en 3 étapes
          </h2>
        </div>

        <ol className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          {steps.map((item, index) => (
            <li key={item.step} className="relative">
              {index < steps.length - 1 && (
                <div
                  className="absolute left-[calc(50%+2.5rem)] top-8 hidden h-px w-[calc(100%-2rem)] bg-gradient-to-r from-mq-ink/20 to-transparent md:block"
                  aria-hidden
                />
              )}
              <div className="mb-6 flex items-center gap-4">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-mq-ink text-white shadow-[0_20px_40px_-20px_rgba(10,12,11,0.5)] transition-colors duration-300 hover:bg-mq-signal hover:text-mq-ink">
                  <item.icon className="h-7 w-7" />
                </span>
                <span className="font-display text-4xl font-bold text-mq-fog">{item.step}</span>
              </div>
              <h3 className="font-display text-2xl font-semibold text-mq-ink">{item.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-mq-muted">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

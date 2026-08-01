import { Edit3, QrCode, Share2 } from 'lucide-react'

const steps = [
  {
    step: '01',
    icon: Edit3,
    title: 'Créez votre page',
    description:
      'Depuis le tableau de bord, choisissez votre métier, renseignez le contenu et personnalisez votre thème.',
  },
  {
    step: '02',
    icon: QrCode,
    title: 'Générez votre QR',
    description:
      'Chaque page reçoit une URL unique (slug). Imprimez le QR une seule fois — il ne change jamais.',
  },
  {
    step: '03',
    icon: Share2,
    title: 'Partagez & mettez à jour',
    description:
      'Vos visiteurs scannent et découvrent une landing mobile-first. Vous modifiez le contenu quand vous voulez.',
  },
]

export function HowItWorksSection() {
  return (
    <section id="comment" className="border-t border-slate-100 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
            Comment ça marche
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            De l&apos;idée au scan en 3 étapes
          </h2>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {steps.map((item, index) => (
            <div key={item.step} className="relative text-center md:text-left">
              {index < steps.length - 1 && (
                <div
                  className="absolute left-1/2 top-8 hidden h-px w-full bg-slate-200 md:left-[calc(50%+2rem)] md:block md:w-[calc(100%-4rem)]"
                  aria-hidden
                />
              )}
              <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white md:mx-0">
                <item.icon className="h-7 w-7" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{item.step}</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

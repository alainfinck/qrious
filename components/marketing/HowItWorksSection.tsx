'use client'

import { Edit3, QrCode, Share2 } from 'lucide-react'

import { BlurFade } from '@/components/ui/blur-fade'
import { NumberTicker } from '@/components/ui/number-ticker'

const steps = [
  {
    step: 1,
    icon: Edit3,
    title: 'Créez votre page',
    description:
      'Choisissez votre métier, renseignez le contenu et personnalisez votre thème depuis le tableau de bord.',
    iconBg: 'bg-mq-signal text-mq-ink',
    num: 'text-mq-signal',
    bar: 'from-mq-signal to-mq-sky',
  },
  {
    step: 2,
    icon: QrCode,
    title: 'Générez votre QR',
    description:
      'Chaque page reçoit une URL unique. Imprimez le QR une seule fois — il ne change jamais.',
    iconBg: 'bg-mq-sky text-mq-ink',
    num: 'text-mq-sky',
    bar: 'from-mq-sky to-mq-sun',
  },
  {
    step: 3,
    icon: Share2,
    title: 'Partagez & mettez à jour',
    description:
      'Vos visiteurs scannent une landing mobile-first. Vous modifiez le contenu quand vous voulez.',
    iconBg: 'bg-mq-coral text-white',
    num: 'text-mq-coral',
    bar: 'from-mq-coral to-mq-sun',
  },
]

export function HowItWorksSection() {
  return (
    <section
      id="comment"
      className="relative overflow-hidden bg-gradient-to-b from-[#fff8ef] via-mq-paper to-mq-mist py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 mq-grid opacity-40" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <BlurFade delay={0.1} inView>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mq-sky">
              Comment ça marche
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-mq-ink sm:text-5xl">
              De l&apos;idée au scan en{' '}
              <NumberTicker value={3} className="text-mq-coral" /> étapes
            </h2>
          </div>
        </BlurFade>

        <ol className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          {steps.map((item, index) => (
            <BlurFade key={item.step} delay={0.12 + index * 0.1} inView>
              <li className="relative">
                {index < steps.length - 1 && (
                  <div
                    className={`absolute left-[calc(50%+2.5rem)] top-8 hidden h-1 w-[calc(100%-2rem)] rounded-full bg-gradient-to-r ${item.bar} opacity-50 md:block`}
                    aria-hidden
                  />
                )}
                <div className="mb-6 flex items-center gap-4">
                  <span
                    className={`mq-wiggle flex h-16 w-16 items-center justify-center rounded-2xl ${item.iconBg}`}
                  >
                    <item.icon className="h-7 w-7" />
                  </span>
                  <span className={`font-display text-4xl font-bold ${item.num}`}>
                    0{item.step}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-semibold text-mq-ink">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-mq-muted">{item.description}</p>
              </li>
            </BlurFade>
          ))}
        </ol>
      </div>
    </section>
  )
}

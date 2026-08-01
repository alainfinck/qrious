import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-mq-paper py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mq-signal/15 blur-[100px]" />
        <div className="mq-grid absolute inset-0 opacity-40" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="font-display text-5xl font-bold tracking-tight text-mq-ink sm:text-6xl">
          Qrious
        </p>
        <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-mq-ink sm:text-4xl">
          Prêt à lancer votre premier QR&nbsp;?
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-mq-muted">
          Créez votre compte, configurez votre landing et partagez-la en quelques minutes.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-xl bg-mq-ink px-6 text-base font-semibold text-white hover:bg-mq-ink-soft"
          >
            <Link href="/dashboard/register">
              Accéder au tableau de bord
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 rounded-xl border-mq-ink/15 bg-transparent px-6 text-base text-mq-ink hover:bg-mq-ink/5"
          >
            <a href="#metiers">Découvrir les métiers</a>
          </Button>
        </div>
      </div>
    </section>
  )
}

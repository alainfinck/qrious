import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function CtaSection() {
  return (
    <section className="border-t border-slate-100 bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Prêt à lancer votre premier QR code ?
        </h2>
        <p className="mt-4 text-lg text-slate-600">
          Créez votre compte, configurez votre première landing page et partagez-la en quelques
          minutes. Art, immobilier ou carte de visite — à vous de choisir.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="bg-slate-900 hover:bg-slate-800">
            <Link href="/dashboard">
              Accéder au tableau de bord
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#metiers">Découvrir les métiers</a>
          </Button>
        </div>
      </div>
    </section>
  )
}

import Link from 'next/link'
import { ArrowRight, Palette, QrCode, Smartphone } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-white to-white" />
      <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-slate-100/80 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-slate-50 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-28">
        <div className="space-y-8">
          <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">
            QR codes dynamiques · Multi-métiers
          </Badge>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              Un QR code.
              <br />
              <span className="text-slate-500">Trois univers.</span>
              <br />
              Zéro limite.
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-slate-600">
              Qrious transforme chaque scan en une landing page sur-mesure — Art, Immobilier ou Carte
              de visite — avec votre identité visuelle, modifiable à tout moment sans réimprimer.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="bg-slate-900 hover:bg-slate-800">
              <Link href="/dashboard">
                Commencer gratuitement
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#comment">Voir comment ça marche</a>
            </Button>
          </div>

          <div className="flex flex-wrap gap-6 pt-2 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <QrCode className="h-4 w-4 text-slate-400" />
              QR permanent
            </span>
            <span className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-slate-400" />
              Marque blanche
            </span>
            <span className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-slate-400" />
              Mobile-first
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="relative rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xl shadow-slate-200/50">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-slate-200" />
                <span className="h-3 w-3 rounded-full bg-slate-200" />
                <span className="h-3 w-3 rounded-full bg-slate-200" />
              </div>
              <span className="text-xs text-slate-400">qrious.app/atelier-dubois</span>
            </div>

            <div className="space-y-4 rounded-2xl bg-slate-50 p-5">
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white">
                <QrCode className="h-16 w-16 text-slate-800" />
              </div>
              <div className="text-center">
                <p className="text-xs font-medium uppercase tracking-widest text-slate-400">Scan →</p>
                <p className="mt-1 font-semibold text-slate-900">Landing page dynamique</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {['Art', 'Immo', 'VCard'].map((label) => (
                  <div
                    key={label}
                    className="rounded-xl bg-white py-2 text-center text-xs font-medium text-slate-600 shadow-sm ring-1 ring-slate-200/80"
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute -bottom-4 -left-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-lg">
            <p className="text-xs text-slate-400">Contenu mis à jour</p>
            <p className="text-sm font-semibold text-emerald-600">Sans changer le QR</p>
          </div>
        </div>
      </div>
    </section>
  )
}

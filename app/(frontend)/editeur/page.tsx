import type { Metadata } from 'next'
import Link from 'next/link'

import { MarketingHeader } from '@/components/marketing/MarketingHeader'
import { MarketingFooter } from '@/components/marketing/MarketingFooter'
import { PublicQrEditor } from '@/components/qr-editor/PublicQrEditor'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Éditeur de QR code gratuit | Qrious',
  description:
    'Créez et personnalisez un QR code gratuitement : URL, texte, Wi-Fi, vCard, email, SMS. Couleurs, logo, export PNG et SVG.',
}

export default function EditeurPage() {
  return (
    <div className="min-h-dvh bg-white">
      <MarketingHeader />
      <main>
        <section className="relative overflow-hidden border-b border-slate-100 pt-16 pb-10 lg:pt-20 lg:pb-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-white to-white" />
          <div className="container relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl space-y-4">
              <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-800">
                Éditeur gratuit
              </span>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Créez votre QR code en quelques secondes
              </h1>
              <p className="text-lg leading-relaxed text-slate-600">
                Personnalisez le contenu, les couleurs et le logo, puis téléchargez en PNG ou SVG —
                sans inscription. Pour suivre les scans et changer la destination plus tard, passez
                aux QR dynamiques.
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard">QR dynamiques</Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/features">Voir les fonctionnalités</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 lg:py-14">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <PublicQrEditor />
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  )
}

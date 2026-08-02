import type { Metadata } from 'next'
import Link from 'next/link'

import { MarketingFooter } from '@/components/marketing/MarketingFooter'
import { MarketingHeader } from '@/components/marketing/MarketingHeader'
import { PublicQrEditor } from '@/components/qr-editor/PublicQrEditor'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Générateur de QR Code Universel Gratuit | QRious',
  description:
    'Générateur de QR code universel gratuit : URL, Art, Immobilier, vCard, Wi-Fi, Resto/Menu, Avis, Tourisme, Manuel produit. Personnalisation avancée, export PNG et SVG.',
}

export default function GenerateurPage() {
  return (
    <div className="min-h-dvh bg-mq-paper font-body">
      <MarketingHeader />
      <main>
        <section className="relative overflow-hidden border-b border-mq-ink/5 bg-mq-ink pt-28 pb-12 text-white lg:pt-32 lg:pb-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,#1a3d36_0%,transparent_50%)]" />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center rounded-full border border-mq-signal/30 bg-mq-signal/10 px-3 py-1 text-xs font-semibold text-mq-signal">
                ✨ Générateur Universel Multi-Types
              </span>
              <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Générateur de QR Code Universel
              </h1>
              <p className="text-lg leading-relaxed text-white/70">
                Créez vos QR Codes statiques (Lien, Wi-Fi, vCard, Email) ou prévisualisez vos Smart Landing Pages Métiers (Art, Immobilier, Resto, Produit, Avis, Tourisme). Personnalisation intégrale du design et téléchargement gratuit en PNG HD et SVG.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  asChild
                  size="sm"
                  className="rounded-xl bg-mq-signal font-semibold text-mq-ink hover:bg-mq-signal/90"
                >
                  <Link href="/dashboard">Créer un QR Dynamique Rééditable</Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="rounded-xl text-white/70 hover:bg-white/10 hover:text-white"
                >
                  <Link href="/features">Découvrir la suite complète</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 lg:py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <PublicQrEditor />
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  )
}

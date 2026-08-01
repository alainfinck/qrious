import { Building2, Contact, Palette } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

const verticals = [
  {
    id: 'art',
    icon: Palette,
    label: 'Art & Galeries',
    color: 'bg-violet-500',
    description:
      'Mettez en valeur chaque œuvre avec une page dédiée : artiste, dimensions, médium, Instagram et vidéo.',
    highlights: ['Visuel œuvre', 'Badges dimensions', 'Feed Instagram', 'Lien vidéo'],
  },
  {
    id: 'immo',
    icon: Building2,
    label: 'Immobilier & Gîtes',
    color: 'bg-blue-500',
    description:
      'Présentez un bien ou un gîte avec prix, surface, pièces, DPE coloré et bouton de réservation.',
    highlights: ['Prix mis en avant', 'Grille caractéristiques', 'Badge DPE', 'Réservation'],
  },
  {
    id: 'vcard',
    icon: Contact,
    label: 'Carte de visite',
    color: 'bg-emerald-500',
    description:
      'Remplacez la carte papier par un QR code : nom, fonction, téléphone, email et LinkedIn en un scan.',
    highlights: ['Profil pro', 'Appel direct', 'Email', 'LinkedIn'],
  },
]

export function VerticalsSection() {
  return (
    <section id="metiers" className="border-t border-slate-100 bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
            Métiers
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Un template par univers, un QR pour tous
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Choisissez votre vertical : les champs s&apos;adaptent automatiquement. Un seul back-office,
            trois expériences client distinctes.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {verticals.map((vertical) => (
            <Card
              key={vertical.id}
              className="overflow-hidden border-slate-200/80 bg-white transition-shadow hover:shadow-lg"
            >
              <div className={`h-1.5 ${vertical.color}`} />
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-white ${vertical.color}`}
                  >
                    <vertical.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">{vertical.label}</h3>
                </div>
                <p className="text-sm leading-relaxed text-slate-600">{vertical.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {vertical.highlights.map((item) => (
                    <Badge key={item} variant="outline" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

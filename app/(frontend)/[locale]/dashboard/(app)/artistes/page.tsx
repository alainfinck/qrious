import Link from 'next/link'

import { DashboardPageHeader } from '@/components/dashboard/DashboardPageHeader'
import { getArtistName } from '@/lib/dashboard/mock-analytics'
import { getAllLandingPages } from '@/lib/payload'
import { Card, CardContent } from '@/components/ui/card'

export default async function ArtistesPage() {
  const pages = await getAllLandingPages()
  const artists = [
    ...new Map(
      pages
        .filter((p) => p.vertical === 'art' || p.artData?.artistName)
        .map((p) => [getArtistName(p), p]),
    ).entries(),
  ]

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <DashboardPageHeader
        title="Artistes"
        description="Artistes associés à vos QR codes"
        showCreateButton={false}
      />

      {artists.length === 0 ? (
        <Card className="border-border">
          <CardContent className="py-12 text-center text-muted-foreground">
            Aucun artiste renseigné. Ajoutez un nom d&apos;artiste lors de la création d&apos;un QR code Art.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {artists.map(([name, page]) => (
            <Link key={name} href={`/dashboard/${page.id}`}>
              <Card className="border-border transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <p className="font-semibold">{name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{page.title}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

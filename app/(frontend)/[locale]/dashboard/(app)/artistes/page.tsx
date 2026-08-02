import { getTranslations } from 'next-intl/server'

import { DashboardPageHeader } from '@/components/dashboard/DashboardPageHeader'
import { getArtistName } from '@/lib/dashboard/mock-analytics'
import { getAllLandingPages } from '@/lib/payload'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from '@/src/i18n/routing'

export default async function ArtistesPage() {
  const [pages, t] = await Promise.all([
    getAllLandingPages(),
    getTranslations('Dashboard.artists'),
  ])
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
        title={t('title')}
        description={t('description')}
        showCreateButton={false}
      />

      {artists.length === 0 ? (
        <Card className="border-border">
          <CardContent className="py-12 text-center text-muted-foreground">
            {t('empty')}
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

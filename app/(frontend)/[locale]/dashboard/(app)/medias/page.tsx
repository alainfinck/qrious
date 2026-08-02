import { getTranslations } from 'next-intl/server'

import { DashboardPageHeader } from '@/components/dashboard/DashboardPageHeader'
import { MediaLibrary } from '@/components/dashboard/MediaLibrary'
import { getAllMedia } from '@/lib/payload'

export default async function MediasPage() {
  const [medias, t] = await Promise.all([
    getAllMedia(),
    getTranslations('Dashboard.medias'),
  ])

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <DashboardPageHeader
        title={t('title')}
        description={t('description')}
        showCreateButton={false}
      />

      <MediaLibrary
        medias={medias.map((media) => ({
          id: media.id,
          url: media.url,
          alt: media.alt,
          filename: media.filename,
          mimeType: media.mimeType,
          filesize: media.filesize,
        }))}
      />
    </div>
  )
}

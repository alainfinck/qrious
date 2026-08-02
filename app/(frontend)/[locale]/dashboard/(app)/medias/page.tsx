import Image from 'next/image'
import Link from 'next/link'
import { FileIcon, ImageIcon, UploadCloud } from 'lucide-react'

import { DashboardPageHeader } from '@/components/dashboard/DashboardPageHeader'
import { Button } from '@/components/ui/button'
import { getAllMedia } from '@/lib/payload'
import { formatBytes } from '@/lib/utils'

export default async function MediasPage() {
  const medias = await getAllMedia()

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <DashboardPageHeader
        title="Bibliothèque de Médias"
        description="Gérez vos images, logos et documents hébergés (S3) pour vos Landing Pages."
        showCreateButton={false}
      >
        <Button asChild>
          <Link href="/cms/collections/media/create">
            <UploadCloud className="mr-2 h-4 w-4" />
            Uploader un fichier
          </Link>
        </Button>
      </DashboardPageHeader>

      {medias.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <ImageIcon className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="mb-2 font-display text-lg font-semibold text-slate-900">
            Aucun média pour le moment
          </h3>
          <p className="mb-6 max-w-md text-sm text-slate-500">
            Uploadez vos logos, bannières et menus (PDF) pour les insérer facilement dans vos Smart Pages.
          </p>
          <Button asChild variant="outline">
            <Link href="/cms/collections/media/create">Commencer l'upload</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {medias.map((media: any) => {
            const isImage = media.mimeType?.startsWith('image/')
            const url = media.url

            return (
              <div
                key={media.id}
                className="group relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition-all hover:border-slate-300 hover:shadow-md"
              >
                {isImage ? (
                  <Image
                    src={url}
                    alt={media.alt || media.filename}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <FileIcon className="h-10 w-10" />
                    <span className="text-xs font-medium uppercase">{media.mimeType?.split('/')[1] || 'Fichier'}</span>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 flex translate-y-full flex-col justify-end bg-gradient-to-t from-black/80 via-black/50 to-transparent p-3 pt-8 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="truncate text-xs font-medium text-white" title={media.filename}>
                    {media.filename}
                  </p>
                  <div className="mt-1 flex items-center justify-between text-[10px] text-white/80">
                    <span>{media.filesize ? formatBytes(media.filesize) : ''}</span>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white"
                    >
                      Ouvrir
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

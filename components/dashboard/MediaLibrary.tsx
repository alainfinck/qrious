'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useRef, useState, useTransition } from 'react'
import { FileIcon, ImageIcon, Loader2, UploadCloud } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { uploadMediaAction } from '@/lib/dashboard/actions'
import { cn, formatBytes } from '@/lib/utils'

export type MediaLibraryItem = {
  id: string | number
  url?: string | null
  alt?: string | null
  filename?: string | null
  mimeType?: string | null
  filesize?: number | null
}

const ACCEPT = 'image/*,application/pdf'
const MAX_BYTES = 50 * 1024 * 1024

function isAllowedFile(file: File) {
  return (
    file.size > 0 &&
    file.size <= MAX_BYTES &&
    (file.type.startsWith('image/') || file.type === 'application/pdf')
  )
}

type Props = {
  medias: MediaLibraryItem[]
}

export function MediaLibrary({ medias }: Props) {
  const t = useTranslations('Dashboard.medias')
  const tCommon = useTranslations('Dashboard.common')
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pendingCount, setPendingCount] = useState(0)
  const [isPending, startTransition] = useTransition()

  function openPicker() {
    inputRef.current?.click()
  }

  function uploadFiles(fileList: FileList | File[]) {
    const files = Array.from(fileList).filter(isAllowedFile)
    if (files.length === 0) {
      setError(t('invalidFiles'))
      return
    }

    setError(null)
    setPendingCount(files.length)

    const formData = new FormData()
    for (const file of files) {
      formData.append('files', file)
    }

    startTransition(async () => {
      const result = await uploadMediaAction(formData)
      setPendingCount(0)

      if (result.error) {
        setError(result.error)
        if (result.uploaded) router.refresh()
        return
      }

      router.refresh()
    })
  }

  function onDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setIsDragging(false)
    if (isPending) return
    uploadFiles(event.dataTransfer.files)
  }

  const uploading = isPending || pendingCount > 0

  return (
    <div className="space-y-6">
      <div
        role="button"
        tabIndex={0}
        aria-disabled={uploading}
        onClick={() => {
          if (!uploading) openPicker()
        }}
        onKeyDown={(event) => {
          if (uploading) return
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            openPicker()
          }
        }}
        onDragEnter={(event) => {
          event.preventDefault()
          if (!uploading) setIsDragging(true)
        }}
        onDragOver={(event) => {
          event.preventDefault()
          if (!uploading) setIsDragging(true)
        }}
        onDragLeave={(event) => {
          event.preventDefault()
          if (event.currentTarget.contains(event.relatedTarget as Node)) return
          setIsDragging(false)
        }}
        onDrop={onDrop}
        className={cn(
          'relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-10 text-center transition-colors',
          isDragging
            ? 'border-slate-900 bg-slate-100'
            : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100/80',
          uploading && 'pointer-events-none opacity-70',
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          multiple
          className="sr-only"
          disabled={uploading}
          onChange={(event) => {
            if (event.target.files?.length) {
              uploadFiles(event.target.files)
              event.target.value = ''
            }
          }}
        />

        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200">
          {uploading ? (
            <Loader2 className="h-6 w-6 animate-spin text-slate-700" />
          ) : (
            <UploadCloud className="h-6 w-6 text-slate-700" />
          )}
        </div>

        <p className="font-display text-base font-semibold text-slate-900">
          {uploading
            ? t('uploading', { count: pendingCount || 1 })
            : isDragging
              ? t('dropHere')
              : t('dropTitle')}
        </p>
        <p className="mt-1 max-w-md text-sm text-slate-500">{t('dropHint')}</p>

        <Button
          type="button"
          variant="outline"
          className="mt-5"
          disabled={uploading}
          onClick={(event) => {
            event.stopPropagation()
            openPicker()
          }}
        >
          <UploadCloud className="h-4 w-4" />
          {t('browse')}
        </Button>
      </div>

      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      {medias.length === 0 ? (
        <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
            <ImageIcon className="h-7 w-7 text-slate-400" />
          </div>
          <h3 className="mb-1 font-display text-lg font-semibold text-slate-900">
            {t('emptyTitle')}
          </h3>
          <p className="max-w-md text-sm text-slate-500">{t('emptyDescription')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {medias.map((media) => {
            const isImage = media.mimeType?.startsWith('image/')
            const url = media.url

            return (
              <div
                key={media.id}
                className="group relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition-all hover:border-slate-300 hover:shadow-md"
              >
                {isImage && url ? (
                  <Image
                    src={url}
                    alt={media.alt || media.filename || ''}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <FileIcon className="h-10 w-10" />
                    <span className="text-xs font-medium uppercase">
                      {media.mimeType?.split('/')[1] || tCommon('file')}
                    </span>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 flex translate-y-full flex-col justify-end bg-gradient-to-t from-black/80 via-black/50 to-transparent p-3 pt-8 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="truncate text-xs font-medium text-white" title={media.filename || undefined}>
                    {media.filename}
                  </p>
                  <div className="mt-1 flex items-center justify-between text-[10px] text-white/80">
                    <span>{media.filesize ? formatBytes(media.filesize) : ''}</span>
                    {url ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white"
                        onClick={(event) => event.stopPropagation()}
                      >
                        {t('open')}
                      </a>
                    ) : null}
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

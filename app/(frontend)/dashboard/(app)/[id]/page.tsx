import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

import { QrCodeForm } from '@/components/dashboard/QrCodeForm'
import { QrPreviewCard } from '@/components/dashboard/QrPreviewCard'
import { Button } from '@/components/ui/button'
import { updateQrCodeAction } from '@/lib/dashboard/actions'
import { getLandingPageById } from '@/lib/payload'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditQrCodePage({ params }: PageProps) {
  const { id } = await params
  const page = await getLandingPageById(id)

  if (!page) {
    notFound()
  }

  const boundUpdate = updateQrCodeAction.bind(null, id)

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{page.title}</h1>
          <p className="text-sm text-muted-foreground">Modifier le contenu et le statut de publication.</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <QrCodeForm page={page} action={boundUpdate} submitLabel="Enregistrer" />
        <QrPreviewCard page={page} />
      </div>
    </div>
  )
}

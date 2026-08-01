import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { QrCodeForm } from '@/components/dashboard/QrCodeForm'
import { Button } from '@/components/ui/button'
import { createQrCodeAction } from '@/lib/dashboard/actions'

export default function NewQrCodePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-start gap-3">
        <Button asChild variant="ghost" size="icon" className="mt-0.5 shrink-0">
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Retour</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Nouveau QR code</h1>
          <p className="text-sm text-muted-foreground">
            Trois étapes — identité, contenu, publication.
          </p>
        </div>
      </div>

      <QrCodeForm action={createQrCodeAction} submitLabel="Créer le QR code" />
    </div>
  )
}

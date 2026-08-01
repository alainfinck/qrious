'use client'

import Link from 'next/link'
import { ExternalLink, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { StatusBadge, VerticalBadge } from '@/components/dashboard/QrBadges'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { deleteQrCodeAction, togglePublishAction } from '@/lib/dashboard/actions'
import { formatDate, getQrTargetUrl } from '@/lib/dashboard/utils'
import type { LandingPage } from '@/types/landing-page'

interface QrCodesTableProps {
  pages: LandingPage[]
}

export function QrCodesTable({ pages }: QrCodesTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const pageToDelete = pages.find((p) => p.id === deleteId)

  if (pages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <p className="text-lg font-medium text-slate-900">Aucun QR code pour l&apos;instant</p>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Créez votre premier QR code dynamique et partagez une landing page modifiable à tout moment.
        </p>
        <Button asChild className="mt-6">
          <Link href="/dashboard/new">Créer un QR code</Link>
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Slug / URL</TableHead>
              <TableHead>Univers</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Mis à jour</TableHead>
              <TableHead className="w-[70px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map((page) => (
              <TableRow key={page.id}>
                <TableCell className="font-medium">{page.title}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">{page.slug}</code>
                    <div>
                      <a
                        href={getQrTargetUrl(page.slug)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                      >
                        Voir la page
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <VerticalBadge vertical={page.vertical} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={page.status} />
                </TableCell>
                <TableCell className="text-muted-foreground">{formatDate(page.updatedAt)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/${page.id}`}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Modifier
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          void togglePublishAction(page.id, page.status)
                        }}
                      >
                        {page.status === 'published' ? 'Passer en brouillon' : 'Publier'}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => setDeleteId(page.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={Boolean(deleteId)} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer ce QR code ?</DialogTitle>
            <DialogDescription>
              « {pageToDelete?.title} » sera définitivement supprimé. Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Annuler
            </Button>
            <Button
              type="button"
              className="bg-destructive hover:bg-destructive/90"
              onClick={() => {
                if (deleteId) void deleteQrCodeAction(deleteId)
              }}
            >
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

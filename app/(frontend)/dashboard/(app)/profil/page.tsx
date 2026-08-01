import { DashboardPageHeader } from '@/components/dashboard/DashboardPageHeader'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getCurrentUser } from '@/lib/auth/session'
import { getDashboardStats } from '@/lib/payload'

export default async function ProfilPage() {
  const [stats, user] = await Promise.all([getDashboardStats(), getCurrentUser()])

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <DashboardPageHeader
        title="Profil"
        description="Votre espace Qrious"
        showCreateButton={false}
      />

      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle>Compte</CardTitle>
          <CardDescription>Informations de votre compte</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="flex justify-between border-b pb-3">
            <span className="text-muted-foreground">E-mail</span>
            <span className="font-medium">{user?.email ?? '—'}</span>
          </div>
          <div className="flex justify-between border-b pb-3">
            <span className="text-muted-foreground">Rôle</span>
            <span className="font-medium">{user?.role === 'admin' ? 'Admin' : 'Utilisateur'}</span>
          </div>
          <div className="flex justify-between border-b pb-3">
            <span className="text-muted-foreground">QR codes actifs</span>
            <span className="font-medium">{stats.published}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Brouillons</span>
            <span className="font-medium">{stats.drafts}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

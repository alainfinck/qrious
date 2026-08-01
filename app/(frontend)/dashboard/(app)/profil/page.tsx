import { DashboardPageHeader } from '@/components/dashboard/DashboardPageHeader'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getDashboardStats } from '@/lib/payload'

export default async function ProfilPage() {
  const stats = await getDashboardStats()

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <DashboardPageHeader
        title="Profil"
        description="Votre espace QRious Art"
        showCreateButton={false}
      />

      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle>Compte gestionnaire</CardTitle>
          <CardDescription>Paramètres de votre espace de gestion QR codes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="flex justify-between border-b pb-3">
            <span className="text-muted-foreground">Projet</span>
            <span className="font-medium">QRious — Art QR</span>
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

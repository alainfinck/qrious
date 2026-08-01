'use client'

import { useState } from 'react'
import { QrCode } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { loginAction } from '@/lib/dashboard/actions'

export function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(formData: FormData) {
    setPending(true)
    setError(null)
    const result = await loginAction(formData)
    if (result?.error) {
      setError(result.error)
      setPending(false)
    }
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent">
          <QrCode className="h-7 w-7 text-primary" />
        </div>
        <h1 className="text-2xl font-bold">QRious</h1>
        <p className="text-sm text-muted-foreground">Gestion de QR codes pour l&apos;art</p>
      </div>

      <Card>
        <CardHeader className="text-center">
          <CardTitle>Connexion</CardTitle>
          <CardDescription>Accédez à votre tableau de bord Art QR</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                autoFocus
              />
            </div>

            {error ? (
              <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            ) : null}

            <Button type="submit" disabled={pending} className="w-full">
              {pending ? 'Connexion…' : 'Se connecter'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

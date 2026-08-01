'use client'

import Link from 'next/link'
import { useState } from 'react'

import { AuthShell } from '@/components/dashboard/AuthShell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { resetPasswordAction } from '@/lib/auth/actions'

export function ResetPasswordForm({ token }: { token: string }) {
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  if (!token) {
    return (
      <AuthShell title="Lien invalide" description="Ce lien de réinitialisation est incomplet">
        <p className="text-sm text-muted-foreground">
          Demandez un nouveau lien depuis la page{' '}
          <Link href="/dashboard/forgot-password" className="font-medium text-foreground underline">
            mot de passe oublié
          </Link>
          .
        </p>
      </AuthShell>
    )
  }

  async function handleSubmit(formData: FormData) {
    setPending(true)
    setError(null)
    formData.set('token', token)
    const result = await resetPasswordAction(formData)
    if (result?.error) {
      setError(result.error)
      setPending(false)
    }
  }

  return (
    <AuthShell title="Nouveau mot de passe" description="Choisissez un nouveau mot de passe">
      <form action={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">Nouveau mot de passe</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="8 caractères minimum"
            minLength={8}
            required
            autoFocus
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            minLength={8}
            required
          />
        </div>

        {error ? (
          <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        ) : null}

        <Button type="submit" disabled={pending} className="w-full">
          {pending ? 'Enregistrement…' : 'Enregistrer'}
        </Button>
      </form>
    </AuthShell>
  )
}

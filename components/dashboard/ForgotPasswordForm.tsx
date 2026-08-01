'use client'

import Link from 'next/link'
import { useState } from 'react'

import { AuthShell } from '@/components/dashboard/AuthShell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { forgotPasswordAction } from '@/lib/auth/actions'

export function ForgotPasswordForm() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(formData: FormData) {
    setPending(true)
    setError(null)
    setSuccess(null)
    const result = await forgotPasswordAction(formData)
    if (result.error) {
      setError(result.error)
    } else if (result.success) {
      setSuccess(result.success)
    }
    setPending(false)
  }

  return (
    <AuthShell
      title="Mot de passe oublié"
      description="Recevez un lien pour réinitialiser votre mot de passe"
    >
      <form action={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="vous@exemple.fr"
            required
            autoFocus
          />
        </div>

        {error ? (
          <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        ) : null}

        {success ? (
          <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
            {success}
          </p>
        ) : null}

        <Button type="submit" disabled={pending} className="w-full">
          {pending ? 'Envoi…' : 'Envoyer le lien'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link href="/dashboard/login" className="font-medium text-foreground hover:underline">
          Retour à la connexion
        </Link>
      </p>
    </AuthShell>
  )
}

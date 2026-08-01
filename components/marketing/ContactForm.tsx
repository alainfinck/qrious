'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Loader2, Send } from 'lucide-react'

import { BorderBeam } from '@/components/ui/border-beam'
import { Button } from '@/components/ui/button'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      ;(e.target as HTMLFormElement).reset()
      setTimeout(() => setIsSuccess(false), 5000)
    }, 1500)
  }

  const fieldClass =
    'w-full rounded-xl border border-mq-ink/10 bg-mq-paper/80 px-4 py-3 text-mq-ink outline-none transition-colors placeholder:text-mq-muted/50 focus:border-mq-signal focus:bg-white focus:ring-2 focus:ring-mq-signal/20'

  return (
    <div className="relative overflow-hidden rounded-3xl border border-mq-ink/8 bg-white p-8 shadow-[0_24px_60px_-30px_rgba(10,12,11,0.2)]">
      <BorderBeam size={100} duration={12} colorFrom="#0f9f8a" colorTo="#5eead4" />
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold text-mq-ink">Envoyez-nous un message</h2>
        <p className="mt-1 text-sm text-mq-muted">
          Remplissez le formulaire — réponse sous 24h ouvrées.
        </p>
      </div>

      {isSuccess && (
        <div className="mb-6 rounded-xl border border-mq-signal/30 bg-mq-signal/10 px-4 py-3 text-sm text-mq-signal-deep">
          Message envoyé ! Nous vous répondrons rapidement.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-sm font-medium text-mq-ink">
              Prénom *
            </label>
            <input type="text" id="firstName" name="firstName" required className={fieldClass} />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="text-sm font-medium text-mq-ink">
              Nom *
            </label>
            <input type="text" id="lastName" name="lastName" required className={fieldClass} />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-mq-ink">
              Email *
            </label>
            <input type="email" id="email" name="email" required className={fieldClass} />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-mq-ink">
              Téléphone
            </label>
            <input type="tel" id="phone" name="phone" className={fieldClass} />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium text-mq-ink">
            Sujet *
          </label>
          <select id="subject" name="subject" required className={fieldClass}>
            <option value="">Choisissez un sujet</option>
            <option value="demo">Demande de démonstration</option>
            <option value="pricing">Question sur les tarifs</option>
            <option value="support">Support technique</option>
            <option value="enterprise">Solution Enterprise</option>
            <option value="partnership">Partenariat</option>
            <option value="other">Autre</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-mq-ink">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            placeholder="Décrivez votre projet ou votre question..."
            className={`${fieldClass} resize-none`}
          />
        </div>

        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="privacy"
            required
            className="mt-1 h-4 w-4 rounded border-mq-ink/20 text-mq-signal focus:ring-mq-signal"
          />
          <span className="text-sm text-mq-muted">
            J&apos;accepte que mes données soient traitées conformément à la{' '}
            <Link href="/confidentialite" className="text-mq-signal-deep hover:underline">
              politique de confidentialité
            </Link>{' '}
            *
          </span>
        </label>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="h-12 rounded-xl bg-mq-ink px-8 font-semibold text-white hover:bg-mq-ink-soft"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Envoi…
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Envoyer
            </>
          )}
        </Button>
      </form>
    </div>
  )
}

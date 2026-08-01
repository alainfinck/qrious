'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      ;(e.target as HTMLFormElement).reset()
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    }, 2000)
  }

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-12 w-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center text-2xl">
          ✉️
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Envoyez-nous un message</h2>
          <p className="text-slate-500">Remplissez ce formulaire et nous vous répondrons dans les plus brefs délais</p>
        </div>
      </div>

      {isSuccess && (
        <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200 flex items-start gap-3">
          <div className="font-bold">✓</div>
          <div>Message envoyé ! Nous vous répondrons dans les 24h.</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-sm font-medium text-slate-900">
              Prénom *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-colors outline-none"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="text-sm font-medium text-slate-900">
              Nom *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-colors outline-none"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-slate-900">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-colors outline-none"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-slate-900">
              Téléphone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-colors outline-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium text-slate-900">
            Sujet *
          </label>
          <select
            id="subject"
            name="subject"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-colors outline-none appearance-none"
          >
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
          <label htmlFor="message" className="text-sm font-medium text-slate-900">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            placeholder="Décrivez votre projet ou votre question..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-colors outline-none resize-none"
          ></textarea>
        </div>

        <div className="space-y-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="newsletter"
              className="mt-1 h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-600"
            />
            <span className="text-sm text-slate-600">
              Je souhaite recevoir la newsletter Qrious.fr avec les dernières actualités et conseils artistiques
            </span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="privacy"
              required
              className="mt-1 h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-600"
            />
            <span className="text-sm text-slate-600">
              J'accepte que mes données soient traitées conformément à la{' '}
              <Link href="/privacy" className="text-purple-600 hover:underline">
                politique de confidentialité
              </Link>{' '}
              *
            </span>
          </label>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Envoyer le message
            </>
          )}
        </Button>
      </form>
    </div>
  )
}

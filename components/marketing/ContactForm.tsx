'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Loader2, Send } from 'lucide-react'

import { BorderBeam } from '@/components/ui/border-beam'
import { Button } from '@/components/ui/button'
import { Link } from '@/src/i18n/routing'

const SUBJECT_KEYS = [
  'demo',
  'pricing',
  'support',
  'enterprise',
  'partnership',
  'other',
] as const

export function ContactForm() {
  const t = useTranslations('ContactForm')
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
        <h2 className="font-display text-2xl font-bold text-mq-ink">{t('title')}</h2>
        <p className="mt-1 text-sm text-mq-muted">{t('subtitle')}</p>
      </div>

      {isSuccess && (
        <div className="mb-6 rounded-xl border border-mq-signal/30 bg-mq-signal/10 px-4 py-3 text-sm text-mq-signal-deep">
          {t('success')}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-sm font-medium text-mq-ink">
              {t('firstName')}
            </label>
            <input type="text" id="firstName" name="firstName" required className={fieldClass} />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="text-sm font-medium text-mq-ink">
              {t('lastName')}
            </label>
            <input type="text" id="lastName" name="lastName" required className={fieldClass} />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-mq-ink">
              {t('email')}
            </label>
            <input type="email" id="email" name="email" required className={fieldClass} />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-mq-ink">
              {t('phone')}
            </label>
            <input type="tel" id="phone" name="phone" className={fieldClass} />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium text-mq-ink">
            {t('subject')}
          </label>
          <select id="subject" name="subject" required className={fieldClass}>
            <option value="">{t('subjectPlaceholder')}</option>
            {SUBJECT_KEYS.map((key) => (
              <option key={key} value={key}>
                {t(`subjects.${key}`)}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-mq-ink">
            {t('message')}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            placeholder={t('messagePlaceholder')}
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
            {t('privacyConsent')}{' '}
            <Link href="/confidentialite" className="text-mq-signal-deep hover:underline">
              {t('privacyLink')}
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
              {t('submitting')}
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              {t('submit')}
            </>
          )}
        </Button>
      </form>
    </div>
  )
}

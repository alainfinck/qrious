'use client'

import { useTranslations } from 'next-intl'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'

import { BrandWordmark } from '@/components/brand/BrandWordmark'
import { ContactForm } from '@/components/marketing/ContactForm'
import { MarketingFooter } from '@/components/marketing/MarketingFooter'
import { MarketingHeader } from '@/components/marketing/MarketingHeader'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { BlurFade } from '@/components/ui/blur-fade'
import { Particles } from '@/components/ui/particles'
import { Link } from '@/src/i18n/routing'

const faqKeys = ['1', '2', '3', '4', '5'] as const

const contacts = [
  {
    icon: Mail,
    key: 'email' as const,
    value: 'hello@qrious.fr',
  },
  {
    icon: Phone,
    key: 'phone' as const,
    value: '06 76 38 01 52',
  },
  {
    icon: MapPin,
    key: 'address' as const,
    valueKey: true as const,
  },
  {
    icon: MessageCircle,
    key: 'demo' as const,
    valueKey: true as const,
    href: '/demo',
  },
]

export default function ContactPage() {
  const t = useTranslations('Contact')

  return (
    <div className="min-h-dvh bg-mq-paper font-body">
      <MarketingHeader />
      <main>
        <section className="relative overflow-hidden bg-mq-ink pt-32 pb-20 text-white lg:pt-40 lg:pb-24">
          <Particles quantity={40} color="#0f9f8a" size={0.35} className="absolute inset-0" />
          <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
            <BlurFade delay={0.1} inView>
              <p className="text-4xl font-bold tracking-tight sm:text-5xl">
                <BrandWordmark rainbow />
              </p>
              <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                {t('title')}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-white/60">{t('subtitle')}</p>
            </BlurFade>
          </div>
        </section>

        <section className="relative z-10 -mt-8 pb-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-3">
            <BlurFade delay={0.15} inView className="lg:col-span-2">
              <ContactForm />
            </BlurFade>

            <BlurFade delay={0.25} inView>
              <div className="space-y-6">
                <h3 className="font-display text-xl font-semibold text-mq-ink">{t('coordsTitle')}</h3>
                {contacts.map((item) => {
                  const value =
                    'value' in item && item.value
                      ? item.value
                      : t(`${item.key}.value`)
                  const content = (
                    <div className="flex gap-4 rounded-2xl border border-mq-ink/8 bg-white/70 p-4 transition-colors hover:border-mq-signal/30">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mq-signal/10 text-mq-signal">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-mq-ink">{t(`${item.key}.title`)}</p>
                        <p className="text-sm text-mq-muted">{value}</p>
                        <p className="text-xs text-mq-muted/70">{t(`${item.key}.hint`)}</p>
                      </div>
                    </div>
                  )
                  return item.href ? (
                    <Link key={item.key} href={item.href}>
                      {content}
                    </Link>
                  ) : (
                    <div key={item.key}>{content}</div>
                  )
                })}
              </div>
            </BlurFade>
          </div>
        </section>

        <section className="border-t border-mq-ink/5 bg-white/40 py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <BlurFade delay={0.1} inView>
              <h2 className="mb-8 text-center font-display text-2xl font-bold text-mq-ink sm:text-3xl">
                {t('faqTitle')}
              </h2>
            </BlurFade>
            <Accordion type="single" collapsible className="space-y-2">
              {faqKeys.map((key) => (
                <AccordionItem
                  key={key}
                  value={`faq-${key}`}
                  className="rounded-2xl border border-mq-ink/8 bg-white px-5 data-[state=open]:border-mq-signal/30"
                >
                  <AccordionTrigger className="text-left font-display text-base font-semibold text-mq-ink hover:no-underline">
                    {t(`faq.${key}.q`)}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-mq-muted">
                    {t(`faq.${key}.a`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  )
}

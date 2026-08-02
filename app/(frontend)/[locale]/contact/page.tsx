'use client'

import Link from 'next/link'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'

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

const faqs = [
  {
    q: 'Comment fonctionne l’essai gratuit ?',
    a: 'L’essai de 14 jours permet de tester les fonctionnalités sans engagement. Aucune carte bancaire n’est requise pour démarrer.',
  },
  {
    q: 'Puis-je modifier le contenu après impression ?',
    a: 'Oui. Le QR reste identique ; seule la landing change quand vous publiez une mise à jour.',
  },
  {
    q: 'Proposez-vous de la marque blanche ?',
    a: 'Oui — logo et couleur primaire s’appliquent automatiquement à vos landings (selon le plan).',
  },
  {
    q: 'Quels métiers sont supportés ?',
    a: 'Art & galeries, immobilier & gîtes, et cartes de visite professionnelles.',
  },
  {
    q: 'Comment sont protégées mes données ?',
    a: 'Traitement conforme RGPD, chiffrement en transit, accès restreint. Voir notre politique de confidentialité.',
  },
]

const contacts = [
  {
    icon: Mail,
    title: 'Email',
    value: 'hello@qrious.fr',
    hint: 'Réponse sous 24h',
  },
  {
    icon: Phone,
    title: 'Téléphone',
    value: '06 76 38 01 52',
    hint: 'Lun–Ven 9h–18h',
  },
  {
    icon: MapPin,
    title: 'Adresse',
    value: 'Alsace, France',
    hint: 'Sur rendez-vous',
  },
  {
    icon: MessageCircle,
    title: 'Demo',
    value: 'Essayer la plateforme',
    hint: 'Accès immédiat',
    href: '/demo',
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-dvh bg-mq-paper font-body">
      <MarketingHeader />
      <main>
        <section className="relative overflow-hidden bg-mq-ink pt-32 pb-20 text-white lg:pt-40 lg:pb-24">
          <Particles quantity={40} color="#0f9f8a" size={0.35} className="absolute inset-0" />
          <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
            <BlurFade delay={0.1} inView>
              <p className="font-display text-4xl font-bold tracking-tight sm:text-5xl">QRious</p>
              <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Contactez-nous
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-white/60">
                Une question, un projet ou une démo ? On vous répond rapidement.
              </p>
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
                <h3 className="font-display text-xl font-semibold text-mq-ink">Coordonnées</h3>
                {contacts.map((item) => {
                  const content = (
                    <div className="flex gap-4 rounded-2xl border border-mq-ink/8 bg-white/70 p-4 transition-colors hover:border-mq-signal/30">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mq-signal/10 text-mq-signal">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-mq-ink">{item.title}</p>
                        <p className="text-sm text-mq-muted">{item.value}</p>
                        <p className="text-xs text-mq-muted/70">{item.hint}</p>
                      </div>
                    </div>
                  )
                  return item.href ? (
                    <Link key={item.title} href={item.href}>
                      {content}
                    </Link>
                  ) : (
                    <div key={item.title}>{content}</div>
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
                Questions fréquentes
              </h2>
            </BlurFade>
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={faq.q}
                  value={`faq-${i}`}
                  className="rounded-2xl border border-mq-ink/8 bg-white px-5 data-[state=open]:border-mq-signal/30"
                >
                  <AccordionTrigger className="text-left font-display text-base font-semibold text-mq-ink hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-mq-muted">
                    {faq.a}
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

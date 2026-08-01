import Link from 'next/link'
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react'

import { MarketingHeader } from '@/components/marketing/MarketingHeader'
import { MarketingFooter } from '@/components/marketing/MarketingFooter'
import { ContactForm } from '@/components/marketing/ContactForm'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function ContactPage() {
  return (
    <div className="min-h-dvh bg-white">
      <MarketingHeader />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-white to-white" />
          <div className="container relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl mb-6">
                Contactez-nous
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Une question ? Un projet ? Une demande de démonstration ? Notre équipe est là pour vous accompagner dans votre aventure artistique.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form and Info Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
              <div className="lg:col-span-2">
                <ContactForm />
              </div>
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Informations de contact</h3>
                
                <div className="flex gap-4">
                  <div className="h-12 w-12 shrink-0 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h6 className="font-bold text-slate-900 mb-1">Email</h6>
                    <p className="text-slate-600 mb-1">hello@qrious.fr</p>
                    <p className="text-sm text-slate-400">Réponse sous 24h</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-12 w-12 shrink-0 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h6 className="font-bold text-slate-900 mb-1">Téléphone</h6>
                    <p className="text-slate-600 mb-1">06 76 38 01 52</p>
                    <p className="text-sm text-slate-400">Lun-Ven 9h-18h</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-12 w-12 shrink-0 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h6 className="font-bold text-slate-900 mb-1">Adresse</h6>
                    <p className="text-slate-600 mb-1">Alsace, France</p>
                    <p className="text-sm text-slate-400">Sur rendez-vous uniquement</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-12 w-12 shrink-0 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h6 className="font-bold text-slate-900 mb-1">Chat en ligne</h6>
                    <p className="text-slate-600 mb-3">Disponible 24h/24</p>
                    <button className="text-sm font-medium text-purple-600 border border-purple-200 bg-purple-50 hover:bg-purple-100 px-4 py-2 rounded-lg transition-colors">
                      Démarrer le chat
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-slate-50 mt-12">
          <div className="container mx-auto max-w-3xl px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">Questions fréquentes</h2>
              <p className="text-lg text-slate-600">
                Trouvez rapidement des réponses aux questions les plus courantes.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                  Comment fonctionne l'essai gratuit ?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">
                  L'essai gratuit de 14 jours vous permet de tester toutes les fonctionnalités de Qrious.fr sans engagement. Vous pouvez créer jusqu'à 2 QR codes et accéder à toutes les fonctionnalités de base. Aucune carte bancaire n'est requise.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                  Quels types d'œuvres puis-je présenter ?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">
                  Qrious.fr accepte tous types d'œuvres d'art : peintures, sculptures, photographies, installations, vidéos, performances... Vous pouvez ajouter des images, des descriptions détaillées, des vidéos et même des fichiers audio pour enrichir l'expérience.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                  Comment sont protégées mes données ?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">
                  Vos données sont protégées selon le RGPD. Nous utilisons un chiffrement SSL, des sauvegardes sécurisées et ne partageons jamais vos informations personnelles. Vous gardez le contrôle total sur vos œuvres et pouvez les supprimer à tout moment.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                  Puis-je personnaliser l'apparence de mes QR codes ?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">
                  Oui ! Vous pouvez personnaliser les couleurs, ajouter votre logo, choisir différents styles de QR codes et même intégrer des éléments visuels de vos œuvres. Les plans Professional et Enterprise offrent des options de personnalisation avancées.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-b-0">
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                  Comment fonctionne le support technique ?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">
                  Notre équipe support est disponible par email, chat en ligne et téléphone. Les plans Starter et Professional bénéficient d'un support par email, tandis que le plan Enterprise inclut un support dédié 24/7 avec un consultant personnel.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  )
}
